export const mockExceptions = [
  {
    id: "1",
    type: "zero_sales" as const,
    priority: "high" as const,
    siteSkuCount: 124401,
    label: "Zero Sales Alert",
  },
  {
    id: "2",
    type: "negative_inventory" as const,
    priority: "high" as const,
    siteSkuCount: 3904,
    label: "Negative Inventory Alert",
  },
  {
    id: "3",
    type: "high_doh" as const,
    priority: "high" as const,
    siteSkuCount: 943,
    label: "High Doh Alert",
  },
];

export const mockDOHBlocks = [
  {
    range: "61-70 doh",
    inventoryCost: 1.56,
    inventoryCount: 3421,
    riskLevel: "critical" as const,
  },
  {
    range: "91-100 doh",
    inventoryCost: 0.71,
    inventoryCount: 1502,
    riskLevel: "critical" as const,
  },
  {
    range: "100+ doh",
    inventoryCost: 14.03,
    inventoryCount: 19991,
    riskLevel: "critical" as const,
  },
  {
    range: "31-40 doh",
    inventoryCost: 4.89,
    inventoryCount: 8732,
    riskLevel: "moderate" as const,
  },
  {
    range: "71-80 doh",
    inventoryCost: 1.44,
    inventoryCount: 2987,
    riskLevel: "critical" as const,
  },
  {
    range: "41-50 doh",
    inventoryCost: 2.7,
    inventoryCount: 5431,
    riskLevel: "moderate" as const,
  },
  {
    range: "1-10 doh",
    inventoryCost: 41.73,
    inventoryCount: 65432,
    riskLevel: "optimal" as const,
  },
  {
    range: "11-20 doh",
    inventoryCost: 12.22,
    inventoryCount: 25678,
    riskLevel: "optimal" as const,
  },
];

export const mockNegativeInventoryProducts = [
  {
    site: "2021",
    productCode: "490379751",
    product: "RATNAGLD PRM KRNOL SONAMSR RICE 25kg BAG",
    rateOfSale: 0.0,
    daysOnHand: 0,
    inventory: -7,
  },
  {
    site: "2021",
    productCode: "491471681",
    product: "MODERN WOW VANILLA CAKE 60g PP",
    rateOfSale: 0.0,
    daysOnHand: 0,
    inventory: -1,
  },
  {
    site: "2079",
    productCode: "490176160",
    product: "LOOSE SUGAR M",
    rateOfSale: 0.5,
    daysOnHand: 3,
    inventory: -12,
  },
  {
    site: "2079",
    productCode: "494626326",
    product: "PARAMPARA REFINED SOYABEAN OIL 800G PCH",
    rateOfSale: 0.2,
    daysOnHand: 5,
    inventory: -3,
  },
  {
    site: "2202",
    productCode: "490174095",
    product: "LOOSE LOKWAN GRADE 1",
    rateOfSale: 0.8,
    daysOnHand: 2,
    inventory: -15,
  },
];

export const mockTopCategories = [
  { name: "Casual Wear", skuCount: 1523, cost: 0.22 },
  { name: "WOMENS WEAR", skuCount: 1385, cost: 0.3 },
  { name: "Ethnic Wear", skuCount: 1139, cost: 0.18 },
];

export const mockTopSites = [
  { name: "RCP - 5518", skuCount: 845, cost: 0.45 },
  { name: "Acme Mall - 6217", skuCount: 723, cost: 0.38 },
  { name: "Phoenix - 6220", skuCount: 612, cost: 0.31 },
];

// SKU detail view mock (for when a DOH block is clicked)
export const mockSKUDetails = [
  {
    site: "2021",
    article: "LOOSE SUGAR M",
    category: "Food",
    subCategory: "Sugar",
    doh: 105,
    inventoryCount: 500,
    salesQty: 12,
    inventoryCost: 0.15,
  },
  {
    site: "2079",
    article: "TATA IODISED SALT 1kg",
    category: "Food",
    subCategory: "Salt",
    doh: 112,
    inventoryCount: 320,
    salesQty: 8,
    inventoryCost: 0.08,
  },
  {
    site: "2202",
    article: "AMUL GOLD MILK 1L",
    category: "Dairy",
    subCategory: "Milk",
    doh: 103,
    inventoryCount: 150,
    salesQty: 45,
    inventoryCost: 0.12,
  },
  {
    site: "2268",
    article: "FORTUNE SOYA OIL 1L",
    category: "Food",
    subCategory: "Oil",
    doh: 118,
    inventoryCount: 200,
    salesQty: 5,
    inventoryCost: 0.22,
  },
  {
    site: "2233",
    article: "PARLE-G BISCUIT 800g",
    category: "Food",
    subCategory: "Biscuits",
    doh: 130,
    inventoryCount: 180,
    salesQty: 3,
    inventoryCost: 0.06,
  },
];
