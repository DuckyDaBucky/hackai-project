import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth font-sans bg-gray-50 text-gray-900"
    >
      <main>
        <Outlet />
      </main>
    </div>
  )
}
