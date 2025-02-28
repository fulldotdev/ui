import { Button } from '@/components/ui/button'
import { DrawerContent, Drawer as DrawerRoot, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import type { ComponentProps, ReactNode } from 'react'

interface Props {
  class?: string
  variant?: ComponentProps<typeof Button>['variant']
  size?: ComponentProps<typeof Button>['size']
  children?: ReactNode
  trigger?: ReactNode
}

function Drawer({ children, trigger, variant, size, class: className }: Props) {
  return (
    <DrawerRoot>
      <DrawerTrigger asChild>
        <Button
          className={cn('size-8', className)}
          variant={variant}
          size={size}
          name="drawer-trigger"
        >
          {trigger}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[60svh] p-0">{children}</DrawerContent>
    </DrawerRoot>
  )
}

export default Drawer
