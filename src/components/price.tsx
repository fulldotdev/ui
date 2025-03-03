import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

function Price({
  className,
  currency = 'EUR',
  amount,
  compare,
  unit,
  badge,
  ...props
}: React.ComponentProps<'div'> & {
  amount?: number
  compare?: number
  unit?: string
  currency?: string
  badge?: boolean
}) {
  function formatPrice(number: number): string {
    if (number === null || number === undefined) return ''
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: currency,
    }).format(number)
  }

  return (
    amount && (
      <div
        className={cn('price flex items-center gap-2.5', className)}
        {...props}
      >
        <span>{formatPrice(amount)}</span>
        {unit ? <span className="text-muted-foreground text-sm">{unit ? ` / ${unit}` : ''}</span> : null}
        {compare ? <span className="text-muted-foreground text-sm line-through">{formatPrice(compare)}</span> : null}
        {compare && badge ? (
          <Badge className="absolute top-2 left-2">{`-${Math.round(((compare - (amount || 0)) / compare) * 100)}%`}</Badge>
        ) : null}
      </div>
    )
  )
}

export { Price }
