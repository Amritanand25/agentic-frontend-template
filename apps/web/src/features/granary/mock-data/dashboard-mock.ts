import type {
  DashboardKPI,
  BrandPerformance,
  SalesTrendData,
  OverallPerformance,
} from "../types";

export const mockKPIs: DashboardKPI[] = [
  {
    label: "Total Sales",
    value: 0.0,
    unit: "Cr",
    prefix: "\u20B9",
    tooltip: "Total revenue for the selected period",
  },
  {
    label: "Sales Quantity",
    value: 0.0,
    unit: "L",
    tooltip: "Total units sold in the period",
  },
  {
    label: "Markdown",
    value: 0.0,
    unit: "Cr",
    prefix: "\u20B9",
    tooltip: "Total markdown/discount value",
  },
  {
    label: "Active SKUs",
    value: 84672,
    unit: "",
    period: "90 days",
    tooltip: "SKUs with at least one sale in last 90 days",
  },
  {
    label: "Average ROS",
    value: 0.68,
    unit: "",
    period: "90 days",
    tooltip: "Average Rate of Sale per SKU over 90 days",
  },
  {
    label: "Average DOH",
    value: 21,
    unit: "days",
    period: "90 days",
    tooltip: "Average Days on Hand across all SKUs",
  },
  {
    label: "Availability",
    value: 57.23,
    unit: "%",
    period: "90 days",
    tooltip: "Percentage of time items were in stock",
  },
];

export const mockOverallPerformance: OverallPerformance = {
  totalNetSales: { current: 0.0, lastYear: 8.94, unit: "Cr" },
  categoryContribution: { current: 0.0, lastYear: 8.94, unit: "Cr" },
};

export const mockBrandPerformance: BrandPerformance[] = [
  {
    brandId: "06688",
    brandName: "LOOSE",
    cySales: 19.83,
    cyMargin: 7.74,
    lySales: 11.58,
  },
  {
    brandId: "A989",
    brandName: "Good Life",
    cySales: 13.6,
    cyMargin: 1.8,
    lySales: 12.49,
  },
  {
    brandId: "02010",
    brandName: "AMUL",
    cySales: 8.26,
    cyMargin: -0.58,
    lySales: 6.06,
  },
  {
    brandId: "02265",
    brandName: "FORTUNE",
    cySales: 7.98,
    cyMargin: 8.76,
    lySales: 2.23,
  },
  {
    brandId: "02816",
    brandName: "GOWARDHAN",
    cySales: 3.88,
    cyMargin: 6.73,
    lySales: 2.2,
  },
  {
    brandId: "06515",
    brandName: "LOOSE",
    cySales: 3.74,
    cyMargin: 9.05,
    lySales: 1.78,
  },
];

export const mockSalesTrend: SalesTrendData = {
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
    9.0, 15.5, 12.0, 11.5, 10.0, 7.5, 9.5, 11.0, 10.5, 12.0, 11.0, 10.5,
  ],
  current: [0, 0, 0, 0, 0, 0, 0, 9.0, 7.0, 12.0, 14.0, 4.5],
};
