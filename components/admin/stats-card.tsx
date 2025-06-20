import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: string
    isPositive: boolean
  }
  gradient: string
  iconColor: string
  className?: string
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  gradient,
  iconColor,
  className = ''
}: StatsCardProps) {
  return (
    <Card className={`${gradient} border-opacity-50 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
            <p className="text-2xl font-bold mb-1">{value}</p>
            {description && (
              <p className="text-xs opacity-75">{description}</p>
            )}
            {trend && (
              <div className={`flex items-center text-xs mt-2 ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className={`mr-1 ${trend.isPositive ? '↗' : '↘'}`}>
                  {trend.isPositive ? '↗' : '↘'}
                </span>
                {trend.value}
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${iconColor.replace('text-', 'bg-').replace('-600', '-100')}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Preset configurations for common use cases
export const statsCardPresets = {
  primary: {
    gradient: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    iconColor: 'text-blue-600'
  },
  success: {
    gradient: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    iconColor: 'text-green-600'
  },
  warning: {
    gradient: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200',
    iconColor: 'text-orange-600'
  },
  danger: {
    gradient: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200',
    iconColor: 'text-red-600'
  },
  purple: {
    gradient: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
    iconColor: 'text-purple-600'
  },
  indigo: {
    gradient: 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200',
    iconColor: 'text-indigo-600'
  }
}
