import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, Skeleton } from "@repo/ui";
import { ComponentsLayout } from "@/layouts/components-layout";
import { AppLayout } from "@/layouts/app-layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ThemeProvider } from "@/contexts/theme-context";

// -- Main pages (eagerly loaded since they are landing routes) --
import HomePage from "./pages/home-page";

// -- Auth pages (lazy loaded) --
const LoginPage = lazy(() => import("./pages/login-page"));
const SignupPage = lazy(() => import("./pages/signup-page"));
const SelectOrgPage = lazy(() => import("./pages/select-org-page"));
const SelectTenantPage = lazy(() => import("./pages/select-tenant-page"));

// -- Relio landing --
const RelioHomePage = lazy(() => import("./pages/apps/relio/index"));

// -- App pages (lazy loaded, inside protected layout) --
const DashboardPage = lazy(() => import("./pages/app/dashboard/index"));
const ObjectsPage = lazy(() => import("./pages/app/objects/index"));
const ObjectDetailPage = lazy(
  () => import("./pages/app/objects/[objectId]/index"),
);
const ConversationsPage = lazy(() => import("./pages/app/conversations/index"));
const WorkflowsPage = lazy(() => import("./pages/app/workflows/index"));
const WorkflowBuilderPage = lazy(() => import("./pages/app/workflows/builder"));
const SettingsPage = lazy(() => import("./pages/app/settings/index"));

// -- Component pages (lazy loaded) --
const ComponentsIndexPage = lazy(() => import("./pages/components/index-page"));
const AccordionPage = lazy(() => import("./pages/components/accordion-page"));
const AlertPage = lazy(() => import("./pages/components/alert-page"));
const AlertDialogPage = lazy(
  () => import("./pages/components/alert-dialog-page"),
);
const AspectRatioPage = lazy(
  () => import("./pages/components/aspect-ratio-page"),
);
const AvatarPage = lazy(() => import("./pages/components/avatar-page"));
const BadgePage = lazy(() => import("./pages/components/badge-page"));
const BreadcrumbPage = lazy(() => import("./pages/components/breadcrumb-page"));
const ButtonPage = lazy(() => import("./pages/components/button-page"));
const CalendarPage = lazy(() => import("./pages/components/calendar-page"));
const CardPage = lazy(() => import("./pages/components/card-page"));
const CarouselPage = lazy(() => import("./pages/components/carousel-page"));
const CheckboxPage = lazy(() => import("./pages/components/checkbox-page"));
const CollapsiblePage = lazy(
  () => import("./pages/components/collapsible-page"),
);
const CommandPage = lazy(() => import("./pages/components/command-page"));
const ContextMenuPage = lazy(
  () => import("./pages/components/context-menu-page"),
);
const DialogPage = lazy(() => import("./pages/components/dialog-page"));
const DrawerPage = lazy(() => import("./pages/components/drawer-page"));
const DropdownMenuPage = lazy(
  () => import("./pages/components/dropdown-menu-page"),
);
const FormPage = lazy(() => import("./pages/components/form-page"));
const HoverCardPage = lazy(() => import("./pages/components/hover-card-page"));
const InputPage = lazy(() => import("./pages/components/input-page"));
const InputOTPPage = lazy(() => import("./pages/components/input-otp-page"));
const LabelPage = lazy(() => import("./pages/components/label-page"));
const MenubarPage = lazy(() => import("./pages/components/menubar-page"));
const NavigationMenuPage = lazy(
  () => import("./pages/components/navigation-menu-page"),
);
const PaginationPage = lazy(() => import("./pages/components/pagination-page"));
const PopoverPage = lazy(() => import("./pages/components/popover-page"));
const ProgressPage = lazy(() => import("./pages/components/progress-page"));
const RadioGroupPage = lazy(
  () => import("./pages/components/radio-group-page"),
);
const ResizablePage = lazy(() => import("./pages/components/resizable-page"));
const ScrollAreaPage = lazy(
  () => import("./pages/components/scroll-area-page"),
);
const SelectPage = lazy(() => import("./pages/components/select-page"));
const SeparatorPage = lazy(() => import("./pages/components/separator-page"));
const SheetPage = lazy(() => import("./pages/components/sheet-page"));
const SkeletonPage = lazy(() => import("./pages/components/skeleton-page"));
const SliderPage = lazy(() => import("./pages/components/slider-page"));
const SonnerPage = lazy(() => import("./pages/components/sonner-page"));
const SwitchPage = lazy(() => import("./pages/components/switch-page"));
const TablePage = lazy(() => import("./pages/components/table-page"));
const TabsPage = lazy(() => import("./pages/components/tabs-page"));
const TextareaPage = lazy(() => import("./pages/components/textarea-page"));
const TogglePage = lazy(() => import("./pages/components/toggle-page"));
const ToggleGroupPage = lazy(
  () => import("./pages/components/toggle-group-page"),
);
const TooltipPage = lazy(() => import("./pages/components/tooltip-page"));
const ErrorStatePage = lazy(
  () => import("./pages/components/error-state-page"),
);
const SwipeButtonPage = lazy(
  () => import("./pages/components/swipe-button-page"),
);
const SpinnerPage = lazy(() => import("./pages/components/spinner-page"));
const BannerPage = lazy(() => import("./pages/components/banner-page"));
const TimePickerPage = lazy(
  () => import("./pages/components/time-picker-page"),
);
const DatePickerPage = lazy(
  () => import("./pages/components/date-picker-page"),
);
const ProgressBarPage = lazy(
  () => import("./pages/components/progress-bar-page"),
);
const EmptyStatePage = lazy(
  () => import("./pages/components/empty-state-page"),
);
const FileUploadPage = lazy(
  () => import("./pages/components/file-upload-page"),
);
const NotificationNudgePage = lazy(
  () => import("./pages/components/notification-nudge-page"),
);
const StepperFlowPage = lazy(
  () => import("./pages/components/stepper-flow-page"),
);
const ProgressStepperPage = lazy(
  () => import("./pages/components/progress-stepper-page"),
);
const FilterPillPage = lazy(
  () => import("./pages/components/filter-pill-page"),
);
const DropdownPage = lazy(() => import("./pages/components/dropdown-page"));
const TitleBarPage = lazy(() => import("./pages/components/title-bar-page"));

// Data Grid pages
const BasicGridPage = lazy(
  () => import("./pages/components/data-grid/basic-page"),
);
const EditableGridPage = lazy(
  () => import("./pages/components/data-grid/editable-page"),
);
const SortableFilterableGridPage = lazy(
  () => import("./pages/components/data-grid/sortable-filterable-page"),
);
const RowSelectionGridPage = lazy(
  () => import("./pages/components/data-grid/row-selection-page"),
);
const FrozenColumnsGridPage = lazy(
  () => import("./pages/components/data-grid/frozen-columns-page"),
);
const ColumnGroupingGridPage = lazy(
  () => import("./pages/components/data-grid/column-grouping-page"),
);
const TreeGridPage = lazy(
  () => import("./pages/components/data-grid/tree-grid-page"),
);
const CustomRenderersGridPage = lazy(
  () => import("./pages/components/data-grid/custom-renderers-page"),
);
const SummaryRowsGridPage = lazy(
  () => import("./pages/components/data-grid/summary-rows-page"),
);
const FullFeaturedGridPage = lazy(
  () => import("./pages/components/data-grid/full-featured-page"),
);
const MasterDetailGridPage = lazy(
  () => import("./pages/components/data-grid/master-detail-page"),
);
const ShimmerLoadingGridPage = lazy(
  () => import("./pages/components/data-grid/shimmer-loading-page"),
);
const InfiniteScrollGridPage = lazy(
  () => import("./pages/components/data-grid/infinite-scroll-page"),
);
const RowEditModeGridPage = lazy(
  () => import("./pages/components/data-grid/row-edit-mode-page"),
);

// Graph pages
const AreaChartPage = lazy(
  () => import("./pages/components/graphs/area-chart-page"),
);
const BarChartPage = lazy(
  () => import("./pages/components/graphs/bar-chart-page"),
);
const HorizontalBarChartPage = lazy(
  () => import("./pages/components/graphs/horizontal-bar-chart-page"),
);
const LineChartPage = lazy(
  () => import("./pages/components/graphs/line-chart-page"),
);
const PieChartPage = lazy(
  () => import("./pages/components/graphs/pie-chart-page"),
);
const DonutChartPage = lazy(
  () => import("./pages/components/graphs/donut-chart-page"),
);
const RadarChartPage = lazy(
  () => import("./pages/components/graphs/radar-chart-page"),
);
const RadialBarChartPage = lazy(
  () => import("./pages/components/graphs/radial-bar-chart-page"),
);
const ScatterChartPage = lazy(
  () => import("./pages/components/graphs/scatter-chart-page"),
);
const FunnelChartPage = lazy(
  () => import("./pages/components/graphs/funnel-chart-page"),
);
const TreemapPage = lazy(
  () => import("./pages/components/graphs/treemap-page"),
);
const ComboChartPage = lazy(
  () => import("./pages/components/graphs/combo-chart-page"),
);

/** Loading fallback for lazy-loaded routes */
function PageSkeleton() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-4 gap-4 mt-8">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            {/* ===== Public routes ===== */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/apps/relio" element={<RelioHomePage />} />

            {/* ===== Auth flow routes (require authentication, no sidebar) ===== */}
            <Route path="/select-org" element={<SelectOrgPage />} />
            <Route
              path="/:orgSlug/select-tenant"
              element={<SelectTenantPage />}
            />

            {/* ===== Full-screen builder routes (no sidebar) ===== */}
            <Route
              path="/:orgSlug/:tenantSlug/app/workflows/new"
              element={
                <ProtectedRoute>
                  <WorkflowBuilderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:orgSlug/:tenantSlug/app/workflows/:workflowId/edit"
              element={
                <ProtectedRoute>
                  <WorkflowBuilderPage />
                </ProtectedRoute>
              }
            />

            {/* ===== Protected app routes (sidebar layout) ===== */}
            <Route
              path="/:orgSlug/:tenantSlug/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="objects" element={<ObjectsPage />} />
              <Route path="objects/:objectId" element={<ObjectDetailPage />} />
              <Route path="conversations" element={<ConversationsPage />} />
              <Route path="workflows" element={<WorkflowsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* ===== Component library routes (existing) ===== */}
            <Route path="/components" element={<ComponentsLayout />}>
              <Route index element={<ComponentsIndexPage />} />
              <Route path="accordion" element={<AccordionPage />} />
              <Route path="alert" element={<AlertPage />} />
              <Route path="alert-dialog" element={<AlertDialogPage />} />
              <Route path="aspect-ratio" element={<AspectRatioPage />} />
              <Route path="avatar" element={<AvatarPage />} />
              <Route path="badge" element={<BadgePage />} />
              <Route path="breadcrumb" element={<BreadcrumbPage />} />
              <Route path="button" element={<ButtonPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="card" element={<CardPage />} />
              <Route path="carousel" element={<CarouselPage />} />
              <Route path="checkbox" element={<CheckboxPage />} />
              <Route path="collapsible" element={<CollapsiblePage />} />
              <Route path="command" element={<CommandPage />} />
              <Route path="context-menu" element={<ContextMenuPage />} />
              <Route path="dialog" element={<DialogPage />} />
              <Route path="drawer" element={<DrawerPage />} />
              <Route path="dropdown-menu" element={<DropdownMenuPage />} />
              <Route path="form" element={<FormPage />} />
              <Route path="hover-card" element={<HoverCardPage />} />
              <Route path="input" element={<InputPage />} />
              <Route path="input-otp" element={<InputOTPPage />} />
              <Route path="label" element={<LabelPage />} />
              <Route path="menubar" element={<MenubarPage />} />
              <Route path="navigation-menu" element={<NavigationMenuPage />} />
              <Route path="pagination" element={<PaginationPage />} />
              <Route path="popover" element={<PopoverPage />} />
              <Route path="progress" element={<ProgressPage />} />
              <Route path="radio-group" element={<RadioGroupPage />} />
              <Route path="resizable" element={<ResizablePage />} />
              <Route path="scroll-area" element={<ScrollAreaPage />} />
              <Route path="select" element={<SelectPage />} />
              <Route path="separator" element={<SeparatorPage />} />
              <Route path="sheet" element={<SheetPage />} />
              <Route path="skeleton" element={<SkeletonPage />} />
              <Route path="slider" element={<SliderPage />} />
              <Route path="sonner" element={<SonnerPage />} />
              <Route path="switch" element={<SwitchPage />} />
              <Route path="table" element={<TablePage />} />
              <Route path="tabs" element={<TabsPage />} />
              <Route path="textarea" element={<TextareaPage />} />
              <Route path="toggle" element={<TogglePage />} />
              <Route path="toggle-group" element={<ToggleGroupPage />} />
              <Route path="tooltip" element={<TooltipPage />} />
              <Route path="error-state" element={<ErrorStatePage />} />
              <Route path="swipe-button" element={<SwipeButtonPage />} />
              <Route path="spinner" element={<SpinnerPage />} />
              <Route path="banner" element={<BannerPage />} />
              <Route path="time-picker" element={<TimePickerPage />} />
              <Route path="date-picker" element={<DatePickerPage />} />
              <Route path="progress-bar" element={<ProgressBarPage />} />
              <Route path="empty-state" element={<EmptyStatePage />} />
              <Route path="file-upload" element={<FileUploadPage />} />
              <Route
                path="notification-nudge"
                element={<NotificationNudgePage />}
              />
              <Route path="stepper-flow" element={<StepperFlowPage />} />
              <Route
                path="progress-stepper"
                element={<ProgressStepperPage />}
              />
              <Route path="filter-pill" element={<FilterPillPage />} />
              <Route path="dropdown" element={<DropdownPage />} />
              <Route path="title-bar" element={<TitleBarPage />} />
              {/* Data Grid routes */}
              <Route path="data-grid/basic" element={<BasicGridPage />} />
              <Route path="data-grid/editable" element={<EditableGridPage />} />
              <Route
                path="data-grid/sortable-filterable"
                element={<SortableFilterableGridPage />}
              />
              <Route
                path="data-grid/row-selection"
                element={<RowSelectionGridPage />}
              />
              <Route
                path="data-grid/frozen-columns"
                element={<FrozenColumnsGridPage />}
              />
              <Route
                path="data-grid/column-grouping"
                element={<ColumnGroupingGridPage />}
              />
              <Route path="data-grid/tree-grid" element={<TreeGridPage />} />
              <Route
                path="data-grid/custom-renderers"
                element={<CustomRenderersGridPage />}
              />
              <Route
                path="data-grid/summary-rows"
                element={<SummaryRowsGridPage />}
              />
              <Route
                path="data-grid/full-featured"
                element={<FullFeaturedGridPage />}
              />
              <Route
                path="data-grid/master-detail"
                element={<MasterDetailGridPage />}
              />
              <Route
                path="data-grid/shimmer-loading"
                element={<ShimmerLoadingGridPage />}
              />
              <Route
                path="data-grid/infinite-scroll"
                element={<InfiniteScrollGridPage />}
              />
              <Route
                path="data-grid/row-edit-mode"
                element={<RowEditModeGridPage />}
              />
              {/* Graph routes */}
              <Route path="graphs/area-chart" element={<AreaChartPage />} />
              <Route path="graphs/bar-chart" element={<BarChartPage />} />
              <Route
                path="graphs/horizontal-bar-chart"
                element={<HorizontalBarChartPage />}
              />
              <Route path="graphs/line-chart" element={<LineChartPage />} />
              <Route path="graphs/pie-chart" element={<PieChartPage />} />
              <Route path="graphs/donut-chart" element={<DonutChartPage />} />
              <Route path="graphs/radar-chart" element={<RadarChartPage />} />
              <Route
                path="graphs/radial-bar-chart"
                element={<RadialBarChartPage />}
              />
              <Route
                path="graphs/scatter-chart"
                element={<ScatterChartPage />}
              />
              <Route path="graphs/funnel-chart" element={<FunnelChartPage />} />
              <Route path="graphs/treemap" element={<TreemapPage />} />
              <Route path="graphs/combo-chart" element={<ComboChartPage />} />
            </Route>
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
