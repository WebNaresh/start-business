"use client"

import { Phone, Mail, MapPin } from "lucide-react"
import CallCTAButton from "@/components/call-cta-button"
import { contactMethods } from "./contact-config"

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 flex justify-center">Let's Connect</h2>
      {/* Contact Methods */}
      <div className="space-y-3">
        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.href}
            target={method.href.startsWith("http") ? "_blank" : undefined}
            rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group block p-4 sm:p-5 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2.5 rounded-lg ${method.color} ${method.hoverColor} transition-colors duration-300`}>
                <method.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-sm text-slate-500 mb-1.5">{method.description}</p>
                <p className="text-slate-700 font-medium break-words">{method.value}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Unified Support CTA */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 sm:p-5 border border-blue-100">
        <div className="flex items-start space-x-3 mb-3">
          <div className="p-2.5 rounded-lg bg-blue-100">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">Need Immediate Support?</h3>
            <p className="text-sm text-slate-600">
              Our support team is available during business hours. You can reach us via phone or email for quick assistance.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CallCTAButton className="w-full">
            Call Us Now
          </CallCTAButton>
          <a
            href="mailto:support@startbusiness.com"
            className="flex items-center justify-center px-4 py-2.5 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-300"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email Support
          </a>
        </div>
      </div>
    </div>
  )
}
