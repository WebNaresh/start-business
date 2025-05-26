import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://biztreeaccounting.com' // Replace with your actual domain

    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/blog',
        '/services',
        '/privacy-policy',
        '/terms-of-service',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Service routes
    const services = [
        'private-limited-registration',
        'llp-registration',
        'gst-registration',
        'roc-compliance',
        'trademark-registration',
        'itr4-filing',
    ].map((service) => ({
        url: `${baseUrl}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...staticRoutes, ...services]
} 