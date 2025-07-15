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
     
      {/* Blog Posts Grid */}
      <BlogListClient />
    </div>
  );
}
