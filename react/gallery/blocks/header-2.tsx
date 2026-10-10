import { Header2 } from "@/components/blocks/header-2"

export default function Header2Demo() {
  return (
    <>
      <Header2
        logo={{
          label: "Acme Inc",
          href: "/",
        }}
        navigation={[
          { label: "Products", href: "#" },
          { label: "Solutions", href: "#" },
          { label: "Pricing", href: "#" },
          { label: "Blog", href: "#" },
        ]}
        buttons={[
          { label: "Sign in", href: "#" },
          { label: "Get started", href: "#" },
        ]}
        navigationLabel="Header 2 navigation"
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
