"use client"

import type React from "react"
import { Phone } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"

interface CallCTAButtonProps extends ButtonProps {
  service?: string
  children: React.ReactNode
}

export default function CallCTAButton({ service, children, className, ...props }: CallCTAButtonProps) {
  const makeCall = () => {
    const phoneNumber = "919168499520" // Phone number without spaces or +
    window.location.href = `tel:+${phoneNumber}`
  }

  return (
    <Button
      className={`bg-blue-600 hover:bg-blue-700 transition-colors ${className}`}
      onClick={makeCall}
      {...props}
    >
      <Phone className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
} 