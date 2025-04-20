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

    if ((goingDown && !atLast) || (goingUp && !atFirst)) {
      e.preventDefault()
      if (goingDown && !atLast) setIndex(i => i + 1)
      else if (goingUp && !atFirst) setIndex(i => i - 1)
    }
  }

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const opts = { passive: false } as AddEventListenerOptions
    node.addEventListener('wheel', handleScroll, opts)
    return () => node.removeEventListener('wheel', handleScroll)
  }, [index])

  return (
    <div ref={containerRef} className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
        >
          <MultiChartSlide charts={groups[index].charts} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
