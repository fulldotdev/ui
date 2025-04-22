import * as React from "react"
import { Star, StarHalf } from "lucide-react"

import { cn } from "@/lib/utils"

interface Props extends React.ComponentProps<"div"> {
  score?: number | undefined
}

function Rating({ score, className, ...props }: Props) {
  const getIcon = (count: number) => {
    if (!score) return undefined
    const difference = score - count
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
