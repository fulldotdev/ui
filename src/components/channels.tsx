import { Mail, MapPin, Phone } from "lucide-react"

import { cn } from "@/lib/utils"

interface Props extends React.ComponentProps<"div"> {
  phone?: string
  email?: string
  address?: string
}

function Channels({ phone, email, address, className, ...props }: Props) {
  return phone || email || address ? (
    <div
      className={cn(
        "text-muted-foreground flex flex-col items-start gap-5 text-sm",
        className
      )}
      {...props}
    >
      {phone ? (
        <a
          href={`tel:${phone}`}
          className="hover:text-foreground flex items-start gap-2"
        >
          <Phone className="size-4" />
          <span className="leading-4">{phone}</span>
        </a>
      ) : null}
      {email ? (
        <a
          href={`mailto:${email}`}
          className="hover:text-foreground flex items-start gap-2"
        >
          <Mail className="size-4" />
          <span className="leading-4">{email}</span>
        </a>
      ) : null}
      {address ? (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${address}`}
          className="hover:text-foreground flex items-start gap-2"
        >
          <MapPin className="size-4" />
          <span className="leading-4">{address}</span>
        </a>
      ) : null}
    </div>
  ) : null
}

export { Channels }
