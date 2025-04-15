import React from "react"
import config from "@/data/config.json"
import { cartTotalQuantity } from "@/stores/shopify"
import { Label } from "@radix-ui/react-label"
import {
  AddToCartButton,
  CartProvider,
  ProductProvider,
  ShopifyProvider,
  useCart,
  useProduct,
  type CartWithActions,
} from "@shopify/hydrogen-react"
import type {
  Cart,
  Product,
} from "@shopify/hydrogen-react/storefront-api-types"
import { Loader2, Minus, Plus, ShoppingBag } from "lucide-react"

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
import { Discount } from "@/components/discount"
import { Price } from "@/components/price"

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
  const { options, setSelectedOption, selectedVariant } = useProduct()
  const { totalQuantity } = useCart() as CartWithActions & Cart
  const [quantity, setQuantity] = React.useState(1)

  const handleQuantityChange = (newValue: number) => {
    const quantity = Math.max(1, newValue)
    setQuantity(quantity)
  }

  // Update global quantity state, because components may be on different islands
  React.useEffect(() => {
    cartTotalQuantity.set(totalQuantity)
  }, [totalQuantity])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <Price
          className="text-muted-foreground mr-3 text-lg line-through"
          amount={Number(selectedVariant?.compareAtPrice?.amount)}
          currency={selectedVariant?.compareAtPrice?.currencyCode}
        />
        <Price
          className="text-foreground mr-4 text-lg"
          amount={Number(selectedVariant?.price?.amount)}
          currency={selectedVariant?.price?.currencyCode}
        />
        <Discount
          before={Number(selectedVariant?.price?.amount)}
          after={Number(selectedVariant?.compareAtPrice?.amount)}
        />
      </div>

      {options?.map((option) => (
        <div className="flex flex-col">
          <Label className="text-muted-foreground pb-1 text-sm">
            {option?.name}
          </Label>
          <Select
            key={option?.name}
            name={option?.name}
            defaultValue={option?.values?.[0]}
            onValueChange={(value) =>
              setSelectedOption(option?.name ?? "", value)
            }
          >
            <SelectTrigger className="w-full">
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
        </div>
      ))}

      {Number(selectedVariant?.quantityAvailable) > 1 ? (
        <div className="flex flex-col">
          <Label className="text-muted-foreground pb-1 text-sm">Aantal</Label>
          <div className="border-input relative flex w-full items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || !selectedVariant?.availableForSale}
            >
              <Minus />
            </Button>
            <Input
              disabled={!selectedVariant?.availableForSale}
              name="quantity"
              type="number"
              min={1}
              max={Number(selectedVariant?.quantityAvailable)}
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="relative w-full [appearance:textfield] border-transparent text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={
                quantity >= Number(selectedVariant?.quantityAvailable) ||
                !selectedVariant?.availableForSale
              }
            >
              <Plus />
            </Button>
          </div>
        </div>
      ) : null}
      <AddToCartButton
        className={cn(buttonVariants({ size: "lg" }), "group")}
        variantId={selectedVariant?.id}
        quantity={quantity}
        disabled={!selectedVariant?.availableForSale}
      >
        {selectedVariant?.availableForSale ? (
          <>
            <Loader2 className="hidden animate-spin group-disabled:block" />
            <ShoppingBag className="group-disabled:hidden" />
            <span className="group-disabled:hidden">In winkelwagen</span>
          </>
        ) : (
          <span>Niet op voorraad</span>
        )}
      </AddToCartButton>
    </div>
  )
}

export { ShopifyProduct }
