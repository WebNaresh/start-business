import { MetadataRoute } from 'next'
import services from '@/app/(pages)/services/[slug]/data/services.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.startbusiness.co.in/'

    // Static routes with high priority
    const staticRoutes = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/refund-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/sitemap.xml`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.5,
        },
    ]

    // Service routes from services.json
    const serviceRoutes = Object.keys(services).map((service) => ({
        url: `${baseUrl}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Blog category routes
    const blogCategories = [
        'business-setup',
        'tax-compliance',
        'intellectual-property',
        'company-law',
        'gst',
        'income-tax',
    ].map((category) => ({
        url: `${baseUrl}/blog/category/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Blog tag routes
    const blogTags = [
        'business',
        'tax',
        'compliance',
        'startup',
        'gst',
        'income-tax',
        'trademark',
        'company-law',
    ].map((tag) => ({
        url: `${baseUrl}/blog/tag/${tag}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [
        ...staticRoutes,
        ...serviceRoutes,
        ...blogCategories,
        ...blogTags,
    ]
} 