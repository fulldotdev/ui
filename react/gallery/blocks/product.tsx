import * as React from "react"

import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Product1 } from "@/components/blocks/product-1"

const placeholderImage = placeholder.src

const demos: Record<string, React.ComponentType> = {
  "product-1": () => {
    return (
      <>
        <Product1
          badge="Featured product"
          title="One focused product section for a flagship offer"
          description="The product family only needs one strong section when the page should quickly explain the offer, its price, and the next action."
          image={{
            src: placeholderImage,
            alt: "",
          }}
          price={{
            value: 129,
            currency: "USD",
            unit: "month",
          }}
          note="Includes reusable launch sections, content layouts, and shared visual rules for docs and marketing pages."
          buttons={[
            { label: "Pricing", href: "/blocks/pricing/" },
            { label: "Reviews", href: "/blocks/reviews/" },
          ]}
        />
      </>
    )
  },
}

export default demos
