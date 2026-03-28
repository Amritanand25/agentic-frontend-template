import type { FieldType } from "@/stores/schema-store";

export interface TableRecord {
  id: string;
  objectId: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TableColumn {
  id: string;
  fieldId: string;
  name: string;
  type: FieldType;
  options?: string[];
  required: boolean;
  visible: boolean;
  width: number;
  position: number;
}

export interface SortConfig {
  fieldId: string;
  direction: "asc" | "desc";
}

export interface FilterConfig {
  id: string;
  fieldId: string;
  operator: FilterOperator;
  value: string;
}

export type FilterOperator =
  | "equals"
  | "not_equals"
  | "contains"
  | "not_contains"
  | "greater_than"
  | "less_than"
  | "is_true"
  | "is_false"
  | "is_empty"
  | "is_not_empty";
