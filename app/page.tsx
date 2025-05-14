import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import ServicesSection from "@/components/home/services-section"

import TestimonialsSection from "@/components/home/testimonials-section"
import PricingSection from "@/components/home/pricing-section"
import ContactSection from "@/components/home/contact-section"
import StatsSection from "@/components/home/stats-section"
import ProcessSection from "@/components/home/process-section"
import FAQSection from "@/components/home/faq-section"
import Chatbot from "@/components/Chatbot"


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ServicesSection />
     
      <ProcessSection />
    
      <TestimonialsSection />
    
      <FAQSection />
      <ContactSection />
      <div className="fixed bottom-4 right-4 z-50">
        <Chatbot />
      </div>
    </div>
  )
}
