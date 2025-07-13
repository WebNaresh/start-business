"use client"

import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import StatsSection from "@/components/home/stats-section"
import ServicesSection from "@/components/home/services-section"
import TestimonialsBlogSection from "@/components/home/testimonials-blog-section"
import ContactSection from "@/components/home/contact-section"
import ProcessSection from "@/components/home/process-section"
import FAQSection from "@/components/home/faq-section"
import RelatedServices from "@/components/seo/related-services"
import CompanySearchSection from "@/components/home/company-search-section"

import LatestIncorporationsTicker from "@/components/home/LatestIncorporationsTicker"
import ServiceRecommendationQuiz from "@/components/services/service-recommendation-quiz"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <CompanySearchSection />
      <ServicesSection />
      <StatsSection />
          <section
                className="py-8 sm:py-10 md:py-12 bg-background"
                aria-labelledby="quiz-heading"
              >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <ServiceRecommendationQuiz />
                </div>
              </section>
      <FeaturesSection />
      <ProcessSection />

     

      <LatestIncorporationsTicker/>
      <TestimonialsBlogSection />
      <FAQSection />
      <ContactSection />
    </div>
  )
}
 
