"use client"

import { motion } from "framer-motion"
import { MessageSquare, Phone, Mail, MapPin, Clock, Globe, Shield, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function ContactInfo() {
  const isBusinessOpen = () => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()

    if (day === 0 || day === 6) return false // Saturday and Sunday closed
    return hour >= 10 && hour < 19 // Monday-Friday 10-7
  }

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "WhatsApp Chat",
      description: "Get instant responses to your queries",
      value: "Chat with us on WhatsApp",
      href: "https://wa.me/919699214195",
      color: "bg-green-100 text-green-600",
      hoverColor: "hover:bg-green-200",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      value: "+91 96992 14195",
      href: "tel:+919699214195",
      color: "bg-blue-100 text-blue-600",
      hoverColor: "hover:bg-blue-200",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed inquiries",
      value: "sales@biztreeaccounting.com",
      href: "mailto:sales@biztreeaccounting.com",
      color: "bg-purple-100 text-purple-600",
      hoverColor: "hover:bg-purple-200",
    },
    {
      icon: MapPin,
      title: "Office Address",
      description: "Visit us for in-person consultation",
      value: "Office No 7, 3rd Floor, Saraswati Heights, Deccan Gymkhana, Behind Goodluck Café, Pune 411004",
      href: "#map",
      color: "bg-orange-100 text-orange-600",
      hoverColor: "hover:bg-orange-200",
    },
  ]

  const businessHours = [
    { day: "Monday - Friday", hours: "10:00 AM - 7:00 PM", isToday: [1, 2, 3, 4, 5].includes(new Date().getDay()) },
    { day: "Saturday", hours: "Closed", isToday: new Date().getDay() === 6 },
    { day: "Sunday", hours: "Closed", isToday: new Date().getDay() === 0 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Let's Connect</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Ready to start your business journey? Choose your preferred way to reach out to our expert team.
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-sm font-medium text-slate-700">100% Secure</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-sm font-medium text-slate-700">Certified Experts</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <Globe className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-sm font-medium text-slate-700">Pan India Service</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-xl">
          <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <div className="text-sm font-medium text-slate-700">Quick Response</div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="space-y-4">
        {contactMethods.map((method, index) => (
          <motion.a
            key={index}
            href={method.href}
            target={method.href.startsWith("http") ? "_blank" : undefined}
            rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group block p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg"
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl ${method.color} ${method.hoverColor} transition-colors duration-300`}>
                <method.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-sm text-slate-500 mb-2">{method.description}</p>
                <p className="text-slate-700 font-medium break-words">{method.value}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Business Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-800 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Business Hours
          </h3>
          <Badge
            variant={isBusinessOpen() ? "default" : "secondary"}
            className={`${
              isBusinessOpen()
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-red-100 text-red-700 border-red-200"
            }`}
          >
            {isBusinessOpen() ? "Open Now" : "Closed"}
          </Badge>
        </div>

        <div className="space-y-3">
          {businessHours.map((schedule, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                schedule.isToday ? "bg-blue-100 border border-blue-200" : "bg-white/50"
              }`}
            >
              <span className={`font-medium ${schedule.isToday ? "text-blue-800" : "text-slate-700"}`}>
                {schedule.day}:
              </span>
              <span className={`${schedule.isToday ? "text-blue-700 font-semibold" : "text-slate-600"}`}>
                {schedule.hours}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-blue-200">
          <p className="text-sm text-slate-600 mb-4">
            Need immediate assistance? Our WhatsApp support is available 24/7 for urgent queries.
          </p>
          <WhatsAppCTAButton className="w-full">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat With Us Now
          </WhatsAppCTAButton>
        </div>
      </motion.div>
    </motion.div>
  )
}
