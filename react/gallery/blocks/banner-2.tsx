import { Banner2 } from "@/components/blocks/banner-2"

export default function Banner2Demo() {
  return (
    <>
      <Banner2
        title="Launching v0.9"
        description="Floating banners work well for launch moments, limited promos, and product announcements."
        buttons={[
          { label: "Get started", href: "#" },
          { label: "Learn more", href: "#" },
        ]}
      />
    </>
  )
}
