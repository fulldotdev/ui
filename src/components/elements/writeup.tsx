import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const writeupVariants = cva(
  [
    "w-full max-w-2xl",
    "[&_p]:leading-[1.8] [&_p]:not-first:mt-4 [&_p]:text-muted-foreground",
    "[&_a]:text-primary [&_a]:hover:underline",
    "[&_:is(h1,h2,h3,h4,h5,h6)]:not-first:mt-6 [&_:is(h1,h2,h3,h4,h5,h6)]:text-pretty [&_:is(h1,h2,h3,h4,h5,h6)]:font-semibold [&_:is(h1,h2,h3,h4,h5,h6)]:leading-[1.1]",
    "[&_p:first-child:has(~:is(h1,h2,h3,h4,h5,h6))]:font-medium [&_p:first-child:has(~:is(h1,h2,h3,h4,h5,h6))]:text-sm [&_p:first-child:has(~:is(h1,h2,h3,h4,h5,h6))]:text-accent-foreground",
  ],
  {
    variants: {
      size: {
        sm: "text-base [&_h1]:text-4xl [&_:is(h1,h2,h3,h4,h5,h6)]:text-2xl",
        default:
          "text-lg [&_h1]:text-4xl [&_h1]:lg:text-5xl [&_:is(h1,h2,h3,h4,h5,h6)]:text-3xl",
        lg: "text-lg [&_h1+p]:text-xl [&_h1]:text-4xl lg:[&_h1]:text-6xl [&_:is(h1,h2,h3,h4,h5,h6)]:text-3xl [&_:is(h1,h2,h3,h4,h5,h6)]:lg:text-4xl max-w-4xl",
      },
      align: {
        start: "text-start",
        center: "text-center",
        end: "text-end",
      },
    },
    defaultVariants: {
      size: "default",
      align: "start",
    },
  }
)

function Writeup({
  className,
  size,
  align,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof writeupVariants>) {
  return (
    <div
      className={cn(writeupVariants({ size, align }), className)}
      {...props}
    />
  )
}

export { Writeup }
