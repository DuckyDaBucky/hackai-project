import { useRef } from 'react'
import { FiUpload } from 'react-icons/fi'
import { useStore } from '../Data/store'

type Props = {
  onUpload: (file: File) => void
}

export default function PDFUpload({ onUpload }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const setPdfFile = useStore((state) => state.setPdfFile)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      setPdfFile(file)
      onUpload(file)
    }
  }

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setPdfFile(file)
      onUpload(file)
    }
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 p-8 rounded-xl bg-white hover:border-indigo-400 cursor-pointer transition-colors duration-200"
      onClick={() => fileInputRef.current?.click()}
    >
      <FiUpload size={32} className="mx-auto mb-4 text-gray-500" />
      <p className="text-sm text-gray-500">Click or drag & drop a PDF</p>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleSelectFile}
        className="hidden"
      />
    </div>
  )
}
