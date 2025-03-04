import { Buttons } from '@/components/buttons'
import { Container } from '@/components/container'
import { DrawerMenu } from '@/components/drawer-menu'
import { Logo } from '@/components/logo'
import { NavigationMenu } from '@/components/navigation-menu'
import { Search } from '@/components/search'
import { ShopifyCart } from '@/components/shopify-cart'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ComponentProps<typeof Logo>
  menus?: React.ComponentProps<typeof NavigationMenu>['items']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  search?: React.ComponentProps<typeof Search>['groups']
}

function Header({ logo, menus, buttons, search, className, ...props }: Props) {
  return (
    <header
      className={cn(
        'header bg-background/95 sticky top-0 z-50 backdrop-blur flex h-14 w-full border-b supports-[backdrop-filter]:bg-background/80',
        className
      )}
      {...props}
    >
      <Container className="flex items-center justify-between gap-4 max-sm:gap-0">
        <div className="flex items-center gap-2">
          <DrawerMenu
            className="lg:hidden -ml-2.5"
            items={menus}
          />
          <Logo
            className="max-sm:hidden lg:hidden xl:flex mr-3"
            {...logo}
          />
          <NavigationMenu
            className="max-lg:hidden max-xl:-ml-3"
            items={menus}
          />
        </div>
        <div className="inline-flex items-center justify-end gap-2 w-full">
          <Search
            groups={search}
            className="w-full"
          />
          <Buttons
            className="max-sm:hidden"
            buttons={buttons}
            reverse
          />
          <ShopifyCart className="-mr-2.5" />
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

export { Header }
