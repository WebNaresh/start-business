import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cleanAsterisks } from '@/lib/editor-utils'

export async function POST(req: Request) {
    try {
        const { slug } = await req.json()
        
        if (!slug) {
            return NextResponse.json(
                { error: 'Blog slug is required' },
                { status: 400 }
            )
        }

        // Get the blog
        const blog = await prisma.blog.findUnique({
            where: { slug },
            select: {
                id: true,
                slug: true,
                editorData: true,
                content: true
            }
        })

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            )
        }

        let cleanedEditorData = blog.editorData
        let hasChanges = false

        // Clean editorData if it exists
        if (blog.editorData) {
            try {
                const editorData = JSON.parse(blog.editorData)
                
                if (editorData.blocks) {
                    editorData.blocks = editorData.blocks.map((block: any) => {
                        if (block.type === 'paragraph' && block.data?.text) {
                            const originalText = block.data.text
                            const cleanedText = cleanAsterisks(originalText)
                            
                            if (originalText !== cleanedText) {
                                hasChanges = true
                                console.log('Cleaned paragraph:', { original: originalText, cleaned: cleanedText })
                            }
                            
                            return {
                                ...block,
                                data: {
                                    ...block.data,
                                    text: cleanedText
                                }
                            }
                        }
                        
                        if (block.type === 'header' && block.data?.text) {
                            const originalText = block.data.text
                            const cleanedText = cleanAsterisks(originalText)
                            
                            if (originalText !== cleanedText) {
                                hasChanges = true
                                console.log('Cleaned header:', { original: originalText, cleaned: cleanedText })
                            }
                            
                            return {
                                ...block,
                                data: {
                                    ...block.data,
                                    text: cleanedText
                                }
                            }
                        }
                        
                        if (block.type === 'list' && block.data?.items) {
                            const originalItems = block.data.items
                            const cleanedItems = originalItems.map((item: any) => {
                                if (typeof item === 'string') {
                                    const cleanedItem = cleanAsterisks(item)
                                    if (item !== cleanedItem) {
                                        hasChanges = true
                                        console.log('Cleaned list item:', { original: item, cleaned: cleanedItem })
                                    }
                                    return cleanedItem
                                }
                                return item
                            })
                            
                            return {
                                ...block,
                                data: {
                                    ...block.data,
                                    items: cleanedItems
                                }
                            }
                        }
                        
                        return block
                    })
                }
                
                cleanedEditorData = JSON.stringify(editorData)
            } catch (error) {
                console.error('Error parsing editorData:', error)
                return NextResponse.json(
                    { error: 'Invalid editorData format' },
                    { status: 400 }
                )
            }
        }

        if (!hasChanges) {
            return NextResponse.json({
                message: 'No asterisks found to clean',
                changes: 0
            })
        }

        // Update the blog with cleaned content
        const updatedBlog = await prisma.blog.update({
            where: { slug },
            data: {
                editorData: cleanedEditorData
            }
        })

        return NextResponse.json({
            message: 'Content cleaned successfully',
            changes: hasChanges ? 1 : 0,
            slug: updatedBlog.slug
        })

    } catch (error) {
        console.error('Error cleaning blog content:', error)
        return NextResponse.json(
            { error: 'Failed to clean content' },
            { status: 500 }
        )
    }
}

// Clean all blogs
export async function PUT() {
    try {
        const blogs = await prisma.blog.findMany({
            select: {
                id: true,
                slug: true,
                editorData: true
            }
        })

        let totalChanges = 0

        for (const blog of blogs) {
            if (!blog.editorData) continue

            try {
                const editorData = JSON.parse(blog.editorData)
                let hasChanges = false

                if (editorData.blocks) {
                    editorData.blocks = editorData.blocks.map((block: any) => {
                        if (block.type === 'paragraph' && block.data?.text) {
                            const originalText = block.data.text
                            const cleanedText = cleanAsterisks(originalText)
                            
                            if (originalText !== cleanedText) {
                                hasChanges = true
                            }
                            
                            return {
                                ...block,
                                data: {
                                    ...block.data,
                                    text: cleanedText
                                }
                            }
                        }
                        
                        if (block.type === 'header' && block.data?.text) {
                            const originalText = block.data.text
                            const cleanedText = cleanAsterisks(originalText)
                            
                            if (originalText !== cleanedText) {
                                hasChanges = true
                            }
                            
                            return {
                                ...block,
                                data: {
                                    ...block.data,
                                    text: cleanedText
                                }
                            }
                        }
                        
                        if (block.type === 'list' && block.data?.items) {
                            const originalItems = block.data.items
                            const cleanedItems = originalItems.map((item: any) => {
                                if (typeof item === 'string') {
                                    const cleanedItem = cleanAsterisks(item)
                                    if (item !== cleanedItem) {
                                        hasChanges = true
                                    }
                                    return cleanedItem
                                }
                                return item
                            })
                            
                            return {
                                ...block,
                                data: {
                                    ...block.data,
                                    items: cleanedItems
                                }
                            }
                        }
                        
                        return block
                    })
                }

                if (hasChanges) {
                    await prisma.blog.update({
                        where: { id: blog.id },
                        data: {
                            editorData: JSON.stringify(editorData)
                        }
                    })
                    totalChanges++
                }
            } catch (error) {
                console.error(`Error cleaning blog ${blog.slug}:`, error)
            }
        }

        return NextResponse.json({
            message: 'All blogs cleaned successfully',
            totalBlogs: blogs.length,
            blogsChanged: totalChanges
        })

    } catch (error) {
        console.error('Error cleaning all blogs:', error)
        return NextResponse.json(
            { error: 'Failed to clean all blogs' },
            { status: 500 }
        )
    }
}
