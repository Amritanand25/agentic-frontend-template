export const API_TIMEOUT = 30_000
export const TOKEN_REFRESH_BUFFER = 5 * 60 * 1000 // 5 minutes before expiry

export const STORAGE_KEYS = {
  THEME: "ds-theme",
  MODE: "ds-mode",
  TENANT: "ds-tenant",
  ORG: "ds-org",
} as const

export const DEFAULT_TENANT_CONFIG = {
  tenantId: "default",
  name: "Default",
  slug: "default",
  theme: "falcon",
  branding: {
    logoUrl: "/favicon.svg",
    faviconUrl: "/favicon.svg",
    primaryColor: "#3535f3",
    appName: "Design System",
  },
  features: {},
} as const
