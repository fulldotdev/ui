import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Cta4 } from "@/components/blocks/cta-4"

const placeholderImage = placeholder.src

export default function Cta4Demo() {
  return (
    <>
      <Cta4
        title="Move from isolated examples to reusable page sections"
        description="A background-image CTA helps the final section feel like a real destination instead of just another block in the stack."
        buttons={[
          { label: "Explore blocks", href: "/blocks/" },
          { label: "Button API", href: "/components/button/" },
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
