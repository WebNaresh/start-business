import Link from "next/link"
import { Metadata } from "next"
import { 
  Building2, 
  Calculator, 
  FileText, 
  BookOpen, 
  Phone, 
  Info,
  Scale,
  Briefcase,
  TrendingUp,
  Shield
} from "lucide-react"
import Breadcrumbs from "@/components/ui/breadcrumbs"

export const metadata: Metadata = {
  title: "Sitemap - All Pages | StartBusiness",
  description: "Complete sitemap of all pages and services available on StartBusiness. Find all our business registration, tax filing, and compliance services.",
  keywords: [
    "sitemap",
    "all pages",
    "business services",
    "company registration",
    "tax filing",
    "business compliance",
    "StartBusiness services"
  ]
}

interface SitemapSection {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  links: {
    title: string
    href: string
    description: string
  }[]
}

const sitemapSections: SitemapSection[] = [
  {
    title: "Company Registration",
    description: "All types of business registration services",
    icon: Building2,
    links: [
      {
        title: "Private Limited Company",
        href: "/services/private-limited-company",
        description: "Register your Private Limited Company with complete legal protection"
      },
      {
        title: "Limited Liability Partnership (LLP)",
        href: "/services/llp", 
        description: "Professional LLP registration for partnerships"
      },
      {
        title: "One Person Company (OPC)",
        href: "/services/opc",
        description: "Solo entrepreneur business registration"
      },
      {
        title: "Partnership Firm",
        href: "/services/partnership-firm",
        description: "Traditional partnership business registration"
      },
      {
        title: "Sole Proprietorship",
        href: "/services/sole-proprietorship",
        description: "Individual business registration"
      }
    ]
  },
  {
    title: "Tax & Compliance",
    description: "Tax filing and compliance services",
    icon: FileText,
    links: [
      {
        title: "GST Registration",
        href: "/services/gst-registration",
        description: "Complete GST registration and compliance"
      },
      {
        title: "Company Annual ROC Compliance",
        href: "/services/roc-annual-compliances",
        description: "Annual compliance for private limited companies"
      },
      {
        title: "LLP Annual ROC Compliance", 
        href: "/services/llp-annual-compliance",
        description: "Annual compliance for limited liability partnerships"
      },
      {
        title: "FEMA Compliance",
        href: "/services/fema-compliance",
        description: "FDI/ODI reporting and FLA return filing"
      },
      {
        title: "LLP Annual Compliance",
        href: "/services/llp-annual-compliance",
        description: "Complete LLP annual compliance including Form 8 and Form 11"
      }
    ]
  },
  {
    title: "Intellectual Property",
    description: "Trademark and copyright protection services",
    icon: Scale,
    links: [
      {
        title: "Trademark Registration",
        href: "/services/trademark-registration",
        description: "Protect your brand with trademark registration"
      },
      {
        title: "Copyright Registration",
        href: "/services/copyright-registration",
        description: "Protect your creative works and content"
      },
      {
        title: "Trademark Objection Response",
        href: "/services/trademark-objection",
        description: "Professional response to trademark objections"
      },
      {
        title: "Trademark Hearing Representation",
        href: "/services/trademark-hearing",
        description: "Expert representation in trademark hearings"
      }
    ]
  },
  {
    title: "Important Registration",
    description: "Business licenses and regulatory registrations",
    icon: Briefcase,
    links: [
      {
        title: "IEC License",
        href: "/services/iec-license",
        description: "Import Export Code for international trade"
      },
      {
        title: "Shop & Establishment License",
        href: "/services/shop-establishment",
        description: "Mandatory license for business premises"
      },
      {
        title: "Professional Tax Registration",
        href: "/services/professional-tax",
        description: "State professional tax registration"
      },
      {
        title: "MSME Registration",
        href: "/services/msme-registration",
        description: "Udyam registration for micro, small & medium enterprises"
      }
    ]
  },
  {
    title: "Business Calculators",
    description: "Free business calculation tools",
    icon: Calculator,
    links: [
      {
        title: "GST Calculator",
        href: "/calculators/gst-calculator",
        description: "Calculate GST inclusive and exclusive amounts"
      },
      {
        title: "Income Tax Calculator",
        href: "/calculators/income-tax-calculator",
        description: "Calculate your income tax liability"
      },
      {
        title: "EMI Calculator",
        href: "/calculators/emi-calculator",
        description: "Calculate loan EMI for business loans"
      },
      {
        title: "Business Loan Calculator",
        href: "/calculators/business-loan-calculator",
        description: "Calculate business loan eligibility and EMI"
      },
      {
        title: "Salary Calculator",
        href: "/calculators/salary-calculator",
        description: "Calculate take-home salary and deductions"
      }
    ]
  },
  {
    title: "Resources & Information",
    description: "Helpful guides and information",
    icon: BookOpen,
    links: [
      {
        title: "Business Blog",
        href: "/blog",
        description: "Latest business insights and guides"
      },
      {
        title: "Startup Guide",
        href: "/blog/startup-guide",
        description: "Complete guide to starting a business"
      },
      {
        title: "Tax Filing Guide",
        href: "/blog/tax-filing-guide",
        description: "Step-by-step tax filing instructions"
      },
      {
        title: "Company Registration Guide",
        href: "/blog/company-registration-guide",
        description: "How to register your company"
      },
      {
        title: "FAQ",
        href: "/faq",
        description: "Frequently asked questions"
      }
    ]
  },
  {
    title: "Company Information",
    description: "About us and contact information",
    icon: Info,
    links: [
      {
        title: "About Us",
        href: "/about",
        description: "Learn about StartBusiness and our mission"
      },
      {
        title: "Contact Us",
        href: "/contact",
        description: "Get in touch with our business experts"
      },
      {
        title: "Privacy Policy",
        href: "/legal/privacy-policy",
        description: "Our privacy policy and data protection"
      },
      {
        title: "Terms of Service",
        href: "/legal/terms-of-service",
        description: "Terms and conditions of service"
      }
    ]
  }
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs className="bg-slate-50 border-b border-slate-200" />
      
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Complete Sitemap
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Find all our business services, resources, and information pages. 
              Everything you need to start and grow your business in India.
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {sitemapSections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                    <p className="text-slate-600">{section.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="group p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                    >
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                        {link.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {link.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help Finding What You're Looking For?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our business experts are here to guide you to the right service for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Phone className="w-5 h-5 mr-2" />
            Contact Our Experts
          </Link>
        </div>
      </section>
    </div>
  )
}
