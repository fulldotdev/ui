import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  class?: string
  amount?: number
  compare?: number
  currency?: string
  unit?: string
}

const formatPrice = (number: number | null | undefined): string => {
  return `€${number?.toFixed(2).replace('.', ',').replace(',00', '')}`
}

export function Price({ amount, compare, unit, currency, className, class: classList, ...rest }: Props) {
  return (
    amount && (
      <div
        className={cn('price flex items-center gap-4', classList, className)}
        {...rest}
      >
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
