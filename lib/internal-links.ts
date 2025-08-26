// Internal linking strategy for SEO optimization

export interface InternalLink {
  href: string
  title: string
  description: string
  category: 'service' | 'blog' | 'calculator' | 'legal' | 'about'
  keywords: string[]
  priority: 'high' | 'medium' | 'low'
}

export interface RelatedContent {
  title: string
  links: InternalLink[]
}

// Core service pages with SEO-optimized anchor text
export const coreServices: InternalLink[] = [
  // Company Registration Services
  {
    href: '/services/private-limited-company',
    title: 'Private Limited Company Registration',
    description: 'Complete guide to registering a Private Limited Company in India with expert assistance',
    category: 'service',
    keywords: ['private limited company', 'company registration', 'business incorporation', 'startup registration'],
    priority: 'high'
  },
  {
    href: '/services/llp-registration',
    title: 'Limited Liability Partnership (LLP) Registration',
    description: 'Professional LLP registration services for partnerships and professional services',
    category: 'service',
    keywords: ['llp registration', 'partnership firm', 'professional services', 'limited liability'],
    priority: 'high'
  },
  {
    href: '/services/opc-registration',
    title: 'One Person Company (OPC) Registration',
    description: 'Solo entrepreneur? Register your One Person Company with complete legal protection',
    category: 'service',
    keywords: ['one person company', 'opc registration', 'solo entrepreneur', 'single owner business'],
    priority: 'high'
  },
  {
    href: '/services/partnership-firm',
    title: 'Partnership Firm Registration',
    description: 'Register your partnership firm with proper legal documentation and compliance',
    category: 'service',
    keywords: ['partnership firm', 'partnership registration', 'business partnership', 'firm registration'],
    priority: 'medium'
  },
  {
    href: '/services/sole-proprietorship',
    title: 'Sole Proprietorship Registration',
    description: 'Simple business registration for individual entrepreneurs and small businesses',
    category: 'service',
    keywords: ['sole proprietorship', 'individual business', 'proprietorship registration', 'small business'],
    priority: 'medium'
  },
  {
    href: '/services/section-8-company',
    title: 'Section 8 Company Registration',
    description: 'Register a non-profit company under Section 8 for charitable and social purposes',
    category: 'service',
    keywords: ['section 8 company', 'non profit company', 'ngo registration', 'charitable company'],
    priority: 'low'
  },
  {
    href: '/services/producer-company',
    title: 'Producer Company Registration',
    description: 'Register a producer company for agricultural and farming businesses',
    category: 'service',
    keywords: ['producer company', 'agricultural company', 'farming business', 'cooperative company'],
    priority: 'low'
  },

  // Compliances Services
  {
    href: '/services/gst-registration',
    title: 'GST Registration Services',
    description: 'Complete GST registration and compliance services for your business',
    category: 'service',
    keywords: ['gst registration', 'goods and services tax', 'tax registration', 'business tax'],
    priority: 'high'
  },
  {
    href: '/services/roc-annual-compliances',
    title: 'Company Annual ROC Compliance',
    description: 'Stay compliant with all ROC requirements including annual returns and financial statements',
    category: 'service',
    keywords: ['roc compliance', 'annual compliance', 'company compliance', 'mca compliance'],
    priority: 'high'
  },
  {
    href: '/services/llp-annual-roc',
    title: 'LLP Annual ROC Compliance',
    description: 'Complete annual compliance for LLP with all ROC filings and requirements',
    category: 'service',
    keywords: ['llp compliance', 'llp annual filing', 'llp roc compliance', 'partnership compliance'],
    priority: 'medium'
  },
  {
    href: '/services/fema-compliance',
    title: 'FEMA Compliance Services',
    description: 'FDI/ODI reporting with RBI and FLA return filing services',
    category: 'service',
    keywords: ['fema compliance', 'fdi reporting', 'odi reporting', 'rbi compliance'],
    priority: 'medium'
  },
  {
    href: '/services/csr-compliance',
    title: 'CSR Compliances',
    description: 'CSR consultancy, CSR-1 and CSR-2 filing services for corporate social responsibility',
    category: 'service',
    keywords: ['csr compliance', 'corporate social responsibility', 'csr filing', 'csr consultancy'],
    priority: 'medium'
  },
  {
    href: '/services/statutory-registers',
    title: 'Maintenance of Statutory Registers',
    description: 'Maintain all mandatory statutory registers and minutes for companies',
    category: 'service',
    keywords: ['statutory registers', 'company registers', 'register maintenance', 'compliance registers'],
    priority: 'medium'
  },
  {
    href: '/services/registered-office-shifting',
    title: 'Shifting of Registered Office',
    description: 'Change registered office address with complete regulatory compliance',
    category: 'service',
    keywords: ['registered office change', 'office shifting', 'address change', 'roc filing'],
    priority: 'medium'
  },
  {
    href: '/services/dematerialisation-securities',
    title: 'Dematerialisation of Securities',
    description: 'Convert physical securities to electronic form with NSDL/CDSL compliance',
    category: 'service',
    keywords: ['dematerialisation', 'demat securities', 'electronic securities', 'nsdl cdsl'],
    priority: 'low'
  },
  {
    href: '/services/subsidiary-foreign-company',
    title: 'Subsidiary of Foreign Company',
    description: 'Establish Indian subsidiary of foreign company with complete FEMA compliance',
    category: 'service',
    keywords: ['foreign subsidiary', 'foreign company subsidiary', 'fema compliance', 'foreign investment'],
    priority: 'medium'
  },
  {
    href: '/services/annual-compliance',
    title: 'Annual Compliance Services',
    description: 'Complete annual compliance for companies including ROC filings and audits',
    category: 'service',
    keywords: ['annual compliance', 'roc filing', 'company audit', 'annual return'],
    priority: 'medium'
  },
  {
    href: '/services/tax-audit',
    title: 'Tax Audit Services',
    description: 'Professional tax audit services for businesses and individuals',
    category: 'service',
    keywords: ['tax audit', 'statutory audit', 'business audit', 'financial audit'],
    priority: 'medium'
  },

  // Legal & Intellectual Property Services
  {
    href: '/services/trademark-registration',
    title: 'Trademark Registration',
    description: 'Protect your brand with professional trademark registration services',
    category: 'service',
    keywords: ['trademark registration', 'brand protection', 'intellectual property', 'brand registration'],
    priority: 'medium'
  },
  {
    href: '/services/trademark-hearing',
    title: 'Trademark Hearing',
    description: 'Professional representation for trademark hearings and proceedings',
    category: 'service',
    keywords: ['trademark hearing', 'trademark representation', 'legal hearing', 'trademark proceedings'],
    priority: 'medium'
  },
  {
    href: '/services/trademark-rectification',
    title: 'Trademark Rectification',
    description: 'Rectify or remove conflicting trademarks from the registry',
    category: 'service',
    keywords: ['trademark rectification', 'trademark removal', 'trademark opposition', 'registry rectification'],
    priority: 'medium'
  },
  {
    href: '/services/copyright-registration',
    title: 'Copyright Registration',
    description: 'Protect your creative works and content with copyright registration',
    category: 'service',
    keywords: ['copyright registration', 'intellectual property', 'creative protection', 'content protection'],
    priority: 'medium'
  },
  {
    href: '/services/copyright-objection',
    title: 'Copyright Objection',
    description: 'Handle copyright objections and disputes professionally',
    category: 'service',
    keywords: ['copyright objection', 'copyright dispute', 'copyright legal', 'copyright response'],
    priority: 'medium'
  },
  {
    href: '/services/patent-registration',
    title: 'Patent Registration',
    description: 'Secure your inventions and innovations with patent registration services',
    category: 'service',
    keywords: ['patent registration', 'invention protection', 'innovation patent', 'intellectual property'],
    priority: 'medium'
  },
  {
    href: '/services/design-registration',
    title: 'Design Registration',
    description: 'Protect your unique designs and visual creations with design registration',
    category: 'service',
    keywords: ['design registration', 'design protection', 'visual design', 'product design'],
    priority: 'low'
  },

  // Business Setup & Licensing
  {
    href: '/services/business-license',
    title: 'Business License Registration',
    description: 'Obtain all required business licenses for your industry and location',
    category: 'service',
    keywords: ['business license', 'trade license', 'commercial license', 'business permit'],
    priority: 'medium'
  },
  {
    href: '/services/fssai-registration',
    title: 'FSSAI Food License Registration',
    description: 'Get your food business license with FSSAI registration services',
    category: 'service',
    keywords: ['fssai registration', 'food license', 'food business', 'fssai license'],
    priority: 'medium'
  },
  {
    href: '/services/import-export-code',
    title: 'Import Export Code (IEC)',
    description: 'Obtain IEC for international trade and import-export business',
    category: 'service',
    keywords: ['import export code', 'iec registration', 'international trade', 'export import'],
    priority: 'medium'
  },
  {
    href: '/services/digital-signature',
    title: 'Digital Signature Certificate',
    description: 'Get your digital signature certificate for online document signing',
    category: 'service',
    keywords: ['digital signature', 'dsc certificate', 'electronic signature', 'online signing'],
    priority: 'medium'
  },
  {
    href: '/services/msme-registration',
    title: 'MSME Registration (Udyam)',
    description: 'Register your micro, small, or medium enterprise with Udyam registration',
    category: 'service',
    keywords: ['msme registration', 'udyam registration', 'small business registration', 'msme certificate'],
    priority: 'medium'
  },
  {
    href: '/services/startup-india-registration',
    title: 'Startup India Registration',
    description: 'Register your startup with Startup India for government benefits and recognition',
    category: 'service',
    keywords: ['startup india', 'startup registration', 'startup benefits', 'government startup'],
    priority: 'medium'
  },
  {
    href: '/services/ngo-darpan',
    title: 'NGO Darpan Registration',
    description: 'Register your NGO on NITI Aayog NGO Darpan portal for government funding eligibility',
    category: 'service',
    keywords: ['ngo darpan', 'ngo registration', 'niti aayog', 'ngo funding'],
    priority: 'medium'
  },
  {
    href: '/services/gem-portal',
    title: 'GeM Portal Registration',
    description: 'Register on Government e-Marketplace to sell to government organizations',
    category: 'service',
    keywords: ['gem portal', 'government marketplace', 'government contracts', 'gem registration'],
    priority: 'medium'
  },

  // Financial & Banking Services
  {
    href: '/services/current-account-opening',
    title: 'Current Account Opening',
    description: 'Open business current account with leading banks for your company',
    category: 'service',
    keywords: ['current account', 'business account', 'bank account opening', 'company account'],
    priority: 'medium'
  },
  {
    href: '/services/business-loan',
    title: 'Business Loan Assistance',
    description: 'Get assistance with business loans and funding for your company',
    category: 'service',
    keywords: ['business loan', 'business funding', 'startup loan', 'working capital'],
    priority: 'medium'
  },

  // Compliance & Documentation
  {
    href: '/services/legal-documentation',
    title: 'Legal Documentation Services',
    description: 'Professional legal document drafting and review services',
    category: 'service',
    keywords: ['legal documentation', 'legal drafting', 'contract drafting', 'legal documents'],
    priority: 'medium'
  },
  {
    href: '/services/contract-drafting',
    title: 'Contract Drafting Services',
    description: 'Expert contract drafting and agreement preparation services',
    category: 'service',
    keywords: ['contract drafting', 'agreement drafting', 'legal contracts', 'business agreements'],
    priority: 'medium'
  },
  {
    href: '/services/moa-aoa-drafting',
    title: 'MOA & AOA Drafting',
    description: 'Professional Memorandum and Articles of Association drafting services',
    category: 'service',
    keywords: ['moa aoa drafting', 'memorandum of association', 'articles of association', 'company documents'],
    priority: 'low'
  }
]

// Calculator pages for internal linking
export const calculatorPages: InternalLink[] = [
  // Tax Calculators
  {
    href: '/business-calculators/gst-calculator',
    title: 'GST Calculator',
    description: 'Calculate GST inclusive and exclusive amounts instantly with 18% GST rate',
    category: 'calculator',
    keywords: ['gst calculator', 'tax calculator', 'goods and services tax', '18% gst'],
    priority: 'high'
  },
  {
    href: '/business-calculators/income-tax-calculator',
    title: 'Income Tax Calculator',
    description: 'Calculate your income tax liability for the current financial year with latest tax slabs',
    category: 'calculator',
    keywords: ['income tax calculator', 'tax calculator', 'salary tax', 'tax slab'],
    priority: 'high'
  },
  {
    href: '/business-calculators/tds-calculator',
    title: 'TDS Calculator',
    description: 'Calculate Tax Deducted at Source (TDS) for salary, rent, and other payments',
    category: 'calculator',
    keywords: ['tds calculator', 'tax deducted at source', 'salary tds', 'rent tds'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/advance-tax-calculator',
    title: 'Advance Tax Calculator',
    description: 'Calculate advance tax liability and payment schedule for businesses',
    category: 'calculator',
    keywords: ['advance tax calculator', 'advance tax payment', 'quarterly tax', 'business tax'],
    priority: 'medium'
  },

  // Loan & EMI Calculators
  {
    href: '/business-calculators/emi-calculator',
    title: 'EMI Calculator',
    description: 'Calculate loan EMI for home loans, personal loans, and business loans',
    category: 'calculator',
    keywords: ['emi calculator', 'loan calculator', 'home loan emi', 'personal loan emi'],
    priority: 'high'
  },
  {
    href: '/business-calculators/home-loan-calculator',
    title: 'Home Loan Calculator',
    description: 'Calculate home loan EMI, eligibility, and total interest payable',
    category: 'calculator',
    keywords: ['home loan calculator', 'home loan emi', 'housing loan', 'property loan'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/personal-loan-calculator',
    title: 'Personal Loan Calculator',
    description: 'Calculate personal loan EMI and total interest for different loan amounts',
    category: 'calculator',
    keywords: ['personal loan calculator', 'personal loan emi', 'instant loan', 'unsecured loan'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/business-loan-calculator',
    title: 'Business Loan Calculator',
    description: 'Calculate business loan EMI, eligibility, and working capital requirements',
    category: 'calculator',
    keywords: ['business loan calculator', 'business loan emi', 'working capital loan', 'msme loan'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/car-loan-calculator',
    title: 'Car Loan Calculator',
    description: 'Calculate car loan EMI and total cost of vehicle financing',
    category: 'calculator',
    keywords: ['car loan calculator', 'auto loan calculator', 'vehicle loan', 'car financing'],
    priority: 'low'
  },

  // Investment & Savings Calculators
  {
    href: '/business-calculators/sip-calculator',
    title: 'SIP Calculator',
    description: 'Calculate Systematic Investment Plan returns and wealth creation potential',
    category: 'calculator',
    keywords: ['sip calculator', 'mutual fund sip', 'systematic investment plan', 'investment calculator'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/fd-calculator',
    title: 'Fixed Deposit Calculator',
    description: 'Calculate fixed deposit maturity amount and interest earnings',
    category: 'calculator',
    keywords: ['fd calculator', 'fixed deposit calculator', 'bank fd', 'deposit calculator'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/rd-calculator',
    title: 'Recurring Deposit Calculator',
    description: 'Calculate recurring deposit maturity amount and monthly savings',
    category: 'calculator',
    keywords: ['rd calculator', 'recurring deposit calculator', 'monthly deposit', 'savings calculator'],
    priority: 'low'
  },
  {
    href: '/business-calculators/ppf-calculator',
    title: 'PPF Calculator',
    description: 'Calculate Public Provident Fund maturity amount and tax savings',
    category: 'calculator',
    keywords: ['ppf calculator', 'public provident fund', 'tax saving investment', '15 year investment'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/nsc-calculator',
    title: 'NSC Calculator',
    description: 'Calculate National Savings Certificate returns and tax benefits',
    category: 'calculator',
    keywords: ['nsc calculator', 'national savings certificate', 'tax saving bond', '5 year investment'],
    priority: 'low'
  },

  // Salary & HR Calculators
  {
    href: '/business-calculators/salary-calculator',
    title: 'Salary Calculator',
    description: 'Calculate take-home salary, CTC breakdown, and tax deductions',
    category: 'calculator',
    keywords: ['salary calculator', 'take home salary', 'ctc calculator', 'salary breakdown'],
    priority: 'high'
  },
  {
    href: '/business-calculators/hra-calculator',
    title: 'HRA Calculator',
    description: 'Calculate House Rent Allowance exemption and tax savings',
    category: 'calculator',
    keywords: ['hra calculator', 'house rent allowance', 'hra exemption', 'rent tax benefit'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/gratuity-calculator',
    title: 'Gratuity Calculator',
    description: 'Calculate gratuity amount for employees after 5 years of service',
    category: 'calculator',
    keywords: ['gratuity calculator', 'employee gratuity', 'retirement benefit', 'service gratuity'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/provident-fund-calculator',
    title: 'Provident Fund Calculator',
    description: 'Calculate EPF balance, employer contribution, and retirement corpus',
    category: 'calculator',
    keywords: ['pf calculator', 'provident fund calculator', 'epf calculator', 'retirement fund'],
    priority: 'medium'
  },

  // Business & Financial Calculators
  {
    href: '/business-calculators/compound-interest-calculator',
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest and investment growth over time',
    category: 'calculator',
    keywords: ['compound interest calculator', 'investment growth', 'compound returns', 'wealth calculator'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/simple-interest-calculator',
    title: 'Simple Interest Calculator',
    description: 'Calculate simple interest on loans and investments',
    category: 'calculator',
    keywords: ['simple interest calculator', 'loan interest', 'investment interest', 'interest calculation'],
    priority: 'low'
  },
  {
    href: '/business-calculators/margin-calculator',
    title: 'Business Margin Calculator',
    description: 'Calculate profit margin, markup, and business profitability',
    category: 'calculator',
    keywords: ['margin calculator', 'profit margin', 'business profitability', 'markup calculator'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/break-even-calculator',
    title: 'Break Even Calculator',
    description: 'Calculate break-even point for your business or product',
    category: 'calculator',
    keywords: ['break even calculator', 'business break even', 'profit analysis', 'cost analysis'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/roi-calculator',
    title: 'ROI Calculator',
    description: 'Calculate Return on Investment for business projects and investments',
    category: 'calculator',
    keywords: ['roi calculator', 'return on investment', 'investment returns', 'business roi'],
    priority: 'medium'
  },

  // Insurance Calculators
  {
    href: '/business-calculators/term-insurance-calculator',
    title: 'Term Insurance Calculator',
    description: 'Calculate term insurance coverage needed and premium costs',
    category: 'calculator',
    keywords: ['term insurance calculator', 'life insurance calculator', 'insurance coverage', 'premium calculator'],
    priority: 'medium'
  },
  {
    href: '/business-calculators/health-insurance-calculator',
    title: 'Health Insurance Calculator',
    description: 'Calculate health insurance premium and coverage requirements',
    category: 'calculator',
    keywords: ['health insurance calculator', 'medical insurance', 'health coverage', 'insurance premium'],
    priority: 'low'
  }
]

// Important informational pages
export const informationalPages: InternalLink[] = [
  {
    href: '/about-us',
    title: 'About StartBusiness',
    description: 'Learn about our mission to simplify business registration and compliance in India',
    category: 'about',
    keywords: ['about us', 'company information', 'business services'],
    priority: 'low'
  },
  {
    href: '/contact',
    title: 'Contact Us',
    description: 'Get in touch with our business experts for personalized assistance',
    category: 'about',
    keywords: ['contact us', 'business consultation', 'expert help'],
    priority: 'medium'
  },
  {
    href: '/blog',
    title: 'Business Insights Blog',
    description: 'Latest insights, tips, and guides for starting and growing your business',
    category: 'blog',
    keywords: ['business blog', 'startup tips', 'business insights'],
    priority: 'medium'
  }
]

// Get related services based on current page
export function getRelatedServices(currentPath: string): InternalLink[] {
  const allServices = [...coreServices, ...calculatorPages]

  // Remove current page from suggestions
  const otherServices = allServices.filter(service => service.href !== currentPath)

  // Logic for related services based on current page
  if (currentPath.includes('company') || currentPath.includes('registration')) {
    return otherServices.filter(service =>
      service.keywords.some(keyword =>
        ['company', 'registration', 'incorporation', 'gst', 'tax', 'business', 'startup'].includes(keyword.toLowerCase())
      )
    ).slice(0, 4)
  }

  if (currentPath.includes('tax') || currentPath.includes('itr') || currentPath.includes('gst')) {
    return otherServices.filter(service =>
      service.keywords.some(keyword =>
        ['tax', 'gst', 'calculator', 'compliance', 'filing', 'return'].includes(keyword.toLowerCase())
      )
    ).slice(0, 4)
  }

  if (currentPath.includes('calculator')) {
    return [...calculatorPages.filter(calc => calc.href !== currentPath).slice(0, 3), ...coreServices.filter(s => s.priority === 'high').slice(0, 1)]
  }

  if (currentPath.includes('trademark') || currentPath.includes('copyright') || currentPath.includes('patent')) {
    return otherServices.filter(service =>
      service.keywords.some(keyword =>
        ['intellectual property', 'brand', 'protection', 'legal', 'registration'].includes(keyword.toLowerCase())
      )
    ).slice(0, 4)
  }

  if (currentPath.includes('loan') || currentPath.includes('emi')) {
    return otherServices.filter(service =>
      service.keywords.some(keyword =>
        ['loan', 'emi', 'calculator', 'business', 'finance'].includes(keyword.toLowerCase())
      )
    ).slice(0, 4)
  }

  if (currentPath.includes('license') || currentPath.includes('fssai') || currentPath.includes('msme')) {
    return otherServices.filter(service =>
      service.keywords.some(keyword =>
        ['license', 'registration', 'business', 'compliance', 'permit'].includes(keyword.toLowerCase())
      )
    ).slice(0, 4)
  }

  // Default: return high priority services
  return otherServices.filter(service => service.priority === 'high').slice(0, 4)
}

// Get contextual links for blog content
export function getContextualLinksForContent(content: string): InternalLink[] {
  const allLinks = [...coreServices, ...calculatorPages, ...informationalPages]
  const relevantLinks: InternalLink[] = []

  const contentLower = content.toLowerCase()

  allLinks.forEach(link => {
    const matchCount = link.keywords.filter(keyword =>
      contentLower.includes(keyword.toLowerCase())
    ).length

    if (matchCount > 0) {
      relevantLinks.push(link)
    }
  })

  // Sort by relevance and priority
  return relevantLinks
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
    .slice(0, 6)
}

// Generate anchor text variations for natural linking
export function generateAnchorText(link: InternalLink, context: 'formal' | 'casual' | 'cta' = 'formal'): string {
  const variations = {
    formal: [
      link.title,
      `${link.title} services`,
      `professional ${link.title.toLowerCase()}`,
      `expert ${link.title.toLowerCase()} assistance`
    ],
    casual: [
      link.title.replace(' Services', '').replace(' Registration', ''),
      `${link.title.split(' ')[0]} ${link.title.split(' ')[1] || ''}`.trim(),
      link.keywords[0],
      `${link.keywords[0]} help`
    ],
    cta: [
      `Get ${link.title}`,
      `Start ${link.title}`,
      `Learn about ${link.title}`,
      `Explore ${link.title}`
    ]
  }

  const options = variations[context]
  return options[Math.floor(Math.random() * options.length)]
}

// Breadcrumb generation for SEO
export interface BreadcrumbItem {
  name: string
  href: string
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' }
  ]

  let currentPath = ''

  segments.forEach((segment) => {
    currentPath += `/${segment}`

    // Convert segment to readable name
    let name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Special cases for better readability
    if (name === 'Llp') name = 'LLP'
    if (name === 'Opc') name = 'OPC'
    if (name === 'Gst') name = 'GST'
    if (name === 'Itr') name = 'ITR'

    breadcrumbs.push({
      name,
      href: currentPath
    })
  })

  return breadcrumbs
}

// Topic clusters for content organization
export const topicClusters = {
  'company-registration': {
    pillarPage: '/services/private-limited-company',
    clusterPages: [
      '/services/private-limited-company',
      '/services/llp-registration',
      '/services/opc-registration',
      '/services/partnership-firm',
      '/services/sole-proprietorship',
      '/services/section-8-company',
      '/services/producer-company',
      '/blog/choosing-right-business-structure',
      '/blog/company-registration-process',
      '/blog/startup-guide'
    ]
  },
  'tax-compliance': {
    pillarPage: '/services/tax-compliance',
    clusterPages: [
      '/services/gst-registration',
      '/services/roc-annual-compliances',
      '/services/llp-annual-roc',
      '/services/fema-compliance',
      '/services/csr-compliance',
      '/services/annual-compliance',
      '/business-calculators/income-tax-calculator',
      '/business-calculators/gst-calculator',
      '/business-calculators/advance-tax-calculator',
      '/blog/compliance-guide',
      '/blog/roc-compliance-checklist'
    ]
  },
  'intellectual-property': {
    pillarPage: '/services/trademark-registration',
    clusterPages: [
      '/services/trademark-registration',
      '/services/trademark-hearing',
      '/services/trademark-rectification',
      '/services/copyright-registration',
      '/services/copyright-objection',
      '/services/patent-registration',
      '/services/design-registration',
      '/blog/intellectual-property-guide',
      '/blog/trademark-registration-process'
    ]
  },
  'business-licensing': {
    pillarPage: '/services/business-license',
    clusterPages: [
      '/services/business-license',
      '/services/fssai-registration',
      '/services/import-export-code',
      '/services/msme-registration',
      '/services/startup-india-registration',
      '/services/ngo-darpan',
      '/services/gem-portal',
      '/blog/business-license-guide',
      '/blog/fssai-registration-process'
    ]
  },
  'financial-calculators': {
    pillarPage: '/business-calculators',
    clusterPages: [
      '/business-calculators/emi-calculator',
      '/business-calculators/home-loan-calculator',
      '/business-calculators/personal-loan-calculator',
      '/business-calculators/business-loan-calculator',
      '/business-calculators/sip-calculator',
      '/business-calculators/fd-calculator',
      '/business-calculators/ppf-calculator',
      '/business-calculators/compound-interest-calculator',
      '/blog/loan-calculator-guide',
      '/blog/investment-planning'
    ]
  },
  'salary-hr-tools': {
    pillarPage: '/business-calculators/salary-calculator',
    clusterPages: [
      '/business-calculators/salary-calculator',
      '/business-calculators/hra-calculator',
      '/business-calculators/gratuity-calculator',
      '/business-calculators/provident-fund-calculator',
      '/blog/salary-structure-guide',
      '/blog/employee-benefits-guide'
    ]
  },
  'business-finance': {
    pillarPage: '/services/business-loan',
    clusterPages: [
      '/services/business-loan',
      '/services/current-account-opening',
      '/business-calculators/business-loan-calculator',
      '/business-calculators/margin-calculator',
      '/business-calculators/break-even-calculator',
      '/business-calculators/roi-calculator',
      '/blog/business-funding-guide',
      '/blog/working-capital-management'
    ]
  }
}

// Get cluster links for a given page
export function getClusterLinks(currentPath: string): InternalLink[] {
  for (const [, cluster] of Object.entries(topicClusters)) {
    if (cluster.clusterPages.includes(currentPath) || cluster.pillarPage === currentPath) {
      const allClusterPages = [cluster.pillarPage, ...cluster.clusterPages]
      return allClusterPages
        .filter(path => path !== currentPath)
        .map(path => {
          // Find the link in our predefined links or create a basic one
          const existingLink = [...coreServices, ...calculatorPages, ...informationalPages]
            .find(link => link.href === path)

          if (existingLink) return existingLink

          // Create basic link for blog posts or other pages
          return {
            href: path,
            title: path.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '',
            description: '',
            category: path.includes('/blog/') ? 'blog' as const : 'service' as const,
            keywords: [],
            priority: 'medium' as const
          }
        })
        .slice(0, 4)
    }
  }

  return []
}
