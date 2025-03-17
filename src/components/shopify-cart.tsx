import * as React from "react"
import config from "@/data/config"
import { cartTotalQuantity } from "@/stores/shopify"
import { useStore } from "@nanostores/react"
import {
  CartCheckoutButton,
  CartCost,
  CartLineProvider,
  CartLineQuantity,
  CartLineQuantityAdjustButton,
  CartProvider,
  Money,
  ShopifyProvider,
  useCart,
  useCartLine,
  type CartWithActions,
} from "@shopify/hydrogen-react"
import type { CartBase } from "@shopify/hydrogen-react/dist/types/cart-types"
import type { CartLine } from "@shopify/hydrogen-react/storefront-api-types"
import { ShoppingBag, Trash } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface Props {
  className?: string
}

function ShopifyCart({ className }: Props) {
  const $cartTotalQuantity = useStore(cartTotalQuantity)
  const [rerenderKey, setRerenderKey] = React.useState(0)

  return (
    <Sheet onOpenChange={() => setRerenderKey((prev) => prev + 1)}>
      <SheetTrigger asChild>
        <Button
          className={cn("relative", className)}
          variant="ghost"
          name="drawer-trigger"
        >
          <ShoppingBag className="size-5" />
          <span className="text-muted-foreground">{$cartTotalQuantity}</span>
        </Button>
      </SheetTrigger>
      <ShopifyProvider
        key={rerenderKey}
        countryIsoCode="NL"
        languageIsoCode="NL"
        storefrontApiVersion="2025-01"
        storeDomain={config.shopify.storeDomain}
        storefrontToken={config.shopify.publicAccessToken}
      >
        <CartProvider>
          <ShopifyCartContent />
        </CartProvider>
      </ShopifyProvider>
    </Sheet>
  )
}

function ShopifyCartContent() {
  const { lines, totalQuantity } = useCart() as CartWithActions & CartBase // Manual type according to docs. It works but types were incorrect.

  // Update global quantity state, because components may be on different islands
  React.useEffect(() => {
    cartTotalQuantity.set(totalQuantity)
  }, [totalQuantity])

  return (
    <SheetContent className="gap-0">
      <SheetHeader className="border-b">
        <SheetTitle>Winkelwagen</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col divide-y px-4">
        {lines?.map(
          (line) =>
            line && <ShopifyCartLine key={line.id} line={line as CartLine} />
        )}
      </div>
      <div className="mt-auto flex flex-col border-t p-4">
        <div className="flex items-center justify-between font-medium">
          <span>Totaal</span>
          <CartCost amountType="total" />
        </div>
        <p className="text-muted-foreground mt-2 mb-4 text-xs">
          Verzendkosten worden berekend bij afrekenen.
        </p>
        <CartCheckoutButton className={buttonVariants({ size: "lg" })}>
          Afrekenen
        </CartCheckoutButton>
      </div>
    </SheetContent>
  )
}

function ShopifyCartLine({ line }: { line: CartLine }) {
  return (
    <CartLineProvider line={line}>
      <ShopifyCartLineContent />
    </CartLineProvider>
  )
}

function ShopifyCartLineContent() {
  const { merchandise, cost } = useCartLine()
  return (
    <div className="flex w-full gap-4 py-8">
      <img
        className="h-24 w-24 rounded-md border object-cover"
        src={merchandise?.image?.url}
        alt={merchandise?.image?.altText || ""}
      />
      <div className="relative flex w-full flex-col gap-1">
        <h3 className="font-medium">{merchandise?.title}</h3>
        {cost?.totalAmount && (
          <Money
            className="text-muted-foreground text-sm"
            data={cost?.totalAmount}
          />
        )}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            Aantal: <CartLineQuantity />
          </span>
          <CartLineQuantityAdjustButton
            adjust="remove"
            className={cn(
              "size-8",
              buttonVariants({ size: "icon", variant: "ghost" })
            )}
          >
            <Trash className="size-4" />
          </CartLineQuantityAdjustButton>
        </div>
      </div>
    </div>
  )
}

export { ShopifyCart }
