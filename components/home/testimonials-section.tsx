"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Star, ChevronLeft, ChevronRight, Quote, Play, Pause } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface Testimonial {
  text: string
  position: string
  name?: string
  company?: string
  rating?: number
}

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
  isActive: boolean
  isMobile: boolean
}

function TestimonialCard({ testimonial, index, isActive, isMobile }: TestimonialCardProps) {
  return (
    <div
      className={`
        flex-1 rounded-2xl bg-white/80 backdrop-blur-sm p-6 md:p-8 
        shadow-lg hover:shadow-xl border border-blue-100/50
        transition-all duration-300 ease-in-out relative group
        ${isActive ? 'scale-105 shadow-2xl ring-2 ring-blue-500/20' : 'hover:scale-102'}
        ${isMobile ? 'w-full' : 'min-h-[280px]'}
      `}
      role="article"
      aria-label={`Testimonial from ${testimonial.position}`}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Small quote icon */}
      <div className="absolute top-4 right-4 text-blue-200/60 group-hover:text-blue-300/80 transition-colors duration-300">
        <Quote className="w-6 h-6 md:w-8 md:h-8" />
      </div>

      {/* Star rating */}
      <div className="mb-4 md:mb-6 flex items-center gap-1 relative z-10">
        {Array.from({ length: testimonial.rating || 5 }).map((_, starIndex) => (
          <Star 
            key={starIndex} 
            className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" 
          />
        ))}
        <span className="ml-2 text-xs md:text-sm text-slate-500 font-medium">
          {testimonial.rating || 5}.0
        </span>
      </div>

      {/* Testimonial text */}
      <blockquote className="mb-4 md:mb-6 text-sm md:text-base text-slate-700 leading-relaxed relative z-10 font-medium">
        "{testimonial.text}"
      </blockquote>

      {/* Attribution */}
      <div className="flex items-start relative z-10">
        <div className="flex-1">
          <cite className="not-italic">
            <p className="text-xs md:text-sm font-semibold text-slate-900 mb-1">
              {testimonial.position}
            </p>
            {testimonial.company && (
              <p className="text-xs text-blue-600 font-medium">
                {testimonial.company}
              </p>
            )}
          </cite>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      text: "StartBusiness transformed our LLP registration experience from complex to seamless. Their expertise in project management consulting helped us navigate all legal requirements effortlessly. The team's professionalism exceeded our expectations!",
      position: "Managing Partner, Apaha Institute Of Construction Project Management LLP",
      rating: 5
    },
    {
      text: "As an overseas education consultancy, we needed partners who understood international compliance. StartBusiness delivered exceptional service for our LLP formation and ongoing regulatory support. Truly professional!",
      position: "Founder, Apaha Overseas Study LLP",
      rating: 5
    },
    {
      text: "For a technology startup, speed and accuracy are crucial. StartBusiness handled our private limited company registration with remarkable efficiency. Their digital-first approach perfectly matched our tech-focused vision.",
      position: "CEO, Lightnet Technology Private Limited",
      rating: 5
    },
    {
      text: "Starting a salon and academy required multiple licenses and registrations. StartBusiness managed everything - from company incorporation to MSME registration. Their comprehensive approach saved us months of paperwork!",
      position: "Director, Mangesha'z Salon & Academy Private Limited",
      rating: 5
    },
    {
      text: "The team at StartBusiness understood our technology business needs perfectly. They expedited our private limited company registration and helped us secure all necessary tech compliance certifications. Outstanding service!",
      position: "CTO, Octogle Technologies Private Limited",
      rating: 5
    },
    {
      text: "Healthcare consulting requires strict regulatory compliance. StartBusiness guided our LLP formation while ensuring we met all healthcare industry standards. Their expertise in healthcare regulations was invaluable.",
      position: "Co-founder, Multicare Health Services And Consultancy LLP",
      rating: 5
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
  const isMobile = useMobile(640)
  const isTablet = useMobile(1024)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Determine number of visible testimonials based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (isMobile) {
        setVisibleCount(1)
      } else if (isTablet) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    updateVisibleCount()
  }, [isMobile, isTablet])

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
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

    if (isLeftSwipe) {
      nextTestimonial()
    } else if (isRightSwipe) {
      prevTestimonial()
    }
  }

  // Enhanced navigation with transition states
  const nextTestimonial = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === testimonials.length - visibleCount ? 0 : prev + 1))
    
    setTimeout(() => setIsTransitioning(false), 300)
  }, [testimonials.length, visibleCount, isTransitioning])

  const prevTestimonial = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - visibleCount : prev - 1))
    
    setTimeout(() => setIsTransitioning(false), 300)
  }, [testimonials.length, visibleCount, isTransitioning])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prevTestimonial()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      nextTestimonial()
    } else if (e.key === ' ') {
      e.preventDefault()
      setIsPaused(prev => !prev)
    }
  }, [nextTestimonial, prevTestimonial])

  // Enhanced auto-play with better cleanup
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextTestimonial()
      }, 4000) // Reduced interval for better engagement
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, nextTestimonial])

  // Add keyboard event listeners
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('keydown', handleKeyDown)
      return () => container.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + visibleCount)

  // Ensure we have enough testimonials visible when near the end
  if (visibleTestimonials.length < visibleCount) {
    const remaining = visibleCount - visibleTestimonials.length
    visibleTestimonials.push(...testimonials.slice(0, remaining))
  }

  return (
    <section
      ref={containerRef}
      className="py-12 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      tabIndex={0}
      role="region"
      aria-label="Customer testimonials"
      aria-live="polite"
    >
      {/* Enhanced background decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full -mr-36 -mt-36 opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full -ml-48 -mb-48 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-full opacity-30"></div>
      
      {/* Improved dot pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.4) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header section */}
        <div className="mb-16 lg:mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-100/80 rounded-full border border-blue-200/50 backdrop-blur-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>Client Testimonials</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            What Our Clients Say
          </h2>
          
          <p className="text-base md:text-lg text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Trusted by entrepreneurs and businesses across India for reliable, efficient, and professional services
          </p>


        </div>

        <div className="relative">
          {/* Large decorative quote icon */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-blue-200/40 z-0">
            <Quote className="w-24 h-24 md:w-32 md:h-32" />
          </div>

          {/* Touch-enabled testimonials container */}
          <div 
            className="overflow-hidden px-2 sm:px-4 lg:px-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`
              flex transition-all duration-500 ease-in-out
              ${isMobile ? 'flex-col space-y-6' : 'space-x-6'}
              ${isTransitioning ? 'transform scale-[0.98] opacity-90' : 'transform scale-100 opacity-100'}
            `}>
              {visibleTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${activeIndex}-${index}`}
                  testimonial={testimonial}
                  index={index}
                  isActive={index === Math.floor(visibleCount / 2)}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>

          {/* Enhanced navigation buttons */}
          <div className="absolute top-1/2 left-0 right-0 -mt-6 flex justify-between px-0 sm:px-2 md:px-4 pointer-events-none z-20">
            <button
              onClick={prevTestimonial}
              disabled={isTransitioning}
              className="
                rounded-full bg-white/90 backdrop-blur-sm p-2 md:p-3 
                text-blue-600 shadow-lg hover:bg-blue-600 hover:text-white 
                transition-all duration-300 transform -translate-y-1/2 pointer-events-auto 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                border border-blue-100 hover:border-blue-600
                hover:scale-110 active:scale-95
              "
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              disabled={isTransitioning}
              className="
                rounded-full bg-white/90 backdrop-blur-sm p-2 md:p-3 
                text-blue-600 shadow-lg hover:bg-blue-600 hover:text-white 
                transition-all duration-300 transform -translate-y-1/2 pointer-events-auto 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                border border-blue-100 hover:border-blue-600
                hover:scale-110 active:scale-95
              "
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>

          {/* Enhanced pagination indicators */}
          <div className="mt-12 lg:mt-16 flex flex-col items-center space-y-4">
            <div className="flex justify-center space-x-2">
              {Array.from({ length: testimonials.length - visibleCount + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  disabled={isTransitioning}
                  className={`
                    h-2.5 rounded-full transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    disabled:cursor-not-allowed
                    ${activeIndex === index 
                      ? "w-8 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md" 
                      : "w-2.5 bg-blue-200 hover:bg-blue-300 hover:scale-125"
                    }
                  `}
                  aria-label={`Go to testimonial group ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : "false"}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
