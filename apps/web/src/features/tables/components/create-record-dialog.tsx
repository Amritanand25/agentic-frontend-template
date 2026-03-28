import { useState, useCallback, useMemo } from "react";
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
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DatePicker,
} from "@repo/ui";
import type { Field, CustomObject } from "@/stores/schema-store";

interface CreateRecordDialogProps {
  object: CustomObject;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Record<string, unknown>) => void;
}

/** Builds a default/empty value for a given field type */
function getDefaultValue(field: Field): unknown {
  switch (field.type) {
    case "boolean":
      return false;
    case "number":
      return "";
    case "multiselect":
      return [];
    default:
      return "";
  }
}

export function CreateRecordDialog({
  object,
  open,
  onOpenChange,
  onSubmit,
}: CreateRecordDialogProps) {
  const sortedFields = useMemo(
    () => [...object.fields].sort((a, b) => a.position - b.position),
    [object.fields],
  );

  const initialFormData = useCallback(() => {
    const data: Record<string, unknown> = {};
    for (const field of sortedFields) {
      data[field.id] = getDefaultValue(field);
    }
    return data;
  }, [sortedFields]);

  const [formData, setFormData] =
    useState<Record<string, unknown>>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleOpenChange(next: boolean) {
    if (!next) {
      // Reset on close
      setFormData(initialFormData());
      setErrors({});
    }
    onOpenChange(next);
  }

  function updateField(fieldId: string, value: unknown) {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    // Clear error when field changes
    if (errors[fieldId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  }

  function handleMultiselectToggle(fieldId: string, option: string) {
    setFormData((prev) => {
      const current = (prev[fieldId] as string[]) ?? [];
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      return { ...prev, [fieldId]: next };
    });
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    for (const field of sortedFields) {
      if (field.required) {
        const val = formData[field.id];
        if (
          val === null ||
          val === undefined ||
          val === "" ||
          (Array.isArray(val) && val.length === 0)
        ) {
          newErrors[field.id] = `${field.name} is required`;
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    handleOpenChange(false);
  }

  function renderField(field: Field) {
    const value = formData[field.id];
    const error = errors[field.id];
    const fieldLabelId = `field-label-${field.id}`;
    const fieldErrorId = `field-error-${field.id}`;

    return (
      <div key={field.id} className="space-y-2">
        <Label
          htmlFor={field.id}
          id={fieldLabelId}
          className="text-sm font-medium"
          style={{ color: "var(--text-default)" }}
        >
          {field.name}
          {field.required && (
            <span
              className="ml-0.5"
              style={{ color: "var(--error-50, #dc2626)" }}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </Label>

        {field.type === "text" && (
          <Input
            id={field.id}
            type="text"
            value={String(value ?? "")}
            onChange={(e) => updateField(field.id, e.target.value)}
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? fieldErrorId : undefined}
            style={{
              borderColor: error ? "var(--error-50, #dc2626)" : undefined,
            }}
          />
        )}

        {field.type === "number" && (
          <Input
            id={field.id}
            type="number"
            value={String(value ?? "")}
            onChange={(e) =>
              updateField(
                field.id,
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? fieldErrorId : undefined}
            style={{
              borderColor: error ? "var(--error-50, #dc2626)" : undefined,
            }}
          />
        )}

        {field.type === "email" && (
          <Input
            id={field.id}
            type="email"
            value={String(value ?? "")}
            onChange={(e) => updateField(field.id, e.target.value)}
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? fieldErrorId : undefined}
            style={{
              borderColor: error ? "var(--error-50, #dc2626)" : undefined,
            }}
          />
        )}

        {field.type === "phone" && (
          <Input
            id={field.id}
            type="tel"
            value={String(value ?? "")}
            onChange={(e) => updateField(field.id, e.target.value)}
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? fieldErrorId : undefined}
            style={{
              borderColor: error ? "var(--error-50, #dc2626)" : undefined,
            }}
          />
        )}

        {field.type === "url" && (
          <Input
            id={field.id}
            type="url"
            placeholder="https://"
            value={String(value ?? "")}
            onChange={(e) => updateField(field.id, e.target.value)}
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? fieldErrorId : undefined}
            style={{
              borderColor: error ? "var(--error-50, #dc2626)" : undefined,
            }}
          />
        )}

        {field.type === "date" && (
          <DatePicker
            type="single"
            selectedDates={value ? [new Date(value as string)] : []}
            onDateChange={(dates) =>
              updateField(
                field.id,
                dates[0] ? dates[0].toISOString().split("T")[0] : "",
              )
            }
            placeholder={`Select ${field.name.toLowerCase()}`}
            required={field.required}
            validationState={error ? "error" : "default"}
            validationMessage={error}
          />
        )}

        {field.type === "datetime" && (
          <DatePicker
            type="single"
            selectedDates={value ? [new Date(value as string)] : []}
            onDateChange={(dates) =>
              updateField(field.id, dates[0] ? dates[0].toISOString() : "")
            }
            placeholder={`Select ${field.name.toLowerCase()}`}
            required={field.required}
            validationState={error ? "error" : "default"}
            validationMessage={error}
          />
        )}

        {field.type === "boolean" && (
          <div className="flex items-center gap-2 pt-1">
            <Checkbox
              id={field.id}
              checked={value === true}
              onCheckedChange={(checked) =>
                updateField(field.id, checked === true)
              }
              aria-describedby={error ? fieldErrorId : undefined}
            />
            <Label
              htmlFor={field.id}
              className="text-sm cursor-pointer"
              style={{ color: "var(--text-subdued-1)" }}
            >
              {field.name}
            </Label>
          </div>
        )}

        {field.type === "select" && field.config.options && (
          <Select
            value={String(value ?? "")}
            onValueChange={(v) => updateField(field.id, v)}
          >
            <SelectTrigger
              id={field.id}
              aria-required={field.required}
              aria-invalid={!!error}
              aria-describedby={error ? fieldErrorId : undefined}
              style={{
                borderColor: error ? "var(--error-50, #dc2626)" : undefined,
              }}
            >
              <SelectValue placeholder={`Select ${field.name.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.config.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {field.type === "multiselect" && field.config.options && (
          <div
            className="flex flex-wrap gap-2 rounded-md border p-3"
            style={{
              borderColor: error
                ? "var(--error-50, #dc2626)"
                : "var(--grey-40)",
            }}
            role="group"
            aria-labelledby={fieldLabelId}
          >
            {field.config.options.map((option) => {
              const selected = Array.isArray(value) && value.includes(option);
              return (
                <label
                  key={option}
                  className="flex items-center gap-1.5 cursor-pointer text-sm"
                  style={{ color: "var(--text-default)" }}
                >
                  <Checkbox
                    checked={selected}
                    onCheckedChange={() =>
                      handleMultiselectToggle(field.id, option)
                    }
                  />
                  {option}
                </label>
              );
            })}
          </div>
        )}

        {error && (
          <p
            id={fieldErrorId}
            className="text-xs"
            style={{ color: "var(--error-50, #dc2626)" }}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-[560px] max-h-[85vh] flex flex-col"
        style={{
          backgroundColor: "var(--surface-0)",
          borderColor: "var(--grey-40)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "var(--text-default)" }}>
            Add {object.name.replace(/s$/, "")}
          </DialogTitle>
          <DialogDescription style={{ color: "var(--text-subdued-1)" }}>
            Create a new record in {object.name}. Fields marked with * are
            required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto space-y-4 py-4 px-1">
            {sortedFields.map(renderField)}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Record</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
