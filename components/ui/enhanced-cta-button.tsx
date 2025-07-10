"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Shield, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface EnhancedCTAButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "urgent"
  size?: "sm" | "md" | "lg"
  urgency?: string
  savings?: string
  guarantee?: boolean
  popular?: boolean
  className?: string
  disabled?: boolean
}

export default function EnhancedCTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  urgency,
  savings,
  guarantee = false,
  popular = false,
  className = "",
  disabled = false
}: EnhancedCTAButtonProps) {
  const baseClasses = "relative overflow-hidden transition-all duration-300 font-semibold"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl",
    urgent: "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl animate-pulse"
  }
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl"
  }

  const Component = href ? "a" : "button"
  
  return (
    <div className="relative">
      {/* Urgency/Savings Badge */}
      {(urgency || savings) && (
        <Badge 
          className="absolute -top-2 -right-2 z-10 bg-red-700 text-white text-xs px-2 py-1 animate-bounce"
          variant="destructive"
        >
          {urgency || savings}
        </Badge>
      )}
      
      {/* Popular Badge */}
      {popular && (
        <Badge 
          className="absolute -top-2 -left-2 z-10 bg-amber-600 text-white text-xs px-2 py-1"
        >
          <Zap className="w-3 h-3 mr-1" />
          Most Popular
        </Badge>
      )}

      <Component
        href={href}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          "group flex items-center justify-center gap-2",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {/* Background Animation */}
        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </Component>
      
      {/* Trust Indicators */}
      {guarantee && (
        <div className="flex items-center justify-center gap-1 mt-2 text-xs text-slate-700">
          <Shield className="w-3 h-3 text-green-600" />
          <span>100% Money-Back Guarantee</span>
        </div>
      )}
    </div>
  )
}
