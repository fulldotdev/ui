import assert from "node:assert/strict"
import { test } from "node:test"
import { dropBrowserNoise } from "#analytics-exceptions"

const exception = (value, $host = "ui.full.dev") => ({
  event: "$exception",
  properties: { $host, $exception_list: [{ type: "Error", value }] },
})

test("drops browser noise seen on ui.full.dev", () => {
  for (const value of [
    "AbortError: Skipping view transition because skipTransition() was called.",
    "AbortError: Transition was skipped. Navigation aborted",
    "InvalidStateError: Transition was aborted because of invalid state. Viewport size changed",
    "InvalidStateError: Transition was aborted because of invalid state. Document hidden",
    "InvalidStateError: Skipping view transition because viewport size changed.",
    "ResizeObserver loop completed with undelivered notifications.",
    "Script error.",
  ])
    assert.equal(dropBrowserNoise(exception(value)), null, value)
})

test("keeps real errors, other hosts and other events", () => {
  const real = exception("TypeError: Cannot read properties of undefined")
  assert.equal(dropBrowserNoise(real), real)
  const elsewhere = exception("Script error.", "app.full.dev")
  assert.equal(dropBrowserNoise(elsewhere), elsewhere)
  const pageview = { event: "$pageview", properties: { $host: "ui.full.dev" } }
  assert.equal(dropBrowserNoise(pageview), pageview)
})
