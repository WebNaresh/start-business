import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicServicePage from "./_components/dynamic-service-page";
import servicesData from "./data/business-setup.json";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Main component that handles the actual page content
async function ServicePageContent({ slug }: { slug: string }) {
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return <DynamicServicePage service={service} slug={slug} />;
}

// Enhanced metadata generation
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const param = await params;
  const service = servicesData[param.slug as keyof typeof servicesData];

  if (!service) {
    return {
      title: "Service Not Found - StartBusiness",
      description:
        "The requested service could not be found. Please check the URL or browse our available services.",
    };
  }

  // Generate keywords based on service details
  const keywords = [
    service.shortTitle.toLowerCase(),
    service.category,
    "business services",
    "India",
    "registration",
    "compliance",
    "business setup",
    "company registration",
    "legal services",
    "business compliance",
    "corporate services",
    "business documentation",
    "professional services",
    "business consulting",
  ];

  // Generate structured data for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "StartBusiness",
      url: "https://startbusiness.co.in",
    },
    areaServed: "India",
    serviceType: service.category,
  };

  return {
    title: `${service.title} - StartBusiness | Expert Business Services`,
    description: service.description,
    keywords,
    openGraph: {
      title: service.title + " | StartBusiness",
      description: service.description,
      type: "website",
      locale: "en_IN",
      siteName: "StartBusiness",
      url: `https://startbusiness.co.in/services/business-setup/${param.slug}`,
      images: [`/og/services/business-setup/${param.slug}.png`],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: [`/og/services/business-setup/${param.slug}.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://startbusiness.co.in/services/business-setup/${param.slug}`,
    },
    other: {
      "structured-data": JSON.stringify(structuredData),
    },
  };
}

// Static parameter generation
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

// Page component that handles the route
export default async function ServicePage({ params }: ServicePageProps) {
  const param = await params;
  return <ServicePageContent slug={param.slug} />;
}
