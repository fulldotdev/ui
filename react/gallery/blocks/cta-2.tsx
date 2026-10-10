import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Cta2 } from "@/components/blocks/cta-2"

const placeholderImage = placeholder.src

export default function Cta2Demo() {
  return (
    <>
      <Cta2
        title="Turn your component inventory into complete pages"
        description="A split CTA works well when the message needs a little more narrative and the actions should stay visually distinct."
        buttons={[
          { label: "See block library", href: "/blocks/" },
          { label: "Install primitives", href: "/docs/installation/" },
        ]}
        socialProof={{
          avatars: [
            { image: placeholderImage, initials: "SV" },
            { image: placeholderImage, initials: "JD" },
            { image: placeholderImage, initials: "MK" },
          ],
          rating: 4.8,
          ratingLabel: "Rated 4.8 out of 5",
          text: "Example: 4.8 from 120 reviews",
        }}
      />
    </>
  )
}
