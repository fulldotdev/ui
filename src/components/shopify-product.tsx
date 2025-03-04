import React from "react"
import { cartTotalQuantity } from "@/stores/shopify"
import {
  AddToCartButton,
  CartProvider,
  ProductPrice,
  ProductProvider,
  ShopifyProvider,
  useCart,
  useProduct,
} from "@shopify/hydrogen-react"
import type { Product } from "@shopify/hydrogen-react/storefront-api-types"

import { buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  id: Product["id"]
  variants: Product["variants"]
}

function ShopifyProduct(product: Props) {
  return (
    <ShopifyProvider
      countryIsoCode="NL"
      languageIsoCode="NL"
      storefrontApiVersion="2025-01"
      storeDomain="https://padelracketwinkel.myshopify.com"
      storefrontToken="5817d7fdddda0c1fa13f131de5d91794"
    >
      <CartProvider>
        <ProductProvider data={product}>
          <ShopifyProductContent />
        </ProductProvider>
      </CartProvider>
    </ShopifyProvider>
  )
}

function ShopifyProductContent() {
  const { product, options, setSelectedOption, selectedVariant } = useProduct()
  const { totalQuantity } = useCart()

  // Update global quantity state, because components may be on different islands
  React.useEffect(() => {
    cartTotalQuantity.set(totalQuantity)
  }, [totalQuantity])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {options?.map((option) => (
          <Select
            key={option?.name}
            name={option?.name}
            defaultValue={option?.values?.[0]}
            onValueChange={(value) =>
              setSelectedOption(option?.name ?? "", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {option?.values?.map((value) => (
                <SelectItem key={value} value={value ?? ""}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>
      {product && (
        <ProductPrice data={product} variantId={selectedVariant?.id} />
      )}
      <AddToCartButton
        className={buttonVariants({ size: "lg" })}
        variantId={selectedVariant?.id}
        quantity={1}
      >
        In winkelwagen
      </AddToCartButton>
    </div>
  )
}

export { ShopifyProduct }
