"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Send, CheckCircle } from "lucide-react"
import { z } from "zod"
import { motion } from "framer-motion"

// Validation schema for service-specific form (with captcha)
const zohoServiceFormSchema = z.object({
  firstName: z.string()
    .min(1, "First name is required")
    .max(40, "First name must be less than 40 characters")
    .regex(/^[a-zA-Z\s]*$/, "First name can only contain letters and spaces"),
  lastName: z.string()
    .min(1, "Last name is required")
    .max(80, "Last name must be less than 80 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name can only contain letters and spaces"),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]*$/, "Phone number can only contain numbers, +, -, (, ), and spaces")
    .max(30, "Phone number must be less than 30 characters"),
  service: z.string()
    .min(1, "Please select a service"),
  requirement: z.string()
    .optional()
    .refine((val) => !val || val.length <= 2000, "Brief requirement must be less than 2000 characters"),
  captcha: z.string()
    .min(1, "Please enter the captcha code")
    .max(10, "Captcha code must be less than 10 characters")
})

type ZohoServiceFormData = z.infer<typeof zohoServiceFormSchema>

interface ZohoServiceFormProps {
  className?: string
  title?: string
  description?: string
  defaultService?: string
}

export default function ZohoServiceForm({
  className = "",
  title = "Get Expert Consultation",
  description = "Fill out the form below and our experts will get back to you within 24 hours.",
  defaultService = ""
}: ZohoServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<ZohoServiceFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: defaultService,
    requirement: "",
    captcha: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ZohoServiceFormData, string>>>({})

  // Handle client-side rendering to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true)
    if (defaultService) {
      setFormData(prev => ({ ...prev, service: defaultService }))
    }
  }, [defaultService])

  const validateField = (name: keyof ZohoServiceFormData, value: string) => {
    try {
      zohoServiceFormSchema.shape[name].parse(value)
      setErrors(prev => ({ ...prev, [name]: undefined }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }))
      }
    }
  }

  const handleChange = (name: keyof ZohoServiceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate all fields
      zohoServiceFormSchema.parse(formData)

      // Create a hidden form element for Zoho CRM submission
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = 'https://crm.zoho.in/crm/WebToLeadForm'
      form.name = 'WebToLeads958448000000550148'
      form.target = '_self'
      form.style.display = 'none'
      form.acceptCharset = 'UTF-8'

      // Add form fields with exact Zoho CRM parameters
      const fields = [
        { name: 'xnQsjsdp', value: 'c6d7810e05120b1ace91a2b4af426290e7c684da637dda5026b3b8587c9afe55' },
        { name: 'zc_gad', value: '' },
        { name: 'xmIwtLD', value: '731203c0c029cc9fadd510ff25e826b1b003e8b3f6e99c0158e7cac8e272bfaad04b698e60452158a53e7bf1a1aa924a' },
        { name: 'actionType', value: 'TGVhZHM=' },
        { name: 'returnURL', value: 'https://startbusiness.co.in/thank-you' },
        { name: 'First Name', value: formData.firstName },
        { name: 'Last Name', value: formData.lastName },
        { name: 'Email', value: formData.email },
        { name: 'Phone', value: formData.phone },
        { name: 'LEADCF1', value: formData.service },
        { name: 'Description', value: formData.requirement || '' },
        { name: 'Lead Source', value: 'Service Page' },
        { name: 'enterdigest', value: formData.captcha },
        { name: 'aG9uZXlwb3Q', value: '' } // Honeypot field
      ]

      fields.forEach(field => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = field.name
        input.value = field.value || ''
        form.appendChild(input)
      })

      // Submit form
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)

      // Show success message immediately since we're submitting to external service
      setTimeout(() => {
        setIsSubmitted(true)
        toast.success('Form Submitted Successfully!', {
          description: 'Thank you for your interest. Our team will contact you within 24 hours.',
          duration: 6000,
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        })

        // Reset form after showing success message
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: defaultService,
          requirement: "",
          captcha: "",
        })
        setErrors({})

        // Reset submitted state after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 3000)
      }, 1000) // Small delay to ensure form submission started

    } catch (error) {
      console.error('Form submission error:', error)
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ZohoServiceFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ZohoServiceFormData] = err.message
          }
        })
        setErrors(fieldErrors)
        toast.error('Please fix the errors in the form')
      } else {
        toast.error('Failed to submit form. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className={`bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-slate-100 ${className}`}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            {title}
          </h3>
          <p className="text-slate-600 text-sm">
            {description}
          </p>
        </div>
        <div className="space-y-4 animate-pulse">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  // Show success message
  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-slate-100 ${className}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
          role="alert"
          aria-live="polite"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
            aria-hidden="true"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-blue-600 mb-2">Thank You!</h3>
          <p className="text-sm text-slate-600 mb-4">
            Your request has been submitted successfully. Our expert will call you within 30 minutes.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-slate-700">
              <strong>What's Next?</strong>
              <br />• Expert consultation call
              <br />• Customized service plan
              <br />• Instant process initiation
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-slate-100 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          {title}
        </h3>
        <p className="text-slate-600 text-sm">
          {description}
        </p>
      </div>

      <form
        key={isClient ? 'client-form' : 'server-form'}
        className="space-y-4"
        onSubmit={handleSubmit}
        noValidate
        suppressHydrationWarning={true}
      >
        {/* Name Fields */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="firstName" className="mb-2 block text-sm font-medium text-slate-700">
              First Name *
            </Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`h-12 ${errors.firstName ? 'border-red-500' : 'border-border'}`}
              placeholder="Your first name"
              required
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="lastName" className="mb-2 block text-sm font-medium text-slate-700">
              Last Name *
            </Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`h-12 ${errors.lastName ? 'border-red-500' : 'border-border'}`}
              placeholder="Your last name"
              required
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email Address *
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`h-12 ${errors.email ? 'border-red-500' : 'border-border'}`}
              placeholder="your.email@example.com"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
              Phone Number *
            </Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`h-12 ${errors.phone ? 'border-red-500' : 'border-border'}`}
              placeholder="+91 9876543210"
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Service Selection - Hidden if defaultService is provided */}
        {!defaultService && (
          <div>
            <Label htmlFor="service" className="mb-2 block text-sm font-medium text-slate-700">
              Service *
            </Label>
            <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
              <SelectTrigger className={`h-12 w-full ${errors.service ? 'border-red-500' : 'border-border'}`}>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Company Registration">Company Registration</SelectItem>
                <SelectItem value="Trademark Registration">Trademark Registration</SelectItem>
                <SelectItem value="GST Registration">GST Registration</SelectItem>
                <SelectItem value="FSSAI License">FSSAI License</SelectItem>
                <SelectItem value="MSME Registration">MSME Registration</SelectItem>
                <SelectItem value="Tax Filing">Tax Filing</SelectItem>
                <SelectItem value="Compliance Services">Compliance Services</SelectItem>
                <SelectItem value="Other">Other Services</SelectItem>
              </SelectContent>
            </Select>
            {errors.service && (
              <p className="mt-1 text-sm text-red-600">{errors.service}</p>
            )}
          </div>
        )}

        {/* Brief Requirement */}
        <div>
          <Label htmlFor="requirement" className="mb-2 block text-sm font-medium text-slate-700">
            Brief Requirement
          </Label>
          <Textarea
            id="requirement"
            name="requirement"
            value={formData.requirement}
            onChange={(e) => handleChange('requirement', e.target.value)}
            className={`${errors.requirement ? 'border-red-500' : 'border-border'}`}
            placeholder="Please describe your requirements in detail..."
            rows={3}
          />
          {errors.requirement && (
            <p className="mt-1 text-sm text-red-600">{errors.requirement}</p>
          )}
        </div>

        {/* Captcha Field */}
        <div>
          <Label htmlFor="captcha" className="mb-2 block text-sm font-medium text-slate-700">
            Enter the Captcha *
          </Label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                id="captchaImage"
                src="https://crm.zoho.in/crm/CaptchaServlet?formId=731203c0c029cc9fadd510ff25e826b1b003e8b3f6e99c0158e7cac8e272bfaad04b698e60452158a53e7bf1a1aa924a&grpid=c6d7810e05120b1ace91a2b4af426290e7c684da637dda5026b3b8587c9afe55"
                alt="Captcha"
                className="border border-gray-300 rounded"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const img = document.getElementById('captchaImage') as HTMLImageElement;
                  if (img) {
                    const src = img.src;
                    if (src.indexOf('&d') !== -1) {
                      img.src = src.substring(0, src.indexOf('&d')) + '&d' + new Date().getTime();
                    } else {
                      img.src = src + '&d' + new Date().getTime();
                    }
                  }
                }}
                className="text-sm"
              >
                Reload
              </Button>
            </div>
            <Input
              id="captcha"
              name="captcha"
              type="text"
              value={formData.captcha}
              onChange={(e) => handleChange('captcha', e.target.value)}
              className={`h-12 ${errors.captcha ? 'border-red-500' : 'border-border'}`}
              placeholder="Enter the captcha code"
              maxLength={10}
              required
            />
            {errors.captcha && (
              <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Get Free Consultation
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
