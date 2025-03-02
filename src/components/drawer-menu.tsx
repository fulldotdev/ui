import { Button } from '@/components/ui/button'
import { DrawerContent, Drawer as DrawerRoot, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'

interface Props {
  className?: string
  items?: {
    text?: string
    href?: string
    links?: {
      text?: string
      href?: string
    }[]
  }[]
}

function DrawerMenu({ items, className }: Props) {
  return (
    <DrawerRoot>
      <DrawerTrigger asChild>
        <Button
          className={cn('', className)}
          variant="ghost"
          size="icon"
          name="drawer-trigger"
        >
          <Menu className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-3 overflow-auto p-6">
          {items?.map(({ text, href, links }) => (
            <div className={`flex flex-col gap-3 ${links ? 'mt-3' : ''}`}>
              <a
                className="text-foreground text-base font-medium hover:underline"
                href={href}
              >
                {text}
              </a>
              {links?.map(({ text, href }) => (
                <a
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  href={href}
                >
                  {text}
                </a>
              ))}
            </div>
          ))}
        </div>
      </DrawerContent>
    </DrawerRoot>
  )
}

export { DrawerMenu }
