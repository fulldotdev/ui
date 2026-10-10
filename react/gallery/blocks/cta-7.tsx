import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Cta7 } from "@/components/blocks/cta-7"

const placeholderImage = placeholder.src

export default function Cta7Demo() {
  return (
    <>
      <Cta7
        title="Create launch sections everyone can reuse"
        description="This centered CTA with a tinted background works when the section needs to feel distinct from the surrounding content without being too bold."
        buttons={[
          { label: "Layout docs", href: "/components/layout/" },
          { label: "Sidebar docs", href: "/components/sidebar/" },
        ]}
        socialProof={{
          avatars: [
            { image: placeholderImage, initials: "SV" },
            { image: placeholderImage, initials: "JD" },
            { image: placeholderImage, initials: "MK" },
            { image: placeholderImage, initials: "AR" },
          ],
          count: "+120",
          text: "Example: join 120 customers",
        }}
      />
    </>
  )
}
