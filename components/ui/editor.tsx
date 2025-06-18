"use client"

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react'
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
import EditorToolbar from './editor-toolbar'

export interface EditorRef {
  save: () => Promise<OutputData>
  clear: () => void
  render: (data: OutputData) => Promise<void>
}

interface EditorProps {
  data?: OutputData
  onChange?: (data: OutputData) => void
  placeholder?: string
  readOnly?: boolean
  className?: string
  showToolbar?: boolean
}

const Editor = forwardRef<EditorRef, EditorProps>(({
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
  const editorId = useRef(`editor-${Math.random().toString(36).substr(2, 9)}`)

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
    }
  }))

  // Toolbar integration methods
  const handleInsertBlock = async (blockType: string, blockData?: any) => {
    if (!editorRef.current || !isEditorReady) return

    try {
      const currentBlockIndex = editorRef.current.blocks.getCurrentBlockIndex()

      // Insert new block after current block
      await editorRef.current.blocks.insert(blockType, blockData, {}, currentBlockIndex + 1, true)

      // Focus the new block
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
      // Get the current block
      const currentBlock = editorRef.current.blocks.getBlockByIndex(editorRef.current.blocks.getCurrentBlockIndex())

      if (currentBlock && currentBlock.holder) {
        // Simulate inline toolbar action
        const inlineToolbar = document.querySelector('.ce-inline-toolbar')
        if (inlineToolbar) {
          const toolButton = inlineToolbar.querySelector(`[data-tool="${tool}"]`) as HTMLElement
          if (toolButton) {
            toolButton.click()
          }
        } else {
          // If inline toolbar is not visible, try to trigger it
          const selection = window.getSelection()
          if (selection && selection.rangeCount > 0) {
            // Create a temporary selection to trigger inline toolbar
            const range = selection.getRangeAt(0)
            if (range.collapsed) {
              // Expand selection to trigger inline toolbar
              range.selectNodeContents(currentBlock.holder.querySelector('[contenteditable]') || currentBlock.holder)
              selection.removeAllRanges()
              selection.addRange(range)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error toggling inline tool:', error)
    }
  }

  useEffect(() => {
    if (!holderRef.current) return

    // Prevent multiple initializations
    if (editorRef.current) {
      console.log('Editor already exists, skipping initialization')
      return
    }

    const initializeEditor = async () => {
      console.log(`Initializing editor ${editorId.current}...`, new Date().toISOString())

      // Clear the holder element first
      if (holderRef.current) {
        holderRef.current.innerHTML = ''
        // Add a unique ID to the holder
        holderRef.current.id = editorId.current
      }

        const editor = new EditorJS({
        holder: editorId.current,
        data: data || {
          time: Date.now(),
          blocks: [
            {
              type: "paragraph",
              data: {
                text: ""
              }
            }
          ]
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
          inlineToolbar: true,
          config: {
            placeholder: 'Start writing...'
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
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
        code: {
          class: Code,
          config: {
            placeholder: 'Enter code here...'
          }
        },
        delimiter: Delimiter,
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3
          }
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: '/api/link-preview' // You'll need to implement this endpoint
          }
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
              codepen: true,
              imgur: true
            }
          }
        },
        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M'
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C'
        },
        underline: {
          class: Underline,
          shortcut: 'CMD+U'
        }
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
          console.log(`Editor ${editorId.current} is ready to work!`, new Date().toISOString())
          setIsEditorReady(true)
        }
      })

      editorRef.current = editor
    }

    initializeEditor()

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy()
        editorRef.current = null
        setIsEditorReady(false)
      }
    }
  }, [])

  // Handle data changes separately
  useEffect(() => {
    if (editorRef.current && data && isEditorReady) {
      editorRef.current.render(data)
    }
  }, [data, isEditorReady])

  return (
    <div className={`editor-wrapper ${className}`}>
      {/* Toolbar */}
      {showToolbar && !readOnly && (
        <EditorToolbar
          onInsertBlock={handleInsertBlock}
          onToggleInline={handleToggleInline}
          className="mb-4"
        />
      )}

      {/* Editor */}
      <div
        ref={holderRef}
        className="prose prose-lg max-w-none min-h-[400px] p-4 border border-slate-200 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
      />
      <style jsx global>{`
        .codex-editor__redactor {
          padding-bottom: 0 !important;
        }

        .ce-block__content,
        .ce-toolbar__content {
          max-width: none !important;
        }

        .ce-paragraph {
          line-height: 1.6;
        }

        /* Hide duplicate placeholders - only show the first one */
        .ce-paragraph[data-placeholder]:not(:first-of-type)::before {
          display: none !important;
        }

        /* Ensure only one placeholder is visible */
        .codex-editor .ce-paragraph[data-placeholder]::before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
          position: absolute;
        }

        .codex-editor .ce-paragraph[data-placeholder]:not(:empty)::before {
          display: none;
        }
        
        .ce-header {
          margin: 1em 0 0.5em 0;
        }
        
        .ce-quote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
        }
        
        .ce-code {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          padding: 1rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        
        .ce-delimiter {
          margin: 2rem 0;
          text-align: center;
        }
        
        .ce-table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        
        .ce-table td {
          border: 1px solid #e2e8f0;
          padding: 0.5rem;
        }
        
        .ce-inline-tool--active {
          background: #3b82f6 !important;
        }
        
        .ce-toolbar__plus {
          color: #6b7280;
        }
        
        .ce-toolbar__plus:hover {
          color: #3b82f6;
        }
        
        .ce-popover {
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .ce-popover__item:hover {
          background: #f1f5f9;
        }
        
        .ce-conversion-tool:hover,
        .ce-settings__button:hover {
          background: #f1f5f9 !important;
        }
      `}</style>
    </div>
  )
})

Editor.displayName = 'Editor'

export default Editor
