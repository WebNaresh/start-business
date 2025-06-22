"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  Keyboard,
  Mouse,
  Smartphone
} from 'lucide-react'

export default function EditorDemo() {
  const [activeDemo, setActiveDemo] = useState<'desktop' | 'mobile'>('desktop')

  const toolbarFeatures = [
    {
      group: 'Headers',
      color: 'bg-blue-100 text-blue-800',
      tools: [
        { icon: <Type className="w-4 h-4 font-bold" />, name: 'H1', shortcut: 'Ctrl+Alt+1' },
        { icon: <Type className="w-3.5 h-3.5" />, name: 'H2', shortcut: 'Ctrl+Alt+2' },
        { icon: <Type className="w-3 h-3" />, name: 'H3', shortcut: 'Ctrl+Alt+3' }
      ]
    },
    {
      group: 'Format',
      color: 'bg-green-100 text-green-800',
      tools: [
        { icon: <Bold className="w-4 h-4" />, name: 'Bold', shortcut: 'Ctrl+B' },
        { icon: <Italic className="w-4 h-4" />, name: 'Italic', shortcut: 'Ctrl+I' },
        { icon: <Underline className="w-4 h-4" />, name: 'Underline', shortcut: 'Ctrl+U' }
      ]
    },
    {
      group: 'Lists',
      color: 'bg-purple-100 text-purple-800',
      tools: [
        { icon: <List className="w-4 h-4" />, name: 'Bullets', shortcut: 'Ctrl+Shift+8' },
        { icon: <ListOrdered className="w-4 h-4" />, name: 'Numbers', shortcut: 'Ctrl+Shift+7' }
      ]
    },
    {
      group: 'Blocks',
      color: 'bg-orange-100 text-orange-800',
      tools: [
        { icon: <Quote className="w-4 h-4" />, name: 'Quote', shortcut: 'Ctrl+Shift+Q' },
        { icon: <Code className="w-4 h-4" />, name: 'Code', shortcut: 'Ctrl+Shift+C' },
        { icon: <Minus className="w-4 h-4" />, name: 'Divider', shortcut: '' },
        { icon: <Table className="w-4 h-4" />, name: 'Table', shortcut: '' }
      ]
    },
    {
      group: 'Media',
      color: 'bg-red-100 text-red-800',
      tools: [
        { icon: <Link className="w-4 h-4" />, name: 'Link', shortcut: 'Ctrl+K' },
        { icon: <Image className="w-4 h-4" />, name: 'Image', shortcut: '' },
        { icon: <Video className="w-4 h-4" />, name: 'Embed', shortcut: '' }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enhanced Blog Editor Toolbar</h2>
        <p className="text-gray-600">
          Persistent formatting toolbar with visual access to all EditorJS tools
        </p>
      </div>

      {/* Demo Toggle */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setActiveDemo('desktop')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeDemo === 'desktop' 
              ? 'bg-blue-100 text-blue-800 border border-blue-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Mouse className="w-4 h-4" />
          Desktop View
        </button>
        <button
          onClick={() => setActiveDemo('mobile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeDemo === 'mobile' 
              ? 'bg-blue-100 text-blue-800 border border-blue-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          Mobile View
        </button>
      </div>

      {/* Desktop Demo */}
      {activeDemo === 'desktop' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mouse className="w-5 h-5" />
              Desktop Toolbar Layout
            </CardTitle>
            <CardDescription>
              Full toolbar with all formatting options organized by function
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Simulated Desktop Toolbar */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm mb-4">
              <div className="flex items-center gap-1">
                {toolbarFeatures.map((group, groupIndex) => (
                  <div 
                    key={group.group}
                    className={`flex items-center ${groupIndex < toolbarFeatures.length - 1 ? 'border-r border-slate-200 pr-3 mr-3' : ''}`}
                  >
                    <span className="text-xs text-slate-500 mr-2 font-medium">{group.group}</span>
                    {group.tools.map((tool, toolIndex) => (
                      <button
                        key={toolIndex}
                        className="h-8 w-8 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center"
                        title={`${tool.name}${tool.shortcut ? ` (${tool.shortcut})` : ''}`}
                      >
                        {tool.icon}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {toolbarFeatures.map((group) => (
                <div key={group.group} className="space-y-2">
                  <Badge className={group.color}>{group.group}</Badge>
                  <div className="space-y-1">
                    {group.tools.map((tool, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {tool.icon}
                          <span>{tool.name}</span>
                        </div>
                        {tool.shortcut && (
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {tool.shortcut}
                          </code>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mobile Demo */}
      {activeDemo === 'mobile' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Mobile Toolbar Layout
            </CardTitle>
            <CardDescription>
              Compact two-row layout optimized for touch devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Simulated Mobile Toolbar */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm mb-4 max-w-sm mx-auto">
              {/* Row 1: Essential Tools */}
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-1">
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <Type className="w-3.5 h-3.5" />
                  </button>
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <Bold className="w-4 h-4" />
                  </button>
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <Link className="w-4 h-4" />
                  </button>
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <Image className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Row 2: Secondary Tools */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <Quote className="w-4 h-4" />
                  </button>
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <Code className="w-4 h-4" />
                  </button>
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <ListOrdered className="w-4 h-4" />
                  </button>
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <Table className="w-4 h-4" />
                  </button>
                  <button className="h-9 w-9 p-0 hover:bg-slate-100 rounded transition-colors flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Features */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Mobile Optimizations</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Touch-friendly button sizes (36px minimum)</li>
                  <li>• Two-row compact layout</li>
                  <li>• Essential tools prioritized in top row</li>
                  <li>• Hidden group labels to save space</li>
                  <li>• Responsive spacing and positioning</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Accessibility</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Keyboard navigation support</li>
                  <li>• Screen reader compatible</li>
                  <li>• High contrast mode support</li>
                  <li>• Reduced motion preferences respected</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Key Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Mouse className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Visual Interface</h4>
              <p className="text-sm text-gray-600">
                No need to remember keyboard shortcuts or hunt for the "/" menu
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Type className="w-6 h-6 text-green-700" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Faster Creation</h4>
              <p className="text-sm text-gray-600">
                Immediate access to all formatting options speeds up content creation
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Mobile Friendly</h4>
              <p className="text-sm text-gray-600">
                Optimized layout works perfectly on all device sizes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
