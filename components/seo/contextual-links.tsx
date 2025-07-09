"use client"

import Link from "next/link"
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react"
import { getContextualLinksForContent, generateAnchorText, type InternalLink } from "@/lib/internal-links"

interface ContextualLinksProps {
  content: string
  maxLinks?: number
  className?: string
  variant?: 'inline' | 'callout' | 'sidebar'
}

export default function ContextualLinks({ 
  content, 
  maxLinks = 3, 
  className = "",
  variant = 'callout'
}: ContextualLinksProps) {
  const relevantLinks = getContextualLinksForContent(content).slice(0, maxLinks)

  if (relevantLinks.length === 0) {
    return null
  }

  if (variant === 'inline') {
    return (
      <div className={`space-y-2 ${className}`}>
        {relevantLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors mr-4 mb-2"
          >
            {generateAnchorText(link, 'casual')}
            <ExternalLink className="w-3 h-3 ml-1" />
          </Link>
        ))}
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-blue-50 rounded-lg border border-blue-200 p-4 ${className}`}>
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
          <Sparkles className="w-4 h-4 mr-2" />
          Helpful Resources
        </h3>
        <div className="space-y-2">
          {relevantLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-blue-700 hover:text-blue-800 transition-colors"
            >
              • {generateAnchorText(link, 'formal')}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Default callout variant
  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 my-8 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 mb-2">
            Related Services You Might Need
          </h3>
          <p className="text-blue-700 text-sm mb-4">
            Based on this content, these services might be helpful for your business:
          </p>
          
          <div className="space-y-3">
            {relevantLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between bg-white rounded-lg border border-blue-200 p-3 hover:shadow-md hover:border-blue-300 transition-all duration-300"
              >
                <div>
                  <h4 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h4>
                  {link.description && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {link.description.slice(0, 80)}...
                    </p>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for embedding natural links within content
export function InlineServiceLink({ 
  service, 
  children, 
  className = "" 
}: { 
  service: string
  children: React.ReactNode
  className?: string 
}) {
  // Map service names to URLs
  const serviceUrls: Record<string, string> = {
    // Company Registration Services
    'private-limited-company': '/services/private-limited-company',
    'llp-registration': '/services/llp-registration',
    'opc-registration': '/services/opc-registration',
    'partnership-firm': '/services/partnership-firm',
    'sole-proprietorship': '/services/sole-proprietorship',
    'section-8-company': '/services/section-8-company',
    'producer-company': '/services/producer-company',

    // Compliances Services
    'gst-registration': '/services/gst-registration',
    'annual-compliance': '/services/annual-compliance',

    // Legal & IP Services
    'trademark-registration': '/services/trademark-registration',
    'copyright-registration': '/services/copyright-registration',
    'patent-registration': '/services/patent-registration',
    'design-registration': '/services/design-registration',

    // Business Setup & Licensing
    'business-license': '/services/business-license',
    'fssai-registration': '/services/fssai-registration',
    'import-export-code': '/services/import-export-code',
    'digital-signature': '/services/digital-signature',
    'msme-registration': '/services/msme-registration',
    'startup-india-registration': '/services/startup-india-registration',

    // Financial Services
    'current-account-opening': '/services/current-account-opening',
    'business-loan': '/services/business-loan',

    // Legal Documentation
    'legal-documentation': '/services/legal-documentation',
    'contract-drafting': '/services/contract-drafting',
    'moa-aoa-drafting': '/services/moa-aoa-drafting',

    // Tax Calculators
    'gst-calculator': '/business-calculators/gst-calculator',
    'income-tax-calculator': '/business-calculators/income-tax-calculator',
    'tds-calculator': '/business-calculators/tds-calculator',
    'advance-tax-calculator': '/business-calculators/advance-tax-calculator',

    // Loan & EMI Calculators
    'emi-calculator': '/business-calculators/emi-calculator',
    'home-loan-calculator': '/business-calculators/home-loan-calculator',
    'personal-loan-calculator': '/business-calculators/personal-loan-calculator',
    'business-loan-calculator': '/business-calculators/business-loan-calculator',
    'car-loan-calculator': '/business-calculators/car-loan-calculator',

    // Investment Calculators
    'sip-calculator': '/business-calculators/sip-calculator',
    'fd-calculator': '/business-calculators/fd-calculator',
    'rd-calculator': '/business-calculators/rd-calculator',
    'ppf-calculator': '/business-calculators/ppf-calculator',
    'nsc-calculator': '/business-calculators/nsc-calculator',

    // Salary & HR Calculators
    'salary-calculator': '/business-calculators/salary-calculator',
    'hra-calculator': '/business-calculators/hra-calculator',
    'gratuity-calculator': '/business-calculators/gratuity-calculator',
    'provident-fund-calculator': '/business-calculators/provident-fund-calculator',

    // Business Calculators
    'compound-interest-calculator': '/business-calculators/compound-interest-calculator',
    'simple-interest-calculator': '/business-calculators/simple-interest-calculator',
    'margin-calculator': '/business-calculators/margin-calculator',
    'break-even-calculator': '/business-calculators/break-even-calculator',
    'roi-calculator': '/business-calculators/roi-calculator',

    // Insurance Calculators
    'term-insurance-calculator': '/business-calculators/term-insurance-calculator',
    'health-insurance-calculator': '/business-calculators/health-insurance-calculator'
  }

  const href = serviceUrls[service]
  
  if (!href) {
    return <span className={className}>{children}</span>
  }

  return (
    <Link
      href={href}
      className={`text-blue-600 hover:text-blue-700 font-medium underline decoration-blue-200 hover:decoration-blue-400 transition-colors ${className}`}
      title={`Learn more about ${service.replace(/-/g, ' ')}`}
    >
      {children}
    </Link>
  )
}

// CTA component for service promotion within content
export function ServiceCTA({ 
  service,
  title,
  description,
  buttonText = "Get Started",
  className = ""
}: {
  service: string
  title: string
  description: string
  buttonText?: string
  className?: string
}) {
  const serviceUrls: Record<string, string> = {
    // Company Registration Services
    'private-limited-company': '/services/private-limited-company',
    'llp-registration': '/services/llp-registration',
    'opc-registration': '/services/opc-registration',
    'partnership-firm': '/services/partnership-firm',
    'sole-proprietorship': '/services/sole-proprietorship',
    'section-8-company': '/services/section-8-company',
    'producer-company': '/services/producer-company',

    // Compliances Services
    'gst-registration': '/services/gst-registration',
    'annual-compliance': '/services/annual-compliance',

    // Legal & IP Services
    'trademark-registration': '/services/trademark-registration',
    'copyright-registration': '/services/copyright-registration',
    'patent-registration': '/services/patent-registration',
    'design-registration': '/services/design-registration',

    // Business Setup & Licensing
    'business-license': '/services/business-license',
    'fssai-registration': '/services/fssai-registration',
    'import-export-code': '/services/import-export-code',
    'digital-signature': '/services/digital-signature',
    'msme-registration': '/services/msme-registration',
    'startup-india-registration': '/services/startup-india-registration',

    // Financial Services
    'current-account-opening': '/services/current-account-opening',
    'business-loan': '/services/business-loan',

    // Legal Documentation
    'legal-documentation': '/services/legal-documentation',
    'contract-drafting': '/services/contract-drafting',
    'moa-aoa-drafting': '/services/moa-aoa-drafting'
  }

  const href = serviceUrls[service]
  
  if (!href) return null

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white my-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-blue-100 leading-relaxed">{description}</p>
        </div>
        <Link
          href={href}
          className="inline-flex items-center bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  )
}
