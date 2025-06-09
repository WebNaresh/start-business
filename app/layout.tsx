import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UIProvider } from "@/context/ui-context"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StartBusiness - Business Registration, Compliance & Legal Services in India",
  description: "Professional company registration, trademark, GST, FSSAI, compliance, and legal services for startups and businesses in India. Fast, affordable, and expert support.",
  keywords: "best online company registration,best CA firm in India,Best CA firm in Pune,Best ca frim near me,company registration,startup registration,private limited company registration,limited company registration,gst,business registration, startup, trademark, GST, FSSAI, compliance, legal services, India, Pune, online incorporation, business consultant, MSME, LLP, private limited, ngo registration, tax filing, business support",
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
      <head>
        <meta name="apple-mobile-web-app-title" content="Start Business" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2T86HZSNGB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2T86HZSNGB');
          `}
        </Script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Analytics />
          <div className="relative min-h-screen flex flex-col">
            <UIProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <a
                href="tel:+919168499520"
                className="fixed left-6 bottom-6 z-[8999] flex items-center gap-2 px-4 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Call Us"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-medium text-sm hidden sm:inline">Call Us Now</span>
              </a>
            </UIProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
