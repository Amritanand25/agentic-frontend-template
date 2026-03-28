import { useState } from "react"
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  Plus,
  Users,
  Mail,
  MessageSquare,
  PlusCircle,
  UserPlus,
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  Share2,
  Download,
  Eye,
  EyeOff,
  ArrowUpDown,
  Filter,
  MoreVertical,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuShortcut, Button } from "@repo/ui"

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showPanel, setShowPanel] = useState(false)
  const [showNotifications, setShowNotifications] = useState(true)
  const [sortOrder, setSortOrder] = useState("newest")

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-32)" }}>
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-heading)",
            lineHeight: "var(--line-height-xl)",
            color: "var(--text-default)",
          }}
        >
          Dropdown Menu
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-l)",
            lineHeight: "var(--line-height-l)",
            color: "var(--text-subdued-1)",
            marginTop: "var(--space-8)",
          }}
        >
          Displays a menu of actions or options triggered by a button. Supports
          icons, shortcuts, checkboxes, radio groups, and sub-menus.
        </p>
      </div>

      {/* Basic */}
      <section
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Basic
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Simple menu with labeled groups and separators.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ minWidth: 200 }}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* With Icons & Shortcuts */}
      <section
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          With Icons & Shortcuts
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Menu items with leading icons and trailing keyboard shortcuts.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <User size={16} />
              Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ minWidth: 220 }}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User size={16} />
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard size={16} />
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings size={16} />
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut size={16} />
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* With Sub-menus */}
      <section
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          With Sub-menus
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Nested menus for organizing complex actions into categories.
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Plus size={16} />
              New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ minWidth: 220 }}>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <PlusCircle size={16} />
                New Project
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus size={16} />
                  Invite Users
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail size={16} />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare size={16} />
                    Message
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Share2 size={16} />
                    Share Link
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Users size={16} />
                  Teams
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Engineering</DropdownMenuItem>
                  <DropdownMenuItem>Design</DropdownMenuItem>
                  <DropdownMenuItem>Product</DropdownMenuItem>
                  <DropdownMenuItem>Marketing</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Checkbox Items */}
      <section
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Checkbox Items
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Toggle visibility of UI elements. Each item maintains its own checked state.
        </p>
        <div className="flex items-center" style={{ gap: "var(--space-12)" }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Eye size={16} />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ minWidth: 200 }}>
              <DropdownMenuLabel>Toggle Panels</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Side Panel
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showNotifications}
                onCheckedChange={setShowNotifications}
              >
                Notifications
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span
            style={{
              fontSize: "var(--font-size-s)",
              color: "var(--text-subdued-1)",
            }}
          >
            Status Bar: {showStatusBar ? "On" : "Off"} | Panel:{" "}
            {showPanel ? "On" : "Off"} | Notifications:{" "}
            {showNotifications ? "On" : "Off"}
          </span>
        </div>
      </section>

      {/* Radio Group Items */}
      <section
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Radio Group
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Single-selection from a group of options. Only one can be active at a time.
        </p>
        <div className="flex items-center" style={{ gap: "var(--space-12)" }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ArrowUpDown size={16} />
                Sort: {sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ minWidth: 180 }}>
              <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">Oldest First</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="az">A to Z</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="za">Z to A</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="popular">Most Popular</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Action Menu (Row Actions) */}
      <section
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Row Actions (Icon Trigger)
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Common pattern for table row actions. Uses an icon-only trigger (horizontal or vertical dots) with
          a destructive delete action.
        </p>
        <div className="flex items-center" style={{ gap: "var(--space-24)" }}>
          {/* Horizontal dots */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={{ minWidth: 160 }}>
              <DropdownMenuItem>
                <Pencil size={16} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy size={16} />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download size={16} />
                Export
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 size={16} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Vertical dots */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={{ minWidth: 160 }}>
              <DropdownMenuItem>
                <Eye size={16} />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil size={16} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 size={16} />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <EyeOff size={16} />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 size={16} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Toolbar Pattern */}
      <section
        style={{
          backgroundColor: "var(--surface-0)",
          borderRadius: "var(--radius-16)",
          padding: "var(--space-24)",
          border: "1px solid var(--grey-40)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-m)",
            fontWeight: "var(--font-weight-heading)",
            color: "var(--text-default)",
            marginBottom: "var(--space-4)",
          }}
        >
          Toolbar Pattern
        </p>
        <p
          style={{
            fontSize: "var(--font-size-s)",
            color: "var(--text-subdued-1)",
            marginBottom: "var(--space-16)",
            lineHeight: "var(--line-height-s)",
          }}
        >
          Multiple dropdown menus composed together in a toolbar layout, common
          in table headers and data views.
        </p>
        <div
          className="flex items-center"
          style={{
            gap: "var(--space-8)",
            padding: "var(--space-8) var(--space-12)",
            backgroundColor: "var(--surface-10)",
            borderRadius: "var(--radius-8)",
            width: "fit-content",
          }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Filter size={14} />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ minWidth: 160 }}>
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <ArrowUpDown size={14} />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ minWidth: 160 }}>
              <DropdownMenuRadioGroup value="date-desc">
                <DropdownMenuRadioItem value="date-desc">Date (Newest)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date-asc">Date (Oldest)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name-asc">Name (A-Z)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name-desc">Name (Z-A)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Download size={14} />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ minWidth: 140 }}>
              <DropdownMenuItem>CSV</DropdownMenuItem>
              <DropdownMenuItem>Excel</DropdownMenuItem>
              <DropdownMenuItem>PDF</DropdownMenuItem>
              <DropdownMenuItem>JSON</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </div>
  )
}
