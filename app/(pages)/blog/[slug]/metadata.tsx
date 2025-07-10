import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    
    // Fetch blog data for metadata generation
    const blogPost = await prisma.blog.findUnique({
      where: { slug: resolvedParams.slug },
      select: {
        title: true,
        slug: true,
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
        .map((tag: string) => tag.trim())
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
        tags: blogPost.tags?.split(",").map((tag: string) => tag.trim()),
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
