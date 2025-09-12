"use client"

import ModernHeroSection from "@/components/home/modern-hero-section"
import FeaturesSection from "@/components/home/features-section"
import StatsSection from "@/components/home/stats-section"
import ServicesSection from "@/components/home/services-section"
import TestimonialsBlogSection from "@/components/home/testimonials-blog-section"
import ContactSection from "@/components/home/contact-section"
import ProcessSection from "@/components/home/process-section"
import FAQSection from "@/components/home/faq-section"
import CompanySearchSection from "@/components/home/company-search-section"
import LatestIncorporationsTicker from "@/components/home/LatestIncorporationsTicker"
import ServiceRecommendationQuiz from "@/components/services/service-recommendation-quiz"
import FloatingCallButton from "@/components/floating-call-button"
// New enhanced components
import CostCalculatorWidget from "@/components/home/cost-calculator-widget"



export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Floating Elements */}
      <FloatingCallButton />

      {/* Main Content Flow */}
      <ModernHeroSection />
      <CompanySearchSection />

      {/* Cost Calculator - High Priority for Conversion */}
      <CostCalculatorWidget />

      <ServicesSection />

          <ServiceRecommendationQuiz />
    


      <StatsSection />
      <FeaturesSection />

      <ProcessSection />


      <LatestIncorporationsTicker />
      <TestimonialsBlogSection />
      <FAQSection />
      <ContactSection />
    </div>
  )
}
 
