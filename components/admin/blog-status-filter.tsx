"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type BlogStatusFilter = 'all' | 'published' | 'draft'

interface BlogStatusFilterProps {
  currentFilter: BlogStatusFilter
  onFilterChange: (filter: BlogStatusFilter) => void
  blogCounts?: {
    all: number
    published: number
    draft: number
  }
}

export function BlogStatusFilter({ 
  currentFilter, 
  onFilterChange, 
  blogCounts 
}: BlogStatusFilterProps) {
  const filters: Array<{
    key: BlogStatusFilter
    label: string
    description: string
  }> = [
    {
      key: 'all',
      label: 'All Blogs',
      description: 'Show all blogs regardless of status'
    },
    {
      key: 'published',
      label: 'Published',
      description: 'Show only published blogs'
    },
    {
      key: 'draft',
      label: 'Drafts',
      description: 'Show only draft blogs'
    }
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 mb-6">
      <div className="flex flex-wrap gap-1">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={currentFilter === filter.key ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.key)}
            className="flex items-center gap-2"
            title={filter.description}
          >
            {filter.label}
            {blogCounts && (
              <Badge 
                variant={currentFilter === filter.key ? "secondary" : "outline"}
                className="ml-1 text-xs"
              >
                {blogCounts[filter.key]}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  )
}

// Blog status badge component
interface BlogStatusBadgeProps {
  status: string
  className?: string
}

export function BlogStatusBadge({ status, className = "" }: BlogStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return {
          variant: 'default' as const,
          label: 'Published',
          className: 'bg-green-100 text-green-800 hover:bg-green-200'
        }
      case 'draft':
        return {
          variant: 'secondary' as const,
          label: 'Draft',
          className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
        }
      default:
        return {
          variant: 'outline' as const,
          label: status,
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} ${className}`}
    >
      {config.label}
    </Badge>
  )
}
