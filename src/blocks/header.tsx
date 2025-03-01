import { Box } from '@/components/box'
import Buttons from '@/components/buttons'
import { Cart } from '@/components/cart'
import { Container } from '@/components/container'
import { DrawerMenu } from '@/components/drawer-menu'
import { Logo } from '@/components/logo'
import { NavigationMenu } from '@/components/navigation-menu'
import { Search } from '@/components/search'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ComponentProps<typeof Logo>
  menus?: React.ComponentProps<typeof NavigationMenu>['items']
  buttons?: React.ComponentProps<typeof Buttons>['buttons']
  search?: boolean
}

function Header({ logo, menus, buttons, search, className, ...props }: Props) {
  return (
    <Box
      className={cn('header bg-background sticky top-0 z-20 flex h-14 w-full border-b', className)}
      as="header"
      {...props}
    >
      <Container className="flex items-center justify-between gap-8">
        <Box className="flex items-center gap-4">
          <Logo {...logo} />
          <NavigationMenu
            className="max-lg:hidden"
            items={menus}
          />
        </Box>
        <Box className="inline-flex items-center gap-2">
          <Search groups={search} />
          <Buttons
            className="max-sm:hidden"
            size="sm"
            buttons={buttons}
            reverse
          />
          <Cart />
          <DrawerMenu
            className="size-8 lg:hidden"
            items={menus}
          />
        </Box>
      </Container>
    </Box>
  )
}

export { Header }
