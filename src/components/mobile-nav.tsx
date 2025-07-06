import * as React from "react"
import { Menu, X } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function MobileMenu({
  items,
  ...props
}: React.ComponentProps<typeof PopoverTrigger> & {
  items?: {
    text?: string
    href?: string
    links?: {
      text?: string
      href?: string
    }[]
  }[]
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger {...props}>
        {open ? <X className="!size-6" /> : <Menu className="!size-6" />}
      </PopoverTrigger>
      <PopoverContent
        className="h-[calc(100vh-56px)] w-screen overflow-y-auto rounded-none border-none p-0 shadow-none"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="mx-auto flex h-auto max-w-screen-xl flex-col gap-4 overflow-auto px-4 py-8 lg:px-8">
          {items?.map((item, i) =>
            item.links ? (
              <div
                className="flex flex-col items-start gap-4 not-first:mt-4"
                key={i}
              >
                <div className="text-muted-foreground text-sm font-medium">
                  {item.text}
                </div>
                {item.links?.map((link, i) => (
                  <a
                    key={i}
                    className="text-xl font-medium hover:underline"
                    {...link}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            ) : (
              <a
                className="text-xl font-medium hover:underline"
                key={i}
                {...item}
              >
                {item.text}
              </a>
            )
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { MobileMenu }
