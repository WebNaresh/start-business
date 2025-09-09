"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Mail, 
  Clock,
  User,
  Bot,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [message, setMessage] = useState("")
  const [chatStarted, setChatStarted] = useState(false)

  // Simulate online status
  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    // Business hours: 9 AM to 8 PM IST
    setIsOnline(hour >= 9 && hour <= 20)
  }, [])

  const quickQuestions = [
    "What documents do I need for company registration?",
    "How long does the registration process take?",
    "What's the difference between LLP and Private Limited?",
    "Can you help me choose the right business structure?"
  ]

  const handleQuickQuestion = (question: string) => {
    setMessage(question)
    setChatStarted(true)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatStarted(true)
      // Here you would integrate with your chat system
      setMessage("")
    }
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
            isOpen 
              ? "bg-slate-600 hover:bg-slate-700" 
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </Button>
        
        {/* Online indicator */}
        {!isOpen && isOnline && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
          
          {/* Header */}
          <div className="bg-primary text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">StartBusiness Support</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span>{isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="h-80 flex flex-col">
            
            {!chatStarted ? (
              /* Welcome Screen */
              <div className="flex-1 p-4 space-y-4">
                <div className="text-center">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    👋 Welcome to StartBusiness!
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    How can we help you start your business journey today?
                  </p>
                </div>

                {/* Quick Questions */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500 mb-2">Quick Questions:</p>
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="w-full text-left p-2 text-sm bg-slate-50 hover:bg-primary/5 rounded-lg transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>

                {/* Contact Options */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-medium text-slate-500 mb-2">Or contact us directly:</p>
                  <div className="space-y-2">
                    <a
                      href="tel:+919699214195"
                      className="flex items-center gap-2 p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Call Now</span>
                    </a>
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Send Email</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">{message}</p>
                  </div>
                </div>
                
                {/* Bot Response */}
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-slate-600" />
                  </div>
                  <div className="bg-slate-100 p-3 rounded-lg max-w-xs">
                    <p className="text-sm text-slate-700">
                      Thank you for your question! Our expert will connect with you shortly. 
                      In the meantime, you can also call us at +91 96992 14195 for immediate assistance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {!isOnline && (
                <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>We'll respond during business hours (9 AM - 8 PM IST)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
