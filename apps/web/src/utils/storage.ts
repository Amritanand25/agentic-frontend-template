/**
 * Tenant-scoped localStorage wrapper.
 * All keys are prefixed with tenant ID to prevent data leakage between tenants.
 */
export function createScopedStorage(tenantId: string) {
  const prefix = `tenant-${tenantId}-`

  return {
    getItem(key: string): string | null {
      return localStorage.getItem(`${prefix}${key}`)
    },

    setItem(key: string, value: string): void {
      localStorage.setItem(`${prefix}${key}`, value)
    },

    removeItem(key: string): void {
      localStorage.removeItem(`${prefix}${key}`)
    },

    getJSON<T>(key: string): T | null {
      const raw = localStorage.getItem(`${prefix}${key}`)
      if (!raw) return null
      try {
        return JSON.parse(raw) as T
      } catch {
        return null
      }
    },

    setJSON(key: string, value: unknown): void {
      localStorage.setItem(`${prefix}${key}`, JSON.stringify(value))
    },

    clear(): void {
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k?.startsWith(prefix)) keysToRemove.push(k)
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k))
    },
  }
}
