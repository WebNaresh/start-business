"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, Sparkles, CheckCircle, Building2, Play, Pause } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import useEmblaCarousel from 'embla-carousel-react'

interface Incorporation {
  name: string
  type: 'Private Limited' | 'LLP' | 'OPC' | 'Partnership'
}

const latestIncorporations: Incorporation[] = [
  {
    name: "Apaha Institute Of Construction Project Management LLP",
    type: "LLP"
  },
  {
    name: "Apaha Overseas Study LLP", 
    type: "LLP"
  },
  {
    name: "Lightnet Technology Private Limited",
    type: "Private Limited"
  },
  {
    name: "Mangesha'z Salon & Academy Private Limited",
    type: "Private Limited"
  },
  {
    name: "Octogle Technologies Private Limited",
    type: "Private Limited"
  },
  {
    name: "Multicare Health Services And Consultancy LLP",
    type: "LLP"
  },
  {
    name: "Navibyte Innovations Private Limited",
    type: "Private Limited"
  },
]

export default function LatestIncorporationsTicker() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
    skipSnaps: false,
    slidesToScroll: 1,
  })
  
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMobile(768)
  const isTablet = useMobile(1024)

  // Enhanced autoplay with pause functionality
  const autoplay = useCallback(() => {
    if (!emblaApi || isPaused || isHovered) return
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      if (emblaApi && !isPaused && !isHovered) emblaApi.scrollNext()
    }, isMobile ? 4000 : 3000) // Slower on mobile for better readability
  }, [emblaApi, isPaused, isHovered, isMobile])

  useEffect(() => {
    if (!emblaApi) return
    autoplay()
    
    emblaApi.on('pointerDown', () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    })
    emblaApi.on('pointerUp', autoplay)
    
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [emblaApi, autoplay])

  // Get type badge color
  const getTypeBadgeColor = (type: Incorporation['type']) => {
    switch (type) {
      case 'Private Limited':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'LLP':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'OPC':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'Partnership':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <section 
      className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-200/10 to-indigo-200/10 rounded-full -mr-24 -mt-24 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100/5 to-purple-100/5 rounded-full -ml-32 -mb-32 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-medium text-blue-700 bg-blue-100/80 rounded-full border border-blue-200/50 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Live Updates</span>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-1"></div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3">
            Latest <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Incorporations</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            See the businesses that just got incorporated with our expert services
          </p>

         
        </div>

        {/* Compact Ticker Container */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden">
          {/* Compact live indicator */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-green-50/90 backdrop-blur-sm px-2 py-1 rounded-full border border-green-200/50">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">Live</span>
          </div>

          <div className="embla p-4 sm:p-5" ref={emblaRef}>
            <div className="embla__container flex gap-3 sm:gap-4">
              {[...latestIncorporations, ...latestIncorporations].map((company, idx) => (
                <div
                  className="embla__slide flex-shrink-0 w-[240px] sm:w-[260px] lg:w-[280px]"
                  key={`${company.name}-${idx}`}
                >
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-lg lg:rounded-xl p-3 sm:p-4 border border-slate-200/50 hover:border-blue-300/50 hover:shadow-md transition-all duration-300 group cursor-pointer h-full backdrop-blur-sm">
                    {/* Compact header with status */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs font-medium text-green-700 bg-green-100/80 px-2 py-0.5 rounded-full">
                        Incorporated
                      </span>
                    </div>

                    {/* Compact company name */}
                    <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-tight group-hover:text-blue-700 transition-colors mb-3 line-clamp-2 min-h-[2rem]">
                      {company.name}
                    </h3>

                    {/* Compact company type */}
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getTypeBadgeColor(company.type)}`}>
                        <Building2 className="w-3 h-3" />
                        <span>{company.type}</span>
                      </div>
                      
                      {/* Compact arrow indicator */}
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compact gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-white/80 to-transparent pointer-events-none z-10" />
        </div>

  
      </div>
    </section>
  )
} 