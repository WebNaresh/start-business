// Types for the blog system
export interface Blog {
  id: number
  title: string
  slug: string
  content?: string
  editorData: string
  excerpt?: string
  featuredImage?: string
  author: string
  publishedAt?: Date
  updatedAt: Date
  status: string
  metaTitle?: string
  metaDescription?: string
  tags?: string
}

// Export the Blog type for compatibility
export type { Blog }