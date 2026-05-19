export interface FormatPriceValueOptions {
  currency: string
  locale: string
}

export type PriceValue = number | string | [number, number]
export type DiscountFormat = "percentage" | "amount"

function formatCurrency(value: number, options: FormatPriceValueOptions) {
  return new Intl.NumberFormat(options.locale, {
    style: "currency",
    currency: options.currency,
  }).format(value)
}

export function parseSinglePriceValue(price: PriceValue | null | undefined) {
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

export function formatPriceDiscount(
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

export function formatPriceValue(
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
