// Global filter state used across all Granary pages
export interface GranaryFilters {
  zone?: string;
  format?: string;
  state?: string;
  city?: string;
  store?: string;
  segment?: string;
  category?: string;
  period?: string;
}

export type GranaryFilterKey = keyof GranaryFilters;

// Exception alert on Home page
export interface ExceptionAlert {
  id: string;
  type: "zero_sales" | "negative_inventory" | "high_doh";
  priority: "high" | "medium" | "low";
  siteSkuCount: number;
  label: string;
}

// DOH heatmap block
export interface DOHBlock {
  range: string;
  inventoryCost: number;
  inventoryCount: number;
  riskLevel: "optimal" | "moderate" | "critical";
}

// Dashboard KPI
export interface DashboardKPI {
  label: string;
  value: number;
  unit: string;
  prefix?: string;
  period?: string;
  tooltip: string;
}

// Brand performance row
export interface BrandPerformance {
  brandId: string;
  brandName: string;
  cySales: number;
  cyMargin: number;
  lySales: number;
}

// Forecast row
export interface ForecastEntry {
  site: string;
  articleId: string;
  description: string;
  forecasts: Record<string, number>;
}

export interface ForecastDate {
  date: string;
  weekLabel: string;
}

// Category overview
export interface CategoryFormat {
  formatName: string;
  articleCount: number;
  locationCount: number;
  totalSales: number;
  salesQuantity: number;
  grossMargin: number;
  grossMarginPct: number;
}

export interface SubCategory {
  name: string;
  articleCount: number;
  totalSales: number;
  salesQuantity: number;
  grossMarginPct: number;
}

// Classification matrix cell
export interface ClassificationCell {
  code: string;
  revenue: "A" | "B" | "C";
  demandStability: "X" | "Y" | "Z";
  percentage: number;
  skuType: "strategic" | "regular" | "review";
}

// NOB vs Volume card
export interface NOBCategory {
  name: string;
  description: string;
  skuCount: number;
  billsPct: number;
  volumePct: number;
  avgUPB: number;
  color: string;
}

// Range review article row
export interface RangedArticle {
  articleCode: string;
  articleName: string;
  storeCount: number;
  subCategory: string;
  brick: string;
  classification: string;
}

// Delist/list request
export interface DelistRequest {
  requestId: string;
  requestTime: string;
  requestedBy: string;
  requestType: "Delist" | "List";
  category: string;
  storeCount: number;
  productCount: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

// Request detail
export interface RequestDetail extends DelistRequest {
  subCategory: string;
  format: string;
  zone: string;
  state: string;
  raisedOn: string;
  raisedBy: string;
  articles: RequestArticle[];
}

export interface RequestArticle {
  articleCode: string;
  articleName: string;
  subCategory: string;
  affectedStores: number;
  totalStores: number;
  reason?: string;
  stores: StoreInfo[];
}

export interface StoreInfo {
  name: string;
  code: string;
  state: string;
  city: string;
  classificationMatrix?: number;
  salesVelocity?: number;
  revenueContribution?: number;
}

// Delist wizard state
export interface DelistWizardState {
  currentStep: 1 | 2 | 3;
  selectedArticles: SelectedArticle[];
  storeTargetingMode: Record<string, "affected" | "ranged" | "custom">;
  selectedStores: Record<string, StoreInfo[]>;
  globalReason?: string;
  articleReasons: Record<string, string>;
  isDirty: boolean;
}

export interface SelectedArticle {
  articleCode: string;
  articleName: string;
  subCategory: string;
  affectedCount: number;
  rangedCount: number;
}

// Brick performance
export interface BrickPerformance {
  brickCode: string;
  brickName: string;
  firstSalesDate: string;
  salesContribution: number;
  totalSales: number;
  salesQty: number;
}

// Region performance
export interface RegionPerformance {
  region: string;
  quantity: number;
  sales: number;
}

// Overstocked store
export interface OverstockedStore {
  code: string;
  name: string;
  value: number;
}

// Sales trend data
export interface SalesTrendData {
  weeks: string[];
  lastYear: number[];
  current: number[];
}

// Gross margin data
export interface GrossMarginData {
  weeks: string[];
  lastYear: number[];
  current: number[];
}

// Overall performance
export interface OverallPerformance {
  totalNetSales: { current: number; lastYear: number; unit: string };
  categoryContribution: { current: number; lastYear: number; unit: string };
}

// Negative inventory product (for exception modal)
export interface NegativeInventoryProduct {
  site: string;
  productCode: string;
  product: string;
  rateOfSale: number;
  daysOnHand: number;
  inventory: number;
}

// Top category for DOH breakdown
export interface TopCategory {
  name: string;
  skuCount: number;
  cost: number;
}
