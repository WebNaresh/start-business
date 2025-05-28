"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Building2, TrendingUp, Clock, FileCheck, Users, Star, ArrowUp, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TrustStatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [counters, setCounters] = useState({
    businesses: 0,
    successRate: 0,
    hoursSaved: 0,
    compliances: 0,
  })

  const finalStats = {
    businesses: 1000,
    successRate: 100,
    hoursSaved: 2000,
    compliances: 5000,
  }

  // Animated counter effect
  useEffect(() => {
    if (inView) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const stepDuration = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setCounters({
          businesses: Math.floor(finalStats.businesses * progress),
          successRate: Math.floor(finalStats.successRate * progress),
          hoursSaved: Math.floor(finalStats.hoursSaved * progress),
          compliances: Math.floor(finalStats.compliances * progress),
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounters(finalStats)
        }
      }, stepDuration)

      return () => clearInterval(timer)
    }
  }, [inView])

  const stats = [
    {
      icon: Building2,
      value: `${counters.businesses}+`,
      label: "Business Registered",
      description: "Across India",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+15% this month",
    },
    {
      icon: TrendingUp,
      value: `${counters.successRate}%`,
      label: "Success Rate",
      description: "Positive client feedback",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      trend: "Perfect record",
    },
    {
      icon: Clock,
      value: `${counters.hoursSaved}+`,
      label: "Hours Saved",
      description: "Through automation & tools",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      trend: "Per client avg",
    },
    {
      icon: FileCheck,
      value: `${counters.compliances}+`,
      label: "Compliances Managed",
      description: "GST, ITR, TDS annually",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      trend: "Zero penalties",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section
      className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full -ml-48 -mt-48 opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full -mr-40 -mb-40 opacity-30 blur-2xl" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-4 h-4 bg-purple-400 rounded-full opacity-30"
        animate={{ y: [0, 15, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 px-6 py-3 text-sm">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Trusted by Entrepreneurs Nationwide
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
            Why Entrepreneurs{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trust Us</span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            With thousands of successful business registrations and a proven track record, we're the preferred choice
            for entrepreneurs across India.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="group relative">
              {/* Main Card */}
              <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="relative z-10">
                  <div
                    className={`${stat.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>

                  {/* Value */}
                  <motion.div
                    className="text-4xl md:text-5xl font-bold text-slate-800 mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">{stat.label}</h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 mb-4">{stat.description}</p>

                  {/* Trend Badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={`text-xs ${stat.bgColor} ${stat.iconColor} border-0`}>
                      <ArrowUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </Badge>
                    <CheckCircle className={`w-5 h-5 ${stat.iconColor} opacity-60`} />
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}
                />
              </div>

              {/* Floating Number Effect */}
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                {index + 1}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

   
      </div>
    </section>
  )
}
