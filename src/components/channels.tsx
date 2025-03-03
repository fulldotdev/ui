import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Mail, MapPin, Phone } from 'lucide-react'

interface Props extends React.ComponentProps<'div'> {
  phone?: string
  email?: string
  address?: string
}

function Channels({ phone, email, address, className, ...props }: Props) {
  return phone || email || address ? (
    <div
      className={cn('flex flex-col items-start gap-3', className)}
      {...props}
    >
      {phone ? (
        <Button
          variant="secondary"
          asChild
        >
          <a href={`tel:${phone}`}>
            <Phone className="mr-2 h-4 w-4" />
            {phone}
          </a>
        </Button>
      ) : null}
      {email ? (
        <Button
          variant="secondary"
          asChild
        >
          <a href={`mailto:${email}`}>
            <Mail className="mr-2 h-4 w-4" />
            {email}
          </a>
        </Button>
      ) : null}
      {address ? (
        <Button
          variant="secondary"
          asChild
        >
          <a href={`https://www.google.com/maps/search/?api=1&query=${address}`}>
            <MapPin className="mr-2 h-4 w-4" />
            {address}
          </a>
        </Button>
      ) : null}
    </div>
  ) : null
}

export { Channels }
