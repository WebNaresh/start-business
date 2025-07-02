// SEO Utilities for Next.js 15 Blog Website

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Define the base URL - this should be your actual domain
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.startbusiness.co.in'

// SEO-related types
export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  images?: string[]
}

// Safe database operation with fallback
export async function safeDatabaseOperation<T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    console.error('Database operation failed:', error)
    return fallback
  }
}

// Generate canonical URL
export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_URL}/${cleanPath}`.replace(/\/+$/, '') // Remove trailing slashes
}

// Generate structured data for blog posts
export function generateBlogPostStructuredData(blog: {
  title: string
  excerpt?: string
  author: string
  publishedAt: Date
  updatedAt?: Date
  featuredImage?: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'StartBusiness',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    datePublished: blog.publishedAt.toISOString(),
    dateModified: (blog.updatedAt || blog.publishedAt).toISOString(),
    image: blog.featuredImage ? `${BASE_URL}${blog.featuredImage}` : `${BASE_URL}/logo.png`,
    url: `${BASE_URL}/blog/${blog.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${blog.slug}`,
    },
  }
}

// Generate structured data for organization
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'StartBusiness',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Professional business registration and compliance services in India',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Maharashtra',
      addressLocality: 'Pune',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXXXXXXXXX',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.facebook.com/startbusiness',
      'https://www.twitter.com/startbusiness',
      'https://www.linkedin.com/company/startbusiness',
    ],
  }
}

// Generate structured data for website
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'StartBusiness',
    url: BASE_URL,
    description: 'Professional business registration and compliance services in India',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

// Get all published blog posts for sitemap
export async function getPublishedBlogPosts() {
  return await safeDatabaseOperation(
    async () => {
      return await prisma.blog.findMany({
        where: {
          status: 'published',
        },
        select: {
          slug: true,
          updatedAt: true,
          publishedAt: true,
          featuredImage: true,
          title: true,
        },
        orderBy: {
          publishedAt: 'desc',
        },
      })
    },
    []
  )
}

// Generate meta tags for blog posts
export function generateBlogMetaTags(blog: {
  title: string
  excerpt?: string
  author: string
  publishedAt: Date
  updatedAt?: Date
  featuredImage?: string
  slug: string
  tags?: string[]
}): SEOMetadata {
  const canonical = generateCanonicalUrl(`blog/${blog.slug}`)
  
  return {
    title: `${blog.title} | StartBusiness Blog`,
    description: blog.excerpt || `Read ${blog.title} on StartBusiness blog. Expert insights on business registration and compliance.`,
    keywords: blog.tags || ['business', 'startup', 'registration', 'compliance'],
    canonical,
    ogImage: blog.featuredImage || '/logo.png',
    ogType: 'article',
    publishedTime: blog.publishedAt.toISOString(),
    modifiedTime: (blog.updatedAt || blog.publishedAt).toISOString(),
    author: blog.author,
    section: 'Business',
    tags: blog.tags,
  }
}

// Generate meta tags for service pages
export function generateServiceMetaTags(service: {
  title: string
  description: string
  slug: string
}): SEOMetadata {
  const canonical = generateCanonicalUrl(`services/${service.slug}`)
  
  return {
    title: `${service.title} | StartBusiness Services`,
    description: service.description,
    keywords: ['business services', 'registration', 'compliance', service.slug],
    canonical,
    ogImage: '/logo.png',
    ogType: 'website',
  }
}

// Generate meta tags for static pages
export function generateStaticPageMetaTags(page: {
  title: string
  description: string
  path: string
}): SEOMetadata {
  const canonical = generateCanonicalUrl(page.path)
  
  return {
    title: `${page.title} | StartBusiness`,
    description: page.description,
    canonical,
    ogImage: '/logo.png',
    ogType: 'website',
  }
}

// Validate and clean URLs for sitemap
export function validateSitemapUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Generate XML sitemap string
export function generateSitemapXML(entries: SitemapEntry[]): string {
  const validEntries = entries.filter(entry => validateSitemapUrl(entry.url))
  
  const urlElements = validEntries.map(entry => {
    const imageElements = entry.images?.map(image => 
      `    <image:image>
      <image:loc>${image}</image:loc>
    </image:image>`
    ).join('\n') || ''
    
    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>${imageElements ? '\n' + imageElements : ''}
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlElements}
</urlset>`
}

// Clean up Prisma connection
export async function cleanupPrisma() {
  await prisma.$disconnect()
}
