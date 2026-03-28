import { useState } from "react"
import { CreditCard, Trash2 } from "lucide-react"
import { SwipeButton } from "@repo/ui"

const variants = ["primary", "secondary", "tertiary"] as const

export default function SwipeButtonPage() {
  const [asyncLog, setAsyncLog] = useState<string[]>([])

  const logAction = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setAsyncLog((prev) => [...prev, `[${timestamp}] ${message}`])
  }

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
          Swipe Button
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          A drag-to-confirm button. Users swipe a thumb across a track to trigger
          a confirmation action, preventing accidental taps.
        </p>
      </div>

      {/* All Variants */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Variants
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-24)",
          }}
        >
          {variants.map((v) => (
            <div key={v}>
              <p
                style={{
                  fontSize: "var(--font-size-m)",
                  fontWeight: "var(--font-weight-prominent)",
                  color: "var(--text-default)",
                  marginBottom: "var(--space-8)",
                  textTransform: "capitalize",
                }}
              >
                {v}
              </p>
              <SwipeButton
                variant={v}
                onConfirm={async () => {
                  logAction(`${v} variant confirmed`)
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Disabled State */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Disabled
        </h2>
        <SwipeButton disabled text="Cannot swipe" />
      </section>

      {/* Custom Dimensions */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Custom Dimensions
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-16)",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
                marginBottom: "var(--space-8)",
              }}
            >
              Narrow (200px x 40px)
            </p>
            <SwipeButton
              width="200px"
              height="40px"
              text="Swipe"
              onConfirm={async () => {
                logAction("Narrow confirmed")
                await new Promise((r) => setTimeout(r, 600))
              }}
            />
          </div>
          <div>
            <p
              style={{
                fontSize: "var(--font-size-s)",
                color: "var(--text-subdued-1)",
                marginBottom: "var(--space-8)",
              }}
            >
              Wide (100% x 56px)
            </p>
            <SwipeButton
              width="100%"
              height="56px"
              text="Slide to unlock"
              onConfirm={async () => {
                logAction("Wide confirmed")
                await new Promise((r) => setTimeout(r, 600))
              }}
            />
          </div>
        </div>
      </section>

      {/* Async Confirm (success) */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-8)",
          }}
        >
          Async Confirm (Success)
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Simulates a 1.5 second API call that succeeds.
        </p>
        <SwipeButton
          variant="primary"
          text="Swipe to pay"
          loadingText="Processing payment..."
          confirmedText="Payment complete!"
          icon={<CreditCard style={{ width: 18, height: 18, color: "var(--primary-50)" }} />}
          onConfirm={async () => {
            logAction("Payment started")
            await new Promise((resolve) => setTimeout(resolve, 1500))
            logAction("Payment succeeded")
          }}
        />
      </section>

      {/* Async Confirm (error) */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-8)",
          }}
        >
          Async Confirm (Error)
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Simulates an API call that fails. The button resets to idle after the error.
        </p>
        <SwipeButton
          variant="secondary"
          text="Swipe to delete"
          loadingText="Deleting..."
          icon={<Trash2 style={{ width: 18, height: 18, color: "var(--secondary-50)" }} />}
          onConfirm={async () => {
            logAction("Delete attempted")
            await new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Delete failed")), 1000)
            )
          }}
        />
      </section>

      {/* Custom Text */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Custom Text
        </h2>
        <SwipeButton
          variant="tertiary"
          text="Slide to accept terms"
          confirmingText="Accepting..."
          confirmedText="Terms accepted"
          loadingText="Saving..."
          onConfirm={async () => {
            logAction("Terms accepted")
            await new Promise((r) => setTimeout(r, 800))
          }}
        />
      </section>

      {/* Action Log */}
      {asyncLog.length > 0 && (
        <section>
          <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-8)" }}>
            <h2
              style={{
                fontSize: "var(--font-size-xl)",
                fontWeight: "var(--font-weight-heading)",
                color: "var(--text-default)",
              }}
            >
              Action Log
            </h2>
            <button
              type="button"
              onClick={() => setAsyncLog([])}
              style={{
                fontSize: "var(--font-size-m)",
                color: "var(--primary-50)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: "var(--font-weight-prominent)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              Clear
            </button>
          </div>
          <div
            style={{
              backgroundColor: "var(--surface-0)",
              borderRadius: "var(--radius-12)",
              padding: "var(--space-16)",
              border: "1px solid var(--grey-40)",
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
            >
              {asyncLog.map((log, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "var(--font-size-s)",
                    color: "var(--text-subdued-1)",
                    fontFamily: "monospace",
                  }}
                >
                  {log}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
