import * as React from "react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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

export default function ({ className, items }: Props) {
  if (!items || items.length === 0) return null

  const [open, setOpen] = React.useState(false)

  return (
    <>
      {/* Desktop menu */}
      <NavigationMenu
        viewport={false}
        className={cn("max-lg:hidden", className)}
      >
        <NavigationMenuList>
          {items?.map((item, i) => (
            <NavigationMenuItem key={i}>
              {item.links ? (
                <>
                  <NavigationMenuTrigger>
                    {item.href ? (
                      <a href={item.href}>{item.text}</a>
                    ) : (
                      <>{item.text}</>
                    )}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex w-[200px] flex-col gap-2">
                      {item.links?.map((link, i) => (
                        <li key={i}>
                          <NavigationMenuLink href={link.href}>
                            {link.text}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href={item.href}
                >
                  {item.text}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile menu */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={cn("lg:hidden", className)}>
          {open ? <X className="!size-6" /> : <Menu className="!size-6" />}
        </PopoverTrigger>
        <PopoverContent
          className="h-[calc(100vh-56px)] w-screen overflow-y-auto rounded-none border-none p-0 shadow-none"
          align="start"
          side="bottom"
          alignOffset={-16}
          sideOffset={14}
        >
          <div className="mx-auto flex h-auto max-w-screen-xl flex-col gap-4 overflow-auto px-4 py-8 lg:px-8">
            {items?.map((item, i) =>
              item.links ? (
                <div
                  className="mr-4 flex flex-col items-start gap-4 pt-8 not-first:mt-4 not-first:border-t"
                  key={i}
                >
                  {item.href ? (
                    <a
                      className="text-muted-foreground text-sm font-medium hover:underline"
                      {...item}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <div className="text-muted-foreground text-sm font-medium">
                      {item.text}
                    </div>
                  )}
                  {item.links?.map((link, i) => (
                    <a
                      key={i}
                      className="text-xl font-medium hover:underline"
                      {...link}
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  className="mr-4 border-t text-xl font-medium not-first:mt-4 not-first:pt-8 hover:underline"
                  key={i}
                  {...item}
                >
                  {item.text}
                </a>
              )
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
