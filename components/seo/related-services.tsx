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
    default: "bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8",
    compact: "bg-white rounded-lg sm:rounded-xl border border-slate-200 p-3 sm:p-4 lg:p-6",
    sidebar: "bg-white rounded-lg border border-slate-200 p-3 sm:p-4"
  }

  const gridClasses = {
    default: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6",
    compact: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4",
    sidebar: "space-y-2 sm:space-y-3"
  }

  return (
    <section className={`${containerClasses[variant]} ${className}`}>
      {/* Header - Enhanced Responsive */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h2 className={`font-bold text-slate-900 mb-2 sm:mb-3 leading-tight ${
          variant === 'sidebar'
            ? 'text-base sm:text-lg'
            : 'text-lg sm:text-xl lg:text-2xl xl:text-3xl'
        }`}>
          {title}
        </h2>
        {description && variant !== 'sidebar' && (
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>

      {/* Related Links Grid - Enhanced Responsive */}
      <div className={gridClasses[variant]}>
        {relatedLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative bg-white rounded-lg sm:rounded-xl border border-slate-200 p-3 sm:p-4 lg:p-5 hover:shadow-lg hover:shadow-blue-100/50 hover:border-blue-200 focus:border-blue-300 focus:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:-translate-y-1 touch-manipulation"
            title={link.description || link.title}
          >
            {/* Priority indicator - Enhanced Mobile */}
            {link.priority === 'high' && variant === 'default' && (
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full shadow-sm">
                  Popular
                </span>
              </div>
            )}

            {/* Content - Enhanced Mobile Layout */}
            <div className="space-y-2 sm:space-y-3 h-full flex flex-col">
              <h3 className={`font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight ${
                variant === 'sidebar'
                  ? 'text-sm sm:text-base'
                  : 'text-sm sm:text-base lg:text-lg'
              }`}>
                {link.title}
              </h3>

              {link.description && variant !== 'sidebar' && (
                <p className={`text-slate-600 leading-relaxed flex-grow ${
                  variant === 'compact'
                    ? 'text-xs sm:text-sm'
                    : 'text-xs sm:text-sm lg:text-base'
                } line-clamp-2 sm:line-clamp-3`}>
                  {link.description}
                </p>
              )}

              {/* Category badge and arrow - Enhanced Layout */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                  link.category === 'service'
                    ? 'text-green-700 bg-green-100 group-hover:bg-green-200'
                    : link.category === 'calculator'
                    ? 'text-purple-700 bg-purple-100 group-hover:bg-purple-200'
                    : 'text-blue-700 bg-blue-100 group-hover:bg-blue-200'
                }`}>
                  {link.category === 'service' ? 'Service' :
                   link.category === 'calculator' ? 'Calculator' :
                   'Resource'}
                </span>

                <ArrowRight className={`text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ${
                  variant === 'sidebar' ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'
                }`} />
              </div>
            </div>

            {/* Enhanced Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </Link>
        ))}
      </div>

      {/* Enhanced View All Link for sidebar variant */}
      {variant === 'sidebar' && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200">
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 transition-colors group/link"
          >
            View All Services
            <ExternalLink className="w-3 h-3 ml-1 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      )}

      {/* Add View All Services button for default variant on mobile */}
      {variant === 'default' && (
        <div className="mt-6 sm:mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-medium rounded-lg sm:rounded-xl transition-colors group/cta"
          >
            Explore All Services
            <ArrowRight className="w-4 h-4 ml-2 group-hover/cta:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </section>
  )
}

// Specialized component for blog posts - Enhanced Responsive
export function RelatedArticles({
  articles,
  className = ""
}: {
  articles: InternalLink[]
  className?: string
}) {
  if (articles.length === 0) return null

  return (
    <section className={`bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8 ${className}`}>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 leading-tight">
          Related Articles
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Continue reading with these related insights and guides
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {articles.slice(0, 4).map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group bg-white rounded-lg sm:rounded-xl border border-slate-200 p-3 sm:p-4 hover:shadow-md hover:shadow-blue-100/50 hover:border-blue-200 focus:border-blue-300 focus:shadow-md transition-all duration-300 hover:-translate-y-0.5 focus:-translate-y-0.5 touch-manipulation"
          >
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 sm:mb-3 leading-tight text-sm sm:text-base">
              {article.title}
            </h3>
            {article.description && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                {article.description}
              </p>
            )}
            <div className="flex items-center text-xs sm:text-sm text-blue-600 font-medium group/link">
              Read Article
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
