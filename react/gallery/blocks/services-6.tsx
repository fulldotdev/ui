import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Services6 } from "@/components/blocks/services-6"

const placeholderImage = placeholder.src

export default function Services6Demo() {
  return (
    <>
      <Services6
        badge="Studio work"
        title="Use a side description with overlay cards when the offer should feel premium"
        description="A sticky sidebar provides context while the service cards scroll into view."
        buttons={[
          { label: "Start a project", href: "#" },
          { label: "View work", href: "#" },
        ]}
        services={[
          {
            image: { src: placeholderImage, alt: "" },
            title: "Strategy workshops",
            description:
              "Guide teams through product discovery and service definition.",
            href: "/blocks/",
          },
          {
            image: { src: placeholderImage, alt: "" },
            title: "Component audits",
            description:
              "Review existing systems and recommend improvements for scale.",
            href: "/components/",
          },
          {
            image: { src: placeholderImage, alt: "" },
            title: "Section implementation",
            description:
              "Translate designs into production-ready section layouts.",
            href: "/docs/installation/",
          },
          {
            image: { src: placeholderImage, alt: "" },
            title: "Launch support",
            description:
              "Hands-on support for shipping day and the first week after.",
            href: "/docs/",
          },
        ]}
      />
    </>
  )
}
