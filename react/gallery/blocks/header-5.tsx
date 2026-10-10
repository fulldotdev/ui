import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Header5 } from "@/components/blocks/header-5"

const placeholderImage = placeholder.src

export default function Header5Demo() {
  return (
    <>
      <Header5
        logo={{
          label: "Northstar",
          href: "/",
        }}
        navigation={[
          {
            label: "Platform",
            href: "#",
            description:
              "A shared workspace for strategy, delivery, and insight.",
            image: { src: placeholderImage },
            links: [
              {
                label: "Roadmaps",
                href: "#",
                description: "Sequence initiatives and communicate priorities.",
                icon: "map",
              },
              {
                label: "Dashboards",
                href: "#",
                description: "Keep performance, adoption, and risk visible.",
                icon: "layout-dashboard",
              },
              {
                label: "AI briefs",
                href: "#",
                description: "Summarize research, feedback, and meeting notes.",
                icon: "sparkles",
              },
              {
                label: "Permissions",
                href: "#",
                description: "Control access for teams, clients, and partners.",
                icon: "shield-check",
              },
            ],
          },
          {
            label: "Resources",
            href: "#",
            description: "Guides and references for better operating cadence.",
            links: [
              {
                label: "Playbooks",
                href: "#",
                description: "Reusable operating patterns for product teams.",
                icon: "book-open",
              },
              {
                label: "Templates",
                href: "#",
                description:
                  "Kickstart planning, reporting, and retrospectives.",
                icon: "copy-check",
              },
            ],
          },
          { label: "Enterprise", href: "#" },
          { label: "Pricing", href: "#" },
        ]}
        buttons={[
          { label: "Contact sales", href: "#" },
          { label: "Get started", href: "#" },
        ]}
        navigationLabel="Header 5 navigation"
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
