import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"

describe("a11y smoke checks", () => {
  it("has no violations for a basic interactive snippet", async () => {
    document.body.innerHTML = `
      <main>
        <button type="button" aria-label="Open menu">Open</button>
      </main>
    `

    const results = await axe(document.body, {
      rules: {
        // jsdom does not implement canvas APIs used by this rule.
        "color-contrast": { enabled: false },
      },
    })

    expect(results.violations).toHaveLength(0)
  })
})
