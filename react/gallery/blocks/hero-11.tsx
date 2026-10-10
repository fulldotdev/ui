import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero11 } from "@/components/blocks/hero-11"

const placeholderImage = placeholder.src

export default function Hero11Demo() {
  return (
    <>
      <Hero11
        title="Centered content over a full background image"
        description="Content, buttons, and social proof centered vertically over a full-bleed background image with gradient masks."
        buttons={[
          { label: "Get started", href: "/docs/" },
          { label: "View pricing", href: "#" },
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
