import * as React from "react"
import { Star, StarHalf } from "lucide-react"

import { cn } from "@/lib/utils"

function Review({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-3", className)} {...props} />
}

function ReviewImage({ className, ...props }: React.ComponentProps<"img">) {
  return (
    <img
      className={cn(
        "size-10 rounded-full object-cover not-first:-ml-6",
        className
      )}
      {...props}
    />
  )
}

function ReviewContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-muted-foreground flex flex-col gap-1 text-sm",
        className
      )}
      {...props}
    />
  )
}

function ReviewRating({
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

export { Review, ReviewImage, ReviewContent, ReviewRating }
