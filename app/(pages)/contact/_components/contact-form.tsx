"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const services = [
    { value: "company-registration", label: "Company Registration" },
    { value: "trademark", label: "Trademark Registration" },
    { value: "compliance", label: "Compliance Services" },
    { value: "llp", label: "LLP Registration" },
    { value: "fssai", label: "FSSAI License" },
    { value: "tax-services", label: "Tax Services" },
    { value: "other", label: "Other Services" },
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.service) newErrors.service = "Please select a service"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 2000)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center border border-green-200"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-600 mb-6">
          Thank you for contacting us. Our team will get back to you within 24 hours.
        </p>
        <WhatsAppCTAButton className="bg-green-500 hover:bg-green-600">Continue on WhatsApp</WhatsAppCTAButton>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-8 shadow-2xl border border-slate-100"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Send us a Message</h3>
        <p className="text-slate-600">Fill out the form below and we'll get back to you within 24 hours.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 flex items-center">
              <User className="w-4 h-4 mr-2" />
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={`transition-all duration-300 ${
                errors.firstName ? "border-red-300 focus:border-red-500" : "focus:border-blue-500"
              }`}
            />
            {errors.firstName && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm flex items-center"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.firstName}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className={`transition-all duration-300 ${
                errors.lastName ? "border-red-300 focus:border-red-500" : "focus:border-blue-500"
              }`}
            />
            {errors.lastName && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm flex items-center"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.lastName}
              </motion.p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`transition-all duration-300 ${
              errors.email ? "border-red-300 focus:border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-slate-700 flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`transition-all duration-300 ${
              errors.phone ? "border-red-300 focus:border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.phone}
            </motion.p>
          )}
        </div>

        {/* Service Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700 flex items-center">
            <Building className="w-4 h-4 mr-2" />
            Service Interested In
          </Label>
          <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
            <SelectTrigger
              className={`transition-all duration-300 ${
                errors.service ? "border-red-300 focus:border-red-500" : "focus:border-blue-500"
              }`}
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.service}
            </motion.p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium text-slate-700 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message
          </Label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Please describe your requirements..."
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className={`transition-all duration-300 resize-none ${
              errors.message ? "border-red-300 focus:border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message}
            </motion.p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <WhatsAppCTAButton className="order-2 sm:order-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat on WhatsApp
          </WhatsAppCTAButton>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="order-1 sm:order-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
