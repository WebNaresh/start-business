import { NextRequest, NextResponse } from 'next/server'

// Types for API responses
interface CompanySearchResult {
  value: string // CIN or LLPIN
  label: string // Company name
}

interface CompanyDetails {
  cin?: string
  llpin?: string
  companyName: string
  status?: string
  registrationDate?: string
  authorizedCapital?: string
  paidUpCapital?: string
  companyCategory?: string
  companySubCategory?: string
  classOfCompany?: string
  registeredAddress?: string
}

interface ApiResponse {
  success: boolean
  data?: CompanySearchResult[] | CompanyDetails
  message?: string
  error?: string
}

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 30 // 30 requests per minute

  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return 'unknown'
}

function validateSearchQuery(query: string): { isValid: boolean; type: 'name' | 'cin' | 'llpin' | null } {
  if (!query || query.trim().length < 2) {
    return { isValid: false, type: null }
  }

  const trimmedQuery = query.trim().toUpperCase()

  // CIN format: L/U + 5 digits + 2 letters + 4 digits + 3 letters + 6 digits
  const cinPattern = /^[LU]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/
  if (cinPattern.test(trimmedQuery)) {
    return { isValid: true, type: 'cin' }
  }

  // LLPIN format: 3 letters + 4 digits + 1 letter + 4 digits + 3 letters + 6 digits
  const llpinPattern = /^[A-Z]{3}\d{4}[A-Z]\d{4}[A-Z]{3}\d{6}$/
  if (llpinPattern.test(trimmedQuery)) {
    return { isValid: true, type: 'llpin' }
  }

  // Company name search
  if (trimmedQuery.length >= 2) {
    return { isValid: true, type: 'name' }
  }

  return { isValid: false, type: null }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { query } = body

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      )
    }

    const validation = validateSearchQuery(query)
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid search query. Please enter a company name, CIN, or LLPIN.' },
        { status: 400 }
      )
    }

    // Get API key from environment
    const apiKey = process.env.NAME_SEARCH_API
    if (!apiKey) {
      console.error('NAME_SEARCH_API environment variable not set')
      return NextResponse.json(
        { success: false, error: 'Service temporarily unavailable' },
        { status: 500 }
      )
    }

    // Prepare API request
    const apiUrl = 'https://www.falconebiz.com/api/search_company'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': apiKey,
      'Company': query.trim(),
      'Domain': process.env.NEXT_PUBLIC_DOMAIN || 'startbusiness.co.in'
    }

    console.log('Making API request to Falconebiz:', { query: query.trim(), type: validation.type })

    // Make API request with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({ company: query.trim() })
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error('Falconebiz API error:', response.status, response.statusText)
      return NextResponse.json(
        { success: false, error: 'Failed to search company data. Please try again.' },
        { status: 500 }
      )
    }

    const data = await response.json()
    console.log('Falconebiz API response:', data)

    // Process and return the response
    const apiResponse: ApiResponse = {
      success: true,
      data: data,
      message: validation.type === 'name' ? 'Company search results' : 'Company details found'
    }

    return NextResponse.json(apiResponse)

  } catch (error) {
    console.error('Company search API error:', error)

    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, error: 'Request timeout. Please try again.' },
        { status: 408 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed. Use POST request.' },
    { status: 405 }
  )
}
