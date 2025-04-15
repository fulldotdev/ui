import { Mail, MapPin, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import { Column } from "@/components/column"

interface Props extends React.ComponentProps<typeof Column> {
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
      {/* {phone ? (
        <Button variant="outline" href={`tel:${phone}`}>
          <Phone className="mr-2 h-4 w-4" />
          {phone}
        </Button>
      ) : null}
      {email ? (
        <Button variant="outline" href={`mailto:${email}`}>
          <Mail className="mr-2 h-4 w-4" />
          {email}
        </Button>
      ) : null}
      {address ? (
        <Button
          variant="outline"
          href={`https://www.google.com/maps/search/?api=1&query=${address}`}
        >
          <MapPin className="mr-2 h-4 w-4" />
          {address}
        </Button>
      ) : null} */}
    </div>
  ) : null
}

export { Channels }
