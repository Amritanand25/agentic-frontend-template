import { Moon, Sun, Palette } from "lucide-react"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@repo/ui"
import { useTheme, type Theme } from "@/contexts/theme-context"

const themes: { value: Theme; label: string; color: string }[] = [
  { value: "falcon", label: "Falcon", color: "#3535f3" },
  { value: "phoenix", label: "Phoenix", color: "#6933fa" },
  { value: "jarvis", label: "Jarvis", color: "#278476" },
]

export function ThemeToggle() {
  const { theme, mode, setTheme, toggleMode } = useTheme()

  return (
    <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMode}
        aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
      >
        <Sun
          className="h-[1.2rem] w-[1.2rem] transition-all"
          style={{
            transform: mode === "dark" ? "rotate(-90deg) scale(0)" : "rotate(0) scale(1)",
            position: mode === "dark" ? "absolute" : "relative",
          }}
        />
        <Moon
          className="h-[1.2rem] w-[1.2rem] transition-all"
          style={{
            transform: mode === "light" ? "rotate(90deg) scale(0)" : "rotate(0) scale(1)",
            position: mode === "light" ? "absolute" : "relative",
          }}
        />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Select theme">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel
            style={{
              fontSize: "var(--font-size-s)",
              fontWeight: "var(--font-weight-heading)",
            }}
          >
            Theme
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              style={{ gap: "var(--space-8)" }}
            >
              <span
                className="inline-block rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: t.color,
                  border: theme === t.value ? "2px solid var(--text-default)" : "2px solid transparent",
                }}
              />
              {t.label}
              {theme === t.value && (
                <span
                  className="ml-auto"
                  style={{
                    fontSize: "var(--font-size-xs)",
                    color: "var(--text-subdued-2)",
                  }}
                >
                  Active
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
