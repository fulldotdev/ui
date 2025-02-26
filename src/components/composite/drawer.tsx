import { Button } from '@/components/ui/button'
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  Drawer as DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
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
          variant={variant}
          size={size}
          className={className}
          name="drawer-trigger"
        >
          {trigger}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
          {header}
        </DrawerHeader>
        {children}
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  )
}
