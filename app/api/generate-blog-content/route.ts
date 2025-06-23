/**
 * AI Blog Content Generation API
 * Uses Google Gemini to generate comprehensive blog content for StartBusiness website
 */

import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { editorDataToHtml } from '@/lib/editor-utils'

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || '')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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
    const {
      prompt,
      businessFocus = 'general business',
      contentLength = 'medium',
      targetCharacters = 2000
    } = await request.json()

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content prompt is required' },
        { status: 400 }
      )
    }

    console.log('Generating blog content for prompt:', prompt)
    console.log('Target length:', targetCharacters, 'characters')

    // Determine content length description
    const getLengthDescription = (chars: number) => {
      if (chars <= 1200) return 'concise and focused (800-1200 characters)'
      if (chars <= 2500) return 'standard length (1500-2500 characters)'
      if (chars <= 4500) return 'comprehensive (3000-4500 characters)'
      if (chars <= 7000) return 'in-depth and detailed (5000-7000 characters)'
      return 'extensive and thorough'
    }

    const lengthDescription = getLengthDescription(targetCharacters)

    // Create comprehensive prompt for Gemini
    const fullPrompt = `You are an expert business content writer for StartBusiness, a company that helps entrepreneurs with business registration, compliance, and growth.

Create a comprehensive blog post about: ${prompt}

Generate blog content that is:
- Professional and authoritative
- SEO-optimized with relevant keywords
- Focused on business registration, compliance, entrepreneurship, and business growth
- Structured with proper HTML formatting using semantic tags
- Informative and actionable for business owners
- EXACTLY ${targetCharacters} characters in length (${lengthDescription})
- Content should be ${lengthDescription} to match the requested length

IMPORTANT: Generate content in EditorJS JSON format directly:

EditorJS Block Types to Use:
- "header" blocks for headings (level 2 or 3)
- "paragraph" blocks for regular text
- "list" blocks for bullet points (style: "unordered") or numbered lists (style: "ordered")
- "quote" blocks for important quotes or tips

EditorJS List Block Format:
{
  "type": "list",
  "data": {
    "style": "unordered", // or "ordered"
    "items": ["First item", "Second item", "Third item"]
  }
}

CONTENT GUIDELINES:
- Use lists where appropriate for: requirements, steps, benefits, features, documents needed, etc.
- Create well-structured, valuable content for business owners
- Each block should contain meaningful, readable content
- Do NOT use placeholders like [object Object] or similar

EXAMPLE LIST FORMAT:
<ul>
<li>First requirement with detailed explanation</li>
<li>Second requirement with detailed explanation</li>
<li>Third requirement with detailed explanation</li>
<li>Fourth requirement with detailed explanation</li>
</ul>

SUGGESTED CONTENT STRUCTURE:
Consider including sections like:
- Introduction explaining the topic
- Requirements or prerequisites (use lists if appropriate)
- Step-by-step process or methodology (use ordered lists if helpful)
- Benefits or advantages (use lists if suitable)
- Conclusion or summary

Use your judgment to create valuable, well-structured content that serves the reader.

Focus on business-related aspects and include:
- Practical advice for entrepreneurs
- Relevant business registration or compliance information
- Actionable steps readers can take
- Professional insights and best practices

Business focus area: ${businessFocus}

Return your response as a valid JSON object with these exact fields:
    {
      "title": "SEO-optimized blog title (50-60 characters)",
      "editorData": {
        "time": 1234567890,
        "blocks": [
          {
            "id": "unique-id-1",
            "type": "header",
            "data": {"text": "Your Heading", "level": 2}
          },
          {
            "id": "unique-id-2",
            "type": "paragraph",
            "data": {"text": "Your paragraph content"}
          },
          {
            "id": "unique-id-3",
            "type": "list",
            "data": {"style": "unordered", "items": ["Item 1", "Item 2", "Item 3"]}
          }
        ],
        "version": "2.28.2"
      },
      "excerpt": "Compelling 2-3 sentence summary",
      "metaTitle": "SEO meta title (50-60 characters)",
      "metaDescription": "SEO meta description (150-160 characters)",
      "tags": "comma-separated relevant tags",
      "slug": "url-friendly-slug"
    }

Make sure the content is valuable for business owners and entrepreneurs visiting the StartBusiness website.`

    // Generate content using Gemini
    const result = await model.generateContent(fullPrompt)
    const response = result.response
    const generatedContent = response.text()

    if (!generatedContent) {
      throw new Error('No content generated from Gemini')
    }

    // Parse the JSON response from Gemini
    let parsedContent
    try {
      // Clean the response to extract JSON - handle various markdown formats
      let cleanedContent = generatedContent
        .replace(/```json\s*/g, '') // Remove ```json with any whitespace
        .replace(/```\s*/g, '') // Remove closing ``` with any whitespace
        .trim()

      // If it still starts with 'json', remove that too
      if (cleanedContent.startsWith('json')) {
        cleanedContent = cleanedContent.substring(4).trim()
      }

      // Find the JSON object boundaries
      const jsonStart = cleanedContent.indexOf('{')
      const jsonEnd = cleanedContent.lastIndexOf('}')

      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        cleanedContent = cleanedContent.substring(jsonStart, jsonEnd + 1)
      }

      console.log('Cleaned content for parsing:', cleanedContent.substring(0, 200) + '...')
      parsedContent = JSON.parse(cleanedContent)
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError)
      console.error('Raw response:', generatedContent.substring(0, 500))
      throw new Error('Invalid response format from AI')
    }

    // Validate required fields
    const requiredFields = ['title', 'editorData', 'excerpt', 'metaTitle', 'metaDescription', 'tags']
    for (const field of requiredFields) {
      if (!parsedContent[field]) {
        throw new Error(`Missing required field: ${field} `)
      }
    }

    // Validate EditorJS data structure
    if (!parsedContent.editorData.blocks || !Array.isArray(parsedContent.editorData.blocks)) {
      throw new Error('Invalid EditorJS data structure - missing blocks array')
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

      // Remove full HTML document structure if present
      content = content.replace(/<!DOCTYPE[^>]*>/gi, '')
      content = content.replace(/<html[^>]*>/gi, '')
      content = content.replace(/<\/html>/gi, '')
      content = content.replace(/<head[^>]*>.*?<\/head>/gis, '')
      content = content.replace(/<body[^>]*>/gi, '')
      content = content.replace(/<\/body>/gi, '')
      content = content.replace(/<meta[^>]*>/gi, '')

      // Clean up extra whitespace
      content = content.replace(/\s+/g, ' ').trim()

      return content
    }

    // Store only EditorJS JSON - no HTML conversion during save
    const processedContent = {
      title: truncateText(cleanContent(parsedContent.title), 100),
      editorData: JSON.stringify(parsedContent.editorData), // ONLY EditorJS JSON
      excerpt: truncateText(cleanContent(parsedContent.excerpt), 300),
      metaTitle: truncateText(cleanContent(parsedContent.metaTitle), 60),
      metaDescription: truncateText(cleanContent(parsedContent.metaDescription), 160),
      tags: cleanContent(parsedContent.tags),
      slug: generateSlug(parsedContent.title)
    }

    // No content cleaning needed - we're storing pure EditorJS JSON

    // Analyze EditorJS data for debugging (no validation, just logging)
    const editorDataObj = JSON.parse(processedContent.editorData)
    const blocks = editorDataObj.blocks || []

    const listBlocks = blocks.filter((block: any) => block.type === 'list')
    const headerBlocks = blocks.filter((block: any) => block.type === 'header')
    const paragraphBlocks = blocks.filter((block: any) => block.type === 'paragraph')

    const totalListItems = listBlocks.reduce((total: number, block: any) => {
      return total + (block.data?.items?.length || 0)
    }, 0)

    console.log('EditorJS Content Analysis:', {
      totalBlocks: blocks.length,
      listBlocks: listBlocks.length,
      headerBlocks: headerBlocks.length,
      paragraphBlocks: paragraphBlocks.length,
      totalListItems: totalListItems,
      editorDataLength: processedContent.editorData.length
    })

    // Accept all content - no validation or rejection

    console.log('Successfully generated blog content:', {
      title: processedContent.title,
      slug: processedContent.slug,
      editorDataLength: processedContent.editorData.length,
      blocksGenerated: editorDataObj.blocks.length,
      listBlocksGenerated: listBlocks.length,
      totalListItems: totalListItems
    })

    // Log EditorJS data structure for debugging
    console.log('EditorJS Data Structure:')
    console.log(JSON.stringify(editorDataObj, null, 2))

    return NextResponse.json({
      success: true,
      content: processedContent,
      usage: {
        promptTokens: result.response.usageMetadata?.promptTokenCount || 0,
        completionTokens: result.response.usageMetadata?.candidatesTokenCount || 0,
        totalTokens: result.response.usageMetadata?.totalTokenCount || 0
      }
    })

  } catch (error) {
    console.error('Blog content generation error:', error)

    // Handle specific Gemini errors
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('API_KEY')) {
        return NextResponse.json(
          { error: 'Gemini API configuration error' },
          { status: 500 }
        )
      }

      if (error.message.includes('quota') || error.message.includes('rate limit')) {
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
