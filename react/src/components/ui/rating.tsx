import * as React from "react"
import { cn } from "cn"
import { StarIcon } from "lucide-react"

function Rating({
  className,
  value = 5,
  "aria-label": ariaLabel = `Rated ${value} out of 5`,
  ...props
}: React.ComponentProps<"div"> & {
  value?: number
}) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      data-slot="rating"
      className={cn("flex items-center gap-1 text-base", className)}
      {...props}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fill =
          index < Math.floor(value)
            ? 100
            : index === Math.floor(value)
              ? (value % 1) * 100
              : 0
        return (
          <span
            key={index}
            aria-hidden="true"
            className="relative inline-flex size-[1em] text-muted-foreground/25"
          >
            <StarIcon className="size-[1em] fill-current" />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden text-primary"
                style={{ width: `${fill}%` }}
              >
                <StarIcon className="size-[1em] fill-current" />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}

export { Rating }
