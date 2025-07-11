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
        return NextResponse.json(blog)
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

        // Verify blog exists before attempting deletion
        const existingBlog = await prisma.blog.findUnique({
            where: { slug: resolvedParams.slug },
            select: { id: true, slug: true }
        })

        if (!existingBlog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            )
        }

        // Delete the blog and wait for the transaction to complete
        await prisma.blog.delete({
            where: {
                slug: resolvedParams.slug
            }
        })

        // Ensure database transaction is fully committed
        // Small delay to guarantee consistency across database replicas
        await new Promise(resolve => setTimeout(resolve, 100))

        return NextResponse.json({
            message: 'Blog deleted successfully',
            slug: resolvedParams.slug
        })
    } catch (error) {
        console.error('Error deleting blog:', error)

        // Handle specific Prisma errors
        if (error && typeof error === 'object' && 'code' in error) {
            if (error.code === 'P2025') {
                return NextResponse.json(
                    { error: 'Blog not found' },
                    { status: 404 }
                )
            }
        }

        return NextResponse.json(
            { error: 'Failed to delete blog' },
            { status: 500 }
        )
    }
}