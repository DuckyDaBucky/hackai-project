import json
import fitz  # PyMuPDF
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# === CONFIGURATION ===
GEMINI_API_KEY = "AIzaSyDOfZX-K1Zno0r6r61jZwHcSnfRFGCE5g8"
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
def retrieve_top_k(query: str, top_k: int = 1):  # Top 1 source page
    q_vec = model_embed.encode([query], convert_to_numpy=True)
    distances, indices = index.search(q_vec, top_k)
    results = []
    for i in indices[0]:
        results.append({
            "text": chunks[i],
            "meta": metas[i]
        })
    return results

# === Prompt Generator ===
def build_prompt(context_text: str, question: str) -> str:
    return f"""
You are an AI assistant analyzing a company's business report.

Answer the following question using only the context below. Be specific, detailed, 
and include any relevant figures, examples, or supporting data. If multiple facts are found, synthesize them into a full answer.
Use at least 3 sentences unless the answer is numeric.

Context:
{context_text}

Question:
{question}
"""

# === Chatbot Function ===
def ask_business_question(question: str):
    top_chunks = retrieve_top_k(question, top_k=8)
    context = "\n\n".join([chunk["text"] for chunk in top_chunks])
    prompt = build_prompt(context, question)

    response = model.start_chat().send_message(prompt)

    source_page = top_chunks[0]["meta"]["page"] if top_chunks else "Unknown"
    return {
        "answer": response.text.strip(),
        "sources": top_chunks,
        "page": source_page
    }

# === Interactive Loop ===
if __name__ == "__main__":
    print("📊 Business Report Q&A Assistant\n(Type 'exit' to quit)\n")
    while True:
        user_question = input("❓ Ask a question: ")
        if user_question.strip().lower() in ["exit", "quit"]:
            print("👋 Exiting. Have a great day!")
            break
        result = ask_business_question(user_question)
        print(f"\n✅ Answer:\n{result['answer']}\n\nSource: page {result['page']}")
        print("\n---\n")
