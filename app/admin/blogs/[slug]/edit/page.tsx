"use client";

import { useEffect, use as usePromise } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import BlogForm from "@/components/blog/blog-form";
import type { Blog } from "@/lib/types";
import AdminNavigation from "@/components/admin/admin-navigation";
import { useBlog, useUpdateBlog } from "@/hooks/use-blogs";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = usePromise(params) as { slug: string };

  // Fetch blog data using custom hook
  const { data: blogData, isLoading, error } = useBlog(slug);

  // Update blog mutation
  const updateMutation = useUpdateBlog();

  // Handle error
  useEffect(() => {
    if (error) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to fetch blog");
      router.push("/admin/blogs");
    }
  }, [error, router]);

  // Prepare blog data with defaults
  const blog = blogData
    ? {
        ...blogData,
        metaTitle: blogData.metaTitle || "",
        metaDescription: blogData.metaDescription || "",
        excerpt: blogData.excerpt || "",
        content: blogData.content || "",
        editorData: blogData.editorData || "",
      }
    : undefined;

  const handleSubmit = async (blogData: Partial<Blog>) => {
    try {
      await updateMutation.mutateAsync({ slug, data: blogData });
      router.push("/admin/blogs");
    } catch (error) {
      // Error handling is done in the mutation hook
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Admin Navigation Header */}
        <AdminNavigation />

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="space-y-8">
        {/* Admin Navigation Header */}
        <AdminNavigation />

        <div className="text-center py-8">
          <p className="text-red-600">Blog not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Admin Navigation Header */}
      <AdminNavigation />

      {/* Page Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
        <Link href="/admin/blogs" className="w-full sm:w-auto">
          <Button
            variant="ghost"
            size="sm"
            className="w-full sm:w-auto flex items-center justify-center sm:justify-start space-x-2 h-12 sm:h-auto text-base sm:text-sm"
          >
            <ArrowLeft className="w-5 h-5 sm:w-4 sm:h-4" />
            <span>Back to Blogs</span>
          </Button>
        </Link>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Edit Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
            Update your blog post content and settings
          </p>
        </div>
      </div>

      {/* Blog Form */}
      <BlogForm
        slug={slug}
        isEditing={true}
        onSubmit={handleSubmit}
        initialData={blog}
        isLoadingInitialData={isLoading}
      />
    </div>
  );
}
