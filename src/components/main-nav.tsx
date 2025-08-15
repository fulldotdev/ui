import * as React from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

function MainMenu({
  items,
  ...props
}: React.ComponentProps<typeof NavigationMenu> & {
  items?: {
    text?: string
    href?: string
    links?: {
      text?: string
      href?: string
    }[]
  }[]
}) {
  return (
    <NavigationMenu viewport={false} {...props}>
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
  )
}

export { MainMenu }
