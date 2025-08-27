import * as React from "react"
import { Link as LinkIcon, Mail, MapPin, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Link } from "@/components/ui/link"

const iconMap = {
  email: <Mail />,
  phone: <Phone />,
  address: <MapPin />,
  website: <LinkIcon />,
}

function Channel({
  className,
  type,
  value,
  ...props
}: React.ComponentProps<typeof Link> & {
  type?: "email" | "phone" | "address" | "website"
  value?: string
}) {
  const hrefMap = {
    email: `mailto:${value}`,
    phone: `tel:${value}`,
    address: `https://maps.app.goo.gl/${value}`,
    website: `https://${value}`,
  }
  const Icon = type && iconMap[type]
  return (
    <Link
      className={cn("leading-4", className)}
      href={type && hrefMap[type]}
      variant="secondary"
      size="sm"
      target="_blank"
      {...props}
    >
      {Icon}
      {value}
    </Link>
  )
}

export { Channel }
