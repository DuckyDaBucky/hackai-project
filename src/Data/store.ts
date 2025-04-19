import { create } from 'zustand'

type Store = {
  pdfFile: File | null
  setPdfFile: (file: File | null) => void
  analysisData: any | null
  setAnalysisData: (data: any) => void
}

export const useStore = create<Store>((set) => ({
  pdfFile: null,
  setPdfFile: (file) => set({ pdfFile: file }),
  analysisData: null,
  setAnalysisData: (data) => set({ analysisData: data })
})) 