import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero13 } from "@/components/blocks/hero-13"

const placeholderImage = placeholder.src

export default function Hero13Demo() {
  return (
    <>
      <Hero13
        title="Small text, large image"
        description="A 1:3 split where the content stays compact on the left and the image takes the dominant position on the right."
        buttons={[{ label: "View products", href: "/blocks/products/" }]}
        image={{ src: placeholderImage, alt: "" }}
      />
    </>
  )
}
