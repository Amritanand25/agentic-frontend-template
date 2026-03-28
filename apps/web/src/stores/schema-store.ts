import { create } from "zustand";

type FieldType =
  | "text"
  | "number"
  | "email"
  | "phone"
  | "url"
  | "date"
  | "datetime"
  | "boolean"
  | "select"
  | "multiselect"
  | "relation"
  | "file"
  | "richtext"
  | "formula"
  | "rollup";

interface FieldConfig {
  options?: string[];
  relatedObjectId?: string;
  formula?: string;
  defaultValue?: string | number | boolean;
}

interface Field {
  id: string;
  objectId: string;
  name: string;
  type: FieldType;
  config: FieldConfig;
  required: boolean;
  position: number;
}

interface CustomObject {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  icon: string;
  fields: Field[];
  recordCount: number;
  createdAt: string;
  updatedAt: string;
}

/** Default CRM objects seeded when schema is empty */
function getDefaultObjects(tenantId: string): CustomObject[] {
  const now = new Date().toISOString();
  return [
    {
      id: "obj_companies",
      tenantId,
      name: "Companies",
      slug: "companies",
      icon: "Building2",
      fields: [
        {
          id: "fld_company_name",
          objectId: "obj_companies",
          name: "Name",
          type: "text",
          config: {},
          required: true,
          position: 0,
        },
        {
          id: "fld_company_type",
          objectId: "obj_companies",
          name: "Type",
          type: "select",
          config: {
            options: [
              "B2B SaaS",
              "E-commerce",
              "Fintech",
              "Healthcare",
              "EdTech",
            ],
          },
          required: false,
          position: 1,
        },
        {
          id: "fld_company_revenue",
          objectId: "obj_companies",
          name: "Revenue",
          type: "number",
          config: {},
          required: false,
          position: 2,
        },
        {
          id: "fld_company_status",
          objectId: "obj_companies",
          name: "Status",
          type: "select",
          config: { options: ["Lead", "Active", "Churned"] },
          required: true,
          position: 3,
        },
        {
          id: "fld_company_email",
          objectId: "obj_companies",
          name: "Email",
          type: "email",
          config: {},
          required: false,
          position: 4,
        },
        {
          id: "fld_company_website",
          objectId: "obj_companies",
          name: "Website",
          type: "url",
          config: {},
          required: false,
          position: 5,
        },
        {
          id: "fld_company_phone",
          objectId: "obj_companies",
          name: "Phone",
          type: "phone",
          config: {},
          required: false,
          position: 6,
        },
        {
          id: "fld_company_founded",
          objectId: "obj_companies",
          name: "Founded",
          type: "date",
          config: {},
          required: false,
          position: 7,
        },
        {
          id: "fld_company_active",
          objectId: "obj_companies",
          name: "Is Active",
          type: "boolean",
          config: {},
          required: false,
          position: 8,
        },
        {
          id: "fld_company_tags",
          objectId: "obj_companies",
          name: "Tags",
          type: "multiselect",
          config: {
            options: ["Enterprise", "Startup", "Mid-market", "SMB"],
          },
          required: false,
          position: 9,
        },
      ],
      recordCount: 245,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "obj_contacts",
      tenantId,
      name: "Contacts",
      slug: "contacts",
      icon: "Users",
      fields: [
        {
          id: "fld_contact_name",
          objectId: "obj_contacts",
          name: "Full Name",
          type: "text",
          config: {},
          required: true,
          position: 0,
        },
        {
          id: "fld_contact_email",
          objectId: "obj_contacts",
          name: "Email",
          type: "email",
          config: {},
          required: true,
          position: 1,
        },
        {
          id: "fld_contact_phone",
          objectId: "obj_contacts",
          name: "Phone",
          type: "phone",
          config: {},
          required: false,
          position: 2,
        },
        {
          id: "fld_contact_company",
          objectId: "obj_contacts",
          name: "Company",
          type: "text",
          config: {},
          required: false,
          position: 3,
        },
        {
          id: "fld_contact_role",
          objectId: "obj_contacts",
          name: "Role",
          type: "text",
          config: {},
          required: false,
          position: 4,
        },
        {
          id: "fld_contact_linkedin",
          objectId: "obj_contacts",
          name: "LinkedIn",
          type: "url",
          config: {},
          required: false,
          position: 5,
        },
        {
          id: "fld_contact_tags",
          objectId: "obj_contacts",
          name: "Tags",
          type: "multiselect",
          config: {
            options: ["Decision Maker", "Champion", "Influencer", "End User"],
          },
          required: false,
          position: 6,
        },
        {
          id: "fld_contact_last_contacted",
          objectId: "obj_contacts",
          name: "Last Contacted",
          type: "date",
          config: {},
          required: false,
          position: 7,
        },
      ],
      recordCount: 1023,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "obj_deals",
      tenantId,
      name: "Deals",
      slug: "deals",
      icon: "DollarSign",
      fields: [
        {
          id: "fld_deal_name",
          objectId: "obj_deals",
          name: "Deal Name",
          type: "text",
          config: {},
          required: true,
          position: 0,
        },
        {
          id: "fld_deal_value",
          objectId: "obj_deals",
          name: "Value",
          type: "number",
          config: {},
          required: false,
          position: 1,
        },
        {
          id: "fld_deal_stage",
          objectId: "obj_deals",
          name: "Stage",
          type: "select",
          config: {
            options: [
              "Prospecting",
              "Qualification",
              "Proposal",
              "Negotiation",
              "Closed Won",
              "Closed Lost",
            ],
          },
          required: true,
          position: 2,
        },
        {
          id: "fld_deal_company",
          objectId: "obj_deals",
          name: "Company",
          type: "text",
          config: {},
          required: false,
          position: 3,
        },
        {
          id: "fld_deal_close_date",
          objectId: "obj_deals",
          name: "Close Date",
          type: "date",
          config: {},
          required: false,
          position: 4,
        },
        {
          id: "fld_deal_probability",
          objectId: "obj_deals",
          name: "Probability",
          type: "number",
          config: {},
          required: false,
          position: 5,
        },
        {
          id: "fld_deal_owner",
          objectId: "obj_deals",
          name: "Owner",
          type: "text",
          config: {},
          required: false,
          position: 6,
        },
      ],
      recordCount: 87,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

interface SchemaStore {
  objects: Map<string, CustomObject>;
  isLoading: boolean;

  loadSchema: (tenantId: string) => Promise<void>;
  addObject: (object: CustomObject) => void;
  updateObject: (objectId: string, updates: Partial<CustomObject>) => void;
  deleteObject: (objectId: string) => void;
  addField: (objectId: string, name: string, type: FieldType) => void;
  getObject: (objectId: string) => CustomObject | undefined;
  getObjectsList: () => CustomObject[];
  reset: () => void;
}

export const useSchemaStore = create<SchemaStore>()((set, get) => ({
  objects: new Map(),
  isLoading: false,

  loadSchema: async (tenantId: string) => {
    set({ isLoading: true });

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    const currentObjects = get().objects;

    // Seed default objects if schema is empty
    if (currentObjects.size === 0) {
      const defaults = getDefaultObjects(tenantId);
      const seeded = new Map<string, CustomObject>();
      for (const obj of defaults) {
        seeded.set(obj.id, obj);
      }
      set({ objects: seeded, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  addObject: (object: CustomObject) => {
    const objects = new Map(get().objects);
    objects.set(object.id, object);
    set({ objects });
  },

  updateObject: (objectId: string, updates: Partial<CustomObject>) => {
    const objects = new Map(get().objects);
    const existing = objects.get(objectId);
    if (existing) {
      objects.set(objectId, { ...existing, ...updates });
      set({ objects });
    }
  },

  deleteObject: (objectId: string) => {
    const objects = new Map(get().objects);
    objects.delete(objectId);
    set({ objects });
  },

  addField: (objectId: string, name: string, type: FieldType) => {
    const objects = new Map(get().objects);
    const existing = objects.get(objectId);
    if (existing) {
      const newField: Field = {
        id: `fld_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        objectId,
        name,
        type,
        config: {},
        required: false,
        position: existing.fields.length,
      };
      objects.set(objectId, {
        ...existing,
        fields: [...existing.fields, newField],
        updatedAt: new Date().toISOString(),
      });
      set({ objects });
    }
  },

  getObject: (objectId: string) => {
    return get().objects.get(objectId);
  },

  getObjectsList: () => {
    return Array.from(get().objects.values());
  },

  reset: () => {
    set({ objects: new Map(), isLoading: false });
  },
}));

export type { CustomObject, Field, FieldType, FieldConfig };
