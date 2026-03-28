import { useRegisterSW } from "virtual:pwa-register/react"

export function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW(swUrl, registration) {
      if (registration) {
        setInterval(() => registration.update(), 60 * 60 * 1000)
      }
      console.log("SW registered:", swUrl)
    },
    onRegisterError(error) {
      console.error("SW registration error:", error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (!offlineReady && !needRefresh) return null

  return (
    <div
      role="alert"
      style={{
        position: "fixed",
        bottom: "var(--space-16)",
        right: "var(--space-16)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-12)",
        padding: "var(--space-12) var(--space-16)",
        backgroundColor: "var(--surface-0)",
        border: "1px solid var(--grey-40)",
        borderRadius: "var(--radius-12)",
        boxShadow: "var(--shadow-medium)",
        fontSize: "var(--font-size-m)",
        color: "var(--text-default)",
      }}
    >
      <span>
        {offlineReady
          ? "App ready to work offline"
          : "New content available, click reload to update."}
      </span>
      {needRefresh && (
        <button
          onClick={() => updateServiceWorker()}
          style={{
            padding: "var(--space-4) var(--space-12)",
            backgroundColor: "var(--primary-50)",
            color: "var(--text-on-primary)",
            borderRadius: "var(--radius-8)",
            border: "none",
            cursor: "pointer",
            fontSize: "var(--font-size-s)",
            fontWeight: "var(--font-weight-prominent)",
          }}
        >
          Reload
        </button>
      )}
      <button
        onClick={close}
        style={{
          padding: "var(--space-4) var(--space-8)",
          backgroundColor: "transparent",
          color: "var(--text-subdued-1)",
          border: "1px solid var(--grey-40)",
          borderRadius: "var(--radius-8)",
          cursor: "pointer",
          fontSize: "var(--font-size-s)",
        }}
      >
        Close
      </button>
    </div>
  )
}
