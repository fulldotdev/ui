export interface FormatPriceValueOptions {
  currency: string
  locale: string
}

export type PriceValue = number | string | [number, number]

function formatCurrency(value: number, options: FormatPriceValueOptions) {
  return new Intl.NumberFormat(options.locale, {
    style: "currency",
    currency: options.currency,
  }).format(value)
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
