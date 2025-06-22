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
  content: string
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

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a content prompt')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/generate-blog-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          businessFocus
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
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="space-y-2">
                <p className="font-medium">Content generated successfully!</p>
                <div className="text-sm space-y-1">
                  <p><strong>Title:</strong> {lastGenerated.title}</p>
                  <p><strong>Content Length:</strong> {lastGenerated.content.length} characters</p>
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
