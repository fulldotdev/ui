import { Content3 } from "@/components/blocks/content-3"

export default function Content3Demo() {
  return (
    <>
      <Content3
        title="A full-width media section with a spread header"
        description="This variation uses a spread layout with title and description on the left, action buttons on the right, and a prominent full-width image below."
        buttons={[
          { label: "Get started", href: "#" },
          { label: "Learn more", href: "#" },
        ]}
      />
    </>
  )
}
