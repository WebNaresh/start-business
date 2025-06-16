import React, { useCallback, useEffect, useRef } from "react"
import { Building2, TrendingUp, ArrowRight } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'

const dummyCompanies = [
  "Acme Technologies Pvt Ltd",
  "BlueSky Innovations LLP",
  "GreenLeaf Organics",
  "UrbanNest Realty",
  "FinEdge Solutions",
  "PixelCraft Studios",
  "NextGen Retailers",
  "BrightPath Consulting",
  "Sunrise Foods Pvt Ltd",
  "Quantum Logistics LLP",
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

  // Autoplay logic with smoother transitions
  const autoplay = useCallback(() => {
    if (!emblaApi) return
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, 3000)
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
    <section className="w-full bg-gradient-to-r from-blue-50 via-white to-indigo-50 border-y border-slate-200 py-8 md:py-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2 md:p-2.5 shadow-lg transform hover:scale-105 transition-transform duration-200">
                <Building2 className="w-5 h-5 md:w-6 md:h-6" />
              </span>
              <h2 className="font-bold text-slate-800 text-xl md:text-2xl lg:text-3xl tracking-tight">
                Latest Incorporations
              </h2>
            </div>
            <span className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 p-1.5 md:p-2 shadow-md">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </div>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
            Stay updated with our latest business registrations and corporate formations
          </p>
        </div>

        {/* Ticker Container */}
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-100">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {[...dummyCompanies, ...dummyCompanies].map((name, idx) => (
                <div
                  className="embla__slide flex-shrink-0 px-3 md:px-6 py-3 md:py-4 flex items-center"
                  style={{ minWidth: 'auto', width: 'auto' }}
                  key={idx}
                >
                  <span 
                    className="text-slate-700 text-sm md:text-base font-medium px-4 md:px-6 py-2 md:py-2.5 rounded-xl 
                             bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 
                             shadow-sm hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                             hover:border-blue-200 hover:text-blue-700 transition-all duration-300 cursor-pointer
                             transform hover:-translate-y-0.5 flex items-center gap-2 group"
                  >
                    {name}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays for Smooth Edge Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Bottom Section */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-10 text-center">
          <p className="text-slate-500 text-sm md:text-base">
            Join our growing list of successful businesses. Start your incorporation journey today.
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mt-6" />
        </div>
      </div>
    </section>
  )
} 