import type { Metadata } from "next"
import { CheckCircle, ArrowLeft, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Thank You - StartBusiness",
  description: "Thank you for your interest in our services. Our team will contact you soon.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Thank You Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Thank You!
        </h1>
        <p className="text-gray-600 mb-6">
          Your form has been submitted successfully. Our expert team will review your requirements and contact you within 24 hours.
        </p>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Need immediate assistance?
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <a href="tel:+919168499520" className="hover:text-blue-600">
                +91 91684 99520
              </a>
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <a href="mailto:start@startbusiness.co.in" className="hover:text-blue-600">
                start@startbusiness.co.in
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/services">
              Explore Our Services
            </Link>
          </Button>
        </div>

        {/* Additional Information */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            We respect your privacy and will never share your information with third parties.
          </p>
        </div>
      </div>
    </div>
  )
}
