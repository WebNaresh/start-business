"use client"

import { motion } from "framer-motion"
import { MessageSquare, Phone, Mail, MapPin } from "lucide-react"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

export default function ContactInfo() {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
 
<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 flex justify-center">Let's Connect</h2>
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

      {/* WhatsApp CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100"
      >
        <p className="text-sm text-slate-600 mb-4">
          Need immediate assistance? Our WhatsApp support is available 24/7 for urgent queries.
        </p>
        <WhatsAppCTAButton className="w-full">
          Chat With Us Now
        </WhatsAppCTAButton>
      </motion.div>
    </motion.div>
  )
}
