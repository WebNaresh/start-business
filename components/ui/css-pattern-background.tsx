"use client"

import { cn } from "@/lib/utils"

interface CSSPatternBackgroundProps {
  pattern?: "dots" | "grid" | "diagonal" | "circles"
  opacity?: number
  color?: string
  size?: number
  className?: string
}

export default function CSSPatternBackground({
  pattern = "dots",
  opacity = 0.03,
  color = "rgb(59, 130, 246)", // blue-500
  size = 20,
  className = ""
}: CSSPatternBackgroundProps) {
  const getPatternStyle = () => {
    switch (pattern) {
      case "dots":
        return {
          backgroundImage: `radial-gradient(circle at 1px 1px, ${color} 1px, transparent 0)`,
          backgroundSize: `${size}px ${size}px`
        }
      case "grid":
        return {
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: `${size}px ${size}px`
        }
      case "diagonal":
        return {
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent ${size/2}px,
            ${color} ${size/2}px,
            ${color} ${size}px
          )`
        }
      case "circles":
        return {
          backgroundImage: `radial-gradient(circle at ${size/2}px ${size/2}px, ${color} 2px, transparent 2px)`,
          backgroundSize: `${size}px ${size}px`
        }
      default:
        return {}
    }
  }

  return (
    <div 
      className={cn("absolute inset-0", className)}
      style={{
        ...getPatternStyle(),
        opacity
      }}
    />
  )
}
