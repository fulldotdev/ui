import { Price } from '@/components/price'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { cart, cartLineRemove, isCartOpen } from '@/stores/cart'
import { useStore } from '@nanostores/react'
import { Loader2, ShoppingBag, Trash } from 'lucide-react'
import { useState } from 'react'

interface Props {
  className?: string
}

export default function CartForm({ className }: Props) {
  const $cart = useStore(cart)
  const $isCartOpen = useStore(isCartOpen)
  const [loading, setLoading] = useState(false)
  return (
    <Sheet
      open={$isCartOpen}
      onOpenChange={isCartOpen.set}
    >
      <SheetTrigger asChild>
        <Button
          className={cn('relative', className)}
          variant="ghost"
          size="sm"
          name="drawer-trigger"
        >
          <ShoppingBag className="size-6" />
          {$cart?.totalQuantity || 0}
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader className="border-b">
          <SheetTitle>Winkelwagen</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col px-4 divide-y">
          {$cart?.lines?.nodes?.map((line, index) => (
            <div
              key={index}
              className="w-full py-8 flex gap-4"
            >
              <img
                className="w-24 h-24 object-cover border rounded-md"
                src={line.merchandise.image?.url}
                alt={line.merchandise.image?.altText || ''}
              />
              <div className="flex flex-col relative w-full gap-1">
                <h3 className="font-medium">{line.merchandise.title}</h3>
                <Price
                  className="text-sm text-muted-foreground"
                  amount={Number(line.cost.totalAmount.amount)}
                  currency={line.cost.totalAmount.currencyCode}
                />
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-muted-foreground">{line.quantity} stuks</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={async () => {
                      setLoading(true)
                      await cartLineRemove(line.id)
                      setLoading(false)
                    }}
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Trash />}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col p-4 border-t mt-auto">
          <div className="flex items-center justify-between">
            <span className="font-medium">Totaal</span>
            <span className="font-medium">
              <Price
                amount={Number($cart?.cost?.totalAmount.amount)}
                currency={$cart?.cost?.totalAmount.currencyCode}
              />
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 mb-4">Verzendkosten worden berekend bij afrekenen.</p>
          <Button
            size="lg"
            disabled={!$cart?.totalQuantity}
            onClick={() => (window.location.href = $cart?.checkoutUrl || '')}
          >
            Afrekenen
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
