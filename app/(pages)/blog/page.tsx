import { Metadata } from "next";
import BlogListClient from "@/components/blog/blog-list-client";

export const metadata: Metadata = {
  title: "Blog | Your Business Hub - Expert Insights & Guides",
  description:
    "Discover expert insights on business registration, finance, entrepreneurship, and more. Read our comprehensive guides to help you succeed in your business journey.",
  keywords:
    "business blog, entrepreneurship, finance tips, business registration, startup guides, business insights",
  openGraph: {
    title: "Blog | Your Business Hub - Expert Insights & Guides",
    description:
      "Discover expert insights on business registration, finance, entrepreneurship, and more. Read our comprehensive guides to help you succeed in your business journey.",
    url: "/blog",
    siteName: "Your Business Blog",
    images: [
      {
        url: "/blog-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Business Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Your Business Hub - Expert Insights & Guides",
    description:
      "Discover expert insights on business registration, finance, entrepreneurship, and more.",
    images: ["/blog-og-image.jpg"],
  },
  alternates: {
    canonical: "/blog", // Canonical URL without query strings for SEO
  },
};

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Latest Business Insights
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Business Insights
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                & Expert Guides
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover expert advice, practical guides, and industry insights to
              help you navigate your business journey with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-white/80 text-sm">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold">
                    A
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold">
                    B
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold">
                    C
                  </div>
                </div>
                <span>Trusted by 1000+ entrepreneurs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(248 250 252)"
            />
          </svg>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <BlogListClient />
    </div>
  );
}
