import * as React from "react"
import { FolderIcon, SearchIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Icon media">
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderIcon />
            </EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
              You have not created any projects. Start by creating your first
              one.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button>Create project</Button>
              <Button variant="outline">Import project</Button>
            </div>
          </EmptyContent>
        </Empty>
      </Example>
      <Example title="Default media">
        <Empty className="bg-muted">
          <EmptyHeader>
            <EmptyMedia>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </EmptyMedia>
            <EmptyTitle>User offline</EmptyTitle>
            <EmptyDescription>
              This user is offline. You can leave a message and they will see it
              later.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" variant="outline">
              Leave a message
            </Button>
          </EmptyContent>
        </Empty>
      </Example>
      <Example title="Without content">
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle>No results</EmptyTitle>
            <EmptyDescription>
              Try a different search term or{" "}
              <a href="#/ui/empty">clear the filters</a>.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Example>
    </div>
  )
}
