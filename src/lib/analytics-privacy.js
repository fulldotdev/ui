/** Keep basic page statistics and remove URL query strings and fragments. */
export function sanitizeEventUrls(event) {
  if (!event || !["$pageview", "$pageleave"].includes(event.event)) return null
  const seen = new WeakSet()
  function scrub(value) {
    if (!value || typeof value !== "object" || seen.has(value)) return
    seen.add(value)
    for (const [key, nested] of Object.entries(value)) {
      if (typeof nested === "string" && /^https?:\/\//i.test(nested)) {
        try {
          const url = new URL(nested)
          url.search = ""
          url.hash = ""
          value[key] = url.href
        } catch {
          value[key] = ""
        }
      } else scrub(nested)
    }
  }
  for (const values of [event.properties, event.$set, event.$set_once])
    scrub(values)
  return event
}
