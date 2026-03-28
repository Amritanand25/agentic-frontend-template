import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { STORAGE_KEYS } from "@/config/constants"

export type Theme = "falcon" | "phoenix" | "jarvis"
export type Mode = "light" | "dark"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultMode?: Mode
}

type ThemeProviderState = {
  theme: Theme
  mode: Mode
  setTheme: (theme: Theme) => void
  setMode: (mode: Mode) => void
  toggleMode: () => void
}

const initialState: ThemeProviderState = {
  theme: "falcon",
  mode: "light",
  setTheme: () => null,
  setMode: () => null,
  toggleMode: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "falcon",
  defaultMode = "light",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(STORAGE_KEYS.THEME) as Theme) || defaultTheme
  )
  const [mode, setModeState] = useState<Mode>(
    () => (localStorage.getItem(STORAGE_KEYS.MODE) as Mode) || defaultMode
  )

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", theme)
    root.setAttribute("data-mode", mode)
  }, [theme, mode])

  const setTheme = useCallback((t: Theme) => {
    localStorage.setItem(STORAGE_KEYS.THEME, t)
    setThemeState(t)
  }, [])

  const setMode = useCallback((m: Mode) => {
    localStorage.setItem(STORAGE_KEYS.MODE, m)
    setModeState(m)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === "light" ? "dark" : "light")
  }, [mode, setMode])

  return (
    <ThemeProviderContext.Provider
      value={{ theme, mode, setTheme, setMode, toggleMode }}
    >
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
