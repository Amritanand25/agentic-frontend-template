import { createContext, useContext, useState, useCallback } from "react"
import { DEFAULT_TENANT_CONFIG, STORAGE_KEYS } from "@/config/constants"
import type { TenantConfig } from "@/types"

interface TenantContextState {
  tenant: TenantConfig
  setTenant: (tenant: TenantConfig) => void
  isFeatureEnabled: (feature: string) => boolean
}

const TenantContext = createContext<TenantContextState | null>(null)

interface TenantProviderProps {
  children: React.ReactNode
  initialTenant?: TenantConfig
}

export function TenantProvider({ children, initialTenant }: TenantProviderProps) {
  const [tenant, setTenantState] = useState<TenantConfig>(() => {
    if (initialTenant) return initialTenant
    const stored = localStorage.getItem(STORAGE_KEYS.TENANT)
    if (stored) {
      try {
        return JSON.parse(stored) as TenantConfig
      } catch {
        // Fall through to default
      }
    }
    return { ...DEFAULT_TENANT_CONFIG }
  })

  const setTenant = useCallback((config: TenantConfig) => {
    localStorage.setItem(STORAGE_KEYS.TENANT, JSON.stringify(config))
    setTenantState(config)
  }, [])

  const isFeatureEnabled = useCallback(
    (feature: string) => tenant.features[feature] ?? false,
    [tenant.features]
  )

  return (
    <TenantContext.Provider value={{ tenant, setTenant, isFeatureEnabled }}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (!context) throw new Error("useTenant must be used within a TenantProvider")
  return context
}
