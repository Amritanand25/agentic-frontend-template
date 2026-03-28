import { useState } from "react"
import { Flame } from "lucide-react"
import { ErrorState, Button } from "@repo/ui"

const variants = [
  "generic",
  "network",
  "server",
  "not-found",
  "timeout",
  "permission",
] as const

const sizes = ["sm", "md", "lg"] as const

export default function ErrorStatePage() {
  const [retryLog, setRetryLog] = useState<string[]>([])

  const simulateRetry = async () => {
    const timestamp = new Date().toLocaleTimeString()
    setRetryLog((prev) => [...prev, `Retry attempted at ${timestamp}`])
    // Simulate a failing operation
    await new Promise((_, reject) => setTimeout(() => reject(new Error("fail")), 800))
  }

  const simulateSuccess = async () => {
    const timestamp = new Date().toLocaleTimeString()
    setRetryLog((prev) => [...prev, `Success at ${timestamp}`])
    await new Promise((resolve) => setTimeout(resolve, 800))
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
          Error State
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Error display component with built-in retry logic, multiple variants,
          and configurable recovery actions.
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
          className="grid md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "var(--space-16)" }}
        >
          {variants.map((v) => (
            <div
              key={v}
              style={{
                backgroundColor: "var(--surface-0)",
                borderRadius: "var(--radius-16)",
                border: "1px solid var(--grey-40)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "var(--space-8) var(--space-16)",
                  backgroundColor: "var(--surface-20)",
                  borderBottom: "1px solid var(--grey-40)",
                }}
              >
                <p
                  style={{
                    fontSize: "var(--font-size-s)",
                    fontWeight: "var(--font-weight-prominent)",
                    color: "var(--text-subdued-1)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {v}
                </p>
              </div>
              <ErrorState variant={v} size="sm" />
            </div>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Sizes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)" }}>
          {sizes.map((s) => (
            <div
              key={s}
              style={{
                backgroundColor: "var(--surface-0)",
                borderRadius: "var(--radius-16)",
                border: "1px solid var(--grey-40)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "var(--space-8) var(--space-16)",
                  backgroundColor: "var(--surface-20)",
                  borderBottom: "1px solid var(--grey-40)",
                }}
              >
                <p
                  style={{
                    fontSize: "var(--font-size-s)",
                    fontWeight: "var(--font-weight-prominent)",
                    color: "var(--text-subdued-1)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Size: {s}
                </p>
              </div>
              <ErrorState
                variant="generic"
                size={s}
                onRetry={async () => {
                  await new Promise((r) => setTimeout(r, 500))
                }}
                showGoBack
                onGoBack={() => window.history.back()}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Retry Behavior Demo */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-8)",
          }}
        >
          Retry Behavior
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
          }}
        >
          Click "Try again" multiple times. After 3 failed retries, the button changes
          to "Contact support". The retry log below tracks each attempt.
        </p>
        <div
          className="grid md:grid-cols-2"
          style={{ gap: "var(--space-16)" }}
        >
          <div
            style={{
              backgroundColor: "var(--surface-0)",
              borderRadius: "var(--radius-16)",
              border: "1px solid var(--grey-40)",
            }}
          >
            <div
              style={{
                padding: "var(--space-8) var(--space-16)",
                backgroundColor: "var(--error-20)",
                borderBottom: "1px solid var(--grey-40)",
                borderRadius: "var(--radius-16) var(--radius-16) 0 0",
              }}
            >
              <p
                style={{
                  fontSize: "var(--font-size-s)",
                  fontWeight: "var(--font-weight-prominent)",
                  color: "var(--error-50)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Always Fails (retry exhaustion)
              </p>
            </div>
            <ErrorState
              variant="server"
              size="md"
              onRetry={simulateRetry}
              maxRetries={3}
              showGoBack
              onGoBack={() => window.history.back()}
            />
          </div>

          <div
            style={{
              backgroundColor: "var(--surface-0)",
              borderRadius: "var(--radius-16)",
              border: "1px solid var(--grey-40)",
            }}
          >
            <div
              style={{
                padding: "var(--space-8) var(--space-16)",
                backgroundColor: "var(--success-20)",
                borderBottom: "1px solid var(--grey-40)",
                borderRadius: "var(--radius-16) var(--radius-16) 0 0",
              }}
            >
              <p
                style={{
                  fontSize: "var(--font-size-s)",
                  fontWeight: "var(--font-weight-prominent)",
                  color: "var(--success-50)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Always Succeeds
              </p>
            </div>
            <ErrorState
              variant="network"
              size="md"
              onRetry={simulateSuccess}
              maxRetries={3}
            />
          </div>
        </div>

        {/* Retry log */}
        {retryLog.length > 0 && (
          <div
            style={{
              marginTop: "var(--space-16)",
              backgroundColor: "var(--surface-0)",
              borderRadius: "var(--radius-12)",
              padding: "var(--space-16)",
              border: "1px solid var(--grey-40)",
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-8)" }}>
              <p
                style={{
                  fontSize: "var(--font-size-m)",
                  fontWeight: "var(--font-weight-heading)",
                  color: "var(--text-default)",
                }}
              >
                Retry Log
              </p>
              <Button variant="ghost" size="sm" onClick={() => setRetryLog([])}>
                Clear
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                maxHeight: 160,
                overflowY: "auto",
              }}
            >
              {retryLog.map((log, i) => (
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
        )}
      </section>

      {/* Custom Icon */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Custom Icon
        </h2>
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-16)",
            border: "1px solid var(--grey-40)",
            maxWidth: 400,
          }}
        >
          <ErrorState
            variant="generic"
            size="md"
            title="Feature unavailable"
            description="This feature is currently under maintenance."
            icon={
              <Flame
                style={{ width: "100%", height: "100%", color: "var(--warning-50)" }}
                strokeWidth={1}
              />
            }
            onRetry={async () => {
              await new Promise((r) => setTimeout(r, 600))
            }}
          />
        </div>
      </section>

      {/* With Go Back */}
      <section>
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          With Go Back Button
        </h2>
        <div
          style={{
            backgroundColor: "var(--surface-0)",
            borderRadius: "var(--radius-16)",
            border: "1px solid var(--grey-40)",
            maxWidth: 400,
          }}
        >
          <ErrorState
            variant="not-found"
            size="md"
            showGoBack
            onGoBack={() => window.history.back()}
          />
        </div>
      </section>
    </div>
  )
}
