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
    <div className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm ${className}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-12 pr-4 py-3 text-base border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-3">
          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="relative px-4 py-3 border-gray-300 rounded-xl hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {/* Categories */}
              <DropdownMenuLabel className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Categories
              </DropdownMenuLabel>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => handleFilterChange('category', 
                    activeFilters.category === category ? undefined : category
                  )}
                  className={`cursor-pointer ${
                    activeFilters.category === category ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                >
                  <span className="flex-1">{category}</span>
                  {activeFilters.category === category && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {/* Date Range */}
              <DropdownMenuLabel className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </DropdownMenuLabel>
              {dateRanges.map((range) => (
                <DropdownMenuItem
                  key={range.value}
                  onClick={() => handleFilterChange('dateRange', 
                    activeFilters.dateRange === range.value ? undefined : range.value
                  )}
                  className={`cursor-pointer ${
                    activeFilters.dateRange === range.value ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                >
                  <span className="flex-1">{range.label}</span>
                  {activeFilters.dateRange === range.value && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {/* Sort Options */}
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleFilterChange('sortBy', 
                    activeFilters.sortBy === option.value ? undefined : option.value
                  )}
                  className={`cursor-pointer ${
                    activeFilters.sortBy === option.value ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                >
                  <span className="flex-1">{option.label}</span>
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
                    className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filters Button */}
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Active filters:</span>
            {Object.entries(activeFilters).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {key === 'category' && 'Category: '}
                {key === 'dateRange' && 'Date: '}
                {key === 'sortBy' && 'Sort: '}
                {value}
                <button
                  onClick={() => handleFilterChange(key as keyof BlogFilters, undefined)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
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
