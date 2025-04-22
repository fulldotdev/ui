import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DrawerMenu } from "@/components/drawer-menu"
import { Logo } from "@/components/logo"
import { NavigationMenu } from "@/components/navigation-menu"
import { Search } from "@/components/search"
import { ShopifyCart } from "@/components/shopify-cart"

export interface Header1Props extends React.ComponentProps<"header"> {
  logo?: React.ComponentProps<typeof Logo>
  menus?: {
    text: string
    href: string
  }[]
  buttons?: (React.ComponentProps<typeof Button> & {
    text: string
    href: string
  })[]
  search?: any
  cart?: boolean
}

function Header1({
  logo,
  menus,
  buttons,
  search,
  cart,
  className,
  ...props
}: Header1Props) {
  return (
    <header
      className={cn(
        "header bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 flex h-14 w-full border-b backdrop-blur",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-4 px-4 max-sm:gap-0 lg:px-8">
        <div className="flex items-center gap-2">
          {menus && <DrawerMenu className="-ml-2.5 lg:hidden" items={menus} />}
          {logo && (
            <Logo className="mr-3 max-sm:hidden lg:hidden xl:flex" {...logo} />
          )}
          {menus && (
            <NavigationMenu
              className="max-xl:-ml-3 max-lg:hidden"
              items={menus}
            />
          )}
        </div>
        <div className="inline-flex w-full items-center justify-end gap-2">
          {search && <Search links={search} />}
          {buttons && buttons.length > 0 && (
            <div className="inline-flex flex-nowrap flex-wrap gap-2 max-sm:hidden">
              {buttons.map(({ text, href, ...button }, i) => (
                <Button
                  key={text}
                  variant={i === 0 ? "default" : "outline"}
                  asChild
                  {...button}
                >
                  <a href={href}>{text}</a>
                </Button>
              ))}
            </div>
          )}
          {cart && <ShopifyCart className="-mr-2.5" />}
        </div>
      </div>
      <style>
        {`
          :root {
            --header-height: calc(var(--spacing) * 14);
          }
        `}
      </style>
    </header>
  )
}

export { Header1 }
