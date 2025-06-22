/**
 * HTML to EditorJS Converter
 * Converts HTML content to EditorJS block format for proper display
 */

import { OutputData, OutputBlockData } from '@editorjs/editorjs'

interface EditorJSBlock {
  id?: string
  type: string
  data: any
}

export function htmlToEditorJS(html: string): OutputData {
  // Clean up the HTML and remove object references
  const cleanHtml = html
    .replace(/\[object Object\]/g, '') // Remove [object Object]
    .replace(/\[object [^\]]+\]/g, '') // Remove any [object ...] patterns
    .replace(/undefined/g, '') // Remove undefined values
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\s+/g, ' ') // Clean up extra whitespace
    .trim()

  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = cleanHtml

  const blocks: EditorJSBlock[] = []
  let blockId = 1

  // Process each child element
  Array.from(tempDiv.children).forEach((element) => {
    const block = convertElementToBlock(element as HTMLElement, blockId++)
    if (block) {
      blocks.push(block)
    }
  })

  // If no blocks were created (plain text), create paragraph blocks
  if (blocks.length === 0) {
    const paragraphs = cleanHtml.split('\n\n').filter(p => p.trim())
    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim()) {
        blocks.push({
          id: `block-${index + 1}`,
          type: 'paragraph',
          data: {
            text: paragraph.trim()
          }
        })
      }
    })
  }

  return {
    time: Date.now(),
    blocks: blocks as OutputBlockData[],
    version: '2.28.2'
  }
}

function convertElementToBlock(element: HTMLElement, id: number): EditorJSBlock | null {
  const tagName = element.tagName.toLowerCase()
  const textContent = (element.textContent?.trim() || '')
    .replace(/\[object Object\]/g, '') // Remove object references
    .replace(/\[object [^\]]+\]/g, '') // Remove any object patterns
    .trim()
  const innerHTML = (element.innerHTML?.trim() || '')
    .replace(/\[object Object\]/g, '') // Remove object references
    .replace(/\[object [^\]]+\]/g, '') // Remove any object patterns
    .trim()

  if (!textContent) return null

  switch (tagName) {
    case 'h1':
      return {
        id: `heading-${id}`,
        type: 'header',
        data: {
          text: textContent,
          level: 1
        }
      }

    case 'h2':
      return {
        id: `heading-${id}`,
        type: 'header',
        data: {
          text: textContent,
          level: 2
        }
      }

    case 'h3':
      return {
        id: `heading-${id}`,
        type: 'header',
        data: {
          text: textContent,
          level: 3
        }
      }

    case 'h4':
      return {
        id: `heading-${id}`,
        type: 'header',
        data: {
          text: textContent,
          level: 4
        }
      }

    case 'p':
      // Handle paragraphs with potential formatting
      return {
        id: `paragraph-${id}`,
        type: 'paragraph',
        data: {
          text: innerHTML
        }
      }

    case 'ul':
      // Handle unordered lists
      const ulItems = Array.from(element.querySelectorAll('li')).map(li => {
        const text = li.textContent?.trim() || ''
        return text
          .replace(/\[object Object\]/g, '') // Remove object references
          .replace(/\[object [^\]]+\]/g, '') // Remove any object patterns
          .trim()
      })
      return {
        id: `list-${id}`,
        type: 'list',
        data: {
          style: 'unordered',
          items: ulItems.filter(item => item && item.length > 0)
        }
      }

    case 'ol':
      // Handle ordered lists
      const olItems = Array.from(element.querySelectorAll('li')).map(li => {
        const text = li.textContent?.trim() || ''
        return text
          .replace(/\[object Object\]/g, '') // Remove object references
          .replace(/\[object [^\]]+\]/g, '') // Remove any object patterns
          .trim()
      })
      return {
        id: `list-${id}`,
        type: 'list',
        data: {
          style: 'ordered',
          items: olItems.filter(item => item && item.length > 0)
        }
      }

    case 'blockquote':
      return {
        id: `quote-${id}`,
        type: 'quote',
        data: {
          text: textContent,
          caption: '',
          alignment: 'left'
        }
      }

    case 'pre':
    case 'code':
      return {
        id: `code-${id}`,
        type: 'code',
        data: {
          code: textContent
        }
      }

    case 'div':
      // Handle div elements by processing their children
      const childBlocks: EditorJSBlock[] = []
      Array.from(element.children).forEach((child, index) => {
        const childBlock = convertElementToBlock(child as HTMLElement, id * 100 + index)
        if (childBlock) {
          childBlocks.push(childBlock)
        }
      })

      // If div has no structured children, treat as paragraph
      if (childBlocks.length === 0 && textContent) {
        return {
          id: `paragraph-${id}`,
          type: 'paragraph',
          data: {
            text: innerHTML
          }
        }
      }

      // Return the first child block (EditorJS doesn't support nested blocks)
      return childBlocks[0] || null

    default:
      // For any other element, treat as paragraph
      if (textContent) {
        return {
          id: `paragraph-${id}`,
          type: 'paragraph',
          data: {
            text: innerHTML
          }
        }
      }
      return null
  }
}

// Server-side version using jsdom for Node.js environment
export function htmlToEditorJSServer(html: string): OutputData {
  // Clean the HTML content to remove any object references
  const cleanHtml = html
    .replace(/\[object Object\]/g, '') // Remove [object Object]
    .replace(/\[object [^\]]+\]/g, '') // Remove any [object ...] patterns
    .replace(/undefined/g, '') // Remove undefined values
    .replace(/\s+/g, ' ') // Clean up extra whitespace
    .trim()

  // For server-side, we'll use a simpler regex-based approach
  const blocks: EditorJSBlock[] = []
  let blockId = 1

  // Handle both multi-line and inline HTML by first normalizing the content
  const normalizedHtml = cleanHtml
    .replace(/></g, '>\n<') // Add line breaks between tags
    .replace(/(<\/[^>]+>)([^<])/g, '$1\n$2') // Add line breaks after closing tags
    .replace(/([^>])(<[^\/])/g, '$1\n$2') // Add line breaks before opening tags
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .join('\n')

  // Split HTML into blocks based on common patterns, but keep blockquotes intact
  let htmlBlocks: string[] = []
  let currentBlock = ''
  let inBlockquote = false

  const lines = normalizedHtml.split('\n')
  for (const line of lines) {
    const trimmedLine = line.trim()

    if (trimmedLine.includes('<blockquote')) {
      if (currentBlock.trim()) {
        htmlBlocks.push(currentBlock.trim())
        currentBlock = ''
      }
      inBlockquote = true
      currentBlock += line + '\n'
    } else if (trimmedLine.includes('</blockquote>')) {
      currentBlock += line + '\n'
      htmlBlocks.push(currentBlock.trim())
      currentBlock = ''
      inBlockquote = false
    } else if (inBlockquote) {
      currentBlock += line + '\n'
    } else if (trimmedLine.match(/^<(h[1-6]|p|ul|ol|div)/)) {
      if (currentBlock.trim()) {
        htmlBlocks.push(currentBlock.trim())
      }
      currentBlock = line + '\n'
    } else {
      currentBlock += line + '\n'
    }
  }

  if (currentBlock.trim()) {
    htmlBlocks.push(currentBlock.trim())
  }

  htmlBlocks = htmlBlocks.filter(block => block.trim())

  htmlBlocks.forEach((htmlBlock) => {
    const trimmed = htmlBlock.trim()
    if (!trimmed) return

    // Extract heading levels
    const headingMatch = trimmed.match(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/i)
    if (headingMatch) {
      const level = parseInt(headingMatch[1])
      const text = headingMatch[2]
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\[object Object\]/g, '') // Remove object references
        .replace(/\[object [^\]]+\]/g, '') // Remove any object patterns
        .trim()

      if (text) {
        blocks.push({
          id: `heading-${blockId++}`,
          type: 'header',
          data: { text, level }
        })
      }
      return
    }

    // Extract unordered lists
    const ulMatch = trimmed.match(/<ul[^>]*>(.*?)<\/ul>/is)
    if (ulMatch) {
      const items = ulMatch[1].match(/<li[^>]*>(.*?)<\/li>/gi)?.map(li =>
        li.replace(/<\/?li[^>]*>/gi, '')
          .replace(/<[^>]*>/g, '')
          .replace(/\[object Object\]/g, '') // Remove object references
          .replace(/\[object [^\]]+\]/g, '') // Remove any object patterns
          .trim()
      ).filter(item => item.length > 0) || []

      if (items.length > 0) {
        blocks.push({
          id: `list-${blockId++}`,
          type: 'list',
          data: { style: 'unordered', items }
        })
      }
      return
    }

    // Extract ordered lists
    const olMatch = trimmed.match(/<ol[^>]*>(.*?)<\/ol>/is)
    if (olMatch) {
      const items = olMatch[1].match(/<li[^>]*>(.*?)<\/li>/gi)?.map(li =>
        li.replace(/<\/?li[^>]*>/gi, '')
          .replace(/<[^>]*>/g, '')
          .replace(/\[object Object\]/g, '') // Remove object references
          .replace(/\[object [^\]]+\]/g, '') // Remove any object patterns
          .trim()
      ).filter(item => item.length > 0) || []

      if (items.length > 0) {
        blocks.push({
          id: `list-${blockId++}`,
          type: 'list',
          data: { style: 'ordered', items }
        })
      }
      return
    }

    // Extract blockquotes
    const quoteMatch = trimmed.match(/<blockquote[^>]*>(.*?)<\/blockquote>/is)
    if (quoteMatch) {
      // Handle nested <p> tags within blockquote
      let text = quoteMatch[1]
      if (text.includes('<p>')) {
        text = text.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1').trim()
      }
      text = text.replace(/<[^>]*>/g, '').trim()

      if (text) {
        blocks.push({
          id: `quote-${blockId++}`,
          type: 'quote',
          data: { text, caption: '', alignment: 'left' }
        })
      }
      return
    }

    // Extract paragraphs
    const pMatch = trimmed.match(/<p[^>]*>(.*?)<\/p>/is)
    if (pMatch) {
      const text = pMatch[1]
        .replace(/\[object Object\]/g, '') // Remove object references
        .replace(/\[object [^\]]+\]/g, '') // Remove any object patterns
        .trim()

      if (text) {
        blocks.push({
          id: `paragraph-${blockId++}`,
          type: 'paragraph',
          data: { text }
        })
      }
      return
    }

    // Handle any remaining content as paragraph
    const cleanText = trimmed.replace(/<[^>]*>/g, '').trim()
    if (cleanText) {
      blocks.push({
        id: `paragraph-${blockId++}`,
        type: 'paragraph',
        data: { text: cleanText }
      })
    }
  })

  // If no blocks were created, create a single paragraph
  if (blocks.length === 0) {
    const cleanText = html.replace(/<[^>]*>/g, '').trim()
    if (cleanText) {
      blocks.push({
        id: 'paragraph-1',
        type: 'paragraph',
        data: { text: cleanText }
      })
    }
  }

  return {
    time: Date.now(),
    blocks: blocks as OutputBlockData[],
    version: '2.28.2'
  }
}
