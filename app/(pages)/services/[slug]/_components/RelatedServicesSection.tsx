"use client"

import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect } from "react"

type ServiceColor = "blue" | "green" | "purple" | "amber"

interface RelatedService {
  title: string
  description: string
  slug: string
  color: ServiceColor
}

interface RelatedServicesSectionProps {
  currentService: string
}

export default function RelatedServicesSection({ currentService }: RelatedServicesSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  })

  const autoplay = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    const interval = setInterval(autoplay, 3000)
    return () => clearInterval(interval)
  }, [autoplay])

  // Sample related services data (in real implementation, this would come from props or API)
  const relatedServices: RelatedService[] = [
    // Business Setup Services
    {
      title: "Private Limited Company",
      description: "Register your business as a Private Limited Company with limited liability protection",
      slug: "private-limited-company",
      color: "blue" as ServiceColor,
    },
    {
      title: "Limited Liability Partnership",
      description: "Form an LLP with the benefits of partnership and limited liability",
      slug: "llp",
      color: "blue" as ServiceColor,
    },
    {
      title: "One Person Company",
      description: "Start a company with a single person as shareholder and director",
      slug: "opc",
      color: "blue" as ServiceColor,
    },
    {
      title: "Partnership Firm",
      description: "Create a partnership between two or more individuals",
      slug: "partnership-firm",
      color: "blue" as ServiceColor,
    },
    // Tax & Compliance Services
    {
      title: "GST Registration",
      description: "Register for Goods and Services Tax (GST) for your business",
      slug: "gst-registration",
      color: "green" as ServiceColor,
    },
    {
      title: "ITR-4 Filing",
      description: "File your income tax returns under presumptive taxation scheme",
      slug: "itr-4-filing",
      color: "green" as ServiceColor,
    },
    {
      title: "Income Tax Filing",
      description: "File your income tax returns accurately and on time",
      slug: "income-tax-filing",
      color: "green" as ServiceColor,
    },
    {
      title: "TDS Return Filing",
      description: "File your Tax Deducted at Source (TDS) returns",
      slug: "tds-filing",
      color: "green" as ServiceColor,
    },
    // Intellectual Property Services
    {
      title: "Trademark Registration",
      description: "Protect your brand identity with trademark registration",
      slug: "trademark-registration",
      color: "purple" as ServiceColor,
    },
    {
      title: "Trademark Search",
      description: "Check if your desired trademark is available",
      slug: "trademark-search",
      color: "purple" as ServiceColor,
    },
    {
      title: "Copyright Registration",
      description: "Protect your creative works with copyright registration",
      slug: "copyright-registration",
      color: "purple" as ServiceColor,
    },
    // Licenses & Registrations Services
    {
      title: "MSME Registration",
      description: "Register as a Micro, Small, or Medium Enterprise",
      slug: "msme-registration",
      color: "amber" as ServiceColor,
    },
    {
      title: "Import Export Code",
      description: "Get IEC code for import/export business activities",
      slug: "iec-license",
      color: "amber" as ServiceColor,
    },
    {
      title: "Shop & Establishment License",
      description: "Obtain mandatory license for your business premises",
      slug: "shop-establishment",
      color: "amber" as ServiceColor,
    },
    {
      title: "Digital Signature Certificate",
      description: "Obtain DSC for secure electronic transactions",
      slug: "digital-signature",
      color: "amber" as ServiceColor,
    },
  ].filter(service => service.slug !== currentService)

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
              Explore Our Other Services
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              Discover our comprehensive range of business registration and compliance services
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {relatedServices.map((service) => {
                  const colorClasses = {
                    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
                    green: "bg-green-50 text-green-600 hover:bg-green-100",
                    purple: "bg-purple-50 text-purple-600 hover:bg-purple-100",
                    amber: "bg-amber-50 text-amber-600 hover:bg-amber-100",
                  }[service.color]

                  return (
                    <div key={service.slug} className="flex-[0_0_280px] min-w-0">
                      <Link href={`/services/${service.slug}`}>
                        <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border-slate-200">
                          <CardContent className="p-4">
                            <div>
                              <h3 className="font-medium text-slate-800 mb-1.5 text-sm">
                                {service.title}
                              </h3>
                              <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                                {service.description}
                              </p>
                              <Button
                                variant="ghost"
                                className={`${colorClasses} w-full justify-between group text-xs py-1 h-8`}
                              >
                                Learn More
                                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* View All Services Button */}
          <div className="text-center mt-8">
            <Link href="/services">
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 px-6 text-sm h-9"
              >
                View All Services
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 