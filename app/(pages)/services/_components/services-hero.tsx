"use client"

import { motion } from "framer-motion"
import { Search, Filter, ArrowRight, Star, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function ServicesHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -ml-40 -mb-40 blur-2xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 py-2">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Complete Business Solutions
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Services
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              From business registration to compliance management, we provide end-to-end solutions for your
              entrepreneurial journey.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for services (e.g., Company Registration, GST Filing...)"
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20 focus:border-white/40 rounded-xl"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-blue-200 text-sm">Services</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-blue-200 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-200 text-sm">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-blue-200 text-sm">Compliance</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WhatsAppCTAButton className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
                Get Expert Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </WhatsAppCTAButton>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm text-lg"
              >
                <Users className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
