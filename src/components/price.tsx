import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  amount?: number
  compare?: number
  currency?: string
  unit?: string
}

const formatPrice = (number: number | null | undefined): string => {
  return `€${number?.toFixed(2).replace('.', ',').replace(',00', '')}`
}

function Price({ amount, compare, unit, currency, className }: Props) {
  return (
    amount && (
      <div className={cn('price flex items-center gap-4', className)}>
        <div>
          {amount && formatPrice(amount)}
          {compare ? (
            <span className="text-muted-foreground ml-2 text-sm line-through">{formatPrice(compare)}</span>
          ) : null}
          {unit && <span className="text-muted-foreground text-sm">{unit ? ` / ${unit}` : ''}</span>}
        </div>
        {compare ? <Badge>{`-${Math.round(((compare - (amount || 0)) / compare) * 100)}%`}</Badge> : null}
      </div>
    )
  )
}

export default Price
