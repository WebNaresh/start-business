"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function AboutTimeline() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const milestones = [
    {
      year: "2017",
      title: "Company Founded",
      description: "StartBusiness was established with a vision to simplify business registration in India.",
    },
    {
      year: "2019",
      title: "Expanded Services",
      description: "Added trademark registration and intellectual property services to our portfolio.",
    },
    {
      year: "2020",
      title: "1000+ Clients",
      description: "Reached the milestone of serving over 1000 businesses across India.",
    },
    {
      year: "2021",
      title: "Digital Transformation",
      description: "Launched our digital platform for seamless service delivery and client communication.",
    },
    {
      year: "2022",
      title: "Pan-India Presence",
      description: "Expanded our operations to serve clients across all states and union territories in India.",
    },
    {
      year: "2023",
      title: "5000+ Success Stories",
      description: "Celebrated the milestone of successfully serving over 5000 businesses.",
    },
  ]

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Journey</h2>
          <p className="text-lg text-slate-600">Key milestones in our growth story</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-blue-200 md:block"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Circle on the timeline */}
                <div className="absolute left-1/2 top-0 hidden h-6 w-6 -translate-x-1/2 rounded-full border-4 border-blue-600 bg-white md:block"></div>

                {/* Content */}
                <div className="md:w-1/2 md:px-8">
                  <div
                    className={`rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow ${
                      index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    <div className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                      {milestone.year}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{milestone.title}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
                </div>

                {/* Empty div for spacing on the other side */}
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
