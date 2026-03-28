export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  tenantId: string;
  orgId: string;
  permissions: string[];
  // Relio: Remember last selected org/tenant
  lastOrgId: string | null;
  lastTenantId: string | null;
}

export type UserRole = "owner" | "admin" | "member" | "viewer";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  tenantSlug?: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
  acceptedTerms: boolean;
}
