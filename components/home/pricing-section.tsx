"use client"

import { useState } from "react"
import { Check, X, ArrowRight, Shield, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"

const pricingPlans = [
  {
    name: "Basic",
    description: "Perfect for startups and small businesses",
    price: "₹4,999",
    monthlyPrice: "₹499",
    features: [
      { name: "Company Registration", included: true },
      { name: "GST Registration", included: true },
      { name: "Bank Account Opening", included: true },
      { name: "Basic Compliance", included: true },
      { name: "Email Support", included: true },
      { name: "Trademark Registration", included: false },
      { name: "MSME Registration", included: false },
      { name: "Dedicated Manager", included: false },
    ],
    popular: false,
    color: "blue",
    icon: Clock,
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses",
    price: "₹9,999",
    monthlyPrice: "₹999",
    features: [
      { name: "Company Registration", included: true },
      { name: "GST Registration", included: true },
      { name: "Bank Account Opening", included: true },
      { name: "Basic Compliance", included: true },
      { name: "Priority Support", included: true },
      { name: "Trademark Registration", included: true },
      { name: "MSME Registration", included: true },
      { name: "Dedicated Manager", included: false },
    ],
    popular: true,
    color: "blue",
    icon: Shield,
  },
  {
    name: "Enterprise",
    description: "For established businesses",
    price: "₹19,999",
    monthlyPrice: "₹1,999",
    features: [
      { name: "Company Registration", included: true },
      { name: "GST Registration", included: true },
      { name: "Bank Account Opening", included: true },
      { name: "Advanced Compliance", included: true },
      { name: "24/7 Support", included: true },
      { name: "Trademark Registration", included: true },
      { name: "MSME Registration", included: true },
      { name: "Dedicated Manager", included: true },
    ],
    popular: false,
    color: "blue",
    icon: Users,
  },
]

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -mr-32 -mt-32 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full -ml-48 -mb-48 opacity-30"></div>
      <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-[0.03]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100">
            Pricing Plans
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Transparent Pricing for Your Business Needs
          </h2>

          <p className="text-sm text-slate-600 mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your business requirements. All plans include our expert guidance and support.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <span className={`text-sm font-medium ${!isAnnual ? "text-[#2563eb]" : "text-slate-500"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                isAnnual ? "bg-[#2563eb]" : "bg-slate-300"
              }`}
              aria-checked={isAnnual}
              role="switch"
            >
              <span className="sr-only">Toggle billing frequency</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                  isAnnual ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? "text-[#2563eb]" : "text-slate-500"}`}>
              Annual <span className="text-green-600 font-medium">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl border ${
                plan.popular ? "border-blue-500" : "border-slate-100 hover:border-blue-100"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-max">
                  <span className="bg-[#2563eb] text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6 flex items-center">
                <div className={`mr-4 rounded-full bg-blue-100 p-3 text-[#2563eb]`}>
                  <plan.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-600">{plan.description}</p>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-blue-600">{isAnnual ? plan.price : plan.monthlyPrice}</span>
                  <span className="text-base text-slate-500 ml-2">/{isAnnual ? "year" : "month"}</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">{isAnnual ? "Billed annually" : "Billed monthly"}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-slate-300 mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "text-slate-700" : "text-slate-400"}>{feature.name}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <WhatsAppCTAButton
                  service={`${plan.name} Plan`}
                  className={`w-full rounded-lg ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                  }`}
                >
                  Get Started
                  {plan.popular && <ArrowRight className="ml-2 h-4 w-4" />}
                </WhatsAppCTAButton>

                <Button
                  variant="ghost"
                  className="w-full text-slate-500 hover:text-[#2563eb] hover:bg-transparent p-0 h-auto text-sm"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Contact sales for details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center bg-white rounded-xl p-8 shadow-md max-w-3xl mx-auto border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-3">Need a Custom Solution?</h3>
          <p className="text-base text-slate-600 mb-6">
            We offer tailored packages for businesses with specific requirements. Contact our sales team for a
            personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppCTAButton service="Custom Package" className="rounded-lg">
              Discuss Custom Package
            </WhatsAppCTAButton>
            <Button
              variant="outline"
              className="rounded-lg border-blue-200 text-[#2563eb] hover:bg-blue-50"
              onClick={() => (window.location.href = "/contact")}
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Have questions about our pricing? Check our{" "}
            <a href="/faq" className="text-blue-600 hover:underline">
              FAQ section
            </a>{" "}
            or{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
