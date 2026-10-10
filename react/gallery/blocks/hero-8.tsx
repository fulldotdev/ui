import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero8 } from "@/components/blocks/hero-8"

const placeholderImage = placeholder.src

export default function Hero8Demo() {
  return (
    <>
      <Hero8
        title="Let the image do the talking"
        description="Minimal text with maximum image. A 1:3 split where the product screenshot dominates and the message stays compact."
        buttons={[
          { label: "Get started", href: "/docs/" },
          { label: "Learn more", href: "#" },
        ]}
        image={{ src: placeholderImage, alt: "" }}
      />
    </>
  )
}
