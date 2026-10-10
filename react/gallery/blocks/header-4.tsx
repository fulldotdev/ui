import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Header4 } from "@/components/blocks/header-4"

const placeholderImage = placeholder.src

export default function Header4Demo() {
  return (
    <>
      <Header4
        logo={{
          label: "Acme Inc",
          href: "/",
        }}
        navigation={[
          {
            label: "Products",
            href: "#",
            description:
              "Plan, launch, and measure product work from one place.",
            image: { src: placeholderImage },
            links: [
              {
                label: "Analytics",
                href: "#",
                description: "Track funnels, cohorts, and conversion paths.",
                icon: "chart-no-axes-column",
              },
              {
                label: "Automation",
                href: "#",
                description:
                  "Trigger workflows from product and customer events.",
                icon: "workflow",
              },
              {
                label: "Integrations",
                href: "#",
                description: "Connect the tools your team already uses.",
                icon: "plug",
              },
            ],
          },
          {
            label: "Solutions",
            href: "#",
            description: "Focused workflows for teams that need more context.",
            links: [
              {
                label: "Marketing",
                href: "#",
                description:
                  "Launch campaigns with shared assets and reporting.",
                icon: "megaphone",
              },
              {
                label: "Operations",
                href: "#",
                description:
                  "Coordinate approvals, handoffs, and recurring work.",
                icon: "settings-2",
              },
            ],
          },
          { label: "Pricing", href: "#" },
          { label: "Customers", href: "#" },
        ]}
        buttons={[
          { label: "Sign in", href: "#" },
          { label: "Start trial", href: "#" },
        ]}
        navigationLabel="Header 4 navigation"
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
