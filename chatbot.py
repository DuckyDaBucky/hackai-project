import json
import os
import fitz  # PyMuPDF
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from dotenv import load_dotenv

load_dotenv()

# === CONFIGURATION ===
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
PDF_PATH = "ltimindtree_annual_report.pdf"

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")

# === Step 1: Extract full text from PDF with page numbers ===
def extract_text_with_pages(pdf_path):
    doc = fitz.open(pdf_path)
    pages = []
    for page_num, page in enumerate(doc, start=1):
        text = page.get_text()
        if text:
            pages.append({"page": page_num, "text": text.strip()})
    return pages

# === Load raw PDF text ===
print("📄 Loading PDF text...")
pages = extract_text_with_pages(PDF_PATH)

# === Flatten pages for embedding ===
chunks = []
metas = []

for page in pages:
    text = page["text"]
    if text:
        chunks.append(text)
        metas.append({
            "section": "Full Report",
            "type": "page",
            "page": page["page"]
        })

# === Generate sentence embeddings ===
print("🔍 Embedding text...")
model_embed = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model_embed.encode(chunks, convert_to_numpy=True)

# === Create FAISS index ===
dim = embeddings.shape[1]
index = faiss.IndexFlatL2(dim)
index.add(embeddings)

# === Retrieval Function ===
def retrieve_top_k(query: str, top_k: int = 1):
    q_vec = model_embed.encode([query], convert_to_numpy=True)
    distances, indices = index.search(q_vec, top_k)
    results = []
    for i, idx in enumerate(indices[0]):
        results.append({
            "text": chunks[idx],
            "meta": metas[idx],
            "distance": distances[0][i]  # Include distance
        })
    return results


def compute_confidence(distances):
    max_dist = max(distances)
    min_dist = min(distances)
    range_dist = max_dist - min_dist if max_dist > min_dist else 1e-6
    scores = [100 - ((d - min_dist) / range_dist) * 100 for d in distances]
    return round(sum(scores) / len(scores), 2)

# === Prompt Generator ===
def build_prompt(context_text: str, question: str) -> str:
    return f"""
You are an AI assistant analyzing a company's business report.

Answer the following question using only the context below. Be specific, detailed, 
and include any relevant figures, examples, or supporting data. If multiple facts are found, synthesize them into a full answer.
Use at least 3 sentences unless the answer is numeric.

Do NOT use Markdown formatting (no asterisks, bold, italics, or backticks).

Context:
{context_text}

Question:
{question}
"""

# === Chatbot Function ===
def ask_business_question(question: str):
    top_chunks = retrieve_top_k(question, top_k=8)
    context = "\n\n".join([chunk["text"] for chunk in top_chunks])
    distances = [chunk["distance"] for chunk in top_chunks]
    min_distance = min(distances) if distances else 1.0

    # Confidence tiering
    if min_distance < 1.4:
        confidence = "I am highly confident in this response."
    elif min_distance < 1.8:
        confidence = "I am moderately confident in this response."
    else:
        confidence = "I'm unsure about this response and recommend verification."

    prompt = build_prompt(context, question)
    response = model.start_chat().send_message(prompt)

    source_page = top_chunks[0]["meta"].get("page", "Unknown") if top_chunks else "Unknown"

    answer_text = response.text.strip()
    if is_unable_to_answer(answer_text):
        return {
            "answer": answer_text,
            "confidence": None,
            "sources": [],
            "page": None
        }

    return {
        "answer": answer_text,
        "confidence": confidence,
        "sources": top_chunks,
        "page": source_page
    }


def is_unable_to_answer(text):
    lowered = text.lower()
    return (
        "i don't know" in lowered or
        "unable to answer" in lowered or
        "no relevant information" in lowered or
        "not mentioned" in lowered or
        "insufficient context" in lowered or
        "cannot answer" in lowered or
        "no information" in lowered or
        "unable to fulfill" in lowered or
        "does not contain" in lowered
    )

def output(result):
    if(result['confidence'] is None):
        return f"\n{result['answer']}\n"

    return f"\n{result['answer']}\n\nSource: page {result['page']}\n{result['confidence']}"



# === Interactive Loop ===
if __name__ == "__main__":
    print("📊 Business Report Q&A Assistant\n(Type 'exit' to quit)\n")
    while True:
        user_question = input("❓ Ask a question: ")
        if user_question.strip().lower() in ["exit", "quit"]:
            print("👋 Exiting. Have a great day!")
            break
        result = ask_business_question(user_question)
        print("Answer: " + output(result))
