"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Building2, FileCheck, Users, Shield, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const features = [
  {
    title: "Business Registration",
    description: "Complete assistance with company registration, GST registration, and other mandatory business registrations.",
    icon: FileCheck,
  },
  {
    title: "Legal Compliance",
    description: "Ensure your business meets all legal requirements and stays compliant with regulations.",
    icon: Shield,
  },
  {
    title: "Business Structure",
    description: "Expert guidance on choosing the right business structure (Pvt Ltd, LLP, Proprietorship).",
    icon: Building2,
  },
  {
    title: "Team Setup",
    description: "Assistance with hiring, payroll setup, and HR compliance for your team.",
    icon: Users,
  },
]

const processSteps = [
  {
    title: "Initial Consultation",
    description: "We understand your business needs and goals through a detailed consultation.",
    duration: "1-2 days",
  },
  {
    title: "Document Collection",
    description: "We help you gather and prepare all necessary documents for registration.",
    duration: "2-3 days",
  },
  {
    title: "Registration Process",
    description: "We handle the complete registration process with government authorities.",
    duration: "7-10 days",
  },
  {
    title: "Post-Registration",
    description: "We assist with bank account opening, compliance setup, and other post-registration formalities.",
    duration: "3-5 days",
  },
]

const benefits = [
  "Expert guidance throughout the setup process",
  "Time-saving and hassle-free registration",
  "Compliance with all legal requirements",
  "Ongoing support and assistance",
  "Cost-effective solutions",
  "Quick turnaround time",
]

export default function BusinessSetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Business Setup Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 mb-8"
            >
              Start your business journey with confidence. Our comprehensive business setup services ensure a smooth and compliant launch of your venture.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border border-slate-200 hover:border-blue-200 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <feature.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                          <p className="text-slate-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Process</h2>
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </Badge>
                    </div>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Business?</h2>
            <p className="text-blue-100 mb-8">
              Let us handle the complexities while you focus on growing your business.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 