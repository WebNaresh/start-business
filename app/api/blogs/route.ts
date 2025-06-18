import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: {
                publishedAt: 'desc'
            },
            select: {
                id: true,
                title: true,
                slug: true,
                content: true,
                editorData: true,
                excerpt: true,
                featuredImage: true,
                author: true,
                publishedAt: true,
                updatedAt: true,
                status: true,
                metaTitle: true,
                metaDescription: true,
                tags: true
            }
        })
        return NextResponse.json(blogs)
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
        const newBlog = await prisma.blog.create({
            data: {
                title: body.title,
                slug: body.slug || generateSlug(body.title),
                content: body.content,
                editorData: body.editorData,
                excerpt: body.excerpt,
                featuredImage: body.featuredImage,
                author: body.author,
                status: body.status || 'draft',
                metaTitle: body.metaTitle,
                metaDescription: body.metaDescription,
                tags: Array.isArray(body.tags) ? body.tags.join(',') : body.tags
            }
        })
        return NextResponse.json(newBlog)
    } catch (error) {
        console.error('Error creating blog:', error)
        return NextResponse.json(
            { error: 'Failed to create blog' },
            { status: 500 }
        )
    }
}

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}