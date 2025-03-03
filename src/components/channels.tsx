import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Mail, MapPin, Phone } from 'lucide-react'

interface Props extends React.ComponentProps<'div'> {
  phone?: string
  email?: string
  address?: string
}

function Channels({ phone, email, address, className }: Props) {
  return phone || email || address ? (
    <div className={cn('flex flex-col items-start gap-3', className)}>
      {phone && (
        <Button
          variant="secondary"
          asChild
        >
          <a href={`tel:${phone}`}>
            <Phone className="mr-2 h-4 w-4" />
            {phone}
          </a>
        </Button>
      )}
      {email && (
        <Button
          variant="secondary"
          asChild
        >
          <a href={`mailto:${email}`}>
            <Mail className="mr-2 h-4 w-4" />
            {email}
          </a>
        </Button>
      )}
      {address && (
        <Button
          variant="secondary"
          asChild
        >
          <a href={`https://www.google.com/maps/search/?api=1&query=${address}`}>
            <MapPin className="mr-2 h-4 w-4" />
            {address}
          </a>
        </Button>
      )}
    </div>
  ) : null
}

export { Channels }
