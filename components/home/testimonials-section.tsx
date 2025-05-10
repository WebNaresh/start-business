"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      text: "StartBusiness.co.in made the company registration process incredibly smooth. Their team was professional and guided us through every step. Highly recommended!",
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
      text: "I was impressed by their attention to detail and prompt responses. The team at StartBusiness.co.in is knowledgeable and professional. Would definitely use their services again.",
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

  const nextTestimonial = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev === testimonials.length - 3 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1))
  }

  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + 3)

  return (
    <section className="py-16" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
          <p className="mx-auto max-w-2xl text-slate-600">Trusted by entrepreneurs and businesses across India</p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index + activeIndex}
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-slate-700">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-slate-200">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-sm text-slate-500">{testimonial.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="rounded-full bg-slate-200 p-2 text-slate-700 hover:bg-navy-100 hover:text-navy-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="rounded-full bg-slate-200 p-2 text-slate-700 hover:bg-navy-100 hover:text-navy-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
