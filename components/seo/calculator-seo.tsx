import Script from "next/script"
import { generateCalculatorStructuredData, generateCalculatorFAQStructuredData } from "@/lib/seo-utils"
import { CalculatorSEOConfig } from "@/lib/calculator-seo-config"

interface CalculatorSEOProps {
  config: CalculatorSEOConfig
  breadcrumbs?: Array<{ name: string; url: string }>
}

export default function CalculatorSEO({ config, breadcrumbs }: CalculatorSEOProps) {
  const structuredData = generateCalculatorStructuredData(config)
  const faqStructuredData = generateCalculatorFAQStructuredData(config.faqs)
  
  const defaultBreadcrumbs = [
    { name: "Home", url: "https://www.startbusiness.co.in" },
    { name: "Business Calculators", url: "https://www.startbusiness.co.in/business-calculators" },
    { name: config.title, url: `https://www.startbusiness.co.in/business-calculators/${config.slug}` }
  ]
  
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": (breadcrumbs || defaultBreadcrumbs).map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  }

  return (
    <>
      <Script
        id={`${config.slug}-structured-data`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id={`${config.slug}-faq-structured-data`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Script
        id={`${config.slug}-breadcrumb-structured-data`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
    </>
  )
}