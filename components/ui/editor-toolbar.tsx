"use client"

import React from 'react'
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
  Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { uploadImage, createImageInput } from '@/lib/image-upload'

interface EditorToolbarProps {
  onInsertBlock: (blockType: string, data?: any) => void
  onToggleInline: (tool: string) => void
  className?: string
}

interface ToolbarGroup {
  id: string
  label: string
  buttons: ToolbarButton[]
}

interface ToolbarButton {
  id: string
  label: string
  icon: React.ReactNode
  action: () => void
  type: 'block' | 'inline'
  shortcut?: string
}

export default function EditorToolbar({ onInsertBlock, onToggleInline, className = "" }: EditorToolbarProps) {

  const handleImageUpload = async () => {
    const input = createImageInput(async (file) => {
      try {
        const uploadedImage = await uploadImage(file)
        onInsertBlock('image', {
          file: {
            url: uploadedImage.url
          },
          caption: '',
          withBorder: false,
          withBackground: false,
          stretched: false
        })
      } catch (error) {
        console.error('Error uploading image:', error)
        alert(error instanceof Error ? error.message : 'Failed to upload image')
      }
    })

    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
  }

  const handleLinkInsertion = () => {
    const url = prompt('Enter the URL:')
    if (url) {
      onInsertBlock('linkTool', { link: url })
    }
  }

  const toolbarGroups: ToolbarGroup[] = [
    {
      id: 'headers',
      label: 'Headers',
      buttons: [
        {
          id: 'header-1',
          label: 'Heading 1',
          icon: <Type className="w-4 h-4 font-bold" />,
          action: () => onInsertBlock('header', { text: '', level: 1 }),
          type: 'block',
          shortcut: 'Ctrl+Alt+1'
        },
        {
          id: 'header-2',
          label: 'Heading 2',
          icon: <Type className="w-3.5 h-3.5" />,
          action: () => onInsertBlock('header', { text: '', level: 2 }),
          type: 'block',
          shortcut: 'Ctrl+Alt+2'
        },
        {
          id: 'header-3',
          label: 'Heading 3',
          icon: <Type className="w-3 h-3" />,
          action: () => onInsertBlock('header', { text: '', level: 3 }),
          type: 'block',
          shortcut: 'Ctrl+Alt+3'
        }
      ]
    },
    {
      id: 'formatting',
      label: 'Format',
      buttons: [
        {
          id: 'bold',
          label: 'Bold',
          icon: <Bold className="w-4 h-4" />,
          action: () => onToggleInline('bold'),
          type: 'inline',
          shortcut: 'Ctrl+B'
        },
        {
          id: 'italic',
          label: 'Italic',
          icon: <Italic className="w-4 h-4" />,
          action: () => onToggleInline('italic'),
          type: 'inline',
          shortcut: 'Ctrl+I'
        },
        {
          id: 'underline',
          label: 'Underline',
          icon: <Underline className="w-4 h-4" />,
          action: () => onToggleInline('underline'),
          type: 'inline',
          shortcut: 'Ctrl+U'
        }
      ]
    },
    {
      id: 'lists',
      label: 'Lists',
      buttons: [
        {
          id: 'list-unordered',
          label: 'Bullet List',
          icon: <List className="w-4 h-4" />,
          action: () => onInsertBlock('list', { style: 'unordered', items: [''] }),
          type: 'block',
          shortcut: 'Ctrl+Shift+8'
        },
        {
          id: 'list-ordered',
          label: 'Numbered List',
          icon: <ListOrdered className="w-4 h-4" />,
          action: () => onInsertBlock('list', { style: 'ordered', items: [''] }),
          type: 'block',
          shortcut: 'Ctrl+Shift+7'
        }
      ]
    },
    {
      id: 'blocks',
      label: 'Blocks',
      buttons: [
        {
          id: 'quote',
          label: 'Quote',
          icon: <Quote className="w-4 h-4" />,
          action: () => onInsertBlock('quote', { text: '', caption: '' }),
          type: 'block',
          shortcut: 'Ctrl+Shift+Q'
        },
        {
          id: 'code',
          label: 'Code Block',
          icon: <Code className="w-4 h-4" />,
          action: () => onInsertBlock('code', { code: '' }),
          type: 'block',
          shortcut: 'Ctrl+Shift+C'
        },
        {
          id: 'delimiter',
          label: 'Divider',
          icon: <Minus className="w-4 h-4" />,
          action: () => onInsertBlock('delimiter'),
          type: 'block'
        },
        {
          id: 'table',
          label: 'Table',
          icon: <Table className="w-4 h-4" />,
          action: () => onInsertBlock('table', { content: [['', ''], ['', '']] }),
          type: 'block'
        }
      ]
    },
    {
      id: 'media',
      label: 'Media',
      buttons: [
        {
          id: 'link',
          label: 'Link',
          icon: <Link className="w-4 h-4" />,
          action: handleLinkInsertion,
          type: 'block',
          shortcut: 'Ctrl+K'
        },
        {
          id: 'image',
          label: 'Image',
          icon: <Image className="w-4 h-4" />,
          action: handleImageUpload,
          type: 'block'
        },
        {
          id: 'embed',
          label: 'Embed',
          icon: <Video className="w-4 h-4" />,
          action: () => onInsertBlock('embed', { service: '', source: '', embed: '', width: 580, height: 320 }),
          type: 'block'
        }
      ]
    }
  ]

  const toolbarButtons: ToolbarButton[] = toolbarGroups.flatMap(group => group.buttons)


  const renderToolbarButton = (button: ToolbarButton) => (
    <TooltipProvider key={button.id}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={button.action}
            className={`
              h-9 w-9 p-0 hover:bg-slate-100 hover:text-slate-900 transition-colors
              ${button.type === 'inline' ? 'border-r border-slate-200 last:border-r-0' : ''}
            `}
            aria-label={button.label}
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
    <div className={`editor-toolbar bg-white border border-slate-200 rounded-lg p-2 shadow-sm ${className}`}>
      {/* Desktop Toolbar */}
      <div className="hidden md:flex items-center gap-1">
        {toolbarGroups.map((group, groupIndex) => (
          <div
            key={group.id}
            className={`flex items-center ${groupIndex < toolbarGroups.length - 1 ? 'border-r border-slate-200 pr-2 mr-2' : ''}`}
          >
            <span className="text-xs text-slate-500 mr-2 font-medium">{group.label}</span>
            {group.buttons.map(renderToolbarButton)}
          </div>
        ))}
      </div>

      {/* Mobile Toolbar */}
      <div className="md:hidden">
        {/* Most Used Tools Row */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-1">
            {/* Essential formatting: H2, Bold, Italic, Bullet List */}
            {[
              toolbarGroups[0].buttons[1], // H2
              toolbarGroups[1].buttons[0], // Bold
              toolbarGroups[1].buttons[1], // Italic
              toolbarGroups[2].buttons[0]  // Bullet List
            ].map(renderToolbarButton)}
          </div>
          <div className="flex items-center gap-1">
            {/* Media tools: Link, Image */}
            {[
              toolbarGroups[4].buttons[0], // Link
              toolbarGroups[4].buttons[1]  // Image
            ].map(renderToolbarButton)}
          </div>
        </div>

        {/* Secondary Tools Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* Block tools: Quote, Code, Divider */}
            {[
              toolbarGroups[3].buttons[0], // Quote
              toolbarGroups[3].buttons[1], // Code
              toolbarGroups[3].buttons[2]  // Divider
            ].map(renderToolbarButton)}
          </div>
          <div className="flex items-center gap-1">
            {/* Additional tools: Numbered List, Table, Embed */}
            {[
              toolbarGroups[2].buttons[1], // Numbered List
              toolbarGroups[3].buttons[3], // Table
              toolbarGroups[4].buttons[2]  // Embed
            ].map(renderToolbarButton)}
          </div>
        </div>
      </div>
    </div>
  )
}
