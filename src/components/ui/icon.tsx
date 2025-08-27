import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const iconMap = {
  check: Check,
}

function Icon({
  className,
  name,
  ...props
}: React.ComponentProps<"svg"> & {
  name: keyof typeof iconMap | string
}) {
  const Icon = name in iconMap && iconMap[name as keyof typeof iconMap]
  return Icon ? (
    <Icon className={cn(className)} {...props} />
  ) : (
    <svg className={cn("size-4 text-base", className)} {...props}>
      {name}
    </svg>
  )
}

export { Icon }
