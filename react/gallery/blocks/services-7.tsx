import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Services7 } from "@/components/blocks/services-7"

const placeholderImage = placeholder.src

export default function Services7Demo() {
  return (
    <>
      <Services7
        badge="High-touch offer"
        title="A featured layout where the first service takes center stage"
        description="This layout uses a larger featured card alongside smaller cards for a hierarchy-driven grid."
        buttons={[
          { label: "Start conversation", href: "#" },
          { label: "Read reviews", href: "#" },
        ]}
        services={[
          {
            image: { src: placeholderImage, alt: "" },
            label: "Featured",
            title: "Brand strategy & identity",
            description:
              "A comprehensive service that covers positioning, visual identity, and brand guidelines for teams scaling fast.",
            href: "/blocks/",
          },
          {
            image: { src: placeholderImage, alt: "" },
            label: "Core",
            title: "Design systems",
            description:
              "Component libraries and tokens built for production scale.",
            href: "/components/",
          },
          {
            image: { src: placeholderImage, alt: "" },
            label: "Core",
            title: "Front-end development",
            description:
              "Production-ready code from responsive layouts to interactions.",
            href: "/docs/installation/",
          },
        ]}
        linkLabel="Learn more"
      />
    </>
  )
}
