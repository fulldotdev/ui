import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const writeupVariants = cva(
  [
    "text-pretty max-w-2xl text-left text-foreground !leading-[1.75]",
    "[&_*]:not-first:mt-4 [&_*]:text-foreground/80",
    "[&_:is(h1,h2,h3,h4,h5,h6)]:scroll-mt-20 [&_:is(h1,h2,h3,h4,h5,h6)]:font-semibold [&_:is(h1,h2,h3,h4,h5,h6)]:tracking-tight [&_:is(h1,h2,h3,h4,h5,h6)]:text-foreground",
    "[&_blockquote]:border-l-2 [&_blockquote]:pl-6 [&_blockquote]:italic",
  ],
  {
    variants: {
      size: {
        xs: "text-xs [&_:is(h1,h2,h3,h4,h5,h6)]:text-xs",
        sm: "text-sm [&_:is(h1,h2,h3,h4,h5,h6)]:text-sm",
        default: "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-base",
        lg: "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-lg",
        xl: "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-xl",
        "2xl": "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-2xl",
        "3xl": "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-3xl",
        "4xl": "text-base [&_:is(h1,h2,h3,h4,h5,h6)]:text-4xl",
        "5xl":
          "text-base md:text-lg [&_:is(h1,h2,h3,h4,h5,h6)]:text-4xl lg:[&_:is(h1,h2,h3,h4,h5,h6)]:text-5xl",
        "6xl":
          "text-lg md:text-xl [&_:is(h1,h2,h3,h4,h5,h6)]:text-5xl lg:[&_:is(h1,h2,h3,h4,h5,h6)]:text-6xl",
        "7xl":
          "text-lg md:text-xl [&_:is(h1,h2,h3,h4,h5,h6)]:text-5xl lg:[&_:is(h1,h2,h3,h4,h5,h6)]:text-7xl",
        "8xl":
          "text-lg md:text-xl [&_:is(h1,h2,h3,h4,h5,h6)]:text-5xl lg:[&_:is(h1,h2,h3,h4,h5,h6)]:text-8xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Writeup({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof writeupVariants> & {
    children?: React.ReactNode
  }) {
  return (
    <div className={cn(writeupVariants({ size }), className)} {...props}>
      {children}
    </div>
  )
}

export { Writeup }
