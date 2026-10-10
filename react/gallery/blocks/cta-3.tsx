import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Cta3 } from "@/components/blocks/cta-3"

const placeholderImage = placeholder.src

export default function Cta3Demo() {
  return (
    <>
      <Cta3
        title="Build one block language for docs and marketing"
        description="This spread CTA is useful at the end of feature sections or product comparisons where the surface should feel contained yet spacious."
        buttons={[
          { label: "Use Section", href: "/components/section/" },
          { label: "Inspect Card", href: "/components/card/" },
        ]}
        socialProof={{
          avatars: [
            { image: placeholderImage, initials: "SV" },
            { image: placeholderImage, initials: "JD" },
            { image: placeholderImage, initials: "MK" },
            { image: placeholderImage, initials: "AR" },
          ],
          rating: 4.8,
          ratingLabel: "Rated 4.8 out of 5",
          text: "Example: 4.8 from 120 reviews",
        }}
      />
    </>
  )
}
