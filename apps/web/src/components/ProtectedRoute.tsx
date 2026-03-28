import { useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const params = useParams();
  const {
    isAuthenticated,
    user,
    currentOrg,
    currentTenant,
    organizations,
    getOrgTenants,
  } = useAuthStore();

  // Sync URL params with store when they differ
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (params.orgSlug && currentOrg && params.orgSlug !== currentOrg.slug) {
      const org = organizations.find((o) => o.slug === params.orgSlug);
      if (org) {
        useAuthStore.getState().selectOrg(org.id);
      }
    }

    if (
      params.tenantSlug &&
      currentTenant &&
      params.tenantSlug !== currentTenant.slug
    ) {
      if (currentOrg) {
        const tenants = getOrgTenants(currentOrg.id);
        const tenant = tenants.find((t) => t.slug === params.tenantSlug);
        if (tenant) {
          useAuthStore.getState().selectTenant(tenant.id);
        }
      }
    }
  }, [
    isAuthenticated,
    user,
    params.orgSlug,
    params.tenantSlug,
    currentOrg,
    currentTenant,
    organizations,
    getOrgTenants,
  ]);

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but no org selected
  if (!currentOrg) {
    // If user has multiple orgs, redirect to org selector
    if (organizations.length > 1) {
      return <Navigate to="/select-org" replace />;
    }
    // If user has one org, auto-select it
    if (organizations.length === 1) {
      const org = organizations[0];
      useAuthStore.getState().selectOrg(org.id);

      const tenants = getOrgTenants(org.id);
      if (tenants.length > 1) {
        return <Navigate to={`/${org.slug}/select-tenant`} replace />;
      }
      if (tenants.length === 1) {
        useAuthStore.getState().selectTenant(tenants[0].id);
        return (
          <Navigate
            to={`/${org.slug}/${tenants[0].slug}/app/dashboard`}
            replace
          />
        );
      }
    }
  }

  // Authenticated with org but no tenant
  if (currentOrg && !currentTenant) {
    const tenants = getOrgTenants(currentOrg.id);

    // If user has multiple tenants, redirect to tenant selector
    if (tenants.length > 1) {
      return <Navigate to={`/${currentOrg.slug}/select-tenant`} replace />;
    }
    // If user has one tenant, auto-select it
    if (tenants.length === 1) {
      useAuthStore.getState().selectTenant(tenants[0].id);
      return (
        <Navigate
          to={`/${currentOrg.slug}/${tenants[0].slug}/app/dashboard`}
          replace
        />
      );
    }
  }

  // All checks passed - render protected content
  return <>{children}</>;
}
