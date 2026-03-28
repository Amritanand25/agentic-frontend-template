import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Organization } from "@/types/org";

interface OrgStore {
  currentOrg: Organization | null;
  orgs: Organization[];

  setCurrentOrg: (orgId: string) => void;
  setOrgs: (orgs: Organization[]) => void;
  reset: () => void;
}

export const useOrgStore = create<OrgStore>()(
  persist(
    (set, get) => ({
      currentOrg: null,
      orgs: [],

      setCurrentOrg: (orgId: string) => {
        const org = get().orgs.find((o) => o.id === orgId);
        if (org) {
          set({ currentOrg: org });
        }
      },

      setOrgs: (orgs: Organization[]) => {
        set({ orgs });
      },

      reset: () => {
        set({ currentOrg: null, orgs: [] });
      },
    }),
    {
      name: "relio-org",
      partialize: (state) => ({
        currentOrg: state.currentOrg,
      }),
    },
  ),
);
