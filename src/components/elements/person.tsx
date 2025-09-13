import * as React from "react"

import { cn } from "@/lib/utils"

interface PersonProps extends React.ComponentProps<"div"> {
  image?: React.ComponentProps<"img">
  title?: string
  tagline?: string
}

function Person({ className, image, title, tagline, ...props }: PersonProps) {
  if (!title && !tagline && !image?.src) return null
  return (
    <div className={cn("flex items-center gap-3.5", className)} {...props}>
      {image && (
        <img className="size-10 rounded-full object-cover" {...image} />
      )}
      {(title || tagline) && (
        <div className="flex flex-col gap-0.5">
          {title && <h4 className="text-sm font-medium">{title}</h4>}
          {tagline && (
            <span className="text-muted-foreground text-xs">{tagline}</span>
          )}
        </div>
      )}
    </div>
  )
}

export { Person }
