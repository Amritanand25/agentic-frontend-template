import { useState, useCallback } from "react"
import { FileUpload, type FileWithStatus } from "@repo/ui"
// Simulate an upload with a progress timer
function simulateUpload(
  _name: string,
  setFiles: React.Dispatch<React.SetStateAction<FileWithStatus[]>>,
  idx: number,
  shouldFail = false,
) {
  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 25 + 5
    if (progress >= 100) {
      clearInterval(interval)
      setFiles((prev) =>
        prev.map((f, i) =>
          i === idx
            ? {
                ...f,
                progress: 100,
                validationStatus: shouldFail ? "failed" : "uploaded",
                validationText: shouldFail ? "Upload failed. Please retry." : "Upload complete",
              }
            : f,
        ),
      )
    } else {
      setFiles((prev) =>
        prev.map((f, i) => (i === idx ? { ...f, progress: Math.round(progress) } : f)),
      )
    }
  }, 300)
}

export default function FileUploadPage() {
  // ─── Vertical demo state ────────────────────────────────────────
  const [vertFiles, setVertFiles] = useState<FileWithStatus[]>([
    {
      file: new File([""], "quarterly-report.pdf", { type: "application/pdf" }),
      validationStatus: "uploading",
      progress: 45,
      validationText: "Uploading...",
    },
    {
      file: new File(["x".repeat(2_300_000)], "financial-summary.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      validationStatus: "uploaded",
      validationText: "Upload complete",
    },
    {
      file: new File(["x".repeat(890_000)], "contract-draft.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }),
      validationStatus: "failed",
      validationText: "Upload failed. Please retry.",
    },
  ])

  const handleVertAdd = useCallback(
    (incoming: File[]) => {
      const startIdx = vertFiles.length
      const newEntries: FileWithStatus[] = incoming.map((f) => ({
        file: f,
        validationStatus: "uploading" as const,
        progress: 0,
        validationText: "Uploading...",
      }))
      setVertFiles((prev) => [...prev, ...newEntries])
      newEntries.forEach((_, i) => {
        simulateUpload(incoming[i].name, setVertFiles, startIdx + i)
      })
    },
    [vertFiles.length],
  )

  const handleVertRemove = useCallback((idx: number) => {
    setVertFiles((prev) => prev.filter((_, i) => i !== idx))
  }, [])

  const handleVertRetry = useCallback((idx: number) => {
    setVertFiles((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, validationStatus: "uploading", progress: 0, validationText: "Uploading..." } : f,
      ),
    )
    simulateUpload("", setVertFiles, idx)
  }, [])

  // ─── Horizontal demo state ─────────────────────────────────────
  const [horizFiles, setHorizFiles] = useState<FileWithStatus[]>([])

  const handleHorizAdd = useCallback(
    (incoming: File[]) => {
      const startIdx = horizFiles.length
      const newEntries: FileWithStatus[] = incoming.map((f) => ({
        file: f,
        validationStatus: "uploading" as const,
        progress: 0,
        validationText: "Uploading...",
      }))
      setHorizFiles((prev) => [...prev, ...newEntries])
      newEntries.forEach((_, i) => {
        simulateUpload(incoming[i].name, setHorizFiles, startIdx + i)
      })
    },
    [horizFiles.length],
  )

  const handleHorizRemove = useCallback((idx: number) => {
    setHorizFiles((prev) => prev.filter((_, i) => i !== idx))
  }, [])

  const handleHorizRetry = useCallback((idx: number) => {
    setHorizFiles((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, validationStatus: "uploading", progress: 0, validationText: "Uploading..." } : f,
      ),
    )
    simulateUpload("", setHorizFiles, idx)
  }, [])

  // ─── Single upload demo state ──────────────────────────────────
  const [singleFiles, setSingleFiles] = useState<FileWithStatus[]>([])

  const handleSingleAdd = useCallback((incoming: File[]) => {
    const newEntries: FileWithStatus[] = incoming.map((f) => ({
      file: f,
      validationStatus: "uploading" as const,
      progress: 0,
      validationText: "Uploading...",
    }))
    setSingleFiles(newEntries)
    newEntries.forEach((_, i) => {
      simulateUpload(incoming[i].name, setSingleFiles, i)
    })
  }, [])

  const handleSingleRemove = useCallback(() => {
    setSingleFiles([])
  }, [])

  const handleSingleRetry = useCallback((idx: number) => {
    setSingleFiles((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, validationStatus: "uploading", progress: 0, validationText: "Uploading..." } : f,
      ),
    )
    simulateUpload("", setSingleFiles, idx)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          File Upload
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          A drag-and-drop file upload component with progress tracking and validation states.
        </p>
      </div>

      {/* ─── Vertical Layout ──────────────────────────────────────── */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Vertical Layout (default)
        </h2>
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-16)",
            padding: "var(--space-24)",
            maxWidth: 520,
          }}
        >
          <FileUpload
            layout="vertical"
            files={vertFiles}
            onFileChange={handleVertAdd}
            onRemoveFile={handleVertRemove}
            onRetry={handleVertRetry}
          />
        </div>
      </section>

      {/* ─── Horizontal Layout ────────────────────────────────────── */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Horizontal Layout
        </h2>
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-16)",
            padding: "var(--space-24)",
            maxWidth: 520,
          }}
        >
          <FileUpload
            layout="horizontal"
            files={horizFiles}
            onFileChange={handleHorizAdd}
            onRemoveFile={handleHorizRemove}
            onRetry={handleHorizRetry}
          />
        </div>
      </section>

      {/* ─── Single Upload Mode ───────────────────────────────────── */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Single Upload Mode
        </h2>
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-16)",
            padding: "var(--space-24)",
            maxWidth: 520,
          }}
        >
          <FileUpload
            uploadMode="single"
            files={singleFiles}
            onFileChange={handleSingleAdd}
            onRemoveFile={handleSingleRemove}
            onRetry={handleSingleRetry}
          />
        </div>
      </section>

      {/* ─── Disabled State ───────────────────────────────────────── */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Disabled State
        </h2>
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-16)",
            padding: "var(--space-24)",
            maxWidth: 520,
          }}
        >
          <FileUpload disabled />
        </div>
      </section>

      {/* ─── With Errors ──────────────────────────────────────────── */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          With Errors
        </h2>
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-16)",
            padding: "var(--space-24)",
            maxWidth: 520,
          }}
        >
          <FileUpload
            errors={["File exceeds maximum size of 5 MB", "Only .pdf and .docx files are allowed"]}
          />
        </div>
      </section>
    </div>
  )
}
