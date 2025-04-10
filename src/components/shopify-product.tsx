import React from "react"
import config from "@/data/config.json"
import { cartTotalQuantity } from "@/stores/shopify"
import {
  AddToCartButton,
  CartLineProvider,
  CartLineQuantity,
  CartLineQuantityAdjustButton,
  CartProvider,
  Money,
  ProductPrice,
  ProductProvider,
  ShopifyProvider,
  useCart,
  useCartLine,
  useProduct,
  type CartWithActions,
} from "@shopify/hydrogen-react"
import type {
  Cart,
  CartLine,
  Product,
} from "@shopify/hydrogen-react/storefront-api-types"
import { Loader2, Minus, Plus, ShoppingBag, Trash } from "lucide-react"

import { hasShopify } from "@/lib/has-shopify"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NumberInput } from "@/components/number-input"
import { ShopifyLineUpdate } from "@/components/shopify-line-update"

interface Props {
  id: Product["id"]
  variants: Product["variants"]
}

function ShopifyProduct(product: Props) {
  return (
    hasShopify() && (
      <ShopifyProvider
        countryIsoCode="NL"
        languageIsoCode="NL"
        storefrontApiVersion="2025-01"
        storeDomain={config.shopify.storeDomain}
        storefrontToken={config.shopify.publicAccessToken}
      >
        <CartProvider>
          <ProductProvider data={product}>
            <ShopifyProductContent />
          </ProductProvider>
        </CartProvider>
      </ShopifyProvider>
    )
  )
}

function ShopifyProductContent() {
  const { product, options, setSelectedOption, selectedVariant } = useProduct()
  const { totalQuantity, lines } = useCart() as CartWithActions & Cart // Manual type according to docs. It works but types were incorrect.

  const currentLine = lines.find(
    (line) => line.merchandise.id === selectedVariant?.id
  )
  // Update global quantity state, because components may be on different islands
  React.useEffect(() => {
    cartTotalQuantity.set(totalQuantity)
  }, [totalQuantity])

  return (
    <div className="flex flex-col gap-2">
      {options?.map((option) =>
        option?.values.length > 1 ? (
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
        ) : null
      )}

      {product && selectedVariant?.id && (
        <ProductPrice
          priceType="regular"
          valueType="max"
          className="my-2 text-xl font-semibold first:mt-0"
          data={product}
          variantId={selectedVariant?.id}
        >
          price
        </ProductPrice>
      )}
      {currentLine ? (
        <CartLineProvider key={currentLine.id} line={currentLine}>
          <ShopifyLineUpdate size="lg" />
        </CartLineProvider>
      ) : (
        <AddToCartButton
          className={cn(buttonVariants({ size: "lg" }), "group w-full")}
          variantId={selectedVariant?.id}
          quantity={1}
        >
          <Loader2 className="hidden animate-spin group-disabled:block" />
          <ShoppingBag className="group-disabled:hidden" />
          <span className="group-disabled:hidden">In winkelwagen</span>
        </AddToCartButton>
      )}
    </div>
  )
}

export { ShopifyProduct }
