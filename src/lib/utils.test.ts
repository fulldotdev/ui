import { describe, expect, it } from "vitest"

import { cn } from "./utils"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("text-sm", "font-medium")).toBe("text-sm font-medium")
  })

  it("resolves Tailwind utility conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
  })

  it("handles conditional classes", () => {
    expect(
      cn("base", {
        "is-active": true,
        "is-hidden": false,
      })
    ).toBe("base is-active")
  })
})
