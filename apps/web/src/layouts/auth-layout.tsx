import { Database } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ backgroundColor: "var(--surface-10)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-lg"
        style={{
          backgroundColor: "var(--surface-0)",
          border: "1px solid var(--grey-40)",
          padding: "48px",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: "var(--primary-10)" }}
          >
            <Database size={48} style={{ color: "var(--primary-50)" }} />
          </div>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
