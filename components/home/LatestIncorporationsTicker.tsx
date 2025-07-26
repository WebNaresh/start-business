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
  })
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Smoother autoplay with better timing
  const autoplay = useCallback(() => {
    if (!emblaApi) return
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, 4000) // Slower for better readability
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
    <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Professional Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Live Updates
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Latest <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Incorporations</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See the businesses that just got incorporated with our expert services
          </p>
        </div>

        {/* Modern Ticker Container */}
        <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Live indicator */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">Live</span>
          </div>

          <div className="embla p-6" ref={emblaRef}>
            <div className="embla__container flex gap-4">
              {[...latestIncorporations, ...latestIncorporations].map((company, idx) => (
                <div
                  className="embla__slide flex-shrink-0"
                  style={{ minWidth: '280px', maxWidth: '350px' }}
                  key={idx}
                >
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-1 rounded-full">
                        Successfully Incorporated
                      </span>
                    </div>

                    <h3 className="font-semibold text-slate-900 text-sm leading-tight group-hover:text-blue-700 transition-colors">
                      {company}
                    </h3>

                    <div className="flex justify-end mt-3">
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* Professional CTA Section */}
        <div className="text-center mt-10">
          <p className="text-slate-600 mb-4">
            Ready to join them? Start your business registration today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Registration
            </button>
            <button className="border-2 border-slate-300 hover:border-blue-300 hover:bg-blue-50 text-slate-700 px-6 py-3 rounded-xl font-medium transition-all duration-300">
              View All Services
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 