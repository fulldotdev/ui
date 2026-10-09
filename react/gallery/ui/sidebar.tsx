import * as React from "react"
import {
  CalendarIcon,
  ChevronsUpDownIcon,
  FileTextIcon,
  HouseIcon,
  InboxIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

// Links stay on this gallery page.
const href = "#/ui/sidebar"

const navigation = [
  { title: "Home", icon: HouseIcon, active: true },
  { title: "Inbox", icon: InboxIcon, badge: "12" },
  { title: "Calendar", icon: CalendarIcon },
  { title: "Settings", icon: SettingsIcon },
]

const pages = ["Homepage", "About", "Contact"]

// The sidebar uses a fixed, viewport-high container. In the gallery it is
// placed absolutely inside a bounded frame instead, so it stays in the example.
const frame = "relative h-[32rem] w-full overflow-hidden rounded-lg border"
const provider = "min-h-0 h-full"
const contained = "absolute h-full"

function SidebarState() {
  const { state, open, isMobile, openMobile, toggleSidebar } = useSidebar()
  return (
    <div className="flex flex-col gap-3 text-sm">
      <p className="text-muted-foreground">
        State: {state}, open: {String(isMobile ? openMobile : open)}, mobile:{" "}
        {String(isMobile)}. Below 768 px the sidebar opens as a sheet.
      </p>
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={toggleSidebar}
      >
        Toggle with useSidebar
      </Button>
    </div>
  )
}

function IconSidebar() {
  return (
    <Sidebar collapsible="icon" className={contained}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Fulldev">
              <span className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                F
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-medium">Fulldev</span>
                <span className="text-xs text-muted-foreground">Website</span>
              </span>
              <ChevronsUpDownIcon className="ms-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarInput aria-label="Search the sidebar" placeholder="Search" />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.active}
                    tooltip={item.title}
                    render={<a href={href} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupAction title="Add page" aria-label="Add page">
            <PlusIcon />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Pages">
                  <FileTextIcon />
                  <span>All pages</span>
                </SidebarMenuButton>
                <SidebarMenuAction showOnHover aria-label="More page actions">
                  <MoreHorizontalIcon />
                </SidebarMenuAction>
                <SidebarMenuSub>
                  {pages.map((page, index) => (
                    <SidebarMenuSubItem key={page}>
                      <SidebarMenuSubButton href={href} isActive={index === 0}>
                        <span>{page}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href={href} size="sm">
                      <span>Archived</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton variant="outline" size="sm" tooltip="Help">
              <span>Help and support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function LoadingSidebar() {
  return (
    <Sidebar side="right" variant="floating" className={contained}>
      <SidebarHeader>
        <SidebarGroupLabel render={<h3 />}>Recent projects</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu aria-busy="true">
            {Array.from({ length: 5 }, (_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton showIcon={index % 2 === 0} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

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

export default function Demo() {
  const [open, setOpen] = React.useState(true)
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Collapsible to icons, with groups, actions, badges and sub menus">
        <div className={frame}>
          <SidebarProvider className={provider}>
            <IconSidebar />
            <SidebarInset className="gap-4 p-4">
              <header className="flex items-center gap-2">
                <SidebarTrigger />
                <span className="text-sm font-medium">Dashboard</span>
              </header>
              <SidebarState />
            </SidebarInset>
          </SidebarProvider>
        </div>
      </Example>
      <Example title="Floating on the right, controlled, with loading skeletons">
        <div className={frame}>
          <SidebarProvider
            className={provider}
            open={open}
            onOpenChange={setOpen}
          >
            <SidebarInset className="gap-4 p-4">
              <header className="flex items-center gap-2">
                <span className="me-auto text-sm font-medium">Projects</span>
                <SidebarTrigger />
              </header>
              <p className="text-sm text-muted-foreground">
                Controlled open state: {String(open)}
              </p>
            </SidebarInset>
            <LoadingSidebar />
          </SidebarProvider>
        </div>
      </Example>
    </div>
  )
}
