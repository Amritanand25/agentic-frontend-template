# Component Catalog — `@repo/ui`

> **MANDATORY**: Before creating ANY UI element, check this catalog. All components below are available via `import { ComponentName } from "@repo/ui"`. NEVER use native HTML (`<input>`, `<select>`, `<table>`, `<button>`, `<label>`, `<hr>`, `<textarea>`) when an equivalent exists here.

## Quick Lookup by Use Case

| Need                    | Use Component                     | NOT this                    |
| ----------------------- | --------------------------------- | --------------------------- |
| Button / CTA            | `Button`                          | `<button>`                  |
| Text input              | `Input`                           | `<input type="text">`       |
| Labeled input           | `InputLabel`                      | `<label>` + `<input>`       |
| Textarea                | `Textarea`                        | `<textarea>`                |
| Select dropdown         | `Select` + parts                  | `<select>` / `<option>`     |
| Rich dropdown           | `Dropdown`                        | custom dropdown             |
| Checkbox                | `Checkbox`                        | `<input type="checkbox">`   |
| Radio buttons           | `RadioGroup` + `RadioGroupItem`   | `<input type="radio">`      |
| Toggle / Switch         | `Switch`                          | custom toggle               |
| Date picker             | `DatePicker`                      | `<input type="date">`       |
| Time picker             | `TimePicker`                      | `<input type="time">`       |
| Calendar                | `Calendar`                        | custom calendar             |
| Modal / Dialog          | `Dialog` + parts                  | custom modal / portal       |
| Confirmation dialog     | `AlertDialog` + parts             | `window.confirm()`          |
| Side panel              | `Sheet` + parts                   | custom side drawer          |
| Bottom drawer           | `Drawer` + parts                  | custom bottom sheet         |
| Dropdown menu           | `DropdownMenu` + parts            | custom dropdown             |
| Context menu            | `ContextMenu` + parts             | custom right-click menu     |
| Table                   | `Table` + parts                   | `<table>` / `<tr>` / `<td>` |
| Table pagination        | `TablePagination`                 | custom pagination           |
| Pagination              | `Pagination` + parts              | custom pagination           |
| Tabs                    | `Tabs` + parts                    | custom tabs                 |
| Accordion               | `Accordion` + parts               | custom collapsible          |
| Collapsible             | `Collapsible` + parts             | custom show/hide            |
| Tooltip                 | `Tooltip` + parts                 | `title` attribute           |
| Hover card              | `HoverCard` + parts               | custom hover popover        |
| Popover                 | `Popover` + parts                 | custom floating panel       |
| Toast / Notification    | `notify()` / `notifyPromise()`    | `alert()` / custom toast    |
| Form with validation    | `Form` + `FormField` + parts      | raw `<form>`                |
| Label                   | `Label`                           | `<label>`                   |
| Card                    | `Card` + parts                    | custom card `<div>`         |
| Badge                   | `Badge`                           | custom chip / tag           |
| Avatar                  | `Avatar` + parts                  | custom avatar `<img>`       |
| Alert / Banner          | `Alert` + parts / `Banner`        | custom alert div            |
| Progress bar            | `Progress` / `ProgressBar`        | custom progress div         |
| Stepper                 | `ProgressStepper` / `StepperFlow` | custom stepper              |
| Skeleton loader         | `Skeleton`                        | custom loading placeholder  |
| Spinner                 | `Spinner`                         | custom loading spinner      |
| Breadcrumb              | `Breadcrumb` + parts              | custom breadcrumb nav       |
| Separator               | `Separator`                       | `<hr>`                      |
| Scroll area             | `ScrollArea` + `ScrollBar`        | custom scrollable div       |
| Slider / Range          | `Slider`                          | `<input type="range">`      |
| Toggle button           | `Toggle`                          | custom toggle button        |
| Toggle group            | `ToggleGroup` + `ToggleGroupItem` | custom button group         |
| Menu bar                | `Menubar` + parts                 | custom app menu             |
| Navigation menu         | `NavigationMenu` + parts          | custom nav                  |
| Command palette         | `Command` + parts                 | custom search/command UI    |
| Carousel                | `Carousel` + parts                | custom slider               |
| Charts                  | `ChartContainer` + chart parts    | raw recharts                |
| Resizable panels        | `ResizablePanelGroup` + parts     | custom resize handles       |
| OTP input               | `InputOTP` + parts                | multiple char inputs        |
| File upload             | `FileUpload`                      | custom file input           |
| Filter pill / chip      | `FilterPill`                      | custom filter chip          |
| Empty state             | `EmptyState`                      | custom empty placeholder    |
| Error state             | `ErrorState`                      | custom error placeholder    |
| Swipe button            | `SwipeButton`                     | custom swipe-to-confirm     |
| Title bar / Page header | `TitleBar`                        | custom page header          |
| Aspect ratio container  | `AspectRatio`                     | custom aspect-ratio hack    |

---

## All Components (62 files, all exports)

All imports: `import { ComponentName } from "@repo/ui"`

### Forms & Inputs

| Component      | Exports                                                                                                       | Variants / Props                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Button**     | `Button`, `buttonVariants`, `ButtonProps`                                                                     | variant: `default\|destructive\|outline\|secondary\|ghost\|link`, size: `default\|sm\|lg\|icon` |
| **Input**      | `Input`                                                                                                       | All `<input>` HTML attributes                                                                   |
| **InputLabel** | `InputLabel`, `InputLabelProps`                                                                               | `required`, `helperText`, `disabled`                                                            |
| **Textarea**   | `Textarea`                                                                                                    | All `<textarea>` HTML attributes                                                                |
| **Label**      | `Label`                                                                                                       | Radix Label attributes                                                                          |
| **Checkbox**   | `Checkbox`                                                                                                    | `checked`, `onCheckedChange`, `disabled`                                                        |
| **RadioGroup** | `RadioGroup`, `RadioGroupItem`                                                                                | `value`, `onValueChange`                                                                        |
| **Switch**     | `Switch`                                                                                                      | `checked`, `onCheckedChange`                                                                    |
| **Slider**     | `Slider`                                                                                                      | `value`, `onValueChange`, `min`, `max`, `step`                                                  |
| **InputOTP**   | `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`                                              | `maxLength`, `value`, `onChange`                                                                |
| **Form**       | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField` | React Hook Form + Zod integration                                                               |

### Select & Dropdown

| Component        | Exports                                                                                                                                                                                                                                                                                                                                                 | Variants / Props                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Select**       | `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`                                                                                                                                                                              | `value`, `onValueChange`                                                                            |
| **Dropdown**     | `Dropdown`, `DropdownOption`, `DropdownGroup`, `DropdownProps`                                                                                                                                                                                                                                                                                          | `searchable`, `isMultiSelect`, `isRadioSelect`, `enableVirtualization`, size: `s\|m\|l`, validation |
| **DropdownMenu** | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuRadioGroup` | Radix DropdownMenu                                                                                  |
| **ContextMenu**  | `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuPortal`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuRadioGroup`                | Right-click menu                                                                                    |

### Date & Time

| Component      | Exports                         | Variants / Props                                                        |
| -------------- | ------------------------------- | ----------------------------------------------------------------------- |
| **DatePicker** | `DatePicker`, `DatePickerProps` | type: `single\|range`, `selectedDates`, `onDateChange`, size: `s\|m\|l` |
| **TimePicker** | `TimePicker`, `TimePickerProps` | `value`, `onChange`, `time24Format`, size: `s\|m\|l`                    |
| **Calendar**   | `Calendar`, `CalendarDayButton` | mode: `single\|range`, `selected`, `onSelect`                           |

### Overlays & Modals

| Component       | Exports                                                                                                                                                                                                                                | Props                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **Dialog**      | `Dialog`, `DialogPortal`, `DialogOverlay`, `DialogTrigger`, `DialogClose`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`                                                                         | `open`, `onOpenChange`           |
| **AlertDialog** | `AlertDialog`, `AlertDialogPortal`, `AlertDialogOverlay`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel` | Confirmation dialogs             |
| **Sheet**       | `Sheet`, `SheetPortal`, `SheetOverlay`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`                                                                                   | side: `top\|right\|bottom\|left` |
| **Drawer**      | `Drawer`, `DrawerPortal`, `DrawerOverlay`, `DrawerTrigger`, `DrawerClose`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`                                                                         | Bottom drawer (vaul)             |
| **Popover**     | `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`                                                                                                                                                                         | `align`: `start\|center\|end`    |
| **Tooltip**     | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`                                                                                                                                                                       | Wrap app in `TooltipProvider`    |
| **HoverCard**   | `HoverCard`, `HoverCardTrigger`, `HoverCardContent`                                                                                                                                                                                    | Rich hover preview               |

### Data Display

| Component           | Exports                                                                                                  | Props                                               |
| ------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **Table**           | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption` | Standard table parts                                |
| **TablePagination** | `TablePagination`                                                                                        | `totalRows`, `page`, `rowsPerPage`, `onPageChange`  |
| **Card**            | `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`                        | Composable card parts                               |
| **Badge**           | `Badge`, `badgeVariants`                                                                                 | variant: `default\|secondary\|destructive\|outline` |
| **Avatar**          | `Avatar`, `AvatarImage`, `AvatarFallback`                                                                | `src`, `alt`, fallback text                         |

### Navigation

| Component          | Exports                                                                                                                                                                                                                                                                                     | Props                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Tabs**           | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`                                                                                                                                                                                                                                            | `defaultValue`, `value`  |
| **Accordion**      | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`                                                                                                                                                                                                                        | type: `single\|multiple` |
| **Collapsible**    | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`                                                                                                                                                                                                                                   | `open`, `onOpenChange`   |
| **Breadcrumb**     | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`                                                                                                                                                           | Breadcrumb navigation    |
| **Pagination**     | `Pagination`, `PaginationContent`, `PaginationLink`, `PaginationItem`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`                                                                                                                                                         | Page navigation          |
| **Menubar**        | `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarSeparator`, `MenubarLabel`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarPortal`, `MenubarSubContent`, `MenubarSubTrigger`, `MenubarGroup`, `MenubarSub`, `MenubarShortcut` | App menu bar             |
| **NavigationMenu** | `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuContent`, `NavigationMenuTrigger`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuViewport`, `navigationMenuTriggerStyle`                                                                     | Site navigation          |
| **Command**        | `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`                                                                                                                                             | Command palette (⌘K)     |

### Feedback & Status

| Component           | Exports                                                               | Props                                                                                      |
| ------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Alert**           | `Alert`, `AlertTitle`, `AlertDescription`                             | variant: `default\|destructive`                                                            |
| **Banner**          | `Banner`, `BANNER_VARIANTS`                                           | variant: `primary\|success\|error\|warning\|neutral`, `isSingleLine`, `isFullWidth`        |
| **Toaster**         | `Toaster`                                                             | Sonner wrapper — place in app root                                                         |
| **Notifications**   | `notify`, `notifyPromise`, `NotificationToast`, `NotificationOptions` | variant: `info\|success\|error\|loading`, `showProgressBar`, `showActions`                 |
| **EmptyState**      | `EmptyState`, `EmptyStateProps`                                       | variant: `single\|triple\|text-only`                                                       |
| **ErrorState**      | `ErrorState`, `ErrorStateProps`                                       | variant: `generic\|network\|server\|not-found\|timeout\|permission`                        |
| **Spinner**         | `Spinner`, `SPINNER_SIZE_CONFIG`, `SpinnerProps`                      | size: `xs\|s\|m\|l\|xl`, `label`, `labelPosition`                                          |
| **Skeleton**        | `Skeleton`                                                            | CSS class-based sizing                                                                     |
| **Progress**        | `Progress`                                                            | `value` (0-100)                                                                            |
| **ProgressBar**     | `ProgressBar`, `ProgressBarProps`                                     | variant: `line\|circle`, color: `default\|success\|error\|warning`, size: `xs\|sm\|md\|lg` |
| **ProgressStepper** | `ProgressStepper`, `ProgressStepConfig`, `ProgressStepperProps`       | orientation: `horizontal\|vertical`, `steps[]`, size: `sm\|md`                             |
| **StepperFlow**     | `StepperFlow`, `StepConfig`, `StepperFlowProps`, `StepState`          | stepState: `active\|completed\|current\|error\|upcoming\|inactive\|disabled\|loading`      |

### Layout & Containers

| Component           | Exports                                                                           | Props                               |
| ------------------- | --------------------------------------------------------------------------------- | ----------------------------------- |
| **Separator**       | `Separator`                                                                       | orientation: `horizontal\|vertical` |
| **ScrollArea**      | `ScrollArea`, `ScrollBar`                                                         | orientation: `vertical\|horizontal` |
| **ResizablePanels** | `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`                        | direction: `horizontal\|vertical`   |
| **AspectRatio**     | `AspectRatio`                                                                     | `ratio` (e.g. `16/9`)               |
| **Carousel**        | `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` | Slide container                     |

### Charts

| Component | Exports                                                                                                    | Props            |
| --------- | ---------------------------------------------------------------------------------------------------------- | ---------------- |
| **Chart** | `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle` | Recharts wrapper |

### Specialized

| Component       | Exports                                             | Props                                                                                  |
| --------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Toggle**      | `Toggle`, `toggleVariants`                          | variant: `default\|outline`, `pressed`, `onPressedChange`                              |
| **ToggleGroup** | `ToggleGroup`, `ToggleGroupItem`                    | type: `single\|multiple`, `value`, `onValueChange`                                     |
| **FileUpload**  | `FileUpload`, `FileWithStatus`, `FileUploadProps`   | layout: `vertical\|horizontal`, uploadMode: `single\|multi`, `maxSize`, `maxFileCount` |
| **FilterPill**  | `FilterPill`, `FilterPillOption`, `FilterPillProps` | variant: `multi-checkbox\|single-radio\|single`, `enableVirtualization`                |
| **SwipeButton** | `SwipeButton`, `SwipeButtonProps`                   | variant: `primary\|secondary\|tertiary`, `onConfirm`                                   |
| **TitleBar**    | `TitleBar`, `TitleBarProps`                         | `title`, `subtitle`, `onBack`, `actions`, `sticky`                                     |

---

**Total: 62 component files | All via `import { ... } from "@repo/ui"`**
