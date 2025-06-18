import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const resolvedParams = await params
        const blog = await prisma.blog.findUnique({
            where: {
                slug: resolvedParams.slug
            }
        })

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            )
        }

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
        await prisma.blog.delete({
            where: {
                slug: resolvedParams.slug
            }
        })
        return NextResponse.json({ message: 'Blog deleted successfully' })
    } catch (error) {
        console.error('Error deleting blog:', error)
        return NextResponse.json(
            { error: 'Failed to delete blog' },
            { status: 500 }
        )
    }
} 