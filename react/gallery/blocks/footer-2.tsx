import { Footer2 } from "@/components/blocks/footer-2"

export default function Footer2Demo() {
  return (
    <>
      <Footer2
        brandName="Fulldev UI"
        brandHref="/"
        description="Beautiful React components built with Tailwind CSS. Open source and ready to use."
        links={[
          { label: "Components", href: "/components/" },
          { label: "Blocks", href: "/blocks/" },
          { label: "Docs", href: "/docs/" },
          { label: "GitHub", href: "https://github.com/fulldotdev/ui" },
        ]}
        socials={[
          {
            label: "GitHub",
            href: "https://github.com/fulldotdev/ui",
            icon: "github",
          },
          { label: "Discord", href: "https://discord.gg/", icon: "discord" },
          { label: "X", href: "https://x.com/", icon: "x" },
        ]}
        copyright="© 2026 fulldev/ui"
        navigationLabel="Footer 2 navigation"
      />
    </>
  )
}
