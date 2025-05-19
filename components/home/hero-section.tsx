"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function HeroSection() {
  const slides = [
    {
      image: "/hero-slide-1.png",
      title: "Start Your Business Journey With Confidence",
      description: "Professional business registration, compliance, and legal services to help your business thrive",
    },
    {
      image: "/hero-slide-2.png",
      title: "Expert Guidance For Your Business Growth",
      description: "Get personalized consultation and support for all your business compliance needs",
    },
    {
      image: "/hero-slide-3.png",
      title: "Launch Your Startup With Strategic Support",
      description: "Comprehensive solutions to navigate complex regulatory requirements and focus on your growth",
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000)
      return () => clearInterval(interval)
    }
    return undefined
  }, [isPaused, nextSlide])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  }

  return (
    <section className="relative py-4 md:py-8 overflow-hidden bg-white">
      {/* Modern geometric shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-50 rounded-full -ml-48 -mb-48 opacity-40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
           
            </motion.div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, type: "tween" }}
              >
                <motion.h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  <span className="text-blue-600">{slides[currentSlide].title.split(" ").slice(0, 4).join(" ")}</span>{" "}
                  <span className="text-slate-800">{slides[currentSlide].title.split(" ").slice(4).join(" ")}</span>
                </motion.h1>

                <motion.p className="mb-6 text-lg text-slate-600 md:text-xl max-w-lg">
                  {slides[currentSlide].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Quick turnaround time",
                "Expert legal guidance",
                "End-to-end business solutions",
                "100% compliance assured",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <CheckCircle className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="text-slate-700 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <WhatsAppCTAButton className="group transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-200">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </WhatsAppCTAButton>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg">
                Our Services
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl">
              {/* Slider container */}
              <div
                className="relative rounded-2xl  overflow-hidden  z-10 aspect-[4/3]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, type: "tween" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slides[currentSlide].image || "/placeholder.svg"}
                      alt={slides[currentSlide].title}
                      fill
                      className="object-contain p-4"
                      priority={currentSlide === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-20 transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5 text-blue-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-20 transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5 text-blue-600" />
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-blue-100 z-0"></div>
              <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-blue-50 z-0"></div>

              {/* Slide indicators */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentSlide ? "bg-blue-600 w-8" : "bg-slate-300 hover:bg-blue-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
