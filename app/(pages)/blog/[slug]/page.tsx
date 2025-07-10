import BlogPostClient from "./blog-post-client";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Export metadata generation function from server component
export { generateMetadata } from "./metadata";

// Default export: Server component that renders the client component
export default function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPostClient params={params} />;
}
