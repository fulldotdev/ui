import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Cta1 } from "@/components/blocks/cta-1"

const placeholderImage = placeholder.src

export default function Cta1Demo() {
  return (
    <>
      <Cta1
        title="Give every launch page a decisive close"
        description="Use a centered CTA when the rest of the page already did the explaining and the final section needs one clear invitation."
        buttons={[
          { label: "Start project", href: "/docs/" },
          { label: "Browse components", href: "/components/" },
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
