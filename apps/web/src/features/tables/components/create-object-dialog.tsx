import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Label,
} from "@repo/ui";
import {
  Building2,
  Users,
  DollarSign,
  Database,
  FileText,
  ShoppingCart,
  Briefcase,
  Tag,
  Globe,
  Heart,
  Star,
  Zap,
} from "lucide-react";
import { cn } from "@repo/utils";

interface CreateObjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string, icon: string) => void;
}

const ICONS = [
  { name: "Building2", icon: Building2 },
  { name: "Users", icon: Users },
  { name: "DollarSign", icon: DollarSign },
  { name: "Database", icon: Database },
  { name: "FileText", icon: FileText },
  { name: "ShoppingCart", icon: ShoppingCart },
  { name: "Briefcase", icon: Briefcase },
  { name: "Tag", icon: Tag },
  { name: "Globe", icon: Globe },
  { name: "Heart", icon: Heart },
  { name: "Star", icon: Star },
  { name: "Zap", icon: Zap },
];

export function CreateObjectDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateObjectDialogProps) {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Database");
  const [error, setError] = useState("");

  function handleOpenChange(next: boolean) {
    if (!next) {
      setName("");
      setSelectedIcon("Database");
      setError("");
    }
    onOpenChange(next);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Object name is required");
      return;
    }
    onSubmit(trimmed, selectedIcon);
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-[480px]"
        style={{
          backgroundColor: "var(--surface-0)",
          borderColor: "var(--grey-40)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "var(--text-default)" }}>
            Create New Object
          </DialogTitle>
          <DialogDescription style={{ color: "var(--text-subdued-1)" }}>
            Objects are custom database tables. A default &quot;Name&quot; field
            will be added automatically.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="object-name"
              className="text-sm font-medium"
              style={{ color: "var(--text-default)" }}
            >
              Name <span style={{ color: "var(--error-50)" }}>*</span>
            </Label>
            <Input
              id="object-name"
              placeholder="e.g. Products, Tasks, Invoices..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              autoFocus
              aria-invalid={!!error}
              style={{
                borderColor: error ? "var(--error-50)" : undefined,
              }}
            />
            {error && (
              <p
                className="text-xs"
                style={{ color: "var(--error-50)" }}
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              className="text-sm font-medium"
              style={{ color: "var(--text-default)" }}
            >
              Icon
            </Label>
            <div className="grid grid-cols-6 gap-2">
              {ICONS.map(({ name: iconName, icon: IconComp }) => (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setSelectedIcon(iconName)}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150",
                  )}
                  style={{
                    backgroundColor:
                      selectedIcon === iconName
                        ? "var(--primary-10)"
                        : "var(--surface-10)",
                    color:
                      selectedIcon === iconName
                        ? "var(--primary-50)"
                        : "var(--text-subdued-1)",
                    border:
                      selectedIcon === iconName
                        ? "2px solid var(--primary-50)"
                        : "2px solid transparent",
                    cursor: "pointer",
                  }}
                  aria-label={iconName}
                  aria-pressed={selectedIcon === iconName}
                >
                  <IconComp size={20} />
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Object</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
