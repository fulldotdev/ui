import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Logo from "@/components/elements/logo"

const data = {
  menus: [
    {
      text: "Content",
      links: [
        {
          text: "Pages",
          href: "/cms/pages/",
        },
        {
          text: "Layouts",
          href: "/cms/layouts/",
        },
      ],
    },
  ],
}

interface Props {
  site?: string
  currentPath: string
  children?: React.ReactNode
  menus?: {
    text: string
    links: {
      text: string
      href: string
    }[]
  }[]
}

export default function CmsLayout({
  children,
  site,
  currentPath = "",
  menus = data.menus,
}: Props) {
  const breadcrumbItems = currentPath
    .split("/")
    .filter((item) => item !== "" && item !== "cms")
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="h-16 justify-center">
          <Logo className="px-2" title={site} />
        </SidebarHeader>
        <SidebarContent>
          {menus.map((item) => (
            <SidebarGroup key={item.text}>
              <SidebarGroupLabel>{item.text}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.links.map((item) => (
                    <SidebarMenuItem key={item.text}>
                      <SidebarMenuButton asChild>
                        <a href={item.href}>{item.text}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, i) => (
                <>
                  <BreadcrumbItem key={item}>
                    {i === breadcrumbItems.length - 1 ? (
                      <BreadcrumbPage>{item}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={`/cms/${breadcrumbItems.slice(0, i + 1).join("/")}/`}
                      >
                        {item}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {i < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="mx-auto flex w-full max-w-screen-md flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
