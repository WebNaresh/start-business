/**
 * DOM Optimization Utilities
 * Helps reduce DOM size and improve performance
 */

// Configuration for DOM optimization
export const DOM_OPTIMIZATION_CONFIG = {
  // Virtual list thresholds
  VIRTUAL_LIST_THRESHOLD: 50,
  VIRTUAL_GRID_THRESHOLD: 100,
  
  // Progressive loading limits
  INITIAL_ITEMS_SMALL: 6,
  INITIAL_ITEMS_MEDIUM: 12,
  INITIAL_ITEMS_LARGE: 20,
  
  // Lazy loading settings
  INTERSECTION_ROOT_MARGIN: '50px',
  INTERSECTION_THRESHOLD: 0.1,
  
  // Animation delays (reduced for performance)
  STAGGER_DELAY: 0.02, // 20ms instead of 50ms+
  MAX_ANIMATION_DELAY: 0.5, // 500ms max
  
  // DOM depth limits
  MAX_RECOMMENDED_DEPTH: 12,
  MAX_CHILDREN_WARNING: 15,
}

/**
 * Calculate optimal item count based on viewport and performance
 */
export function calculateOptimalItemCount(
  viewportHeight: number,
  itemHeight: number,
  performanceLevel: 'low' | 'medium' | 'high' = 'medium'
): number {
  const visibleItems = Math.ceil(viewportHeight / itemHeight)
  const multiplier = {
    low: 1.5,
    medium: 2,
    high: 3,
  }[performanceLevel]
  
  return Math.max(6, Math.ceil(visibleItems * multiplier))
}

/**
 * Debounce function for search and filter operations
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for scroll events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Check if device has limited performance capabilities
 */
export function isLowPerformanceDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // Check for low-end device indicators
  const connection = (navigator as any).connection
  const isSlowConnection = connection && (
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g' ||
    connection.saveData
  )
  
  // Check for limited memory (if available)
  const deviceMemory = (navigator as any).deviceMemory
  const isLowMemory = deviceMemory && deviceMemory < 4
  
  // Check for limited CPU cores
  const hardwareConcurrency = navigator.hardwareConcurrency
  const isLowCPU = hardwareConcurrency && hardwareConcurrency < 4
  
  return prefersReducedMotion || isSlowConnection || isLowMemory || isLowCPU
}

/**
 * Get optimal configuration based on device capabilities
 */
export function getOptimalConfig() {
  const isLowPerf = isLowPerformanceDevice()
  
  return {
    useVirtualization: isLowPerf,
    maxInitialItems: isLowPerf ? DOM_OPTIMIZATION_CONFIG.INITIAL_ITEMS_SMALL : DOM_OPTIMIZATION_CONFIG.INITIAL_ITEMS_MEDIUM,
    animationDelay: isLowPerf ? 0 : DOM_OPTIMIZATION_CONFIG.STAGGER_DELAY,
    enableAnimations: !isLowPerf,
    lazyLoadThreshold: isLowPerf ? 0.05 : DOM_OPTIMIZATION_CONFIG.INTERSECTION_THRESHOLD,
  }
}

/**
 * Measure DOM complexity
 */
export function measureDOMComplexity(): {
  totalElements: number
  maxDepth: number
  maxChildren: number
  recommendations: string[]
} {
  if (typeof document === 'undefined') {
    return {
      totalElements: 0,
      maxDepth: 0,
      maxChildren: 0,
      recommendations: []
    }
  }
  
  const totalElements = document.querySelectorAll('*').length
  let maxDepth = 0
  let maxChildren = 0
  const recommendations: string[] = []
  
  // Calculate max depth
  function calculateDepth(element: Element, depth = 0): number {
    maxDepth = Math.max(maxDepth, depth)
    let childMaxDepth = depth
    
    for (const child of element.children) {
      childMaxDepth = Math.max(childMaxDepth, calculateDepth(child, depth + 1))
    }
    
    return childMaxDepth
  }
  
  // Find max children count
  document.querySelectorAll('*').forEach(element => {
    maxChildren = Math.max(maxChildren, element.children.length)
  })
  
  calculateDepth(document.body)
  
  // Generate recommendations
  if (totalElements > 1500) {
    recommendations.push('Consider using virtual lists for large datasets')
  }
  
  if (maxDepth > DOM_OPTIMIZATION_CONFIG.MAX_RECOMMENDED_DEPTH) {
    recommendations.push('Reduce DOM nesting depth - consider flattening component structure')
  }
  
  if (maxChildren > DOM_OPTIMIZATION_CONFIG.MAX_CHILDREN_WARNING) {
    recommendations.push('Some elements have too many children - consider pagination or virtualization')
  }
  
  return {
    totalElements,
    maxDepth,
    maxChildren,
    recommendations
  }
}

/**
 * Optimize component rendering based on visibility
 */
export function useVisibilityOptimization(threshold = 0.1) {
  if (typeof window === 'undefined') {
    return { isVisible: true, ref: null }
  }
  
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold }
    )
    
    observer.observe(element)
    
    return () => {
      observer.unobserve(element)
    }
  }, [threshold])
  
  return { isVisible, ref }
}

/**
 * Batch DOM updates to prevent layout thrashing
 */
export function batchDOMUpdates(updates: (() => void)[]): void {
  if (typeof window === 'undefined') return
  
  requestAnimationFrame(() => {
    updates.forEach(update => update())
  })
}

/**
 * Memory-efficient event listener management
 */
export class EventListenerManager {
  private listeners: Map<string, Set<EventListener>> = new Map()
  
  add(element: Element, event: string, listener: EventListener, options?: AddEventListenerOptions) {
    const key = `${element.tagName}-${event}`
    
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set())
    }
    
    this.listeners.get(key)!.add(listener)
    element.addEventListener(event, listener, options)
  }
  
  remove(element: Element, event: string, listener: EventListener) {
    const key = `${element.tagName}-${event}`
    const listeners = this.listeners.get(key)
    
    if (listeners) {
      listeners.delete(listener)
      if (listeners.size === 0) {
        this.listeners.delete(key)
      }
    }
    
    element.removeEventListener(event, listener)
  }
  
  cleanup() {
    this.listeners.clear()
  }
}

// Import statements for React hooks (to be added at the top of actual usage)
import { useState, useEffect, useRef } from 'react'
