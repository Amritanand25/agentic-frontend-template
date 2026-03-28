import { Rocket } from "lucide-react"
import { notify, notifyPromise, Button } from "@repo/ui"

export default function NotificationNudgePage() {
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
          Notification Nudge
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          An imperative toast notification system with variant styles, progress bars, and action buttons.
        </p>
      </div>

      {/* ─── Variant demos ────────────────────────────────────────── */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Variants
        </h2>
        <div className="flex flex-wrap items-start" style={{ gap: "var(--space-12)" }}>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                title: "New update available",
                description: "Version 2.4.0 includes performance improvements and bug fixes.",
                variant: "info",
              })
            }
          >
            Info
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              notify({
                title: "Changes saved successfully",
                description: "Your profile has been updated.",
                variant: "success",
              })
            }
          >
            Success
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              notify({
                title: "Failed to save changes",
                description: "An unexpected error occurred. Please try again.",
                variant: "error",
              })
            }
          >
            Error
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              notify({
                title: "Processing your request...",
                description: "This may take a few seconds.",
                variant: "loading",
                duration: 3000,
              })
            }
          >
            Loading
          </Button>
        </div>
      </section>

      {/* ─── With progress bar ────────────────────────────────────── */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          With Progress Bar
        </h2>
        <div className="flex flex-wrap items-start" style={{ gap: "var(--space-12)" }}>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                title: "Downloading file...",
                description: "report-2024-q3.pdf",
                variant: "info",
                showProgressBar: true,
                duration: 5000,
              })
            }
          >
            Info + Progress
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              notify({
                title: "Upload complete!",
                variant: "success",
                showProgressBar: true,
                duration: 4000,
              })
            }
          >
            Success + Progress
          </Button>
        </div>
      </section>

      {/* ─── With actions ─────────────────────────────────────────── */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          With Action Buttons
        </h2>
        <div className="flex flex-wrap items-start" style={{ gap: "var(--space-12)" }}>
          <Button
            variant="outline"
            onClick={() =>
              notify({
                title: "Message sent",
                description: "Your message has been delivered.",
                variant: "success",
                showActions: true,
                primaryAction: {
                  label: "Undo",
                  onClick: () => {
                    notify({ title: "Message unsent", variant: "info", duration: 2000 })
                  },
                },
                secondaryAction: {
                  label: "View",
                  onClick: () => {
                    notify({ title: "Opening conversation...", variant: "info", duration: 2000 })
                  },
                },
                duration: 8000,
              })
            }
          >
            With Actions
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              notify({
                title: "Connection lost",
                description: "Check your internet connection.",
                variant: "error",
                showActions: true,
                primaryAction: {
                  label: "Retry",
                  onClick: () => {
                    notify({ title: "Reconnecting...", variant: "loading", duration: 2000 })
                  },
                },
                duration: null,
              })
            }
          >
            Error + Retry (Persistent)
          </Button>
        </div>
      </section>

      {/* ─── Promise demo ─────────────────────────────────────────── */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Promise-based
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-12)",
          }}
        >
          Uses <code style={{ fontSize: "var(--font-size-s)", backgroundColor: "var(--surface-20)", padding: "2px 6px", borderRadius: "var(--radius-4)" }}>notifyPromise()</code> to automatically transition between loading, success, and error states.
        </p>
        <div className="flex flex-wrap items-start" style={{ gap: "var(--space-12)" }}>
          <Button
            variant="outline"
            onClick={() => {
              const p = new Promise<string>((resolve) =>
                setTimeout(() => resolve("Done!"), 2500),
              )
              notifyPromise(p, {
                loading: "Saving changes...",
                success: "All changes saved!",
                error: "Failed to save",
              })
            }}
          >
            Promise (Success)
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              const p = new Promise<string>((_, reject) =>
                setTimeout(() => reject(new Error("Network error")), 2000),
              )
              notifyPromise(p, {
                loading: "Deploying to production...",
                success: "Deployed successfully!",
                error: (err) =>
                  `Deploy failed: ${err instanceof Error ? err.message : "Unknown error"}`,
              })
            }}
          >
            Promise (Failure)
          </Button>
        </div>
      </section>

      {/* ─── Custom icon ──────────────────────────────────────────── */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Custom Icon
        </h2>
        <Button
          variant="outline"
          onClick={() =>
            notify({
              title: "Deployed to production!",
              description: "v2.4.0 is now live.",
              variant: "success",
              customIcon: <Rocket size={20} style={{ color: "#ffffff" }} />,
              showProgressBar: true,
              duration: 5000,
            })
          }
        >
          Custom Icon Toast
        </Button>
      </section>
    </div>
  )
}
