export interface Org {
  orgId: string
  name: string
  slug: string
  tenantId: string
  plan: OrgPlan
  settings: OrgSettings
}

export type OrgPlan = "free" | "starter" | "pro" | "enterprise"

export interface OrgSettings {
  maxUsers: number
  features: Record<string, boolean>
}
