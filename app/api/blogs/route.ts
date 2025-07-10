import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { safeDatabaseOperation, getMockBlogData, isConnectionError } from '@/lib/db-health'
import { generateSlug } from '@/lib/utils'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '10')
        const offset = parseInt(searchParams.get('offset') || '0')
        const status = searchParams.get('status') || 'published'

        // Build where clause based on status filter
        const whereClause = status === 'all' ? {} : { status: status }

        // Use safe database operation with fallback
        const blogs = await safeDatabaseOperation(
            async () => {
                return await prisma.blog.findMany({
                    where: whereClause,
                    orderBy: [
                        { status: 'asc' }, // Show drafts first, then published
                        { publishedAt: 'desc' },
                        { updatedAt: 'desc' }
                    ],
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        excerpt: true,
                        featuredImage: true,
                        author: true,
                        publishedAt: true,
                        status: true,
                        metaTitle: true,
                        metaDescription: true,
                        tags: true
                        // Exclude heavy fields like content and editorData for list view
                    },
                    take: limit,
                    skip: offset
                })
            },
            getMockBlogData().slice(offset, offset + limit) // Fallback data
        )

        // Add cache headers for better performance
        return NextResponse.json(blogs, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
                'CDN-Cache-Control': 'public, s-maxage=300',
                'Vercel-CDN-Cache-Control': 'public, s-maxage=300'
            }
        })
    } catch (error) {
        console.error('Error fetching blogs:', error)
        return NextResponse.json(
            { error: 'Failed to fetch blogs', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Validate required fields
        if (!body.title || !body.author || !body.editorData) {
            return NextResponse.json(
                { error: 'Title, author, and editorData are required' },
                { status: 400 }
            )
        }

        // Generate slug if not provided
        const slug = body.slug || generateSlug(body.title)

        // Check if slug already exists
        const existingBlog = await prisma.blog.findUnique({
            where: { slug }
        })

        if (existingBlog) {
            return NextResponse.json(
                { error: 'A blog with this slug already exists' },
                { status: 409 }
            )
        }

        // Prepare data for creation - EditorJS JSON only (no HTML content)
        const blogData = {
            title: body.title,
            slug: slug,
            content: null, // Explicitly set as null since it's optional now
            editorData: body.editorData, // Required EditorJS JSON
            excerpt: body.excerpt || '',
            featuredImage: body.featuredImage || null,
            author: body.author,
            status: body.status || 'draft',
            metaTitle: body.metaTitle || body.title,
            metaDescription: body.metaDescription || body.excerpt || '',
            tags: typeof body.tags === 'string' ? body.tags : (Array.isArray(body.tags) ? body.tags.join(',') : ''),
            publishedAt: body.status === 'published' ? new Date() : null
        }

        const newBlog = await prisma.blog.create({
            data: blogData as any // Type assertion to handle schema transition
        })

        return NextResponse.json(newBlog, {
            status: 201,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        })
    } catch (error) {
        console.error('Error creating blog:', error)
        return NextResponse.json(
            {
                error: 'Failed to create blog',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}