import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const iconMap = {
  check: Check,
}

interface Props extends React.ComponentProps<"svg"> {
  name: string
  className?: string
}

export default function ({ className, name, ...props }: Props) {
  const Icon = name in iconMap && iconMap[name as keyof typeof iconMap]
  return Icon ? (
    <Icon className={cn(className)} {...props} />
  ) : (
    <svg className={cn("size-4 text-base", className)} {...props}>
      {name}
    </svg>
  )
}
