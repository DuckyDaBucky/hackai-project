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
  backgroundColor = 'bg-white',
  linger = false,
}: Props) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false })

  return (
    <section
      ref={ref}
      className={`snap-start snap-always h-screen flex flex-col justify-center items-center px-4 md:px-20 py-16 transition-colors duration-700 ${backgroundColor}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        {title && (
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-sans">
            {title}
          </h2>
        )}
      </motion.div>

      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3,
              duration: linger ? 1.2 : 0.6,
            },
          },
        }}
        className="w-full max-w-6xl flex flex-col items-center"
      >
        {children}
      </motion.div>
    </section>
  )
}
