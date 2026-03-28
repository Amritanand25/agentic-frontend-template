export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  role: UserRole
  tenantId: string
  orgId: string
  permissions: string[]
}

export type UserRole = "owner" | "admin" | "member" | "viewer"

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export interface LoginCredentials {
  email: string
  password: string
  tenantSlug?: string
}
