'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Sparkles, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface GeneratedContent {
  title: string
  editorData: string // EditorJS JSON data
  excerpt: string
  metaTitle: string
  metaDescription: string
  tags: string
  slug: string
}

interface AIContentGeneratorProps {
  onContentGenerated: (content: GeneratedContent) => void
  disabled?: boolean
}

export default function AIContentGenerator({ onContentGenerated, disabled = false }: AIContentGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [businessFocus, setBusinessFocus] = useState('general business')
  const [contentLength, setContentLength] = useState('medium')
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastGenerated, setLastGenerated] = useState<GeneratedContent | null>(null)
  const [error, setError] = useState<string | null>(null)

  const businessFocusOptions = [
    { value: 'general business', label: 'General Business' },
    { value: 'business registration', label: 'Business Registration' },
    { value: 'compliance', label: 'Compliance & Legal' },
    { value: 'startup', label: 'Startup & Entrepreneurship' },
    { value: 'taxation', label: 'Business Taxation' },
    { value: 'licensing', label: 'Licensing & Permits' },
    { value: 'business growth', label: 'Business Growth' },
    { value: 'digital business', label: 'Digital Business' }
  ]

  const contentLengthOptions = [
    {
      value: 'short',
      label: 'Short (800-1,200 characters)',
      description: 'Quick read, perfect for social media or brief updates',
      characters: '800-1,200'
    },
    {
      value: 'medium',
      label: 'Medium (1,500-2,500 characters)',
      description: 'Standard blog post length, good for most topics',
      characters: '1,500-2,500'
    },
    {
      value: 'long',
      label: 'Long (3,000-4,500 characters)',
      description: 'Comprehensive guide, detailed explanations',
      characters: '3,000-4,500'
    },
    {
      value: 'extra-long',
      label: 'Extra Long (5,000-7,000 characters)',
      description: 'In-depth article, complete resource guide',
      characters: '5,000-7,000'
    },
    {
      value: 'custom',
      label: 'Custom Length',
      description: 'Specify exact character count',
      characters: 'Custom'
    }
  ]

  const [customLength, setCustomLength] = useState(2000)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a content prompt')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Calculate target character count
      let targetLength = 2000 // default
      if (contentLength === 'short') targetLength = 1000
      else if (contentLength === 'medium') targetLength = 2000
      else if (contentLength === 'long') targetLength = 3750
      else if (contentLength === 'extra-long') targetLength = 6000
      else if (contentLength === 'custom') targetLength = customLength

      const response = await fetch('/api/generate-blog-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          businessFocus,
          contentLength: contentLength,
          targetCharacters: targetLength
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate content')
      }

      if (result.success && result.content) {
        setLastGenerated(result.content)
        onContentGenerated(result.content)
        toast.success('Blog content generated successfully!')
        
        // Show usage info if available
        if (result.usage) {
          console.log('OpenAI Usage:', result.usage)
        }
      } else {
        throw new Error('Invalid response from AI service')
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('AI generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = () => {
    if (lastGenerated) {
      handleGenerate()
    }
  }

  const handleUseGenerated = () => {
    if (lastGenerated) {
      onContentGenerated(lastGenerated)
      toast.success('Generated content applied to form!')
    }
  }

  return (
    <Card className="w-full border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Sparkles className="h-5 w-5" />
          AI Content Generator
        </CardTitle>
        <p className="text-sm text-gray-600">
          Generate comprehensive blog content using AI. Describe your topic and let AI create professional, 
          SEO-optimized content for your business blog.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Content Prompt */}
        <div className="space-y-2">
          <Label htmlFor="ai-prompt" className="text-sm font-medium">
            Content Topic/Prompt *
          </Label>
          <Textarea
            id="ai-prompt"
            placeholder="e.g., 'How to register a private limited company in India' or 'Benefits of GST registration for small businesses'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={disabled || isGenerating}
            rows={3}
            className="resize-none"
          />
          <p className="text-xs text-gray-500">
            Be specific about your topic. The AI will create comprehensive content based on your prompt.
          </p>
        </div>

        {/* Business Focus */}
        <div className="space-y-2">
          <Label htmlFor="business-focus" className="text-sm font-medium">
            Business Focus Area
          </Label>
          <select
            id="business-focus"
            value={businessFocus}
            onChange={(e) => setBusinessFocus(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {businessFocusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Content Length */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Content Length
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {contentLengthOptions.map((option) => (
              <div key={option.value} className="relative">
                <input
                  type="radio"
                  id={`length-${option.value}`}
                  name="contentLength"
                  value={option.value}
                  checked={contentLength === option.value}
                  onChange={(e) => setContentLength(e.target.value)}
                  disabled={disabled || isGenerating}
                  className="sr-only"
                />
                <label
                  htmlFor={`length-${option.value}`}
                  className={`block p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    contentLength === option.value
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${disabled || isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">
                        {option.label}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {option.description}
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      contentLength === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {contentLength === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          {/* Custom Length Input */}
          {contentLength === 'custom' && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Label htmlFor="custom-length" className="text-sm font-medium text-blue-800">
                Custom Character Count
              </Label>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="number"
                  id="custom-length"
                  value={customLength}
                  onChange={(e) => setCustomLength(Math.max(500, Math.min(10000, parseInt(e.target.value) || 2000)))}
                  disabled={disabled || isGenerating}
                  min="500"
                  max="10000"
                  step="100"
                  className="w-32 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-sm text-blue-700">characters</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Range: 500 - 10,000 characters (recommended: 1,000 - 5,000)
              </p>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="flex gap-2">
          <Button
            onClick={handleGenerate}
            disabled={disabled || isGenerating || !prompt.trim()}
            className="flex-1"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Blog Content
              </>
            )}
          </Button>

          {lastGenerated && (
            <Button
              onClick={handleRegenerate}
              disabled={disabled || isGenerating}
              variant="outline"
              aria-label="Regenerate content"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Display */}
        {lastGenerated && !error && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-700" />
            <AlertDescription className="text-green-800">
              <div className="space-y-2">
                <p className="font-medium">Content generated successfully!</p>
                <div className="text-sm space-y-1">
                  <p><strong>Title:</strong> {lastGenerated.title}</p>
                  <div className="flex items-center gap-4">
                    <p><strong>Content Length:</strong> {lastGenerated.editorData?.length?.toLocaleString() || 'N/A'} characters (EditorJS JSON)</p>
                    {(() => {
                      const targetLength = contentLength === 'custom' ? customLength :
                        contentLength === 'short' ? 1000 :
                        contentLength === 'medium' ? 2000 :
                        contentLength === 'long' ? 3750 :
                        contentLength === 'extra-long' ? 6000 : 2000;
                      const editorDataLength = lastGenerated.editorData?.length || 0;
                      const difference = Math.abs(editorDataLength - targetLength);
                      const isOnTarget = difference <= 200;

                      return (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          isOnTarget ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {isOnTarget ? '✓ Target achieved' : `±${difference} chars from target`}
                        </span>
                      );
                    })()}
                  </div>
                  <p><strong>Tags:</strong> {lastGenerated.tags}</p>
                </div>
                <Button
                  onClick={handleUseGenerated}
                  size="sm"
                  className="mt-2"
                >
                  Apply to Form
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Loading Progress */}
        {isGenerating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Generating content with AI...</span>
              <span>This may take 10-30 seconds</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Analyzing your prompt and business focus</p>
              <p>• Generating SEO-optimized title and content</p>
              <p>• Creating {contentLength === 'custom' ? customLength :
                contentLength === 'short' ? '1,000' :
                contentLength === 'medium' ? '2,000' :
                contentLength === 'long' ? '3,750' :
                contentLength === 'extra-long' ? '6,000' : '2,000'} character content</p>
              <p>• Creating meta descriptions and tags</p>
              <p>• Formatting content for your blog</p>
            </div>
          </div>
        )}

        {/* Usage Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Tips for Better Results:</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Be specific about your topic (e.g., "GST registration process" vs "taxes")</li>
            <li>• Mention your target audience if relevant (e.g., "for small businesses")</li>
            <li>• Include specific aspects you want covered</li>
            <li>• You can always edit the generated content before publishing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
