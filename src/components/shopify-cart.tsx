import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { cartTotalQuantity } from '@/stores/cart'
import { useStore } from '@nanostores/react'
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
} from '@shopify/hydrogen-react'
import type { CartLine } from '@shopify/hydrogen-react/storefront-api-types'
import { ShoppingBag, Trash } from 'lucide-react'
import * as React from 'react'

interface Props {
  className?: string
}

function ShopifyCart({ className }: Props) {
  const $cartTotalQuantity = useStore(cartTotalQuantity)
  const [rerenderKey, setRerenderKey] = React.useState(0)

  return (
    <Sheet onOpenChange={() => setRerenderKey((prev) => prev + 1)}>
      <SheetTrigger>
        <Button
          className={cn('relative', className)}
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
        storeDomain="https://padelracketwinkel.myshopify.com"
        storefrontToken="5817d7fdddda0c1fa13f131de5d91794"
      >
        <CartProvider>
          <ShopifyCartContent />
        </CartProvider>
      </ShopifyProvider>
    </Sheet>
  )
}

function ShopifyCartContent() {
  const { lines, totalQuantity } = useCart()

  // Update global quantity state, because components may be on different islands
  React.useEffect(() => {
    cartTotalQuantity.set(totalQuantity)
  }, [totalQuantity])

  return (
    <SheetContent className="gap-0">
      <SheetHeader className="border-b">
        <SheetTitle>Winkelwagen</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col px-4 divide-y">
        {lines?.map(
          (line) =>
            line && (
              <ShopifyCartLine
                key={line.id}
                line={line as CartLine}
              />
            )
        )}
      </div>
      <div className="flex flex-col p-4 border-t mt-auto">
        <div className="flex items-center justify-between font-medium">
          <span>Totaal</span>
          <CartCost amountType="total" />
        </div>
        <p className="text-xs text-muted-foreground mt-2 mb-4">Verzendkosten worden berekend bij afrekenen.</p>
        <CartCheckoutButton className={buttonVariants({ size: 'lg' })}>Afrekenen</CartCheckoutButton>
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
    <div className="w-full py-8 flex gap-4">
      <img
        className="w-24 h-24 object-cover border rounded-md"
        src={merchandise?.image?.url}
        alt={merchandise?.image?.altText || ''}
      />
      <div className="flex flex-col relative w-full gap-1">
        <h3 className="font-medium">{merchandise?.title}</h3>
        {cost?.totalAmount && (
          <Money
            className="text-sm text-muted-foreground"
            data={cost?.totalAmount}
          />
        )}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm text-muted-foreground">
            Aantal: <CartLineQuantity />
          </span>
          <CartLineQuantityAdjustButton
            adjust="remove"
            className={cn('size-8', buttonVariants({ size: 'icon', variant: 'ghost' }))}
          >
            <Trash className="size-4" />
          </CartLineQuantityAdjustButton>
        </div>
      </div>
    </div>
  )
}

export { ShopifyCart }
