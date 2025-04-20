import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900 pt-16">
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  )
}
