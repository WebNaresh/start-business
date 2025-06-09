"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"
import {
  CheckCircle,
  Clock,
  Star,
  Shield,
  Award,
  Phone,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Users,
  Zap,
  Building,
} from "lucide-react"
import type { ServiceData } from "./service-types"

interface PricingSectionProps {
  service: ServiceData
}

export default function PricingSection({ service }: PricingSectionProps) {
  const savings =
    Number.parseInt(service.pricing?.originalAmount?.replace(/,/g, "") || "0") -
    Number.parseInt(service.pricing?.amount?.replace(/,/g, "") || "0")
  const savingsPercent = Math.round(
    (savings / Number.parseInt(service.pricing?.originalAmount?.replace(/,/g, "") || "1")) * 100,
  )

  return (
    <section
      id="pricing"
      className="py-4 relative overflow-hidden bg-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full -mr-36 -mt-36 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full -ml-32 -mb-32 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-50 text-blue-600 border-blue-200 px-4 py-2 text-xs">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Transparent Pricing
            </Badge>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">
              <span className="text-slate-800">Simple &</span>{" "}
              <span className="text-blue-600">
                Affordable Pricing
              </span>
            </h2>

            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Get started with our {service.shortTitle} service at an unbeatable price with no hidden costs
            </p>
          </div>

          {/* Main Pricing Card */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {/* Pricing Card */}
            <div className="lg:col-span-2 relative">
              <div
                className="bg-blue-600 rounded-2xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                </div>

                <div className="relative z-10">
                  {/* Popular Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <Badge className="bg-white/20 text-white border-white/30 px-3 py-1.5 text-xs backdrop-blur-sm">
                      <Star className="w-3 h-3 mr-1.5 fill-current" />
                      Most Popular Choice
                    </Badge>
                    <Badge className="bg-blue-500 text-white px-3 py-1.5 text-xs">Save {savingsPercent}%</Badge>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-base md:text-lg font-bold mb-2">{service.title}</h3>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-2xl md:text-3xl font-bold">
                        {service.pricing?.currency || "₹"}
                        {service.pricing?.amount || "2,999"}
                      </span>
                      <div className="text-right">
                        <span className="text-lg text-white/70 line-through block">
                          {service.pricing?.currency || "₹"}
                          {service.pricing?.originalAmount || "4,999"}
                        </span>
                        <span className="text-white/90 text-xs">+ GST</span>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                      <p className="text-white/90 text-xs">
                        💰 You save ₹{savings.toLocaleString()} with our special offer!
                      </p>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1.5" />
                      What's Included
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {service.pricing?.includes?.map((item: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center text-white/90 text-xs"
                        >
                          <CheckCircle className="w-3 h-3 mr-2 flex-shrink-0 text-blue-300" />
                          {item}
                        </div>
                      )) || []}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <WhatsAppCTAButton className="text-sm">
                      Get Started Now
                    </WhatsAppCTAButton>
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/20 text-sm"
                      onClick={() => window.location.href = "tel:+919699214195"}
                    >
                      <Phone className="w-4 h-4 mr-1.5" />
                      Call Expert
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline & Features */}
            <div className="space-y-4">
              {/* Timeline Card */}
              <div className="bg-white rounded-xl p-4 shadow-md border border-blue-200">
                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center">
                  <Clock className="w-4 h-4 text-blue-600 mr-2" />
                  Processing Timeline
                </h4>
                <div className="space-y-2">
                  {service.timeline?.steps?.map((step, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-b-0"
                    >
                      <span className="text-xs text-slate-700">{step.name}</span>
                      <span className="font-medium text-xs text-slate-800">{step.duration}</span>
                    </div>
                  )) || []}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-800">Total Time:</span>
                    <Badge className="bg-blue-50 text-blue-600 border-blue-200 text-xs">
                      {service.timeline?.total || "7-10 days"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white rounded-xl p-4 shadow-md border border-blue-200">
                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center">
                  <Shield className="w-4 h-4 text-blue-600 mr-2" />
                  Why Choose Us
                </h4>
                <div className="space-y-2">
                  {[
                    { icon: Award, text: "100% Success Rate", color: "text-blue-600" },
                    { icon: Users, text: "1,000+ Happy Clients", color: "text-blue-600" },
                    { icon: Zap, text: "Lightning Fast Process", color: "text-blue-600" },
                    { icon: Shield, text: "100% Secure & Legal", color: "text-blue-600" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center text-slate-700"
                    >
                      <item.icon className={`w-3 h-3 mr-2 ${item.color}`} />
                      <span className="text-xs">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
