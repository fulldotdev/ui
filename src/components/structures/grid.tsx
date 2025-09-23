import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const variants = cva("grid w-full", {
  variants: {
    size: {
      sm: "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
      default: "grid-cols-[repeat(auto-fit,minmax(260px,1fr))]",
      lg: "grid-cols-[repeat(auto-fit,minmax(400px,1fr))]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export default function ({
  size,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof variants>) {
  return (
    <div className={cn(variants({ size }), className)} {...props}>
      {children}
    </div>
  )
}
