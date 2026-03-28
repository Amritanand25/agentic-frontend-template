import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@repo/ui"
export default function ContextMenuPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Context Menu</h1>
        <p className="text-muted-foreground mt-2">
          Displays a menu located at the pointer position when right-clicking.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <ContextMenu>
          <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuItem inset>
              Back
            </ContextMenuItem>
            <ContextMenuItem inset>
              Forward
            </ContextMenuItem>
            <ContextMenuItem inset>
              Reload
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  )
}
