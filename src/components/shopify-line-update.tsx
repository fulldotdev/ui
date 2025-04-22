import * as React from "react"
import {
  CartLineQuantity,
  CartLineQuantityAdjustButton,
} from "@shopify/hydrogen-react"
import { Loader2, Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface Props extends React.ComponentProps<"div"> {
  size?: "sm" | "default" | "lg"
  variant?: "default" | "secondary" | "ghost"
}

function ShopifyLineUpdate({
  variant = "default",
  size = "default",
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "ring-input bg-background inline-flex items-center justify-between gap-4 rounded-md text-sm font-medium whitespace-nowrap ring-1 ring-inset",
        {
          "h-8": size === "sm",
          "h-9": size === "default",
          "h-10": size === "lg",
        },
        className
      )}
      {...props}
    >
      <CartLineQuantityAdjustButton
        className={cn("group", buttonVariants({ variant, size }), {
          "size-8": size === "sm",
          "size-9": size === "default",
          "size-10": size === "lg",
        })}
        adjust="decrease"
      >
        <Loader2 className="hidden animate-spin group-disabled:block" />
        <Minus className="group-disabled:hidden">In winkelwagen</Minus>
      </CartLineQuantityAdjustButton>
      <span>
        <CartLineQuantity />
        &nbsp;in winkelwagen
      </span>
      <CartLineQuantityAdjustButton
        className={cn("group", buttonVariants({ variant, size }), {
          "size-8": size === "sm",
          "size-9": size === "default",
          "size-10": size === "lg",
        })}
        adjust="increase"
      >
        <Loader2 className="hidden animate-spin group-disabled:block" />
        <Plus className="group-disabled:hidden">In winkelwagen</Plus>
      </CartLineQuantityAdjustButton>
    </div>
  )
}
export { ShopifyLineUpdate }
