"use client"

import HeroSection from "@/components/home/hero-section"
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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <CompanySearchSection />
      <ServicesSection />
      <section
        className="py-8 sm:py-10 md:py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/20"
        aria-labelledby="quiz-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceRecommendationQuiz />
        </div>
      </section>
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
 
