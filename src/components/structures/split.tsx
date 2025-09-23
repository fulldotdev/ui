import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const variants = cva(
  "grid w-full auto-cols-fr items-start lg:grid-flow-col gap-16",
  {
    variants: {
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
      },
    },
  }
)

export default function ({
  align,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof variants>) {
  return (
    <div className={cn(variants({ align }), className)} {...props}>
      {children}
    </div>
  )
}
