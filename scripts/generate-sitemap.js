#!/usr/bin/env node

/**
 * Generate sitemap.xml in public folder
 * This script fetches blog posts from the database and generates a complete sitemap
 * Run with: node scripts/generate-sitemap.js
 */

const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')

// Import services data
const services = require('../app/(pages)/services/[slug]/data/services.json')

const prisma = new PrismaClient()

// Configuration
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.startbusiness.co.in'
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'sitemap.xml')

// All available calculators
const calculators = [
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
]

// Static pages configuration
const staticPages = [
  {
    url: `${BASE_URL}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1.0
  },
  {
    url: `${BASE_URL}/about-us`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: `${BASE_URL}/contact`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: `${BASE_URL}/services`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: `${BASE_URL}/blog`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.9
  },
  {
    url: `${BASE_URL}/business-calculators`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: `${BASE_URL}/privacy-policy`,
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.3
  },
  {
    url: `${BASE_URL}/terms-of-service`,
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.3
  },
  {
    url: `${BASE_URL}/refund-policy`,
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.3
  },
  {
    url: `${BASE_URL}/faq`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.5
  }
]

// Generate service URLs from services.json
function generateServiceUrls() {
  return Object.entries(services).map(([slug, service]) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: service.popular ? 0.9 : 0.8,
    images: service.icon ? [`${BASE_URL}/services/${slug}/icon.png`] : undefined
  }))
}

// Generate calculator URLs
function generateCalculatorUrls() {
  return calculators.map(calc => ({
    url: `${BASE_URL}/business-calculators/${calc}`,
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: ['gst-calculator', 'income-tax-calculator', 'emi-calculator', 'sip-calculator', 'home-loan-calculator', 'business-loan-calculator'].includes(calc) ? 0.7 : 0.6
  }))
}

// Generate XML sitemap
function generateSitemapXML(urls) {
  const urlElements = urls.map(url => {
    const imageElements = url.images?.map(image => 
      `    <image:image>
      <image:loc>${image}</image:loc>
    </image:image>`
    ).join('\n') || ''
    
    return `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${imageElements ? '\n' + imageElements : ''}
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlElements}
</urlset>`
}

// Main function
async function generateSitemap() {
  try {
    console.log('🚀 Generating sitemap.xml...')
    
    // Generate service URLs
    const serviceUrls = generateServiceUrls()
    console.log(`🏢 Generated ${serviceUrls.length} service URLs`)
    
    // Generate calculator URLs
    const calculatorUrls = generateCalculatorUrls()
    console.log(`🧮 Generated ${calculatorUrls.length} calculator URLs`)
    
    // Fetch published blog posts
    console.log('📚 Fetching blog posts from database...')
    const blogs = await prisma.blog.findMany({
      where: {
        status: 'published'
      },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
        featuredImage: true,
        title: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })

    console.log(`✅ Found ${blogs.length} published blog posts`)

    // Convert blog posts to sitemap URLs
    const blogUrls = blogs.map(blog => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastmod: (blog.updatedAt || blog.publishedAt || new Date()).toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
      images: blog.featuredImage ? [blog.featuredImage] : undefined
    }))

    // Combine all URLs
    const allUrls = [...staticPages, ...serviceUrls, ...calculatorUrls, ...blogUrls]
    console.log(`📄 Total URLs in sitemap: ${allUrls.length}`)

    // Generate sitemap XML
    const sitemapXML = generateSitemapXML(allUrls)

    // Write to public/sitemap.xml
    fs.writeFileSync(OUTPUT_PATH, sitemapXML, 'utf8')
    
    console.log(`✅ Sitemap generated successfully at: ${OUTPUT_PATH}`)
    console.log(`🌐 Sitemap includes:`)
    console.log(`   - ${staticPages.length} static pages`)
    console.log(`   - ${serviceUrls.length} service pages`)
    console.log(`   - ${calculatorUrls.length} calculator pages`)
    console.log(`   - ${blogUrls.length} blog posts`)
    console.log(`   - Total: ${allUrls.length} URLs`)

  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    
    // Generate fallback sitemap with just static pages and services
    console.log('🔄 Generating fallback sitemap...')
    const serviceUrls = generateServiceUrls()
    const calculatorUrls = generateCalculatorUrls()
    const fallbackUrls = [...staticPages, ...serviceUrls, ...calculatorUrls]
    const fallbackSitemap = generateSitemapXML(fallbackUrls)
    fs.writeFileSync(OUTPUT_PATH, fallbackSitemap, 'utf8')
    console.log(`✅ Fallback sitemap generated with ${fallbackUrls.length} URLs`)
    
    process.exit(1)
  } finally {
    // Clean up Prisma connection
    await prisma.$disconnect()
  }
}

// Run the script
if (require.main === module) {
  generateSitemap()
    .then(() => {
      console.log('🎉 Sitemap generation completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Fatal error:', error)
      process.exit(1)
    })
}

module.exports = { generateSitemap }
