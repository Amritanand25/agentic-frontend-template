import * as React from "react"
import {
  Settings,
  User,
  Bell,
  Share2,
  Copy,
  Link,
  Mail,
  MessageSquare,
  Check,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger, Button, Input, InputLabel, Switch } from "@repo/ui"

const sectionCard: React.CSSProperties = {
  backgroundColor: "var(--surface-0)",
  borderRadius: "var(--radius-16)",
  padding: "var(--space-24)",
  border: "1px solid var(--grey-40)",
}

const popoverStyle: React.CSSProperties = {
  backgroundColor: "var(--surface-0)",
  border: "1px solid var(--grey-40)",
  borderRadius: "var(--radius-12)",
  boxShadow: "var(--shadow-medium)",
  color: "var(--text-default)",
}

export default function PopoverPage() {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          Popover
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-m)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Displays rich content in a portal, triggered by a button.
        </p>
      </div>

      {/* Placement Variants */}
      <div style={sectionCard}>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Placement
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--space-12)",
            padding: "var(--space-32) 0",
          }}
        >
          {/* Top */}
          <div style={{ display: "flex", gap: "var(--space-8)" }}>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Top Start</Button>
              </PopoverTrigger>
              <PopoverContent side="top" align="start" style={popoverStyle}>
                <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-default)" }}>
                  Aligned to the <strong>top-start</strong> of the trigger.
                </p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Top</Button>
              </PopoverTrigger>
              <PopoverContent side="top" align="center" style={popoverStyle}>
                <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-default)" }}>
                  Aligned to the <strong>top-center</strong> of the trigger.
                </p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Top End</Button>
              </PopoverTrigger>
              <PopoverContent side="top" align="end" style={popoverStyle}>
                <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-default)" }}>
                  Aligned to the <strong>top-end</strong> of the trigger.
                </p>
              </PopoverContent>
            </Popover>
          </div>

          {/* Left & Right */}
          <div style={{ display: "flex", gap: "var(--space-8)" }}>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Left</Button>
              </PopoverTrigger>
              <PopoverContent side="left" align="center" style={popoverStyle}>
                <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-default)" }}>
                  Opens to the <strong>left</strong> of the trigger.
                </p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Right</Button>
              </PopoverTrigger>
              <PopoverContent side="right" align="center" style={popoverStyle}>
                <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-default)" }}>
                  Opens to the <strong>right</strong> of the trigger.
                </p>
              </PopoverContent>
            </Popover>
          </div>

          {/* Bottom */}
          <div style={{ display: "flex", gap: "var(--space-8)" }}>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Bottom Start</Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" style={popoverStyle}>
                <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-default)" }}>
                  Aligned to the <strong>bottom-start</strong> of the trigger.
                </p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Bottom</Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="center" style={popoverStyle}>
                <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-default)" }}>
                  Aligned to the <strong>bottom-center</strong> of the trigger.
                </p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Bottom End</Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="end" style={popoverStyle}>
                <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-default)" }}>
                  Aligned to the <strong>bottom-end</strong> of the trigger.
                </p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Use <code style={{ fontSize: "var(--font-size-s)", color: "var(--primary-50)" }}>side</code> (top, bottom, left, right) and <code style={{ fontSize: "var(--font-size-s)", color: "var(--primary-50)" }}>align</code> (start, center, end) to control placement.
        </p>
      </div>

      {/* Profile Card */}
      <div style={sectionCard}>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          User Profile Card
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <User size={14} style={{ marginRight: 6 }} />
              View Profile
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" className="w-72 p-0" style={popoverStyle}>
            <div style={{ padding: "var(--space-16)" }}>
              <div className="flex items-center" style={{ gap: "var(--space-12)" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "var(--primary-20)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary-60)",
                    fontWeight: "var(--font-weight-heading)",
                    fontSize: "var(--font-size-m)",
                    flexShrink: 0,
                  }}
                >
                  JD
                </div>
                <div>
                  <p style={{ fontSize: "var(--font-size-m)", fontWeight: "var(--font-weight-prominent)", color: "var(--text-default)" }}>
                    John Doe
                  </p>
                  <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-1)" }}>
                    john@example.com
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: "var(--font-size-s)",
                  color: "var(--text-subdued-1)",
                  lineHeight: "var(--line-height-s)",
                  marginTop: "var(--space-12)",
                }}
              >
                Senior Frontend Engineer working on design systems and component libraries.
              </p>
            </div>
            <div
              style={{
                borderTop: "1px solid var(--grey-40)",
                padding: "var(--space-8) var(--space-16)",
                display: "flex",
                gap: "var(--space-8)",
              }}
            >
              <Button variant="outline" size="sm" style={{ flex: 1 }}>
                <MessageSquare size={14} style={{ marginRight: 4 }} />
                Message
              </Button>
              <Button size="sm" style={{ flex: 1 }}>
                Follow
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Settings Form Popover */}
      <div style={sectionCard}>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Settings Popover
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings size={14} style={{ marginRight: 6 }} />
              Dimensions
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" className="w-80 p-0" style={popoverStyle}>
            <div
              style={{
                padding: "var(--space-12) var(--space-16)",
                borderBottom: "1px solid var(--grey-40)",
              }}
            >
              <p style={{ fontSize: "var(--font-size-m)", fontWeight: "var(--font-weight-prominent)", color: "var(--text-default)" }}>
                Dimensions
              </p>
              <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-1)", marginTop: "var(--space-2)" }}>
                Set the dimensions for the layer.
              </p>
            </div>
            <div style={{ padding: "var(--space-16)", display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
              <div className="flex items-center" style={{ gap: "var(--space-12)" }}>
                <InputLabel style={{ minWidth: 64 }}>Width</InputLabel>
                <Input defaultValue="100%" style={{ flex: 1 }} />
              </div>
              <div className="flex items-center" style={{ gap: "var(--space-12)" }}>
                <InputLabel style={{ minWidth: 64 }}>Max Width</InputLabel>
                <Input defaultValue="300px" style={{ flex: 1 }} />
              </div>
              <div className="flex items-center" style={{ gap: "var(--space-12)" }}>
                <InputLabel style={{ minWidth: 64 }}>Height</InputLabel>
                <Input defaultValue="25px" style={{ flex: 1 }} />
              </div>
              <div className="flex items-center" style={{ gap: "var(--space-12)" }}>
                <InputLabel style={{ minWidth: 64 }}>Max Height</InputLabel>
                <Input defaultValue="none" style={{ flex: 1 }} />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Notification Preferences */}
      <div style={sectionCard}>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Notification Preferences
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Bell size={14} style={{ marginRight: 6 }} />
              Notifications
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" className="w-72 p-0" style={popoverStyle}>
            <div
              style={{
                padding: "var(--space-12) var(--space-16)",
                borderBottom: "1px solid var(--grey-40)",
              }}
            >
              <p style={{ fontSize: "var(--font-size-m)", fontWeight: "var(--font-weight-prominent)", color: "var(--text-default)" }}>
                Notifications
              </p>
              <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-1)", marginTop: "var(--space-2)" }}>
                Choose what you want to be notified about.
              </p>
            </div>
            <div style={{ padding: "var(--space-12) var(--space-16)", display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
              {[
                { label: "Push notifications", desc: "On your mobile device" },
                { label: "Email digests", desc: "Weekly summary emails" },
                { label: "Mentions only", desc: "When someone @mentions you" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between" style={{ gap: "var(--space-12)" }}>
                  <div>
                    <p style={{ fontSize: "var(--font-size-s)", fontWeight: "var(--font-weight-prominent)", color: "var(--text-default)" }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-2)" }}>
                      {item.desc}
                    </p>
                  </div>
                  <Switch defaultChecked={item.label === "Push notifications"} />
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Share Popover */}
      <div style={sectionCard}>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Share Link
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Share2 size={14} style={{ marginRight: 6 }} />
              Share
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" className="w-80 p-0" style={popoverStyle}>
            <div
              style={{
                padding: "var(--space-12) var(--space-16)",
                borderBottom: "1px solid var(--grey-40)",
              }}
            >
              <p style={{ fontSize: "var(--font-size-m)", fontWeight: "var(--font-weight-prominent)", color: "var(--text-default)" }}>
                Share this page
              </p>
              <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-1)", marginTop: "var(--space-2)" }}>
                Anyone with the link can view this document.
              </p>
            </div>
            <div style={{ padding: "var(--space-12) var(--space-16)", display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
              <div className="flex" style={{ gap: "var(--space-8)" }}>
                <Input
                  readOnly
                  value="https://app.example.com/docs/abc123"
                  style={{ flex: 1, fontSize: "var(--font-size-s)" }}
                />
                <Button size="sm" variant="outline" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </Button>
              </div>
              <div
                style={{
                  borderTop: "1px solid var(--grey-40)",
                  paddingTop: "var(--space-12)",
                  display: "flex",
                  gap: "var(--space-8)",
                }}
              >
                <Button variant="outline" size="sm" style={{ flex: 1 }}>
                  <Link size={14} style={{ marginRight: 4 }} />
                  Copy link
                </Button>
                <Button variant="outline" size="sm" style={{ flex: 1 }}>
                  <Mail size={14} style={{ marginRight: 4 }} />
                  Email
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Icon Trigger */}
      <div style={sectionCard}>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Icon Trigger
        </p>
        <div className="flex items-center" style={{ gap: "var(--space-12)" }}>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--grey-40)",
                  backgroundColor: "var(--surface-0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-subdued-1)",
                }}
              >
                <Settings size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" style={popoverStyle}>
              <p style={{ fontSize: "var(--font-size-m)", fontWeight: "var(--font-weight-prominent)", color: "var(--text-default)", marginBottom: "var(--space-8)" }}>
                Quick Settings
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
                {["Dark mode", "Compact view", "Sound effects"].map((label) => (
                  <div key={label} className="flex items-center justify-between">
                    <span style={{ fontSize: "var(--font-size-s)", color: "var(--text-default)" }}>{label}</span>
                    <Switch />
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--grey-40)",
                  backgroundColor: "var(--surface-0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-subdued-1)",
                }}
              >
                <Bell size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="center" className="w-64 p-0" style={popoverStyle}>
              <div
                style={{
                  padding: "var(--space-12) var(--space-16)",
                  borderBottom: "1px solid var(--grey-40)",
                }}
              >
                <p style={{ fontSize: "var(--font-size-m)", fontWeight: "var(--font-weight-prominent)", color: "var(--text-default)" }}>
                  Notifications
                </p>
              </div>
              <div style={{ padding: "var(--space-8) var(--space-16)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {[
                  { text: "Alex commented on your PR", time: "2m ago" },
                  { text: "Build #42 succeeded", time: "15m ago" },
                  { text: "New team member joined", time: "1h ago" },
                ].map((n) => (
                  <div
                    key={n.text}
                    style={{
                      padding: "var(--space-8)",
                      borderRadius: "var(--radius-8)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--primary-10)" }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
                  >
                    <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-default)" }}>{n.text}</p>
                    <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-2)" }}>{n.time}</p>
                  </div>
                ))}
              </div>
              <div
                style={{
                  borderTop: "1px solid var(--grey-40)",
                  padding: "var(--space-8) var(--space-16)",
                  textAlign: "center",
                }}
              >
                <button
                  type="button"
                  style={{
                    fontSize: "var(--font-size-s)",
                    color: "var(--primary-50)",
                    fontWeight: "var(--font-weight-prominent)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  View all notifications
                </button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--primary-20)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--primary-60)",
                  fontWeight: "var(--font-weight-heading)",
                  fontSize: "var(--font-size-s)",
                }}
              >
                JD
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="end" className="w-48 p-0" style={popoverStyle}>
              <div style={{ padding: "var(--space-12) var(--space-16)", borderBottom: "1px solid var(--grey-40)" }}>
                <p style={{ fontSize: "var(--font-size-m)", fontWeight: "var(--font-weight-prominent)", color: "var(--text-default)" }}>John Doe</p>
                <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-1)" }}>john@example.com</p>
              </div>
              <div style={{ padding: "var(--space-4)" }}>
                {["Profile", "Settings", "Billing", "Log out"].map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "var(--space-8) var(--space-12)",
                      borderRadius: "var(--radius-8)",
                      fontSize: "var(--font-size-s)",
                      color: item === "Log out" ? "var(--error-50)" : "var(--text-default)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--primary-10)" }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-12)",
          }}
        >
          Popovers triggered from icon buttons — settings, notifications, and avatar menu.
        </p>
      </div>

      {/* Nested / Confirm Action */}
      <div style={sectionCard}>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-16)",
          }}
        >
          Confirm Action
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="destructive" size="sm">Delete Project</Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" className="w-72 p-0" style={popoverStyle}>
            <div style={{ padding: "var(--space-16)", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
              <p style={{ fontSize: "var(--font-size-m)", fontWeight: "var(--font-weight-prominent)", color: "var(--text-default)" }}>
                Are you sure?
              </p>
              <p style={{ fontSize: "var(--font-size-s)", color: "var(--text-subdued-1)", lineHeight: "var(--line-height-s)" }}>
                This action cannot be undone. This will permanently delete the project and all associated data.
              </p>
              <div className="flex" style={{ gap: "var(--space-8)", marginTop: "var(--space-4)" }}>
                <Button variant="destructive" size="sm" style={{ flex: 1 }}>
                  Yes, delete
                </Button>
                <Button variant="outline" size="sm" style={{ flex: 1 }}>
                  Cancel
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-12)",
          }}
        >
          Inline confirmation popover for destructive actions — lighter than a dialog.
        </p>
      </div>
    </div>
  )
}
