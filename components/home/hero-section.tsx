"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FixedHeroCarousel() {
  const slides = [
    {
      image: "/hero/hero_new_1.png",
      title: "Start Your Business Journey Now",
      description: "Registration, compliance, and legal services to help your business thrive",
    },
    {
      image: "/hero/hero_new_2.png",
      title: "Expert Guidance For Your Business Growth",
      description: "Get personalized consultation and support for all your business compliance needs",
    },
    {
      image: "/hero/hero_new_2.png",
      title: "Launch Your Business With Strategic Support",
      description: "Comprehensive solutions to navigate complex regulatory requirements and focus on your growth",
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const heroRef = useRef(null)
  const isInView = useInView(heroRef, { once: true, margin: "-100px" })

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setProgress(0)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setProgress(0)
  }, [slides.length])

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPaused((prev) => !prev)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) nextSlide()
    if (isRightSwipe) prevSlide()
  }

  // Reliable auto-advance implementation
  useEffect(() => {
    // Clear any existing interval
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
    }

    // Only set up interval if not paused
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1
          if (newProgress >= 100) {
            nextSlide()
            return 0
          }
          return newProgress
        })
      }, 50) // Update progress more frequently for smoother animation
    }

    // Cleanup function
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current)
      }
    }
  }, [isPaused, nextSlide])

  // Debug logging
  useEffect(() => {
    console.log("Carousel state:", {
      currentSlide,
      isPaused,
      progress,
      slidesCount: slides.length,
    })
  }, [currentSlide, isPaused, progress, slides.length])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      ref={heroRef}
      className="relative py-8 md:py-12 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-slate-50"
    >
      {/* Enhanced background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-48 -mt-48 opacity-60 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-slate-100 to-transparent rounded-full -ml-40 -mb-40 opacity-50 blur-2xl"></div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-60"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-6 h-6 bg-slate-300 rounded-full opacity-40"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-4 lg:grid-cols-2 lg:gap-16 items-center"
        >
          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              >
                <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p className="text-sm md:text-base text-slate-600 mb-6 max-w-2xl">
                  {slides[currentSlide].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <motion.div variants={itemVariants} className="mb-8 hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "⚡ Quick turnaround time",
                "🎯 Expert legal guidance",
                "🔄 End-to-end business solutions",
                "✅ 100% compliance assured",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-slate-100"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.8)" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-slate-700 text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Link href="/services">
                <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
                  View Our Services
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Image Carousel */}
          <motion.div variants={itemVariants} className="flex items-center justify-center">
            <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl">
              <div
                className="relative rounded-xl overflow-hidden shadow-sm z-10 aspect-[4/3] bg-gradient-to-br from-white to-slate-50"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slides[currentSlide].image || "/placeholder.svg"}
                      alt={slides[currentSlide].title}
                      fill
                      className="object-contain p-6"
                      priority={currentSlide === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <motion.button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg z-20 transition-all hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5 text-blue-600" />
                </motion.button>

                <motion.button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg z-20 transition-all hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5 text-blue-600" />
                </motion.button>

                {/* Play/Pause Button */}
                <motion.button
                  onClick={togglePlayPause}
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-20 transition-all hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                >
                  {isPaused ? <Play className="h-4 w-4 text-blue-600" /> : <Pause className="h-4 w-4 text-blue-600" />}
                </motion.button>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 z-20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 z-0 opacity-60"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 z-0 opacity-50"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Slide indicators */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`relative overflow-hidden rounded-full transition-all ${
                      index === currentSlide ? "bg-blue-600 w-10 h-3" : "bg-slate-300 hover:bg-blue-400 w-3 h-3"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {index === currentSlide && !isPaused && (
                      <motion.div
                        className="absolute inset-0 bg-blue-700"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
