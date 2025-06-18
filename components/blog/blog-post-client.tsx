"use client"

import { useState } from 'react'
import { Share2, Bookmark, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import WhatsAppCTAButton from "@/components/whatsapp-cta-button"
import RelatedPosts from "@/components/blog/related-posts"
import type { Blog } from '@/lib/types'

interface BlogPostClientProps {
  blogPost: Blog
}

export default function BlogPostClient({ blogPost }: BlogPostClientProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt || blogPost.title,
          url: window.location.href,
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    // Here you could implement actual save functionality
    // For now, just toggle the state
  }

  const handleDiscuss = () => {
    // Scroll to comments section or open discussion
    const commentsSection = document.getElementById('comments')
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Tags */}
      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {blogPost.tags?.split(',').map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors cursor-pointer"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Share and Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Button 
          variant="outline" 
          className="gap-2" 
          onClick={handleShare}
          disabled={isSharing}
        >
          <Share2 className="w-4 h-4" />
          {isSharing ? 'Sharing...' : 'Share Article'}
        </Button>
        <Button 
          variant="outline" 
          className={`gap-2 ${isSaved ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}`}
          onClick={handleSave}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          {isSaved ? 'Saved' : 'Save for Later'}
        </Button>
        <Button variant="outline" className="gap-2" onClick={handleDiscuss}>
          <MessageSquare className="w-4 h-4" />
          Discuss
        </Button>
      </div>

      {/* Sidebar Components */}
      <div className="lg:hidden mt-12">
        {/* Mobile Related Posts */}
        <RelatedPosts currentPost={blogPost} className="mb-6" />
        
        {/* Mobile Author Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-600">
                {blogPost.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{blogPost.author}</h4>
              <p className="text-sm text-gray-600">Author</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Expert in business registration and compliance with over 10 years of experience helping
            entrepreneurs start their businesses.
          </p>
        </div>

        {/* Mobile CTA Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Need Expert Guidance?</h3>
          <p className="text-gray-600 mb-6 text-sm">
            Our business consultants can help you navigate the registration process and ensure compliance with
            all requirements.
          </p>
          <WhatsAppCTAButton className="w-full justify-center">Get Free Consultation</WhatsAppCTAButton>
        </div>
      </div>
    </>
  )
}

// Desktop Sidebar Component
export function BlogPostSidebar({ blogPost }: BlogPostClientProps) {
  return (
    <div className="hidden lg:block lg:col-span-4">
      <div className="sticky top-24 space-y-6">
        {/* Related Posts */}
        <RelatedPosts currentPost={blogPost} />

        {/* Author Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-600">
                {blogPost.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{blogPost.author}</h4>
              <p className="text-sm text-gray-600">Author</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Expert in business registration and compliance with over 10 years of experience helping
            entrepreneurs start their businesses.
          </p>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Need Expert Guidance?</h3>
          <p className="text-gray-600 mb-6 text-sm">
            Our business consultants can help you navigate the registration process and ensure compliance with
            all requirements.
          </p>
          <WhatsAppCTAButton className="w-full justify-center">Get Free Consultation</WhatsAppCTAButton>
        </div>
      </div>
    </div>
  )
}
