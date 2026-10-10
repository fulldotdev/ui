import { Header1 } from "@/components/blocks/header-1"

export default function Header1Demo() {
  return (
    <>
      <Header1
        logo={{
          label: "Fulldev",
          href: "/",
        }}
        navigation={[
          { label: "Docs", href: "#" },
          { label: "Components", href: "#" },
          { label: "Blocks", href: "#", active: true },
          { label: "Pricing", href: "#" },
        ]}
        buttons={[
          {
            label: "GitHub",
            href: "https://github.com/fulldotdev/ui",
            icon: "github",
            target: "_blank",
          },
          { label: "Sign in", href: "#" },
          { label: "Get started", href: "#" },
        ]}
        navigationLabel="Header 1 navigation"
        menu={{
          label: "Open menu",
          title: "Menu",
          description: "Site navigation and actions.",
          closeLabel: "Close",
        }}
      />
    </>
  )
}
