"use client";

import React from "react";
import { OutputData } from "@editorjs/editorjs";
import { editorDataToHtml } from "@/lib/editor-utils";

interface BlogRendererProps {
  content: string;
  editorData?: string | null;
  className?: string;
  debug?: boolean;
}

export default function BlogRenderer({
  content,
  editorData,
  className = "",
  debug = false,
}: BlogRendererProps) {
  // EditorJS-ONLY approach - always use structured data
  const htmlContent = React.useMemo(() => {
    if (debug) {
      console.log("=== BlogRenderer Debug ===");
      console.log("EditorJS data available:", !!editorData);
      console.log("EditorJS data length:", editorData?.length || 0);
    }

    // ONLY use EditorJS data - this is the single source of truth
    if (editorData && editorData.trim()) {
      try {
        const parsedData: OutputData = JSON.parse(editorData);
        if (debug) {
          console.log("✅ Parsing EditorJS data (ONLY source)");
          console.log("EditorJS blocks:", parsedData.blocks?.length || 0);
          console.log(
            "Block types:",
            parsedData.blocks?.map((b) => b.type).join(", ") || "none"
          );

          // Detailed list analysis
          const listBlocks =
            parsedData.blocks?.filter((b) => b.type === "list") || [];
          console.log("📋 List blocks in EditorJS:", listBlocks.length);
          listBlocks.forEach((block, index) => {
            console.log(
              `  List ${index + 1} (${block.data?.style}):`,
              block.data?.items?.length || 0,
              "items"
            );
            if (debug && block.data?.items) {
              console.log("    Items:", block.data.items);
            }
          });
        }

        const convertedHtml = editorDataToHtml(parsedData);
        if (debug) {
          console.log("🔄 Converting EditorJS to HTML...");
          console.log("Converted HTML length:", convertedHtml.length);
          console.log(
            "📋 Lists in converted HTML:",
            (convertedHtml.match(/<ul|<ol/g) || []).length
          );
          console.log(
            "📝 List items in converted HTML:",
            (convertedHtml.match(/<li>/g) || []).length
          );
          console.log("HTML preview:", convertedHtml.substring(0, 500) + "...");
        }

        // Always return EditorJS converted content
        return convertedHtml || "<p>Content is being processed...</p>";
      } catch (error) {
        console.error("❌ Failed to parse EditorJS data:", error);
        console.log(
          "Invalid EditorData:",
          editorData?.substring(0, 200) + "..."
        );
        return "<p>Error loading content. Please try refreshing the page.</p>";
      }
    }

    // No fallback - EditorJS data is required
    if (debug) {
      console.log("❌ No EditorJS data available");
    }

    return "<p>No content available</p>";
  }, [editorData, debug]);

  // Additional debugging for final render
  React.useEffect(() => {
    if (debug) {
      console.log("=== Final Render Debug ===");
      console.log("Final HTML content length:", htmlContent.length);
      console.log(
        "Final lists count:",
        (htmlContent.match(/<ul|<ol/g) || []).length
      );
      console.log(
        "Final list items count:",
        (htmlContent.match(/<li>/g) || []).length
      );
      console.log("Final HTML preview:", htmlContent.substring(0, 300) + "...");
    }
  }, [htmlContent, debug]);

  return (
    <div
      className={`prose prose-lg max-w-none blog-content
        prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
        prose-a:no-underline hover:prose-a:underline
        ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={
        {
          // Ensure all list elements are visible with stronger CSS
          "--list-display": "block",
          "--list-visibility": "visible",
          "--list-opacity": "1",
        } as React.CSSProperties
      }
    />
  );
}

// Additional component for read-only EditorJS display
interface EditorReadOnlyProps {
  data: OutputData;
  className?: string;
}

export function EditorReadOnly({ data, className = "" }: EditorReadOnlyProps) {
  const htmlContent = React.useMemo(() => {
    return editorDataToHtml(data);
  }, [data]);

  return (
    <div
      className={`prose prose-lg max-w-none blog-content
        prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
        prose-a:no-underline hover:prose-a:underline
        ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={
        {
          // Ensure all list elements are visible
          "--list-display": "block",
          "--list-visibility": "visible",
          "--list-opacity": "1",
        } as React.CSSProperties
      }
    />
  );
}
