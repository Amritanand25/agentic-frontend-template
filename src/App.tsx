import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ComponentsLayout } from "./components/components-layout"
import { Toaster } from "@/components/ui/sonner"

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
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
