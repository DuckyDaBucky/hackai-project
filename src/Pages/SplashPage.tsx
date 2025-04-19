import { useNavigate } from 'react-router-dom'
import PDFUpload from '../Components/PDFUpload'

export default function SplashPage() {
  const navigate = useNavigate()

  const handleFileUpload = (file: File) => {
    // TODO: Pass file to backend or global state later
    console.log('Uploaded PDF:', file)
    navigate('/loading')
  }

  return (
    <div className="min-h-screen bg-cloud flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-semibold mb-6">FinFlow</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10">Turn your financial report into an interactive experience</p>
      <PDFUpload onUpload={handleFileUpload} />
    </div>
  )
}