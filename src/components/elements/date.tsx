import { cva, type VariantProps } from "class-variance-authority"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const variants = cva("inline-flex items-center gap-2 text-sm font-medium", {
  variants: {
    size: {
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
    },
  },
})

interface Props extends VariantProps<typeof variants> {
  size?: "sm" | "default" | "lg"
  date?: Date
}

export default function ({ size, date }: Props) {
  if (!date) return null
  return (
    <p className={cn(variants({ size }))}>
      <CalendarIcon className="size-4" />
      {new Date(date).toLocaleDateString("nl-NL")}
    </p>
  )
}
