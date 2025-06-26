"use client"

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import Quote from '@editorjs/quote'
import Code from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import Table from '@editorjs/table'
import LinkTool from '@editorjs/link'
import Embed from '@editorjs/embed'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import Underline from '@editorjs/underline'
import EnhancedEditorToolbar from './enhanced-editor-toolbar'
import { toast } from 'sonner'

export interface EditorRef {
  save: () => Promise<OutputData>
  clear: () => void
  render: (data: OutputData) => Promise<void>
  insertContent: (content: string) => Promise<void>
  formatSelection: (format: string) => void
  getSelection: () => Selection | null
}

interface EditorProps {
  data?: OutputData
  onChange?: (data: OutputData) => void
  placeholder?: string
  readOnly?: boolean
  className?: string
  showToolbar?: boolean
}

// Smart paste functionality to convert HTML/formatted text to EditorJS blocks
const parseHTMLToBlocks = (html: string): any[] => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const blocks: any[] = []

  const processNode = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim()
      if (text) {
        blocks.push({
          type: 'paragraph',
          data: { text }
        })
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element
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
              data: { text: convertInlineHTML(text) }
            })
          }
          break

        case 'ul':
        case 'ol':
          const items = Array.from(element.querySelectorAll('li')).map(li => 
            convertInlineHTML(li.innerHTML.trim())
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
            data: {
              code: element.textContent || ''
            }
          })
          break

        case 'hr':
          blocks.push({
            type: 'delimiter',
            data: {}
          })
          break

        case 'table':
          const rows = Array.from(element.querySelectorAll('tr'))
          const content = rows.map(row => 
            Array.from(row.querySelectorAll('td, th')).map(cell => 
              cell.textContent?.trim() || ''
            )
          )
          if (content.length > 0) {
            blocks.push({
              type: 'table',
              data: { content }
            })
          }
          break

        case 'div':
        case 'section':
        case 'article':
          // Process children for container elements
          Array.from(element.childNodes).forEach(processNode)
          break

        default:
          // For other elements, process children
          if (element.childNodes.length > 0) {
            Array.from(element.childNodes).forEach(processNode)
          } else if (element.textContent?.trim()) {
            blocks.push({
              type: 'paragraph',
              data: { text: convertInlineHTML(element.innerHTML) }
            })
          }
      }
    }
  }

  Array.from(doc.body.childNodes).forEach(processNode)
  return blocks.length > 0 ? blocks : [{ type: 'paragraph', data: { text: '' } }]
}

// Convert inline HTML formatting to EditorJS format
const convertInlineHTML = (html: string): string => {
  return html
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '<b>$1</b>')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '<i>$1</i>')
    .replace(/<u[^>]*>(.*?)<\/u>/gi, '<u>$1</u>')
    .replace(/<mark[^>]*>(.*?)<\/mark>/gi, '<mark>$1</mark>')
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '<code class="inline-code">$1</code>')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '<a href="$1">$2</a>')
    .replace(/<br\s*\/?>/gi, '<br>')
}

const EnhancedEditor = forwardRef<EditorRef, EditorProps>(({
  data,
  onChange,
  placeholder = "Start writing your blog post...",
  readOnly = false,
  className = "",
  showToolbar = true
}, ref) => {
  const editorRef = useRef<EditorJS | null>(null)
  const holderRef = useRef<HTMLDivElement>(null)
  const [isEditorReady, setIsEditorReady] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const editorId = useRef(`enhanced-editor-${Math.random().toString(36).substr(2, 9)}`)

  // Handle smart paste functionality
  const handlePaste = useCallback(async (event: ClipboardEvent) => {
    if (!editorRef.current || !isEditorReady) return

    const clipboardData = event.clipboardData
    if (!clipboardData) return

    // Get HTML content if available
    const htmlContent = clipboardData.getData('text/html')
    const plainText = clipboardData.getData('text/plain')

    // If we have HTML content and it's not just plain text
    if (htmlContent && htmlContent !== plainText) {
      event.preventDefault()
      
      try {
        const blocks = parseHTMLToBlocks(htmlContent)
        
        if (blocks.length > 1) {
          // Multiple blocks - insert them
          const currentIndex = editorRef.current.blocks.getCurrentBlockIndex()
          
          for (let i = 0; i < blocks.length; i++) {
            await editorRef.current.blocks.insert(
              blocks[i].type,
              blocks[i].data,
              {},
              currentIndex + i + 1,
              i === 0
            )
          }
          
          toast.success(`Pasted ${blocks.length} formatted blocks`)
        } else if (blocks.length === 1) {
          // Single block - replace current or insert
          const currentBlock = editorRef.current.blocks.getBlockByIndex(
            editorRef.current.blocks.getCurrentBlockIndex()
          )
          
          if (currentBlock && blocks[0].type === 'paragraph') {
            // Insert formatted text into current paragraph
            const selection = window.getSelection()
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0)
              range.deleteContents()
              
              const tempDiv = document.createElement('div')
              tempDiv.innerHTML = blocks[0].data.text
              
              while (tempDiv.firstChild) {
                range.insertNode(tempDiv.firstChild)
              }
            }
          } else {
            // Insert as new block
            await editorRef.current.blocks.insert(
              blocks[0].type,
              blocks[0].data,
              {},
              editorRef.current.blocks.getCurrentBlockIndex() + 1,
              true
            )
          }
          
          toast.success('Pasted formatted content')
        }
      } catch (error) {
        console.error('Error parsing pasted content:', error)
        toast.error('Failed to parse formatted content')
      }
    }
  }, [isEditorReady])

  useImperativeHandle(ref, () => ({
    save: async () => {
      if (editorRef.current) {
        return await editorRef.current.save()
      }
      throw new Error('Editor not initialized')
    },
    clear: () => {
      if (editorRef.current) {
        editorRef.current.clear()
      }
    },
    render: async (data: OutputData) => {
      if (editorRef.current) {
        await editorRef.current.render(data)
      }
    },
    insertContent: async (content: string) => {
      if (!editorRef.current || !isEditorReady) return
      
      try {
        const blocks = parseHTMLToBlocks(content)
        const currentIndex = editorRef.current.blocks.getCurrentBlockIndex()
        
        for (let i = 0; i < blocks.length; i++) {
          await editorRef.current.blocks.insert(
            blocks[i].type,
            blocks[i].data,
            {},
            currentIndex + i + 1,
            i === 0
          )
        }
      } catch (error) {
        console.error('Error inserting content:', error)
      }
    },
    formatSelection: (format: string) => {
      // This will be handled by the toolbar
      handleToggleInline(format)
    },
    getSelection: () => {
      return window.getSelection()
    }
  }))

  // Enhanced toolbar integration methods
  const handleInsertBlock = async (blockType: string, blockData?: any) => {
    if (!editorRef.current || !isEditorReady) return

    try {
      const currentBlockIndex = editorRef.current.blocks.getCurrentBlockIndex()
      await editorRef.current.blocks.insert(blockType, blockData, {}, currentBlockIndex + 1, true)
      
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.caret.setToBlock(currentBlockIndex + 1)
        }
      }, 100)
    } catch (error) {
      console.error('Error inserting block:', error)
    }
  }

  const handleToggleInline = (tool: string) => {
    if (!editorRef.current || !isEditorReady) return

    try {
      // Trigger inline toolbar for the tool
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        // We have selected text - try to apply formatting
        document.execCommand(tool === 'bold' ? 'bold' : tool === 'italic' ? 'italic' : tool, false)
      } else {
        // No selection - show inline toolbar
        const currentBlock = editorRef.current.blocks.getBlockByIndex(
          editorRef.current.blocks.getCurrentBlockIndex()
        )
        
        if (currentBlock && currentBlock.holder) {
          const editableElement = currentBlock.holder.querySelector('[contenteditable]')
          if (editableElement) {
            editableElement.focus()
            
            // Select all text to show inline toolbar
            const range = document.createRange()
            range.selectNodeContents(editableElement)
            selection?.removeAllRanges()
            selection?.addRange(range)
          }
        }
      }
    } catch (error) {
      console.error('Error toggling inline tool:', error)
    }
  }

  // Track text selection
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        setSelectedText(selection.toString())
      } else {
        setSelectedText('')
      }
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [])

  useEffect(() => {
    if (!holderRef.current) return

    if (editorRef.current) {
      console.log('Enhanced editor already exists, skipping initialization')
      return
    }

    const initializeEditor = async () => {
      console.log(`Initializing enhanced editor ${editorId.current}...`)

      if (holderRef.current) {
        holderRef.current.innerHTML = ''
        holderRef.current.id = editorId.current
      }

      console.log('🎯 Enhanced Editor initializing with data:', data)
      console.log('📊 Data blocks count:', data?.blocks?.length || 0)

      const editor = new EditorJS({
        holder: editorId.current,
        data: data || {
          time: Date.now(),
          blocks: [{ type: "paragraph", data: { text: "" } }]
        },
        readOnly: readOnly,
        placeholder: placeholder,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 2
            }
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: ['bold', 'italic', 'underline', 'marker', 'inlineCode', 'link'],
            config: { placeholder: 'Start writing...' }
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered',
              // Ensure list items are properly rendered
              shortcut: 'CMD+SHIFT+L'
            }
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author'
            }
          },
          code: { class: Code },
          delimiter: Delimiter,
          table: { class: Table, inlineToolbar: true },
          linkTool: { class: LinkTool },
          embed: { class: Embed },
          marker: { class: Marker, shortcut: 'CMD+SHIFT+M' },
          inlineCode: { class: InlineCode, shortcut: 'CMD+SHIFT+C' },
          underline: { class: Underline, shortcut: 'CMD+U' }
        },
        onChange: async () => {
          if (onChange && editorRef.current) {
            try {
              const outputData = await editorRef.current.save()
              onChange(outputData)
            } catch (error) {
              console.error('Error saving editor data:', error)
            }
          }
        },
        onReady: () => {
          console.log(`Enhanced editor ${editorId.current} is ready!`)
          setIsEditorReady(true)
          
          // Add paste event listener
          if (holderRef.current) {
            holderRef.current.addEventListener('paste', handlePaste)
          }
        }
      })

      editorRef.current = editor
    }

    initializeEditor()

    return () => {
      if (holderRef.current) {
        holderRef.current.removeEventListener('paste', handlePaste)
      }
      
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy()
        editorRef.current = null
        setIsEditorReady(false)
      }
    }
  }, [])

  useEffect(() => {
    if (editorRef.current && data && isEditorReady) {
      editorRef.current.render(data)
    }
  }, [data, isEditorReady])

  return (
    <div className={`enhanced-editor-wrapper ${className}`}>
      {showToolbar && !readOnly && (
        <EnhancedEditorToolbar
          onInsertBlock={handleInsertBlock}
          onToggleInline={handleToggleInline}
          selectedText={selectedText}
          isEditorReady={isEditorReady}
          className="mb-4"
        />
      )}

      <div
        ref={holderRef}
        className="prose prose-lg max-w-none min-h-[400px] p-4 border border-slate-200 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
      />
      
      {/* Enhanced styles */}
      <style jsx global>{`
        .enhanced-editor-wrapper .codex-editor__redactor {
          padding-bottom: 0 !important;
        }

        .enhanced-editor-wrapper .ce-block__content,
        .enhanced-editor-wrapper .ce-toolbar__content {
          max-width: none !important;
        }

        .enhanced-editor-wrapper .ce-paragraph {
          line-height: 1.6;
        }

        .enhanced-editor-wrapper .ce-inline-toolbar {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .enhanced-editor-wrapper .ce-inline-tool {
          border-radius: 4px;
          transition: all 0.2s;
        }

        .enhanced-editor-wrapper .ce-inline-tool:hover {
          background: #f1f5f9;
        }

        .enhanced-editor-wrapper .ce-inline-tool--active {
          background: #3b82f6 !important;
          color: white !important;
        }

        /* Enhanced List Styling for EditorJS */
        .enhanced-editor-wrapper .cdx-list {
          margin: 1rem 0 !important;
        }

        .enhanced-editor-wrapper .cdx-list__item {
          display: list-item !important;
          list-style: inherit !important;
          margin: 0.5rem 0 !important;
          padding: 0.25rem 0 !important;
          line-height: 1.6 !important;
        }

        .enhanced-editor-wrapper .cdx-list--unordered .cdx-list__item {
          list-style-type: disc !important;
          margin-left: 1.5rem !important;
        }

        .enhanced-editor-wrapper .cdx-list--ordered .cdx-list__item {
          list-style-type: decimal !important;
          margin-left: 1.5rem !important;
        }

        .enhanced-editor-wrapper .cdx-list__item-content {
          display: block !important;
        }
      `}</style>
    </div>
  )
})

EnhancedEditor.displayName = 'EnhancedEditor'

export default EnhancedEditor
