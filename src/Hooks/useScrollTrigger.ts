import { useState, useEffect } from 'react'

export default function useScrollTrigger(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      let currentSection: string | null = null

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 100) {
          currentSection = id
          break
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return activeSection
}
