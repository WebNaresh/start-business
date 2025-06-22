'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  fill?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

// Generate responsive sizes based on common breakpoints
const generateResponsiveSizes = (maxWidth?: number) => {
  if (!maxWidth) {
    return '(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw'
  }
  
  // Calculate responsive sizes based on max width
  const mobile = Math.min(maxWidth, 640)
  const tablet = Math.min(maxWidth, 768)
  const desktop = Math.min(maxWidth, 1024)
  
  return `(max-width: 640px) ${mobile}px, (max-width: 768px) ${tablet}px, (max-width: 1024px) ${desktop}px, ${maxWidth}px`
}

// Default blur placeholder
const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  sizes,
  fill = false,
  objectFit = 'cover',
  placeholder = 'blur',
  blurDataURL = defaultBlurDataURL,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || generateResponsiveSizes(width)

  // Optimize quality based on image type and size
  const optimizedQuality = (() => {
    if (quality) return quality
    
    // Lower quality for large images to reduce file size
    if (width && width > 1200) return 70
    if (width && width > 800) return 75
    return 80
  })()

  // Error fallback
  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">Image failed to load</span>
      </div>
    )
  }

  const imageProps = {
    src,
    alt,
    quality: optimizedQuality,
    priority,
    placeholder,
    blurDataURL,
    onLoad: handleLoad,
    onError: handleError,
    className: cn(
      'transition-opacity duration-300',
      isLoading ? 'opacity-0' : 'opacity-100',
      objectFit === 'cover' && 'object-cover',
      objectFit === 'contain' && 'object-contain',
      objectFit === 'fill' && 'object-fill',
      objectFit === 'none' && 'object-none',
      objectFit === 'scale-down' && 'object-scale-down',
      className
    ),
  }

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes={responsiveSizes}
      />
    )
  }

  if (width && height) {
    return (
      <Image
        {...imageProps}
        width={width}
        height={height}
        sizes={responsiveSizes}
      />
    )
  }

  // Fallback with default dimensions
  return (
    <Image
      {...imageProps}
      width={800}
      height={600}
      sizes={responsiveSizes}
    />
  )
}
