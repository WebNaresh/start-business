"use client"

import {
  FileText,
  User,
  Building,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Camera,
  Shield,
  Award,
} from "lucide-react"
import type { ServiceData } from "./service-types"
import { Badge } from "@/components/ui/badge"
import Script from "next/script"

interface DocumentsSectionProps {
  service: ServiceData
}

export default function DocumentsSection({ service }: DocumentsSectionProps) {
  // Document type icons mapping
  const getDocumentIcon = (docName: string) => {
    const name = docName.toLowerCase()
    if (name.includes("pan") || name.includes("aadhaar") || name.includes("passport")) return CreditCard
    if (name.includes("photo") || name.includes("photograph")) return Camera
    if (name.includes("address") || name.includes("utility") || name.includes("rent")) return MapPin
    if (name.includes("mobile") || name.includes("phone")) return Phone
    if (name.includes("email")) return Mail
    if (name.includes("bank") || name.includes("statement")) return Building
    if (name.includes("certificate") || name.includes("license")) return Award
    return FileText
  }

  // Category icons mapping
  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase()
    if (cat.includes("director") || cat.includes("partner") || cat.includes("proprietor")) return User
    if (cat.includes("office") || cat.includes("address") || cat.includes("registered")) return Building
    if (cat.includes("business") || cat.includes("company")) return Shield
    return FileText
  }

  // Handle both requiredDocuments and documents formats
  const documentsData = service.requiredDocuments || (service.documents ? { "Required Documents": service.documents } : {})

  // Generate structured data for document checklist
  const documentStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": Object.entries(documentsData).flatMap(([category, documents], categoryIndex) =>
      (documents as string[]).map((doc, docIndex) => ({
        "@type": "ListItem",
        "position": categoryIndex * 100 + docIndex + 1,
        "item": {
          "@type": "Thing",
          "name": doc,
          "description": `Required document for ${category} in ${service.shortTitle} registration`,
          "category": category
        }
      }))
    )
  }

  return (
    <section id="documents" className="py-4 bg-white" aria-labelledby="documents-heading">
      <Script
        id="documents-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(documentStructuredData) }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-blue-50 text-blue-600 border-blue-200 px-3 py-1.5 text-xs">
              <FileText className="w-3 h-3 mr-1.5" aria-hidden="true" />
              Document Checklist
            </Badge>
            <h2 id="documents-heading" className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
              Documents Required for <span className="text-blue-600">{service.shortTitle.includes("Registration") ? service.shortTitle : `${service.shortTitle} Registration`}</span> in India
            </h2>
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              Prepare these documents to ensure a smooth registration process
            </p>
          </div>

          {/* Documents by Category */}
          <div className="space-y-6" role="list">
            {Object.entries(documentsData).map(([category, documents], categoryIndex) => {
              const CategoryIcon = getCategoryIcon(category)

              return (
                <div
                  key={category}
                  className="bg-white rounded-xl p-6 shadow-md border border-blue-200"
                  role="listitem"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center" aria-hidden="true">
                      <CategoryIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-slate-800 capitalize">
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {(documents as string[]).length} documents required
                      </p>
                    </div>
                  </div>

                  {/* Documents Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3" role="list">
                    {(documents as string[]).map((doc, docIndex) => {
                      const DocIcon = getDocumentIcon(doc)

                      return (
                        <div
                          key={docIndex}
                          className="p-3 rounded-lg border border-blue-200 hover:border-blue-300 hover:shadow-sm transition-all duration-300"
                          role="listitem"
                        >
                          <div className="flex items-start gap-2">
                            <DocIcon className="w-4 h-4 text-blue-600" aria-hidden="true" />
                            <span className="text-xs text-slate-700 font-medium">
                              {doc}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Message */}
          <div className="text-center mt-8">
            <div className="bg-white rounded-lg p-4 shadow-md border border-blue-200">
              <h3 className="text-sm font-semibold text-slate-800 mb-1.5">Need Help with Documents?</h3>
              <p className="text-xs text-slate-600 mb-2">Our experts can guide you through the document preparation process</p>
              <Badge className="bg-blue-50 text-blue-600 border-blue-200 text-xs">
                <Phone className="w-3 h-3 mr-1" aria-hidden="true" />
                Expert Support Available
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
