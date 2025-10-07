import { Check, Mail, MapPin, Phone } from "lucide-react"

import { cn } from "@/lib/utils"

const iconMap = {
  check: Check,
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
}

interface Props {
  name?: string
  className?: string
}

export default function ({ className, name, ...props }: Props) {
  if (!name) return null
  const Icon = name in iconMap && iconMap[name as keyof typeof iconMap]
  return Icon ? (
    <Icon className={cn(className)} {...props} />
  ) : (
    <span className={cn("size-4 text-base", className)} {...props}>
      {name}
    </span>
  )
}
