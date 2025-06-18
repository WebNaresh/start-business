import { MetadataRoute } from 'next'
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

export default function sitemap(): MetadataRoute.Sitemap {
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
        'gst',
        'tds',
        'income-tax',
        'hra',
        'gratuity',
        'epf'
    ].map(calc => createEntry(`calculators/${calc}`, 'monthly', 0.7))

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

    // Combine all routes
    return [
        ...staticRoutes,
        ...serviceRoutes,
        ...calculatorRoutes,
        ...blogCategories,
        ...blogTags,
        ...locationRoutes
    ]
} 