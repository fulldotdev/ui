import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Services4 } from "@/components/blocks/services-4"

const placeholderImage = placeholder.src

export default function Services4Demo() {
  return (
    <>
      <Services4
        title="Clean cards when each service speaks for itself"
        description="A minimal approach where the image and title do the heavy lifting."
        buttons={[{ label: "Get started", href: "#" }]}
        services={[
          {
            image: { src: placeholderImage, alt: "" },
            title: "Research",
            description:
              "Understand the problem space before designing solutions.",
            link: { label: "About research", href: "/docs/" },
          },
          {
            image: { src: placeholderImage, alt: "" },
            title: "System design",
            description: "Architect scalable systems that grow with your team.",
            link: { label: "About system design", href: "/blocks/" },
          },
          {
            image: { src: placeholderImage, alt: "" },
            title: "Build",
            description:
              "Translate refined designs into production-ready code.",
            link: { label: "About build", href: "/components/" },
          },
          {
            image: { src: placeholderImage, alt: "" },
            title: "Rollout",
            description:
              "Deploy and support the launch across all environments.",
            link: { label: "About rollout", href: "/docs/installation/" },
          },
        ]}
      />
    </>
  )
}
