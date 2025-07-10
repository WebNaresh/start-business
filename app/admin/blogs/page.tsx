"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import AdminNavigation from "@/components/admin/admin-navigation";
import { DeleteConfirmationDialog } from "@/components/ui/confirmation-dialog";
import {
  BlogStatusFilter,
  BlogStatusBadge,
  type BlogStatusFilter as BlogStatusFilterType,
} from "@/components/admin/blog-status-filter";
import { useBlogs, useDeleteBlog } from "@/hooks/use-blogs";
import type { Blog } from "@/lib/types";

export default function AdminBlogsPage() {
  // State for blog status filtering
  const [statusFilter, setStatusFilter] = useState<BlogStatusFilterType>("all");

  // State for confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    blog: Blog | null;
  }>({
    open: false,
    blog: null,
  });

  // Fetch blogs using custom hook with status filter
  const { data: blogs = [], isLoading, error } = useBlogs(statusFilter);

  // Fetch all blogs for counts (separate query)
  const { data: allBlogs = [] } = useBlogs("all");

  // Calculate blog counts for filter badges
  const blogCounts = {
    all: allBlogs.length,
    published: allBlogs.filter((blog) => blog.status === "published").length,
    draft: allBlogs.filter((blog) => blog.status === "draft").length,
  };

  // Delete mutation with optimistic updates
  const deleteMutation = useDeleteBlog();

  const handleDeleteClick = (blog: Blog) => {
    setDeleteDialog({
      open: true,
      blog,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.blog) return;

    try {
      await deleteMutation.mutateAsync(deleteDialog.blog.slug);
      // Close dialog on success
      setDeleteDialog({ open: false, blog: null });
    } catch (error) {
      // Error handling is done in the mutation hook
      // Keep dialog open on error to allow retry
      console.error("Delete failed:", error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, blog: null });
  };

  // Handle query error
  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch blogs";
    toast.error(`Failed to fetch blogs: ${errorMessage}`);
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Not published";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Admin Navigation Header */}
      <AdminNavigation />

      {/* Page Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Blog Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
            Create, edit, and manage your blog posts
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Link href="/admin/blogs/new" className="block">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 sm:h-auto text-base sm:text-sm font-medium">
              <Plus className="w-5 h-5 sm:w-4 sm:h-4 mr-2" />
              Create New Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Blog Status Filter */}
      <BlogStatusFilter
        currentFilter={statusFilter}
        onFilterChange={setStatusFilter}
        blogCounts={blogCounts}
      />

      {/* Content */}
      <div>
        {isLoading ? (
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first blog post!
            </p>
            <Link href="/admin/blogs/new">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Blog
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
            {/* Mobile Card View */}
            <div className="block sm:hidden">
              <div className="divide-y divide-slate-200">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 truncate">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {blog.slug}
                        </p>
                      </div>
                      <BlogStatusBadge status={blog.status} className="ml-3" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                      <span>by {blog.author}</span>
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                        target="_blank"
                        title="View Blog"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/blogs/${blog.slug}/edit`}
                        className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors touch-manipulation"
                        title="Edit Blog"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(blog)}
                        disabled={deleteMutation.isPending}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Blog"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Published
                    </th>
                    <th className="px-4 lg:px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 lg:px-6 py-4">
                        <div className="text-sm font-semibold text-slate-900">
                          {blog.title}
                        </div>
                        <div className="text-sm text-slate-500">
                          {blog.slug}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-slate-600 font-medium">
                        {blog.author}
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <BlogStatusBadge status={blog.status} />
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-sm text-slate-600">
                        {formatDate(blog.publishedAt)}
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/blog/${blog.slug}`}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            target="_blank"
                            title="View Blog"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/blogs/${blog.slug}/edit`}
                            className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit Blog"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(blog)}
                            disabled={deleteMutation.isPending}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete Blog"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteDialog({ open: false, blog: null });
          }
        }}
        itemName={deleteDialog.blog?.title || ""}
        itemType="Blog Post"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
