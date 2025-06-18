"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, MessageSquare, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import CallCTAButton from "@/components/call-cta-button"
import Script from "next/script"
import { toast } from "sonner"
import { z } from "zod"

// Define the validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  phone: z.string()
    .regex(/^[0-9+\-\s()]*$/, "Phone number can only contain numbers, +, -, (, ), and spaces")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be less than 10 digits"),
  service: z.string()
    .min(1, "Please select a service"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})

  const validateField = (name: keyof ContactFormData, value: string) => {
    try {
      contactFormSchema.shape[name].parse(value)
      setErrors(prev => ({ ...prev, [name]: undefined }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }))
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    validateField(name as keyof ContactFormData, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate all fields
      contactFormSchema.parse(formData)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Success toast with Sonner
      toast.success('Message Sent Successfully!', {
        description: 'Thank you for contacting us. We will get back to you shortly.',
        duration: 5000,
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      })
    } catch (error) {
      console.error('Error:', error)
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
        error.errors.forEach(err => {
          const path = err.path[0] as keyof ContactFormData
          newErrors[path] = err.message
        })
        setErrors(newErrors)
        toast.error('Validation Error', {
          description: 'Please check the form for errors.',
          duration: 5000,
        })
      } else if (error instanceof Error) {
        toast.error('Error Sending Message', {
          description: error.message,
          duration: 5000,
          action: {
            label: 'Try Again',
            onClick: () => toast.dismiss(),
          },
        })
      } else {
        toast.error('Error Sending Message', {
          description: 'Please try again later or contact us directly.',
          duration: 5000,
          action: {
            label: 'Try Again',
            onClick: () => toast.dismiss(),
          },
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Enhanced structured data for better SEO
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Start Business",
    "description": "Professional business registration and compliance services in India",
    "url": "https://startbusiness.co.in",
    "logo": "https://startbusiness.co.in/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office No 7, 3rd Floor, Saraswati Heights, Deccan Gymkhana, Behind Goodluck Café",
      "addressLocality": "Pune",
      "postalCode": "411004",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+919168499520",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Marathi"],
        "areaServed": "IN",
        "hoursAvailable": "Mo-Fr 10:00-19:00"
      }
    ],
    "sameAs": [
      "https://facebook.com/startbusiness",
      "https://twitter.com/startbusiness",
      "https://linkedin.com/company/startbusiness",
      "https://instagram.com/startbusiness"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    }
  }

  return (
    <section 
      className="bg-gradient-to-br from-slate-50 to-blue-50/30 py-12 sm:py-8 md:py-8"
      aria-labelledby="contact-heading"
    >
      <Script
        id="contact-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 
            id="contact-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Contact Us
          </h2>
        
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-slate-100">
            <div className="mb-8 space-y-4" role="list" aria-label="Contact information">
              <div className="flex items-center p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors duration-300" role="listitem">
                <div className="mr-4 rounded-full bg-blue-100 p-2.5" aria-hidden="true">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Phone Support</p>
                  <a 
                    href="tel:+919168499520" 
                    className="text-base font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    aria-label="Call us at +91 91684 99520"
                  >
                    +91 91684 99520
                  </a>
                </div>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors duration-300" role="listitem">
                <div className="mr-4 rounded-full bg-blue-100 p-2.5" aria-hidden="true">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Contact Form</p>
                  <a 
                    href="/contact" 
                    className="text-base font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    aria-label="Send us a message through our contact form"
                  >
                    Send us a Message
                  </a>
                </div>
              </div>
              <div className="flex items-start p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors duration-300" role="listitem">
                <div className="mr-4 rounded-full bg-blue-100 p-2.5" aria-hidden="true">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Office Location</p>
                  <address className="text-base font-semibold text-slate-700 not-italic">
                    Office No 7, 3rd Floor, Saraswati Heights, Deccan Gymkhana, Behind Goodluck Café, Pune 411004
                  </address>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mb-8 p-4 rounded-lg bg-blue-50 border border-blue-100">
              <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center">
                <Building2 className="h-4 w-4 mr-2 text-blue-600" />
                Business Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Monday - Friday</span>
                  <span className="font-medium text-slate-800">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Saturday - Sunday</span>
                  <span className="font-medium text-slate-800">Closed</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div 
              className="flex justify-center space-x-3"
              role="list"
              aria-label="Social media links"
            >
              <a
                href="#"
                className="rounded-full bg-slate-100 p-2.5 text-slate-600 transition-all hover:bg-blue-600 hover:text-white hover:scale-110"
                aria-label="Visit our Facebook page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="#"
                className="rounded-full bg-slate-100 p-2.5 text-slate-600 transition-all hover:bg-blue-600 hover:text-white hover:scale-110"
                aria-label="Follow us on Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="rounded-full bg-slate-100 p-2.5 text-slate-600 transition-all hover:bg-blue-600 hover:text-white hover:scale-110"
                aria-label="Connect with us on LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a
                href="#"
                className="rounded-full bg-slate-100 p-2.5 text-slate-600 transition-all hover:bg-blue-600 hover:text-white hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-slate-100">
            <form 
              className="space-y-4"
              aria-labelledby="contact-form-heading"
              onSubmit={handleSubmit}
              noValidate
            >
              <h3 
                id="contact-form-heading"
                className="text-xl font-semibold text-slate-800 mb-6"
              >
                Send us a Message
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-slate-300'} p-2.5 text-slate-900 focus:border-blue-500 focus:ring-blue-500 transition-colors`}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300'} p-2.5 text-slate-900 focus:border-blue-500 focus:ring-blue-500 transition-colors`}
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${errors.phone ? 'border-red-500' : 'border-slate-300'} p-2.5 text-slate-900 focus:border-blue-500 focus:ring-blue-500 transition-colors`}
                  placeholder="+91 91684 99520"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="service" className="mb-2 block text-sm font-medium text-slate-700">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${errors.service ? 'border-red-500' : 'border-slate-300'} p-2.5 text-slate-900 focus:border-blue-500 focus:ring-blue-500 transition-colors`}
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? 'service-error' : undefined}
                >
                  <option value="">Select a service</option>
                  <option value="company-registration">Company Registration</option>
                  <option value="trademark">Trademark Registration</option>
                  <option value="compliance">Compliance Services</option>
                  <option value="other">Other Services</option>
                </select>
                {errors.service && (
                  <p id="service-error" className="mt-1 text-sm text-red-600">
                    {errors.service}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full rounded-lg border ${errors.message ? 'border-red-500' : 'border-slate-300'} p-2.5 text-slate-900 focus:border-blue-500 focus:ring-blue-500 transition-colors resize-none`}
                  placeholder="Tell us about your requirements"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <CallCTAButton 
                  className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg"
                  aria-label="Call us now for immediate assistance"
                >
                  Call Us Now
                </CallCTAButton>
                <Button 
                  type="submit" 
                  className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg"
                  aria-label="Submit your message"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Sending...</span>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">Send Message</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
