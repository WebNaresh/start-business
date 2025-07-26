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
import { Loader2, Send } from "lucide-react"
import { z } from "zod"

// Validation schema matching Zoho CRM form fields
const zohoCrmFormSchema = z.object({
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
    .min(1, "Please select a Start Business service"),
  requirement: z.string()
    .optional()
    .refine((val) => !val || val.length <= 2000, "Brief requirement must be less than 2000 characters"),
  captcha: z.string()
    .min(1, "Please enter the captcha code")
    .max(10, "Captcha code must be less than 10 characters")
})

type ZohoCrmFormData = z.infer<typeof zohoCrmFormSchema>

// Service options matching Zoho CRM form exactly
const serviceOptions = [
  { value: "Company Registration", label: "Company Registration" },
  { value: "Trademark Registration", label: "Trademark Registration" },
  { value: "Compilance Services", label: "Compliance Services" },
  { value: "Other Services", label: "Other Services" }
]

interface ZohoCrmFormProps {
  className?: string
  title?: string
  description?: string
}

export default function ZohoCrmForm({
  className = "",
  title = "Get Expert Consultation",
  description = "Fill out the form below and our experts will get back to you within 24 hours."
}: ZohoCrmFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<ZohoCrmFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    requirement: "",
    captcha: ""
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ZohoCrmFormData, string>>>({})

  // Handle client-side rendering to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true)
  }, [])

  const validateField = (name: keyof ZohoCrmFormData, value: string) => {
    try {
      zohoCrmFormSchema.shape[name].parse(value)
      setErrors(prev => ({ ...prev, [name]: undefined }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }))
      }
    }
  }

  const handleChange = (name: keyof ZohoCrmFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate all fields
      zohoCrmFormSchema.parse(formData)

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
        { name: 'xnQsjsdp', value: '4ac4a262cc0cdab66479a83bab625e53490e93515119234f760756c6d41d1e30' },
        { name: 'zc_gad', value: '' },
        { name: 'xmIwtLD', value: '9b604b603f4934dd9307c088b0f0687992de5df2a82b8f215c20f3146c901290f9d1694693f8eb2a48f6d1994bcc9395' },
        { name: 'actionType', value: 'TGVhZHM=' },
        { name: 'returnURL', value: window.location.origin + '/thank-you' },
        { name: 'First Name', value: formData.firstName },
        { name: 'Last Name', value: formData.lastName },
        { name: 'Email', value: formData.email },
        { name: 'Phone', value: formData.phone },
        { name: 'LEADCF2', value: formData.service },
        { name: 'Description', value: formData.requirement || '' },
        { name: 'Lead Source', value: 'Website- Start Business' },
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
          service: "",
          requirement: "",
          captcha: ""
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
        const fieldErrors: Partial<Record<keyof ZohoCrmFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ZohoCrmFormData] = err.message
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
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Form Submitted Successfully!
          </h3>
          <p className="text-slate-600 mb-4">
            Thank you for your interest. Our team will contact you within 24 hours.
          </p>
          <div className="text-sm text-slate-500">
            You can close this form or submit another inquiry.
          </div>
        </div>
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
              className={`${errors.firstName ? 'border-red-500' : 'border-border'}`}
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
              className={`${errors.lastName ? 'border-red-500' : 'border-border'}`}
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
              className={`${errors.email ? 'border-red-500' : 'border-border'}`}
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
              className={`${errors.phone ? 'border-red-500' : 'border-border'}`}
              placeholder="+91 9876543210"
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Service Selection */}
        <div>
          <Label htmlFor="service" className="mb-2 block text-sm font-medium text-slate-700">
            Start Business Services *
          </Label>
          <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
            <SelectTrigger className={`w-full ${errors.service ? 'border-red-500' : 'border-border'}`}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-600">{errors.service}</p>
          )}
        </div>

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
            rows={4}
            required
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
                src="https://crm.zoho.in/crm/CaptchaServlet?formId=9b604b603f4934dd9307c088b0f0687992de5df2a82b8f215c20f3146c901290f9d1694693f8eb2a48f6d1994bcc9395&grpid=4ac4a262cc0cdab66479a83bab625e53490e93515119234f760756c6d41d1e30"
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
              className={`${errors.captcha ? 'border-red-500' : 'border-border'}`}
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Form
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
