"use client"

import type React from "react"

import { MessageSquare } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"

interface WhatsAppCTAButtonProps extends ButtonProps {
  service?: string
  children: React.ReactNode
}

export default function WhatsAppCTAButton({ service, children, className, ...props }: WhatsAppCTAButtonProps) {
  const openWhatsApp = () => {
    const whatsappNumber = "919699214195" // WhatsApp requires the number without spaces or +
    const message = service
      ? `Hi! I'm interested in your ${service} services. Can you provide more information?`
      : "Hi! I'm interested in your business services. Can you help me choose the right one for my needs?"

    // WhatsApp API URL format: https://wa.me/number?text=message
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Button
      className={`bg-blue-600 hover:bg-blue-700 transition-colors ${className}`}
      onClick={openWhatsApp}
      {...props}
    >
      <MessageSquare className="mr-2 h-4 w-4" />
      {children}
    </Button>
  )
}
