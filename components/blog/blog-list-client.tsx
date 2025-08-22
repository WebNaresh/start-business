"use client";

import type { Blog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useQueryState } from "nuqs";
import { useBlogs } from "@/hooks/use-blogs";
import BlogSearchFilter from "./blog-search-filter";

export default function BlogListClient() {
  // URL state management with nuqs
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const [dateRange, setDateRange] = useQueryState("dateRange", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "newest",
    clearOnDefault: true,
  });

  // Pagination state management
  const ITEMS_PER_PAGE = 6; // Number of articles to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch blog data using TanStack Query
  const { data: blogPosts = [], isLoading, error } = useBlogs("published");

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, category, dateRange, sortBy]);

  // Extract unique categories and tags from blog posts
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        blogPosts.flatMap(
          (post) => post.tags?.split(",").map((tag) => tag.trim()) || []
        )
      )
    ).filter(Boolean);
  }, [blogPosts]);

  const tags = categories; // For now, using same as categories

  // Filter and search functionality using useMemo for performance
  const allFilteredPosts = useMemo(() => {
    let filtered = [...blogPosts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (category) {
      filtered = filtered.filter((post) =>
        post.tags?.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Apply date range filter
    if (dateRange) {
      const now = new Date();
      const filterDate = new Date();

      switch (dateRange) {
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "quarter":
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(
        (post) => post.publishedAt && new Date(post.publishedAt) >= filterDate
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case "oldest":
        filtered.sort((a, b) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateA - dateB;
        });
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      // 'popular' would need view counts or similar metrics
    }

    return filtered;
  }, [blogPosts, searchQuery, category, dateRange, sortBy]);

  // Calculate visible posts based on pagination
  const visiblePosts = useMemo(() => {
    const endIndex = currentPage * ITEMS_PER_PAGE;
    return allFilteredPosts.slice(0, endIndex);
  }, [allFilteredPosts, currentPage, ITEMS_PER_PAGE]);

  // Check if there are more posts to load
  const hasMorePosts = useMemo(() => {
    return visiblePosts.length < allFilteredPosts.length;
  }, [visiblePosts.length, allFilteredPosts.length]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: any) => {
    // Update individual filter states based on the filters object
    if (filters.category !== undefined) {
      setCategory(filters.category || "");
    }
    if (filters.dateRange !== undefined) {
      setDateRange(filters.dateRange || "");
    }
    if (filters.sortBy !== undefined) {
      setSortBy(filters.sortBy || "newest");
    }
  };

  // Handle load more functionality
  const handleLoadMore = async () => {
    setIsLoadingMore(true);

    // Simulate a small delay for better UX (optional)
    await new Promise((resolve) => setTimeout(resolve, 300));

    setCurrentPage((prev) => prev + 1);
    setIsLoadingMore(false);
  };

  // Clear all filters and search
  const clearAllFilters = () => {
    setSearchQuery("");
    setCategory("");
    setDateRange("");
    setSortBy("newest");
  };

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-16">
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Blog Posts
          </h3>
          <p className="text-gray-600">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="h-6 bg-blue-100 rounded-full w-32 mx-auto mb-6"></div>
            <div className="h-12 bg-slate-200 rounded-lg w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-80 mx-auto"></div>
          </div>
          
          {/* Search Filter Skeleton */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-16">
            <div className="h-12 bg-slate-200 rounded-xl"></div>
          </div>
          
          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
              >
                <div className="h-56 bg-gradient-to-br from-blue-50 to-indigo-50"></div>
                <div className="p-6">
                  <div className="h-6 bg-blue-100 rounded-full w-20 mb-3"></div>
                  <div className="h-7 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-7 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3 mb-6"></div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full mr-3"></div>
                      <div>
                        <div className="h-4 bg-slate-200 rounded w-20 mb-1"></div>
                        <div className="h-3 bg-slate-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-blue-50 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      {/* Enhanced Section Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6 border border-blue-100 shadow-sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Latest Content
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
          Featured Articles & Insights
        </h2>
        <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Stay updated with the latest business insights, expert tips, and industry trends to help grow your business and achieve your entrepreneurial goals.
        </p>
      </div>

      {/* Enhanced Search and Filter */}
      <div className="mb-8 md:mb-12">
        <BlogSearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          categories={categories}
          tags={tags}
        />
      </div>

      {/* Results Summary */}
      {blogPosts.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-full px-6 py-3 shadow-sm border border-slate-200">
              <p className="text-slate-600 text-sm font-medium">
                {allFilteredPosts.length === blogPosts.length
                  ? `Showing all ${blogPosts.length} articles`
                  : `Showing ${visiblePosts.length} of ${allFilteredPosts.length} articles`}
                {searchQuery && (
                  <span className="text-blue-600 font-semibold ml-1">
                    for "{searchQuery}"
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {blogPosts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-16 h-16 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            No Blog Posts Yet
          </h3>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            We're working on creating amazing content for you. Check back soon for insightful articles and expert guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Subscribe for Updates
            </button>
            <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
              Explore Services
            </button>
          </div>
        </div>
      ) : allFilteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-16 h-16 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            No Articles Found
          </h3>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={clearAllFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
            <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
              Browse All Articles
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visiblePosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group">
              <article className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col touch-manipulation">
                {/* Enhanced Featured Image */}
                <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                  {post.featuredImage &&
                  post.featuredImage !== "/placeholder.svg" &&
                  post.featuredImage !== "" &&
                  !post.featuredImage.includes("placeholder") &&
                  !post.featuredImage.includes("via.placeholder") ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={85}
                      priority={index < 3}
                      loading={index < 3 ? "eager" : "lazy"}
                      fetchPriority={index < 3 ? "high" : "auto"}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                      <div className="text-center text-slate-400">
                        <svg
                          className="w-20 h-20 mx-auto mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium">Business Insights</span>
                        <p className="text-xs mt-1 text-slate-300">Expert Content</p>
                      </div>
                    </div>
                  )}
                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Reading Time Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm border border-white/20">
                    <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    5 min read
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  {/* Category/Tags */}
                  {post.tags && (
                    <div className="mb-3 md:mb-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 shadow-sm">
                        <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {post.tags.split(",")[0].trim()}
                      </span>
                    </div>
                  )}

                  {/* Enhanced Title */}
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 md:mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h2>

                  {/* Enhanced Excerpt */}
                  {post.excerpt && (
                    <p className="text-slate-600 mb-4 md:mb-6 line-clamp-3 text-sm md:text-base leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Enhanced Author & Meta Info */}
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-slate-100">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mr-2 md:mr-3 flex items-center justify-center shadow-sm ring-2 ring-white flex-shrink-0">
                        <span className="text-xs md:text-sm font-bold text-white">
                          {post.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {post.author}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center">
                          <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="truncate">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )
                              : "Coming soon"}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Read More Button */}
                    <div className="group/btn ml-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 flex items-center justify-center transition-all duration-300 border border-blue-100 group-hover:border-blue-200 group-hover:scale-110 touch-manipulation">
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Enhanced Load More Section */}
      {hasMorePosts && (
        <div className="text-center mt-8 md:mt-12 lg:mt-16">
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 max-w-md mx-auto">
            <div className="mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full flex items-center justify-center border border-blue-100">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">Discover More Articles</h3>
              <p className="text-sm text-slate-600">
                Showing {visiblePosts.length} of {allFilteredPosts.length} articles
              </p>
            </div>

            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="w-full inline-flex items-center justify-center px-6 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:-translate-y-0.5 touch-manipulation text-sm md:text-base"
            >
              {isLoadingMore ? (
                <>
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 md:mr-3"></div>
                  <span>Loading Content...</span>
                </>
              ) : (
                <>
                  <span>Load More Articles</span>
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-y-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
