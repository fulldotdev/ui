import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const abstractVariants = cva(
  [
    "w-full max-w-2xl",
    "[&_p]:leading-[1.8] [&_p]:not-first:mt-2 [&_p]:text-muted-foreground",
    "[&_a]:text-primary [&_a]:hover:underline",
    "[&_:is(h1,h2,h3,h4,h5,h6)]:scroll-mt-20 [&_:is(h1,h2,h3,h4,h5,h6)]:not-first:mt-12 [&_:is(h1,h2,h3,h4,h5,h6)]:text-pretty [&_:is(h1,h2,h3,h4,h5,h6)]:font-semibold [&_:is(h1,h2,h3,h4,h5,h6)]:leading-[1.1]",
  ],
  {
    variants: {
      size: {
        sm: "text-sm [&_:is(h1,h2,h3,h4,h5,h6)]:text-base",
        default: "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-lg",
        lg: "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-xl",
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

function Abstract({
  className,
  size,
  align,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof abstractVariants>) {
  return (
    <div
      className={cn(abstractVariants({ size, align }), className)}
      {...props}
    />
  )
}

export { Abstract }
