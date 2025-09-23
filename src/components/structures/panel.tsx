import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const variants = cva("flex flex-col", {
  variants: {
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
  },
})

export default function ({
  align,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof variants>) {
  return (
    <div
      className={cn("rounded-lg border px-4 py-16 md:px-8 lg:px-12", className)}
      {...props}
    >
      {children}
    </div>
  )
}
