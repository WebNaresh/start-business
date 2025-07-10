import { OutputData, OutputBlockData } from '@editorjs/editorjs'

export interface EditorBlock extends OutputBlockData {
  type: string
  data: any
}

// Utility function to convert markdown text to EditorJS inline format
export function convertMarkdownToEditorJS(text: string): string {
  if (!text || typeof text !== 'string') return text

  // Convert markdown formatting to EditorJS inline format
  return text
    // Convert bold markdown to EditorJS bold format
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    // Convert italic markdown to EditorJS italic format
    .replace(/\*([^*\n]+?)\*/g, '<i>$1</i>')
    // Clean up extra spaces
    .replace(/\s+/g, ' ')
    .trim()
}

// Utility function to convert EditorJS inline format back to markdown
export function convertEditorJSToMarkdown(text: string): string {
  if (!text || typeof text !== 'string') return text

  return text
    // Convert EditorJS bold format to markdown
    .replace(/<b>(.*?)<\/b>/g, '**$1**')
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    // Convert EditorJS italic format to markdown
    .replace(/<i>(.*?)<\/i>/g, '*$1*')
    .replace(/<em>(.*?)<\/em>/g, '*$1*')
    // Clean up extra spaces
    .replace(/\s+/g, ' ')
    .trim()
}

// Utility function to convert EditorJS data with markdown syntax to proper EditorJS format
export function convertEditorDataMarkdownToInline(data: OutputData): OutputData {
  if (!data || !data.blocks) return data

  const convertedBlocks = data.blocks.map(block => {
    const newBlock = { ...block }

    switch (block.type) {
      case 'paragraph':
        if (newBlock.data?.text) {
          newBlock.data.text = convertMarkdownToEditorJS(newBlock.data.text)
        }
        break

      case 'header':
        if (newBlock.data?.text) {
          newBlock.data.text = convertMarkdownToEditorJS(newBlock.data.text)
        }
        break

      case 'list':
        if (newBlock.data?.items && Array.isArray(newBlock.data.items)) {
          newBlock.data.items = newBlock.data.items.map((item: any) => {
            if (typeof item === 'string') {
              return convertMarkdownToEditorJS(item)
            } else if (item && typeof item === 'object' && item.content) {
              return {
                ...item,
                content: convertMarkdownToEditorJS(item.content)
              }
            }
            return item
          })
        }
        break

      case 'quote':
        if (newBlock.data?.text) {
          newBlock.data.text = convertMarkdownToEditorJS(newBlock.data.text)
        }
        if (newBlock.data?.caption) {
          newBlock.data.caption = convertMarkdownToEditorJS(newBlock.data.caption)
        }
        break
    }

    return newBlock
  })

  return {
    ...data,
    blocks: convertedBlocks
  }
}

// Utility function to convert markdown formatting to HTML
export function cleanAsterisks(text: string): string {
  if (!text || typeof text !== 'string') return text

  // Convert markdown-style formatting to HTML (order matters!)
  return text
    // First handle triple asterisks (bold + italic)
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    // Then handle double asterisks (bold)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Finally handle single asterisks (italic) - but be careful not to match already processed ones
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
    // Clean up extra spaces
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Convert EditorJS output data to HTML
 */
export function editorDataToHtml(data: OutputData): string {
  if (!data || !data.blocks) {
    return ''
  }

  return data.blocks.map(block => blockToHtml(block as EditorBlock)).join('')
}

/**
 * Convert a single EditorJS block to HTML
 */
function blockToHtml(block: EditorBlock): string {
  switch (block.type) {
    case 'header':
      return headerToHtml(block.data)

    case 'paragraph':
      return paragraphToHtml(block.data)

    case 'list':
      return listToHtml(block.data)

    case 'quote':
      return quoteToHtml(block.data)

    case 'code':
      return codeToHtml(block.data)

    case 'delimiter':
      return delimiterToHtml()

    case 'table':
      return tableToHtml(block.data)

    case 'linkTool':
      return linkToHtml(block.data)

    case 'embed':
      return embedToHtml(block.data)

    case 'image':
      return imageToHtml(block.data)

    default:
      console.warn(`Unknown block type: ${block.type}`)
      return ''
  }
}

function headerToHtml(data: any): string {
  const level = data.level || 2
  const text = data.text || ''
  const convertedText = convertMarkdownToEditorJS(text)
  return `<h${level} class="text-${level === 1 ? '4xl' : level === 2 ? '3xl' : level === 3 ? '2xl' : level === 4 ? 'xl' : 'lg'} font-bold mb-4 mt-6">${convertedText}</h${level}>`
}

function paragraphToHtml(data: any): string {
  const text = data.text || ''
  const convertedText = convertMarkdownToEditorJS(text)
  return `<p class="mb-4 leading-relaxed">${convertedText}</p>`
}

function listToHtml(data: any): string {
  console.log('🔄 Converting list to HTML:', data)

  const style = data.style || 'unordered'
  const items = data.items || []

  console.log(`📋 List style: ${style}, Items count: ${items.length}`)
  console.log('📝 List items:', items)

  // Handle both old format (strings) and new format (objects with content property)
  const cleanItems = items
    .map((item: any) => {
      let itemText = ''

      if (typeof item === 'string') {
        // Old format: direct string
        itemText = item
      } else if (item && typeof item === 'object' && item.content) {
        // New format: object with content property
        itemText = item.content
      } else {
        // Fallback: convert to string
        itemText = String(item)
      }

      // Convert markdown to EditorJS format and clean the text
      const convertedText = convertMarkdownToEditorJS(itemText)
      return convertedText
        .replace(/\[object Object\]/g, '') // Remove object references
        .replace(/\[object [^\]]+\]/g, '') // Remove any object patterns
        .replace(/undefined/g, '') // Remove undefined values
        .trim()
    })
    .filter((item: string) => item.length > 0) // Remove empty items

  console.log('🧹 Cleaned items:', cleanItems)

  // Ensure we have items to display
  if (cleanItems.length === 0) {
    console.log('❌ No items to display after cleaning')
    return ''
  }

  // Create list items with enhanced styling to ensure visibility
  const listItems = cleanItems.map((item: string) =>
    `<li style="display: list-item !important; visibility: visible !important; margin: 0.5rem 0; padding: 0.25rem 0; line-height: 1.6;">${item}</li>`
  ).join('')

  const htmlOutput = style === 'ordered'
    ? `<ol style="display: block !important; visibility: visible !important; list-style-type: decimal !important; margin: 1rem 0; padding-left: 1.5rem;" class="list-decimal list-outside mb-4 space-y-2">${listItems}</ol>`
    : `<ul style="display: block !important; visibility: visible !important; list-style-type: disc !important; margin: 1rem 0; padding-left: 1.5rem;" class="list-disc list-outside mb-4 space-y-2">${listItems}</ul>`

  console.log('✅ Generated list HTML:', htmlOutput)
  return htmlOutput
}

function quoteToHtml(data: any): string {
  const text = data.text || ''
  const caption = data.caption || ''

  return `
    <blockquote class="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic bg-gray-50 rounded-r-lg">
      <p class="text-lg mb-2">${text}</p>
      ${caption ? `<cite class="text-sm text-gray-600 not-italic">— ${caption}</cite>` : ''}
    </blockquote>
  `
}

function codeToHtml(data: any): string {
  const code = data.code || ''
  return `
    <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
      <code>${escapeHtml(code)}</code>
    </pre>
  `
}

function delimiterToHtml(): string {
  return `
    <div class="flex justify-center my-8">
      <div class="flex space-x-2">
        <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
        <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
        <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  `
}

function tableToHtml(data: any): string {
  const content = data.content || []

  if (content.length === 0) return ''

  const headerRow = content[0]
  const bodyRows = content.slice(1)

  const headerHtml = headerRow.map((cell: string) =>
    `<th class="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold text-left">${cell}</th>`
  ).join('')

  const bodyHtml = bodyRows.map((row: string[]) =>
    `<tr>${row.map((cell: string) =>
      `<td class="border border-gray-300 px-4 py-2">${cell}</td>`
    ).join('')}</tr>`
  ).join('')

  return `
    <div class="overflow-x-auto mb-4">
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>${headerHtml}</tr>
        </thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </div>
  `
}

function linkToHtml(data: any): string {
  const link = data.link || ''
  const meta = data.meta || {}
  const title = meta.title || link
  const description = meta.description || ''
  const image = meta.image?.url || ''

  return `
    <div class="border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
      <a href="${link}" target="_blank" rel="noopener noreferrer" class="block">
        ${image ? `<img src="${image}" alt="${title}" class="w-full h-48 object-cover rounded mb-3">` : ''}
        <h3 class="font-semibold text-blue-600 hover:text-blue-800 mb-2">${title}</h3>
        ${description ? `<p class="text-gray-600 text-sm">${description}</p>` : ''}
        <p class="text-xs text-gray-400 mt-2">${link}</p>
      </a>
    </div>
  `
}

function embedToHtml(data: any): string {
  const service = data.service || ''
  const source = data.source || ''
  const embed = data.embed || ''
  const width = data.width || 580
  const height = data.height || 320

  return `
    <div class="mb-4">
      <div class="relative" style="padding-bottom: ${(height / width) * 100}%">
        <iframe 
          src="${embed}" 
          class="absolute top-0 left-0 w-full h-full rounded-lg"
          frameborder="0" 
          allowfullscreen>
        </iframe>
      </div>
      ${source ? `<p class="text-xs text-gray-500 mt-2 text-center">Source: ${source}</p>` : ''}
    </div>
  `
}

function imageToHtml(data: any): string {
  const file = data.file || {}
  const url = file.url || ''
  const caption = data.caption || ''
  const withBorder = data.withBorder || false
  const withBackground = data.withBackground || false
  const stretched = data.stretched || false

  const classes = [
    'mb-4',
    stretched ? 'w-full' : 'max-w-full h-auto',
    withBorder ? 'border border-gray-300' : '',
    withBackground ? 'bg-gray-50 p-4' : '',
    'rounded-lg'
  ].filter(Boolean).join(' ')

  return `
    <figure class="mb-4">
      <img src="${url}" alt="${caption}" class="${classes}">
      ${caption ? `<figcaption class="text-sm text-gray-600 text-center mt-2 italic">${caption}</figcaption>` : ''}
    </figure>
  `
}

/**
 * Escape HTML characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }

  return text.replace(/[&<>"']/g, (m) => map[m])
}

/**
 * Convert HTML back to EditorJS data with object cleaning
 */
export function htmlToEditorData(html: string): OutputData {
  // Clean the HTML content to remove any object references
  const cleanHtml = html
    .replace(/\[object Object\]/g, '') // Remove [object Object]
    .replace(/\[object [^\]]+\]/g, '') // Remove any [object ...] patterns
    .replace(/undefined/g, '') // Remove undefined values
    .replace(/\s+/g, ' ') // Clean up extra whitespace
    .trim()

  const blocks: EditorBlock[] = []
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

  // Split HTML into blocks
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
        type: 'paragraph',
        data: { text: cleanText }
      })
    }
  })

  return {
    time: Date.now(),
    blocks: blocks,
    version: '2.28.2'
  }
}
