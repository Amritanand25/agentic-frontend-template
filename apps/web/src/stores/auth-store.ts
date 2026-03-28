import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, SignupData } from "@/types/auth";
import type { Organization } from "@/types/org";
import type { Tenant } from "@/types/tenant";

// Mock data
const mockUser: User = {
  id: "user_1",
  email: "john@example.com",
  name: "John Doe",
  avatarUrl: undefined,
  role: "admin",
  tenantId: "tenant_1",
  orgId: "org_1",
  permissions: [],
  lastOrgId: "org_1",
  lastTenantId: "tenant_1",
};

const mockOrgs: Organization[] = [
  {
    id: "org_1",
    name: "Acme Inc",
    slug: "acme-inc",
    tenantCount: 3,
    icon: "🏢",
  },
  {
    id: "org_2",
    name: "TechCorp",
    slug: "techcorp",
    tenantCount: 1,
    icon: "🚀",
  },
];

const mockTenants: Tenant[] = [
  {
    id: "tenant_1",
    orgId: "org_1",
    name: "Sales Team",
    slug: "sales",
    role: "admin",
  },
  {
    id: "tenant_2",
    orgId: "org_1",
    name: "Marketing Team",
    slug: "marketing",
    role: "member",
  },
  {
    id: "tenant_3",
    orgId: "org_1",
    name: "Product Team",
    slug: "product",
    role: "viewer",
  },
  {
    id: "tenant_4",
    orgId: "org_2",
    name: "Engineering",
    slug: "engineering",
    role: "admin",
  },
];

// Validation helpers
export const validateEmail = (email: string): string | null => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email address";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return "Password must contain uppercase, lowercase, and numbers";
  }
  return null;
};

interface AuthStore {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Organizations and tenants
  organizations: Organization[];
  tenants: Tenant[];
  currentOrg: Organization | null;
  currentTenant: Tenant | null;

  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  loginWithOAuth: (provider: "google" | "github") => Promise<void>;

  // Multi-tenant actions
  selectOrg: (orgId: string) => void;
  selectTenant: (tenantId: string) => void;
  getOrgTenants: (orgId: string) => Tenant[];

  // Helpers
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      organizations: mockOrgs,
      tenants: mockTenants,
      currentOrg: null,
      currentTenant: null,

      // Login — accepts any email/password for demo
      login: async (email: string, password: string) => {
        void password;
        set({ isLoading: true, error: null });

        const emailError = validateEmail(email);
        if (emailError) {
          set({ isLoading: false, error: emailError });
          return;
        }

        // Mock API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Build user from the provided email
        const displayName = email
          .split("@")[0]
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        const user: User = {
          ...mockUser,
          email,
          name: displayName,
        };

        // Auto-select first org + first tenant so user lands in the app
        const org = mockOrgs[0];
        const tenant =
          mockTenants.find((t) => t.orgId === org.id) ?? mockTenants[0];

        set({
          user,
          token: "mock-token-" + Date.now(),
          isAuthenticated: true,
          isLoading: false,
          currentOrg: org,
          currentTenant: tenant,
        });
      },

      // Signup
      signup: async (data: SignupData) => {
        set({ isLoading: true, error: null });

        // Validate
        const emailError = validateEmail(data.email);
        if (emailError) {
          set({ isLoading: false, error: emailError });
          return;
        }

        const passwordError = validatePassword(data.password);
        if (passwordError) {
          set({ isLoading: false, error: passwordError });
          return;
        }

        if (!data.acceptedTerms) {
          set({
            isLoading: false,
            error: "You must accept the terms of service",
          });
          return;
        }

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Create new user and auto-select org/tenant
        const org = mockOrgs[0];
        const tenant =
          mockTenants.find((t) => t.orgId === org.id) ?? mockTenants[0];

        const newUser: User = {
          id: "user_" + Date.now(),
          email: data.email,
          name: data.name,
          avatarUrl: undefined,
          role: "owner",
          tenantId: tenant.id,
          orgId: org.id,
          permissions: [],
          lastOrgId: org.id,
          lastTenantId: tenant.id,
        };

        set({
          user: newUser,
          token: "mock-token-" + Date.now(),
          isAuthenticated: true,
          isLoading: false,
          currentOrg: org,
          currentTenant: tenant,
        });
      },

      // OAuth login
      loginWithOAuth: async (provider: "google" | "github") => {
        set({ isLoading: true, error: null });

        // Mock OAuth redirect
        await new Promise((resolve) => setTimeout(resolve, 500));

        // In real app, redirect to OAuth provider
        console.log(`Redirecting to ${provider} OAuth...`);

        set({ isLoading: false });
      },

      // Logout
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          currentOrg: null,
          currentTenant: null,
          error: null,
        });
      },

      // Select organization
      selectOrg: (orgId: string) => {
        const org = get().organizations.find((o) => o.id === orgId);
        if (!org) {
          set({ error: "Organization not found" });
          return;
        }

        const user = get().user;
        if (user) {
          set({
            currentOrg: org,
            currentTenant: null, // Clear tenant when switching org
            user: {
              ...user,
              lastOrgId: orgId,
              lastTenantId: null,
            },
          });
        }
      },

      // Select tenant
      selectTenant: (tenantId: string) => {
        const tenant = get().tenants.find((t) => t.id === tenantId);
        if (!tenant) {
          set({ error: "Workspace not found" });
          return;
        }

        const user = get().user;
        if (user) {
          set({
            currentTenant: tenant,
            user: {
              ...user,
              lastTenantId: tenantId,
              tenantId: tenantId,
              role: tenant.role,
            },
          });
        }
      },

      // Get tenants for org
      getOrgTenants: (orgId: string) => {
        return get().tenants.filter((t) => t.orgId === orgId);
      },

      // Error handling
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "relio-auth",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        currentOrg: state.currentOrg,
        currentTenant: state.currentTenant,
      }),
    },
  ),
);
