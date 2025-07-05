"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { generateBreadcrumbs, type BreadcrumbItem } from "@/lib/internal-links"
import { usePathname } from "next/navigation"

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const pathname = usePathname()
  const breadcrumbItems = items || generateBreadcrumbs(pathname)

  // Don't show breadcrumbs on homepage
  if (pathname === '/' || breadcrumbItems.length <= 1) {
    return null
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://startbusiness.com'}${item.href}`
    }))
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Breadcrumb Navigation */}
      <nav 
        aria-label="Breadcrumb navigation"
        className={`py-3 sm:py-4 ${className}`}
      >
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-1 sm:space-x-2 text-sm text-slate-600 overflow-x-auto">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1
              const isFirst = index === 0
              
              return (
                <li key={item.href} className="flex items-center whitespace-nowrap">
                  {index > 0 && (
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 mx-1 sm:mx-2 flex-shrink-0" />
                  )}
                  
                  {isLast ? (
                    <span 
                      className="text-slate-900 font-medium truncate max-w-[150px] sm:max-w-none"
                      aria-current="page"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 truncate max-w-[100px] sm:max-w-none"
                      title={`Navigate to ${item.name}`}
                    >
                      {isFirst && (
                        <Home className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      )}
                      <span className="truncate">{item.name}</span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </nav>
    </>
  )
}
