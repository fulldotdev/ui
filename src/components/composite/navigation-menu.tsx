import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu as NavigationMenuRoot,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Props {
  class?: string | null
  items?:
    | {
        text?: string | null
        href?: string | null
        links?:
          | {
              text?: string | null
              href?: string | null
            }[]
          | null
      }[]
    | null
}

export function NavigationMenu({ items, class: className }: Props) {
  const [offset, setOffset] = useState<string | undefined>(undefined)

  function handleChange(value: string) {
    if (!value) {
      setOffset(undefined)
      return
    }
    const selectedItem = document.getElementById(value)
    if (selectedItem instanceof HTMLElement) {
      const selectedItemOffset = selectedItem.offsetLeft
      setOffset(`${selectedItemOffset}px`)
    }
  }

  return (
    <NavigationMenuRoot
      onValueChange={handleChange}
      style={{ '--offset': offset } as React.CSSProperties}
      className={cn(
        '[&>div:last-child]:translate-x-[var(--offset)] [&>div:last-child]:transition-transform',
        offset === undefined ? '[&>div:last-child]:hidden' : '',
        className
      )}
    >
      <NavigationMenuList className="gap-0">
        {items?.map((item, index) => (
          <NavigationMenuItem
            key={index}
            value={`navigation-menu-item-${index}`}
            id={`navigation-menu-item-${index}`}
          >
            {item.links ? (
              <>
                <NavigationMenuTrigger className="px-3 py-0 h-9 text-muted-foreground HELLO">
                  {item.text}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-full min-w-48 gap-3 p-6 flex flex-col">
                    {item.links.map((link, index) => (
                      <li key={index}>
                        <NavigationMenuLink
                          href={link.href ?? ''}
                          className="text-muted-foreground hover:text-foreground transition-colors font-normal whitespace-nowrap"
                        >
                          {link.text}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                href={item.href ?? ''}
                className={`${navigationMenuTriggerStyle()} px-3 py-0 h-9 text-muted-foreground hover:text-foreground transition-colors font-normal`}
              >
                {item.text}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenuRoot>
  )
}
