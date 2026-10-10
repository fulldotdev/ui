import { Links2 } from "@/components/blocks/links-2"

export default function Links2Demo() {
  return (
    <>
      <Links2
        title="Explore the component library"
        description="A grid of related links with a short description for each destination."
        links={[
          {
            href: "/components/section/",
            title: "Section",
            description: "Structure page sections with consistent spacing.",
          },
          {
            href: "/components/card/",
            title: "Card",
            description: "Group related content and actions.",
          },
          {
            href: "/components/accordion/",
            title: "Accordion",
            description: "Collapse secondary content into stacked panels.",
          },
          {
            href: "/components/tabs/",
            title: "Tabs",
            description: "Switch between related panels of content.",
          },
        ]}
      />
    </>
  )
}
