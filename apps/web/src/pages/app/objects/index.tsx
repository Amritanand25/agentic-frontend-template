import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Button } from "@repo/ui";
import {
  Building2,
  Users,
  DollarSign,
  Database,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useSchemaStore } from "@/stores/schema-store";
import { useAuthStore } from "@/stores/auth-store";
import { CreateObjectDialog } from "@/features/tables";

/** Map icon name strings from schema to Lucide components */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Building2,
  Users,
  DollarSign,
  Database,
};

function formatCount(count: number): string {
  if (count >= 1000) {
    return new Intl.NumberFormat("en-US").format(count);
  }
  return count.toString();
}

export default function ObjectsPage() {
  const navigate = useNavigate();
  const { orgSlug, tenantSlug } = useParams();
  const { getObjectsList, addObject, isLoading } = useSchemaStore();
  const { currentTenant } = useAuthStore();
  const [createOpen, setCreateOpen] = useState(false);

  const basePath = `/${orgSlug}/${tenantSlug}/app`;
  const objectsList = getObjectsList();

  function handleCreateObject(name: string, icon: string) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const id = `obj_${Date.now()}`;
    const now = new Date().toISOString();
    addObject({
      id,
      tenantId: currentTenant?.id ?? "tenant_1",
      name,
      slug,
      icon,
      fields: [
        {
          id: `fld_${id}_name`,
          objectId: id,
          name: "Name",
          type: "text",
          config: {},
          required: true,
          position: 0,
        },
      ],
      recordCount: 0,
      createdAt: now,
      updatedAt: now,
    });
    navigate(`${basePath}/objects/${id}`);
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1
            className="text-2xl font-semibold"
            style={{ color: "var(--text-default)" }}
          >
            Objects
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-subdued-1)" }}
          >
            Manage your custom database objects and records
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="animate-pulse"
              style={{ backgroundColor: "var(--surface-0)" }}
            >
              <CardContent className="p-6">
                <div className="h-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-semibold"
            style={{ color: "var(--text-default)" }}
          >
            Objects
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-subdued-1)" }}
          >
            Manage your custom database objects and records
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus size={16} className="mr-1.5" />
          New Object
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {objectsList.map((obj) => {
          const IconComponent = ICON_MAP[obj.icon] ?? Database;
          return (
            <Card
              key={obj.id}
              className="group cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: "var(--surface-0)",
                border: "1px solid var(--grey-40)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary-50)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--grey-40)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => navigate(`${basePath}/objects/${obj.id}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(`${basePath}/objects/${obj.id}`);
                }
              }}
              aria-label={`View ${obj.name} - ${formatCount(obj.recordCount)} records`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: "var(--primary-10)",
                        color: "var(--primary-50)",
                      }}
                    >
                      <IconComponent size={22} />
                    </div>
                    <div>
                      <h3
                        className="text-base font-semibold"
                        style={{ color: "var(--text-default)" }}
                      >
                        {obj.name}
                      </h3>
                      <p
                        className="text-sm mt-0.5"
                        style={{ color: "var(--text-subdued-1)" }}
                      >
                        {formatCount(obj.recordCount)} records &middot;{" "}
                        {obj.fields.length} fields
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="mt-1 transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ color: "var(--text-subdued-2)" }}
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {obj.fields.slice(0, 4).map((field) => (
                    <span
                      key={field.id}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "var(--surface-10)",
                        color: "var(--text-subdued-1)",
                      }}
                    >
                      {field.name}
                    </span>
                  ))}
                  {obj.fields.length > 4 && (
                    <span
                      className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "var(--surface-10)",
                        color: "var(--text-subdued-2)",
                      }}
                    >
                      +{obj.fields.length - 4} more
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <CreateObjectDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateObject}
      />
    </div>
  );
}
