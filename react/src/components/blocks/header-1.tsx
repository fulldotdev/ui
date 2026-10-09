import * as React from "react"
import { cn } from "cn"
import { XIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Header, HeaderContainer, HeaderGroup } from "@/components/ui/header"
import { Icon } from "@/components/ui/icon"
import { Logo, LogoImage, LogoText } from "@/components/ui/logo"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function Header1({
  className,
  logo,
  navigation,
  buttons,
  navigationLabel,
  menu,
  ...props
}: React.ComponentProps<"header"> & {
  logo: {
    label: string
    href: string
    src?: string
    srcLight?: string
    srcDark?: string
  }
  navigation: {
    label: string
    href: string
    active?: boolean
  }[]
  buttons: {
    label: string
    href: string
    icon?: string
    target?: "_self" | "_blank"
  }[]
  navigationLabel: string
  menu: {
    label: string
    title: string
    description: string
    closeLabel: string
  }
}) {
  return (
    <Header className={className} {...props}>
      <HeaderContainer className="items-center justify-between gap-4">
        <HeaderGroup>
          <Logo href={logo.href}>
            <LogoImage
              src={logo.src}
              srcLight={logo.srcLight}
              srcDark={logo.srcDark}
              alt=""
            />
            <LogoText>{logo.label}</LogoText>
          </Logo>
        </HeaderGroup>
        <NavigationMenu
          aria-label={navigationLabel}
          className="hidden flex-none justify-start lg:flex"
        >
          <NavigationMenuList className="justify-start">
            {navigation.map((item, index) => (
              <NavigationMenuItem
                key={item.href + item.label}
                value={`nav-${index}`}
              >
                <NavigationMenuLink href={item.href} active={item.active}>
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <HeaderGroup className="ml-auto hidden flex-1 justify-end lg:flex">
          {buttons.map(({ label, href, icon, target }, index) => (
            <a
              key={href + label}
              href={href}
              target={target}
              rel={target === "_blank" ? "noreferrer" : undefined}
              className={buttonVariants({
                size: "sm",
                variant: index === buttons.length - 1 ? "default" : "ghost",
              })}
            >
              {icon && <Icon name={icon} />}
              {label}
            </a>
          ))}
        </HeaderGroup>
        <Sheet>
          <SheetTrigger
            aria-label={menu.label}
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="ml-auto lg:hidden"
              />
            }
          >
            <Icon name="menu" />
          </SheetTrigger>
          <SheetContent side="right" showCloseButton={false} className="p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>{menu.title}</SheetTitle>
              <SheetDescription>{menu.description}</SheetDescription>
            </SheetHeader>
            <div className="flex h-full flex-col gap-6 px-4 py-12">
              <nav aria-label={menu.title} className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <SheetClose
                    key={item.href + item.label}
                    nativeButton={false}
                    render={
                      <a
                        href={item.href}
                        aria-current={item.active ? "page" : undefined}
                        role={undefined}
                      />
                    }
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "justify-start"
                    )}
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
              {buttons.length > 0 && (
                <div className="mt-auto flex flex-col gap-2">
                  {buttons.map(({ label, href, icon, target }, index) => (
                    <SheetClose
                      key={href + label}
                      nativeButton={false}
                      render={
                        <a
                          href={href}
                          target={target}
                          rel={target === "_blank" ? "noreferrer" : undefined}
                          role={undefined}
                        />
                      }
                      className={buttonVariants({
                        variant:
                          index === buttons.length - 1 ? "default" : "outline",
                      })}
                    >
                      {icon && <Icon name={icon} />}
                      {label}
                    </SheetClose>
                  ))}
                </div>
              )}
            </div>
            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="cn-sheet-close"
                />
              }
            >
              <XIcon />
              <span className="sr-only">{menu.closeLabel}</span>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </HeaderContainer>
    </Header>
  )
}

export { Header1 }
