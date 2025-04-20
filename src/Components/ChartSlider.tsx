import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DynamicChart from './DynamicChart'

type Slide = {
  type: 'bar' | 'pie'
  title: string
  labels: string[]
  values: number[]
  summary: string
}

type Props = {
  slides: Slide[]
}

export default function ChartSlider({ slides }: Props) {
  const [index, setIndex] = useState(0)

  const handleScroll = (e: WheelEvent) => {
    if (e.deltaY > 0 && index < slides.length - 1) {
      setIndex(prev => prev + 1)
    } else if (e.deltaY < 0 && index > 0) {
      setIndex(prev => prev - 1)
    }
  }

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: true })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [index])

  const current = slides[index]

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <DynamicChart
            type={current.type}
            title={current.title}
            labels={current.labels}
            values={current.values}
          />
          <p className="text-sm text-gray-700 mt-4 italic text-center">
            {current.summary}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
