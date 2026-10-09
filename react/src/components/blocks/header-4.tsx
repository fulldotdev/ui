import * as React from "react"
import { cn } from "cn"
import { XIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Header, HeaderContainer, HeaderGroup } from "@/components/ui/header"
import { Icon } from "@/components/ui/icon"
import { Logo, LogoImage, LogoText } from "@/components/ui/logo"
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function Header4({
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
    description?: string
    active?: boolean
    image?: {
      src: string
      srcSet?: string
      width?: number
      height?: number
    }
    links?: {
      label: string
      href: string
      description?: string
      icon?: string
      active?: boolean
    }[]
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
    <Header className={cn("border-b", className)} {...props}>
      <HeaderContainer className="justify-between">
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
          className="absolute left-1/2 hidden max-w-none -translate-x-1/2 lg:flex"
          align="center"
        >
          <NavigationMenuList>
            {navigation.map((item, index) =>
              item.links?.length ? (
                <NavigationMenuItem
                  key={item.href + item.label}
                  value={`nav-${index}`}
                >
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[min(46rem,calc(100vw-2rem))] gap-2 p-1 lg:grid-cols-[1fr_1.1fr]">
                      <NavigationMenuLink
                        href={item.href}
                        active={item.active}
                        className="flex min-h-40 flex-col items-start justify-end gap-3 bg-muted/50 p-4 text-left hover:bg-muted focus:bg-muted"
                      >
                        {item.image && (
                          <img
                            src={item.image.src}
                            srcSet={item.image.srcSet}
                            width={item.image.width}
                            height={item.image.height}
                            alt=""
                            sizes="(min-width: 1024px) 22rem, 100vw"
                            loading="lazy"
                            decoding="async"
                            className="mb-auto aspect-[16/9] w-full rounded-md object-cover"
                          />
                        )}
                        <span className="text-base font-medium">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </NavigationMenuLink>
                      <div className="grid gap-1">
                        {item.links.map((link) => (
                          <NavigationMenuLink
                            key={link.href + link.label}
                            href={link.href}
                            active={link.active}
                            className="items-start gap-3 p-3"
                          >
                            {link.icon && (
                              <Icon
                                name={link.icon}
                                className="mt-0.5 text-muted-foreground"
                              />
                            )}
                            <span className="grid gap-1">
                              <span className="font-medium">{link.label}</span>
                              {link.description && (
                                <span className="text-sm leading-relaxed text-muted-foreground">
                                  {link.description}
                                </span>
                              )}
                            </span>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem
                  key={item.href + item.label}
                  value={`nav-${index}`}
                >
                  <NavigationMenuLink
                    href={item.href}
                    active={item.active}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <HeaderGroup className="ml-auto hidden justify-end lg:flex">
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
            <div className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-12">
              <nav aria-label={menu.title} className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <div key={item.href + item.label} className="grid gap-1">
                    <SheetClose
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
                        "justify-start font-medium"
                      )}
                    >
                      {item.label}
                    </SheetClose>
                    {item.links && item.links.length > 0 && (
                      <div className="ml-3 grid gap-1 border-l border-border pl-3">
                        {item.links.map((link) => (
                          <SheetClose
                            key={link.href + link.label}
                            nativeButton={false}
                            render={
                              <a
                                href={link.href}
                                aria-current={link.active ? "page" : undefined}
                                role={undefined}
                              />
                            }
                            className={cn(
                              buttonVariants({ variant: "ghost" }),
                              "justify-start text-muted-foreground"
                            )}
                          >
                            {link.icon && <Icon name={link.icon} />}
                            {link.label}
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>
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

export { Header4 }
