
import FloatingCallButton from "@/components/floating-call-button";
import Footer from "@/components/footer";
import Header from "@/components/header";
import BottomNavigation from "@/components/ui/bottom-navigation";
import QueryProvider from "@/components/providers/query-provider";
import NuqsSuspenseProvider from "@/components/providers/nuqs-suspense-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { UIProvider } from "@/contexts/ui-context";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: {
    default:
      "StartBusiness - Company Registration, MCA, RBI Compliance, Trademark Services",
    template: "%s | StartBusiness",
  },
  description:
    "Platform for company registration, trademark registration, MCA compliance, RBI compliance and business registration services in India. Search company information by CIN, LLPIN, or company name. Expert guidance for entrepreneurs.",
  keywords: [
    // Business Registration Keywords
    "company registration", "business registration", "startup registration", "private limited company registration", "llp registration", "online company registration", "best ca firm in india", "best ca firm in pune", "business consultant",
    
    // Calculator Keywords (High Traffic)
    "ppf calculator", "gst calculator", "income tax calculator", "emi calculator", "salary calculator", "hra calculator", "tds calculator", "car loan calculator", "home loan calculator", "business loan calculator",
    "ppf calculator online", "gst calculator online", "income tax calculator india", "free calculators", "financial calculators", "tax calculators", "loan calculators",
    
    // Service Keywords
    "gst registration", "trademark registration", "fssai license", "msme registration", "ngo registration", "tax filing", "compliance services",
    
    // Location Keywords
    "india", "pune", "mumbai", "delhi", "bangalore", "chennai", "hyderabad",
    
    // Business Keywords
    "startup", "entrepreneur", "small business", "msme", "private limited", "llp", "partnership firm", "sole proprietorship"
  ],
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "StartBusiness - Business Registration, Compliance & Legal Services in India",
    description:
      "Professional company registration, trademark, GST, FSSAI, compliance, and legal services for startups and businesses in India. Fast, affordable, and expert support.",
    url: "https://www.startbusiness.co.in",
    siteName: "StartBusiness",
    images: ["/og/hero-og.png"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "StartBusiness - Business Registration, Compliance & Legal Services in India",
    description:
      "Professional company registration, trademark, GST, FSSAI, compliance, and legal services for startups and businesses in India. Fast, affordable, and expert support.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero/hero-latest-1.png"
          fetchPriority="high"
        />
        <meta name="apple-mobile-web-app-title" content="Start Business" />
        <meta
          name="google-site-verification"
          content="VjHph2u3tld04cEok8zvpPBA-TEtxikvfvGo7hW-NBE"
        />
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

        {/* Zoho SalesIQ Chat Widget */}
        <Script id="zoho-salesiq" strategy="afterInteractive">
          {`
            var $zoho = $zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
              widgetcode: "siq978926485bd5d64e3e56c7a1707d1cceebd9fa58d0d53561241dc137851567600c34c6eada1ad92bdd33d2ca4127495d",
              values: {},
              ready: function() {
                $zoho.salesiq.floatbutton.visible("show");

                // Adjust position for mobile devices to avoid bottom navigation
                if (window.innerWidth < 768) {
                  setTimeout(function() {
                    var floatButton = document.getElementById('zsiq_float');
                    if (floatButton) {
                      floatButton.style.bottom = '80px'; // Position above bottom nav (64px + 16px margin)
                      floatButton.style.right = '16px';
                      floatButton.style.zIndex = '8998';
                      floatButton.style.transform = 'scale(0.9)'; // Slightly smaller for mobile
                    }
                  }, 1000);
                }
              }
            };
            var d = document;
            var s = d.createElement("script");
            s.type = "text/javascript";
            s.id = "zsiqscript";
            s.defer = true;
            s.src = "https://salesiq.zoho.in/widget";
            var t = d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(s, t);
          `}
        </Script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <NuqsAdapter>
          <NuqsSuspenseProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              <Analytics />
              <QueryProvider>
                <div className="relative min-h-screen flex flex-col">
                  <UIProvider>
                    <Header />
                    <main className="flex-1 pb-safe">{children}</main>
                    <Footer />
                    <FloatingCallButton />
                    <BottomNavigation />
                    {/* <Chatbot /> */}
                  </UIProvider>
                </div>
              </QueryProvider>
              <Toaster
                position="top-center"
                expand={true}
                richColors
                closeButton
              />
            </ThemeProvider>
          </NuqsSuspenseProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
