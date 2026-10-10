import { Features4 } from "@/components/blocks/features-4"

export default function Features4Demo() {
  return (
    <>
      <Features4
        title="Why teams choose our platform"
        description="A sticky sidebar layout that keeps your headline visible while users explore feature cards at their own pace."
        buttons={[
          { label: "Get started", href: "#" },
          { label: "View docs", href: "#" },
        ]}
        features={[
          {
            icon: "layers",
            title: "Composable architecture",
            description:
              "Build pages from pre-designed sections that snap together. Mix and match hero, features, pricing, and CTA blocks.",
            link: { label: "Learn more", href: "/docs/" },
          },
          {
            icon: "shield",
            title: "Type-safe props",
            description:
              "Every component ships with TypeScript interfaces so your editor catches mistakes before the browser does.",
            link: { label: "See examples", href: "/blocks/" },
          },
          {
            icon: "rocket",
            title: "Zero JS by default",
            description:
              "Server-rendered React components mean no client bundle. Add interactivity only where you need it.",
            link: { label: "Read the docs", href: "/components/" },
          },
          {
            icon: "code",
            title: "Fulldev powered",
            description:
              "Install individual components through the shadcn CLI and the @fulldev registry. No monolithic dependency to manage.",
            link: { label: "Browse components", href: "/docs/installation/" },
          },
        ]}
      />
    </>
  )
}
