"use client"

import { motion } from "framer-motion"
import { RefreshCw, Clock, AlertCircle, HelpCircle } from "lucide-react"

export default function RefundPolicy() {
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
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Refund Policy</h1>
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
              <h2 className="text-2xl font-bold text-slate-800 mb-6">1. Overview</h2>
              <p className="text-slate-600 mb-6">
                This Refund Policy outlines the terms and conditions for refunds of our services. We strive to ensure complete satisfaction with our services, and this policy is designed to protect both our clients and our business.
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">2. Eligibility for Refunds</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Refund Conditions</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>Service not initiated</li>
                      <li>Technical issues preventing service delivery</li>
                      <li>Service cancellation before processing</li>
                      <li>Duplicate payments</li>
                      <li>Service not as described</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">3. Non-Refundable Items</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Non-Refundable Services</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>Services already processed</li>
                      <li>Consultation fees</li>
                      <li>Document preparation fees</li>
                      <li>Government filing fees</li>
                      <li>Processing fees</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">4. Refund Process</h2>
              <p className="text-slate-600 mb-6">
                To request a refund:
              </p>
              <ol className="list-decimal list-inside text-slate-600 space-y-2 mb-8">
                <li>Contact our support team</li>
                <li>Provide order/service details</li>
                <li>State reason for refund</li>
                <li>Submit required documentation</li>
                <li>Wait for processing (5-7 business days)</li>
              </ol>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">5. Refund Timeline</h2>
              <div className="bg-slate-50 rounded-lg p-6 mb-8">
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Refund requests processed within 5-7 business days</li>
                  <li>Refund amount credited within 7-10 business days</li>
                  <li>Processing time may vary based on payment method</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">6. Contact Us</h2>
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-slate-600">
                  For refund-related queries, please contact us at:<br />
                  Email: start@startbusiness.co.in<br />
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