"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Linkedin, X, Mail } from "lucide-react"

export default function AboutTeam() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const team = [
    {
      name: "Rajesh Kumar",
      position: "Founder & CEO",
      bio: "With over 15 years of experience in corporate law and business registration, Rajesh leads our team with vision and expertise.",
      image: "/team-member-1.png",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "rajesh@StartBusiness",
      },
    },
    {
      name: "Priya Sharma",
      position: "Head of Legal",
      bio: "A seasoned legal professional specializing in corporate law, Priya ensures all our services meet the highest legal standards.",
      image: "/team-member-2.png",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "priya@StartBusiness",
      },
    },
    {
      name: "Vikram Singh",
      position: "Compliance Expert",
      bio: "Vikram's deep knowledge of regulatory compliance helps our clients navigate complex compliance requirements with ease.",
      image: "/team-member-3.png",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "vikram@StartBusiness",
      },
    },
    {
      name: "Ananya Patel",
      position: "Client Relations Manager",
      bio: "Ananya ensures our clients receive personalized attention and support throughout their journey with us.",
      image: "/team-member-4.png",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ananya@StartBusiness",
      },
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
    <section className="py-20 bg-slate-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Expert Team</h2>
          <p className="text-lg text-slate-600">
            Meet the professionals who make your business journey smooth and compliant
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((member, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={400}
                  height={320}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={75}
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-center space-x-4">
                      <a
                        href={member.social.linkedin}
                        className="rounded-full bg-white/20 p-2 text-white hover:bg-white hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href={member.social.twitter}
                        className="rounded-full bg-white/20 p-2 text-white hover:bg-white hover:text-blue-600 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="rounded-full bg-white/20 p-2 text-white hover:bg-white hover:text-blue-600 transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-b-lg bg-white p-6 shadow-md">
                <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                <p className="mb-4 text-blue-600">{member.position}</p>
                <p className="text-slate-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
