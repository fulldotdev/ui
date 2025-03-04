import { Mail, MapPin, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"

interface Props extends React.ComponentProps<"div"> {
  phone?: string
  email?: string
  address?: string
}

function Channels({ phone, email, address, className, ...props }: Props) {
  return phone || email || address ? (
    <div
      className={cn("flex flex-col items-start gap-3", className)}
      {...props}
    >
      {phone ? (
        <Button variant="secondary" href={`tel:${phone}`}>
          <Phone className="mr-2 h-4 w-4" />
          {phone}
        </Button>
      ) : null}
      {email ? (
        <Button variant="secondary" href={`mailto:${email}`}>
          <Mail className="mr-2 h-4 w-4" />
          {email}
        </Button>
      ) : null}
      {address ? (
        <Button
          variant="secondary"
          href={`https://www.google.com/maps/search/?api=1&query=${address}`}
        >
          <MapPin className="mr-2 h-4 w-4" />
          {address}
        </Button>
      ) : null}
    </div>
  ) : null
}

export { Channels }
