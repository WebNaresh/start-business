"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"

import { ArrowRight  } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ResponsiveHeroImage from "@/components/ui/responsive-hero-image"
import Script from "next/script"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import type { EmblaCarouselType } from 'embla-carousel'

// Extend EmblaCarouselType to include autoplay
interface EmblaCarouselTypeWithAutoplay extends EmblaCarouselType {
  autoplay?: {
    play: () => void
    stop: () => void
  }
}

export default function FixedHeroCarousel() {
  const slides = [
    {
      image: "/hero/hero-latest-1.png",
      title: "Start Your Business with Expert Guidance",
      description: "Professional business registration, compliance, and legal services to help your business thrive in India's growing market",
    },
    {
      image: "/hero/hero-latest-3.png",
      title: "GST, Income Tax, and Trademark Services",
      description: "Get personalized consultation and comprehensive support for all your business compliance and legal requirements in India",
    },
  ]

  // Generate structured data for the hero section
  const heroStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Business Registration and Compliance Services in India",
    "description": "Professional business registration, compliance, and legal services to help your business thrive in India's growing market",
    "mainEntity": {
      "@type": "Service",
      "name": "Business Registration Services",
      "provider": {
        "@type": "Organization",
        "name": "Your Company Name",
        "description": "Leading provider of business registration and compliance services in India"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
        "Quick turnaround time",
        "Expert legal guidance",
        "End-to-end business solutions",
        "100% compliance assured"
      ]
    }
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const togglePlayPause = () => {
    if (!emblaApi) return
    const emblaWithAutoplay = emblaApi as EmblaCarouselTypeWithAutoplay
    if (isPaused) {
      emblaWithAutoplay.autoplay?.play()
    } else {
      emblaWithAutoplay.autoplay?.stop()
    }
    setIsPaused(!isPaused)
  }

  return (
    <section
      ref={heroRef}
      className="relative py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 overflow-hidden"
      aria-label="Hero section"
    >
      <Script
        id="hero-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(heroStructuredData) }}
      />
      {/* Enhanced background elements */}
      {/* <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-48 -mt-48 opacity-60 blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-slate-100 to-transparent rounded-full -ml-40 -mb-40 opacity-50 blur-2xl" aria-hidden="true"></div> */}

      {/* Floating elements */}
      {/* <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-float-slow" aria-hidden="true" />
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-slate-300 rounded-full opacity-40 animate-float-slow-delayed" aria-hidden="true" /> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          {/* Content Section */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className="transition-opacity duration-500 ease-in-out">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-3 sm:mb-4 md:mb-6 leading-tight sm:leading-tight">
                {slides[selectedIndex].title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                {slides[selectedIndex].description}
              </p>
            </div>

            {/* Features Grid - Hidden on mobile, visible on tablet+ */}
            <div className="mb-6 sm:mb-8 hidden sm:grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {[
                "⚡ Fast and Efficient Processing",
                "🎯 Expert Legal Consultation",
                "🔄 Comprehensive Business Solutions",
                "✅ Guaranteed Compliance",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center p-2.5 sm:p-3 md:p-4 rounded-lg bg-white/60 backdrop-blur-sm border border-slate-100 transition-all duration-300 hover:scale-[1.02] hover:bg-white/80"
                  role="listitem"
                >
                  <span className="text-slate-700 text-xs sm:text-sm md:text-base font-medium leading-tight">{feature}</span>
                </div>
              ))}
            </div>

            {/* Mobile Features - Compact version for mobile */}
            <div className="mb-6 sm:hidden flex flex-wrap gap-2">
              {[
                "⚡ Fast Processing",
                "🎯 Expert Consultation",
                "🔄 Complete Solutions",
                "✅ Guaranteed Compliance",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-slate-100 text-xs text-slate-700 font-medium"
                  role="listitem"
                >
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 font-semibold"
                aria-label="Start your business registration process"
              >
                <Link href="/contact" className="group">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-200 hover:bg-slate-50 transition-all duration-300 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 font-medium"
                aria-label="Explore our business services"
              >
                <Link href="/services">
                  <span className="hidden sm:inline">View Our Services</span>
                  <span className="sm:hidden">Our Services</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
             
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {slides.map((slide, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg sm:rounded-xl flex-[0_0_100%] min-w-0 aspect-[4/3] sm:aspect-[5/4] md:aspect-[4/3]"
                      >
                        <div className="relative rounded-lg sm:rounded-xl w-full h-full overflow-hidden">
                          <ResponsiveHeroImage
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.title}
                            className="object-contain p-3 sm:p-4 md:p-6 w-full h-full"
                            priority={index === 0}
                            quality={80}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
           

                {/* Slide indicators */}
                <div
                  className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20"
                  role="tablist"
                  aria-label="Slide navigation"
                >
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => emblaApi?.scrollTo(index)}
                      className={`relative overflow-hidden rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                        index === selectedIndex
                          ? "bg-blue-600 w-8 h-2.5 sm:w-10 sm:h-3"
                          : "bg-slate-300 hover:bg-blue-400 w-2.5 h-2.5 sm:w-3 sm:h-3"
                      }`}
                      role="tab"
                      aria-selected={index === selectedIndex}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              {/* <div
                className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 z-0 opacity-60 animate-spin-slow"
                aria-hidden="true"
              />
              <div
                className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 z-0 opacity-50 animate-spin-slow-reverse"
                aria-hidden="true"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
