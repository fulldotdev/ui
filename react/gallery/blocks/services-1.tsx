import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Services1 } from "@/components/blocks/services-1"

const placeholderImage = placeholder.src

export default function Services1Demo() {
  return (
    <>
      <Services1
        badge="What we do"
        title="A simple services section for agencies and internal platform teams"
        buttons={[{ label: "View all services", href: "#" }]}
        services={[
          {
            image: { src: placeholderImage, alt: "" },
            label: "Strategy",
            title: "Page strategy",
            description:
              "Describe the service in one or two sentences and let the next section handle process or case studies.",
            href: "/blocks/",
          },
          {
            image: { src: placeholderImage, alt: "" },
            label: "Development",
            title: "Section implementation",
            description:
              "Describe the service in one or two sentences and let the next section handle process or case studies.",
            href: "/components/",
          },
          {
            image: { src: placeholderImage, alt: "" },
            label: "Design",
            title: "Design system tuning",
            description:
              "Describe the service in one or two sentences and let the next section handle process or case studies.",
            href: "/docs/installation/",
          },
          {
            image: { src: placeholderImage, alt: "" },
            label: "Optimization",
            title: "Performance audits",
            description:
              "Describe the service in one or two sentences and let the next section handle process or case studies.",
            href: "/docs/",
          },
        ]}
      />
    </>
  )
}
