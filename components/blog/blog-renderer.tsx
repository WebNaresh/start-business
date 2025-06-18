"use client"

import React from 'react'
import { OutputData } from '@editorjs/editorjs'
import { editorDataToHtml } from '@/lib/editor-utils'

interface BlogRendererProps {
  content: string
  editorData?: string | null
  className?: string
}

export default function BlogRenderer({ content, editorData, className = "" }: BlogRendererProps) {
  // If we have editorData (JSON), convert it to HTML for better rendering
  const htmlContent = React.useMemo(() => {
    if (editorData) {
      try {
        const parsedData: OutputData = JSON.parse(editorData)
        return editorDataToHtml(parsedData)
      } catch (error) {
        console.error('Failed to parse editor data:', error)
        // Fallback to original content
        return content
      }
    }
    return content
  }, [content, editorData])

  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

// Additional component for read-only EditorJS display
interface EditorReadOnlyProps {
  data: OutputData
  className?: string
}

export function EditorReadOnly({ data, className = "" }: EditorReadOnlyProps) {
  const htmlContent = React.useMemo(() => {
    return editorDataToHtml(data)
  }, [data])

  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
