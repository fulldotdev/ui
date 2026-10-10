import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Products5 } from "@/components/blocks/products-5"

const placeholderImage = placeholder.src

export default function Products5Demo() {
  return (
    <>
      <Products5
        badge="Featured"
        title="Image-centric product grid with hover effects"
        buttons={[{ label: "Featured product", href: "/blocks/product/" }]}
        products={[
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            title: "Landing page kit",
            description:
              "Tall product cards with hover zoom, ideal for visual product showcases.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            title: "Docs launch kit",
            description:
              "Tall product cards with hover zoom, ideal for visual product showcases.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            title: "Section starter pack",
            description:
              "Tall product cards with hover zoom, ideal for visual product showcases.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            title: "Conversion toolkit",
            description:
              "Tall product cards with hover zoom, ideal for visual product showcases.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
        ]}
      />
    </>
  )
}
