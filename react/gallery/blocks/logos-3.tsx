import { Logos3 } from "@/components/blocks/logos-3"

export default function Logos3Demo() {
  return (
    <>
      <Logos3
        brands={[
          { name: "Verve" },
          { name: "Northwind" },
          { name: "Studio 9" },
          { name: "Pioneer" },
          { name: "Pace" },
        ]}
      />
    </>
  )
}
