import { Box } from '@/components/box'
import { cn } from '@/lib/utils'
import { Star, StarHalf } from 'lucide-react'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  score?: number | undefined | null
}

function Rating({ score, className, ...props }: Props) {
  const getIcon = (count: number) => {
    if (!score) return undefined
    const difference = score - count
    if (difference >= -0.25) return <Star className="size-[1em]" />
    if (difference >= -0.75) return <StarHalf className="size-[1em]" />
    return <Star className="size-[1em]" />
  }

  return (
    <Box
      className={cn('flex gap-1 text-base', className)}
      {...props}
    >
      {score &&
        [1, 2, 3, 4, 5].map((count) => (
          <Box
            key={count}
            className="!text-primary size-[1em]"
          >
            {getIcon(count)}
          </Box>
        ))}
    </Box>
  )
}

export { Rating }
