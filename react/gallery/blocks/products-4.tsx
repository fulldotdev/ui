import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Products4 } from "@/components/blocks/products-4"

const placeholderImage = placeholder.src

export default function Products4Demo() {
  return (
    <>
      <Products4
        title="A product row with room for a collection-wide action"
        description="Each card can link to a deeper product page or serve as a compact collection overview."
        buttons={[
          { label: "View all products", href: "/blocks/product/" },
          { label: "Compare plans", href: "/blocks/pricing/" },
        ]}
        products={[
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            title: "Launch page bundle",
            description:
              "Each card can link to a deeper product page or serve as a compact collection overview.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            title: "Editorial bundle",
            description:
              "Each card can link to a deeper product page or serve as a compact collection overview.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
          {
            image: {
              src: placeholderImage,
              alt: "",
            },
            title: "Onboarding bundle",
            description:
              "Each card can link to a deeper product page or serve as a compact collection overview.",
            price: { value: 100, currency: "USD", unit: "month" },
          },
        ]}
      />
    </>
  )
}
