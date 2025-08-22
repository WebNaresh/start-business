"use client"

import { cn } from "@/lib/utils"

interface ServiceSkeletonProps {
  className?: string
  count?: number
  viewMode?: 'grid' | 'list'
}

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        "animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] rounded",
        "animate-shimmer",
        className
      )} 
    />
  )
}

function ServiceCardSkeleton({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            <SkeletonBox className="h-6 w-3/4 mb-2" />
            <SkeletonBox className="h-4 w-full mb-3" />
            <SkeletonBox className="h-4 w-2/3 mb-3" />
            
            {/* Features and Timeline */}
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <SkeletonBox className="h-6 w-20" />
              <SkeletonBox className="h-6 w-24" />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col sm:items-end gap-3 sm:text-right">
            <div className="bg-slate-50 px-3 py-2 rounded-lg">
              <SkeletonBox className="h-6 w-16 mb-1" />
              <SkeletonBox className="h-3 w-12" />
            </div>
            <SkeletonBox className="h-9 w-24" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <SkeletonBox className="h-6 w-3/4 mb-2" />
        <SkeletonBox className="h-4 w-full mb-1" />
        <SkeletonBox className="h-4 w-2/3" />
      </div>

      {/* Price and Timeline */}
      <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-lg">
        <div>
          <SkeletonBox className="h-7 w-16 mb-1" />
          <SkeletonBox className="h-3 w-12" />
        </div>
        <div className="text-right">
          <SkeletonBox className="h-4 w-16 mb-1" />
          <SkeletonBox className="h-3 w-12" />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2 mb-6 flex-1">
        <SkeletonBox className="h-4 w-20 mb-2" />
        <div className="space-y-2">
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-5/6" />
          <SkeletonBox className="h-4 w-4/5" />
        </div>
        <SkeletonBox className="h-3 w-24" />
      </div>

      {/* CTA Button */}
      <div className="mt-auto">
        <SkeletonBox className="h-9 w-full" />
      </div>
    </div>
  )
}

export default function ServiceSkeleton({ 
  className, 
  count = 8, 
  viewMode = 'grid' 
}: ServiceSkeletonProps) {
  return (
    <div className={cn(
      "transition-all duration-300",
      viewMode === 'grid'
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        : "space-y-3 sm:space-y-4",
      className
    )}>
      {Array.from({ length: count }).map((_, index) => (
        <ServiceCardSkeleton key={index} viewMode={viewMode} />
      ))}
    </div>
  )
}

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <SkeletonBox className="inline-block h-8 w-48 mb-6 sm:mb-8 rounded-full" />

          {/* Title */}
          <SkeletonBox className="h-12 sm:h-16 w-full max-w-4xl mx-auto mb-4 sm:mb-6" />
          <SkeletonBox className="h-8 sm:h-12 w-3/4 mx-auto mb-8 sm:mb-10" />

          {/* Description */}
          <SkeletonBox className="h-6 w-full max-w-3xl mx-auto mb-2" />
          <SkeletonBox className="h-6 w-2/3 mx-auto mb-8 sm:mb-10" />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
            <SkeletonBox className="h-12 w-full sm:w-40" />
            <SkeletonBox className="h-12 w-full sm:w-40" />
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <SkeletonBox className="h-8 w-12 mx-auto" />
                <SkeletonBox className="h-4 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Search and Filter Skeleton
export function SearchFilterSkeleton() {
  return (
    <section className="py-4 sm:py-6 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-4">
          <SkeletonBox className="h-12 w-full max-w-2xl mx-auto lg:mx-0 rounded-xl" />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Category Filters */}
          <div className="w-full lg:flex-1 order-1">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonBox key={index} className="h-9 w-24 flex-shrink-0 rounded-lg" />
              ))}
            </div>
          </div>

          {/* View Mode and Sort */}
          <div className="flex items-center gap-3 order-2">
            <SkeletonBox className="h-10 w-20 rounded-lg" />
            <SkeletonBox className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
