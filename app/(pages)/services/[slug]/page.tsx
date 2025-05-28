import type { Metadata } from "next"
import { notFound } from "next/navigation"
import servicesData from "./data/services.json"
import DynamicServicePage from "./_components/dynamic-service-page"

interface ServicePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const param = await params;
  const service = servicesData[param.slug as keyof typeof servicesData]

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: `${service.title} - StartBusiness | Expert Business Services`,
    description: service.description,
    keywords: [
      service.shortTitle.toLowerCase(),
      service.category,
      "business services",
      "India",
      "registration",
      "compliance",
    ],
    openGraph: {
      title: service.title,
      description: service.description,
      type: "website",
      locale: "en_IN",
      siteName: "StartBusiness",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://startbusiness.co.in/services/${param.slug}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }))
}

export default async function ServicePage({ params }: ServicePageProps) {
  const param = await params;
  const service = servicesData[param.slug as keyof typeof servicesData]

  if (!service) {
    notFound()
  }

  return <DynamicServicePage service={service} slug={param.slug} />
}
