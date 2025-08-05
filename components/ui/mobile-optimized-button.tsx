"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"

interface MobileOptimizedButtonProps {
  children: ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  icon?: LucideIcon
  iconPosition?: "left" | "right"
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  href?: string
  asChild?: boolean
}

export default function MobileOptimizedButton({
  children,
  className,
  variant = "default",
  size = "default",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  href,
  asChild = false,
  ...props
}: MobileOptimizedButtonProps) {
  const buttonClasses = cn(
    // Base mobile-first responsive classes
    "transition-all duration-200 active:scale-95",
    // Mobile touch optimization
    "touch-manipulation select-none",
    // Responsive sizing
    size === "sm" && "px-3 py-2 text-sm sm:px-4 sm:py-2.5",
    size === "default" && "px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base",
    size === "lg" && "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
    // Full width on mobile if specified
    fullWidth && "w-full sm:w-auto",
    // Loading state
    loading && "opacity-70 cursor-not-allowed",
    className
  )

  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon className={cn(
          "flex-shrink-0",
          size === "sm" ? "w-3 h-3 sm:w-4 sm:h-4" : "w-4 h-4 sm:w-5 sm:h-5",
          children && "mr-2"
        )} />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon className={cn(
          "flex-shrink-0",
          size === "sm" ? "w-3 h-3 sm:w-4 sm:h-4" : "w-4 h-4 sm:w-5 sm:h-5",
          children && "ml-2"
        )} />
      )}
    </>
  )

  if (href && !asChild) {
    return (
      <a
        href={href}
        className={cn(buttonClasses, "inline-flex items-center justify-center")}
        onClick={onClick}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      asChild={asChild}
      {...props}
    >
      {asChild ? children : content}
    </Button>
  )
}