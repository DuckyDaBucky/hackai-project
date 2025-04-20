import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_AI_STUDIO_KEY,
});
