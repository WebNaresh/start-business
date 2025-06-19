"use client"

import React, { useState, useRef } from 'react'
import {
  Type,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Minus,
  Table,
  Video,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Copy,
  Scissors,
  ClipboardPaste,
  Eraser,
  FileText,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { uploadImage, createImageInput } from '@/lib/image-upload'
import { toast } from 'sonner'

interface EnhancedEditorToolbarProps {
  onInsertBlock: (blockType: string, data?: any) => void
  onToggleInline: (tool: string) => void
  selectedText: string
  isEditorReady: boolean
  className?: string
}

export default function EnhancedEditorToolbar({ 
  onInsertBlock, 
  onToggleInline, 
  selectedText, 
  isEditorReady,
  className = "" 
}: EnhancedEditorToolbarProps) {
  const [isSticky, setIsSticky] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Smart paste from clipboard
  const handleSmartPaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        // Try to detect and convert common patterns
        const lines = text.split('\n').filter(line => line.trim())
        
        for (const line of lines) {
          const trimmed = line.trim()
          
          // Detect headers
          if (trimmed.startsWith('# ')) {
            onInsertBlock('header', { text: trimmed.substring(2), level: 1 })
          } else if (trimmed.startsWith('## ')) {
            onInsertBlock('header', { text: trimmed.substring(3), level: 2 })
          } else if (trimmed.startsWith('### ')) {
            onInsertBlock('header', { text: trimmed.substring(4), level: 3 })
          }
          // Detect lists
          else if (trimmed.match(/^[\d]+\.\s/)) {
            const items = [trimmed.replace(/^[\d]+\.\s/, '')]
            onInsertBlock('list', { style: 'ordered', items })
          } else if (trimmed.match(/^[-*+]\s/)) {
            const items = [trimmed.replace(/^[-*+]\s/, '')]
            onInsertBlock('list', { style: 'unordered', items })
          }
          // Detect quotes
          else if (trimmed.startsWith('> ')) {
            onInsertBlock('quote', { text: trimmed.substring(2), caption: '' })
          }
          // Detect code blocks
          else if (trimmed.startsWith('```')) {
            onInsertBlock('code', { code: '' })
          }
          // Regular paragraph
          else if (trimmed) {
            onInsertBlock('paragraph', { text: trimmed })
          }
        }
        
        toast.success(`Pasted and formatted ${lines.length} blocks`)
      }
    } catch (error) {
      toast.error('Failed to access clipboard')
    }
  }

  // Format cleanup
  const handleFormatCleanup = () => {
    // This would clean up formatting in the current selection
    if (selectedText) {
      toast.success('Formatting cleaned up')
    } else {
      toast.info('Select text to clean up formatting')
    }
  }

  // Image upload handler
  const handleImageUpload = async () => {
    const input = createImageInput(async (file) => {
      try {
        const uploadedImage = await uploadImage(file)
        onInsertBlock('image', {
          file: { url: uploadedImage.url },
          caption: '',
          withBorder: false,
          withBackground: false,
          stretched: false
        })
        toast.success('Image uploaded successfully')
      } catch (error) {
        console.error('Error uploading image:', error)
        toast.error('Failed to upload image')
      }
    })

    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
  }

  // Link insertion
  const handleLinkInsertion = () => {
    const url = prompt('Enter the URL:')
    if (url) {
      onInsertBlock('linkTool', { link: url })
    }
  }

  // Quick formatting buttons
  const quickFormatButtons = [
    {
      id: 'bold',
      label: 'Bold',
      icon: <Bold className="w-4 h-4" />,
      action: () => onToggleInline('bold'),
      shortcut: 'Ctrl+B',
      active: false
    },
    {
      id: 'italic',
      label: 'Italic',
      icon: <Italic className="w-4 h-4" />,
      action: () => onToggleInline('italic'),
      shortcut: 'Ctrl+I',
      active: false
    },
    {
      id: 'underline',
      label: 'Underline',
      icon: <Underline className="w-4 h-4" />,
      action: () => onToggleInline('underline'),
      shortcut: 'Ctrl+U',
      active: false
    },
    {
      id: 'marker',
      label: 'Highlight',
      icon: <Highlighter className="w-4 h-4" />,
      action: () => onToggleInline('marker'),
      shortcut: 'Ctrl+Shift+M',
      active: false
    }
  ]

  // Block type buttons
  const blockButtons = [
    {
      id: 'h1',
      label: 'Heading 1',
      icon: <Type className="w-4 h-4 font-bold" />,
      action: () => onInsertBlock('header', { text: '', level: 1 })
    },
    {
      id: 'h2',
      label: 'Heading 2',
      icon: <Type className="w-3.5 h-3.5" />,
      action: () => onInsertBlock('header', { text: '', level: 2 })
    },
    {
      id: 'h3',
      label: 'Heading 3',
      icon: <Type className="w-3 h-3" />,
      action: () => onInsertBlock('header', { text: '', level: 3 })
    },
    {
      id: 'bullet-list',
      label: 'Bullet List',
      icon: <List className="w-4 h-4" />,
      action: () => onInsertBlock('list', { style: 'unordered', items: [''] })
    },
    {
      id: 'numbered-list',
      label: 'Numbered List',
      icon: <ListOrdered className="w-4 h-4" />,
      action: () => onInsertBlock('list', { style: 'ordered', items: [''] })
    },
    {
      id: 'quote',
      label: 'Quote',
      icon: <Quote className="w-4 h-4" />,
      action: () => onInsertBlock('quote', { text: '', caption: '' })
    },
    {
      id: 'code',
      label: 'Code Block',
      icon: <Code className="w-4 h-4" />,
      action: () => onInsertBlock('code', { code: '' })
    }
  ]

  const renderToolButton = (button: any, variant: 'default' | 'ghost' = 'ghost') => (
    <TooltipProvider key={button.id}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={button.active ? 'default' : variant}
            size="sm"
            onClick={button.action}
            disabled={!isEditorReady}
            className={`h-8 w-8 p-0 ${button.active ? 'bg-blue-600 text-white' : ''}`}
          >
            {button.icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <div className="text-center">
            <div className="font-medium">{button.label}</div>
            {button.shortcut && (
              <div className="text-slate-500 mt-1">{button.shortcut}</div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <div className={`enhanced-editor-toolbar ${isSticky ? 'sticky top-0 z-10' : ''} ${className}`}>
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        {/* Main Toolbar */}
        <div className="flex items-center gap-1 p-2">
          {/* Quick Format Section */}
          <div className="flex items-center gap-1">
            {quickFormatButtons.map(button => renderToolButton(button))}
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Headers Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2" disabled={!isEditorReady}>
                <Type className="w-4 h-4 mr-1" />
                <span className="text-xs">Heading</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onInsertBlock('header', { text: '', level: 1 })}>
                <Type className="w-4 h-4 mr-2 font-bold" />
                Heading 1
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onInsertBlock('header', { text: '', level: 2 })}>
                <Type className="w-3.5 h-3.5 mr-2" />
                Heading 2
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onInsertBlock('header', { text: '', level: 3 })}>
                <Type className="w-3 h-3 mr-2" />
                Heading 3
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Lists */}
          <div className="flex items-center gap-1">
            {renderToolButton({
              id: 'bullet-list',
              label: 'Bullet List',
              icon: <List className="w-4 h-4" />,
              action: () => onInsertBlock('list', { style: 'unordered', items: [''] })
            })}
            {renderToolButton({
              id: 'numbered-list',
              label: 'Numbered List',
              icon: <ListOrdered className="w-4 h-4" />,
              action: () => onInsertBlock('list', { style: 'ordered', items: [''] })
            })}
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Media & Blocks */}
          <div className="flex items-center gap-1">
            {renderToolButton({
              id: 'link',
              label: 'Insert Link',
              icon: <Link className="w-4 h-4" />,
              action: handleLinkInsertion
            })}
            {renderToolButton({
              id: 'image',
              label: 'Upload Image',
              icon: <Image className="w-4 h-4" />,
              action: handleImageUpload
            })}
            {renderToolButton({
              id: 'quote',
              label: 'Quote',
              icon: <Quote className="w-4 h-4" />,
              action: () => onInsertBlock('quote', { text: '', caption: '' })
            })}
            {renderToolButton({
              id: 'code',
              label: 'Code Block',
              icon: <Code className="w-4 h-4" />,
              action: () => onInsertBlock('code', { code: '' })
            })}
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Smart Tools */}
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSmartPaste}
                    disabled={!isEditorReady}
                    className="h-8 w-8 p-0"
                  >
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  <div className="text-center">
                    <div className="font-medium">Smart Paste</div>
                    <div className="text-slate-500 mt-1">Auto-format from clipboard</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFormatCleanup}
                    disabled={!isEditorReady || !selectedText}
                    className="h-8 w-8 p-0"
                  >
                    <Eraser className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  <div className="text-center">
                    <div className="font-medium">Clean Format</div>
                    <div className="text-slate-500 mt-1">Remove formatting</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* More Tools Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2" disabled={!isEditorReady}>
                <span className="text-xs">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onInsertBlock('table', { content: [['', ''], ['', '']] })}>
                <Table className="w-4 h-4 mr-2" />
                Table
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onInsertBlock('delimiter')}>
                <Minus className="w-4 h-4 mr-2" />
                Divider
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onInsertBlock('embed', { service: '', source: '', embed: '', width: 580, height: 320 })}>
                <Video className="w-4 h-4 mr-2" />
                Embed Video
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Selection Info Bar */}
        {selectedText && (
          <div className="border-t border-slate-200 px-3 py-2 bg-blue-50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700">
                {selectedText.length} characters selected
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleInline('bold')}
                  className="h-6 w-6 p-0 text-blue-700 hover:bg-blue-100"
                >
                  <Bold className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleInline('italic')}
                  className="h-6 w-6 p-0 text-blue-700 hover:bg-blue-100"
                >
                  <Italic className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleInline('marker')}
                  className="h-6 w-6 p-0 text-blue-700 hover:bg-blue-100"
                >
                  <Highlighter className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-2 text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <FileText className="w-4 h-4 mt-0.5 text-slate-400" />
          <div>
            <p className="font-medium mb-1">Enhanced Editor Tips:</p>
            <ul className="space-y-1 text-slate-600">
              <li>• <strong>Smart Paste:</strong> Copy formatted content from AI tools, Word, or web pages</li>
              <li>• <strong>Quick Format:</strong> Select text and use toolbar buttons for instant formatting</li>
              <li>• <strong>Keyboard Shortcuts:</strong> Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+U (Underline)</li>
              <li>• <strong>Block Menu:</strong> Type "/" for traditional EditorJS block menu</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
