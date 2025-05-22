'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate random positions for particles
  const getRandomPosition = () => ({
    x: isClient ? Math.random() * window.innerWidth : 0,
    y: isClient ? Math.random() * window.innerHeight : 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const pos = getRandomPosition()
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-200 rounded-full"
                initial={pos}
                animate={{
                  x: [
                    pos.x,
                    isClient ? Math.random() * window.innerWidth : pos.x,
                  ],
                  y: [
                    pos.y,
                    isClient ? Math.random() * window.innerHeight : pos.y,
                  ],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )
          })}
        </div>
      )}

      {/* Main content */}
      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="relative"
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            404
          </h1>
          <motion.div
            className="absolute -top-4 -right-4 w-16 h-16"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full text-blue-400">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Oops! Page Not Found
          </h2>
          <h3 className="text-2xl text-gray-600 mb-8 font-medium">
            We are still under development, please check back later.
          </h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            The page you're looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return Home
          </Link>
        </motion.div>

        {/* Interactive floating elements */}
        {isClient && (
          <motion.div
            className="mt-12 relative"
            animate={{
              x: (mousePosition.x - window.innerWidth / 2) * 0.05,
              y: (mousePosition.y - window.innerHeight / 2) * 0.05,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>
    </div>
  )
} 