import { Services5 } from "@/components/blocks/services-5"

export default function Services5Demo() {
  return (
    <>
      <Services5
        badge="Specialties"
        title="Icon-based cards for a quick service overview"
        description="Use this layout when the service list is concise and each entry benefits from a visual anchor rather than an image."
        services={[
          {
            icon: "search",
            title: "Documentation systems",
            description:
              "Pair concise cards with a broader framing message. Structure content for discoverability and maintainability.",
            link: { label: "About documentation systems", href: "/docs/" },
          },
          {
            icon: "pencil-ruler",
            title: "Launch pages",
            description:
              "Pair concise cards with a broader framing message. Design high-converting pages that ship on schedule.",
            link: { label: "About launch pages", href: "/blocks/" },
          },
          {
            icon: "code",
            title: "Editorial redesigns",
            description:
              "Pair concise cards with a broader framing message. Modernize editorial layouts without disrupting the content pipeline.",
            link: {
              label: "About editorial redesigns",
              href: "/components/",
            },
          },
          {
            icon: "rocket",
            title: "Platform migration",
            description:
              "Pair concise cards with a broader framing message. Move between platforms without losing content or momentum.",
            link: {
              label: "About platform migration",
              href: "/docs/installation/",
            },
          },
        ]}
      />
    </>
  )
}
