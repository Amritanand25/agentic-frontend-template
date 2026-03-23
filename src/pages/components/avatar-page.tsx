import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AvatarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Avatar</h1>
        <p className="text-muted-foreground mt-2">
          An image element with a fallback for representing the user.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Example</h2>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}
