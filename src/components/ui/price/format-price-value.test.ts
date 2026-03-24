import { describe, expect, it } from "vitest"

import { formatPriceValue } from "./format-price-value"

describe("formatPriceValue", () => {
  const options = {
    currency: "USD",
    locale: "en-US",
  }

  it("formats a numeric price as currency", () => {
    expect(formatPriceValue(99, options)).toBe("$99.00")
  })

  it("formats tuple ranges as currency values", () => {
    expect(formatPriceValue([50, 100], options)).toBe("$50.00 - $100.00")
  })

  it("formats numeric string ranges as currency values", () => {
    expect(formatPriceValue("50-100", options)).toBe("$50.00 - $100.00")
  })

  it("preserves non-numeric strings", () => {
    expect(formatPriceValue("Contact sales", options)).toBe("Contact sales")
  })

  it("preserves zero prices", () => {
    expect(formatPriceValue(0, options)).toBe("$0.00")
  })
})
