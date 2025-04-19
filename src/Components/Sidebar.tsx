import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import clsx from 'clsx'

export default function Sidebar() {
  const [visible, setVisible] = useState(false)

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="fixed top-0 left-0 h-full z-40"
    >
      {/* Invisible Hover Zone */}
      <div className="w-2 h-full absolute left-0 top-0 z-0" />

      {/* Sidebar */}
      <div
        className={clsx(
          "bg-white shadow-xl h-full w-56 p-6 transform transition-transform duration-300 ease-in-out",
          visible ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <h3 className="text-xl font-bold mb-4">Navigation</h3>
        <ul className="space-y-2 text-gray-700">
          <li><a href="#overview" className="hover:underline">Overview</a></li>
          <li><a href="#vision" className="hover:underline">Vision</a></li>
          <li><a href="#finance" className="hover:underline">Financials</a></li>
          <li><a href="#esg" className="hover:underline">ESG</a></li>
          <li><a href="#impact" className="hover:underline">Stakeholders</a></li>
        </ul>
      </div>
    </div>
  )
}
