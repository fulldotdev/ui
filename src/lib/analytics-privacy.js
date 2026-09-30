/** Remove URL queries and fragments from exception data before it leaves the browser. */
export function sanitizeExceptionUrls(event) {
  if (event?.event !== "$exception") return event
  const seen = new WeakSet()
  const clean = (value) => {
    if (typeof value === "string") {
      return value.replace(
        /https?:\/\/[^\s<>"']+/gi,
        (url) => url.split(/[?#]/, 1)[0]
      )
    }
    if (value && typeof value === "object" && !seen.has(value)) {
      seen.add(value)
      for (const key of Object.keys(value)) value[key] = clean(value[key])
    }
    return value
  }
  clean(event.properties)
  return event
}
