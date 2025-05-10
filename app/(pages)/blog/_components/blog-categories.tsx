"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { 
  Building2, 
  FileText, 
  Scale, 
  Rocket, 
  Calculator, 
  TrendingUp 
} from "lucide-react"

export default function BlogCategories() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const categories = [
    {
      title: "Business Registration",
      description: "Complete guides and updates on company registration processes",
      icon: Building2,
      count: 24
    },
    {
      title: "Tax Compliance",
      description: "Latest updates on GST, income tax, and other tax regulations",
      icon: Calculator,
      count: 18
    },
    {
      title: "Legal Updates",
      description: "Important legal changes affecting businesses in India",
      icon: Scale,
      count: 15
    },
    {
      title: "Startup Guide",
      description: "Resources and guides for startup founders",
      icon: Rocket,
      count: 20
    },
    {
      title: "Company Law",
      description: "Updates on company law and corporate governance",
      icon: FileText,
      count: 12
    },
    {
      title: "Business Growth",
      description: "Strategies and tips for business growth and expansion",
      icon: TrendingUp,
      count: 16
    }
  ]

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Browse by <span className="text-[#2563eb]">Category</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of articles organized by topics
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-[#2563eb] hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
                  <category.icon className="w-6 h-6 text-[#2563eb] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#2563eb] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 mb-3">
                    {category.description}
                  </p>
                  <span className="text-sm text-slate-500">
                    {category.count} articles
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 