import * as React from "react"

import { cn } from "@/lib/utils"
import { Rating } from "@/components/elements/rating"

interface ReviewProps extends React.ComponentProps<"div"> {
  image?: React.ComponentProps<"img">
  rating?: number
  title?: string
  description?: string
  tagline?: string
}

function Review({
  className,
  image,
  rating,
  title,
  description,
  tagline,
  ...props
}: ReviewProps) {
  return (
    <div
      className={cn(
        "flex break-inside-avoid flex-col overflow-hidden rounded-lg border p-6",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {image && (
          <img
            className="size-10 rounded-full object-cover not-first:-ml-6"
            {...image}
          />
        )}
        <div className="text-muted-foreground flex flex-col gap-1 text-sm">
          {rating && <Rating rating={rating} />}
          {tagline && <span>{tagline}</span>}
        </div>
      </div>
      {(title || description) && (
        <div className="not-first:mt-4">
          {title && <h3>{title}</h3>}
          {description && <p>{description}</p>}
        </div>
      )}
    </div>
  )
}

export { Review }
