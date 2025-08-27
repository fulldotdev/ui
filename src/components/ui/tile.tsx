import * as React from "react"

import { cn } from "@/lib/utils"

function Tile({
  className,
  panel = true,
  ...props
}: React.ComponentProps<"div"> &
  React.ComponentProps<"a"> & {
    panel?: boolean
  }) {
  const Comp = props.href ? "a" : "div"
  return (
    <Comp
      data-slot="tile"
      className={cn(
        "text-card-foreground flex flex-col gap-6",
        panel &&
          "gap-0 overflow-hidden rounded-lg border **:data-[slot=tile-content]:p-6 **:data-[slot=tile-footer]:p-6",
        !panel && "**:data-[slot=tile-image]:rounded-lg",
        Comp === "a" && "group",
        panel &&
          Comp === "a" &&
          "bg-card shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    />
  )
}

function TileImage({ className, ...props }: React.ComponentProps<"img">) {
  return (
    <img
      data-slot="tile-image"
      className={cn(
        "h-auto w-full transition-opacity group-hover:opacity-80",
        className
      )}
      {...props}
    />
  )
}

function TileContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tile-content"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TileFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tile-footer"
      className={cn("!pt-0", className)}
      {...props}
    />
  )
}

function TileTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-foreground font-semibold text-pretty", className)}
      {...props}
    />
  )
}

function TileDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      className={cn(
        "text-muted-foreground text-sm leading-[1.75] text-pretty",
        className
      )}
      {...props}
    />
  )
}

function TileTagline({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      className={cn("text-primary text-xs font-medium text-pretty", className)}
      {...props}
    />
  )
}

export {
  Tile,
  TileImage,
  TileContent,
  TileFooter,
  TileTitle,
  TileDescription,
  TileTagline,
}
