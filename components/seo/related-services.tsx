"use client"

import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { getRelatedServices, getClusterLinks, type InternalLink } from "@/lib/internal-links"
import { usePathname } from "next/navigation"

interface RelatedServicesProps {
  title?: string
  description?: string
  customLinks?: InternalLink[]
  showClusterLinks?: boolean
  className?: string
  variant?: 'default' | 'compact' | 'sidebar'
}

export default function RelatedServices({ 
  title = "Related Services",
  description = "Explore our other business services that might interest you",
  customLinks,
  showClusterLinks = true,
  className = "",
  variant = 'default'
}: RelatedServicesProps) {
  const pathname = usePathname()
  
  // Get related links
  let relatedLinks = customLinks || getRelatedServices(pathname)
  
  // Add cluster links if enabled
  if (showClusterLinks) {
    const clusterLinks = getClusterLinks(pathname)
    relatedLinks = [...relatedLinks, ...clusterLinks]
      .filter((link, index, self) => 
        index === self.findIndex(l => l.href === link.href)
      ) // Remove duplicates
      .slice(0, variant === 'compact' ? 3 : 4)
  }

  if (relatedLinks.length === 0) {
    return null
  }

  const containerClasses = {
    default: "bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-6 md:p-8",
    compact: "bg-white rounded-xl border border-slate-200 p-4 md:p-6",
    sidebar: "bg-white rounded-lg border border-slate-200 p-4"
  }

  const gridClasses = {
    default: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
    compact: "grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4",
    sidebar: "space-y-3"
  }

  return (
    <section className={`${containerClasses[variant]} ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className={`font-bold text-slate-900 mb-2 ${
          variant === 'sidebar' ? 'text-lg' : 'text-xl md:text-2xl'
        }`}>
          {title}
        </h2>
        {description && variant !== 'sidebar' && (
          <p className="text-slate-600 text-sm md:text-base">
            {description}
          </p>
        )}
      </div>

      {/* Related Links Grid */}
      <div className={gridClasses[variant]}>
        {relatedLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative bg-white rounded-xl border border-slate-200 p-4 md:p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            title={link.description || link.title}
          >
            {/* Priority indicator */}
            {link.priority === 'high' && variant === 'default' && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                  Popular
                </span>
              </div>
            )}

            {/* Content */}
            <div className="space-y-2">
              <h3 className={`font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight ${
                variant === 'sidebar' ? 'text-sm' : 'text-base md:text-lg'
              }`}>
                {link.title}
              </h3>
              
              {link.description && variant !== 'sidebar' && (
                <p className={`text-slate-600 leading-relaxed ${
                  variant === 'compact' ? 'text-xs' : 'text-sm'
                }`}>
                  {link.description}
                </p>
              )}

              {/* Category badge */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  link.category === 'service' 
                    ? 'text-green-700 bg-green-100' 
                    : link.category === 'calculator'
                    ? 'text-purple-700 bg-purple-100'
                    : 'text-blue-700 bg-blue-100'
                }`}>
                  {link.category === 'service' ? 'Service' : 
                   link.category === 'calculator' ? 'Calculator' : 
                   'Resource'}
                </span>

                <ArrowRight className={`text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 ${
                  variant === 'sidebar' ? 'w-3 h-3' : 'w-4 h-4'
                }`} />
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </Link>
        ))}
      </div>

      {/* View All Link for sidebar variant */}
      {variant === 'sidebar' && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All Services
            <ExternalLink className="w-3 h-3 ml-1" />
          </Link>
        </div>
      )}
    </section>
  )
}

// Specialized component for blog posts
export function RelatedArticles({ 
  articles,
  className = ""
}: { 
  articles: InternalLink[]
  className?: string 
}) {
  if (articles.length === 0) return null

  return (
    <section className={`bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 ${className}`}>
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
          Related Articles
        </h2>
        <p className="text-slate-600 text-sm md:text-base">
          Continue reading with these related insights and guides
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {articles.slice(0, 4).map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md hover:border-blue-200 transition-all duration-300"
          >
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-tight">
              {article.title}
            </h3>
            {article.description && (
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {article.description}
              </p>
            )}
            <div className="flex items-center text-xs text-blue-600 font-medium">
              Read Article
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
