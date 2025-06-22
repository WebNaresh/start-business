"use client"

import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface OptimizedAvatarProps {
  src?: string
  alt: string
  size: number
  fallbackSrc?: string
  fallbackText?: string
  className?: string
  priority?: boolean
}

export default function OptimizedAvatar({
  src,
  alt,
  size,
  fallbackSrc,
  fallbackText,
  className = "",
  priority = false
}: OptimizedAvatarProps) {
  const sizeClass = `h-${Math.floor(size/4)} w-${Math.floor(size/4)}`
  
  return (
    <Avatar className={`${sizeClass} ${className}`}>
      {src && (
        <AvatarImage 
          src={src} 
          alt={alt}
          width={size}
          height={size}
        />
      )}
      <AvatarFallback className="text-white relative">
        {fallbackSrc ? (
          <div className="relative w-full h-full">
            <Image
              src={fallbackSrc}
              alt={alt}
              width={size}
              height={size}
              sizes={`${size}px`}
              className="object-contain w-full h-full"
              quality={75}
              loading={priority ? "eager" : "lazy"}
              priority={priority}
            />
          </div>
        ) : (
          <span className="text-sm font-semibold">
            {fallbackText || alt.charAt(0).toUpperCase()}
          </span>
        )}
      </AvatarFallback>
    </Avatar>
  )
}
