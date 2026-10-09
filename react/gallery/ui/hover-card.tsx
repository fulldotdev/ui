import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { placeholderImage } from "@/lib/placeholder-image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

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

const sides = ["top", "right", "bottom", "left"] as const

export default function Demo() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Profile preview">
        <HoverCard>
          <HoverCardTrigger
            href="#/ui/hover-card"
            className="text-sm font-medium underline underline-offset-4"
          >
            @fulldev
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={placeholderImage.src} alt="Fulldev avatar" />
                <AvatarFallback>FD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-semibold">@fulldev</h4>
                <p className="text-sm">
                  Websites and UI components for small businesses.
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                  <CalendarIcon className="size-4" />
                  Joined March 2021
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Example>
      <Example title="Sides">
        {sides.map((side) => (
          <HoverCard key={side}>
            <HoverCardTrigger
              delay={100}
              closeDelay={100}
              render={<Button variant="outline" className="capitalize" />}
            >
              {side}
            </HoverCardTrigger>
            <HoverCardContent side={side}>
              <p className="text-sm">
                This card opens on the {side} side of the trigger.
              </p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </Example>
      <Example title="Controlled">
        <div className="flex flex-col gap-2">
          <HoverCard open={open} onOpenChange={setOpen}>
            <HoverCardTrigger
              render={<Button variant="outline" className="w-fit" />}
            >
              Hover or focus me
            </HoverCardTrigger>
            <HoverCardContent align="start">
              <p className="text-sm">
                The page tracks whether this card is open.
              </p>
            </HoverCardContent>
          </HoverCard>
          <p className="text-sm text-muted-foreground">
            Card is {open ? "open" : "closed"}.
          </p>
        </div>
      </Example>
    </div>
  )
}
