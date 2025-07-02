import { MetadataRoute } from 'next'

// Define the base URL - this should be your actual domain
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.startbusiness.co.in'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/admin/*',
                    '/api/',
                    '/api/*',
                    '/_next/',
                    '/_vercel/',
                    '/private/',
                    '/*.json$',
                    '/*.xml$',
                    '/*.txt$',
                    '/*.log$'
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
                crawlDelay: 1,
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
                crawlDelay: 1,
            },
            {
                userAgent: 'Slurp',
                allow: '/',
                disallow: ['/admin/', '/api/'],
                crawlDelay: 2,
            },
            {
                userAgent: 'YandexBot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
                crawlDelay: 2,
            },
            {
                userAgent: 'DuckDuckBot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
                crawlDelay: 1,
            },
            {
                userAgent: ['AhrefsBot', 'MJ12bot', 'SemrushBot', 'DotBot', 'BLEXBot', 'MegaIndex'],
                disallow: '/',
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    }
}