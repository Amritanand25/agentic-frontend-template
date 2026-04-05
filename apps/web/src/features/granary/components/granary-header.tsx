import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@repo/ui";
import { Settings, ChevronDown, LogOut, Wheat } from "lucide-react";

export function GranaryHeader() {
  return (
    <header
      className="flex items-center justify-between"
      style={{
        height: 56,
        backgroundColor: "var(--grey-100)",
        padding: "0 var(--space-16)",
        borderBottom: "1px solid var(--grey-80)",
      }}
    >
      {/* Logo + Brand */}
      <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
        <Wheat size={24} color="#FFFFFF" />
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
          }}
        >
          Granary
        </span>
      </div>

      {/* Right side: Settings + Profile */}
      <div className="flex items-center" style={{ gap: "var(--space-16)" }}>
        <Settings
          size={20}
          style={{ color: "var(--grey-40)", cursor: "pointer" }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center"
              style={{
                gap: "var(--space-8)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <Avatar
                style={{
                  width: 32,
                  height: 32,
                  fontSize: "var(--font-size-xs)",
                }}
              >
                <AvatarFallback
                  style={{
                    backgroundColor: "var(--primary-50)",
                    color: "#FFFFFF",
                  }}
                >
                  AT
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span
                  style={{
                    color: "var(--grey-40)",
                    fontSize: "var(--font-size-xs)",
                  }}
                >
                  Granary
                </span>
                <span
                  style={{ color: "#FFFFFF", fontSize: "var(--font-size-s)" }}
                >
                  Ayush Tiwari
                </span>
              </div>
              <ChevronDown size={16} color="var(--grey-40)" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" style={{ minWidth: 240 }}>
            <div
              className="flex items-center"
              style={{
                gap: "var(--space-8)",
                padding: "var(--space-8) var(--space-12)",
              }}
            >
              <Avatar style={{ width: 36, height: 36 }}>
                <AvatarFallback
                  style={{
                    backgroundColor: "var(--primary-50)",
                    color: "#FFFFFF",
                  }}
                >
                  AT
                </AvatarFallback>
              </Avatar>
              <div>
                <div
                  style={{
                    fontWeight: "var(--font-weight-prominent)",
                    fontSize: "var(--font-size-s)",
                  }}
                >
                  Ayush Tiwari
                </div>
                <div
                  style={{
                    fontSize: "var(--font-size-xs)",
                    color: "var(--text-subdued-1)",
                  }}
                >
                  ayushtiwari@gofynd.com
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuLabel
              style={{
                fontSize: "var(--font-size-xs)",
                color: "var(--text-subdued-2)",
              }}
            >
              WORKSPACES
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <div
                className="flex items-center"
                style={{ gap: "var(--space-8)" }}
              >
                <Avatar style={{ width: 24, height: 24, fontSize: "10px" }}>
                  <AvatarFallback
                    style={{
                      backgroundColor: "var(--tertiary-50)",
                      color: "#fff",
                    }}
                  >
                    IM
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div style={{ fontSize: "var(--font-size-s)" }}>Impetus</div>
                  <div
                    style={{
                      fontSize: "var(--font-size-xs)",
                      color: "var(--text-subdued-1)",
                    }}
                  >
                    planning-super-admin
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut size={16} style={{ marginRight: "var(--space-8)" }} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
