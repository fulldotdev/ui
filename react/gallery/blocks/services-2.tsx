import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Services2 } from "@/components/blocks/services-2"

const placeholderImage = placeholder.src

export default function Services2Demo() {
  return (
    <>
      <Services2
        badge="Our process"
        title="A horizontal layout for when each service needs visual context"
        description="This layout pairs each service with an image, giving clients a clear picture of the deliverable."
        services={[
          {
            image: { src: placeholderImage, alt: "" },
            label: "Step 01",
            title: "Audit & discovery",
            description:
              "A process-led service section is useful when the offer is really a workflow rather than a product bundle.",
            button: { label: "Learn more", href: "#" },
          },
          {
            image: { src: placeholderImage, alt: "" },
            label: "Step 02",
            title: "Refine & prototype",
            description:
              "A process-led service section is useful when the offer is really a workflow rather than a product bundle.",
            button: { label: "Learn more", href: "#" },
          },
          {
            image: { src: placeholderImage, alt: "" },
            label: "Step 03",
            title: "Ship & iterate",
            description:
              "A process-led service section is useful when the offer is really a workflow rather than a product bundle.",
            button: { label: "Learn more", href: "#" },
          },
        ]}
      />
    </>
  )
}
