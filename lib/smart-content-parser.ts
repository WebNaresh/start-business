/**
 * Smart Content Parser
 * Handles content import from various sources with intelligent formatting detection
 */

export interface ParsedBlock {
  type: string
  data: any
}

export interface ContentSource {
  name: string
  patterns: RegExp[]
  parser: (content: string) => ParsedBlock[]
}

// AI Tool Content Patterns
const AI_PATTERNS = {
  chatgpt: [
    /^(ChatGPT|Assistant):/m,
    /```[\s\S]*?```/g,
    /\*\*([^*]+)\*\*/g, // Bold
    /\*([^*]+)\*/g,     // Italic
  ],
  gemini: [
    /^(Gemini|Bard):/m,
    /\*\*([^*]+)\*\*/g,
    /\*([^*]+)\*/g,
  ],
  claude: [
    /^(Claude|Assistant):/m,
    /\*\*([^*]+)\*\*/g,
    /\*([^*]+)\*/g,
  ]
}

// Content source definitions
const CONTENT_SOURCES: ContentSource[] = [
  {
    name: 'ChatGPT/AI Tools',
    patterns: [
      /^(ChatGPT|Assistant|Gemini|Bard|Claude):/m,
      /```[\s\S]*?```/g,
      /\*\*([^*]+)\*\*/g,
    ],
    parser: parseAIContent
  },
  {
    name: 'Markdown',
    patterns: [
      /^#{1,6}\s/m,
      /^\*\s/m,
      /^\d+\.\s/m,
      /^>\s/m,
    ],
    parser: parseMarkdownContent
  },
  {
    name: 'Microsoft Word',
    patterns: [
      /<p[^>]*>/i,
      /<h[1-6][^>]*>/i,
      /<ul[^>]*>/i,
      /<ol[^>]*>/i,
    ],
    parser: parseWordContent
  },
  {
    name: 'Web Content',
    patterns: [
      /<div[^>]*>/i,
      /<article[^>]*>/i,
      /<section[^>]*>/i,
    ],
    parser: parseWebContent
  }
]

/**
 * Detect content source based on patterns
 */
export function detectContentSource(content: string): ContentSource | null {
  for (const source of CONTENT_SOURCES) {
    const matches = source.patterns.some(pattern => pattern.test(content))
    if (matches) {
      return source
    }
  }
  return null
}

/**
 * Parse AI tool content (ChatGPT, Gemini, Claude, etc.)
 */
function parseAIContent(content: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = []
  
  // Remove AI assistant prefixes
  let cleanContent = content
    .replace(/^(ChatGPT|Assistant|Gemini|Bard|Claude):\s*/gm, '')
    .replace(/^(Human|User):\s*/gm, '')
  
  // Split by double newlines to get paragraphs
  const sections = cleanContent.split(/\n\s*\n/).filter(section => section.trim())
  
  for (const section of sections) {
    const trimmed = section.trim()
    
    // Code blocks
    if (trimmed.startsWith('```') && trimmed.endsWith('```')) {
      const code = trimmed.slice(3, -3).trim()
      const lines = code.split('\n')
      const language = lines[0].includes(' ') ? '' : lines[0]
      const codeContent = language ? lines.slice(1).join('\n') : code
      
      blocks.push({
        type: 'code',
        data: { code: codeContent }
      })
      continue
    }
    
    // Headers (markdown style)
    const headerMatch = trimmed.match(/^(#{1,6})\s+(.+)/)
    if (headerMatch) {
      blocks.push({
        type: 'header',
        data: {
          text: headerMatch[2],
          level: headerMatch[1].length
        }
      })
      continue
    }
    
    // Lists
    const listItems = trimmed.split('\n').filter(line => 
      line.match(/^[\s]*[-*+•]\s/) || line.match(/^[\s]*\d+\.\s/)
    )
    
    if (listItems.length > 0) {
      const isOrdered = listItems[0].match(/^\d+\./)
      const items = listItems.map(item => 
        item.replace(/^[\s]*[-*+•]\s/, '').replace(/^[\s]*\d+\.\s/, '').trim()
      )
      
      blocks.push({
        type: 'list',
        data: {
          style: isOrdered ? 'ordered' : 'unordered',
          items: items
        }
      })
      continue
    }
    
    // Quotes
    if (trimmed.startsWith('>')) {
      const quoteText = trimmed.replace(/^>\s*/gm, '').trim()
      blocks.push({
        type: 'quote',
        data: {
          text: quoteText,
          caption: ''
        }
      })
      continue
    }
    
    // Regular paragraphs with inline formatting
    if (trimmed) {
      const formattedText = convertInlineFormatting(trimmed)
      blocks.push({
        type: 'paragraph',
        data: { text: formattedText }
      })
    }
  }
  
  return blocks.length > 0 ? blocks : [{ type: 'paragraph', data: { text: '' } }]
}

/**
 * Parse Markdown content
 */
function parseMarkdownContent(content: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = []
  const lines = content.split('\n')
  let i = 0
  
  while (i < lines.length) {
    const line = lines[i].trim()
    
    if (!line) {
      i++
      continue
    }
    
    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/)
    if (headerMatch) {
      blocks.push({
        type: 'header',
        data: {
          text: headerMatch[2],
          level: headerMatch[1].length
        }
      })
      i++
      continue
    }
    
    // Code blocks
    if (line.startsWith('```')) {
      const codeLines = []
      i++ // Skip opening ```
      
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      
      blocks.push({
        type: 'code',
        data: { code: codeLines.join('\n') }
      })
      i++ // Skip closing ```
      continue
    }
    
    // Lists
    if (line.match(/^[\s]*[-*+]\s/) || line.match(/^[\s]*\d+\.\s/)) {
      const listItems = []
      const isOrdered = line.match(/^\d+\./)
      
      while (i < lines.length && (lines[i].match(/^[\s]*[-*+]\s/) || lines[i].match(/^[\s]*\d+\.\s/))) {
        const item = lines[i].replace(/^[\s]*[-*+]\s/, '').replace(/^[\s]*\d+\.\s/, '').trim()
        listItems.push(item)
        i++
      }
      
      blocks.push({
        type: 'list',
        data: {
          style: isOrdered ? 'ordered' : 'unordered',
          items: listItems
        }
      })
      continue
    }
    
    // Quotes
    if (line.startsWith('>')) {
      const quoteLines = []
      
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s*/, ''))
        i++
      }
      
      blocks.push({
        type: 'quote',
        data: {
          text: quoteLines.join('\n').trim(),
          caption: ''
        }
      })
      continue
    }
    
    // Regular paragraph
    const paragraphLines = []
    while (i < lines.length && lines[i].trim() && !isSpecialLine(lines[i])) {
      paragraphLines.push(lines[i])
      i++
    }
    
    if (paragraphLines.length > 0) {
      const text = convertInlineFormatting(paragraphLines.join(' ').trim())
      blocks.push({
        type: 'paragraph',
        data: { text }
      })
    }
    
    i++
  }
  
  return blocks.length > 0 ? blocks : [{ type: 'paragraph', data: { text: '' } }]
}

/**
 * Parse Microsoft Word content (HTML)
 */
function parseWordContent(content: string): ParsedBlock[] {
  // This would be similar to the HTML parsing in the enhanced editor
  // For now, delegate to the existing HTML parser
  return parseHTMLContent(content)
}

/**
 * Parse web content (HTML)
 */
function parseWebContent(content: string): ParsedBlock[] {
  return parseHTMLContent(content)
}

/**
 * Parse HTML content (shared by Word and Web parsers)
 */
function parseHTMLContent(html: string): ParsedBlock[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const blocks: ParsedBlock[] = []

  const processElement = (element: Element) => {
    const tagName = element.tagName.toLowerCase()
    
    switch (tagName) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        blocks.push({
          type: 'header',
          data: {
            text: element.textContent?.trim() || '',
            level: parseInt(tagName.charAt(1))
          }
        })
        break
        
      case 'p':
        const text = element.innerHTML.trim()
        if (text) {
          blocks.push({
            type: 'paragraph',
            data: { text: convertInlineFormatting(text) }
          })
        }
        break
        
      case 'ul':
      case 'ol':
        const items = Array.from(element.querySelectorAll('li')).map(li => 
          li.textContent?.trim() || ''
        )
        if (items.length > 0) {
          blocks.push({
            type: 'list',
            data: {
              style: tagName === 'ul' ? 'unordered' : 'ordered',
              items
            }
          })
        }
        break
        
      case 'blockquote':
        blocks.push({
          type: 'quote',
          data: {
            text: element.textContent?.trim() || '',
            caption: ''
          }
        })
        break
        
      case 'pre':
      case 'code':
        blocks.push({
          type: 'code',
          data: { code: element.textContent || '' }
        })
        break
        
      default:
        // Process children for container elements
        Array.from(element.children).forEach(processElement)
    }
  }

  Array.from(doc.body.children).forEach(processElement)
  return blocks.length > 0 ? blocks : [{ type: 'paragraph', data: { text: '' } }]
}

/**
 * Convert inline formatting (markdown to HTML)
 */
function convertInlineFormatting(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')           // Bold
    .replace(/\*([^*]+)\*/g, '<i>$1</i>')               // Italic
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>') // Inline code
    .replace(/~~([^~]+)~~/g, '<s>$1</s>')               // Strikethrough
    .replace(/==([^=]+)==/g, '<mark>$1</mark>')         // Highlight
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>') // Links
}

/**
 * Check if a line is a special markdown line
 */
function isSpecialLine(line: string): boolean {
  const trimmed = line.trim()
  return (
    trimmed.startsWith('#') ||
    trimmed.startsWith('>') ||
    trimmed.startsWith('```') ||
    trimmed.match(/^[\s]*[-*+]\s/) !== null ||
    trimmed.match(/^[\s]*\d+\.\s/) !== null
  )
}

/**
 * Main parsing function
 */
export function parseSmartContent(content: string): ParsedBlock[] {
  const source = detectContentSource(content)
  
  if (source) {
    console.log(`Detected content source: ${source.name}`)
    return source.parser(content)
  }
  
  // Fallback to basic paragraph
  return [{
    type: 'paragraph',
    data: { text: convertInlineFormatting(content) }
  }]
}
