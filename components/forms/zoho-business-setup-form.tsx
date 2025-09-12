"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"

interface ZohoBusinessSetupFormProps {
  className?: string
  title?: string
  defaultService?: string
}

export default function ZohoBusinessSetupForm({ 
  className = "", 
  title = "Get Expert Consultation",
  defaultService = ""
}: ZohoBusinessSetupFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: defaultService,
    captcha: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaReload, setCaptchaReload] = useState(0)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const reloadCaptcha = () => {
    setCaptchaReload(prev => prev + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create form data for Zoho
      const zohoFormData = new FormData()
      zohoFormData.append('xnQsjsdp', '0449ef94165a176cece1e6ece65e4c9be0449b94b4030e8dd38645a7b17fafa0')
      zohoFormData.append('zc_gad', '')
      zohoFormData.append('xmIwtLD', '807d92b3c3d38b2f055043e33cb4fc8abde2c6504bc6b15566de33a208cf33ae6ab44d7608092b1b2b7315c225e2587f')
      zohoFormData.append('actionType', 'TGVhZHM=')
      zohoFormData.append('returnURL', 'null')
      zohoFormData.append('First Name', formData.firstName)
      zohoFormData.append('Last Name', formData.lastName)
      zohoFormData.append('Email', formData.email)
      zohoFormData.append('Phone', formData.phone)
      zohoFormData.append('Lead Source', 'Website- Business Setup Services')
      zohoFormData.append('LEADCF2', formData.service)
      zohoFormData.append('enterdigest', formData.captcha)

      // Submit to Zoho with no-cors mode to handle CORS restrictions
      const response = await fetch('https://crm.zoho.in/crm/WebToLeadForm', {
        method: 'POST',
        mode: 'no-cors', // This is essential for cross-origin requests to Zoho
        body: zohoFormData
      })

      // Since we're using no-cors mode, we can't read the response status
      // The request will succeed if no network error occurs
      console.log('Form submitted to Zoho CRM')
      
      // Reset form on successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: defaultService,
        captcha: ''
      })
      
      // Reload captcha for next use
      reloadCaptcha()
      
      alert('Thank you for your inquiry! Our experts will contact you within 24 hours.')
    } catch (error) {
      console.error('Form submission error:', error)
      // Provide more specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        alert('Network error: Please check your internet connection and try again.')
      } else {
        alert('There was an error submitting the form. Please try again or call us directly at +91-XXXXXXXXXX.')
      }
    } finally {
      setIsSubmitting(false)
      // Always reload captcha after attempt
      reloadCaptcha()
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <Card className="shadow-lg border-slate-200">
        <CardContent className="p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{title}</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="First Name"
                className="h-9"
              />
              
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Last Name *"
                required
                className="h-9"
              />
            </div>

            {/* Contact Fields */}
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Email Address *"
              required
              className="h-9"
            />

            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Phone Number *"
              required
              className="h-9"
            />

            {/* Captcha Section */}
            <div className="flex items-center gap-2">
              <Input
                id="captcha"
                type="text"
                value={formData.captcha}
                onChange={(e) => handleInputChange('captcha', e.target.value)}
                placeholder="Enter Captcha *"
                required
                className="h-9 flex-1"
              />
              <img 
                src={`https://crm.zoho.in/crm/CaptchaServlet?formId=807d92b3c3d38b2f055043e33cb4fc8abde2c6504bc6b15566de33a208cf33ae6ab44d7608092b1b2b7315c225e2587f&grpid=0449ef94165a176cece1e6ece65e4c9be0449b94b4030e8dd38645a7b17fafa0&d=${captchaReload}`}
                alt="Captcha"
                className="border border-slate-300 rounded h-9 w-20"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={reloadCaptcha}
                className="h-9 w-9 p-0"
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-10"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Get Free Consultation'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
