import { MetadataRoute } from 'next'
import { PrismaClient } from '@prisma/client'
import services from '@/app/(pages)/services/[slug]/data/services.json'

const prisma = new PrismaClient()

// Define types for better type safety
type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
type SitemapEntry = {
    url: string
    lastModified: Date
    changeFrequency: ChangeFrequency
    priority: number
    images?: string[]
}

// Safe database operation with fallback
async function safeDatabaseOperation<T>(
    operation: () => Promise<T>,
    fallback: T
): Promise<T> {
    try {
        return await operation()
    } catch (error) {
        console.error('Database operation failed in sitemap generation:', error)
        return fallback
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.startbusiness.co.in/'
    const currentDate = new Date()

    // Helper function to create sitemap entries
    const createEntry = (
        path: string,
        changeFrequency: ChangeFrequency,
        priority: number,
        images?: string[]
    ): SitemapEntry => ({
        url: `${baseUrl}${path}`,
        lastModified: currentDate,
        changeFrequency,
        priority,
        ...(images && { images: images.map(img => `${baseUrl}${img}`) })
    })

    // Static routes with high priority
    const staticRoutes: SitemapEntry[] = [
        createEntry('', 'daily', 1, ['/logo.png']),
        createEntry('services', 'daily', 0.9, ['/hero_new_1.png', '/hero_new_2.png', '/hero_new.png']),
        createEntry('about', 'monthly', 0.8),
        createEntry('contact', 'monthly', 0.8),
        createEntry('blog', 'weekly', 0.8),
        createEntry('testimonials', 'weekly', 0.7),
        createEntry('careers', 'monthly', 0.7),
        createEntry('calculators', 'monthly', 0.8),
        createEntry('privacy-policy', 'yearly', 0.5),
        createEntry('terms-of-service', 'yearly', 0.5),
        createEntry('refund-policy', 'yearly', 0.5),
        createEntry('sitemap.xml', 'daily', 0.5),
    ]

    // Service routes from services.json with enhanced metadata
    const serviceRoutes: SitemapEntry[] = Object.entries(services).map(([slug, service]) => ({
        url: `${baseUrl}services/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: service.popular ? 0.9 : 0.8,
        images: service.icon ? [`/services/${slug}/icon.png`] : undefined
    }))

    // Calculator routes
    const calculatorRoutes: SitemapEntry[] = [
        // Tax Calculators
        'gst-calculator',
        'income-tax-calculator',
        'tds-calculator',
        'hra-calculator',
        'gratuity-calculator',
        'salary-calculator',
        'gstr-3b-interest-calculator',
        'hra-rent-receipt-calculator',

        // Financial Calculators
        'emi-calculator',
        'sip-calculator',
        'ppf-calculator',
        'fixed-deposit-calculator',
        'rd-calculator',
        'nps-calculator',
        'ssy-calculator',
        'retirement-corpus-calculator',

        // Loan Calculators
        'home-loan-calculator',
        'car-loan-calculator',
        'business-loan-calculator'
    ].map(calc => {
        const priority = ['gst-calculator', 'income-tax-calculator', 'emi-calculator', 'sip-calculator', 'home-loan-calculator', 'business-loan-calculator'].includes(calc) ? 0.7 : 0.6
        return createEntry(`calculators/${calc}`, 'monthly', priority)
    })

    // Blog category routes with enhanced metadata
    const blogCategories: SitemapEntry[] = [
        'business-setup',
        'tax-compliance',
        'intellectual-property',
        'company-law',
        'gst',
        'income-tax',
        'startup-guide',
        'compliance',
        'legal',
        'accounting'
    ].map(category => createEntry(`blog/category/${category}`, 'weekly', 0.7))

    // Blog tag routes with enhanced metadata
    const blogTags: SitemapEntry[] = [
        'business',
        'tax',
        'compliance',
        'startup',
        'gst',
        'income-tax',
        'trademark',
        'company-law',
        'accounting',
        'legal',
        'finance',
        'entrepreneurship',
        'india',
        'registration',
        'compliance'
    ].map(tag => createEntry(`blog/tag/${tag}`, 'weekly', 0.6))

    // Location-specific service routes
    const locationRoutes: SitemapEntry[] = [
        'pune',
        'mumbai',
        'bangalore',
        'delhi',
        'hyderabad',
        'chennai',
        'kolkata'
    ].flatMap(location =>
        Object.keys(services).map(service =>
            createEntry(`services/${location}/${service}`, 'weekly', 0.8)
        )
    )

    // Fetch published blog posts from database
    const blogPosts = await safeDatabaseOperation(
        async () => {
            return await prisma.blog.findMany({
                where: {
                    status: 'published'
                },
                select: {
                    slug: true,
                    updatedAt: true,
                    publishedAt: true,
                    featuredImage: true
                },
                orderBy: {
                    publishedAt: 'desc'
                }
            })
        },
        [] // Fallback to empty array if database fails
    )

    // Convert blog posts to sitemap entries
    const blogPostRoutes: SitemapEntry[] = blogPosts.map(post => ({
        url: `${baseUrl}blog/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        images: post.featuredImage ? [post.featuredImage] : undefined
    }))

    // Clean up Prisma connection
    await prisma.$disconnect()

    // Combine all routes
    return [
        ...staticRoutes,
        ...serviceRoutes,
        ...calculatorRoutes,
        ...blogCategories,
        ...blogTags,
        ...locationRoutes,
        ...blogPostRoutes
    ]
} 