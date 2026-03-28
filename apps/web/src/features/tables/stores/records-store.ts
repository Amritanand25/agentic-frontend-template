import { create } from "zustand";
import type { TableRecord } from "../types";
import { getMockRecords } from "../mock-data";

interface RecordsStore {
  records: Map<string, TableRecord[]>;
  loadRecords: (objectId: string) => void;
  addRecord: (objectId: string, data: Record<string, unknown>) => void;
  deleteRecords: (objectId: string, recordIds: string[]) => void;
  getRecords: (objectId: string) => TableRecord[];
}

export const useRecordsStore = create<RecordsStore>()((set, get) => ({
  records: new Map(),

  loadRecords: (objectId: string) => {
    const existing = get().records.get(objectId);
    if (existing && existing.length > 0) return;

    const mockRecords = getMockRecords(objectId);
    const records = new Map(get().records);
    records.set(objectId, mockRecords);
    set({ records });
  },

  addRecord: (objectId: string, data: Record<string, unknown>) => {
    const records = new Map(get().records);
    const existing = records.get(objectId) ?? [];
    const now = new Date().toISOString();
    const newRecord: TableRecord = {
      id: `rec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      objectId,
      data,
      createdAt: now,
      updatedAt: now,
    };
    records.set(objectId, [newRecord, ...existing]);
    set({ records });
  },

  deleteRecords: (objectId: string, recordIds: string[]) => {
    const records = new Map(get().records);
    const existing = records.get(objectId) ?? [];
    const idsSet = new Set(recordIds);
    records.set(
      objectId,
      existing.filter((r) => !idsSet.has(r.id)),
    );
    set({ records });
  },

  getRecords: (objectId: string) => {
    return get().records.get(objectId) ?? [];
  },
}));
