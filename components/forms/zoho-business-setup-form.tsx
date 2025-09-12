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
      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="p-0">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-1 text-center">{title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center">Fill the form below and get expert consultation</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="First Name"
                className="h-10 sm:h-11 text-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
              
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Last Name *"
                required
                className="h-10 sm:h-11 text-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
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
              className="h-10 sm:h-11 text-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />

            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Phone Number *"
              required
              className="h-10 sm:h-11 text-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
            />

            {/* Captcha Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img 
                  src={`https://crm.zoho.in/crm/CaptchaServlet?formId=807d92b3c3d38b2f055043e33cb4fc8abde2c6504bc6b15566de33a208cf33ae6ab44d7608092b1b2b7315c225e2587f&grpid=0449ef94165a176cece1e6ece65e4c9be0449b94b4030e8dd38645a7b17fafa0&d=${captchaReload}`}
                  alt="Captcha verification image"
                  className="border border-slate-300 rounded-md h-10 sm:h-11 w-24 sm:w-28 object-contain bg-white"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={reloadCaptcha}
                  className="h-10 sm:h-11 px-3 border-slate-200 hover:border-blue-300"
                  title="Reload captcha"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              <Input
                id="captcha"
                type="text"
                value={formData.captcha}
                onChange={(e) => handleInputChange('captcha', e.target.value)}
                placeholder="Enter Captcha Code *"
                required
                className="h-10 sm:h-11 text-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                autoComplete="off"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:hover:scale-100"
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
            
            {/* Trust indicators */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                🔒 Secure & Confidential • ⚡ Quick Response
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
