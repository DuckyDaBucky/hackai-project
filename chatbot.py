import json
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# === CONFIGURATION ===
GEMINI_API_KEY = "AIzaSyDOfZX-K1Zno0r6r61jZwHcSnfRFGCE5g8"  # Replace with your real key
SLIDE_JSON_PATH = "report_slides.json"

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")

# === Load structured slide content ===
with open(SLIDE_JSON_PATH, "r", encoding="utf-8") as f:
    report = json.load(f)

# === Flatten content for vector embedding ===
chunks = []
metas = []
page_counter = 1
for slide in report["slides"]:
    for element in slide["elements"]:
        text = " ".join(element["content"]) if isinstance(element["content"], list) else element["content"]
        if text:
            chunks.append(text)
            metas.append({
                "section": slide["title"],
                "type": element["type"],
                "page": page_counter
            })
        page_counter += 1  # Simulate page tracking (you can refine this if exact mapping is available)

# === Generate sentence embeddings ===
model_embed = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model_embed.encode(chunks, convert_to_numpy=True)

# === Create FAISS index ===
dim = embeddings.shape[1]
index = faiss.IndexFlatL2(dim)
index.add(embeddings)

# === Retrieval Function ===
def retrieve_top_k(query: str, top_k: int = 1):  # Return only top 1 source
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
Use at least 2 sentences unless the answer is numeric.

Context:
{context_text}

Question:
{question}
"""

# === Chatbot Function ===
def ask_business_question(question: str):
    top_chunks = retrieve_top_k(question, top_k=5)
    context = "\n\n".join([chunk["text"] for chunk in top_chunks])
    prompt = build_prompt(context, question)

    response = model.start_chat().send_message(prompt)

    return {
        "answer": response.text.strip(),
        "sources": top_chunks
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
        print("\n✅ Answer:\n", result["answer"])
        print("\n📄 Page:")
        for i in range(5):
            print(f"- Page: {result['sources'][i]['meta']['page']}")
        
        print("\n---\n")
