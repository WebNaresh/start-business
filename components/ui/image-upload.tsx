"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImageUrl?: string;
  className?: string;
  disabled?: boolean;
  maxSizeText?: string;
}

export default function ImageUpload({
  onImageUploaded,
  currentImageUrl,
  className,
  disabled = false,
  maxSizeText = "Max 5MB • JPEG, PNG, WebP",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (file: File) => {
      if (disabled) return;

      setError(null);
      setIsUploading(true);
      setUploadProgress(0);

      try {
        // Create preview
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);

        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 200);

        // Upload file
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("/api/upload/image", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Upload failed");
        }

        const result = await response.json();

        if (result.success && result.imageUrl) {
          onImageUploaded(result.imageUrl);
          setPreviewUrl(result.imageUrl);

          // Clean up object URL
          if (preview.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
          }
        } else {
          throw new Error(result.error || "Upload failed");
        }
      } catch (err) {
        console.error("Upload error:", err);
        setError(err instanceof Error ? err.message : "Upload failed");
        setPreviewUrl(currentImageUrl || null);
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [disabled, onImageUploaded, currentImageUrl]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        handleFileSelect(files[0]);
      }
    },
    [disabled, handleFileSelect]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleRemoveImage = useCallback(() => {
    setPreviewUrl(null);
    setError(null);
    onImageUploaded("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onImageUploaded]);

  const openFileDialog = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-all duration-200",
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:border-gray-400",
          previewUrl ? "border-solid border-gray-200" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={previewUrl ? undefined : openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />

        {previewUrl ? (
          // Image Preview
          <div className="relative group">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openFileDialog();
                  }}
                  disabled={disabled || isUploading}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Replace
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  disabled={disabled || isUploading}
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>

            {/* Upload progress overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-white/90 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium mb-2">Uploading...</p>
                  <Progress value={uploadProgress} className="w-32" />
                </div>
              </div>
            )}
          </div>
        ) : (
          // Upload Area
          <div className="p-8 text-center">
            {isUploading ? (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
                <div>
                  <p className="text-lg font-medium">Uploading image...</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Please wait while we process your image
                  </p>
                  <Progress value={uploadProgress} className="w-48 mx-auto" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium">Upload featured image</p>
                  <p className="text-sm text-gray-500">
                    Drag and drop or click to select
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{maxSizeText}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openFileDialog();
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Message */}
      {previewUrl && !isUploading && !error && (
        <Alert className="mt-4 border-green-200 bg-green-50">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Image uploaded successfully!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
