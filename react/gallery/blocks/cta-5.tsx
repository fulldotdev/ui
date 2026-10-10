import { Cta5 } from "@/components/blocks/cta-5"

export default function Cta5Demo() {
  return (
    <>
      <Cta5
        title="A CTA with supporting proof points"
        description="Great for pages that need a little more reassurance before the final decision. The checklist reinforces the value proposition."
        features={[
          "Reusable hero sections",
          "Editorial article layouts",
          "Contact and pricing flows",
        ]}
        buttons={[
          { label: "Read the docs", href: "/docs/" },
          { label: "Feature examples", href: "/blocks/features/" },
        ]}
      />
    </>
  )
}
