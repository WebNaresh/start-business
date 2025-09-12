"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "StartBusiness transformed our LLP registration experience from complex to seamless. Their expertise in project management consulting helped us navigate all legal requirements effortlessly. The team's professionalism exceeded our expectations!",
      position: "Managing Partner, Apaha Institute Of Construction Project Management LLP",
    },
    {
      text: "As an overseas education consultancy, we needed partners who understood international compliance. StartBusiness delivered exceptional service for our LLP formation and ongoing regulatory support. Truly professional!",
      position: "Founder, Apaha Overseas Study LLP",
    },
    {
      text: "For a technology startup, speed and accuracy are crucial. StartBusiness handled our private limited company registration with remarkable efficiency. Their digital-first approach perfectly matched our tech-focused vision.",
      position: "CEO, Lightnet Technology Private Limited",
    },
    {
      text: "Starting a salon and academy required multiple licenses and registrations. StartBusiness managed everything - from company incorporation to MSME registration. Their comprehensive approach saved us months of paperwork!",
      position: "Director, Mangesha'z Salon & Academy Private Limited",
    },
    {
      text: "The team at StartBusiness understood our technology business needs perfectly. They expedited our private limited company registration and helped us secure all necessary tech compliance certifications. Outstanding service!",
      position: "CTO, Octogle Technologies Private Limited",
    },
    {
      text: "Healthcare consulting requires strict regulatory compliance. StartBusiness guided our LLP formation while ensuring we met all healthcare industry standards. Their expertise in healthcare regulations was invaluable.",
      position: "Co-founder, Multicare Health Services And Consultancy LLP",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleCount, setVisibleCount] = useState(3)

  // Determine number of visible testimonials based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize() // Initial call
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev === testimonials.length - visibleCount ? 0 : prev + 1))
  }, [testimonials.length, visibleCount])

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - visibleCount : prev - 1))
  }, [testimonials.length, visibleCount])

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextTestimonial()
      }, 5000)
      return () => clearInterval(interval)
    }
    return undefined
  }, [isPaused, nextTestimonial])

  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + visibleCount)

  // Ensure we have enough testimonials visible when near the end
  if (visibleTestimonials.length < visibleCount) {
    const remaining = visibleCount - visibleTestimonials.length
    visibleTestimonials.push(...testimonials.slice(0, remaining))
  }

  return (
    <section
      className="py-8 md:py-16 relative overflow-hidden bg-gradient-to-b from-white to-blue-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -mr-32 -mt-32 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full -ml-48 -mb-48 opacity-30"></div>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100">
            Testimonials
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">What Our Clients Say</h2>
          <p className="text-sm text-slate-600 mb-8 max-w-2xl mx-auto">
            Trusted by entrepreneurs and businesses across India for reliable and efficient services
          </p>
        </div>

        <div className="relative">
          {/* Large quote icon */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-blue-100">
            <Quote className="w-20 h-20" />
          </div>

          <div className="overflow-hidden px-4">
            <div className="flex flex-col space-y-8 sm:space-y-6 md:flex-row md:space-x-6 md:space-y-0">
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  key={index + activeIndex}
                  className="flex-1 rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all border border-blue-50 relative"
                >
                  {/* Small quote icon */}
                  <div className="absolute top-4 right-4 text-blue-100">
                    <Quote className="w-8 h-8" />
                  </div>

                  <div className="mb-6 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-base text-slate-700 leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-0 right-0 -mt-6 flex justify-between px-2 md:px-4 pointer-events-none">
            <button
              onClick={prevTestimonial}
              className="rounded-full bg-white p-3 text-blue-600 shadow-lg hover:bg-blue-600 hover:text-white transition-colors transform -translate-y-1/2 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="rounded-full bg-white p-3 text-blue-600 shadow-lg hover:bg-blue-600 hover:text-white transition-colors transform -translate-y-1/2 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Pagination indicators */}
          <div className="mt-12 flex justify-center space-x-2">
            {Array.from({ length: testimonials.length - visibleCount + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === index ? "w-8 bg-blue-600" : "w-2.5 bg-blue-200 hover:bg-blue-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={activeIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
