"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function AboutAwards() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const awards = [
    {
      title: "Best Business Consultancy",
      organization: "Business Excellence Awards",
      year: "2023",
      image: "/award-1.png",
    },
    {
      title: "Top Legal Services Provider",
      organization: "Legal Industry Awards",
      year: "2022",
      image: "/award-2.png",
    },
    {
      title: "Customer Service Excellence",
      organization: "National Business Awards",
      year: "2021",
      image: "/award-3.png",
    },
    {
      title: "Innovation in Business Services",
      organization: "Digital Business Awards",
      year: "2020",
      image: "/award-4.png",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Awards & Recognition</h2>
          <p className="text-lg text-slate-600">Our commitment to excellence has been recognized by the industry</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {awards.map((award, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="mb-4 h-32 w-32 relative">
                <Image src={award.image || "/placeholder.svg"} alt={award.title} fill className="object-contain" quality={75} // Reduce if needed
  priority={true} 
  placeholder="blur"     blurDataURL="/placeholder.svg"/>
              </div>
              <div className="mb-2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                {award.year}
              </div>
              <h3 className="mb-2 text-xl font-bold">{award.title}</h3>
              <p className="text-slate-600">{award.organization}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
