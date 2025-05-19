import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StartBusiness - Business Registration & Compliance Services",
  description:
    "Professional business registration, compliance, and legal services to help your business thrive in India",
  keywords: "company registration, trademark, compliance, business services, startup registration, legal services",
  openGraph: {
    title: "StartBusiness - Business Registration & Compliance Services",
    description:
      "Professional business registration, compliance, and legal services to help your business thrive in India",
    images: ["/hero_og.png"],
    url: "https://startbusiness.co.in",
  },
  metadataBase: new URL("https://startbusiness.co.in"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
