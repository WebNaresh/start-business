/**
 * CSS Optimization Utilities
 * Helps identify and remove unused CSS to reduce bundle size
 */

// Configuration for CSS optimization
export const CSS_OPTIMIZATION_CONFIG = {
  // Critical CSS classes that should always be included
  CRITICAL_CLASSES: [
    'container',
    'mx-auto',
    'px-4',
    'py-2',
    'text-center',
    'font-bold',
    'bg-blue-600',
    'text-white',
    'rounded',
    'hover:bg-blue-700',
    'transition-colors',
  ],
  
  // Animation classes to keep (only essential ones)
  ESSENTIAL_ANIMATIONS: [
    'animate-pulse',
    'animate-spin',
    'animate-bounce',
    'animate-fade-in-up',
    'animate-shimmer',
  ],
  
  // Hover effects to keep
  ESSENTIAL_HOVER_EFFECTS: [
    'hover-lift',
    'hover:scale-105',
    'hover:shadow-lg',
    'hover:bg-blue-700',
    'hover:text-blue-600',
  ],
  
  // Classes that are safe to remove
  REMOVABLE_CLASSES: [
    'animate-blob',
    'float-animation',
    'animation-delay-2000',
    'animation-delay-4000',
    'animate-scale-in',
    'animate-fade-in-left',
    'animate-fade-in-right',
    'animate-pulse-glow',
    'hover-scale',
    'hover-glow',
  ],
}

/**
 * Analyze CSS usage in the application
 */
export function analyzeCSSUsage(): {
  totalClasses: number
  usedClasses: string[]
  unusedClasses: string[]
  recommendations: string[]
} {
  if (typeof document === 'undefined') {
    return {
      totalClasses: 0,
      usedClasses: [],
      unusedClasses: [],
      recommendations: []
    }
  }

  const usedClasses = new Set<string>()
  const recommendations: string[] = []

  // Scan all elements for used classes
  document.querySelectorAll('*').forEach(element => {
    const classList = element.classList
    classList.forEach(className => {
      usedClasses.add(className)
    })
  })

  const usedClassesArray = Array.from(usedClasses)
  
  // Find potentially unused classes
  const unusedClasses = CSS_OPTIMIZATION_CONFIG.REMOVABLE_CLASSES.filter(
    className => !usedClassesArray.includes(className)
  )

  // Generate recommendations
  if (unusedClasses.length > 0) {
    recommendations.push(`Remove ${unusedClasses.length} unused animation classes`)
  }

  const animationClasses = usedClassesArray.filter(cls => cls.startsWith('animate-'))
  if (animationClasses.length > 10) {
    recommendations.push('Consider reducing the number of animation classes')
  }

  const colorClasses = usedClassesArray.filter(cls => 
    cls.includes('blue-') || cls.includes('red-') || cls.includes('green-')
  )
  if (colorClasses.length > 20) {
    recommendations.push('Consider using CSS custom properties for colors')
  }

  return {
    totalClasses: usedClassesArray.length,
    usedClasses: usedClassesArray,
    unusedClasses,
    recommendations
  }
}

/**
 * Generate critical CSS for above-the-fold content
 */
export function generateCriticalCSS(): string {
  const criticalClasses = CSS_OPTIMIZATION_CONFIG.CRITICAL_CLASSES
  
  // This would typically extract actual CSS rules
  // For now, return a list of critical classes
  return criticalClasses.join(' ')
}

/**
 * Optimize Tailwind CSS configuration
 */
export function getOptimizedTailwindConfig() {
  return {
    // Disable unused core plugins
    corePlugins: {
      preflight: true,
      container: true,
      accessibility: false,
      pointerEvents: false,
      resize: false,
      userSelect: false,
      fill: false,
      stroke: false,
    },
    
    // Safelist only essential classes
    safelist: [
      ...CSS_OPTIMIZATION_CONFIG.ESSENTIAL_ANIMATIONS,
      ...CSS_OPTIMIZATION_CONFIG.ESSENTIAL_HOVER_EFFECTS,
      // Dynamic classes patterns
      { pattern: /^bg-blue-/ },
      { pattern: /^text-blue-/ },
      { pattern: /^border-blue-/ },
      { pattern: /^grid-cols-/ },
      { pattern: /^gap-/ },
    ],
    
    // Block unused classes
    blocklist: CSS_OPTIMIZATION_CONFIG.REMOVABLE_CLASSES,
  }
}

/**
 * CSS minification and optimization
 */
export function optimizeCSS(css: string): string {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around selectors
    .replace(/\s*{\s*/g, '{')
    .replace(/;\s*}/g, '}')
    .replace(/;\s*/g, ';')
    // Remove trailing semicolons
    .replace(/;}/g, '}')
    .trim()
}

/**
 * Identify duplicate CSS rules
 */
export function findDuplicateCSS(css: string): string[] {
  const rules = css.match(/[^{}]+{[^{}]*}/g) || []
  const ruleMap = new Map<string, number>()
  const duplicates: string[] = []

  rules.forEach(rule => {
    const selector = rule.split('{')[0].trim()
    const count = ruleMap.get(selector) || 0
    ruleMap.set(selector, count + 1)
    
    if (count > 0) {
      duplicates.push(selector)
    }
  })

  return duplicates
}

/**
 * Calculate CSS size reduction potential
 */
export function calculateSizeReduction(originalSize: number): {
  potentialSavings: number
  optimizedSize: number
  reductionPercentage: number
} {
  // Estimate based on common optimization techniques
  const reductionFactors = {
    unusedClasses: 0.4, // 40% reduction from removing unused classes
    minification: 0.15, // 15% reduction from minification
    duplicateRemoval: 0.1, // 10% reduction from removing duplicates
    corePluginOptimization: 0.2, // 20% reduction from disabling unused core plugins
  }

  const totalReduction = Object.values(reductionFactors).reduce((sum, factor) => sum + factor, 0)
  const potentialSavings = Math.floor(originalSize * totalReduction)
  const optimizedSize = originalSize - potentialSavings
  const reductionPercentage = Math.floor((potentialSavings / originalSize) * 100)

  return {
    potentialSavings,
    optimizedSize,
    reductionPercentage
  }
}

/**
 * CSS performance monitoring
 */
export function monitorCSSPerformance(): {
  loadTime: number
  renderTime: number
  totalRules: number
  recommendations: string[]
} {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return {
      loadTime: 0,
      renderTime: 0,
      totalRules: 0,
      recommendations: []
    }
  }

  const styleSheets = Array.from(document.styleSheets)
  let totalRules = 0
  const recommendations: string[] = []

  try {
    styleSheets.forEach(sheet => {
      if (sheet.cssRules) {
        totalRules += sheet.cssRules.length
      }
    })
  } catch (e) {
    // Handle CORS issues with external stylesheets
    console.warn('Cannot access some stylesheets due to CORS policy')
  }

  // Performance recommendations
  if (totalRules > 4000) {
    recommendations.push('Consider reducing the number of CSS rules (current: ' + totalRules + ')')
  }

  if (styleSheets.length > 5) {
    recommendations.push('Consider combining CSS files to reduce HTTP requests')
  }

  return {
    loadTime: performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd || 0,
    renderTime: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
    totalRules,
    recommendations
  }
}

/**
 * Generate CSS optimization report
 */
export function generateOptimizationReport() {
  const cssUsage = analyzeCSSUsage()
  const performance = monitorCSSPerformance()
  const sizeEstimate = calculateSizeReduction(20000) // Assuming 20KB original size

  return {
    usage: cssUsage,
    performance,
    sizeReduction: sizeEstimate,
    summary: {
      currentIssues: [
        ...cssUsage.recommendations,
        ...performance.recommendations,
      ],
      optimizationPotential: `${sizeEstimate.reductionPercentage}% size reduction possible`,
      estimatedSavings: `${Math.floor(sizeEstimate.potentialSavings / 1024)}KB`,
    }
  }
}
