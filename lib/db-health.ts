/**
 * Database Health Check Utility
 * Provides functions to test database connectivity and handle connection issues
 */

import { prisma } from './prisma'

export interface DatabaseHealth {
  isConnected: boolean
  error?: string
  latency?: number
  timestamp: Date
}

/**
 * Test database connectivity
 */
export async function checkDatabaseHealth(): Promise<DatabaseHealth> {
  const startTime = Date.now()

  try {
    // Simple query to test connection
    await prisma.$queryRaw`SELECT 1`

    const latency = Date.now() - startTime

    return {
      isConnected: true,
      latency,
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Database health check failed:', error)

    return {
      isConnected: false,
      error: error instanceof Error ? error.message : 'Unknown database error',
      timestamp: new Date()
    }
  }
}

/**
 * Retry database connection with exponential backoff
 */
export async function retryDatabaseConnection(
  operation: () => Promise<any>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<any> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')

      if (attempt === maxRetries) {
        throw lastError
      }

      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1)
      console.log(`Database operation failed (attempt ${attempt}/${maxRetries}), retrying in ${delay}ms...`)

      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

/**
 * Safe database operation with fallback
 */
export async function safeDatabaseOperation<T>(
  operation: () => Promise<T>,
  fallback: T,
  retries: number = 2
): Promise<T> {
  try {
    return await retryDatabaseConnection(operation, retries)
  } catch (error) {
    console.error('Database operation failed after retries, using fallback:', error)
    return fallback
  }
}

/**
 * Check if error is a connection error
 */
export function isConnectionError(error: any): boolean {
  if (!error) return false

  const errorMessage = error.message?.toLowerCase() || ''
  const connectionErrors = [
    'can\'t reach database server',
    'connection refused',
    'connection timeout',
    'network error',
    'enotfound',
    'econnrefused',
    'etimedout'
  ]

  return connectionErrors.some(pattern => errorMessage.includes(pattern))
}

/**
 * Get mock data for when database is unavailable
 */
export function getMockBlogData() {
  return [
    {
      id: 1,
      title: 'How to Start a Private Limited Company in India',
      slug: 'how-to-start-private-limited-company-india',
      excerpt: 'A comprehensive guide to registering your private limited company in India with all the required documents and procedures.',
      featuredImage: null,
      author: 'StartBusiness Team',
      status: 'published',
      publishedAt: new Date(),
      metaTitle: 'How to Start a Private Limited Company in India',
      metaDescription: 'Learn the complete process of starting a private limited company in India',
      tags: 'business registration, private limited company, india'
    },
    {
      id: 2,
      title: 'GST Registration Process Made Simple',
      slug: 'gst-registration-process-simple',
      excerpt: 'Step-by-step guide to GST registration for your business with required documents and online process.',
      featuredImage: null,
      author: 'StartBusiness Team',
      status: 'published',
      publishedAt: new Date(),
      metaTitle: 'GST Registration Process Made Simple',
      metaDescription: 'Complete guide to GST registration for businesses in India',
      tags: 'gst registration, tax compliance, business'
    }
  ]
}
