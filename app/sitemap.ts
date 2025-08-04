import { MetadataRoute } from 'next'
import { generateComprehensiveSitemap, cleanupPrisma } from '@/lib/seo-utils'
import services from '@/app/(pages)/services/[slug]/data/services.json'

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
        // Only log detailed error in development, use warning in production builds
        if (process.env.NODE_ENV === 'development') {
            console.error('Database operation failed in sitemap generation:', error)
        } else {
            console.warn('Database unavailable during sitemap generation - using static routes only')
        }
        return fallback
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.startbusiness.co.in/'
    const currentDate = new Date()

    // Service routes from services.json with enhanced metadata
    const serviceRoutes: SitemapEntry[] = Object.entries(services).map(([slug, service]) => ({
        url: `${baseUrl}services/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: service.popular ? 0.9 : 0.8,
        images: service.icon ? [`/services/${slug}/icon.png`] : undefined
    }))

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
    ].map(category => ({
        url: `${baseUrl}blog/category/${category}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7
    }))

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
    ].map(tag => ({
        url: `${baseUrl}blog/tag/${tag}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.6
    }))

    // Get comprehensive sitemap including calculators
    const comprehensiveSitemap = await generateComprehensiveSitemap()

    // Clean up Prisma connection
    await cleanupPrisma()

    // Combine all routes
    return [
        ...comprehensiveSitemap,
        ...serviceRoutes,
        ...blogCategories,
        ...blogTags
    ]
} 