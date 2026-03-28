import { Outlet } from "react-router-dom"

export function AppLayout() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--surface-30)" }}>
      <Outlet />
    </div>
  )
}
