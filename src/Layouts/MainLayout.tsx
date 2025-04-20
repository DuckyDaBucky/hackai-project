// src/Layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-screen font-sans">
      <main className="mt-24 px-6">
        <Outlet />
      </main>
    </div>
  )
}
