import { Header3 } from "@/components/blocks/header-3"

export default function Header3Demo() {
  return (
    <>
      <Header3
        logo={{
          label: "Acme Inc",
          href: "/",
        }}
        navigation={[
          { label: "Docs", href: "#" },
          { label: "Components", href: "#" },
          { label: "Blocks", href: "#" },
        ]}
        buttons={[
          {
            label: "GitHub",
            href: "https://github.com/fulldotdev/ui",
            icon: "github",
            target: "_blank",
          },
          { label: "Roadmap", href: "#" },
          { label: "Browse blocks", href: "#" },
        ]}
        navigationLabel="Header 3 navigation"
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
