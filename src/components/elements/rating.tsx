import * as React from "react"
import { Star, StarHalf } from "lucide-react"

import { cn } from "@/lib/utils"

function Rating({
  rating,
  className,
  ...props
}: React.ComponentProps<"div"> & { rating?: number }) {
  const getIcon = (count: number) => {
    if (!rating) return undefined
    const difference = rating - count
    if (difference >= -0.25) {
      return <Star className="size-[1em]" fill="currentColor" />
    }
    if (difference >= -0.75) {
      return <StarHalf className="size-[1em]" fill="currentColor" />
    }
    return null
  }

  return (
    <div className={cn("flex gap-1 text-base", className)} {...props}>
      {[1, 2, 3, 4, 5].map((count) => (
        <div key={count} className="!text-primary size-[1em]">
          {getIcon(count)}
        </div>
      ))}
    </div>
  )
}

export { Rating }
