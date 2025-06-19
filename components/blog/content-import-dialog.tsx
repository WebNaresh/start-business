"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Sparkles, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Bot,
  Globe,
  FileCode,
  Wand2
} from 'lucide-react'
import { parseSmartContent, detectContentSource } from '@/lib/smart-content-parser'
import { toast } from 'sonner'

interface ContentImportDialogProps {
  onImport: (blocks: any[]) => void
  trigger?: React.ReactNode
}

export default function ContentImportDialog({ onImport, trigger }: ContentImportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [detectedSource, setDetectedSource] = useState<string | null>(null)
  const [previewBlocks, setPreviewBlocks] = useState<any[]>([])

  const handleContentChange = (value: string) => {
    setContent(value)
    
    if (value.trim()) {
      const source = detectContentSource(value)
      setDetectedSource(source?.name || null)
      
      // Generate preview
      try {
        const blocks = parseSmartContent(value)
        setPreviewBlocks(blocks.slice(0, 3)) // Show first 3 blocks as preview
      } catch (error) {
        setPreviewBlocks([])
      }
    } else {
      setDetectedSource(null)
      setPreviewBlocks([])
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setContent(text)
        handleContentChange(text)
        toast.success('Content pasted from clipboard')
      }
    } catch (error) {
      toast.error('Failed to access clipboard')
    }
  }

  const handleImport = async () => {
    if (!content.trim()) {
      toast.error('Please enter some content to import')
      return
    }

    setIsProcessing(true)
    
    try {
      const blocks = parseSmartContent(content)
      onImport(blocks)
      setIsOpen(false)
      setContent('')
      setDetectedSource(null)
      setPreviewBlocks([])
      toast.success(`Imported ${blocks.length} content blocks`)
    } catch (error) {
      console.error('Error importing content:', error)
      toast.error('Failed to import content')
    } finally {
      setIsProcessing(false)
    }
  }

  const getSourceIcon = (sourceName: string | null) => {
    if (!sourceName) return <FileText className="w-4 h-4" />
    
    if (sourceName.includes('AI')) return <Bot className="w-4 h-4" />
    if (sourceName.includes('Markdown')) return <FileCode className="w-4 h-4" />
    if (sourceName.includes('Web')) return <Globe className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  const getBlockTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      paragraph: 'Paragraph',
      header: 'Heading',
      list: 'List',
      quote: 'Quote',
      code: 'Code Block',
      table: 'Table',
      delimiter: 'Divider'
    }
    return labels[type] || type
  }

  const renderBlockPreview = (block: any, index: number) => {
    const { type, data } = block
    
    switch (type) {
      case 'header':
        return (
          <div key={index} className="border-l-4 border-blue-500 pl-3">
            <Badge variant="outline" className="mb-1">H{data.level}</Badge>
            <p className="font-semibold text-slate-900">{data.text}</p>
          </div>
        )
      
      case 'paragraph':
        return (
          <div key={index} className="border-l-4 border-gray-300 pl-3">
            <Badge variant="outline" className="mb-1">Paragraph</Badge>
            <p className="text-slate-700 line-clamp-2" dangerouslySetInnerHTML={{ __html: data.text }} />
          </div>
        )
      
      case 'list':
        return (
          <div key={index} className="border-l-4 border-green-500 pl-3">
            <Badge variant="outline" className="mb-1">
              {data.style === 'ordered' ? 'Numbered' : 'Bullet'} List
            </Badge>
            <ul className={data.style === 'ordered' ? 'list-decimal' : 'list-disc'} style={{ paddingLeft: '1rem' }}>
              {data.items.slice(0, 2).map((item: string, i: number) => (
                <li key={i} className="text-slate-700">{item}</li>
              ))}
              {data.items.length > 2 && (
                <li className="text-slate-500 italic">...and {data.items.length - 2} more</li>
              )}
            </ul>
          </div>
        )
      
      case 'quote':
        return (
          <div key={index} className="border-l-4 border-purple-500 pl-3">
            <Badge variant="outline" className="mb-1">Quote</Badge>
            <blockquote className="text-slate-700 italic">"{data.text}"</blockquote>
          </div>
        )
      
      case 'code':
        return (
          <div key={index} className="border-l-4 border-yellow-500 pl-3">
            <Badge variant="outline" className="mb-1">Code Block</Badge>
            <pre className="bg-gray-100 p-2 rounded text-sm text-slate-700 overflow-hidden">
              {data.code.substring(0, 100)}{data.code.length > 100 ? '...' : ''}
            </pre>
          </div>
        )
      
      default:
        return (
          <div key={index} className="border-l-4 border-gray-300 pl-3">
            <Badge variant="outline" className="mb-1">{getBlockTypeLabel(type)}</Badge>
            <p className="text-slate-500">Content block</p>
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Wand2 className="w-4 h-4" />
            Import Content
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Smart Content Import
          </DialogTitle>
          <DialogDescription>
            Import formatted content from AI tools (ChatGPT, Gemini), Microsoft Word, web pages, or Markdown files.
            The content will be automatically parsed and formatted.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Content Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Paste your content here:
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePasteFromClipboard}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                Paste from Clipboard
              </Button>
            </div>
            
            <Textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Paste your formatted content here... 

Examples:
• Copy from ChatGPT/Gemini responses
• Paste from Microsoft Word documents  
• Import from web articles
• Use Markdown formatting

The content will be automatically detected and formatted!"
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {/* Source Detection */}
          {detectedSource && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              {getSourceIcon(detectedSource)}
              <span className="text-sm font-medium text-blue-900">
                Detected source: {detectedSource}
              </span>
              <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
            </div>
          )}

          {/* Preview */}
          {previewBlocks.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Preview ({previewBlocks.length} blocks shown)
              </h4>
              <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200 max-h-60 overflow-y-auto">
                {previewBlocks.map(renderBlockPreview)}
                {parseSmartContent(content).length > 3 && (
                  <div className="text-center py-2">
                    <Badge variant="secondary">
                      +{parseSmartContent(content).length - 3} more blocks
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900 mb-2">Import Tips:</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• <strong>AI Tools:</strong> Copy entire responses including formatting</li>
                  <li>• <strong>Word Documents:</strong> Copy and paste directly from Word</li>
                  <li>• <strong>Web Content:</strong> Select and copy formatted text from websites</li>
                  <li>• <strong>Markdown:</strong> Use standard Markdown syntax for formatting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={!content.trim() || isProcessing}
            className="gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Import Content
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
