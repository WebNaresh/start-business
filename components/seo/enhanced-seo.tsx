import Script from "next/script"
import { generateOrganizationStructuredData, generateWebsiteStructuredData } from "@/lib/seo-utils"

interface EnhancedSEOProps {
  page?: 'home' | 'calculators' | 'services' | 'blog'
  additionalKeywords?: string[]
}

export default function EnhancedSEO({ page = 'home', additionalKeywords = [] }: EnhancedSEOProps) {
  const organizationData = generateOrganizationStructuredData()
  const websiteData = generateWebsiteStructuredData()
  
  // Enhanced search action for calculators
  const enhancedWebsiteData = {
    ...websiteData,
    potentialAction: [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.startbusiness.co.in/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "Action",
        "name": "Calculate PPF",
        "target": "https://www.startbusiness.co.in/business-calculators/ppf-calculator"
      },
      {
        "@type": "Action", 
        "name": "Calculate GST",
        "target": "https://www.startbusiness.co.in/business-calculators/gst-calculator"
      },
      {
        "@type": "Action",
        "name": "Calculate Income Tax", 
        "target": "https://www.startbusiness.co.in/business-calculators/income-tax-calculator"
      }
    ]
  }

  // Service-specific structured data
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "StartBusiness",
    "description": "Professional business registration and compliance services in India",
    "url": "https://www.startbusiness.co.in",
    "telephone": "+91-XXXXXXXXXX",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "Maharashtra", 
      "addressLocality": "Pune"
    },
    "serviceType": [
      "Company Registration",
      "Business Registration", 
      "Tax Compliance",
      "GST Registration",
      "Trademark Registration",
      "Financial Calculators"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "PPF Calculator",
            "description": "Free online PPF calculator"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "GST Calculator",
            "description": "Free online GST calculator"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Income Tax Calculator",
            "description": "Free online income tax calculator"
          }
        }
      ]
    }
  }

  return (
    <>
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(enhancedWebsiteData) }}
      />
      {page === 'services' && (
        <Script
          id="service-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
        />
      )}
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//salesiq.zoho.in" />
      
      {/* Additional meta tags for better SEO */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Geo targeting */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="geo.placename" content="Pune, Maharashtra" />
      
      {/* Language and locale */}
      <meta httpEquiv="content-language" content="en-IN" />
      <meta name="language" content="English" />
    </>
  )
}