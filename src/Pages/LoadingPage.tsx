import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from '../Data/store'
import { supabase } from '../supabaseClient'

export default function LoadingPage() {
  const navigate = useNavigate()
  const { pdfFile, setAnalysisData } = useStore()

  useEffect(() => {
    const checkAndProcess = async () => {
      // No file? Go back to splash
      if (!pdfFile) {
        navigate('/')
        return
      }

      // Check if logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/auth', { state: { fromLoading: true } })
        return
      }

      // Simulate backend analysis
      await new Promise(resolve => setTimeout(resolve, 2000))

      setAnalysisData({
        companyName: 'LTIMindtree',
        revenue: '₹355,170M',
        profit: '₹45,846M',
        employees: '81,650+',
        revenueBreakdown: {
          'North America': 170000,
          'Europe': 95000,
          'India': 55000,
          'Other': 35000
        }
      })

      navigate('/report')
    }

    checkAndProcess()
  }, [navigate, pdfFile, setAnalysisData])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paleLavender text-graySlate text-center px-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        className="w-12 h-12 border-4 border-dashed border-indigo-500 rounded-full mb-6"
      />
      <h2 className="text-xl font-medium mb-3">Analyzing your document...</h2>
      <p className="text-sm text-gray-500">This may take a few moments</p>
    </div>
  )
}
