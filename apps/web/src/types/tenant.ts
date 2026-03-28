export interface TenantConfig {
  tenantId: string;
  name: string;
  slug: string;
  theme: string;
  branding: TenantBranding;
  features: Record<string, boolean>;
}

export interface TenantBranding {
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  appName: string;
}

// Relio: Tenant for multi-tenant selector
export interface Tenant {
  id: string;
  orgId: string;
  name: string;
  slug: string;
  role: "admin" | "member" | "viewer";
}
