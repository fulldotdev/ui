import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Hero10 } from "@/components/blocks/hero-10"

const placeholderImage = placeholder.src

export default function Hero10Demo() {
  return (
    <>
      <Hero10
        title="A full-bleed background image hero with overlaid content"
        description="Content and actions spread across the top, with a full background image visible underneath through gradient masks."
        buttons={[
          { label: "Start free", href: "/docs/" },
          { label: "Book a demo", href: "#" },
        ]}
        socialProof={{
          avatars: [
            { image: placeholderImage, initials: "FD" },
            { image: placeholderImage, initials: "AV" },
            { image: placeholderImage, initials: "UI" },
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
