import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MultiChartSlide from './MultiChartSlide'

type ChartGroup = {
  charts: {
    type: 'bar' | 'pie' | 'line'
    title: string
    labels: string[]
    values: number[]
    summary: string
  }[]
}

type Props = {
  groups: ChartGroup[]
}

export default function MultiChartSlider({ groups }: Props) {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (e: WheelEvent) => {
    const goingDown = e.deltaY > 0
    const goingUp = e.deltaY < 0
    const atFirst = index === 0
    const atLast = index === groups.length - 1

    // Only intercept if not at edges
    if ((goingDown && !atLast) || (goingUp && !atFirst)) {
      e.preventDefault()
      if (goingDown && !atLast) setIndex(i => i + 1)
      if (goingUp && !atFirst) setIndex(i => i - 1)
    }
  }

  useEffect(() => {
    const current = containerRef.current
    if (!current) return

    const opts = { passive: false } as AddEventListenerOptions
    current.addEventListener('wheel', handleScroll, opts)
    return () => current.removeEventListener('wheel', handleScroll)
  }, [index])

  return (
    <div ref={containerRef} className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <MultiChartSlide charts={groups[index].charts} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
