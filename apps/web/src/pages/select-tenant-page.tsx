import { useNavigate, useParams } from "react-router-dom";
import { AuthLayout } from "@/layouts/auth-layout";
import { Button, Card, CardContent, Badge } from "@repo/ui";
import { useAuthStore } from "@/stores/auth-store";
import { Plus } from "lucide-react";

export default function SelectTenantPage() {
  const navigate = useNavigate();
  const { orgSlug } = useParams<{ orgSlug: string }>();
  const { currentOrg, getOrgTenants, selectTenant } = useAuthStore();

  if (!currentOrg) {
    // No org selected - redirect to org selector
    navigate("/select-org");
    return null;
  }

  const tenants = getOrgTenants(currentOrg.id);

  const handleSelectTenant = (tenantId: string) => {
    selectTenant(tenantId);

    const tenant = tenants.find((t) => t.id === tenantId);
    if (!tenant) return;

    navigate(`/${orgSlug}/${tenant.slug}/app/dashboard`);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div
            className="text-sm font-medium mb-1"
            style={{ color: "var(--text-subdued-1)" }}
          >
            {currentOrg.name}
          </div>
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: "var(--text-default)" }}
          >
            Select Workspace
          </h1>
          <p className="text-sm" style={{ color: "var(--text-subdued-1)" }}>
            Choose a workspace to continue
          </p>
        </div>

        {/* Tenants list */}
        <div className="space-y-3">
          {tenants.map((tenant) => (
            <Card
              key={tenant.id}
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => handleSelectTenant(tenant.id)}
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
                      💼
                    </div>

                    {/* Info */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-medium"
                          style={{ color: "var(--text-default)" }}
                        >
                          {tenant.name}
                        </span>
                        <Badge
                          variant={
                            tenant.role === "admin" ? "default" : "secondary"
                          }
                          className="text-xs capitalize"
                        >
                          {tenant.role}
                        </Badge>
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

        {/* Create new workspace button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => console.log("Create new workspace")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Workspace
        </Button>
      </div>
    </AuthLayout>
  );
}
