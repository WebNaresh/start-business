"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useBlogs, useDeleteBlog } from "@/hooks/use-blogs"
import { DeleteConfirmationDialog } from "@/components/ui/confirmation-dialog"
import type { Blog } from "@/lib/types"

/**
 * Debug component to test blog deletion timing
 * This component helps verify that:
 * 1. Optimistic updates work immediately
 * 2. Query invalidation only happens after successful API response
 * 3. Error rollback works correctly
 * 4. No duplicate blogs appear due to timing issues
 */
export function BlogDeleteTest() {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    blog: Blog | null;
  }>({
    open: false,
    blog: null,
  });

  const { data: blogs = [], isLoading, error } = useBlogs();
  const deleteMutation = useDeleteBlog();

  const handleDeleteClick = (blog: Blog) => {
    console.log('🎯 Delete button clicked for blog:', blog.title);
    setDeleteDialog({
      open: true,
      blog,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.blog) return;
    
    console.log('✅ Delete confirmed for blog:', deleteDialog.blog.title);
    
    try {
      await deleteMutation.mutateAsync(deleteDialog.blog.slug);
      console.log('🎉 Delete mutation completed successfully');
      setDeleteDialog({ open: false, blog: null });
    } catch (error) {
      console.error('❌ Delete mutation failed:', error);
      // Keep dialog open on error to allow retry
    }
  };

  const handleDeleteCancel = () => {
    console.log('❌ Delete cancelled');
    setDeleteDialog({ open: false, blog: null });
  };

  if (isLoading) {
    return <div className="p-4">Loading blogs for delete test...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error loading blogs: {error.message}</div>;
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Blog Delete Test Component</h3>
      <p className="text-sm text-gray-600 mb-4">
        This component tests the blog deletion timing fix. Check the console for detailed logs.
      </p>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Blogs ({blogs.length}):</p>
        {blogs.length === 0 ? (
          <p className="text-sm text-gray-500">No blogs available</p>
        ) : (
          blogs.slice(0, 5).map((blog) => (
            <div key={blog.id} className="flex items-center justify-between p-2 bg-white rounded border">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{blog.title}</p>
                <p className="text-xs text-gray-500">{blog.slug}</p>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDeleteClick(blog)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
        <p className="font-medium">Test Steps:</p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Click delete on any blog</li>
          <li>Confirm deletion in dialog</li>
          <li>Watch console logs for timing</li>
          <li>Verify blog disappears and stays gone</li>
        </ol>
      </div>

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
