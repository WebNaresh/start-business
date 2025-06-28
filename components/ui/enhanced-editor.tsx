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
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface EditorRef {
  save: () => Promise<OutputData>;
  clear: () => void;
  render: (data: OutputData) => Promise<void>;
}

interface EditorProps {
  data?: OutputData;
  onChange?: (data: OutputData) => void;
  placeholder?: string;
  showToolbar?: boolean;
  className?: string;
}

const EnhancedEditor = forwardRef<EditorRef, EditorProps>(
  ({ data, onChange, placeholder, showToolbar, className }, ref) => {
    const editorRef = useRef<EditorJS | null>(null);
    const holderRef = useRef<HTMLDivElement>(null);
    const editorId = useRef(
      `enhanced-editor-${Math.random().toString(36).substring(2, 11)}`
    ).current;

    const EDITOR_TOOLS = {
      code: Code,
      header: {
        class: Header as unknown as ToolConstructable,
        shortcut: "CMD+H",
        inlineToolbar: true,
        config: {
          placeholder: "Enter a Header",
          levels: [2, 3, 4],
          defaultLevel: 2,
        },
      },
      paragraph: {
        class: Paragraph as unknown as ToolConstructable,
        inlineToolbar: true,
        config: {},
      },
      inlineCode: InlineCode,
      table: Table,
      list: List,
      quote: Quote,
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
        if (editorRef.current) {
          return await editorRef.current.save();
        }
        throw new Error("Editor not initialized");
      },
      clear: () => {
        if (editorRef.current) {
          editorRef.current.clear();
        }
      },
      render: async (data: OutputData) => {
        if (editorRef.current) {
          await editorRef.current.render(data);
        }
      },
    }));

    useEffect(() => {
      if (!editorRef.current && holderRef.current) {
        console.log(
          "🚀 Initializing EditorJS with element:",
          holderRef.current
        );

        const editor = new EditorJS({
          holder: holderRef.current,
          placeholder: placeholder || "Start writing...",
          tools: EDITOR_TOOLS,
          data: data || { blocks: [] },
          async onChange(api, event) {
            console.log(`🚀 ~ Enhanced Editor onChange:`, event);
            try {
              const content = await api.saver.save();
              onChange?.(content);
            } catch (error) {
              console.error("Error saving editor content:", error);
            }
          },
          onReady: () => {
            console.log("🚀 EditorJS is ready!");
          },
        });

        editorRef.current = editor;
      }

      return () => {
        if (editorRef.current && editorRef.current.destroy) {
          console.log("🚀 Destroying EditorJS");
          editorRef.current.destroy();
          editorRef.current = null;
        }
      };
    }, []);

    return (
      <div
        ref={holderRef}
        id={editorId}
        className={`editorjs-typography-fix w-full min-h-[400px] p-4 border border-slate-200 rounded-lg focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 ${
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
