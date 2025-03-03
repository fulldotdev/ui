import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end'
  size?: React.ComponentProps<typeof Button>['size']
  buttons?: ({ text: string; href: string } & React.ComponentProps<typeof Button>)[]
  reverse?: boolean
}

function Buttons({ align, size, reverse = false, className, buttons, ...rest }: Props) {
  const getButtonVariant = (index: number) => {
    if (reverse) {
      const length = buttons?.length || 0
      if (index === length - 1) return 'default'
      if (index === length - 2) return 'outline'
      return 'ghost'
    }
    if (index === 0) return 'default'
    if (index === 1) return 'outline'
    return 'ghost'
  }

  return buttons ? (
    <div
      className={cn(
        'buttons inline-flex flex-wrap gap-2',
        {
          'justify-start': align === 'start',
          'justify-center': align === 'center',
          'justify-end': align === 'end',
        },
        className
      )}
      {...rest}
    >
      {buttons?.map(({ text, href, ...button }, i) => (
        <Button
          key={i}
          variant={getButtonVariant(i)}
          size={size}
          asChild
          {...button}
        >
          <a href={href}>{text}</a>
        </Button>
      ))}
    </div>
  ) : null
}

export { Buttons }
