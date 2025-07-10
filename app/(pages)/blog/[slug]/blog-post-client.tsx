"use client";

import { notFound } from "next/navigation";
import { useBlog } from "@/hooks/use-blogs";
import BlogDetailClient from "./blog-detail-client";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPostClientProps {
  params: Promise<{ slug: string }>;
}

// Blog post skeleton component
function BlogPostSkeleton() {
  return (
    <article className="min-h-screen bg-white">
      {/* Breadcrumbs Skeleton */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Header Section Skeleton */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <div className="flex items-center gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-8 h-8 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Skeleton className="h-6 w-24 mb-4 rounded-full" />
              <Skeleton className="h-12 w-full mb-2" />
              <Skeleton className="h-12 w-3/4 mb-6" />
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center">
                  <Skeleton className="w-12 h-12 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="flex items-center">
                  <Skeleton className="w-4 h-4 mr-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="w-4 h-4 mr-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>

            {/* Featured Image Skeleton */}
            <Skeleton className="aspect-video rounded-xl" />
          </div>
        </div>
      </section>

      {/* Content Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main Content Skeleton */}
              <div className="lg:col-span-8">
                <div className="space-y-4">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className={`h-4 ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/5'}`} />
                  ))}
                </div>
              </div>

              {/* Sidebar Skeleton */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-8">
                  {/* Related Posts Skeleton */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex gap-3">
                          <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-3 w-3/4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Author Card Skeleton */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-center mb-4">
                      <Skeleton className="w-16 h-16 rounded-full mr-4" />
                      <div>
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-16 w-full mb-4" />
                  </div>

                  {/* CTA Card Skeleton */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <Skeleton className="h-5 w-32 mb-3" />
                    <Skeleton className="h-16 w-full mb-4" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

export default function BlogPostClient({ params }: BlogPostClientProps) {
  const [slug, setSlug] = useState<string>("");

  // Extract slug from params
  useEffect(() => {
    const extractSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    extractSlug();
  }, [params]);

  // Fetch blog data using the custom hook with optimized caching
  const { data: blogPost, isLoading, error } = useBlog(slug, !!slug);

  // Handle loading state
  if (isLoading || !slug) {
    return <BlogPostSkeleton />;
  }

  // Handle error state
  if (error) {
    console.error("Error fetching blog post:", error);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Blog Post
          </h1>
          <p className="text-gray-600 mb-6">
            {error instanceof Error ? error.message : "An unexpected error occurred"}
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Handle not found state
  if (!blogPost) {
    console.log("Blog post not found, returning 404");
    notFound();
  }

  // Render the blog post
  return <BlogDetailClient blogPost={blogPost} />;
}
