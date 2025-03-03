import { Button } from '@/components/ui/button'
import { DrawerContent, Drawer as DrawerRoot, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

interface Props extends React.ComponentProps<typeof Button>, React.ComponentProps<typeof DrawerTrigger> {
  items?: {
    text?: string
    href?: string
    links?: {
      text?: string
      href?: string
    }[]
  }[]
}

function DrawerMenu({ items, className, ...props }: Props) {
  return items ? (
    <DrawerRoot>
      <DrawerTrigger asChild>
        <Button
          className={cn('', className)}
          variant="ghost"
          size="icon"
          {...props}
        >
          <Menu className="size-5 !w-9" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-3 overflow-auto p-6">
          {items?.map(({ text, href, links }) =>
            text || links ? (
              <div
                className={`flex flex-col gap-3 ${links ? 'mt-3' : ''}`}
                key={uuidv4()}
              >
                <a
                  className="text-foreground text-base font-medium hover:underline"
                  href={href}
                >
                  {text}
                </a>
                {links?.map(({ text, href }) =>
                  text && href ? (
                    <a
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      key={uuidv4()}
                      href={href}
                    >
                      {text}
                    </a>
                  ) : null
                )}
              </div>
            ) : null
          )}
        </div>
      </DrawerContent>
    </DrawerRoot>
  ) : null
}

export { DrawerMenu }
