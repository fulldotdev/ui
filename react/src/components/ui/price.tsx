import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "cn"

interface FormatPriceValueOptions {
  currency: string
  locale: string
}

type PriceValue = number | string | [number, number]
type DiscountFormat = "percentage" | "amount"

function formatCurrency(value: number, options: FormatPriceValueOptions) {
  return new Intl.NumberFormat(options.locale, {
    style: "currency",
    currency: options.currency,
  }).format(value)
}

function parseSinglePriceValue(price: PriceValue | null | undefined) {
  if (price === null || price === undefined || price === "") {
    return null
  }

  if (typeof price === "number") {
    return Number.isFinite(price) ? price : null
  }

  if (Array.isArray(price)) {
    return null
  }

  const numericValue = Number(price)

  if (!Number.isNaN(numericValue) && Number.isFinite(numericValue)) {
    return numericValue
  }

  return null
}

function formatPriceDiscount(
  price: PriceValue | null | undefined,
  compareAt: PriceValue | null | undefined,
  options: FormatPriceValueOptions & {
    format?: DiscountFormat
  }
) {
  const currentPrice = parseSinglePriceValue(price)
  const originalPrice = parseSinglePriceValue(compareAt)

  if (
    currentPrice === null ||
    originalPrice === null ||
    originalPrice <= currentPrice ||
    originalPrice <= 0
  ) {
    return null
  }

  if (options.format === "amount") {
    return formatCurrency(originalPrice - currentPrice, options)
  }

  return `${Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}%`
}

function formatPriceValue(
  price: PriceValue | null | undefined,
  options: FormatPriceValueOptions
) {
  if (price === null || price === undefined || price === "") {
    return null
  }

  if (typeof price === "number") {
    return formatCurrency(price, options)
  }

  if (Array.isArray(price)) {
    const [minimum, maximum] = price
    return `${formatCurrency(minimum, options)} - ${formatCurrency(maximum, options)}`
  }

  const rangeMatch = price.match(
    /^\s*(-?\d+(?:\.\d+)?)\s*-\s*(-?\d+(?:\.\d+)?)\s*$/
  )

  if (!rangeMatch) {
    return price
  }

  const [, minimum, maximum] = rangeMatch
  return `${formatCurrency(Number(minimum), options)} - ${formatCurrency(Number(maximum), options)}`
}

function Price({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="price"
      className={cn("flex flex-wrap items-center gap-x-2", className)}
      {...props}
    />
  )
}

const priceValueVariants = cva("leading-tight", {
  variants: {
    variant: {
      default: "text-foreground",
      sale: "text-muted-foreground line-through",
    },
  },
})

function PriceValue({
  className,
  price,
  compareAt,
  currency = "USD",
  locale = "en-US",
  variant = "default",
  discountFormat = "percentage",
  showDiscount = true,
  discountLabel = "Save",
  ...props
}: React.ComponentProps<"span"> & {
  price?: PriceValue
  compareAt?: PriceValue
  currency?: string
  locale?: string
  variant?: "default" | "sale"
  discountFormat?: DiscountFormat
  showDiscount?: boolean
  discountLabel?: string
}) {
  const formattedPrice = formatPriceValue(price, { currency, locale })
  if (formattedPrice === null) return null
  const currentValue = parseSinglePriceValue(price)
  const compareAtValue = parseSinglePriceValue(compareAt)
  // A compare-at price only shows when it is higher than the price.
  const formattedCompareAt =
    currentValue !== null &&
    compareAtValue !== null &&
    compareAtValue <= currentValue
      ? null
      : formatPriceValue(compareAt, { currency, locale })
  const formattedDiscount =
    showDiscount && formattedCompareAt !== null
      ? formatPriceDiscount(price, compareAt, {
          currency,
          locale,
          format: discountFormat,
        })
      : null

  return (
    <span
      data-slot="price-value"
      data-variant={variant}
      className={cn(
        "inline-flex flex-wrap items-center gap-x-2 gap-y-1",
        className
      )}
      {...props}
    >
      <span className={priceValueVariants({ variant })}>{formattedPrice}</span>
      {formattedCompareAt !== null && (
        <del className="text-sm leading-tight text-muted-foreground line-through">
          {formattedCompareAt}
        </del>
      )}
      {formattedDiscount !== null && (
        <span className="cn-price-badge">
          {discountLabel} {formattedDiscount}
        </span>
      )}
    </span>
  )
}

function PriceUnit({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="price-unit"
      className={cn("text-sm leading-tight text-muted-foreground", className)}
      {...props}
    >
      / {children}
    </span>
  )
}

export { Price, PriceUnit, PriceValue }
