import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        console.log('🔍 DEBUG: Starting direct database query...')
        
        // Test database connection first
        await prisma.$queryRaw`SELECT 1`
        console.log('✅ DEBUG: Database connection successful')
        
        // Get all blogs with their status
        const allBlogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                status: true,
                author: true,
                publishedAt: true,
                updatedAt: true
            },
            orderBy: [
                { status: 'asc' },
                { updatedAt: 'desc' }
            ]
        })
        
        console.log(`📊 DEBUG: Found ${allBlogs.length} total blogs in database`)
        
        // Count by status
        const statusCounts = {
            all: allBlogs.length,
            draft: allBlogs.filter(blog => blog.status === 'draft').length,
            published: allBlogs.filter(blog => blog.status === 'published').length,
            archived: allBlogs.filter(blog => blog.status === 'archived').length,
            other: allBlogs.filter(blog => !['draft', 'published', 'archived'].includes(blog.status)).length
        }
        
        console.log('📈 DEBUG: Status counts:', statusCounts)
        
        // Log each blog's details
        allBlogs.forEach(blog => {
            console.log(`📝 DEBUG: Blog "${blog.title}" - Status: "${blog.status}" - Author: "${blog.author}"`)
        })
        
        return NextResponse.json({
            success: true,
            totalBlogs: allBlogs.length,
            statusCounts,
            blogs: allBlogs,
            timestamp: new Date().toISOString()
        })
        
    } catch (error) {
        console.error('❌ DEBUG: Database query failed:', error)
        
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: 500 })
    }
}
