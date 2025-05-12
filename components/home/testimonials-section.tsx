"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function TestimonialsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      text: "StartBusiness made the company registration process incredibly smooth. Their team was professional and guided us through every step. Highly recommended!",
      author: "Rahul Sharma",
      position: "CEO, TechStart Solutions",
      image: "/diverse-business-person.png",
    },
    {
      text: "The trademark registration service was excellent. They handled all the paperwork and kept me informed throughout the process. Great service at a reasonable price.",
      author: "Priya Patel",
      position: "Founder, StyleHub",
      image: "/indian-businesswoman.png",
    },
    {
      text: "Their compliance services have been invaluable for our business. They ensure we meet all regulatory requirements and help us avoid potential legal issues.",
      author: "Vikram Singh",
      position: "Director, Global Exports Ltd",
      image: "/indian-businessman.png",
    },
    {
      text: "I was impressed by their attention to detail and prompt responses. The team at StartBusiness is knowledgeable and professional. Would definitely use their services again.",
      author: "Ananya Desai",
      position: "Co-founder, Innovate Solutions",
      image: "/indian-businesswoman.png",
    },
    {
      text: "The MSME registration process was quick and hassle-free. Their team took care of everything, allowing me to focus on my business operations.",
      author: "Rajesh Kumar",
      position: "Owner, Craft Creations",
      image: "/indian-businessman.png",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
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
    setDirection(1)
    setActiveIndex((prev) => (prev === testimonials.length - visibleCount ? 0 : prev + 1))
  }, [testimonials.length, visibleCount])

  const prevTestimonial = useCallback(() => {
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - visibleCount : prev - 1))
  }, [testimonials.length, visibleCount])

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && inView) {
      const interval = setInterval(() => {
        nextTestimonial()
      }, 5000)
      return () => clearInterval(interval)
    }
    return undefined
  }, [isPaused, inView, nextTestimonial])

  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + visibleCount)

  // Ensure we have enough testimonials visible when near the end
  if (visibleTestimonials.length < visibleCount) {
    const remaining = visibleCount - visibleTestimonials.length
    visibleTestimonials.push(...testimonials.slice(0, remaining))
  }

  return (
    <section
      className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-blue-50"
      ref={ref}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -mr-32 -mt-32 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full -ml-48 -mb-48 opacity-30"></div>
      <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-[0.03]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-[#2563eb] bg-blue-50 rounded-full border border-blue-100">
            Testimonials
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-slate-800">What Our Clients Say</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Trusted by entrepreneurs and businesses across India for reliable and efficient services
          </p>
        </motion.div>

        <div className="relative">
          {/* Large quote icon */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-blue-100">
            <Quote className="w-20 h-20" />
          </div>

          <div className="overflow-hidden px-4">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col space-y-8 sm:space-y-6 md:flex-row md:space-x-6 md:space-y-0"
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={index + activeIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    <p className="mb-6 text-slate-700 leading-relaxed">{testimonial.text}</p>
                    <div className="flex items-center">
                      <div className="mr-4 h-14 w-14 overflow-hidden rounded-full border-2 border-[#2563eb]/20">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#2563eb]">{testimonial.author}</h4>
                        <p className="text-sm text-slate-500">{testimonial.position}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-0 right-0 -mt-6 flex justify-between px-2 md:px-4 pointer-events-none">
            <button
              onClick={prevTestimonial}
              className="rounded-full bg-white p-3 text-[#2563eb] shadow-lg hover:bg-[#2563eb] hover:text-white transition-colors transform -translate-y-1/2 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="rounded-full bg-white p-3 text-[#2563eb] shadow-lg hover:bg-[#2563eb] hover:text-white transition-colors transform -translate-y-1/2 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
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
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === index ? "w-8 bg-[#2563eb]" : "w-2.5 bg-blue-200 hover:bg-blue-300"
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
