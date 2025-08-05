"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
}

const maxWidthClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl", 
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-8xl",
  full: "max-w-full"
}

const paddingClasses = {
  none: "",
  sm: "px-4 sm:px-6",
  md: "px-4 sm:px-6 lg:px-8", 
  lg: "px-4 sm:px-6 lg:px-8 xl:px-12",
  xl: "px-4 sm:px-6 lg:px-8 xl:px-16"
}

export default function ResponsiveContainer({ 
  children, 
  className,
  maxWidth = "xl",
  padding = "md"
}: ResponsiveContainerProps) {
  return (
    <div className={cn(
      "container mx-auto",
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  )
}