"use client"

import { motion } from "framer-motion"
import {
  FileText,
  CheckCircle,
  Circle,
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

interface DocumentsSectionProps {
  service: ServiceData
  checkedDocuments: string[]
  toggleDocument: (doc: string) => void
}

export default function DocumentsSection({ service, checkedDocuments, toggleDocument }: DocumentsSectionProps) {
  // Get dynamic colors based on service color
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        gradient: "from-blue-500 to-blue-600",
        accent: "bg-blue-500",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
        gradient: "from-green-500 to-green-600",
        accent: "bg-green-500",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-200",
        gradient: "from-purple-500 to-purple-600",
        accent: "bg-purple-500",
      },
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const colors = getColorClasses(service.color)

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

  // Calculate completion percentage
  const totalDocuments = Object.values(service.requiredDocuments || {}).flat().length
  const completedDocuments = checkedDocuments.length
  const completionPercentage = totalDocuments > 0 ? (completedDocuments / totalDocuments) * 100 : 0

  return (
    <section id="documents" className="py-4 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className={`mb-4 ${colors.bg} ${colors.text} ${colors.border} px-4 py-2`}>
              <FileText className="w-4 h-4 mr-2" />
              Document Checklist
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Required Documents</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Prepare these documents to ensure a smooth registration process
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-slate-800">Document Progress</h3>
                <p className="text-sm text-slate-600">
                  {completedDocuments} of {totalDocuments} documents completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">{Math.round(completionPercentage)}%</div>
                <div className="text-sm text-slate-500">Complete</div>
              </div>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${colors.accent} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Documents by Category */}
          <div className="space-y-8">
            {Object.entries(service.requiredDocuments || {}).map(([category, documents], categoryIndex) => {
              const CategoryIcon = getCategoryIcon(category)
              const categoryCompleted = (documents as string[]).filter((doc) => checkedDocuments.includes(doc)).length
              const categoryTotal = (documents as string[]).length

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${colors.bg} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      <CategoryIcon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 capitalize">
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </h3>
                      <p className="text-slate-500">
                        {categoryCompleted} of {categoryTotal} documents completed
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {Math.round((categoryCompleted / categoryTotal) * 100)}%
                    </Badge>
                  </div>

                  {/* Documents Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(documents as string[]).map((doc, docIndex) => {
                      const DocIcon = getDocumentIcon(doc)
                      const isChecked = checkedDocuments.includes(doc)

                      return (
                        <motion.div
                          key={docIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: docIndex * 0.05 }}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${
                            isChecked ? `${colors.border} ${colors.bg}` : "border-slate-200 hover:border-slate-300"
                          }`}
                          onClick={() => toggleDocument(doc)}
                        >
                          <div className="flex items-start gap-3">
                            {/* Checkbox */}
                            <div className="mt-1">
                              {isChecked ? (
                                <CheckCircle className={`w-5 h-5 ${colors.text}`} />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-400" />
                              )}
                            </div>

                            {/* Document Info */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <DocIcon className={`w-4 h-4 ${isChecked ? colors.text : "text-slate-400"}`} />
                                <span className={`font-medium text-sm ${isChecked ? colors.text : "text-slate-700"}`}>
                                  {doc}
                                </span>
                              </div>
                              {isChecked && (
                                <Badge className={`${colors.bg} ${colors.text} border-0 text-xs`}>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Ready
                                </Badge>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Need Help with Documents?</h3>
              <p className="text-slate-600 mb-4">Our experts can guide you through the document preparation process</p>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                <Phone className="w-3 h-3 mr-1" />
                Expert Support Available
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
