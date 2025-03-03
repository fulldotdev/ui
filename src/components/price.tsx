import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  amount?: number
  compare?: number
  currency?: string
  unit?: string
  badge?: boolean
}

function Price({ amount, compare, unit, currency = 'EUR', className, badge }: Props) {
  function formatPrice(number: number): string {
    if (number === null || number === undefined) return ''
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: currency,
    }).format(number)
  }

  return (
    amount && (
      <div className={cn('price flex items-center gap-2.5', className)}>
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
