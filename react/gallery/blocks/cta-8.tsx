import { Cta8 } from "@/components/blocks/cta-8"

export default function Cta8Demo() {
  return (
    <>
      <Cta8
        title="Choose a CTA pattern that matches the weight of the decision"
        description="Some pages need a bold final section. Others only need a quiet nudge. This minimal version with a subtle glow works for the latter."
        buttons={[
          { label: "Hero variants", href: "/blocks/hero/" },
          { label: "Pricing variants", href: "/blocks/pricing/" },
        ]}
      />
    </>
  )
}
