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
  search?: React.ComponentProps<typeof Search>["groups"]
}

function Header2({ logo, menus, buttons, search, className, ...props }: Props) {
  return (
    <header
      className={cn(
        "header bg-background sticky top-0 z-50 flex w-full border-b",
        className
      )}
      {...props}
    >
      <Container>
        <div className="flex h-14 items-center gap-2">
          <DrawerMenu className="-ml-2.5 lg:hidden" items={menus} />
          <Logo className="mr-3 hidden md:flex" {...logo} />
          <Search groups={search} className="mx-auto w-full lg:mx-6" />
          <Buttons className="max-sm:hidden" buttons={buttons} reverse />
          <ShopifyCart className="-mr-2.5" />
        </div>
        <div className="-mx-2.5 flex h-12 items-center pb-2.5 max-lg:hidden">
          <NavigationMenu items={menus} />
        </div>
      </Container>
      <style>
        {`
          :root {
            --header-height: calc(var(--spacing) * 26);
          }
        `}
      </style>
    </header>
  )
}

export { Header2 }
