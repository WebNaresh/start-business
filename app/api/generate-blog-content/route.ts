/**
 * AI Blog Content Generation API
 * Uses OpenAI to generate comprehensive blog content for StartBusiness website
 */

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Helper function to generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .substring(0, 60) // Limit length
}

// Helper function to truncate text to specific length
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { prompt, businessFocus = 'general business' } = await request.json()

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content prompt is required' },
        { status: 400 }
      )
    }

    console.log('Generating blog content for prompt:', prompt)

    // Create comprehensive prompt for OpenAI
    const systemPrompt = `You are an expert business content writer for StartBusiness, a company that helps entrepreneurs with business registration, compliance, and growth.

Generate comprehensive blog content that is:
- Professional and authoritative
- SEO-optimized with relevant keywords
- Focused on business registration, compliance, entrepreneurship, and business growth
- Structured with proper HTML formatting using semantic tags
- Informative and actionable for business owners
- Between 800-1200 words

IMPORTANT: Structure the content with proper HTML tags and ensure all content is plain text within HTML tags:
- Use <h2> for main sections
- Use <h3> for subsections
- Use <p> for paragraphs
- Use <ul> and <li> for bullet points
- Use <ol> and <li> for numbered lists
- Use <strong> for emphasis
- Use <blockquote> for important quotes or tips
- NEVER include objects, arrays, or complex data structures in the content
- ALL content must be readable plain text within HTML tags
- Do NOT use placeholders like [object Object] or similar

Return your response as a valid JSON object with these exact fields:
{
  "title": "SEO-optimized blog title (50-60 characters)",
  "content": "Full HTML blog content with proper semantic structure (h2, h3, p, ul, ol, li tags) - MUST be plain text only",
  "excerpt": "Compelling 2-3 sentence summary",
  "metaTitle": "SEO meta title (50-60 characters)",
  "metaDescription": "SEO meta description (150-160 characters)",
  "tags": "comma-separated relevant tags",
  "slug": "url-friendly-slug"
}`

    const userPrompt = `Create a comprehensive blog post about: ${prompt}

Focus on business-related aspects and include:
- Practical advice for entrepreneurs
- Relevant business registration or compliance information
- Actionable steps readers can take
- Professional insights and best practices

Business focus area: ${businessFocus}

Make sure the content is valuable for business owners and entrepreneurs visiting the StartBusiness website.`

    // Generate content using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    })

    const generatedContent = completion.choices[0]?.message?.content

    if (!generatedContent) {
      throw new Error('No content generated from OpenAI')
    }

    // Parse the JSON response from OpenAI
    let parsedContent
    try {
      parsedContent = JSON.parse(generatedContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError)
      throw new Error('Invalid response format from AI')
    }

    // Validate required fields
    const requiredFields = ['title', 'content', 'excerpt', 'metaTitle', 'metaDescription', 'tags']
    for (const field of requiredFields) {
      if (!parsedContent[field]) {
        throw new Error(`Missing required field: ${field}`)
      }
    }

    // Generate slug if not provided or invalid
    if (!parsedContent.slug) {
      parsedContent.slug = generateSlug(parsedContent.title)
    }

    // Clean and validate content to prevent [object Object] issues
    const cleanContent = (content: string): string => {
      if (typeof content !== 'string') {
        console.warn('Content is not a string, converting:', typeof content)
        content = String(content)
      }

      // Remove any [object Object] occurrences
      content = content.replace(/\[object Object\]/g, '')

      // Remove any remaining object references
      content = content.replace(/\[object [^\]]+\]/g, '')

      // Clean up extra whitespace
      content = content.replace(/\s+/g, ' ').trim()

      return content
    }

    // Ensure proper length limits and clean content
    const processedContent = {
      title: truncateText(cleanContent(parsedContent.title), 100),
      content: cleanContent(parsedContent.content),
      excerpt: truncateText(cleanContent(parsedContent.excerpt), 300),
      metaTitle: truncateText(cleanContent(parsedContent.metaTitle), 60),
      metaDescription: truncateText(cleanContent(parsedContent.metaDescription), 160),
      tags: cleanContent(parsedContent.tags),
      slug: generateSlug(parsedContent.title)
    }

    // Validate that content doesn't contain object references
    if (processedContent.content.includes('[object') || processedContent.content.includes('undefined')) {
      console.error('Content contains object references:', processedContent.content.substring(0, 200))
      throw new Error('Generated content contains invalid object references')
    }

    console.log('Successfully generated blog content:', {
      title: processedContent.title,
      contentLength: processedContent.content.length,
      slug: processedContent.slug
    })

    return NextResponse.json({
      success: true,
      content: processedContent,
      usage: {
        promptTokens: completion.usage?.prompt_tokens || 0,
        completionTokens: completion.usage?.completion_tokens || 0,
        totalTokens: completion.usage?.total_tokens || 0
      }
    })

  } catch (error) {
    console.error('Blog content generation error:', error)

    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'OpenAI API configuration error' },
          { status: 500 }
        )
      }

      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'AI service temporarily unavailable. Please try again in a moment.' },
          { status: 429 }
        )
      }

      if (error.message.includes('Invalid response format')) {
        return NextResponse.json(
          { error: 'AI generated invalid content format. Please try again.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate blog content. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
