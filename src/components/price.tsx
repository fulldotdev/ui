import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  amount?: number
  compare?: number
  currency?: string
  unit?: string
}

function Price({ amount, compare, unit, currency = 'EUR', className }: Props) {
  function formatPrice(number: number): string {
    if (number === null || number === undefined) return ''
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: currency,
    }).format(number)
  }

  return (
    amount && (
      <div className={cn('price flex items-center gap-4', className)}>
        <div>
          <span>{formatPrice(amount)}</span>
          {unit && <span className="text-muted-foreground text-sm">{unit ? ` / ${unit}` : ''}</span>}
        </div>
        {compare ? (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm line-through">{formatPrice(compare)}</span>
            <Badge>{`-${Math.round(((compare - (amount || 0)) / compare) * 100)}%`}</Badge>
          </div>
        ) : null}
      </div>
    )
  )
}

export { Price }
