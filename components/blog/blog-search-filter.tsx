'use client'

import { useState } from 'react'
import { Search, Filter, X, Calendar, Tag } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

interface BlogSearchFilterProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: BlogFilters) => void
  categories: string[]
  tags: string[]
  className?: string
}

interface BlogFilters {
  category?: string
  tag?: string
  dateRange?: string
  sortBy?: string
}

export default function BlogSearchFilter({
  onSearch,
  onFilterChange,
  categories,
  tags,
  className = ''
}: BlogSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<BlogFilters>({})
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleFilterChange = (key: keyof BlogFilters, value: string | undefined) => {
    const newFilters = { ...activeFilters }
    if (value) {
      newFilters[key] = value
    } else {
      delete newFilters[key]
    }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearAllFilters = () => {
    setActiveFilters({})
    setSearchQuery('')
    onSearch('')
    onFilterChange({})
  }

  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).length
  }

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'alphabetical', label: 'A-Z' }
  ]

  const dateRanges = [
    { value: 'week', label: 'Past Week' },
    { value: 'month', label: 'Past Month' },
    { value: 'quarter', label: 'Past 3 Months' },
    { value: 'year', label: 'Past Year' }
  ]

  return (
    <div className={`bg-white rounded-xl md:rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="flex flex-col gap-4">
        {/* Enhanced Search Input */}
        <div className="w-full">
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 md:w-5 md:h-5" />
            <Input
              type="text"
              placeholder="Search articles, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 md:pl-12 pr-10 md:pr-12 py-3 md:py-4 text-sm md:text-base border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 hover:bg-white transition-colors touch-manipulation"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative px-4 py-3 md:py-3 border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 bg-slate-50 touch-manipulation w-full sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2 text-slate-600" />
                <span className="text-slate-700 font-medium text-sm md:text-base">Filters</span>
                {getActiveFilterCount() > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs rounded-full flex items-center justify-center shadow-sm border-2 border-white">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 md:w-80 shadow-lg border-slate-200">
              {/* Categories */}
              <DropdownMenuLabel className="flex items-center text-slate-700 font-semibold">
                <Tag className="w-4 h-4 mr-2 text-blue-600" />
                Categories
              </DropdownMenuLabel>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => handleFilterChange('category', 
                    activeFilters.category === category ? undefined : category
                  )}
                  className={`cursor-pointer transition-colors ${
                    activeFilters.category === category 
                      ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="flex-1 font-medium">{category}</span>
                  {activeFilters.category === category && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {/* Date Range */}
              <DropdownMenuLabel className="flex items-center text-slate-700 font-semibold">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Date Range
              </DropdownMenuLabel>
              {dateRanges.map((range) => (
                <DropdownMenuItem
                  key={range.value}
                  onClick={() => handleFilterChange('dateRange', 
                    activeFilters.dateRange === range.value ? undefined : range.value
                  )}
                  className={`cursor-pointer transition-colors ${
                    activeFilters.dateRange === range.value 
                      ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="flex-1 font-medium">{range.label}</span>
                  {activeFilters.dateRange === range.value && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {/* Sort Options */}
              <DropdownMenuLabel className="flex items-center text-slate-700 font-semibold">
                <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                Sort By
              </DropdownMenuLabel>
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleFilterChange('sortBy', 
                    activeFilters.sortBy === option.value ? undefined : option.value
                  )}
                  className={`cursor-pointer transition-colors ${
                    activeFilters.sortBy === option.value 
                      ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="flex-1 font-medium">{option.label}</span>
                  {activeFilters.sortBy === option.value && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </DropdownMenuItem>
              ))}

              {getActiveFilterCount() > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={clearAllFilters}
                    className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Enhanced Clear Filters Button */}
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="text-slate-500 hover:text-slate-700 px-3 py-2 text-sm touch-manipulation w-full sm:w-auto"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Enhanced Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-slate-600 font-medium">Active filters:</span>
            {Object.entries(activeFilters).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200 shadow-sm"
              >
                {key === 'category' && '📂 '}
                {key === 'dateRange' && '📅 '}
                {key === 'sortBy' && '🔄 '}
                <span className="font-medium">
                  {key === 'category' && 'Category: '}
                  {key === 'dateRange' && 'Date: '}
                  {key === 'sortBy' && 'Sort: '}
                  {value}
                </span>
                <button
                  onClick={() => handleFilterChange(key as keyof BlogFilters, undefined)}
                  className="ml-2 text-blue-600 hover:text-blue-800 p-0.5 rounded-full hover:bg-blue-100 transition-colors"
                  aria-label={`Remove ${key} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
