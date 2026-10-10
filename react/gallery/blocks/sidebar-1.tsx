import { Sidebar1 } from "@/components/blocks/sidebar-1"

export default function Sidebar1Demo() {
  return (
    <Sidebar1
      currentPath="/components/button/"
      logo={{ label: "Fulldev UI", href: "/" }}
      search={{
        label: "Search documentation...",
        empty: "No results found.",
        items: [
          {
            label: "Installation",
            href: "/docs/installation/",
            title: "Installation",
            path: "/docs/installation/",
            description: "Set up Fulldev UI in a project.",
            group: "Docs",
          },
          {
            label: "Button",
            href: "/components/button/",
            title: "Button",
            path: "/components/button/",
            description: "Displays a button.",
            group: "Components",
          },
          {
            label: "Hero",
            href: "/blocks/hero/",
            title: "Hero",
            path: "/blocks/hero/",
            description: "Hero sections.",
            group: "Blocks",
          },
        ],
      }}
      breadcrumb={{
        items: [
          { label: "Home", href: "/" },
          { label: "Components", href: "/components/" },
          { label: "Button", href: "/components/button/" },
        ],
        menu: [
          { label: "Docs", href: "/docs/" },
          { label: "Components", href: "/components/" },
          { label: "Blocks", href: "/blocks/" },
        ],
      }}
      navigation={[
        {
          label: "Getting started",
          href: "/docs/",
          links: [
            { label: "Introduction", href: "/docs/" },
            { label: "Installation", href: "/docs/installation/" },
          ],
        },
        {
          label: "Components",
          href: "/components/",
          links: [
            { label: "Badge", href: "/components/badge/" },
            { label: "Button", href: "/components/button/" },
            { label: "Card", href: "/components/card/" },
          ],
        },
      ]}
      githubRepo="fulldotdev/ui"
      labels={{
        sidebar: "Documentation",
        github: "View fulldotdev/ui on GitHub",
        stars: "Stars",
        breadcrumb: "Breadcrumb",
        breadcrumbMenu: "Toggle menu",
        sidebarToggle: "Toggle Sidebar",
        mobileTitle: "Documentation",
        mobileDescription: "Pages of the documentation.",
        theme: "Toggle theme",
        shortcut: { mac: "⌘ + K", other: "Ctrl + K" },
      }}
    >
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-2xl font-semibold">Button</h1>
        <p className="text-muted-foreground">
          The page content goes here, inside the sidebar inset.
        </p>
      </div>
    </Sidebar1>
  )
}
