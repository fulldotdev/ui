import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero2 } from "@/components/blocks/hero-2"

const placeholderImage = placeholder.src

export default function Hero2Demo() {
  return (
    <>
      <Hero2
        title="Social proof above a clear headline"
        description="A hero with social proof at the top (avatars, rating, and a trust line), followed by a clear message and full-width image."
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
        buttons={[
          { label: "Get started", href: "/docs/" },
          { label: "View blocks", href: "/blocks/" },
        ]}
        image={{ src: placeholderImage, alt: "" }}
      />
    </>
  )
}
