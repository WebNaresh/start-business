"use client"

import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Users, 
  Star, 
  CheckCircle, 
  Clock, 
  Award,
  Lock,
  Phone
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TrustSignalsProps {
  variant?: "compact" | "full" | "inline"
  showAll?: boolean
  className?: string
}

export default function TrustSignals({ 
  variant = "full", 
  showAll = true,
  className = "" 
}: TrustSignalsProps) {
  const trustMetrics = [
    {
      icon: Users,
      value: "10,000+",
      label: "Businesses Registered",
      color: "text-blue-600"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Customer Rating",
      color: "text-yellow-500"
    },
    {
      icon: CheckCircle,
      value: "100%",
      label: "Compliance Rate",
      color: "text-green-600"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Expert Support",
      color: "text-purple-600"
    }
  ]

  const securityBadges = [
    {
      icon: Shield,
      label: "SSL Secured",
      description: "256-bit encryption"
    },
    {
      icon: Lock,
      label: "Data Protected",
      description: "ISO 27001 certified"
    },
    {
      icon: Award,
      label: "Government Approved",
      description: "MCA registered agent"
    }
  ]

  const testimonials = [
    {
      text: "Seamless process, got everything done quickly!",
      author: "Rajesh Kumar",
      company: "Tech Startup",
      rating: 5
    },
    {
      text: "Professional and efficient service!",
      author: "Priya Sharma",
      company: "Consulting Firm",
      rating: 5
    },
    {
      text: "Best decision for our business registration.",
      author: "Amit Patel",
      company: "E-commerce",
      rating: 5
    }
  ]

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-4 text-sm text-slate-600", className)}>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-blue-600" />
          <span className="font-semibold">10,000+</span> businesses
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="font-semibold">4.9/5</span> rating
        </div>
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="font-semibold">100%</span> secure
        </div>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        {trustMetrics.slice(0, 2).map((metric, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
            <metric.icon className={cn("w-3 h-3", metric.color)} />
            <span className="font-semibold">{metric.value}</span>
            <span className="text-xs">{metric.label}</span>
          </Badge>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Trust Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trustMetrics.map((metric, index) => (
          <div key={index} className="text-center p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
            <div className="flex justify-center mb-2">
              <metric.icon className={cn("w-6 h-6", metric.color)} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
            <div className="text-sm text-slate-600">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Security Badges */}
      <div className="flex flex-wrap justify-center gap-4">
        {securityBadges.map((badge, index) => (
          <div key={index} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border">
            <badge.icon className="w-4 h-4 text-green-600" />
            <div>
              <div className="text-sm font-semibold text-slate-900">{badge.label}</div>
              <div className="text-xs text-slate-600">{badge.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Testimonials */}
      {showAll && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center text-slate-900">What Our Customers Say</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 mb-3">"{testimonial.text}"</p>
                <div className="text-xs text-slate-600">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div>{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Money-Back Guarantee */}
      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-green-800">100% Money-Back Guarantee</span>
        </div>
        <p className="text-sm text-green-700">
          Not satisfied with our service? Get your money back within 30 days, no questions asked.
        </p>
      </div>

      {/* Contact Support */}
      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Phone className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-800">Need Help? Call Our Experts</span>
        </div>
        <p className="text-sm text-blue-700">
          Speak with our business registration experts at <span className="font-semibold">+91-9876543210</span>
        </p>
      </div>
    </div>
  )
}
