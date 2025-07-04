import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const paragraphVariants = cva(
  "paragraph text-foreground/80 max-w-xl leading-[1.75] text-pretty",
  {
    variants: {
      size: {
        sm: "text-sm leading-[1.75]",
        default: "text-base leading-[1.75]",
        lg: "text-lg leading-[1.75]",
        xl: "text-lg leading-[1.75] md:text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Paragraph({
  className,
  size,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof paragraphVariants>) {
  return <p className={cn(paragraphVariants({ size }), className)} {...props} />
}

export { Paragraph }
