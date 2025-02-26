import { Button, type ButtonProps } from '@/components/ui/button'
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  Drawer as DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

interface Props {
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
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
