import { Banner1 } from "@/components/blocks/banner-1"

export default function Banner1Demo() {
  return (
    <>
      <Banner1
        title="New block previews are live"
        description="Browse wider, content-first layouts that mirror real sections instead of isolated UI primitives."
        link={{ label: "Learn more", href: "#" }}
        closeLabel="Close"
        storageKey="banner-1"
      />
    </>
  )
}
