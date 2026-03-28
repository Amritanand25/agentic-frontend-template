import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Skeleton } from "@repo/ui";
import {
  Search,
  Plus,
  Building2,
  Users,
  DollarSign,
  Database,
  ArrowLeft,
} from "lucide-react";
import { useSchemaStore, type FieldType } from "@/stores/schema-store";
import {
  DataTable,
  CreateRecordDialog,
  useRecordsStore,
} from "@/features/tables";

/** Map icon name strings from schema to Lucide components */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Building2,
  Users,
  DollarSign,
  Database,
};

function formatRecordCount(count: number): string {
  if (count >= 1000) {
    return new Intl.NumberFormat("en-US").format(count);
  }
  return count.toString();
}

export default function ObjectDetailPage() {
  const { objectId } = useParams<{ objectId: string }>();
  const navigate = useNavigate();
  const { getObject, addField, isLoading: schemaLoading } = useSchemaStore();
  const { loadRecords, getRecords, addRecord } = useRecordsStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const object = objectId ? getObject(objectId) : undefined;
  const records = objectId ? getRecords(objectId) : [];

  // Load records when objectId changes
  useEffect(() => {
    if (objectId) {
      loadRecords(objectId);
    }
  }, [objectId, loadRecords]);

  // Show loading skeleton while schema loads
  if (schemaLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-9 w-32" />
          </div>
        </div>
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    );
  }

  // Object not found
  if (!object) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "var(--surface-10)" }}
          >
            <Database size={24} style={{ color: "var(--text-subdued-2)" }} />
          </div>
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--text-default)" }}
          >
            Object not found
          </h2>
          <p
            className="text-sm mb-4 max-w-md"
            style={{ color: "var(--text-subdued-1)" }}
          >
            The object you are looking for does not exist or has been deleted.
          </p>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = ICON_MAP[object.icon] ?? Database;
  const recordCount = records.length || object.recordCount;

  function handleCreateRecord(data: Record<string, unknown>) {
    if (objectId) {
      addRecord(objectId, data);
    }
  }

  function handleAddColumn(name: string, type: FieldType) {
    if (objectId) {
      addField(objectId, name, type);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left side: icon + title + count */}
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
            <div className="flex items-center gap-2">
              <h1
                className="text-xl font-semibold"
                style={{ color: "var(--text-default)" }}
              >
                {object.name}
              </h1>
              <span
                className="text-sm font-medium tabular-nums px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "var(--surface-10)",
                  color: "var(--text-subdued-1)",
                }}
              >
                {formatRecordCount(recordCount)}
              </span>
            </div>
          </div>
        </div>

        {/* Right side: search + add */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--text-subdued-2)" }}
            />
            <Input
              type="search"
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
              aria-label="Search records"
            />
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus size={16} className="mr-1.5" />
            Add Record
          </Button>
        </div>
      </div>

      {/* Data Table — specific height to fit viewport */}
      <DataTable
        fields={object.fields}
        records={records}
        searchQuery={searchQuery}
        height="calc(100vh - 160px)"
        onAddColumn={handleAddColumn}
      />

      {/* Create Record Dialog */}
      <CreateRecordDialog
        object={object}
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateRecord}
      />
    </div>
  );
}
