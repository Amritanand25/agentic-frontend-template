import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ComponentsLayout } from "@/layouts/components-layout"
import { Toaster } from "@repo/ui"

// Component pages
import ComponentsIndexPage from "./pages/components/index-page"
import AccordionPage from "./pages/components/accordion-page"
import AlertPage from "./pages/components/alert-page"
import AlertDialogPage from "./pages/components/alert-dialog-page"
import AspectRatioPage from "./pages/components/aspect-ratio-page"
import AvatarPage from "./pages/components/avatar-page"
import BadgePage from "./pages/components/badge-page"
import BreadcrumbPage from "./pages/components/breadcrumb-page"
import ButtonPage from "./pages/components/button-page"
import CalendarPage from "./pages/components/calendar-page"
import CardPage from "./pages/components/card-page"
import CarouselPage from "./pages/components/carousel-page"
import CheckboxPage from "./pages/components/checkbox-page"
import CollapsiblePage from "./pages/components/collapsible-page"
import CommandPage from "./pages/components/command-page"
import ContextMenuPage from "./pages/components/context-menu-page"
import DialogPage from "./pages/components/dialog-page"
import DrawerPage from "./pages/components/drawer-page"
import DropdownMenuPage from "./pages/components/dropdown-menu-page"
import FormPage from "./pages/components/form-page"
import HoverCardPage from "./pages/components/hover-card-page"
import InputPage from "./pages/components/input-page"
import InputOTPPage from "./pages/components/input-otp-page"
import LabelPage from "./pages/components/label-page"
import MenubarPage from "./pages/components/menubar-page"
import NavigationMenuPage from "./pages/components/navigation-menu-page"
import PaginationPage from "./pages/components/pagination-page"
import PopoverPage from "./pages/components/popover-page"
import ProgressPage from "./pages/components/progress-page"
import RadioGroupPage from "./pages/components/radio-group-page"
import ResizablePage from "./pages/components/resizable-page"
import ScrollAreaPage from "./pages/components/scroll-area-page"
import SelectPage from "./pages/components/select-page"
import SeparatorPage from "./pages/components/separator-page"
import SheetPage from "./pages/components/sheet-page"
import SkeletonPage from "./pages/components/skeleton-page"
import SliderPage from "./pages/components/slider-page"
import SonnerPage from "./pages/components/sonner-page"
import SwitchPage from "./pages/components/switch-page"
import TablePage from "./pages/components/table-page"
import TabsPage from "./pages/components/tabs-page"
import TextareaPage from "./pages/components/textarea-page"
import TogglePage from "./pages/components/toggle-page"
import ToggleGroupPage from "./pages/components/toggle-group-page"
import TooltipPage from "./pages/components/tooltip-page"
import ErrorStatePage from "./pages/components/error-state-page"
import SwipeButtonPage from "./pages/components/swipe-button-page"
import SpinnerPage from "./pages/components/spinner-page"
import BannerPage from "./pages/components/banner-page"
import TimePickerPage from "./pages/components/time-picker-page"
import DatePickerPage from "./pages/components/date-picker-page"
import ProgressBarPage from "./pages/components/progress-bar-page"
import EmptyStatePage from "./pages/components/empty-state-page"
import FileUploadPage from "./pages/components/file-upload-page"
import NotificationNudgePage from "./pages/components/notification-nudge-page"
import StepperFlowPage from "./pages/components/stepper-flow-page"
import ProgressStepperPage from "./pages/components/progress-stepper-page"
import FilterPillPage from "./pages/components/filter-pill-page"
import DropdownPage from "./pages/components/dropdown-page"
import TitleBarPage from "./pages/components/title-bar-page"

// Data Grid pages
import BasicGridPage from "./pages/components/data-grid/basic-page"
import EditableGridPage from "./pages/components/data-grid/editable-page"
import SortableFilterableGridPage from "./pages/components/data-grid/sortable-filterable-page"
import RowSelectionGridPage from "./pages/components/data-grid/row-selection-page"
import FrozenColumnsGridPage from "./pages/components/data-grid/frozen-columns-page"
import ColumnGroupingGridPage from "./pages/components/data-grid/column-grouping-page"
import TreeGridPage from "./pages/components/data-grid/tree-grid-page"
import CustomRenderersGridPage from "./pages/components/data-grid/custom-renderers-page"
import SummaryRowsGridPage from "./pages/components/data-grid/summary-rows-page"
import FullFeaturedGridPage from "./pages/components/data-grid/full-featured-page"
import MasterDetailGridPage from "./pages/components/data-grid/master-detail-page"
import ShimmerLoadingGridPage from "./pages/components/data-grid/shimmer-loading-page"
import InfiniteScrollGridPage from "./pages/components/data-grid/infinite-scroll-page"
import RowEditModeGridPage from "./pages/components/data-grid/row-edit-mode-page"

// Graph pages
import AreaChartPage from "./pages/components/graphs/area-chart-page"
import BarChartPage from "./pages/components/graphs/bar-chart-page"
import HorizontalBarChartPage from "./pages/components/graphs/horizontal-bar-chart-page"
import LineChartPage from "./pages/components/graphs/line-chart-page"
import PieChartPage from "./pages/components/graphs/pie-chart-page"
import DonutChartPage from "./pages/components/graphs/donut-chart-page"
import RadarChartPage from "./pages/components/graphs/radar-chart-page"
import RadialBarChartPage from "./pages/components/graphs/radial-bar-chart-page"
import ScatterChartPage from "./pages/components/graphs/scatter-chart-page"
import FunnelChartPage from "./pages/components/graphs/funnel-chart-page"
import TreemapPage from "./pages/components/graphs/treemap-page"
import ComboChartPage from "./pages/components/graphs/combo-chart-page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/components" replace />} />
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
          <Route path="notification-nudge" element={<NotificationNudgePage />} />
          <Route path="stepper-flow" element={<StepperFlowPage />} />
          <Route path="progress-stepper" element={<ProgressStepperPage />} />
          <Route path="filter-pill" element={<FilterPillPage />} />
          <Route path="dropdown" element={<DropdownPage />} />
          <Route path="title-bar" element={<TitleBarPage />} />
          {/* Data Grid routes */}
          <Route path="data-grid/basic" element={<BasicGridPage />} />
          <Route path="data-grid/editable" element={<EditableGridPage />} />
          <Route path="data-grid/sortable-filterable" element={<SortableFilterableGridPage />} />
          <Route path="data-grid/row-selection" element={<RowSelectionGridPage />} />
          <Route path="data-grid/frozen-columns" element={<FrozenColumnsGridPage />} />
          <Route path="data-grid/column-grouping" element={<ColumnGroupingGridPage />} />
          <Route path="data-grid/tree-grid" element={<TreeGridPage />} />
          <Route path="data-grid/custom-renderers" element={<CustomRenderersGridPage />} />
          <Route path="data-grid/summary-rows" element={<SummaryRowsGridPage />} />
          <Route path="data-grid/full-featured" element={<FullFeaturedGridPage />} />
          <Route path="data-grid/master-detail" element={<MasterDetailGridPage />} />
          <Route path="data-grid/shimmer-loading" element={<ShimmerLoadingGridPage />} />
          <Route path="data-grid/infinite-scroll" element={<InfiniteScrollGridPage />} />
          <Route path="data-grid/row-edit-mode" element={<RowEditModeGridPage />} />
          {/* Graph routes */}
          <Route path="graphs/area-chart" element={<AreaChartPage />} />
          <Route path="graphs/bar-chart" element={<BarChartPage />} />
          <Route path="graphs/horizontal-bar-chart" element={<HorizontalBarChartPage />} />
          <Route path="graphs/line-chart" element={<LineChartPage />} />
          <Route path="graphs/pie-chart" element={<PieChartPage />} />
          <Route path="graphs/donut-chart" element={<DonutChartPage />} />
          <Route path="graphs/radar-chart" element={<RadarChartPage />} />
          <Route path="graphs/radial-bar-chart" element={<RadialBarChartPage />} />
          <Route path="graphs/scatter-chart" element={<ScatterChartPage />} />
          <Route path="graphs/funnel-chart" element={<FunnelChartPage />} />
          <Route path="graphs/treemap" element={<TreemapPage />} />
          <Route path="graphs/combo-chart" element={<ComboChartPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
