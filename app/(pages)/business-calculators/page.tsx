import type { Metadata } from "next"
import CalculatorsHero from "./_components/calculators-hero"
import CalculatorGrid from "./_components/calculator-grid"
import CalculatorFeatures from "./_components/calculator-features"
import { generateStaticPageMetaTags, generateWebsiteStructuredData } from "@/lib/seo-utils"
import Script from "next/script"

const pageMetadata = generateStaticPageMetaTags({
  title: "Business Calculators - Free Online Financial Calculators India",
  description: "Free online business calculators for GST, income tax, PPF, EMI, salary, HRA, TDS, car loan, home loan calculations. Accurate financial planning tools for India.",
  path: "business-calculators"
})

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  keywords: [
    'business calculators',
    'financial calculators',
    'tax calculators',
    'loan calculators',
    'gst calculator',
    'income tax calculator',
    'ppf calculator',
    'emi calculator',
    'salary calculator',
    'hra calculator',
    'tds calculator',
    'car loan calculator',
    'home loan calculator',
    'free online calculators',
    'india financial tools',
    'business planning tools',
    'investment calculators',
    'retirement planning',
    'tax planning',
    'loan eligibility calculator'
  ],
  openGraph: {
    title: pageMetadata.title,
    description: pageMetadata.description,
    url: pageMetadata.canonical,
    type: 'website',
    images: [
      {
        url: '/calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'Business Calculators - Free Financial Tools'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.title,
    description: pageMetadata.description,
    images: ['/calculator-og.png']
  },
  alternates: {
    canonical: pageMetadata.canonical
  }
}

export default function CalculatorsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Business Calculators - Free Online Financial Tools",
    "description": "Free online business calculators for GST, income tax, PPF, EMI, salary, HRA, TDS, car loan, home loan calculations. Accurate financial planning tools for India.",
    "url": "https://www.startbusiness.co.in/business-calculators",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Financial Calculators",
      "description": "Comprehensive collection of business and financial calculators",
      "numberOfItems": 20,
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "position": 1,
          "name": "PPF Calculator",
          "description": "Calculate PPF maturity amount and returns",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser"
        },
        {
          "@type": "SoftwareApplication",
          "position": 2,
          "name": "GST Calculator",
          "description": "Calculate GST amount and tax inclusive/exclusive prices",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser"
        },
        {
          "@type": "SoftwareApplication",
          "position": 3,
          "name": "Income Tax Calculator",
          "description": "Calculate income tax liability for FY 2024-25",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser"
        },
        {
          "@type": "SoftwareApplication",
          "position": 4,
          "name": "EMI Calculator",
          "description": "Calculate loan EMI and amortization schedule",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser"
        },
        {
          "@type": "SoftwareApplication",
          "position": 5,
          "name": "HRA Calculator",
          "description": "Calculate House Rent Allowance tax exemption",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser"
        }
      ]
    },
    "breadcrumb": {
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
        }
      ]
    }
  }

  return (
    <>
      <Script
        id="calculators-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <CalculatorsHero />
        <CalculatorGrid />
        <CalculatorFeatures />
      </div>
    </>
  )
}
