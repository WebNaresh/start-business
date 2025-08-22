"use client"

import { Mail, MapPin, Phone, MessageSquare, Building2 } from "lucide-react"
import ZohoCrmForm from "@/components/zoho-crm-form"

export default function ContactSection() {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6 border border-blue-100 shadow-sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Information
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
            Let's Start Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Business Journey
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to start your business journey? Contact our experts for personalized guidance and support.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Enhanced Contact Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-800">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-4 md:space-y-5" role="list" aria-label="Contact information">
                <div className="flex items-start p-4 rounded-xl bg-white/70 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md group" role="listitem">
                  <div className="mr-4 rounded-full bg-green-100 p-3 group-hover:scale-110 transition-transform" aria-hidden="true">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 mb-1 font-medium">Phone</p>
                    <a
                      href="tel:+919699214195"
                      className="text-base md:text-lg font-semibold text-slate-800 hover:text-green-600 transition-colors"
                      aria-label="Call us at +91 96992 14195"
                    >
                      +91 96992 14195
                    </a>
                    <p className="text-xs text-slate-400 mt-1">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-start p-4 rounded-xl bg-white/70 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md group" role="listitem">
                  <div className="mr-4 rounded-full bg-blue-100 p-3 group-hover:scale-110 transition-transform" aria-hidden="true">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 mb-1 font-medium">Email</p>
                    <a
                      href="mailto:start@startbusiness.co.in"
                      className="text-base md:text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors break-all"
                      aria-label="Send email to start@startbusiness.co.in"
                    >
                      start@startbusiness.co.in
                    </a>
                    <p className="text-xs text-slate-400 mt-1">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start p-4 rounded-xl bg-white/70 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md group" role="listitem">
                  <div className="mr-4 rounded-full bg-green-100 p-3 group-hover:scale-110 transition-transform" aria-hidden="true">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 mb-1 font-medium">WhatsApp</p>
                    <a
                      href="https://wa.me/919699214195"
                      className="text-base md:text-lg font-semibold text-slate-800 hover:text-green-600 transition-colors"
                      aria-label="Chat with us on WhatsApp"
                    >
                      +91 96992 14195
                    </a>
                    <p className="text-xs text-slate-400 mt-1">Instant messaging</p>
                  </div>
                </div>

                <div className="flex items-start p-4 rounded-xl bg-white/70 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md group" role="listitem">
                  <div className="mr-4 rounded-full bg-red-100 p-3 group-hover:scale-110 transition-transform flex-shrink-0" aria-hidden="true">
                    <MapPin className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 mb-1 font-medium">Office Location</p>
                    <address className="text-base md:text-lg font-semibold text-slate-800 not-italic leading-relaxed">
                      Office No 7, 3rd Floor, Saraswati Heights,<br />
                      Deccan Gymkhana, Behind Goodluck Café,<br />
                      Pune, Maharashtra 411004
                    </address>
                    <p className="text-xs text-slate-400 mt-2">Easy parking available</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Business Hours */}
              <div className="mt-6 md:mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-base md:text-lg font-semibold text-slate-800">Business Hours</h4>
                </div>
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 border border-green-100">
                    <span className="text-slate-700 font-medium">Monday - Friday</span>
                    <span className="font-semibold text-green-700">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                    <span className="text-slate-700 font-medium">Saturday</span>
                    <span className="font-semibold text-yellow-700">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-red-50 border border-red-100">
                    <span className="text-slate-700 font-medium">Sunday</span>
                    <span className="font-semibold text-red-700">Closed</span>
                  </div>
                </div>

                {/* Current Status */}
                <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-medium text-blue-700">We're currently available for consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Zoho CRM Contact Form */}
          <ZohoCrmForm 
            title="Send us a Message"
            description="Fill out the form below and our experts will get back to you within 24 hours."
          />
        </div>
      </div>
    </section>
  )
}
