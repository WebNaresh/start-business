"use client";

import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import EditorJS, { OutputData, ToolConstructable } from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { convertEditorDataMarkdownToInline } from "@/lib/editor-utils";

export interface EditorRef {
  save: () => Promise<OutputData>;
  clear: () => void;
  render: (data: OutputData) => Promise<void>;
}

interface EditorProps {
  data?: OutputData | undefined;
  onChange?: (data: OutputData) => void;
  placeholder?: string;
  showToolbar?: boolean;
  className?: string;
  isLoading: boolean; // Required prop
}

const EnhancedEditor = forwardRef<EditorRef, EditorProps>(
  ({ data, onChange, placeholder, showToolbar, className, isLoading }, ref) => {
    const editorRef = useRef<EditorJS | null>(null);
    const holderRef = useRef<HTMLDivElement>(null);
    const [isEditorReady, setIsEditorReady] = useState(false);
    const lastDataString = useRef<string>("");
    const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const changeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const editorId = useRef(
      `enhanced-editor-${Math.random().toString(36).substring(2, 11)}`
    ).current;

    const EDITOR_TOOLS = {
      code: Code,
      header: {
        class: Header as unknown as ToolConstructable,
        shortcut: "CMD+H",
        inlineToolbar: ["bold", "italic", "link"],
        config: {
          placeholder: "Enter a Header",
          levels: [2, 3, 4],
          defaultLevel: 2,
        },
      },
      paragraph: {
        class: Paragraph as unknown as ToolConstructable,
        inlineToolbar: [
          "bold",
          "italic",
          "link",
          "marker",
          "underline",
          "inlineCode",
        ],
        config: {},
      },
      inlineCode: InlineCode,
      table: Table,
      list: {
        class: List,
        inlineToolbar: ["bold", "italic", "link"],
      },
      quote: {
        class: Quote,
        inlineToolbar: ["bold", "italic", "link"],
      },
      delimiter: Delimiter,
      linkTool: {
        class: LinkTool,
        config: {
          endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/fetch_meta`,
        },
      },
      embed: Embed,
      marker: Marker,
      underline: Underline,
    };

    useImperativeHandle(ref, () => ({
      save: async () => {
        if (!editorRef.current) {
          throw new Error("Editor not initialized");
        }
        if (!isEditorReady) {
          throw new Error("Editor not ready");
        }
        return await editorRef.current.save();
      },
      clear: () => {
        if (editorRef.current && isEditorReady) {
          editorRef.current.clear();
        }
      },
      render: async (data: OutputData) => {
        if (!editorRef.current) {
          throw new Error("Editor not initialized");
        }
        if (!isEditorReady) {
          throw new Error("Editor not ready");
        }
        if (!data || !data.blocks) {
          throw new Error("Invalid data provided to render");
        }
        // Use the correct EditorJS API for rendering data
        await editorRef.current.blocks.clear();
        if (data.blocks && data.blocks.length > 0) {
          await editorRef.current.blocks.render(data);
        }
      },
    }));

    useEffect(() => {
      if (!editorRef.current && holderRef.current) {
        console.log(
          "🚀 Initializing EditorJS with element:",
          holderRef.current
        );

        try {
          // Always initialize with empty blocks to avoid race conditions
          // Data will be loaded via the data update effect
          const initialData = { blocks: [] };

          const editor = new EditorJS({
            holder: holderRef.current,
            placeholder: placeholder || "Start writing...",
            tools: EDITOR_TOOLS,
            data: initialData,
            // Global inline toolbar configuration
            inlineToolbar:
              showToolbar !== false ? ["bold", "italic", "link"] : false,
            async onChange(api, event) {
              console.log(`🚀 ~ Enhanced Editor onChange:`, event);

              // Clear any existing timeout to debounce rapid changes
              if (changeTimeoutRef.current) {
                clearTimeout(changeTimeoutRef.current);
              }

              // Debounce the onChange callback to prevent excessive updates
              changeTimeoutRef.current = setTimeout(async () => {
                try {
                  const content = await api.saver.save();
                  onChange?.(content);
                } catch (error) {
                  console.error("Error saving editor content:", error);
                }
              }, 500); // 500ms debounce for onChange
            },
            onReady: async () => {
              console.log("🚀 EditorJS is ready!");
              setIsEditorReady(true);

              // Trigger data update after editor is ready if data is available
              if (
                data &&
                data.blocks &&
                Array.isArray(data.blocks) &&
                data.blocks.length > 0 &&
                !isLoading
              ) {
                console.log("🚀 Editor ready, loading initial data:", data);
                const convertedData = convertEditorDataMarkdownToInline(data);

                // Use the correct EditorJS API for rendering data with validation
                try {
                  if (
                    editor.blocks &&
                    typeof editor.blocks.clear === "function" &&
                    typeof editor.blocks.render === "function"
                  ) {
                    await editor.blocks.clear();
                    if (
                      convertedData.blocks &&
                      convertedData.blocks.length > 0
                    ) {
                      await editor.blocks.render(convertedData);
                    }
                    console.log("✅ Successfully loaded initial data");
                  } else {
                    console.warn(
                      "⚠️ EditorJS blocks API not available during initialization"
                    );
                  }
                } catch (error) {
                  console.error("❌ Error loading initial data:", error);
                }
              } else {
                console.log(
                  "🚀 Editor ready, but no data available yet. Will wait for data update."
                );
              }
            },
          });

          editorRef.current = editor;
        } catch (error) {
          console.error("❌ Failed to initialize EditorJS:", error);
          setIsEditorReady(false);
        }
      }

      return () => {
        if (editorRef.current && editorRef.current.destroy) {
          console.log("🚀 Destroying EditorJS");
          try {
            editorRef.current.destroy();
            editorRef.current = null;
            setIsEditorReady(false);
          } catch (error) {
            console.error("❌ Error destroying EditorJS:", error);
          }
        }

        // Cleanup timeouts
        if (changeTimeoutRef.current) {
          clearTimeout(changeTimeoutRef.current);
        }
        if (renderTimeoutRef.current) {
          clearTimeout(renderTimeoutRef.current);
        }
      };
    }, []); // Only run once on mount - data loading is handled by separate useEffect

    // Handle data updates after editor initialization
    useEffect(() => {
      const renderData = async () => {
        // Comprehensive validation before attempting to render
        if (!editorRef.current) {
          console.log("⏳ Editor not initialized yet, skipping data update");
          return;
        }

        if (!isEditorReady) {
          console.log("⏳ Editor not ready yet, skipping data update");
          return;
        }

        if (isLoading) {
          console.log("⏳ Still loading, skipping data update");
          return;
        }

        if (
          !data ||
          !data.blocks ||
          !Array.isArray(data.blocks) ||
          data.blocks.length === 0
        ) {
          console.log("⏳ No valid data to render, skipping update");
          return;
        }

        // Check if data has actually changed to avoid unnecessary re-renders
        // Ignore timestamp changes by comparing only the blocks content
        const dataForComparison = data ? { blocks: data.blocks } : null;
        const currentDataString = JSON.stringify(dataForComparison);

        if (lastDataString.current === currentDataString) {
          console.log(
            "⏳ Data unchanged (ignoring timestamp), skipping update"
          );
          return;
        }

        lastDataString.current = currentDataString;

        // Additional safety check: ensure blocks API is available
        if (!editorRef.current.blocks) {
          console.warn(
            "⚠️ EditorJS blocks API not available yet, skipping render"
          );
          return;
        }

        console.log("🚀 Updating EditorJS with new data:", data);

        // Convert markdown syntax to EditorJS inline format before rendering
        const convertedData = convertEditorDataMarkdownToInline(data);

        // Use the correct EditorJS API for rendering data
        try {
          // Additional validation: ensure editor instance is valid
          if (!editorRef.current || typeof editorRef.current !== "object") {
            console.error("❌ Invalid editor instance");
            return;
          }

          // Use the correct EditorJS blocks API with proper validation
          if (
            editorRef.current.blocks &&
            typeof editorRef.current.blocks.clear === "function" &&
            typeof editorRef.current.blocks.render === "function"
          ) {
            // Modern EditorJS API (v2.x) - preferred method
            console.log("🔄 Using EditorJS blocks API");
            await editorRef.current.blocks.clear();
            if (convertedData.blocks && convertedData.blocks.length > 0) {
              await editorRef.current.blocks.render(convertedData);
            }
            console.log("✅ Successfully rendered new data using blocks API");
          } else if (typeof editorRef.current.render === "function") {
            // Legacy EditorJS API fallback
            console.log("🔄 Using legacy EditorJS render API");
            await editorRef.current.render(convertedData);
            console.log(
              "✅ Successfully rendered new data using legacy render API"
            );
          } else {
            // Editor not ready or API not available
            console.warn("⚠️ EditorJS API not ready, skipping render");
            console.log(
              "Available methods:",
              Object.getOwnPropertyNames(editorRef.current)
            );
            return;
          }
        } catch (error) {
          console.error("❌ Error rendering editor data:", error);
          // Don't throw here to prevent component crashes
        }
      };

      // Clear any existing timeout to debounce rapid updates
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }

      // Debounce the render operation to prevent infinite loops
      renderTimeoutRef.current = setTimeout(() => {
        renderData();
      }, 100); // 100ms debounce

      // Cleanup timeout on unmount
      return () => {
        if (renderTimeoutRef.current) {
          clearTimeout(renderTimeoutRef.current);
        }
      };
    }, [data, isLoading, isEditorReady]);

    // Show skeleton while loading
    if (isLoading) {
      return (
        <div
          className={`editorjs-typography-fix w-full max-w-[-webkit-fill-available] min-h-[400px] p-4 border border-slate-200 rounded-lg ${
            className || ""
          }`}
          style={{
            width: "100%",
            minHeight: "400px",
          }}
        >
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            <div className="h-4 bg-slate-200 rounded w-4/5"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-3/5"></div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={holderRef}
        id={editorId}
        className={`editorjs-typography-fix w-full max-w-[-webkit-fill-available] min-h-[400px] p-4 border border-slate-200 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 ${
          className || ""
        }`}
        style={{
          width: "100%",
          minHeight: "400px",
        }}
      />
    );
  }
);

EnhancedEditor.displayName = "EnhancedEditor";

export default EnhancedEditor;
