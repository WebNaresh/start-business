"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"

import { ArrowRight, Sparkles, Star } from "lucide-react"
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

/* ============================================ */
/* NEW MODERN HERO SECTION FOR COMPARISON */
/* ============================================ */

function NewModernHeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  // Modern hero data
  const heroData = {
    badge: " Trusted by 5000+ Entrepreneurs",
    headline: "Launch Your Dream Business",
    subHeadline: "in Just 7 Days",
    description: "From idea to incorporation - we handle everything. Get your business registered with 100% compliance guarantee and expert guidance every step of the way.",
    cta: {
      primary: "Start Your Journey",
      secondary: "See How It Works"
    }
  }

  // Stats data
  const stats = [
    { number: "5000+", label: "Businesses Launched", icon: "🏢" },
    { number: "7", label: "Days Average Setup", icon: "⚡" },
    { number: "100%", label: "Compliance Rate", icon: "✅" },
    { number: "24/7", label: "Expert Support", icon: "🛡️" }
  ]

  // Popular services for quick access
  const quickServices = [
    { name: "Private Limited", href: "/services/private-limited-company", popular: true },
    { name: "LLP Registration", href: "/services/llp", popular: false },
    { name: "Sole Proprietorship", href: "/services/sole-proprietorship", popular: false },
    { name: "OPC Registration", href: "/services/opc", popular: false }
  ]

  // Animation effect
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                                radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`
             }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Badge */}
          <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-semibold text-blue-800 mb-8 shadow-lg transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <span className="mr-2">🚀</span>
            {heroData.badge}
            <Sparkles className="w-4 h-4 ml-2 text-blue-600" />
          </div>

          {/* Main Headline */}
          <div className={`mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4">
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                {heroData.headline}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {heroData.subHeadline}
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              {heroData.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg px-12 py-6 font-bold rounded-2xl border-0 hover:scale-105 group"
            >
              <Link href="/contact" className="flex items-center">
                {heroData.cta.primary}
                <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 text-lg px-12 py-6 font-semibold rounded-2xl hover:scale-105 bg-white/80 backdrop-blur-sm shadow-lg"
            >
              <Link href="#how-it-works" className="flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12l-2-2m0 0l2-2m-2 2H8m6 8a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {heroData.cta.secondary}
              </Link>
            </Button>
          </div>

          {/* Quick Service Access */}
          <div className={`mb-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">Quick Start Options</p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    service.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-white/80 border border-slate-200 text-slate-700 hover:bg-white hover:border-blue-300 hover:text-blue-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      Popular
                    </div>
                  )}
                  {service.name}
                </Link>
              ))}
            </div>
          </div>



        </div>
      </div>
    </section>
  )
}

// Export both for comparison
export { NewModernHeroSection }
