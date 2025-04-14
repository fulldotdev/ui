import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { cn } from "@/lib/utils"
import { Buttons } from "@/components/buttons"
import { Container } from "@/components/container"
import { DrawerMenu } from "@/components/drawer-menu"
import { Logo } from "@/components/logo"
import { NavigationMenu } from "@/components/navigation-menu"
import { Search } from "@/components/search"
import { ShopifyCart } from "@/components/shopify-cart"

function Header2({
  logo,
  menus,
  buttons,
  search,
  cart,
  className,
  ...props
}: BlockSchema & React.ComponentProps<"header">) {
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
          {search ? (
            <Search links={search} className="mx-auto lg:mx-6" />
          ) : null}
          <Buttons className="max-sm:hidden" buttons={buttons} reverse />
          {cart ? <ShopifyCart className="-mr-2.5" /> : null}
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
