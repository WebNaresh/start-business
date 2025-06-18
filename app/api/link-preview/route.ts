import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    )
  }

  try {
    // Validate URL
    new URL(url)
    
    // Fetch the page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreview/1.0)'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch URL')
    }

    const html = await response.text()
    
    // Extract meta information using regex (basic implementation)
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
                            html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i)
    const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i)

    const meta = {
      success: 1,
      meta: {
        title: titleMatch ? titleMatch[1].trim() : url,
        description: descriptionMatch ? descriptionMatch[1].trim() : '',
        image: imageMatch ? {
          url: imageMatch[1].trim()
        } : undefined
      }
    }

    return NextResponse.json(meta)
  } catch (error) {
    console.error('Link preview error:', error)
    return NextResponse.json(
      { 
        success: 0,
        error: 'Failed to fetch link preview' 
      },
      { status: 500 }
    )
  }
}
