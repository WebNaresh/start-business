"use client";

import { Suspense, type ReactNode } from "react";

interface NuqsSuspenseProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Default fallback component for nuqs Suspense boundaries
 * Provides a minimal loading state that matches the application's design system
 */
function DefaultNuqsFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Minimal loading indicator */}
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * NuqsSuspenseProvider - Reusable Suspense wrapper for nuqs hooks
 * 
 * This component automatically provides Suspense boundaries for all pages that use
 * nuqs hooks (useQueryState, etc.), eliminating the need to manually wrap each
 * individual page component with Suspense.
 * 
 * Features:
 * - Automatic Suspense boundary for URL state hydration
 * - Consistent fallback UI across the application
 * - Customizable fallback component
 * - Seamless integration with NuqsAdapter
 * 
 * Usage:
 * - Integrate into root layout alongside NuqsAdapter
 * - All child pages automatically get Suspense boundaries
 * - No manual Suspense wrapping needed for individual pages
 * 
 * @param children - The child components to wrap with Suspense
 * @param fallback - Optional custom fallback component (defaults to DefaultNuqsFallback)
 */
export default function NuqsSuspenseProvider({ 
  children, 
  fallback 
}: NuqsSuspenseProviderProps) {
  return (
    <Suspense fallback={fallback || <DefaultNuqsFallback />}>
      {children}
    </Suspense>
  );
}

/**
 * Lightweight fallback for pages that don't need full page skeleton
 * Useful for components that are part of a larger page layout
 */
export function LightweightNuqsFallback() {
  return (
    <div className="animate-pulse p-4">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

/**
 * Page-specific fallback for blog-like content
 * Provides a more detailed skeleton for content-heavy pages
 */
export function ContentPageFallback() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="animate-pulse">
        {/* Page title skeleton */}
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
        
        {/* Filter/search bar skeleton */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-10 bg-gray-200 rounded flex-1"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Image skeleton */}
              <div className="h-48 bg-gray-200"></div>
              
              {/* Content skeleton */}
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                
                {/* Meta info skeleton */}
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Form-specific fallback for pages with forms and inputs
 * Provides skeleton for form-heavy pages
 */
export function FormPageFallback() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="animate-pulse">
          {/* Form title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-8"></div>
          
          {/* Form fields skeleton */}
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
          
          {/* Submit button skeleton */}
          <div className="mt-8">
            <div className="h-12 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
