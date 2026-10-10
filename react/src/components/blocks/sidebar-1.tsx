"use client"

import * as React from "react"
import { cn } from "cn"
import { ChevronDownIcon, SearchIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Header, HeaderContainer, HeaderGroup } from "@/components/ui/header"
import { Icon } from "@/components/ui/icon"
import { Kbd } from "@/components/ui/kbd"
import { LogoImage, LogoText } from "@/components/ui/logo"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const normalizePath = (path: string) =>
  path === "/" ? path : path.replace(/\/$/, "")

const subscribe = () => () => {}

// The server renders the Mac shortcut; the browser shows its own.
function useIsMac() {
  return React.useSyncExternalStore(
    subscribe,
    () =>
      /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent),
    () => true
  )
}

function Sidebar1({
  currentPath: rawCurrentPath,
  logo,
  search,
  breadcrumb,
  navigation,
  githubRepo,
  githubStars,
  labels,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  currentPath: string
  logo: {
    label: string
    href: string
    src?: string
    srcLight?: string
    srcDark?: string
  }
  search: {
    label: string
    empty: string
    items: {
      label: string
      href: string
      title: string
      path: string
      description: string
      group: string
    }[]
  }
  breadcrumb: {
    items: {
      label: string
      href: string
    }[]
    menu: {
      label: string
      href: string
    }[]
  }
  navigation: {
    label: string
    href: string
    links?: {
      label: string
      href: string
    }[]
  }[]
  githubRepo: string
  githubStars?: number
  labels: {
    sidebar: string
    github: string
    stars: string
    breadcrumb: string
    breadcrumbMenu: string
    sidebarToggle: string
    mobileTitle: string
    mobileDescription: string
    theme: string
    shortcut: {
      mac: string
      other: string
    }
  }
}) {
  const currentPath = normalizePath(rawCurrentPath)
  const isMac = useIsMac()
  const [searchOpen, setSearchOpen] = React.useState(false)

  // Command or Control + K opens the search from anywhere on the page.
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k") return
      if (event.shiftKey || event.altKey) return
      const shortcut = isMac
        ? event.metaKey && !event.ctrlKey
        : event.ctrlKey && !event.metaKey
      if (!shortcut) return
      event.preventDefault()
      setSearchOpen(true)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isMac])

  const searchGroups = search.items.reduce<
    { label: string; items: typeof search.items }[]
  >((groups, item) => {
    const group = groups.find((entry) => entry.label === item.group)
    if (group) group.items.push(item)
    else groups.push({ label: item.group, items: [item] })
    return groups
  }, [])

  const githubStarsLabel =
    githubStars === undefined
      ? labels.stars
      : new Intl.NumberFormat().format(githubStars)

  return (
    <SidebarProvider {...props}>
      <Sidebar
        aria-label={labels.sidebar}
        mobileTitle={labels.mobileTitle}
        mobileDescription={labels.mobileDescription}
        collapsible="offcanvas"
        variant="inset"
      >
        <SidebarHeader className="flex-col">
          <SidebarMenuButton size="lg" render={<a href={logo.href} />}>
            <LogoImage
              src={logo.src}
              srcLight={logo.srcLight}
              srcDark={logo.srcDark}
              alt=""
            />
            <LogoText className="font-semibold">{logo.label}</LogoText>
          </SidebarMenuButton>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start shadow-none"
            aria-keyshortcuts="Meta+K Control+K"
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon data-icon="inline-start" />
            <span className="truncate">{search.label}</span>
            <Kbd className="ml-auto h-4 min-w-4 translate-y-0 bg-background/80 px-1 text-[10px]">
              {isMac ? labels.shortcut.mac : labels.shortcut.other}
            </Kbd>
          </Button>
          <CommandDialog
            open={searchOpen}
            onOpenChange={setSearchOpen}
            title={search.label}
            description={search.label}
          >
            <Command className="[&_[data-slot=command-item][data-selected=true]]:bg-accent [&_[data-slot=command-item][data-selected=true]]:text-accent-foreground">
              <CommandInput placeholder={search.label} />
              <CommandList>
                <CommandEmpty>{search.empty}</CommandEmpty>
                {searchGroups.map((group) => (
                  <CommandGroup key={group.label} heading={group.label}>
                    {group.items.map((item) => (
                      <CommandItem
                        key={item.href}
                        value={`${item.group} ${item.label}`}
                        keywords={[
                          item.group,
                          item.title,
                          item.path,
                          item.description,
                        ]}
                        onSelect={() => window.location.assign(item.href)}
                      >
                        {item.label}
                        <CommandShortcut>{item.href}</CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </CommandDialog>
        </SidebarHeader>
        <SidebarContent className="[mask-image:linear-gradient(to_bottom,transparent,black_1rem,black_calc(100%_-_1rem),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_1rem,black_calc(100%_-_1rem),transparent)] group-data-[collapsible=icon]:[mask-image:none] group-data-[collapsible=icon]:[-webkit-mask-image:none]">
          {navigation.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarMenu>
                {(group.links ?? [group]).map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<a href={item.href} />}
                      isActive={normalizePath(item.href) === currentPath}
                    >
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header className="h-16">
          <HeaderContainer className="max-w-none justify-between">
            <HeaderGroup>
              <SidebarTrigger aria-label={labels.sidebarToggle} />
              <Separator orientation="vertical" className="my-auto mr-2 h-4" />
              <Breadcrumb aria-label={labels.breadcrumb}>
                <BreadcrumbList>
                  {breadcrumb.items.map((item, index) => {
                    const isLast = index === breadcrumb.items.length - 1
                    const hasMenu =
                      item.href !== "/" &&
                      breadcrumb.menu.some(
                        (menuItem) =>
                          normalizePath(menuItem.href) ===
                          normalizePath(item.href)
                      )
                    return (
                      <React.Fragment key={item.href}>
                        {index > 0 && (
                          <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        )}
                        <BreadcrumbItem>
                          {hasMenu ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                aria-current={isLast ? "page" : undefined}
                                className={cn(
                                  "inline-flex items-center gap-1 transition-colors hover:text-foreground",
                                  isLast && "text-foreground"
                                )}
                              >
                                {item.label}
                                <ChevronDownIcon
                                  className="size-3.5 opacity-70"
                                  aria-hidden="true"
                                />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                <DropdownMenuGroup>
                                  {breadcrumb.menu.map((menuItem) => (
                                    <DropdownMenuItem
                                      key={menuItem.href}
                                      render={
                                        <a
                                          href={menuItem.href}
                                          aria-current={
                                            normalizePath(menuItem.href) ===
                                            currentPath
                                              ? "page"
                                              : undefined
                                          }
                                        />
                                      }
                                      className="aria-[current=page]:text-foreground"
                                    >
                                      {menuItem.label}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : isLast ? (
                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={item.href}>
                              {item.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    )
                  })}
                  {breadcrumb.menu.length > 0 && currentPath === "/" && (
                    <>
                      <BreadcrumbSeparator>/</BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex items-center leading-none transition-colors hover:text-foreground">
                            <BreadcrumbEllipsis />
                            <span className="sr-only">
                              {labels.breadcrumbMenu}
                            </span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuGroup>
                              {breadcrumb.menu.map((item) => (
                                <DropdownMenuItem
                                  key={item.href}
                                  render={<a href={item.href} />}
                                >
                                  {item.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </HeaderGroup>
            <HeaderGroup className="shrink-0">
              <a
                href={`https://github.com/${githubRepo}`}
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                <Icon name="github" />
                <span className="sr-only">{labels.github}</span>
                <span className="hidden sm:inline">{githubStarsLabel}</span>
              </a>
              <ThemeToggle label={labels.theme} />
            </HeaderGroup>
          </HeaderContainer>
        </Header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export { Sidebar1 }
