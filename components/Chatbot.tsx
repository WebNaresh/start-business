'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2, Trash, Clock, ChevronDown, X } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle keyboard visibility
  useEffect(() => {
    if (!isMobile) return;

    const handleFocus = () => {
      setIsKeyboardOpen(true);
      // Scroll to bottom when keyboard opens
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    const handleBlur = () => {
      setIsKeyboardOpen(false);
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      }
    };
  }, [isMobile]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message on first load
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: 'Hello! I\'m your business and finance assistant. I can help you with:\n\n• Business registration and incorporation\n• Financial services and products\n• Tax-related queries\n• Business compliance\n• Financial planning\n\nHow can I assist you today?',
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // If collapsed, expand the chat on user message
    if (!isExpanded) {
      setIsExpanded(true);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || "I'm sorry, I couldn't process that request.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, there was an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Message animations
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Loading animation dots
  const loadingDots = Array(3).fill(0);
  const loadingVariants = {
    initial: { y: 0 },
    animate: (i: number) => ({
      y: [0, -5, 0],
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    }),
  };

  return (
    <div className="relative z-[9999]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed bottom-4 right-4 z-50 ${
          isExpanded 
            ? isMobile 
              ? "w-[calc(100%-2rem)]" 
              : "w-full max-w-md md:max-w-2xl" 
            : "w-auto"
        }`}
      >
        {!isExpanded && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute bottom-0 right-0 mb-2 mr-2"
          >
            <Button
              onClick={toggleExpand}
              size="icon"
              className="rounded-full h-14 w-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
            >
              <Bot className="h-6 w-6" />
            </Button>
          </motion.div>
        )}

        {isExpanded && (
          <Card className={`border border-gray-200 shadow-xl bg-white dark:bg-gray-900 overflow-hidden z-[1000] ${
            isMobile && isKeyboardOpen ? 'fixed bottom-0 left-0 right-0 w-full rounded-none' : ''
          }`}>
            <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white/20">
                    <AvatarImage src="/bot-avatar.png" alt="Business Assistant" />
               
                    <AvatarFallback className=" text-white"> 
                    <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                alt="StartBusiness"
                fill
                className="object-contain"
              /></AvatarFallback>
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

            <CardContent ref={chatContainerRef} className="p-0 overflow-hidden">
              <div
                className={`overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800 ${
                  isMobile && isKeyboardOpen 
                    ? 'h-[calc(100vh-180px)]' 
                    : 'h-[300px] sm:h-[350px] md:h-[400px]'
                }`}
                style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.05) 2%, transparent 0%), 
                                    radial-gradient(circle at 75px 75px, rgba(0, 0, 0, 0.025) 2%, transparent 0%)`,
                  backgroundSize: '100px 100px',
                }}
              >
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                    >
                      {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                          <AvatarImage src="/bot-avatar.png" alt="Business Assistant" />
                          <AvatarFallback className=" text-white"> 
                    <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/startbusiness_icon_transparent-u5NDFsSQarqF4PBI4Y5RxkT51hJhDI.png"
                alt="StartBusiness"
                fill
                className="object-contain"
              /></AvatarFallback>
                        </Avatar>
                      )}

                      <div className="flex flex-col max-w-[80%]">
                        <div
                          className={`rounded-2xl p-3 shadow-sm ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-2'
                              : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          <div className="whitespace-pre-wrap break-words">{message.content}</div>
                        </div>

                        <div
                          className={`text-xs mt-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity ${
                            message.role === 'user' ? 'justify-end mr-2' : 'justify-start ml-2'
                          } text-gray-500`}
                        >
                          <Clock className="h-3 w-3 inline mr-1" />
                          {format(message.timestamp, 'h:mm a')}
                        </div>
                      </div>

                      {message.role === 'user' && (
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
                        <AvatarImage src="/bot-avatar.png" alt="Business Assistant" />
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
                </AnimatePresence>
              </div>
            </CardContent>

            <CardFooter className={`p-3 border-t bg-white dark:bg-gray-900 ${
              isMobile && isKeyboardOpen ? 'sticky bottom-0' : ''
            }`}>
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
        )}
      </motion.div>
    </div>
  );
} 