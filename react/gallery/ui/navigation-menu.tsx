import * as React from "react"
import { CircleCheckIcon, CircleDashedIcon, CircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

type Align = NonNullable<
  React.ComponentProps<typeof NavigationMenuPositioner>["align"]
>

const aligns: Align[] = ["start", "center", "end"]

const components = [
  {
    title: "Alert Dialog",
    href: "#/ui/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content.",
  },
  {
    title: "Hover Card",
    href: "#/ui/hover-card",
    description: "Preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#/ui/progress",
    description: "Shows the completion progress of a task.",
  },
  {
    title: "Tabs",
    href: "#/ui/tabs",
    description: "Layered sections of content, displayed one at a time.",
  },
]

function ListItem({
  title,
  href,
  children,
}: {
  title: string
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <NavigationMenuLink href={href} className="flex-col items-start">
        <div className="text-sm font-medium">{title}</div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{children}</p>
      </NavigationMenuLink>
    </li>
  )
}

export default function Demo() {
  const [align, setAlign] = React.useState<Align>("start")

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Menus, links and positioner alignment">
        <div className="flex w-full flex-col gap-4">
          <div className="flex gap-2">
            {aligns.map((value) => (
              <Button
                key={value}
                size="sm"
                variant={align === value ? "default" : "outline"}
                onClick={() => setAlign(value)}
              >
                Align {value}
              </Button>
            ))}
          </div>
          <NavigationMenu align={align}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-96 gap-1">
                    <ListItem href="#/ui/navigation-menu" title="Introduction">
                      Reusable components you can copy into your site.
                    </ListItem>
                    <ListItem href="#/ui/navigation-menu" title="Installation">
                      Install dependencies and structure your app.
                    </ListItem>
                    <ListItem href="#/ui/navigation-menu" title="Typography">
                      Styles for headings, paragraphs and lists.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[32rem] grid-cols-2 gap-1">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Status</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-48 gap-1">
                    <li>
                      <NavigationMenuLink href="#/ui/navigation-menu">
                        <CircleDashedIcon />
                        Backlog
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#/ui/navigation-menu">
                        <CircleIcon />
                        To do
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#/ui/navigation-menu">
                        <CircleCheckIcon />
                        Done
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#/ui/navigation-menu"
                  className={navigationMenuTriggerStyle()}
                >
                  Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </Example>

      <Example title="Open indicator">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex flex-col items-center">
              <NavigationMenuTrigger>Account</NavigationMenuTrigger>
              <NavigationMenuIndicator className="absolute opacity-0 data-popup-open:opacity-100" />
              <NavigationMenuContent>
                <ul className="grid w-48 gap-1">
                  <li>
                    <NavigationMenuLink href="#/ui/navigation-menu">
                      Profile
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#/ui/navigation-menu">
                      Billing
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#/ui/navigation-menu"
                className={navigationMenuTriggerStyle()}
                active
              >
                Active link
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Example>
    </div>
  )
}
