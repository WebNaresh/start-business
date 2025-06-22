"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ArrowRight  } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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
      title: "Expert Business Solutions for Indian Entrepreneurs",
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
      className="relative py-8 md:py-12 overflow-hidden "
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <div className="transition-opacity duration-500 ease-in-out">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                {slides[selectedIndex].title}
              </h1>

              <p className="text-sm md:text-base text-slate-600 mb-6 max-w-2xl">
                {slides[selectedIndex].description}
              </p>
            </div>

            <div className="mb-8 hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "⚡ Fast and Efficient Processing",
                "🎯 Expert Legal Consultation",
                "🔄 Comprehensive Business Solutions",
                "✅ Guaranteed Compliance",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-slate-100 transition-all duration-300 hover:scale-[1.02] hover:bg-white/80"
                  role="listitem"
                >
                  <span className="text-slate-700 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href="/contact">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                aria-label="Start your business registration process"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Button></Link>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  className="border-slate-200 hover:bg-slate-50 transition-all duration-300"
                  aria-label="Explore our business services"
                >
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl">
             
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {slides.map((slide, index) => (
                      <div
                        key={index}
                        className="relative rounded-xl flex-[0_0_100%] min-w-0 aspect-[4/3]"
                      >
                        <div className="relative rounded-xl w-full h-full overflow-hidden">
                          <Image
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.title}
                            width={800}
                            height={600}
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
                            className="object-contain p-6 w-full h-full"
                            priority={index === 0}
                            quality={75}
                            loading={index === 0 ? "eager" : "lazy"}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                        </div>
                      </div>
                    ))}
                  </div>
           

                {/* Slide indicators */}
                <div 
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20"
                  role="tablist"
                  aria-label="Slide navigation"
                >
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => emblaApi?.scrollTo(index)}
                      className={`relative overflow-hidden rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                        index === selectedIndex ? "bg-blue-600 w-10 h-3" : "bg-slate-300 hover:bg-blue-400 w-3 h-3"
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
