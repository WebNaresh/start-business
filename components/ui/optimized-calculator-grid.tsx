'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { VirtualGrid } from './virtual-list'
import { OptimizedList } from './lazy-component'
import { cn } from '@/lib/utils'

interface Calculator {
  id: string
  title: string
  description: string
  category: string
  icon: React.ComponentType<any>
  href: string
  popular?: boolean
  featured?: boolean
}

interface OptimizedCalculatorGridProps {
  calculators: Calculator[]
  searchQuery: string
  activeCategory: string
  className?: string
  useVirtualization?: boolean
  maxInitialItems?: number
}

export default function OptimizedCalculatorGrid({
  calculators,
  searchQuery,
  activeCategory,
  className,
  useVirtualization = false,
  maxInitialItems = 12,
}: OptimizedCalculatorGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Memoized filtered calculators to prevent unnecessary re-renders
  const filteredCalculators = useMemo(() => {
    return calculators.filter(calculator => {
      const matchesCategory = activeCategory === 'All' || calculator.category === activeCategory
      const matchesSearch = !searchQuery || 
        calculator.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calculator.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesCategory && matchesSearch
    })
  }, [calculators, activeCategory, searchQuery])

  // Memoized render function to prevent re-creation
  const renderCalculatorCard = useCallback((calculator: Calculator, index: number) => {
    const IconComponent = calculator.icon

    return (
      <motion.div
        key={calculator.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.02 }} // Reduced delay for better performance
        className="group"
        onMouseEnter={() => setHoveredCard(calculator.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:scale-105">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
                <IconComponent className="h-6 w-6 text-blue-600" />
              </div>
              {calculator.popular && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                  Popular
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {calculator.title}
            </h3>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {calculator.description}
            </p>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
            >
              <a href={calculator.href}>
                Calculate Now
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }, [hoveredCard])

  // If using virtualization for very large lists
  if (useVirtualization && filteredCalculators.length > 50) {
    return (
      <div className={cn('w-full', className)}>
        <VirtualGrid
          items={filteredCalculators}
          itemHeight={320}
          itemWidth={300}
          containerHeight={800}
          containerWidth={1200}
          columns={4}
          renderItem={renderCalculatorCard}
          className="border rounded-lg"
          gap={24}
        />
      </div>
    )
  }

  // For moderate lists, use optimized list with progressive loading
  if (filteredCalculators.length > maxInitialItems) {
    return (
      <OptimizedList
        items={filteredCalculators}
        renderItem={renderCalculatorCard}
        className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}
        maxInitialItems={maxInitialItems}
        loadMoreText="Load More Calculators"
      />
    )
  }

  // For small lists, render normally
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}
    >
      {filteredCalculators.map((calculator, index) => renderCalculatorCard(calculator, index))}
    </motion.div>
  )
}

// Optimized skeleton component for loading states
export function CalculatorGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="h-full animate-pulse">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded-xl" />
              <div className="w-16 h-6 bg-gray-200 rounded" />
            </div>
            <div className="w-3/4 h-6 bg-gray-200 rounded" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 mb-4">
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-2/3 h-4 bg-gray-200 rounded" />
            </div>
            <div className="w-full h-10 bg-gray-200 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
