import { useMemo } from "react"
import { useTenant } from "@/contexts/tenant-context"
import { createScopedStorage } from "@/utils/storage"

export function useScopedStorage() {
  const { tenant } = useTenant()
  return useMemo(() => createScopedStorage(tenant.tenantId), [tenant.tenantId])
}
