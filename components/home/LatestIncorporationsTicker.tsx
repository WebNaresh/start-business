import React, { useCallback, useEffect, useRef } from "react"
import { Building2 } from "lucide-react"
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
  })
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Autoplay logic
  const autoplay = useCallback(() => {
    if (!emblaApi) return
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, 2200)
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
    <div className="w-full bg-gradient-to-r from-blue-50 via-white to-indigo-50 border-y border-slate-200 py-4 md:py-5 overflow-hidden shadow-sm">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-2 md:mb-3">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-600 p-1 md:p-2 shadow">
            <Building2 className="w-4 h-4 md:w-5 md:h-5" />
          </span>
          <span className="font-semibold text-slate-800 text-base md:text-lg tracking-tight">
            Latest Incorporations
          </span>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-md border border-slate-100">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {[...dummyCompanies, ...dummyCompanies].map((name, idx) => (
                <div
                  className="embla__slide flex-shrink-0 px-2 md:px-4 py-2 md:py-3 flex items-center"
                  style={{ minWidth: 'auto', width: 'auto' }}
                  key={idx}
                >
                  <span className="text-black text-xs md:text-sm font-medium px-3 md:px-5 py-1 rounded-lg bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-200 shadow-sm hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 