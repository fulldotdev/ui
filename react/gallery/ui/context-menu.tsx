import * as React from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RotateCwIcon,
  TrashIcon,
} from "lucide-react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

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

const area =
  "flex h-36 w-80 items-center justify-center rounded-lg border border-dashed text-sm"

export default function Demo() {
  const [bookmarks, setBookmarks] = React.useState(true)
  const [fullUrls, setFullUrls] = React.useState(false)
  const [person, setPerson] = React.useState("pedro")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Basic with icons and shortcuts">
        <ContextMenu>
          <ContextMenuTrigger className={area}>
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent className="w-52">
            <ContextMenuGroup>
              <ContextMenuItem>
                <ArrowLeftIcon />
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>
                <ArrowRightIcon />
                Forward
                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <RotateCwIcon />
                Reload
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">
              <TrashIcon />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Example>
      <Example title="Submenu, checkbox and radio items">
        <ContextMenu>
          <ContextMenuTrigger className={area}>
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>More tools</ContextMenuSubTrigger>
              <ContextMenuPortal>
                <ContextMenuSubContent className="w-44">
                  <ContextMenuItem>Save page</ContextMenuItem>
                  <ContextMenuItem>Create shortcut</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Developer tools</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuPortal>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuCheckboxItem
                checked={bookmarks}
                onCheckedChange={setBookmarks}
              >
                Show bookmarks
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem
                checked={fullUrls}
                onCheckedChange={setFullUrls}
              >
                Show full URLs
              </ContextMenuCheckboxItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuLabel inset>People</ContextMenuLabel>
              <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
                <ContextMenuRadioItem value="pedro">
                  Pedro Duarte
                </ContextMenuRadioItem>
                <ContextMenuRadioItem value="colm">
                  Colm Tuite
                </ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      </Example>
      <Example title="Disabled trigger">
        <ContextMenu disabled>
          <ContextMenuTrigger className={area}>
            Context menu disabled here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Unreachable</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Example>
    </div>
  )
}
