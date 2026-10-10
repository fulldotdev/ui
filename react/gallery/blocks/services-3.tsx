import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Services3 } from "@/components/blocks/services-3"

const placeholderImage = placeholder.src

export default function Services3Demo() {
  return (
    <>
      <Services3
        badge="Consulting"
        title="Bold image overlays for when positioning matters"
        description="This style is useful for advisory or studio work where the offer should feel premium and deliberate."
        buttons={[
          { label: "Start a project", href: "#" },
          { label: "View case studies", href: "#" },
        ]}
        services={[
          {
            image: { src: placeholderImage, alt: "" },
            title: "Strategy workshops",
            description:
              "Guide teams through product discovery and service definition with structured facilitation.",
            button: { label: "Learn more", href: "#" },
          },
          {
            image: { src: placeholderImage, alt: "" },
            title: "Component audits",
            description:
              "Review existing design systems and recommend improvements for consistency and scale.",
            button: { label: "Learn more", href: "#" },
          },
          {
            image: { src: placeholderImage, alt: "" },
            title: "Section implementation",
            description:
              "Translate designs into production-ready, responsive section layouts.",
            button: { label: "Learn more", href: "#" },
          },
          {
            image: { src: placeholderImage, alt: "" },
            title: "Launch support",
            description:
              "Dedicated hands-on support for shipping day and the critical first week.",
            button: { label: "Learn more", href: "#" },
          },
        ]}
      />
    </>
  )
}
