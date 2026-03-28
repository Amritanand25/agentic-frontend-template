import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage as BreadcrumbPageComponent, BreadcrumbSeparator } from "@repo/ui"
export default function BreadcrumbPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Breadcrumb</h1>
        <p className="text-muted-foreground mt-2">
          Displays the path to the current resource using a hierarchy of links.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPageComponent>Breadcrumb</BreadcrumbPageComponent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}
