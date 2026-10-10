import { Products3 } from "@/components/blocks/products-3"

export default function Products3Demo() {
  return (
    <>
      <Products3
        badge="Pricing"
        title="Minimal cards with prominent pricing"
        products={[
          {
            title: "Hero set",
            description:
              "Use compact cards when the products are really grouped content patterns.",
            price: { value: 49, currency: "USD" },
          },
          {
            title: "Article set",
            description:
              "Use compact cards when the products are really grouped content patterns.",
            price: { value: 79, currency: "USD" },
          },
          {
            title: "Pricing set",
            description:
              "Use compact cards when the products are really grouped content patterns.",
            price: { value: 99, currency: "USD" },
          },
        ]}
      />
    </>
  )
}
