import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

type Props = {
  title?: string
  children: ReactNode
  backgroundColor?: string
  linger?: boolean
}

export default function ScrollSection({
  title,
  children,
  backgroundColor = 'bg-cloud',
  linger = false
}: Props) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: linger ? 1.2 : 0.6 }}
      className={`min-h-screen px-8 md:px-24 py-20 transition-all duration-700 ease-in-out ${backgroundColor}`}
    >
      {title && <h2 className="text-4xl font-semibold mb-10">{title}</h2>}
      {children}
    </motion.section>
  )
}
