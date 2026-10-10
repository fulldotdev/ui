import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Cta6 } from "@/components/blocks/cta-6"

const placeholderImage = placeholder.src

export default function Cta6Demo() {
  return (
    <>
      <Cta6
        title="A reversed layout for visual variety"
        description="Use this version when the page needs a different rhythm. The image leads, giving the text a supporting role."
        buttons={[
          { label: "Browse blocks", href: "/blocks/" },
          { label: "Component docs", href: "/components/" },
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
