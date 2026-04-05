# Platform Landing Page - Add Granary Card

**Type:** Enhancement
**Size:** Small
**Status:** Draft
**Created:** 2026-04-04
**Priority:** High
**Parent:** [module-granary.md](./module-granary.md)

## Overview

Add a third "Granary" card to the platform landing page (`/`) alongside the existing "Design System" and "Relio CRM" cards. Clicking the card navigates to the Granary application.

## Requirements

- [ ] Add a "Granary" card as the third option on the platform home page
- [ ] Card uses tertiary color scheme (`var(--tertiary-*)`) to differentiate from existing cards
- [ ] Update grid from `md:grid-cols-2` to `md:grid-cols-3` for 3 cards
- [ ] Clicking the card navigates to `/granary/home`
- [ ] Card matches the existing card pattern (icon, title, description, bullet points, CTA link)

## Design Tokens

| Element         | Token                      |
| --------------- | -------------------------- |
| Card background | `var(--surface-0)`         |
| Card border     | `1px solid var(--grey-40)` |
| Icon background | `var(--tertiary-10)`       |
| Icon color      | `var(--tertiary-50)`       |
| Bullet dots     | `var(--tertiary-50)`       |
| CTA text        | `var(--tertiary-50)`       |
| Title           | `var(--text-default)`      |
| Description     | `var(--text-subdued-1)`    |
| Bullet text     | `var(--text-subdued-1)`    |

## Card Content

```
Icon: Wheat (from lucide-react)
Title: Granary
Description: Grocery planning dashboard with assortment intelligence and forecasting

Bullet points:
- Assortment Intelligence
- Demand Forecasting
- Inventory Planning
- Performance Dashboard

CTA: "Launch Granary →"
Route: /granary/home
```

## Components to Reuse

| Component                                                           | Source         | Usage                            |
| ------------------------------------------------------------------- | -------------- | -------------------------------- |
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` | `@repo/ui`     | Card structure                   |
| `Wheat` icon                                                        | `lucide-react` | Granary icon (grain/wheat theme) |
| `ArrowRight` icon                                                   | `lucide-react` | CTA arrow (already imported)     |

## File Changes

| File                               | Action | Details                            |
| ---------------------------------- | ------ | ---------------------------------- |
| `apps/web/src/pages/home-page.tsx` | Modify | Add Granary card, update grid cols |
| `apps/web/src/App.tsx`             | Modify | Add Granary routes (lazy-loaded)   |

## Route Registration in App.tsx

```typescript
// Lazy load Granary layout and pages
const GranaryLayout = lazy(() => import("@/features/granary/components/granary-layout"));
const GranaryHomePage = lazy(() => import("@/pages/granary/home-page"));
const GranaryDashboardPage = lazy(() => import("@/pages/granary/dashboard-page"));
const BaselineForecastPage = lazy(() => import("@/pages/granary/baseline-forecast-page"));
const CategoryOverviewPage = lazy(() => import("@/pages/granary/category-overview-page"));
const SubCategoryDetailPage = lazy(() => import("@/pages/granary/sub-category-detail-page"));
const RangeReviewPage = lazy(() => import("@/pages/granary/range-review-page"));
const RequestsPage = lazy(() => import("@/pages/granary/requests-page"));
const RequestDetailPage = lazy(() => import("@/pages/granary/request-detail-page"));
const DelistRequestPage = lazy(() => import("@/pages/granary/delist-request/delist-request-page"));

// Routes
<Route path="/granary" element={<GranaryLayout />}>
  <Route path="home" element={<GranaryHomePage />} />
  <Route path="dashboard" element={<GranaryDashboardPage />} />
  <Route path="forecasting">
    <Route path="baseline" element={<BaselineForecastPage />} />
  </Route>
  <Route path="assortment">
    <Route path="category" element={<CategoryOverviewPage />} />
    <Route path="category/:categoryId/sub/:subCategoryId" element={<SubCategoryDetailPage />} />
    <Route path="range-review" element={<RangeReviewPage />} />
    <Route path="requests" element={<RequestsPage />} />
    <Route path="requests/:requestId" element={<RequestDetailPage />} />
  </Route>
</Route>
{/* Delist wizard is full-screen (no sidebar) */}
<Route path="/granary/assortment/delist-request" element={<DelistRequestPage />} />
```

## Acceptance Criteria

- [ ] Platform landing page shows 3 cards in a row on desktop
- [ ] Granary card uses tertiary color scheme (teal/green)
- [ ] Clicking "Launch Granary" navigates to `/granary/home`
- [ ] Card hover effect matches existing cards (shadow + translate)
- [ ] Responsive: cards stack on mobile (1 col)
