"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, User, Bot, Loader2, Trash, Clock, ChevronDown, X } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"
import { useUI } from "@/context/ui-context"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [showHelpPopup, setShowHelpPopup] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMobile()
  const { setChatbotExpanded } = useUI()

  // Hide help popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelpPopup(false)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  // Update global state when chatbot expands/collapses
  useEffect(() => {
    setChatbotExpanded(isExpanded)
  }, [isExpanded, setChatbotExpanded])

  // Check viewport height on keyboard open/close
  useEffect(() => {
    if (!isMobile) return

    // Store initial viewport height
    const initialViewportHeight = window.innerHeight

    const handleResize = () => {
      // If the current height is significantly less than initial height, keyboard is likely open
      const isKeyboard = window.innerHeight < initialViewportHeight * 0.75
      setIsKeyboardOpen(isKeyboard)

      // Ensure we scroll to the bottom when keyboard state changes
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobile])

  // Handle input focus events as a secondary detection method
  useEffect(() => {
    if (!isMobile) return

    const handleFocus = () => {
      // Don't set keyboard state here, just scroll
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }

    const input = inputRef.current
    if (input) {
      input.addEventListener("focus", handleFocus)
    }

    return () => {
      if (input) {
        input.removeEventListener("focus", handleFocus)
      }
    }
  }, [isMobile])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Welcome message on first load
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "Hello! I'm your business and finance assistant. I can help you with:\n\n• Business registration and incorporation\n• Financial services and products\n• Tax-related queries\n• Business compliance\n• Financial planning\n\nHow can I assist you today?",
            timestamp: new Date(),
          },
        ])
      }, 500)
    }
  }, [messages.length])

  // Prevent body scrolling when chatbot is expanded on mobile
  useEffect(() => {
    if (!isMobile) return

    if (isExpanded) {
      // Prevent scrolling on the body when chatbot is expanded on mobile
      document.body.style.overflow = "hidden"
    } else {
      // Restore scrolling when chatbot is collapsed
      document.body.style.overflow = ""
    }

    return () => {
      // Cleanup: ensure scrolling is restored when component unmounts
      document.body.style.overflow = ""
    }
  }, [isExpanded, isMobile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // If collapsed, expand the chat on user message
    if (!isExpanded) {
      setIsExpanded(true)
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "I'm sorry, I couldn't process that request.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, there was an error processing your request. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Message animations
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  // Loading animation dots
  const loadingDots = Array(3).fill(0)
  const loadingVariants = {
    initial: { y: 0 },
    animate: (i: number) => ({
      y: [0, -5, 0],
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
      },
    }),
  }

  return (
    <div className="relative z-[9999]">
      {/* Help Popup */}
      {showHelpPopup && !isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-20 right-4 z-[9999]"
        >
          <Card className="w-72 shadow-xl border border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border-2 border-blue-100">
                  <AvatarImage
                    src="/bot-avatar.png"
                    alt="Business Assistant"
                    width={40}
                    height={40}
                  />
                  <AvatarFallback className="text-white relative">
                    <div className="relative w-full h-full">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                        alt="StartBusiness"
                        width={40}
                        height={40}
                        sizes="40px"
                        className="object-contain w-full h-full"
                        quality={75}
                        priority={false}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-slate-900">Business Assistant</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs">
                      Online
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">May I help you with your business needs?</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      onClick={() => {
                        setShowHelpPopup(false)
                        setIsExpanded(true)
                      }}
                    >
                      Yes, please
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowHelpPopup(false)}
                    >
                      Not now
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 -mt-1 -mr-1"
                  onClick={() => setShowHelpPopup(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Chat button */}
      {!isExpanded && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={toggleExpand}
            size="icon"
            className="rounded-full h-14 w-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
          >
            <Bot className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Backdrop overlay for mobile */}
      {isMobile && isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-[9998]" onClick={toggleExpand} style={{ touchAction: "none" }} />
      )}

      {/* Chat window */}
      {isExpanded && (
        <div
          className={`fixed z-[9999] ${
            isMobile
              ? "inset-0" // Full screen on mobile
              : "bottom-4 right-4 w-full max-w-md md:max-w-2xl" // Normal size on desktop
          }`}
        >
          <Card
            className={`${
              isMobile ? "h-full w-full rounded-none border-0" : "border border-gray-200 shadow-xl"
            } flex flex-col overflow-hidden`}
          >
            <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex-shrink-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white/20">
                    <AvatarImage
                      src="/bot-avatar.png"
                      alt="Business Assistant"
                      width={32}
                      height={32}
                    />
                    <AvatarFallback className="text-white relative">
                      <div className="relative w-full h-full">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                          alt="StartBusiness"
                          width={32}
                          height={32}
                          sizes="32px"
                          className="object-contain w-full h-full"
                          quality={75}
                          loading="lazy"
                        />
                      </div>
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg font-medium">Business Assistant</CardTitle>
                  <Badge variant="outline" className="bg-blue-800/30 text-white border-blue-400 ml-2">
                    Online
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={clearChat}
                          className="h-8 w-8 rounded-full hover:bg-blue-800/20 text-white"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Clear chat</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleExpand}
                    className="h-8 w-8 rounded-full hover:bg-blue-800/20 text-white"
                  >
                    {isMobile ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent ref={chatContainerRef} className="p-0 overflow-hidden flex-grow">
              <div
                className="overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800 h-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.05) 2%, transparent 0%), 
                                  radial-gradient(circle at 75px 75px, rgba(0, 0, 0, 0.025) 2%, transparent 0%)`,
                  backgroundSize: "100px 100px",
                }}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} group`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                        <AvatarImage
                          src="/bot-avatar.png"
                          alt="Business Assistant"
                          width={32}
                          height={32}
                        />
                        <AvatarFallback className="text-white relative">
                          <div className="relative w-full h-full">
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                              alt="StartBusiness"
                              width={32}
                              height={32}
                              sizes="32px"
                              className="object-contain w-full h-full"
                              quality={75}
                              loading="lazy"
                            />
                          </div>
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="flex flex-col max-w-[80%]">
                      <div
                        className={`rounded-2xl p-3 shadow-sm ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-2"
                            : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <div className="whitespace-pre-wrap break-words">{message.content}</div>
                      </div>

                      <div
                        className={`text-xs mt-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity ${
                          message.role === "user" ? "justify-end mr-2" : "justify-start ml-2"
                        } text-gray-500`}
                      >
                        <Clock className="h-3 w-3 inline mr-1" />
                        {format(message.timestamp, "h:mm a")}
                      </div>
                    </div>

                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                        <AvatarImage src="/user-avatar.png" alt="User" />
                        <AvatarFallback className="bg-green-600 text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-start"
                  >
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage
                        src="/bot-avatar.png"
                        alt="Business Assistant"
                        width={32}
                        height={32}
                      />
                      <AvatarFallback className="bg-blue-600 text-white">BA</AvatarFallback>
                    </Avatar>

                    <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600 flex items-center">
                      <div className="flex space-x-1">
                        {loadingDots.map((_, i) => (
                          <motion.div
                            key={i}
                            custom={i}
                            variants={loadingVariants}
                            initial="initial"
                            animate="animate"
                            className="h-2 w-2 rounded-full bg-blue-600"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter
              className={`p-3 border-t bg-white dark:bg-gray-900 flex-shrink-0 ${
                isKeyboardOpen ? "sticky bottom-0 left-0 right-0 z-[1001]" : ""
              }`}
            >
              <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about business registration, finance, or compliance..."
                  className="flex-1 border-gray-300 focus:border-blue-500 dark:bg-gray-800"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="ml-2 hidden sm:inline">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
