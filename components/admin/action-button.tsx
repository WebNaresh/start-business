import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ActionButtonProps {
  label: string
  icon?: LucideIcon
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
  fullWidth?: boolean
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white',
  secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white',
  success: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white',
  warning: 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white',
  danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white',
  outline: 'border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50'
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
}

export default function ActionButton({
  label,
  icon: Icon,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false
}: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'font-medium transition-all duration-200 shadow-sm hover:shadow-md',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Loading...
        </div>
      ) : (
        <div className="flex items-center">
          {Icon && <Icon className={cn('mr-2', size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />}
          {label}
        </div>
      )}
    </Button>
  )
}

// Preset action buttons for common use cases
export const ActionButtonPresets = {
  Create: ({ onClick, loading = false }: { onClick: () => void; loading?: boolean }) => (
    <ActionButton
      label={loading ? 'Creating...' : 'Create'}
      variant="primary"
      onClick={onClick}
      loading={loading}
    />
  ),
  
  Save: ({ onClick, loading = false }: { onClick: () => void; loading?: boolean }) => (
    <ActionButton
      label={loading ? 'Saving...' : 'Save'}
      variant="success"
      onClick={onClick}
      loading={loading}
    />
  ),
  
  Delete: ({ onClick, loading = false }: { onClick: () => void; loading?: boolean }) => (
    <ActionButton
      label={loading ? 'Deleting...' : 'Delete'}
      variant="danger"
      onClick={onClick}
      loading={loading}
    />
  ),
  
  Cancel: ({ onClick }: { onClick: () => void }) => (
    <ActionButton
      label="Cancel"
      variant="outline"
      onClick={onClick}
    />
  ),
  
  Edit: ({ onClick }: { onClick: () => void }) => (
    <ActionButton
      label="Edit"
      variant="secondary"
      onClick={onClick}
    />
  )
}
