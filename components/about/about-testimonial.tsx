"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star } from "lucide-react"

export default function AboutTestimonial() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-slate-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-lg bg-white p-8 shadow-lg md:p-12">
            <div className="mb-6 flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="mb-8 text-center">
              <p className="mb-4 text-xl font-medium text-slate-700 md:text-2xl">
                "StartBusiness.co.in transformed our business registration experience. Their team's expertise and
                dedication made the entire process smooth and hassle-free. They not only helped us with the registration
                but also provided valuable guidance on compliance requirements. I highly recommend their services to
                anyone looking to start a business in India."
              </p>
              <footer className="text-slate-600">— Amit Patel, Founder & CEO of TechInnovate Solutions</footer>
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="mr-4 h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src="/testimonial-author.png"
                  alt="Amit Patel"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold">Amit Patel</p>
                <p className="text-sm text-slate-500">Founder & CEO, TechInnovate Solutions</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
