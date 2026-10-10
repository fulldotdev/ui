import { Features1 } from "@/components/blocks/features-1"

export default function Features1Demo() {
  return (
    <>
      <Features1
        title="Everything you need to build faster"
        description="A complete set of tools designed to streamline your workflow and help your team ship with confidence."
        buttons={[
          { label: "Get started", href: "#" },
          { label: "Learn more", href: "#" },
        ]}
        features={[
          {
            icon: "zap",
            title: "Lightning fast",
            description:
              "Optimized for speed at every layer. Pages load instantly and interactions feel native.",
            link: { label: "Learn more", href: "/docs/" },
          },
          {
            icon: "layers",
            title: "Composable sections",
            description:
              "Build pages from pre-designed sections that snap together and stay consistent.",
            link: { label: "View sections", href: "/blocks/" },
          },
          {
            icon: "palette",
            title: "Token-driven theming",
            description:
              "Swap color palettes, typography, and spacing through a single token file.",
            link: { label: "Explore themes", href: "/components/" },
          },
          {
            icon: "code",
            title: "Developer friendly",
            description:
              "Clean APIs, typed props, and predictable patterns that scale with your codebase.",
            link: { label: "Read the docs", href: "/docs/installation/" },
          },
        ]}
      />
    </>
  )
}
