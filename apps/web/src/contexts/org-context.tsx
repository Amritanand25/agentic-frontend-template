import { createContext, useContext, useState, useCallback } from "react"
import { STORAGE_KEYS } from "@/config/constants"
import type { Org } from "@/types"

interface OrgContextState {
  org: Org | null
  setOrg: (org: Org) => void
  clearOrg: () => void
  hasPermission: (feature: string) => boolean
}

const OrgContext = createContext<OrgContextState | null>(null)

interface OrgProviderProps {
  children: React.ReactNode
}

export function OrgProvider({ children }: OrgProviderProps) {
  const [org, setOrgState] = useState<Org | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.ORG)
    if (stored) {
      try {
        return JSON.parse(stored) as Org
      } catch {
        return null
      }
    }
    return null
  })

  const setOrg = useCallback((o: Org) => {
    localStorage.setItem(STORAGE_KEYS.ORG, JSON.stringify(o))
    setOrgState(o)
  }, [])

  const clearOrg = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.ORG)
    setOrgState(null)
  }, [])

  const hasPermission = useCallback(
    (feature: string) => org?.settings.features[feature] ?? false,
    [org]
  )

  return (
    <OrgContext.Provider value={{ org, setOrg, clearOrg, hasPermission }}>
      {children}
    </OrgContext.Provider>
  )
}

export function useOrg() {
  const context = useContext(OrgContext)
  if (!context) throw new Error("useOrg must be used within an OrgProvider")
  return context
}
