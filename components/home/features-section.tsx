"use client"

// import { useState } from "react" // Unused for now
import { Eye, Zap, Shield, Smartphone, GraduationCap, ArrowRight, CheckCircle, Star, Headphones } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"
import Script from "next/script"

export default function WhyChooseUs() {
  // const [activeFeature, setActiveFeature] = useState<number>(0) // Unused for now

  const features = [
    {
      icon: Eye,
      title: "Pay What You See",
      shortDesc: "Transparent pricing, no hidden costs",
      benefit: "100% transparent pricing",
      color: "from-primary to-primary/80",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Zap,
      title: "Accelerated Processing",
      shortDesc: "30% faster than industry standard",
      benefit: "Lightning-fast delivery",
      color: "from-primary to-primary/80",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Shield,
      title: "Success Guarantee",
      shortDesc: "98% approval rate, money-back promise",
      benefit: "Risk-free guarantee",
      color: "from-primary to-primary/80",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Smartphone,
      title: "Digital First Approach",
      shortDesc: "Paperless, secure, real-time tracking",
      benefit: "100% digital experience",
      color: "from-primary to-primary/80",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: GraduationCap,
      title: "Built by CA-CS Team",
      shortDesc: "Expert CAs & CSs for speed + precision",
      benefit: "Professional expertise",
      color: "from-primary to-primary/80",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Headphones,
      title: "Real Human Support",
      shortDesc: "No ticketing, No bots",
      benefit: "Always available",
      color: "from-primary to-primary/80",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
  ]

  // Generate structured data for features
  const featuresStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": features.map((feature, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": feature.title,
        "description": feature.shortDesc,
        "offers": {
          "@type": "Offer",
          "description": feature.benefit
        }
      }
    }))
  }

  return (
    <section 
      className="py-8 relative overflow-hidden bg-background"
      aria-labelledby="features-heading"
    >
      <Script
        id="features-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresStructuredData) }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <Badge className="mb-4 bg-secondary text-secondary-foreground border-border px-4 py-2">
            <Star className="w-4 h-4 mr-2 fill-current text-primary" aria-hidden="true" />
            Why 1,000+ Businesses Choose Us
          </Badge>
          <h2 
            id="features-heading"
            className="text-2xl md:text-3xl font-bold text-foreground mb-3"
          >
           Why Choose {""}
            <span className="text-primary">
              StartBusiness
            </span>
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl mx-auto">
            Five key reasons that make us different
          </p>
        </header>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <ul 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 list-none"
            aria-label="Our key features and benefits"
          >
            {features.map((feature, index) => (
              <li
                key={index}
                className="group relative p-4 md:p-6 bg-card border border-border rounded-xl hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                // onMouseEnter={() => setActiveFeature(index)} // Disabled for now
              >
                {/* Icon */}
                <div
                  className={`${feature.bgColor} w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}
                  aria-hidden="true"
                >
                  <feature.icon className={`w-5 h-5 md:w-7 md:h-7 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                  {feature.shortDesc}
                </p>

        

                {/* Hover Gradient Overlay */}
                <div
                  className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div 
            className="bg-primary text-primary-foreground rounded-xl p-6 md:p-8"
            role="complementary"
            aria-label="Call to action"
          >
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2">
                Ready to Experience the Difference?
              </h3>
              <p className="text-sm md:text-base text-primary-foreground/90 mb-4 md:mb-6 max-w-2xl mx-auto">
                Let our experts guide you through the entire process, from choosing the right structure to completing all registrations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WhatsAppCTAButton 
                className="bg-background text-foreground hover:bg-secondary font-semibold px-6 md:px-8 py-2 md:py-3 rounded-xl shadow-lg text-sm md:text-base"
                aria-label="Start your business journey with WhatsApp support"
              >
                Start Your Journey
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" aria-hidden="true" />
              </WhatsAppCTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
