# FileUpload

## Overview

The FileUpload component provides a flexible interface for uploading files through drag-and-drop, direct file selection, or URL submission. It supports single and multi-file upload modes, vertical and horizontal layouts, file validation, upload progress tracking, and a file list with status indicators. The component uses `react-dropzone` internally and supports `React.forwardRef`.

A companion `FileUploadParent` component is provided as a reference implementation demonstrating state management for file upload workflows.

## Anatomy

### Vertical Layout (multi-upload, default)

```
+---------------------------------------------------------------+
| [Header: label, mandatory*, help icon]  [File count]          |
+---------------------------------------------------------------+
| +-----------------------------------------------------------+ |
| |              [Cloud Upload Icon]                           | |
| |     Drag and drop your file here                           | |
| |   Supported Format: XLS, XLSX, CSV (5MB)                  | |
| |       [Add URL]  [Upload]                                  | |
| +-----------------------------------------------------------+ |
| [Support text]                                                |
| [Error message]                                               |
+---------------------------------------------------------------+
| [File 1: icon | name | size | status | progress | actions]   |
| [File 2: icon | name | size | status | actions]              |
+---------------------------------------------------------------+
```

### Horizontal Layout (multi-upload)

```
+---------------------------------------------------------------+
| [Upload] or Drag and drop your file here or [Add URL] format  |
+---------------------------------------------------------------+
```

### Single Upload Mode

```
+---------------------------+
|  [Upload icon] Upload     |
+---------------------------+
```

## Props / API

### FileUploadProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `files` | `FileWithStatus[]` | `[]` | Array of files with their upload status information |
| `onFileChange` | `(files: File[]) => void` | required | Callback when files are added or removed |
| `onUrlSubmit` | `(url: string) => void` | `undefined` | Callback when a URL is submitted via the popover |
| `onRetry` | `() => void` | `undefined` | Callback when the retry button is clicked on a failed file |
| `layout` | `"vertical" \| "horizontal"` | `"vertical"` | Layout orientation of the upload dropzone |
| `uploadMode` | `"single" \| "multi"` | `"multi"` | Single file or multiple file upload mode |
| `titleText` | `string` | `"Drag and drop your file here"` | Primary text displayed in the dropzone area |
| `otherText` | `string` | `"Supported Format: XLS, XLSX, CSV (5MB)"` | Secondary/support text in the dropzone area |
| `maxSize` | `number` | `5 * 1024 * 1024` (5MB) | Maximum file size in bytes |
| `maxFilesHeight` | `string` | `"151px"` | Maximum height of the file list container (CSS value) |
| `allowedFileTypes` | `string[]` | `[".xls", ".xlsx", ".csv"]` | Array of allowed file extensions (e.g., `[".pdf", ".doc"]`) |
| `maxFileCount` | `number` | `undefined` | Maximum number of files allowed in multi-upload mode |
| `errors` | `string \| string[]` | `undefined` | External error message(s) to display |
| `disabled` | `boolean` | `false` | Disables all interactions (drag, drop, click, URL, remove) |
| `showHeader` | `boolean` | `false` | Show the header section above the dropzone |
| `showHelpIcon` | `boolean` | `false` | Show the help icon in the header |
| `showMandatory` | `boolean` | `false` | Show the mandatory asterisk (*) in the header |
| `showFileCount` | `boolean` | `false` | Show the file count text in the header |
| `headerText` | `string` | `undefined` | Text label displayed in the header |
| `fileCountText` | `string` | `undefined` | Text for file count display (e.g., "2/5 files") |
| `supportText` | `string` | `undefined` | Support text displayed below the dropzone |
| `isSingleUploadSmall` | `boolean` | `false` | Uses compact sizing for single upload mode |
| `className` | `string` | `undefined` | Additional CSS class for the root container |

The component also accepts all standard `HTMLDivElement` attributes via rest props.

### FileWithStatus Interface

| Property | Type | Description |
|---|---|---|
| `file` | `File` | The actual browser File object |
| `validationStatus` | `"uploading" \| "uploaded" \| "failed"` | Current upload/validation status |
| `progress` | `number` (optional) | Upload progress percentage (0-100) |
| `validationText` | `string` (optional) | Custom validation or status text message |

## Variants

### Layout Variants

| Variant | Description |
|---|---|
| **Vertical** (default) | Stacked layout with icon, text, and buttons centered vertically |
| **Horizontal** | Inline layout: "Upload or Drag and drop or Add URL" in a single row |

### Upload Mode Variants

| Mode | Description |
|---|---|
| **Multi** (default) | Allows multiple files; dropzone always visible alongside file list |
| **Single** | Allows one file; dropzone hidden when a file is present |

### Single Upload Size Variants

| Variant | Padding |
|---|---|
| Default | `py-[11px]` |
| Small (`isSingleUploadSmall`) | `py-[3px]` |

## Sizes

The component does not have explicit size props but uses internal sizing:

| Element | Styling |
|---|---|
| Dropzone (vertical) | `rounded-gd-16 p-gd-20` |
| Dropzone (horizontal) | `rounded-gd-8 py-gd-12 px-gd-20` |
| Single upload | `rounded-gd-8 px-gd-24` |
| Upload icon container | `h-gd-40 w-gd-40 rounded-full` |
| File list item | `rounded-gd-12` |
| File item (normal) | `px-gd-12 py-gd-8` (or `pt-gd-8 pb-gd-4` when uploading) |
| File item (small) | `px-gd-8 py-gd-4` (or `pt-gd-4 pb-gd-2` when uploading) |

## States

| State | Description |
|---|---|
| **Default** | Dashed border, neutral background, interactive |
| **Drag Active** | Blue/primary background and border highlight when files are dragged over |
| **Disabled** | Greyed out, `cursor-not-allowed`, all interactions blocked |
| **Hover** | Background changes to `bg-color-background-surface-20` |
| **Active (single upload)** | `bg-color-primary-30` with `border-color-primary-40` |
| **With Files** | File list rendered below dropzone; single mode hides dropzone |
| **File Uploading** | Progress bar shown, percentage text displayed |
| **File Uploaded** | Success message box shown |
| **File Failed** | Error message box shown with retry button |
| **Error** | Error message box displayed below dropzone (internal or external errors) |

## Design Tokens

### Colors

- **Dropzone border**: `border-color-neutral-grey-40` (default), `border-color-primary-40` (drag active)
- **Dropzone background**: `bg-color-background-surface-10` (default), `bg-color-primary-10` (drag active), `bg-color-background-surface-20` (hover)
- **Icon background**: `bg-color-neutral-grey-20` (default), `bg-color-primary-20` (drag active), `bg-color-neutral-grey-10` (disabled)
- **Icon color**: `text-color-neutral-grey-60` (default), `text-color-primary-50` (drag active)
- **File icon background by status**: `bg-color-primary-20` (uploading), `bg-color-feedback-success-20` (uploaded), `bg-color-feedback-error-20` (failed)
- **File icon color by status**: `text-color-primary-60` (uploading), `text-color-feedback-success-80` (uploaded), `text-color-feedback-error-80` (failed)
- **Disabled text/icon**: `var(--color-neutral-grey-40, #a3a3a3)`
- **Add URL link**: `text-color-primary-60`, `border-b-color-primary-60`

### Typography

- Title text: `text-en-desktop-heading-l`
- Support/other text: `text-en-desktop-body-s`
- File name (normal): `text-en-desktop-body-m-prominent`
- File name (small): `text-en-desktop-body-s-prominent`
- File size/status: `text-en-desktop-body-s`

### Spacing

- Dropzone gap: `gap-gd-12`
- Text area gap: `gap-gd-8`
- File list gap: `gap-gd-8`
- Buttons gap: `gap-gd-12`

### CSS Custom Properties (file-uploader.css)

| Token | Value | Description |
|---|---|---|
| `--color-primary-50` | `#4f46e5` (fallback) | Primary border color |
| `--color-feedback-error-80` | `#ef4444` (fallback) | Error border color |
| `--color-primary-60` | `#4f46e5` (fallback) | Focus ring color |
| `--color-neutral-grey-40` | `#a3a3a3` (fallback) | Disabled text/icon color |

### Focus Styles

- `.focus-ring:focus-visible::after`: 4px solid primary-60 border, offset -4px, border-radius 12px

## Accessibility

- Dropzone uses `react-dropzone` which provides keyboard and screen reader support
- File input is rendered as a native `<input>` element (hidden, accessible via dropzone)
- "Add URL" link in horizontal layout has `role="button"`, `tabIndex`, and `aria-disabled`
- Buttons are properly disabled when the component is disabled
- Keyboard navigation supported: Enter/Space on horizontal dropzone triggers URL add
- Focus-visible styling applied to single upload dropzone and URL input areas
- URL input supports Enter key to submit

## Performance Best Practices

### Rendering Optimization
- **Memoize file list items** — Each file item component should be `React.memo`'d with a custom comparator checking `validationStatus`, `progress`, and `file.name`. Progress updates on one file should not re-render other file items.
- **Stable `onDrop` callback** — The `useDropzone` `onDrop` handler should use `useCallback` with correct dependencies. An unstable reference causes react-dropzone to re-bind event listeners on every render.
- **Throttle progress updates** — Upload progress callbacks can fire rapidly (every few KB). Throttle `setProgress` updates to at most once per 100ms or per animation frame to prevent excessive re-renders.

### File Processing
- **Validate before upload** — Run file type, size, and count validation synchronously before initiating any uploads. This avoids wasted network requests for invalid files.
- **Web Worker for large files** — For file hash computation or client-side validation of large files (>10MB), offload to a Web Worker to keep the UI responsive.
- **Chunked upload support** — For large files, support chunked upload with resume capability. Track progress per chunk and aggregate for the overall progress bar.

### Drag-and-Drop Performance
- **Prevent default aggressively** — Ensure `dragover` and `dragenter` events call `preventDefault()` to avoid browser default behaviors (like opening the file). react-dropzone handles this, but custom implementations must be careful.
- **Debounce drag state changes** — Rapid `dragenter`/`dragleave` events on nested elements can cause flickering. react-dropzone handles this via internal counters.

### Scalability Considerations
- **Controlled file state** — The `files` prop is controlled externally. The parent manages the `FileWithStatus` array, enabling integration with upload queues, retry logic, and progress tracking.
- **URL upload support** — The `onUrlSubmit` callback enables server-side file fetching workflows alongside direct upload.
- **Extensible validation** — Accept custom validation functions via props for business-specific rules (e.g., image dimensions, CSV column count).
- **Accessible drop zone** — react-dropzone provides built-in keyboard and screen reader support. Ensure custom trigger elements maintain these accessibility features.
