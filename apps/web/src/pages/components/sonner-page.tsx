import { toast } from "sonner"
import { Button } from "@repo/ui"

export default function SonnerPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
          }}
        >
          Sonner
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Toast notifications that follow the design system theme.
        </p>
      </div>

      {/* Basic Toasts */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Basic Types
        </p>
        <div className="flex flex-wrap" style={{ gap: "var(--space-8)" }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
              })
            }
          >
            Default
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Changes saved successfully")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.error("Something went wrong")}
          >
            Error
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.warning("Please review before continuing")}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info("New update available")}
          >
            Info
          </Button>
        </div>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-12)",
          }}
        >
          Default, success, error, warning, and info toast variants.
        </p>
      </div>

      {/* With Description */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          With Description
        </p>
        <div className="flex flex-wrap" style={{ gap: "var(--space-8)" }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.success("File uploaded", {
                description: "report-2024.pdf has been uploaded to your documents.",
              })
            }
          >
            Success with description
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.error("Upload failed", {
                description: "The file exceeds the 25MB size limit. Please compress and try again.",
              })
            }
          >
            Error with description
          </Button>
        </div>
      </div>

      {/* With Actions */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          With Actions
        </p>
        <div className="flex flex-wrap" style={{ gap: "var(--space-8)" }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast("Item deleted", {
                description: "The item has been moved to trash.",
                action: {
                  label: "Undo",
                  onClick: () => toast.success("Item restored"),
                },
              })
            }
          >
            With undo action
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast("New message from Alex", {
                description: "Hey, can you review the PR?",
                action: {
                  label: "View",
                  onClick: () => toast.info("Opening message..."),
                },
                cancel: {
                  label: "Dismiss",
                  onClick: () => {},
                },
              })
            }
          >
            Action + Cancel
          </Button>
        </div>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-12)",
          }}
        >
          Toasts with action and cancel buttons for user interaction.
        </p>
      </div>

      {/* Promise Toast */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Promise / Loading
        </p>
        <div className="flex flex-wrap" style={{ gap: "var(--space-8)" }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.promise(
                new Promise<{ name: string }>((resolve) =>
                  setTimeout(() => resolve({ name: "report-2024.pdf" }), 2000)
                ),
                {
                  loading: "Uploading file...",
                  success: (data) => `${data.name} uploaded successfully`,
                  error: "Upload failed",
                }
              )
            }}
          >
            Promise (success)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.promise(
                new Promise((_, reject) =>
                  setTimeout(() => reject(new Error("timeout")), 2000)
                ),
                {
                  loading: "Connecting to server...",
                  success: "Connected!",
                  error: "Connection timed out",
                }
              )
            }}
          >
            Promise (error)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.loading("Processing your request...")}
          >
            Loading
          </Button>
        </div>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-12)",
          }}
        >
          Async toasts that update state based on promise resolution.
        </p>
      </div>

      {/* Positioning & Duration */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Custom Duration
        </p>
        <div className="flex flex-wrap" style={{ gap: "var(--space-8)" }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast("Quick notification", { duration: 1500 })
            }
          >
            1.5s duration
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast("This will stay longer", {
                description: "You have 10 seconds to read this.",
                duration: 10000,
              })
            }
          >
            10s duration
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast("Persistent toast", {
                duration: Infinity,
                action: {
                  label: "Got it",
                  onClick: () => {},
                },
              })
            }
          >
            Persistent
          </Button>
        </div>
      </div>

      {/* Rich Content */}
      <div
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Stacking
        </p>
        <div className="flex flex-wrap" style={{ gap: "var(--space-8)" }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast("First notification")
              setTimeout(() => toast.success("Second notification"), 300)
              setTimeout(() => toast.info("Third notification"), 600)
            }}
          >
            Show 3 toasts
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.dismiss()}
          >
            Dismiss all
          </Button>
        </div>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-12)",
          }}
        >
          Multiple toasts stack and can be dismissed together.
        </p>
      </div>
    </div>
  )
}
