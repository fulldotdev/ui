import { Products2 } from "@/components/blocks/products-2"

export default function Products2Demo() {
  return (
    <>
      <Products2
        badge="Collection"
        title="A compact list layout for product overviews"
        products={[
          {
            title: "Marketing pages",
            description:
              "Describe the collection first, then let subpages or product cards handle the deeper details.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
          {
            title: "Documentation templates",
            description:
              "Describe the collection first, then let subpages or product cards handle the deeper details.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
          {
            title: "Conversion flows",
            description:
              "Describe the collection first, then let subpages or product cards handle the deeper details.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
          {
            title: "Onboarding bundle",
            description:
              "Describe the collection first, then let subpages or product cards handle the deeper details.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
        ]}
      />
    </>
  )
}
