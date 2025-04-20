import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {children}
    </div>
  )
}
