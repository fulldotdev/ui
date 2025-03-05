import * as React from "react"

import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { DrawerMenu } from "@/components/drawer-menu"
import { Logo } from "@/components/logo"
import { NavigationMenu } from "@/components/navigation-menu"
import { Search } from "@/components/search"
import { ShopifyCart } from "@/components/shopify-cart"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ComponentProps<typeof Logo>
  menus?: React.ComponentProps<typeof NavigationMenu>["items"]
  buttons?: React.ComponentProps<typeof Buttons>["buttons"]
  search?: React.ComponentProps<typeof Search>["groups"] | boolean
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
}: Props) {
  return (
    <header
      className={cn(
        "header bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 flex h-14 w-full border-b backdrop-blur",
        className
      )}
      {...props}
    >
      <Container className="flex items-center justify-between gap-4 max-sm:gap-0">
        <div className="flex items-center gap-2">
          <DrawerMenu className="-ml-2.5 lg:hidden" items={menus} />
          <Logo className="mr-3 max-sm:hidden lg:hidden xl:flex" {...logo} />
          <NavigationMenu
            className="max-xl:-ml-3 max-lg:hidden"
            items={menus}
          />
        </div>
        <div className="inline-flex w-full items-center justify-end gap-2">
          {search ? <Search groups={search} className="w-full" /> : null}
          <Buttons className="max-sm:hidden" buttons={buttons} reverse />
          {cart ? <ShopifyCart className="-mr-2.5" /> : null}
        </div>
      </Container>
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
