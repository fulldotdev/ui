import assert from "node:assert/strict"
import { test } from "node:test"
import { sanitizeEventUrls } from "#analytics-privacy"

test("keeps page statistics without private URL details, including nested metadata", () => {
  const event = {
    event: "$pageview",
    properties: {
      $current_url: "https://example.com/path?token=secret#private",
      nested: [{ $referrer: "https://source.example/?email=private" }],
    },
    $set_once: { $initial_current_url: "https://example.com/?code=private" },
  }
  assert.equal(sanitizeEventUrls(event), event)
  assert.equal(event.properties.$current_url, "https://example.com/path")
  assert.equal(event.properties.nested[0].$referrer, "https://source.example/")
  assert.equal(event.$set_once.$initial_current_url, "https://example.com/")
  const leave = { event: "$pageleave", properties: {} }
  assert.equal(sanitizeEventUrls(leave), leave)
})

test("drops interaction, error and profile events even when enabled remotely", () => {
  for (const event of [
    "website_interaction",
    "$autocapture",
    "$exception",
    "$identify",
    "$snapshot",
    "$web_vitals",
  ])
    assert.equal(
      sanitizeEventUrls({ event, properties: { text: "private" } }),
      null
    )
  assert.equal(sanitizeEventUrls(null), null)
})
