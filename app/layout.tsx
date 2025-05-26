import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"
import Chatbot from "@/components/Chatbot"
import { UIProvider } from "@/context/ui-context"
import Head from "next/head"
import Script from "next/script"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StartBusiness - Business Registration, Compliance & Legal Services in India",
  description: "Professional company registration, trademark, GST, FSSAI, compliance, and legal services for startups and businesses in India. Fast, affordable, and expert support.",
  keywords: "company registration, business registration, startup, trademark, GST, FSSAI, compliance, legal services, India, Pune, online incorporation, business consultant, MSME, LLP, private limited, ngo registration, tax filing, business support",
  authors: [{ name: "StartBusiness", url: "https://startbusiness.co.in" }],
  creator: "StartBusiness",
  publisher: "StartBusiness",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "StartBusiness - Business Registration, Compliance & Legal Services in India",
    description: "Professional company registration, trademark, GST, FSSAI, compliance, and legal services for startups and businesses in India. Fast, affordable, and expert support.",
    url: "https://www.startbusiness.co.in",
    siteName: "StartBusiness",
    images: [
      {
        url: "/hero_og.png",
        width: 1200,
        height: 630,
        alt: "StartBusiness - Business Registration & Compliance Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StartBusiness - Business Registration, Compliance & Legal Services in India",
    description: "Professional company registration, trademark, GST, FSSAI, compliance, and legal services for startups and businesses in India. Fast, affordable, and expert support.",
    images: ["/hero_og.png"],
    creator: "@startbusinessin",
    site: "@startbusinessin",
  },
  metadataBase: new URL("https://startbusiness.co.in"),
  alternates: {
    canonical: "https://www.startbusiness.co.in",
    languages: {
      "en-IN": "https://startbusiness.co.in",
    },
  },
  category: "Business, Legal, Consulting, Startup",
  applicationName: "StartBusiness",
  generator: "Next.js, Vercel",
  referrer: "origin-when-cross-origin",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="apple-mobile-web-app-title" content="Start Business" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2T86HZSNGB"
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2T86HZSNGB');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "StartBusiness",
              "url": "https://www.startbusiness.co.in",
              "logo": "https://www.startbusiness.co.in/logo.png",
              "description": "Professional company registration, trademark, GST, FSSAI, compliance, and legal services for startups and businesses in India.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Office No 7, 3rd Floor, Saraswati Heights, Deccan Gymkhana, Behind Goodluck Café",
                "addressLocality": "Pune",
                "postalCode": "411004",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "18.5204",
                "longitude": "73.8567"
              },
              "telephone": "+919699214195",
              "email": "sales@biztreeaccounting.com",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "10:00",
                  "closes": "19:00"
                }
              ],
              "priceRange": "₹₹",
              "sameAs": [
                "https://www.facebook.com/startbusiness",
                "https://www.linkedin.com/company/startbusiness",
                "https://twitter.com/startbusiness"
              ],
              "areaServed": "IN",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Business Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Private Limited Registration",
                      "description": "Most popular choice for startups and growing businesses"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "GST Registration",
                      "description": "Faster GST registration with compliance guidance"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Trademark Registration",
                      "description": "Protect your brand identity with our end-to-end trademark registration services"
                    }
                  }
                ]
              }
            })
          }}
        />
      </Head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <UIProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <WhatsAppButton />
              <div className="fixed bottom-4 right-4 z-50">
                <Chatbot />
              </div>
            </UIProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
