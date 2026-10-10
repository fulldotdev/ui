import { Content4 } from "@/components/blocks/content-4"

export default function Content4Demo() {
  return (
    <>
      <Content4
        title="See the difference in every detail"
        description="A 1:2 split layout with a smaller text column on the left and a larger image on the right. Use it for feature highlights where the visual should dominate."
        features={[
          "Compact text column with checklist",
          "Larger image area for visual emphasis",
          "Asymmetric grid for visual hierarchy",
        ]}
        buttons={[
          { label: "Get started", href: "#" },
          { label: "Learn more", href: "#" },
        ]}
      />
    </>
  )
}
