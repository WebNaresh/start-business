"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"
import Link from "next/link"

export default function EnhancedHeroSection() {
  const slides = [
    {
      image: "/hero/hero_new.png",
      title: "Start Your Business Journey Now",
      description: "Registration, compliance, and legal services to help your business thrive",
      stats: { clients: "500+", rating: "4.9", time: "24hrs" },
    },
    {
      image: "/hero/hero_new_1.png",
      title: "Expert Guidance For Your Business Growth",
      description: "Get personalized consultation and support for all your business compliance needs",
      stats: { clients: "1000+", rating: "4.8", time: "48hrs" },
    },
    {
      image: "/hero/hero_new_2.png",
      title: "Launch Your Startup With Strategic Support",
      description: "Comprehensive solutions to navigate complex regulatory requirements and focus on your growth",
      stats: { clients: "750+", rating: "4.9", time: "72hrs" },
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setProgress(0)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setProgress(0)
  }, [slides.length])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    setIsPaused(!isPaused)
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

  // Auto-advance with progress tracking
  useEffect(() => {
    if (!isPaused && isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextSlide()
            return 0
          }
          return prev + 2
        })
      }, 100)
      return () => clearInterval(interval)
    }
    return undefined
  }, [isPaused, isPlaying, nextSlide])

  // Service options for hero section
  const mainServices = [
    {
      name: "Private Limited Company",
      href: "/services/private-limited-company",
    },
    {
      name: "Limited Liability Partnership",
      href: "/services/llp",
    },
    {
      name: "One Person Company",
      href: "/services/opc",
    },
    {
      name: "Sole Proprietorship",
      href: "/services/sole-proprietorship",
    },
  ]

  return (
    <section className="relative py-8 md:py-16 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-slate-50">
      {/* Enhanced background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-48 -mt-48 opacity-60 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-slate-100 to-transparent rounded-full -ml-40 -mb-40 opacity-50 blur-2xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {slides[currentSlide].title.split(" ").slice(0, 4).join(" ")}
                </span>{" "}
                <span className="text-slate-800">{slides[currentSlide].title.split(" ").slice(4).join(" ")}</span>
              </h1>

              <p className="text-sm md:text-base text-slate-600 mb-6 max-w-2xl">
                {slides[currentSlide].description}
              </p>
            </div>

            <div className="mb-8 hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "⚡ Quick turnaround time",
                "🎯 Expert legal guidance",
                "🔄 End-to-end business solutions",
                "✅ 100% compliance assured",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-slate-100 hover:bg-white/80 transition-colors"
                >
                  <span className="text-slate-700 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <WhatsAppCTAButton className="">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </WhatsAppCTAButton>
              <Link href="/services" className="md:w-auto w-full">
                <Button variant="outline" className="">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Conditional rendering based on currentSlide */}
          {slides[currentSlide].title === "Launch Your Startup With Strategic Support" ? (
            <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">What type of business are you starting?</h2>
                <div className="flex flex-col gap-3">
                  {mainServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="flex items-center justify-between px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all group text-base font-medium text-slate-800 hover:text-blue-700 shadow-sm"
                    >
                      <span>{service.name}</span>
                      <ArrowRight className="h-5 w-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-xs text-slate-500">
                  Not sure what's right for you?{' '}
                  <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                    Schedule a free consultation →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl">
                <div
                  className="relative rounded-xl overflow-hidden shadow-sm z-10 aspect-[4/3] bg-gradient-to-br from-white to-slate-50"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={slides[currentSlide].image || "/placeholder.svg"}
                      alt={slides[currentSlide].title}
                      fill
                      className="object-contain p-6"
                      priority={currentSlide === 0}
                    />
                  </div>

                  {/* Navigation buttons */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg z-20 transition-all hover:scale-110"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5 text-blue-600" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg z-20 transition-all hover:scale-110"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 w-5 text-blue-600" />
                  </button>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 z-20">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Slide indicators */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`relative overflow-hidden rounded-full transition-all ${
                        index === currentSlide ? "bg-blue-600 w-10 h-3" : "bg-slate-300 hover:bg-blue-400 w-3 h-3"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      {index === currentSlide && (
                        <div
                          className="absolute inset-0 bg-blue-700 transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
