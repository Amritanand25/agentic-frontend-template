import type {
  CategoryFormat,
  SubCategory,
  SalesTrendData,
  GrossMarginData,
  RegionPerformance,
  OverstockedStore,
  BrickPerformance,
} from "../types";

export const mockBusinessFormats: CategoryFormat[] = [
  {
    formatName: "SMART",
    articleCount: 405,
    locationCount: 8,
    totalSales: 0.0,
    salesQuantity: 300000,
    grossMargin: 0.0,
    grossMarginPct: 0,
  },
  {
    formatName: "SMART BAZAAR",
    articleCount: 319,
    locationCount: 3,
    totalSales: 0.0,
    salesQuantity: 103000,
    grossMargin: 0.0,
    grossMarginPct: 0,
  },
];

export const mockSubCategories: SubCategory[] = [
  {
    name: "BISCUITS",
    articleCount: 536,
    totalSales: 0.0,
    salesQuantity: 0,
    grossMarginPct: 0,
  },
  {
    name: "BRANDED BAKERY",
    articleCount: 3,
    totalSales: 0.0,
    salesQuantity: 0,
    grossMarginPct: 0,
  },
];

export const mockCategorySalesTrend: SalesTrendData = {
  weeks: [
    "W3",
    "W4",
    "W5",
    "W6",
    "W7",
    "W8",
    "W9",
    "W10",
    "W11",
    "W12",
    "W13",
    "W14",
  ],
  lastYear: [
    25.5, 34.0, 29.0, 27.5, 25.5, 22.0, 25.0, 24.0, 22.5, 25.0, 21.0, 20.0,
  ],
  current: [0, 0, 0, 0, 0, 0, 0, 17.0, 14.0, 22.5, 25.0, 10.0],
};

export const mockGrossMarginData: GrossMarginData = {
  weeks: [
    "W3",
    "W4",
    "W5",
    "W6",
    "W7",
    "W8",
    "W9",
    "W10",
    "W11",
    "W12",
    "W13",
    "W14",
  ],
  lastYear: [0.5, 1.2, 1.3, 1.4, 1.5, 1.6, 1.5, 1.6, 1.7, 2.0, 2.2, 2.3],
  current: [0, 0.2, 1.1, 1.2, 1.3, 1.4, 1.5, 1.5, 1.6, 2.1, 2.4, 2.55],
};

export const mockRegionPerformance: RegionPerformance[] = [
  { region: "MUM", quantity: 0, sales: 0.0 },
];

export const mockOverstockedStores: OverstockedStore[] = [
  { code: "FR00", name: "SBZ-DOMBIVILI-LODHA", value: 85 },
  { code: "TAJF", name: "Smart Badlapur West", value: 78 },
  { code: "5518", name: "RCP", value: 65 },
];

export const mockBrickPerformance: BrickPerformance[] = [];
