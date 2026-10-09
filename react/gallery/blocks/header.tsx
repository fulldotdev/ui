import * as React from "react"

import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Header1 } from "@/components/blocks/header-1"
import { Header2 } from "@/components/blocks/header-2"
import { Header3 } from "@/components/blocks/header-3"
import { Header4 } from "@/components/blocks/header-4"
import { Header5 } from "@/components/blocks/header-5"

const placeholderImage = placeholder.src

const demos: Record<string, React.ComponentType> = {
  "header-1": () => {
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
  },
  "header-2": () => {
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
  },
  "header-3": () => {
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
  },
  "header-4": () => {
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
              description:
                "Focused workflows for teams that need more context.",
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
  },
  "header-5": () => {
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
                  description:
                    "Sequence initiatives and communicate priorities.",
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
                  description:
                    "Summarize research, feedback, and meeting notes.",
                  icon: "sparkles",
                },
                {
                  label: "Permissions",
                  href: "#",
                  description:
                    "Control access for teams, clients, and partners.",
                  icon: "shield-check",
                },
              ],
            },
            {
              label: "Resources",
              href: "#",
              description:
                "Guides and references for better operating cadence.",
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
  },
}

export default demos
