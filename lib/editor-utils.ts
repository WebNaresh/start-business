import { OutputData, OutputBlockData } from '@editorjs/editorjs'

export interface EditorBlock extends OutputBlockData {
  type: string
  data: any
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
  return `<h${level} class="text-${level === 1 ? '4xl' : level === 2 ? '3xl' : level === 3 ? '2xl' : level === 4 ? 'xl' : 'lg'} font-bold mb-4 mt-6">${text}</h${level}>`
}

function paragraphToHtml(data: any): string {
  const text = data.text || ''
  return `<p class="mb-4 leading-relaxed">${text}</p>`
}

function listToHtml(data: any): string {
  const style = data.style || 'unordered'
  const items = data.items || []
  
  const listItems = items.map((item: string) => `<li class="mb-2">${item}</li>`).join('')
  
  if (style === 'ordered') {
    return `<ol class="list-decimal list-inside mb-4 space-y-2">${listItems}</ol>`
  } else {
    return `<ul class="list-disc list-inside mb-4 space-y-2">${listItems}</ul>`
  }
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
      <div class="relative" style="padding-bottom: ${(height/width) * 100}%">
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
 * Convert HTML back to EditorJS data (basic implementation)
 */
export function htmlToEditorData(html: string): OutputData {
  // This is a basic implementation - you might want to use a proper HTML parser
  // for more complex conversions
  
  const blocks: EditorBlock[] = []
  
  // Simple regex-based parsing (you might want to improve this)
  const paragraphs = html.split(/<\/p>|<\/h[1-6]>|<\/blockquote>|<\/pre>|<\/ul>|<\/ol>|<\/table>/).filter(p => p.trim())
  
  paragraphs.forEach(p => {
    const trimmed = p.trim()
    if (!trimmed) return
    
    if (trimmed.includes('<h1')) {
      blocks.push({
        type: 'header',
        data: {
          text: trimmed.replace(/<[^>]*>/g, ''),
          level: 1
        }
      })
    } else if (trimmed.includes('<h2')) {
      blocks.push({
        type: 'header',
        data: {
          text: trimmed.replace(/<[^>]*>/g, ''),
          level: 2
        }
      })
    } else if (trimmed.includes('<p')) {
      blocks.push({
        type: 'paragraph',
        data: {
          text: trimmed.replace(/<[^>]*>/g, '')
        }
      })
    }
    // Add more parsing logic as needed
  })
  
  return {
    time: Date.now(),
    blocks: blocks,
    version: '2.28.2'
  }
}
