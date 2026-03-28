import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/auth-layout";
import { Button, Card, CardContent } from "@repo/ui";
import { useAuthStore } from "@/stores/auth-store";
import { Plus } from "lucide-react";

export default function SelectOrgPage() {
  const navigate = useNavigate();
  const { organizations, selectOrg, getOrgTenants } = useAuthStore();

  const handleSelectOrg = (orgId: string) => {
    selectOrg(orgId);

    const org = organizations.find((o) => o.id === orgId);
    if (!org) return;

    const tenants = getOrgTenants(orgId);

    if (tenants.length > 1) {
      // Multiple tenants - show tenant selector
      navigate(`/${org.slug}/select-tenant`);
    } else if (tenants.length === 1) {
      // Single tenant - auto-select and go to dashboard
      useAuthStore.getState().selectTenant(tenants[0].id);
      navigate(`/${org.slug}/${tenants[0].slug}/app/dashboard`);
    } else {
      // No tenants - should create one (not implemented in Phase 1)
      console.log("No tenants found - need to create one");
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: "var(--text-default)" }}
          >
            Select Organization
          </h1>
          <p className="text-sm" style={{ color: "var(--text-subdued-1)" }}>
            Choose an organization to continue
          </p>
        </div>

        {/* Organizations list */}
        <div className="space-y-3">
          {organizations.map((org) => (
            <Card
              key={org.id}
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => handleSelectOrg(org.id)}
              style={{
                backgroundColor: "var(--surface-0)",
                border: "1px solid var(--grey-40)",
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: "var(--surface-10)" }}
                    >
                      {org.icon}
                    </div>

                    {/* Info */}
                    <div>
                      <div
                        className="font-medium"
                        style={{ color: "var(--text-default)" }}
                      >
                        {org.name}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: "var(--text-subdued-1)" }}
                      >
                        {org.tenantCount}{" "}
                        {org.tenantCount === 1 ? "workspace" : "workspaces"}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create new org button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => console.log("Create new organization")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Organization
        </Button>
      </div>
    </AuthLayout>
  );
}
