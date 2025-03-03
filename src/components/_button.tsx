import { Link } from '@/components/link'
import { Button as UIButton } from '@/components/ui/button'
import * as React from 'react'

type Props = React.ComponentProps<typeof Link> &
  React.ComponentProps<typeof UIButton> & {
    children: React.ReactNode
  }

function Button({ className, children, ...props }: Props) {
  return 'href' in props ? <Link {...props}> {children}</Link> : <UIButton asChild>{children}</UIButton>
}

export { Button }
