import json
import os
import fitz  # PyMuPDF
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
import shutil
from pathlib import Path

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === CONFIGURATION ===
GEMINI_API_KEY = os.getenv("VITE_GOOGLE_AI_STUDIO_KEY")
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

genai.configure(api_key="AIzaSyDOfZX-K1Zno0r6r61jZwHcSnfRFGCE5g8")
model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")

# Global variables to store embeddings, index, chunks and metadata
model_embed = None
index = None
chunks = []
metas = []

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# === Step 1: Extract full text from PDF with page numbers ===
def extract_text_with_pages(pdf_path):
    doc = fitz.open(pdf_path)
    pages = []
    for page_num, page in enumerate(doc, start=1):
        text = page.get_text()
        if text:
            pages.append({"page": page_num, "text": text.strip()})
    return pages

# === Process PDF and create embeddings ===
def process_pdf(pdf_path):
    global model_embed, index, chunks, metas
    
    # Clear previous data
    chunks = []
    metas = []
    
    # Extract text from PDF
    pages = extract_text_with_pages(pdf_path)
    
    # Flatten pages for embedding
    for page in pages:
        text = page["text"]
        if text:
            chunks.append(text)
            metas.append({
                "section": "Full Report",
                "type": "page",
                "page": page["page"]
            })
    
    # Generate sentence embeddings
    if not model_embed:
        model_embed = SentenceTransformer("all-MiniLM-L6-v2")
    
    embeddings = model_embed.encode(chunks, convert_to_numpy=True)
    
    # Create FAISS index
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)
    
    return len(pages)

# === Retrieval Function ===
def retrieve_top_k(query: str, top_k: int = 1):
    q_vec = model_embed.encode([query], convert_to_numpy=True)
    distances, indices = index.search(q_vec, top_k)
    results = []
    for i, idx in enumerate(indices[0]):
        results.append({
            "text": chunks[idx],
            "meta": metas[idx],
            "distance": float(distances[0][i])  # ✅ Fix here
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
    print(result)
    if(result['confidence'] is None):
        return f"\n{result['answer']}\n"

    return f"\n{result['answer']}\n\nSource: page \n{result['page']}\n{result['confidence']}"

class Question(BaseModel):
    question: str

# === API Routes ===
@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file provided")
    
    if not allowed_file(file.filename):
        raise HTTPException(status_code=400, detail="File type not allowed")
    
    # Create a secure filename
    filename = Path(file.filename).name
    filepath = Path(UPLOAD_FOLDER) / filename
    
    # Save the file
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        num_pages = process_pdf(str(filepath))
        return {
            "message": "File uploaded and processed successfully",
            "filename": filename,
            "pages": num_pages
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

@app.post("/ask")
async def ask_question(question: Question):
    if index is None:
        raise HTTPException(
            status_code=400, 
            detail="No PDF has been processed. Please upload a PDF first."
        )
    
    try:
        result = ask_business_question(question.question)
        ans = output(result)
        # Convert the result dictionary to a JSON-compatible string
        return JSONResponse(content=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating answer: {str(e)}")

@app.post("/pdf-to-json")
async def pdf_to_json(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file provided")
    
    if not allowed_file(file.filename):
        raise HTTPException(status_code=400, detail="File type not allowed")
    
    # Create a secure filenames
    filename = Path(file.filename).name
    filepath = Path(UPLOAD_FOLDER) / filename
    
    # Save the file
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # Extract text with page numbers
        pages = extract_text_with_pages(str(filepath))
        
        # Combine all text from pages
        full_text = "\n".join([p["text"] for p in pages])
        
        # Generate condensed slides
        condensed_slides = generate_condensed_slides(full_text)
        
        # Return the structured JSON data including slides
        return {
            "filename": filename,
            "page_count": len(pages),
            "pages": pages,
            "slides": condensed_slides["slides"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

# Function to generate condensed slides
def generate_condensed_slides(text):
    prompt = f"""
You are an AI assistant helping create a condensed slide deck from a company's annual report.

Your job is to extract the most important and quantitative information from the report and organize it into 7 to 10 meaningful slide categories.

Each slide should:
- Have a \"slide\" title (e.g., \"Financial Highlights\")
- Contain 3 to 5 \"elements\"
- Each element should be a mini-section with 4 to 6 high-quality bullet points
- Emphasize numbers, percentages, rankings, or KPIs wherever relevant

Return valid JSON with this structure:
{{
  "slides": [
    {{
      "slide": "...",
      "elements": [
        {{"bullets": ["...", "..."]}},
        ...
      ]
    }},
    ...
  ]
}}

Report:
{text}
"""
    response = model.generate_content(prompt)
    try:
        raw = response.text.strip()
        if raw.startswith("```"):
            raw = raw.strip('`').strip()
        if raw.startswith("json"):
            raw = raw[4:].strip()
        parsed = json.loads(raw)
        return parsed
    except Exception as e:
        print("❌ Gemini failed to produce valid JSON:", e)
        return {"slides": []}

if __name__ == "__main__":
    uvicorn.run("chatbot:app", host="0.0.0.0", port=5000, reload=True)