/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://startbusiness.co.in',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/thank-you',
    '/notifications',
    '/_not-found'
  ],
  additionalPaths: async () => {
    const result = []

    // Add dynamic service pages
    const services = [
      'private-limited-company',
      'opc',
      'llp',
      'partnership-firm',
      'sole-proprietorship',
      'nidhi-company',
      'section-8-company',
      'producer-company',
      'gst-registration',
      'trademark-registration',
      'copyright-registration',
      'patent-registration',
      'iso-certification',
      'fssai-license',
      'import-export-code',
      'digital-signature-certificate',
      'udyam-registration',
      'startup-india-registration',
      'professional-tax-registration',
      'esi-registration',
      'pf-registration',
      'shop-establishment-license',
      'trade-license',
      'pollution-control-board',
      'fire-safety-certificate',
      'factory-license',
      'drug-license',
      'annual-compliance',
      'gst-return-filing',
      'income-tax-return',
      'tds-return-filing',
      'pf-return-filing',
      'esi-return-filing',
      'roc-compliance',
      'secretarial-audit'
    ]

    services.forEach((service) => {
      result.push({
        loc: `/services/${service}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
    })

    // Add calculator pages with high priority
    const calculators = [
      'income-tax-calculator',
      'gst-calculator',
      'emi-calculator',
      'salary-calculator',
      'hra-calculator',
      'tds-calculator',
      'ppf-calculator',
      'nps-calculator',
      'gratuity-calculator',
      'home-loan-calculator',
      'car-loan-calculator',
      'business-loan-calculator',
      'sip-calculator',
      'rd-calculator',
      'fixed-deposit-calculator',
      'retirement-corpus-calculator',
      'ssy-calculator',
      'gstr-3b-interest-calculator',
      'hra-rent-receipt-calculator'
    ]

    calculators.forEach((calculator) => {
      result.push({
        loc: `/business-calculators/${calculator}`,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      })
    })

    // Add quiz pages
    const quizzes = [
      'business-structure-quiz',
      'itr-eligibility-quiz'
    ]

    quizzes.forEach((quiz) => {
      result.push({
        loc: `/${quiz}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
    })

    return result
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*',
          '/thank-you',
          '/notifications',
          '/_not-found',
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
        userAgent: ['AhrefsBot', 'MJ12bot', 'SemrushBot', 'DotBot', 'BLEXBot', 'MegaIndex'],
        disallow: '/',
      },
    ],
    // additionalSitemaps: [
    //   'https://startbusiness.co.in/server-sitemap-index.xml',
    // ],
  },
  transform: async (_config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.7
    let changefreq = 'weekly'

    // High priority for main pages
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    }
    
    // High priority for calculators
    if (path.includes('/business-calculators/')) {
      priority = 0.9
      changefreq = 'monthly'
    }
    
    // High priority for services
    if (path.includes('/services/')) {
      priority = 0.8
      changefreq = 'weekly'
    }
    
    // Medium priority for blog
    if (path.includes('/blog')) {
      priority = 0.6
      changefreq = 'weekly'
    }
    
    // Lower priority for static pages
    if (path.includes('/privacy-policy') || 
        path.includes('/terms-of-service') || 
        path.includes('/refund-policy')) {
      priority = 0.3
      changefreq = 'yearly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}
