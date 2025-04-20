import { useState } from 'react'
import { FiMessageSquare } from 'react-icons/fi'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
      >
        <FiMessageSquare size={24} />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="mt-4 w-[320px] bg-white rounded-xl shadow-2xl p-4 text-sm text-gray-800">
          <h3 className="text-md font-semibold mb-2">Ask about this report</h3>
          <p className="mb-3">What do you want to know?</p>
          <input
            type="text"
            placeholder="Type your question..."
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
          />
        </div>
      )}
    </div>
  )
}
