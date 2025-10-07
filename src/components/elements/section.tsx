import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const variants = cva("flex relative w-full", {
  variants: {
    size: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
  },
  defaultVariants: {
    size: "default",
    align: "start",
  },
})

interface Props extends VariantProps<typeof variants> {
  className?: string
  id?: string
  children?: React.ReactNode
}

export default function ({ id, className, children, size, align }: Props) {
  return (
    <section className={cn(variants({ size, align }), className)} id={id}>
      {children}
    </section>
  )
}
