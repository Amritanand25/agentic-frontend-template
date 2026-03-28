import * as React from "react"
import { CloudUpload, FileText, CheckCircle, XCircle, X, RotateCcw } from "lucide-react"
import { cn } from "@repo/utils"
import { Button } from "./button.tsx"

// ─── Types ───────────────────────────────────────────────────────────
export interface FileWithStatus {
  file: File
  validationStatus: "uploading" | "uploaded" | "failed"
  progress?: number
  validationText?: string
}

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  files?: FileWithStatus[]
  onFileChange?: (files: File[]) => void
  onRemoveFile?: (index: number) => void
  onRetry?: (index: number) => void
  layout?: "vertical" | "horizontal"
  uploadMode?: "single" | "multi"
  titleText?: string
  otherText?: string
  maxSize?: number
  allowedFileTypes?: string[]
  maxFileCount?: number
  disabled?: boolean
  errors?: string | string[]
}

// ─── Helpers ─────────────────────────────────────────────────────────
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

function getFileExtension(name: string): string {
  const idx = name.lastIndexOf(".")
  return idx >= 0 ? name.slice(idx).toLowerCase() : ""
}

// ─── FileUpload ──────────────────────────────────────────────────────
const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      files = [],
      onFileChange,
      onRemoveFile,
      onRetry,
      layout = "vertical",
      uploadMode = "multi",
      titleText,
      otherText,
      maxSize = 5 * 1024 * 1024,
      allowedFileTypes = [".pdf", ".doc", ".docx", ".xls", ".xlsx"],
      maxFileCount,
      disabled = false,
      errors,
      ...props
    },
    ref,
  ) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const dragCounterRef = React.useRef(0)

    const isSingleMode = uploadMode === "single"
    const hasFile = files.length > 0
    const hideDropzone = isSingleMode && hasFile

    // Resolve error array
    const errorList: string[] = errors
      ? Array.isArray(errors)
        ? errors
        : [errors]
      : []

    // Validate & forward files
    const handleFiles = React.useCallback(
      (incoming: FileList | File[]) => {
        if (disabled) return
        const arr = Array.from(incoming)
        const valid: File[] = []

        for (const f of arr) {
          const ext = getFileExtension(f.name)
          if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(ext)) continue
          if (f.size > maxSize) continue
          valid.push(f)
        }

        if (isSingleMode && valid.length > 0) {
          onFileChange?.([valid[0]])
          return
        }

        if (maxFileCount !== undefined) {
          const remaining = maxFileCount - files.length
          onFileChange?.(valid.slice(0, Math.max(0, remaining)))
        } else {
          onFileChange?.(valid)
        }
      },
      [disabled, allowedFileTypes, maxSize, isSingleMode, maxFileCount, files.length, onFileChange],
    )

    // Drag handlers
    const handleDragOver = React.useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }, [])

    const handleDragEnter = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (disabled) return
        dragCounterRef.current += 1
        if (dragCounterRef.current === 1) setIsDragging(true)
      },
      [disabled],
    )

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounterRef.current -= 1
      if (dragCounterRef.current <= 0) {
        dragCounterRef.current = 0
        setIsDragging(false)
      }
    }, [])

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounterRef.current = 0
        setIsDragging(false)
        if (disabled) return
        if (e.dataTransfer.files.length > 0) {
          handleFiles(e.dataTransfer.files)
        }
      },
      [disabled, handleFiles],
    )

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFiles(e.target.files)
        }
        e.target.value = ""
      },
      [handleFiles],
    )

    const openPicker = React.useCallback(() => {
      if (disabled) return
      inputRef.current?.click()
    }, [disabled])

    // Build accept string for the hidden input
    const acceptStr = allowedFileTypes.length > 0 ? allowedFileTypes.join(",") : undefined

    // ─── Render ────────────────────────────────────────────────────
    return (
      <div ref={ref} className={cn("flex flex-col", className)} style={{ gap: "var(--space-12)" }} {...props}>
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={acceptStr}
          multiple={!isSingleMode}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* ─── Dropzone ─────────────────────────────────────────── */}
        {!hideDropzone && (
          <div
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${isDragging ? "var(--primary-50)" : "var(--grey-40)"}`,
              borderRadius: "var(--radius-12)",
              backgroundColor: isDragging
                ? "var(--primary-10)"
                : disabled
                  ? "var(--surface-20)"
                  : "var(--surface-0)",
              padding: layout === "vertical" ? "var(--space-32)" : "var(--space-16) var(--space-24)",
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "not-allowed" : "pointer",
              transition: "border-color 150ms ease, background-color 150ms ease",
            }}
            onClick={openPicker}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                openPicker()
              }
            }}
            aria-label="File upload dropzone"
          >
            {layout === "vertical" ? (
              /* Vertical layout */
              <div className="flex flex-col items-center" style={{ gap: "var(--space-12)" }}>
                <CloudUpload
                  size={40}
                  style={{ color: isDragging ? "var(--primary-50)" : "var(--text-subdued-2)" }}
                />
                <p
                  style={{
                    fontSize: "var(--font-size-m)",
                    fontWeight: "var(--font-weight-prominent)",
                    color: "var(--text-default)",
                    textAlign: "center",
                  }}
                >
                  {titleText || "Drag and drop your files here"}
                </p>
                <p
                  style={{
                    fontSize: "var(--font-size-s)",
                    color: "var(--text-subdued-1)",
                    textAlign: "center",
                  }}
                >
                  {otherText ||
                    `Supported: ${allowedFileTypes.join(", ")} (max ${formatFileSize(maxSize)})`}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    openPicker()
                  }}
                  disabled={disabled}
                  style={{ marginTop: "var(--space-4)" }}
                >
                  Upload File
                </Button>
              </div>
            ) : (
              /* Horizontal layout */
              <div className="flex items-center" style={{ gap: "var(--space-16)" }}>
                <CloudUpload
                  size={24}
                  style={{ color: isDragging ? "var(--primary-50)" : "var(--text-subdued-2)", flexShrink: 0 }}
                />
                <p
                  className="flex-1"
                  style={{
                    fontSize: "var(--font-size-m)",
                    color: "var(--text-subdued-1)",
                  }}
                >
                  {titleText || "Upload or drag and drop your file here"}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    openPicker()
                  }}
                  disabled={disabled}
                >
                  Browse
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ─── Single mode compact upload button (when file present) */}
        {isSingleMode && hasFile && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openPicker}
            disabled={disabled}
          >
            <CloudUpload size={14} />
            Replace File
          </Button>
        )}

        {/* ─── Error messages ─────────────────────────────────────── */}
        {errorList.length > 0 && (
          <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
            {errorList.map((err, i) => (
              <p
                key={i}
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--error-50)",
                }}
              >
                {err}
              </p>
            ))}
          </div>
        )}

        {/* ─── File list ──────────────────────────────────────────── */}
        {files.length > 0 && (
          <div className="flex flex-col" style={{ gap: "var(--space-8)" }}>
            {files.map((f, idx) => (
              <FileItem
                key={`${f.file.name}-${idx}`}
                fileWithStatus={f}
                onRemove={() => onRemoveFile?.(idx)}
                onRetry={() => onRetry?.(idx)}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
)
FileUpload.displayName = "FileUpload"

// ─── FileItem (internal) ─────────────────────────────────────────────
function FileItem({
  fileWithStatus,
  onRemove,
  onRetry,
}: {
  fileWithStatus: FileWithStatus
  onRemove: () => void
  onRetry: () => void
}) {
  const { file, validationStatus, progress = 0, validationText } = fileWithStatus

  return (
    <div
      className="flex items-center"
      style={{
        gap: "var(--space-12)",
        padding: "var(--space-12)",
        borderRadius: "var(--radius-8)",
        backgroundColor: "var(--surface-0)",
        border: `1px solid ${
          validationStatus === "failed" ? "var(--error-50)" : "var(--grey-40)"
        }`,
      }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 36,
          height: 36,
          borderRadius: "var(--radius-8)",
          backgroundColor:
            validationStatus === "failed"
              ? "var(--error-20)"
              : validationStatus === "uploaded"
                ? "var(--success-20)"
                : "var(--primary-10)",
        }}
      >
        <FileText
          size={18}
          style={{
            color:
              validationStatus === "failed"
                ? "var(--error-50)"
                : validationStatus === "uploaded"
                  ? "var(--success-50)"
                  : "var(--primary-50)",
          }}
        />
      </div>

      {/* Info + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
          <p
            className="truncate"
            style={{
              fontSize: "var(--font-size-m)",
              fontWeight: "var(--font-weight-prominent)",
              color: "var(--text-default)",
            }}
          >
            {file.name}
          </p>
          <span
            className="shrink-0"
            style={{
              fontSize: "var(--font-size-s)",
              color: "var(--text-subdued-2)",
            }}
          >
            {formatFileSize(file.size)}
          </span>
        </div>

        {/* Uploading progress bar */}
        {validationStatus === "uploading" && (
          <div
            style={{
              marginTop: "var(--space-8)",
              height: 4,
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--grey-20)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, Math.max(0, progress))}%`,
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--primary-50)",
                transition: "width 200ms ease",
              }}
            />
          </div>
        )}

        {/* Validation text */}
        {validationText && (
          <p
            style={{
              fontSize: "var(--font-size-s)",
              color:
                validationStatus === "failed"
                  ? "var(--error-50)"
                  : validationStatus === "uploaded"
                    ? "var(--success-50)"
                    : "var(--text-subdued-1)",
              marginTop: "var(--space-4)",
            }}
          >
            {validationText}
          </p>
        )}
      </div>

      {/* Status / actions */}
      <div className="flex items-center shrink-0" style={{ gap: "var(--space-8)" }}>
        {validationStatus === "uploaded" && (
          <CheckCircle size={18} style={{ color: "var(--success-50)" }} />
        )}
        {validationStatus === "failed" && (
          <>
            <XCircle size={18} style={{ color: "var(--error-50)" }} />
            <button
              type="button"
              onClick={onRetry}
              className="flex items-center justify-center cursor-pointer"
              style={{
                width: 28,
                height: 28,
                borderRadius: "var(--radius-full)",
                border: "none",
                backgroundColor: "transparent",
                color: "var(--primary-50)",
              }}
              aria-label="Retry upload"
            >
              <RotateCcw size={14} />
            </button>
          </>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center cursor-pointer"
          style={{
            width: 28,
            height: 28,
            borderRadius: "var(--radius-full)",
            border: "none",
            backgroundColor: "transparent",
            color: "var(--text-subdued-2)",
          }}
          aria-label="Remove file"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

export { FileUpload }
