import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero9 } from "@/components/blocks/hero-9"

const placeholderImage = placeholder.src

export default function Hero9Demo() {
  return (
    <>
      <Hero9
        title="Content over a masked background image"
        description="A split hero where text and features sit on the left, with a background image fading in from the right using a gradient mask."
        features={[
          "Background image with gradient mask",
          "Content stays fully readable",
          "Works in both light and dark mode",
          "Ideal for atmospheric pages",
        ]}
        buttons={[
          { label: "Explore", href: "/docs/" },
          { label: "View source", href: "#" },
        ]}
        socialProof={{
          avatars: [
            { image: placeholderImage, initials: "AM" },
            { image: placeholderImage, initials: "KL" },
            { image: placeholderImage, initials: "SV" },
          ],
          rating: 4.8,
          ratingLabel: "Rated 4.8 out of 5",
          text: "Example: 4.8 from 120 reviews",
        }}
        image={{ src: placeholderImage }}
      />
    </>
  )
}
