"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Calculator, 
  Shield, 
  FileText,
  Zap,
  ArrowRight,
  Star
} from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ElementType
  href: string
  price: string
  popular?: boolean
  urgent?: boolean
  color: string
}

interface MobileQuickActionsProps {
  className?: string
}

export default function MobileQuickActions({ className = "" }: MobileQuickActionsProps) {
  const quickActions: QuickAction[] = [
    {
      id: "pvt-ltd",
      title: "Start Company",
      description: "Private Limited Registration",
      icon: Building2,
      href: "/services/business-setup/private-limited-company",
      price: "₹12,000",
      popular: true,
      color: "bg-blue-500"
    },
    {
      id: "gst",
      title: "GST Registration",
      description: "Get GST in 7 days",
      icon: Calculator,
      href: "/services/gst-registration",
      price: "₹3,000",
      urgent: true,
      color: "bg-green-500"
    },
    {
      id: "trademark",
      title: "Protect Brand",
      description: "Trademark Registration",
      icon: Shield,
      href: "/services/trademark-registration",
      price: "₹3,000",
      color: "bg-purple-500"
    },
    {
      id: "compliance",
      title: "Stay Compliant",
      description: "ROC Annual Filing",
      icon: FileText,
      href: "/services/roc-annual-compliances",
      price: "₹15,000",
      color: "bg-orange-500"
    }
  ]

  return (
    <div className={cn("", className)}>
      {/* Quick Actions Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Quick Start</h3>
        <Badge variant="secondary" className="text-xs">
          <Zap className="w-3 h-3 mr-1" />
          Most Popular
        </Badge>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className="group relative p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 active:scale-95"
          >
            {/* Popular Badge */}
            {action.popular && (
              <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5">
                <Star className="w-2.5 h-2.5 mr-0.5" />
                Popular
              </Badge>
            )}

            {/* Urgent Badge */}
            {action.urgent && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 animate-pulse">
                <Zap className="w-2.5 h-2.5 mr-0.5" />
                Urgent
              </Badge>
            )}

            {/* Icon */}
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200",
              action.color
            )}>
              <action.icon className="w-5 h-5 text-white" />
            </div>

            {/* Content */}
            <div className="space-y-1">
              <h4 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                {action.title}
              </h4>
              <p className="text-xs text-slate-600 leading-tight">
                {action.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-green-600">
                  {action.price}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl pointer-events-none" />
          </a>
        ))}
      </div>

      {/* View All Services */}
      <div className="mt-4">
        <Button 
          variant="outline" 
          className="w-full text-sm"
          asChild
        >
          <a href="/services">
            View All Services
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>

    
    </div>
  )
}
