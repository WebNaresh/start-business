import React, { useCallback, useEffect, useRef } from "react"
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import useEmblaCarousel from 'embla-carousel-react'

const latestIncorporations = [
  "Apaha Institute Of Construction Project Management LLP",
  "Apaha Overseas Study LLP",
  "Lightnet Technology Private Limited",
  "Mangesha'z Salon & Academy Private Limited",
  "Octogle Technologies Private Limited",
  "Multicare Health Services And Consultancy LLP",
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
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Smoother autoplay with better timing
  const autoplay = useCallback(() => {
    if (!emblaApi) return
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, 3500) // Optimized for mobile readability
  }, [emblaApi])

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

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Professional Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-10">
          <Badge className="mb-3 sm:mb-4 bg-blue-50 text-blue-700 border-blue-200 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Live Updates
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 px-4">
            Latest <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Incorporations</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto px-4">
            See the businesses that just got incorporated with our expert services
          </p>
        </div>

        {/* Modern Ticker Container - Mobile Optimized */}
        <div className="relative bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl border border-slate-200 overflow-hidden">
          {/* Live indicator - Mobile Optimized */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-1.5 sm:gap-2 bg-green-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-green-200">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">Live</span>
          </div>

          <div className="embla p-4 sm:p-6" ref={emblaRef}>
            <div className="embla__container flex gap-3 sm:gap-4">
              {[...latestIncorporations, ...latestIncorporations].map((company, idx) => (
                <div
                  className="embla__slide flex-shrink-0 w-[260px] sm:w-[280px] max-w-[300px] sm:max-w-[350px]"
                  key={idx}
                >
                  <div className="bg-slate-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group cursor-pointer h-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                      <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-0.5 sm:py-1 rounded-full">
                        Successfully Incorporated
                      </span>
                    </div>

                    <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-tight group-hover:text-blue-700 transition-colors mb-2 sm:mb-3 line-clamp-2">
                      {company}
                    </h3>

                    <div className="flex justify-end">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient fade edges - Mobile Optimized */}
          <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* Professional CTA Section - Mobile Optimized */}
        <div className="text-center mt-8 sm:mt-10 px-4">
          <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Ready to join them? Start your business registration today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md sm:max-w-none mx-auto">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
              Start Registration
            </button>
            <button className="border-2 border-slate-300 hover:border-blue-300 hover:bg-blue-50 text-slate-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base">
              View All Services
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 