/**
 * Image Upload API Route
 * Handles file uploads for blog featured images
 */

import { NextRequest, NextResponse } from 'next/server'
import { processAndUploadImage, validateImageFile } from '@/lib/aws-s3'

export async function POST(request: NextRequest) {
  try {
    // Check if the request contains form data
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Process and upload image
    const result = await processAndUploadImage(file)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Upload failed' },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json({
      success: true,
      imageUrl: result.imageUrl,
      message: 'Image uploaded successfully',
    })

  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
