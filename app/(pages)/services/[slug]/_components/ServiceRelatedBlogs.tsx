"use client";

import { useState, useEffect } from "react";
import { Calendar, ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  author: string;
  publishedAt: string | null;
  status: string;
  tags: string | null;
}

interface ServiceRelatedBlogsProps {
  serviceCategory: string;
  serviceTitle: string;
  serviceKeywords?: string[];
  className?: string;
  debugMode?: boolean; // For development debugging
}

interface RelatedBlog extends Blog {
  relevanceScore: number;
}

export default function ServiceRelatedBlogs({
  serviceCategory,
  serviceTitle,
  serviceKeywords = [],
  className = "",
  debugMode = false,
}: ServiceRelatedBlogsProps) {
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRelatedBlogs();
  }, [serviceCategory, serviceTitle]);

  const fetchRelatedBlogs = async () => {
    try {
      const response = await fetch("/api/blogs?status=published");
      if (!response.ok) throw new Error("Failed to fetch blogs");

      const allBlogs: Blog[] = await response.json();
      const related = findServiceRelatedBlogs(allBlogs);
      setRelatedBlogs(related);
    } catch (error) {
      console.error("Error fetching related blogs:", error);
      setRelatedBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const findServiceRelatedBlogs = (allBlogs: Blog[]): RelatedBlog[] => {
    // Extract meaningful keywords from service title
    const serviceWords = serviceTitle.toLowerCase()
      .split(/[\s-]+/)
      .filter(word => word.length > 2 && !['the', 'and', 'for', 'with', 'company', 'registration'].includes(word));

    // Get category-specific keywords
    const categoryKeywords = getCategorySpecificKeywords(serviceCategory);

    // Combine all search terms
    const searchTerms = [
      ...serviceWords,
      ...categoryKeywords,
      serviceCategory.toLowerCase().replace('-', ' ')
    ].filter(Boolean);

    console.log(`🔍 Searching for blogs with titles containing: ${serviceTitle} keywords`);
    console.log(`📝 Search terms:`, searchTerms);

    // Find blogs where the title contains service-related keywords
    const matchingBlogs = allBlogs
      .filter(blog => blog.status === "published")
      .filter(blog => {
        const blogTitle = blog.title.toLowerCase();

        // Check if any search term is present in the blog title
        return searchTerms.some(term => blogTitle.includes(term));
      })
      .map(blog => {
        const blogTitle = blog.title.toLowerCase();
        let relevanceScore = 0;

        // Score based on exact matches in title
        searchTerms.forEach(term => {
          if (blogTitle.includes(term)) {
            relevanceScore += term.length > 4 ? 10 : 5; // Longer terms get higher scores
          }
        });

        // Bonus for multiple keyword matches
        const matchCount = searchTerms.filter(term => blogTitle.includes(term)).length;
        if (matchCount > 1) {
          relevanceScore += matchCount * 3;
        }

        // Recent post bonus
        if (blog.publishedAt) {
          const publishDate = new Date(blog.publishedAt);
          const daysSincePublish = (Date.now() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
          if (daysSincePublish < 30) relevanceScore += 2;
        }

        return { ...blog, relevanceScore };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3); // Take top 3

    console.log(`📊 Found ${matchingBlogs.length} blogs with matching titles:`,
      matchingBlogs.map(b => ({ title: b.title, score: b.relevanceScore })));

    return matchingBlogs;
  };

  // Get category-specific keywords for better matching
  const getCategorySpecificKeywords = (category: string): string[] => {
    const categoryMap: { [key: string]: string[] } = {
      'business-setup': ['private limited', 'llp', 'opc', 'partnership', 'company', 'incorporation', 'registration'],
      'tax-compliance': ['gst', 'tax', 'compliance', 'filing', 'roc', 'annual', 'return'],
      'legal-services': ['trademark', 'copyright', 'patent', 'legal', 'ip', 'brand'],
      'other-services': ['license', 'msme', 'startup', 'iso', 'certification'],
      'licenses': ['fssai', 'iec', 'import', 'export', 'professional tax'],
      'intellectual-property': ['trademark', 'copyright', 'patent', 'design', 'brand']
    };

    return categoryMap[category.toLowerCase()] || categoryMap[category] || [];
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Recently";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border border-blue-100 p-6 shadow-sm ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-slate-200 rounded-lg mr-3"></div>
            <div className="h-6 bg-slate-200 rounded w-48"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4">
                <div className="w-20 h-20 bg-slate-200 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Only show section if we found blogs with matching titles
  if (relatedBlogs.length === 0) {
    console.log(`❌ No blogs found with titles matching: ${serviceTitle} (${serviceCategory})`);
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Related Articles</h3>
          <p className="text-sm text-slate-600">Articles specifically about {serviceTitle.toLowerCase()}</p>
        </div>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {relatedBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/blog/${blog.slug}`}
              className="block group hover:bg-white/60 rounded-xl p-3 -m-3 transition-all duration-300 hover:shadow-sm"
            >
              <article className="flex gap-4">
                {/* Featured Image */}
                <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                  {blog.featuredImage &&
                  blog.featuredImage !== "/placeholder.svg" &&
                  blog.featuredImage !== "" &&
                  !blog.featuredImage.includes("placeholder") ? (
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-blue-400" />
                    </div>
                  )}
                  
                  {/* Relevance indicator - shows for all matched blogs */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-tight mb-1">
                    {blog.title}
                  </h4>
                  
                  {blog.excerpt && (
                    <p className="text-xs text-slate-600 line-clamp-2 mb-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                    <span>•</span>
                    <span>{blog.author}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span>Related</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 self-center">
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-6 pt-4 border-t border-blue-200">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors group"
        >
          <span>Explore all business articles</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
