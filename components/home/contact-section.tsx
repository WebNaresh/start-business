"use client"

import { Mail, MapPin, Phone, MessageSquare, Building2 } from "lucide-react"
import ZohoCrmForm from "@/components/zoho-crm-form"

export default function ContactSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ready to start your business journey? Contact our experts for personalized guidance and support.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4" role="list" aria-label="Contact information">
                <div className="flex items-start p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-300" role="listitem">
                  <div className="mr-4 rounded-full bg-primary/10 p-2.5" aria-hidden="true">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <a 
                      href="tel:+919168499520" 
                      className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                      aria-label="Call us at +91 91684 99520"
                    >
                      +91 91684 99520
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-300" role="listitem">
                  <div className="mr-4 rounded-full bg-primary/10 p-2.5" aria-hidden="true">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a 
                      href="mailto:info@startbusiness.co.in" 
                      className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                      aria-label="Send email to info@startbusiness.co.in"
                    >
                      info@startbusiness.co.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-300" role="listitem">
                  <div className="mr-4 rounded-full bg-primary/10 p-2.5" aria-hidden="true">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Contact Form</p>
                    <a 
                      href="/contact" 
                      className="text-base font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                      aria-label="Send us a message through our contact form"
                    >
                      Send us a Message
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-300" role="listitem">
                  <div className="mr-4 rounded-full bg-primary/10 p-2.5" aria-hidden="true">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Office Location</p>
                    <address className="text-base font-semibold text-foreground not-italic">
                      Office No 7, 3rd Floor, Saraswati Heights,<br />
                      Deccan Gymkhana, Behind Goodluck Café,<br />
                      Pune, Maharashtra 411004
                    </address>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-800 mb-3">Business Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monday - Friday</span>
                    <span className="font-medium text-slate-800">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Saturday</span>
                    <span className="font-medium text-slate-800">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Saturday - Sunday</span>
                    <span className="font-medium text-slate-800">Closed</span>
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
