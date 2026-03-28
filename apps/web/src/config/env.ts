export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string || "http://localhost:3001/api",
  APP_ENV: (import.meta.env.VITE_APP_ENV as string) || "development",
  APP_NAME: (import.meta.env.VITE_APP_NAME as string) || "Design System",
  DEFAULT_TENANT: (import.meta.env.VITE_DEFAULT_TENANT as string) || "default",
  AUTH_TOKEN_KEY: "ds-auth-token",
  REFRESH_TOKEN_KEY: "ds-refresh-token",
} as const
