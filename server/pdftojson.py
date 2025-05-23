import fitz  # PyMuPDF
import google.generativeai as genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

# === CONFIG ===
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
PDF_PATH = "ltimindtree_annual_report.pdf"

OUTPUT_PATH = "report_slides_condensed.json"
#PDF_PATH = os.path.abspath("ltimindtree_annual_report.pdf")

# === Setup Gemini ===
genai.configure(api_key="AIzaSyDOfZX-K1Zno0r6r61jZwHcSnfRFGCE5g8")
model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")

# === Step 1: Extract full text from PDF and page map ===
def extract_text_with_pages(pdf_path):
    doc = fitz.open(pdf_path)
    pages = []
    for page_num, page in enumerate(doc, start=1):
        text = page.get_text()
        if text:
            pages.append({"page": page_num, "text": text.strip()})
    return pages

# === Step 2: Combine all text ===
def combine_all_text(pages):
    full_text = "\n".join([p["text"] for p in pages])
    print(full_text)
    return full_text

# === Step 3: Ask Gemini to generate condensed business slides ===
def generate_condensed_slides(text):
    prompt = f"""
You are an AI assistant helping create a condensed slide deck from a company's annual report.

Your job is to extract the most important and quantitative information from the report and organize it into 7 to 10 meaningful slide categories.

Each slide should:
- Have a \"slide\" title (e.g., \"Financial Highlights\")
- Contain 3 to 5 \"elements\"
- Each element should be a mini-section with 4 to 6 high-quality bullet points
- Emphasize numbers, percentages, rankings, or KPIs wherever relevant

Do NOT use Markdown formatting (no asterisks, bold, italics, or backticks).

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
        return {"slides": []}

# === Main ===
if __name__ == "__main__":
    print("📄 Extracting text from PDF...")
    pages = extract_text_with_pages(PDF_PATH)
    full_text = combine_all_text(pages)

    print("🧠 Generating condensed slides with Gemini...")
    condensed = generate_condensed_slides(full_text)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(condensed, f, indent=2)
        print(f"✅ Saved: {OUTPUT_PATH}")