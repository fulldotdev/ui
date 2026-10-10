import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero7 } from "@/components/blocks/hero-7"

const placeholderImage = placeholder.src

export default function Hero7Demo() {
  return (
    <>
      <Hero7
        title="A wider image for visual-heavy products"
        description="2:3 split with a larger image area that bleeds to the right edge. Ideal for showcasing dashboards, apps, or creative work."
        features={[
          "Large image area for product screenshots",
          "Content stays readable at all sizes",
          "Image bleeds to the edge on desktop",
        ]}
        buttons={[
          { label: "View demo", href: "#" },
          { label: "Documentation", href: "/docs/" },
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
        image={{ src: placeholderImage, alt: "" }}
      />
    </>
  )
}
