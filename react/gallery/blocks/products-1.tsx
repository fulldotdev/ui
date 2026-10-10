import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Products1 } from "@/components/blocks/products-1"

const placeholderImage = placeholder.src

export default function Products1Demo() {
  return (
    <>
      <Products1
        locale="en-US"
        discountLabel="Save"
        badge="Product grid"
        title="A simple product grid that works well after a features section"
        products={[
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            title: "Landing page kit",
            description:
              "Tight cards are enough when the page already established the main product story.",
            price: {
              value: 80,
              compareAt: 100,
              currency: "USD",
              unit: "month",
            },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            title: "Docs launch kit",
            description:
              "Tight cards are enough when the page already established the main product story.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            title: "Section starter pack",
            description:
              "Tight cards are enough when the page already established the main product story.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            title: "Conversion toolkit",
            description:
              "Tight cards are enough when the page already established the main product story.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
        ]}
      />
    </>
  )
}
