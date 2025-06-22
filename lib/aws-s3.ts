/**
 * AWS S3 Configuration and Utilities
 * Handles image uploads to S3 for blog featured images
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import sharp from 'sharp'

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'startbusiness-blog-images'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// Image optimization settings
const IMAGE_OPTIMIZATION = {
  maxWidth: 1200,
  maxHeight: 800,
  quality: 85,
  format: 'webp' as const,
}

/**
 * Validate uploaded file
 */
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
    }
  }

  // Check file type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only JPEG, PNG, and WebP images are allowed'
    }
  }

  return { isValid: true }
}

/**
 * Generate unique filename for S3
 */
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split('.').pop()?.toLowerCase() || 'webp'

  return `blog-images/${timestamp}-${randomString}.${extension}`
}

/**
 * Optimize image using Sharp
 */
export async function optimizeImage(buffer: Buffer): Promise<Buffer> {
  try {
    return await sharp(buffer)
      .resize(IMAGE_OPTIMIZATION.maxWidth, IMAGE_OPTIMIZATION.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: IMAGE_OPTIMIZATION.quality })
      .toBuffer()
  } catch (error) {
    console.error('Image optimization failed:', error)
    throw new Error('Failed to optimize image')
  }
}

/**
 * Upload image to S3
 */
export async function uploadImageToS3(
  buffer: Buffer,
  filename: string,
  contentType: string = 'image/webp'
): Promise<string> {
  try {
    // For development/testing, if S3 bucket doesn't exist, save locally
    if (process.env.NODE_ENV === 'development') {
      try {
        const command = new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: filename,
          Body: buffer,
          ContentType: contentType,
          CacheControl: 'max-age=31536000', // 1 year cache
          Metadata: {
            uploadedAt: new Date().toISOString(),
            source: 'blog-admin',
          },
        })

        await s3Client.send(command)

        // Return the public URL
        return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`
      } catch (s3Error: any) {
        if (s3Error.Code === 'NoSuchBucket') {
          console.log('S3 bucket not found, using local storage for development...')

          // Save to local public directory for development
          const fs = await import('fs')
          const path = await import('path')

          const publicDir = path.join(process.cwd(), 'public', 'uploads')

          // Ensure uploads directory exists
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true })
          }

          const localFilename = filename.replace('blog-images/', '')
          const localPath = path.join(publicDir, localFilename)

          fs.writeFileSync(localPath, buffer)

          // Return local URL
          return `/uploads/${localFilename}`
        }
        throw s3Error
      }
    } else {
      // Production: Always use S3
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: buffer,
        ContentType: contentType,
        CacheControl: 'max-age=31536000', // 1 year cache
        Metadata: {
          uploadedAt: new Date().toISOString(),
          source: 'blog-admin',
        },
      })

      await s3Client.send(command)

      // Return the public URL
      return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`
    }
  } catch (error) {
    console.error('Image upload failed:', error)
    throw new Error('Failed to upload image')
  }
}

/**
 * Delete image from S3
 */
export async function deleteImageFromS3(imageUrl: string): Promise<void> {
  try {
    // Extract the key from the URL
    const url = new URL(imageUrl)
    const key = url.pathname.substring(1) // Remove leading slash

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    await s3Client.send(command)
  } catch (error) {
    console.error('S3 delete failed:', error)
    throw new Error('Failed to delete image from S3')
  }
}

/**
 * Generate presigned URL for direct upload (alternative approach)
 */
export async function generatePresignedUploadUrl(
  filename: string,
  contentType: string
): Promise<{ uploadUrl: string; imageUrl: string }> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      ContentType: contentType,
      CacheControl: 'max-age=31536000',
    })

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }) // 1 hour
    const imageUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`

    return { uploadUrl, imageUrl }
  } catch (error) {
    console.error('Failed to generate presigned URL:', error)
    throw new Error('Failed to generate upload URL')
  }
}

/**
 * Process and upload image (main function)
 */
export async function processAndUploadImage(file: File): Promise<{
  success: boolean
  imageUrl?: string
  error?: string
}> {
  try {
    // Validate file
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      return { success: false, error: validation.error }
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Optimize image
    const optimizedBuffer = await optimizeImage(buffer)

    // Generate unique filename
    const filename = generateUniqueFilename(file.name)

    // Upload to S3
    const imageUrl = await uploadImageToS3(optimizedBuffer, filename, 'image/webp')

    return { success: true, imageUrl }
  } catch (error) {
    console.error('Image processing failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * Get image metadata
 */
export async function getImageMetadata(buffer: Buffer): Promise<{
  width: number
  height: number
  format: string
  size: number
}> {
  try {
    const metadata = await sharp(buffer).metadata()
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: metadata.format || 'unknown',
      size: buffer.length,
    }
  } catch (error) {
    console.error('Failed to get image metadata:', error)
    throw new Error('Failed to analyze image')
  }
}

/**
 * Check if S3 bucket is accessible
 */
export async function testS3Connection(): Promise<boolean> {
  try {
    // Try to list objects in the bucket (just to test connection)
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: 'test-connection.txt',
      Body: 'test',
    })

    await s3Client.send(command)

    // Clean up test file
    await deleteImageFromS3(`https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/test-connection.txt`)

    return true
  } catch (error) {
    console.error('S3 connection test failed:', error)
    return false
  }
}
