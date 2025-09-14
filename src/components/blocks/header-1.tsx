import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Links from "@/components/elements/links"
import Logo from "@/components/elements/logo"
import Socials from "@/components/elements/socials"

interface Props {
  align?: "start" | "center" | "end"
  image?: React.ComponentProps<typeof Logo>["image"]
  title?: string
  links?: React.ComponentProps<typeof Links>["links"]
  socials?: React.ComponentProps<typeof Socials>["socials"]
  menus?: {
    text?: string
    href?: string
    links?: {
      text?: string
      href?: string
    }[]
  }[]
}

export default function ({
  align = "start",
  image,
  title,
  menus,
  links,
  socials,
}: Props) {
  return (
    <header
      className="bg-background sticky top-0 z-50 flex h-14 items-center"
      id="header"
    >
      <div className="container flex justify-between gap-8">
        <Logo title={title} image={image} />
        {/* Desktop Menu */}
        {menus && menus.length > 0 && (
          <NavigationMenu
            className={cn("max-lg:hidden", {
              "mr-auto": align === "start",
              "absolute left-1/2 -translate-x-1/2": align === "center",
              "ml-auto": align === "end",
            })}
            viewport={false}
          >
            <NavigationMenuList>
              {menus?.map((menu, i) => (
                <NavigationMenuItem key={i}>
                  {menu.links && menu.links.length > 0 ? (
                    <>
                      <NavigationMenuTrigger>
                        {menu.href ? (
                          <a href={menu.href}>{menu.text}</a>
                        ) : (
                          <>{menu.text}</>
                        )}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="flex w-[200px] flex-col gap-2">
                          {menu.links?.map((link, i) => (
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
                      href={menu.href}
                    >
                      {menu.text}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div className="flex justify-end gap-4">
          <Socials className="max-sm:hidden" socials={socials} />
          <Links className="max-sm:hidden" links={links} />
          {/* Mobile Menu */}
          {menus && menus.length > 0 && (
            <Sheet>
              <SheetTrigger className="lg:hidden">
                <Menu className="!size-6" />
              </SheetTrigger>
              <SheetContent
                className="overflow-y-auto px-4 py-8"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col"
                >
                  {menus?.map((menu, i) => (
                    <AccordionItem key={i} value={`${i}. ${menu.text}`}>
                      {menu.links && menu.links.length > 0 ? (
                        <>
                          <AccordionTrigger className="text-base font-medium hover:no-underline">
                            {menu.href ? (
                              <a href={menu.href}>{menu.text}</a>
                            ) : (
                              <>{menu.text}</>
                            )}
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-4 pb-6">
                            {menu.links?.map((link, i) => (
                              <a
                                className="text-muted-foreground flex text-base"
                                key={i}
                                href={link.href}
                              >
                                {link.text}
                              </a>
                            ))}
                          </AccordionContent>
                        </>
                      ) : (
                        <a
                          className="flex py-4 text-base font-medium"
                          href={menu.href}
                        >
                          {menu.text}
                        </a>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
                <Links className="w-full flex-col" links={links} />
                <Socials className="mx-auto" socials={socials} />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}
