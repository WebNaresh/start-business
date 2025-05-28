"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, FileText } from "lucide-react"

export default function PrivacyPolicy() {
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
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Privacy Policy</h1>
            <p className="text-base text-slate-600">
              Last updated: {new Date().toLocaleDateString()}
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
              <h2 className="text-2xl font-bold text-slate-800 mb-6">1. Introduction</h2>
              <p className="text-slate-600 mb-6">
                Welcome to our Privacy Policy. This document explains how we collect, use, and protect your personal information when you use our services.
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">2. Information We Collect</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Personal Information</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>Name and contact information</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Business details</li>
                      <li>Document information</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">3. How We Use Your Information</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Primary Uses</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>To provide and maintain our services</li>
                      <li>To process your business registration</li>
                      <li>To communicate with you about your service</li>
                      <li>To improve our services</li>
                      <li>To comply with legal obligations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">4. Data Protection</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Lock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Security Measures</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2">
                      <li>Encryption of sensitive data</li>
                      <li>Secure data storage</li>
                      <li>Regular security audits</li>
                      <li>Access controls and authentication</li>
                      <li>Employee training on data protection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">5. Your Rights</h2>
              <p className="text-slate-600 mb-6">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-8">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-800 mb-6">6. Contact Us</h2>
              <p className="text-slate-600 mb-6">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-slate-600">
                  Email: privacy@yourcompany.com<br />
                  Phone: +91 1234567890<br />
                  Address: Your Company Address, City, State, PIN
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 