'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface LazyComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
  rootMargin?: string
  threshold?: number
  triggerOnce?: boolean
  minHeight?: number
}

export default function LazyComponent({
  children,
  fallback,
  className,
  rootMargin = '50px',
  threshold = 0.1,
  triggerOnce = true,
  minHeight = 100,
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            setHasTriggered(true)
            observer.unobserve(element)
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsVisible(false)
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [rootMargin, threshold, triggerOnce, hasTriggered])

  return (
    <div
      ref={elementRef}
      className={cn(className)}
      style={{ minHeight: isVisible ? 'auto' : minHeight }}
    >
      {isVisible ? children : fallback}
    </div>
  )
}

// Specialized lazy section component
interface LazySectionProps {
  children: React.ReactNode
  className?: string
  skeletonHeight?: number
  delay?: number
}

export function LazySection({
  children,
  className,
  skeletonHeight = 200,
  delay = 0,
}: LazySectionProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const skeleton = (
    <div className={cn('animate-pulse', className)}>
      <div
        className="bg-gray-200 rounded-lg"
        style={{ height: skeletonHeight }}
      />
    </div>
  )

  return (
    <LazyComponent
      fallback={skeleton}
      className={className}
      minHeight={skeletonHeight}
      triggerOnce={true}
    >
      {shouldRender ? children : skeleton}
    </LazyComponent>
  )
}

// Optimized list component that only renders visible items
interface OptimizedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  itemClassName?: string
  maxInitialItems?: number
  loadMoreText?: string
  showLoadMore?: boolean
}

export function OptimizedList<T>({
  items,
  renderItem,
  className,
  itemClassName,
  maxInitialItems = 10,
  loadMoreText = 'Load More',
  showLoadMore = true,
}: OptimizedListProps<T>) {
  const [visibleCount, setVisibleCount] = useState(maxInitialItems)

  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + maxInitialItems, items.length))
  }

  return (
    <div className={className}>
      {visibleItems.map((item, index) => (
        <div key={index} className={itemClassName}>
          {renderItem(item, index)}
        </div>
      ))}
      
      {hasMore && showLoadMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loadMoreText}
          </button>
        </div>
      )}
    </div>
  )
}

// Intersection observer hook for manual control
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, options])

  return isIntersecting
}
