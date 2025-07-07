import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Blog } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import BlogDetailClient from "./blog-detail-client";
import axios from "axios";

async function getBlogPostDirect(slug: string): Promise<Blog | null> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog post from database:", error);
    return null;
  }
}

async function getBlogPost(slug: string): Promise<Blog | null> {
  // In production, use direct database query for better reliability
  if (process.env.NODE_ENV === "production") {
    console.log("Production mode: Using direct database query");
    return await getBlogPostDirect(slug);
  }

  try {
    // Development mode: try API first, fallback to database
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/blogs/${slug}`;
    console.log("Fetching blog from:", url);

    const response = await axios.get(url);

    if (!response.data) {
      console.error(
        `Failed to fetch blog via API: ${response.status} ${response.statusText}`
      );
      return await getBlogPostDirect(slug);
    }

    const data = await response.data;
    console.log("Blog data received:", data.title);
    return data;
  } catch (error) {
    console.error("Error fetching blog post via API:", error);
    return await getBlogPostDirect(slug);
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const blogPost = await getBlogPost(resolvedParams.slug);

  if (!blogPost) {
    notFound();
  }

  return <BlogDetailClient blogPost={blogPost} />;
}
