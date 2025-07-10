import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Blog } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import BlogDetailClient from "./blog-detail-client";

async function getBlogPostDirect(slug: string): Promise<Blog | null> {
  try {
    console.log("Fetching blog from database:", slug);

    const blog = await prisma.blog.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        editorData: true,
        excerpt: true,
        featuredImage: true,
        author: true,
        publishedAt: true,
        updatedAt: true,
        status: true,
        metaTitle: true,
        metaDescription: true,
        tags: true,
      },
    });

    if (blog) {
      console.log("Blog found:", blog.title);
    } else {
      console.log("Blog not found for slug:", slug);
    }

    return blog;
  } catch (error) {
    console.error("Error fetching blog post from database:", error);
    // Return null instead of throwing to prevent crashes
    return null;
  }
}

async function getBlogPost(slug: string): Promise<Blog | null> {
  // Always use direct database query for SSR reliability
  // This prevents AggregateError and network issues during server-side rendering
  console.log("Using direct database query for blog:", slug);
  return await getBlogPostDirect(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const blogPost = await getBlogPost(resolvedParams.slug);

    if (!blogPost) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const title = blogPost.metaTitle || blogPost.title;
    const description =
      blogPost.metaDescription ||
      blogPost.excerpt ||
      `Read ${blogPost.title} by ${blogPost.author}`;
    const url = `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/blog/${blogPost.slug}`;
    const imageUrl = blogPost.featuredImage || "/placeholder.svg";

    return {
      title,
      description,
      keywords: blogPost.tags
        ?.split(",")
        .map((tag) => tag.trim())
        .join(", "),
      authors: [{ name: blogPost.author }],
      openGraph: {
        title,
        description,
        url,
        siteName: "Your Business Blog",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blogPost.title,
          },
        ],
        locale: "en_US",
        type: "article",
        publishedTime: blogPost.publishedAt
          ? new Date(blogPost.publishedAt).toISOString()
          : new Date().toISOString(),
        modifiedTime: blogPost.updatedAt
          ? new Date(blogPost.updatedAt).toISOString()
          : new Date().toISOString(),
        authors: [blogPost.author],
        tags: blogPost.tags?.split(",").map((tag) => tag.trim()),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: url,
      },
      robots: {
        index: blogPost.status === "published",
        follow: blogPost.status === "published",
      },
    };
  } catch (error) {
    console.error("Error generating metadata for blog post:", error);
    return {
      title: "Blog Post Error",
      description: "An error occurred while loading the blog post.",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const resolvedParams = await params;
    const blogPost = await getBlogPost(resolvedParams.slug);

    if (!blogPost) {
      console.log("Blog post not found, returning 404");
      notFound();
    }

    return <BlogDetailClient blogPost={blogPost} />;
  } catch (error) {
    console.error("Error in BlogPostPage:", error);
    // Return 404 instead of crashing
    notFound();
  }
}
