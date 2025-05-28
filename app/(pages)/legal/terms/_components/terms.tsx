"use client"

import { motion } from "framer-motion"
import { Scale, AlertCircle, FileCheck, HelpCircle } from "lucide-react"

export default function TermsAndConditions() {
  const formattedDate = new Date("2025-05-28").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
              <Scale className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Terms & Conditions</h1>
            <p className="text-base text-slate-600">
              Last updated: {formattedDate}
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">1. Agreement to Terms</h2>
              <p className="text-slate-600 mb-6">
                By accessing and using our services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">2. Services</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <FileCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Service Description</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>Business registration services</li>
                      <li>Document processing and filing</li>
                      <li>Compliance assistance</li>
                      <li>Consultation services</li>
                      <li>Support and guidance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">3. User Responsibilities</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">User Obligations</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>Provide accurate information</li>
                      <li>Submit required documents</li>
                      <li>Maintain confidentiality</li>
                      <li>Comply with applicable laws</li>
                      <li>Pay service fees on time</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">4. Payment Terms</h2>
              <p className="text-slate-600 mb-6">
                Our payment terms include:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-8">
                <li>All fees are in Indian Rupees (INR)</li>
                <li>Payment must be made in advance</li>
                <li>Refund policy as per service agreement</li>
                <li>Additional charges for extra services</li>
                <li>Taxes as applicable by law</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">5. Limitation of Liability</h2>
              <p className="text-slate-600 mb-6">
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">6. Intellectual Property</h2>
              <p className="text-slate-600 mb-6">
                All content, trademarks, and intellectual property rights are owned by us and protected by applicable laws.
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">7. Governing Law</h2>
              <p className="text-slate-600 mb-6">
                These terms shall be governed by and construed in accordance with the laws of India.
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">8. Contact Information</h2>
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-slate-600">
                  For any questions regarding these Terms & Conditions, please contact us at:<br />
                  Email: sales@biztreeaccounting.com<br />
                  Phone: +91 96992 14195<br />
                  Address: Office No 7, 3rd Floor, Saraswati Heights,<br />
                  Deccan Gymkhana, Behind Goodluck Café,<br />
                  Pune 411004, Maharashtra
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 