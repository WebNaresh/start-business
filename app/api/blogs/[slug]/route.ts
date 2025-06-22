import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const resolvedParams = await params

        // Optimized query with selective fields and caching
        const blog = await prisma.blog.findUnique({
            where: {
                slug: resolvedParams.slug
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

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            )
        }

        // Add aggressive caching for individual blog posts
        return NextResponse.json(blog, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'CDN-Cache-Control': 'public, s-maxage=3600',
                'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
                'ETag': `"${blog.slug}-${blog.updatedAt.getTime()}"`
            }
        })
    } catch (error) {
        console.error('Error fetching blog:', error)
        return NextResponse.json(
            { error: 'Failed to fetch blog' },
            { status: 500 }
        )
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const resolvedParams = await params
        const body = await req.json()

        // Get current blog to check for image changes
        const currentBlog = await prisma.blog.findUnique({
            where: { slug: resolvedParams.slug },
            select: { featuredImage: true }
        })

        const updatedBlog = await prisma.blog.update({
            where: {
                slug: resolvedParams.slug
            },
            data: {
                title: body.title,
                slug: body.slug,
                content: body.content,
                editorData: body.editorData,
                excerpt: body.excerpt,
                featuredImage: body.featuredImage,
                author: body.author,
                status: body.status,
                metaTitle: body.metaTitle,
                metaDescription: body.metaDescription,
                tags: body.tags
            }
        })

        // Note: Image cleanup removed for simplicity
        // Featured images are managed through S3 lifecycle policies

        return NextResponse.json(updatedBlog)
    } catch (error) {
        console.error('Error updating blog:', error)
        return NextResponse.json(
            { error: 'Failed to update blog' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const resolvedParams = await params

        // Note: Image cleanup removed for simplicity
        // Images are managed through S3 lifecycle policies

        await prisma.blog.delete({
            where: {
                slug: resolvedParams.slug
            }
        })

        // Note: Image cleanup handled by S3 lifecycle policies

        return NextResponse.json({ message: 'Blog deleted successfully' })
    } catch (error) {
        console.error('Error deleting blog:', error)
        return NextResponse.json(
            { error: 'Failed to delete blog' },
            { status: 500 }
        )
    }
}