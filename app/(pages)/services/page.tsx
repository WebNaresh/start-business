import type { Metadata } from "next"

import ServiceComparisonTool from "@/components/services/service-comparison-tool"

import AccessibilityImprovements from "@/components/ui/accessibility-improvements"
import VisualHierarchyImprovements from "@/components/ui/visual-hierarchy-improvements"
import AllServicesPage from "./_components/services-navigation"


export const metadata: Metadata = {
  title: "Business Services - StartBusiness | Complete Business Solutions in India",
  description:
    "Comprehensive business services including company registration, trademark registration, MCA compliance, RBI compliance, and business registration. Expert guidance for entrepreneurs across India.",
  keywords: [
    "business services India",
    "company registration",
    "GST registration",
    "trademark registration",
    "business compliance",
    "startup services",
    "business setup",
    "tax filing services",
    "business licenses",
    "entrepreneur services",
  ],
  openGraph: {
    title: "Complete Business Services - StartBusiness",
    description:
      "From business registration to compliance management, get all your business services under one roof. Expert guidance, fast processing, and 100% compliance assurance.",
    type: "website",
    locale: "en_IN",
    siteName: "StartBusiness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Business Services - StartBusiness",
    description: "Expert business services for entrepreneurs. Company registration, compliance, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://startbusiness.co.in/services",
  },
}


export default function ServicesPage() {
  return (
    <AccessibilityImprovements>
      <VisualHierarchyImprovements />
      <div className="flex min-h-screen flex-col">

    


<AllServicesPage/>
        {/* Service Comparison Tool */}
        <section
          className="py-8 sm:py-10 md:py-12 bg-slate-50"
          aria-labelledby="comparison-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ServiceComparisonTool />
          </div>
        </section>


      </div>
    </AccessibilityImprovements>
  )
}
