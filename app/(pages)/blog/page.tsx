import BlogHero from './_components/blog-hero'


import BlogFeatured from './_components/blog-featured'
import BlogCategories from './_components/blog-categories'
import BlogGrid from './_components/blog-grid'

import ChatButton from '@/app/components/chat-button'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <BlogHero />
      <BlogFeatured />
      <BlogCategories />
      <BlogGrid />

      <ChatButton />
    </div>
  )
} 