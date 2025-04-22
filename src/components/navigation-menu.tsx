import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu as NavigationMenuRoot,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

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

function NavigationMenu({ items, className }: Props) {
  const [offset, setOffset] = React.useState<string | undefined>(undefined)

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
    items && (
      <NavigationMenuRoot
        onValueChange={handleChange}
        style={{ "--offset": offset } as React.CSSProperties}
        className={cn(
          "[&>div:last-child]:translate-x-[var(--offset)] [&>div:last-child]:transition-transform",
          offset === undefined ? "[&>div:last-child]:hidden" : "",
          className
        )}
      >
        <NavigationMenuList>
          {items?.map((item, index) => (
            <NavigationMenuItem
              key={index}
              value={`navigation-menu-item-${index}`}
              id={`navigation-menu-item-${index}`}
            >
              {item.links ? (
                <>
                  <NavigationMenuTrigger className="text-foreground/80 h-9 bg-transparent px-3 py-0 font-normal">
                    <a href={item.href}>{item.text}</a>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex w-full min-w-48 flex-col gap-3 p-3">
                      {item.links.map((link, index) => (
                        <li key={index}>
                          <NavigationMenuLink
                            href={link.href ?? ""}
                            className="text-foreground/80 hover:text-foreground font-normal whitespace-nowrap transition-colors"
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
                  href={item.href ?? ""}
                  className={`${navigationMenuTriggerStyle()} text-foreground/80 hover:text-foreground h-9 bg-transparent px-3 py-0 font-normal transition-colors`}
                >
                  {item.text}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenuRoot>
    )
  )
}

export { NavigationMenu }
