'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      aria-label="Open chat"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  )
} 