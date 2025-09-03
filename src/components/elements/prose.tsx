import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const proseVariants = cva(
  [
    "w-full max-w-2xl",
    "[&_p]:leading-[1.8] [&_p]:not-first:mt-4",
    "[&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:not-first:mt-4",
    "[&_ol]:list-inside [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:not-first:mt-4",
    "[&_a]:text-primary [&_a]:hover:underline",
    "[&_:is(h1,h2,h3,h4,h5,h6)]:scroll-mt-20 [&_:is(h1,h2,h3,h4,h5,h6)]:not-first:mt-12 [&_:is(h1,h2,h3,h4,h5,h6)]:text-pretty [&_:is(h1,h2,h3,h4,h5,h6)]:font-semibold [&_:is(h1,h2,h3,h4,h5,h6)]:leading-[1.1]",
    "[&_img]:rounded-lg [&_img]:not-first:mt-12",
  ],
  {
    variants: {
      size: {
        sm: "[&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-xl [&_h4]:text-xl [&_h5]:text-lg [&_h6]:text-base max-w-2xl",
        default:
          "text-base [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl [&_h5]:text-lg [&_h6]:text-base max-w-2xl",
        lg: "text-xl [&_h1]:text-4xl lg:[&_h1]:text-6xl [&_h2]:text-5xl [&_h3]:text-4xl [&_h4]:text-3xl [&_h5]:text-2xl [&_h6]:text-xl max-w-4xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Prose({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof proseVariants>) {
  return <div className={cn(proseVariants({ size }), className)} {...props} />
}

export { Prose }
