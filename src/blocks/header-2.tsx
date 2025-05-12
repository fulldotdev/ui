import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Logo } from "@/components/ui/logo"
import { DrawerMenu } from "@/components/drawer-menu"
import { NavigationMenu } from "@/components/navigation-menu"
import { Search } from "@/components/search"
import { ShopifyCart } from "@/components/shopify-cart"

export interface Header2Props extends React.ComponentProps<"header"> {
  logo?: {
    src: string
    alt: string
  }
  title?: string
  menus?: {
    text: string
    href: string
  }[]
  buttons?: (React.ComponentProps<typeof Button> & {
    text: string
    href: string
  })[]
  search?: React.ComponentProps<typeof Search>["links"]
  cart?: boolean
}

function Header2({
  logo,
  title,
  menus,
  buttons,
  search,
  cart,
  className,
  ...props
}: Header2Props) {
  return (
    <header
      className={cn(
        "header bg-background sticky top-0 z-50 flex w-full border-b",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
        <div className="flex h-14 items-center gap-2">
          {menus && <DrawerMenu className="-ml-2.5 lg:hidden" items={menus} />}
          {logo && (
            <a href="/">
              <Logo
                className="mr-3 max-sm:hidden lg:hidden xl:flex"
                {...logo}
              />
            </a>
          )}
          {title && (
            <Heading
              size="lg"
              as="h6"
              className="mr-3 max-sm:hidden lg:hidden xl:flex"
            >
              {title}
            </Heading>
          )}
          {search && <Search links={search} className="mx-auto lg:mx-6" />}
          {buttons?.map(({ href, text, ...button }, i) => (
            <Button
              className="max-sm:hidden"
              key={href}
              variant={i === buttons.length - 1 ? "default" : "outline"}
              asChild
              {...button}
            >
              <a href={href}>{text}</a>
            </Button>
          ))}
          {cart && <ShopifyCart className="-mr-2.5" />}
        </div>
        <div className="-mx-2.5 flex h-12 items-center pb-2.5 max-lg:hidden">
          {menus && <NavigationMenu items={menus} />}
        </div>
      </div>
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
