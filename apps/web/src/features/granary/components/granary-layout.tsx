import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@repo/ui";
import { GranaryHeader } from "./granary-header";
import { GranarySidebar } from "./granary-sidebar";

export default function GranaryLayout() {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "240px",
          height: "100vh",
        } as React.CSSProperties
      }
    >
      <div className="flex flex-col" style={{ width: "100%" }}>
        <GranaryHeader />
        <div className="flex" style={{ flex: 1, overflow: "hidden" }}>
          <GranarySidebar />
          <SidebarInset
            style={{
              backgroundColor: "var(--surface-10)",
              padding: "var(--space-16)",
              overflowY: "auto",
            }}
          >
            <Outlet />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
