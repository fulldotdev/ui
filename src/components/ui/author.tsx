import * as React from "react"

import { cn } from "@/lib/utils"

function Author({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="author"
      className={cn("flex w-full gap-4", className)}
      {...props}
    />
  )
}

function AuthorImage({ className, ...props }: React.ComponentProps<"img">) {
  return (
    <img
      data-slot="author-image"
      className={cn(
        "aspect-square size-12 shrink-0 grow-0 rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AuthorTitle({ className, ...props }: React.ComponentProps<"h6">) {
  return (
    <h6
      data-slot="author-title"
      className={cn("text-foreground text-sm font-semibold", className)}
      {...props}
    />
  )
}

function AuthorTagline({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="author-tagline"
      className={cn("text-muted-foreground z-20 mt-0.5 text-sm", className)}
      {...props}
    />
  )
}

export { Author, AuthorImage, AuthorTitle, AuthorTagline }
