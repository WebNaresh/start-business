import type { Metadata } from "next"
import PPFCalculator from "../_components/ppf-calculator"
import { generateCalculatorMetaTags, generateCalculatorStructuredData, generateCalculatorFAQStructuredData } from "@/lib/seo-utils"
import { calculatorSEOConfigs } from "@/lib/calculator-seo-config"
import Script from "next/script"

const calculatorConfig = calculatorSEOConfigs['ppf-calculator']
const pageMetadata = generateCalculatorMetaTags(calculatorConfig)

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  keywords: pageMetadata.keywords,
  openGraph: {
    title: pageMetadata.title,
    description: pageMetadata.description,
    url: pageMetadata.canonical,
    type: 'website',
    images: [
      {
        url: '/ppf-calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'PPF Calculator - Calculate Public Provident Fund Returns'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.title,
    description: pageMetadata.description,
    images: ['/ppf-calculator-og.png']
  },
  alternates: {
    canonical: pageMetadata.canonical
  }
}

export default function PPFCalculatorPage() {
  const structuredData = generateCalculatorStructuredData(calculatorConfig)
  const faqStructuredData = generateCalculatorFAQStructuredData(calculatorConfig.faqs)

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.startbusiness.co.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Business Calculators",
        "item": "https://www.startbusiness.co.in/business-calculators"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "PPF Calculator",
        "item": "https://www.startbusiness.co.in/business-calculators/ppf-calculator"
      }
    ]
  }

  return (
    <>
      <Script
        id="ppf-calculator-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="ppf-calculator-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Script
        id="ppf-calculator-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <PPFCalculator />
      </div>
    </>
  )
}
