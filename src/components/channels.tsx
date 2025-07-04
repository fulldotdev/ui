import { Mail, MapPin, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Link } from "@/components/ui/link"

interface Props extends React.ComponentProps<"div"> {
  phone?: string
  email?: string
  address?: string
}

function Channels({ phone, email, address, className, ...props }: Props) {
  return phone || email || address ? (
    <div
      className={cn("flex flex-col items-start text-sm", className)}
      {...props}
    >
      {phone ? (
        <Link
          className="text-foreground !px-0"
          href={`tel:${phone}`}
          variant="link"
        >
          <Phone className="size-4" />
          <span className="leading-4">{phone}</span>
        </Link>
      ) : null}
      {email ? (
        <Link
          className="text-foreground !px-0"
          variant="link"
          href={`mailto:${email}`}
        >
          <Mail className="size-4" />
          <span className="leading-4">{email}</span>
        </Link>
      ) : null}
      {address ? (
        <Link
          className="text-foreground !px-0"
          variant="link"
          href={`https://www.google.com/maps/search/?api=1&query=${address}`}
        >
          <MapPin className="size-4" />
          <span className="leading-4">{address}</span>
        </Link>
      ) : null}
    </div>
  ) : null
}

export { Channels }
