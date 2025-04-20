import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type ContentBlock = {
  id?: string
  content: React.ReactNode
}

type Props = {
  slides: ContentBlock[]
}

export default function ContentSlider({ slides }: Props) {
  const [index, setIndex] = useState(0)

  const handleScroll = (e: WheelEvent) => {
    const atFirst = index === 0
    const atLast = index === slides.length - 1
    const goingDown = e.deltaY > 0
    const goingUp = e.deltaY < 0

    if ((goingDown && !atLast) || (goingUp && !atFirst)) {
      e.preventDefault()
      if (goingDown && !atLast) setIndex(i => i + 1)
      else if (goingUp && !atFirst) setIndex(i => i - 1)
    }
  }

  useEffect(() => {
    const opts = { passive: false } as AddEventListenerOptions
    window.addEventListener('wheel', handleScroll, opts)
    return () => window.removeEventListener('wheel', handleScroll)
  }, [index])

  // Reset to first slide when component mounts
  useEffect(() => {
    setIndex(0)
  }, [])

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl mx-auto"
        >
          {slides[index].content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
