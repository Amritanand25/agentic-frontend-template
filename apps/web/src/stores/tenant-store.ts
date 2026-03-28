import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Tenant } from "@/types/tenant";

type ThemeName = "falcon" | "phoenix" | "jarvis";

interface TenantStore {
  currentTenant: Tenant | null;
  tenants: Tenant[];
  theme: ThemeName;
  features: Record<string, boolean>;

  setCurrentTenant: (tenantId: string) => void;
  setTenants: (tenants: Tenant[]) => void;
  setTheme: (theme: ThemeName) => void;
  setFeatures: (features: Record<string, boolean>) => void;
  isFeatureEnabled: (feature: string) => boolean;
  reset: () => void;
}

export const useTenantStore = create<TenantStore>()(
  persist(
    (set, get) => ({
      currentTenant: null,
      tenants: [],
      theme: "falcon",
      features: {},

      setCurrentTenant: (tenantId: string) => {
        const tenant = get().tenants.find((t) => t.id === tenantId);
        if (tenant) {
          set({ currentTenant: tenant });
        }
      },

      setTenants: (tenants: Tenant[]) => {
        set({ tenants });
      },

      setTheme: (theme: ThemeName) => {
        set({ theme });
      },

      setFeatures: (features: Record<string, boolean>) => {
        set({ features });
      },

      isFeatureEnabled: (feature: string) => {
        return get().features[feature] ?? false;
      },

      reset: () => {
        set({
          currentTenant: null,
          tenants: [],
          theme: "falcon",
          features: {},
        });
      },
    }),
    {
      name: "relio-tenant",
      partialize: (state) => ({
        currentTenant: state.currentTenant,
        theme: state.theme,
      }),
    },
  ),
);
