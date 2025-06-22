/**
 * Image Cleanup Utilities
 * Handles cleanup of uploaded images when blogs are deleted or updated
 */

import { deleteImageFromS3 } from './aws-s3'

/**
 * Check if URL is from our S3 bucket
 */
export function isS3Image(imageUrl: string): boolean {
  if (!imageUrl) return false
  
  const bucketName = process.env.AWS_S3_BUCKET || 'startbusiness-blog-images'
  const region = process.env.AWS_REGION || 'us-east-1'
  
  return imageUrl.includes(`${bucketName}.s3.${region}.amazonaws.com`)
}

/**
 * Extract S3 key from image URL
 */
export function extractS3Key(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl)
    return url.pathname.substring(1) // Remove leading slash
  } catch {
    return null
  }
}

/**
 * Clean up old featured image when updating blog
 */
export async function cleanupOldFeaturedImage(
  oldImageUrl: string | null | undefined,
  newImageUrl: string | null | undefined
): Promise<void> {
  // Only cleanup if we have an old image and it's different from the new one
  if (!oldImageUrl || oldImageUrl === newImageUrl) {
    return
  }

  // Only cleanup S3 images (not external URLs)
  if (isS3Image(oldImageUrl)) {
    try {
      await deleteImageFromS3(oldImageUrl)
      console.log('Cleaned up old featured image:', oldImageUrl)
    } catch (error) {
      console.error('Failed to cleanup old featured image:', error)
      // Don't throw error - this is cleanup, not critical
    }
  }
}

/**
 * Clean up all images associated with a blog post
 */
export async function cleanupBlogImages(blog: {
  featuredImage?: string | null
  content?: string | null
}): Promise<void> {
  const imagesToCleanup: string[] = []

  // Add featured image if it's from S3
  if (blog.featuredImage && isS3Image(blog.featuredImage)) {
    imagesToCleanup.push(blog.featuredImage)
  }

  // Extract images from content (if any)
  if (blog.content) {
    const imageUrls = extractImagesFromContent(blog.content)
    imagesToCleanup.push(...imageUrls.filter(isS3Image))
  }

  // Clean up all images
  const cleanupPromises = imagesToCleanup.map(async (imageUrl) => {
    try {
      await deleteImageFromS3(imageUrl)
      console.log('Cleaned up image:', imageUrl)
    } catch (error) {
      console.error('Failed to cleanup image:', imageUrl, error)
    }
  })

  await Promise.allSettled(cleanupPromises)
}

/**
 * Extract image URLs from blog content
 */
export function extractImagesFromContent(content: string): string[] {
  const imageUrls: string[] = []

  try {
    // Try to parse as EditorJS JSON first
    const editorData = JSON.parse(content)
    if (editorData.blocks) {
      editorData.blocks.forEach((block: any) => {
        if (block.type === 'image' && block.data?.file?.url) {
          imageUrls.push(block.data.file.url)
        }
      })
    }
  } catch {
    // If not JSON, parse as HTML
    const imgRegex = /<img[^>]+src="([^">]+)"/g
    let match
    while ((match = imgRegex.exec(content)) !== null) {
      imageUrls.push(match[1])
    }
  }

  return imageUrls
}

/**
 * Validate image URL format
 */
export function validateImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return ['http:', 'https:'].includes(parsedUrl.protocol)
  } catch {
    return false
  }
}

/**
 * Get image file size from URL (for S3 images)
 */
export async function getImageSize(imageUrl: string): Promise<number | null> {
  if (!isS3Image(imageUrl)) {
    return null
  }

  try {
    const response = await fetch(imageUrl, { method: 'HEAD' })
    const contentLength = response.headers.get('content-length')
    return contentLength ? parseInt(contentLength, 10) : null
  } catch {
    return null
  }
}

/**
 * Generate image metadata for storage
 */
export function generateImageMetadata(originalName: string, size: number): {
  originalName: string
  size: number
  uploadedAt: string
  source: string
} {
  return {
    originalName,
    size,
    uploadedAt: new Date().toISOString(),
    source: 'blog-admin',
  }
}

/**
 * Batch cleanup multiple images
 */
export async function batchCleanupImages(imageUrls: string[]): Promise<{
  success: string[]
  failed: string[]
}> {
  const success: string[] = []
  const failed: string[] = []

  const cleanupPromises = imageUrls
    .filter(isS3Image)
    .map(async (imageUrl) => {
      try {
        await deleteImageFromS3(imageUrl)
        success.push(imageUrl)
      } catch (error) {
        console.error('Failed to cleanup image:', imageUrl, error)
        failed.push(imageUrl)
      }
    })

  await Promise.allSettled(cleanupPromises)

  return { success, failed }
}
