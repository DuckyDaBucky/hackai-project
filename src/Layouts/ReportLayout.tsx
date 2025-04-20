// src/Layouts/ReportLayout.tsx
import { Outlet } from 'react-router-dom'

export default function ReportLayout() {
  return (
    <div className="font-sans bg-gray-50 text-gray-900">
      {/* No Header is included in this layout */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
