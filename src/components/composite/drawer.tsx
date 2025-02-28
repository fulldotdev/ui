import { Button } from '@/components/ui/button'
import { DrawerContent, Drawer as DrawerRoot, DrawerTrigger } from '@/components/ui/drawer'
import type { ComponentProps } from 'react'

interface Props {
  className?: string
  variant?: ComponentProps<typeof Button>['variant']
  size?: ComponentProps<typeof Button>['size']
  title?: string
  description?: string
  children?: any
  trigger?: any
  header?: any
  footer?: any
}

export function Drawer({ variant, size, title, description, className, children, trigger, header, footer }: Props) {
  return (
    <DrawerRoot>
      <DrawerTrigger asChild>
        <Button
          size={size}
          variant={variant}
          name="drawer-trigger"
          className={className}
        >
          {trigger}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[60svh] p-0">{children}</DrawerContent>
    </DrawerRoot>
  )
}
