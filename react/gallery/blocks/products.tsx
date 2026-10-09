import * as React from "react"

import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Products1 } from "@/components/blocks/products-1"
import { Products2 } from "@/components/blocks/products-2"
import { Products3 } from "@/components/blocks/products-3"
import { Products4 } from "@/components/blocks/products-4"
import { Products5 } from "@/components/blocks/products-5"

const placeholderImage = placeholder.src

const demos: Record<string, React.ComponentType> = {
  "products-1": () => {
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
  },
  "products-2": () => {
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
  },
  "products-3": () => {
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
  },
  "products-4": () => {
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
  },
  "products-5": () => {
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
  },
}

export default demos
