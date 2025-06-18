/**
 * Image upload utilities for the blog editor
 */

export interface UploadedImage {
  url: string
  filename: string
  size: number
}

/**
 * Simulates image upload - in a real app, this would upload to a cloud service
 * For now, we'll create object URLs for local preview
 */
export async function uploadImage(file: File): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file'))
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      reject(new Error('Image size must be less than 5MB'))
      return
    }

    // Create object URL for preview
    const url = URL.createObjectURL(file)
    
    // Simulate upload delay
    setTimeout(() => {
      resolve({
        url,
        filename: file.name,
        size: file.size
      })
    }, 500)
  })
}

/**
 * Validates image URL
 */
export function isValidImageUrl(url: string): boolean {
  try {
    new URL(url)
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)
  } catch {
    return false
  }
}

/**
 * Formats file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Creates a file input element for image selection
 */
export function createImageInput(
  onSelect: (file: File) => void,
  accept: string = 'image/*'
): HTMLInputElement {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = accept
  input.style.display = 'none'
  
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      onSelect(file)
    }
  }
  
  return input
}
