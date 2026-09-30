/** Remove URL credentials, queries and fragments from exception data. */
export function sanitizeExceptionUrls(event) {
  if (event?.event !== "$exception") return event
  // Keep structured line/column fields; remove entire URL queries, including numeric suffixes.
  const seen = new WeakSet()
  const clean = (value) => {
    if (typeof value === "string") {
      return value.replace(/(?:https?:|[\\/]|[\w.-]+[?#])\S+/gi, (url) => {
        try {
          const normalized = url.replace(/\\/g, "/")
          const absolute = /^https?:/i.test(normalized)
          const parsed = new URL(
            normalized,
            absolute ? undefined : "https://redacted.invalid"
          )
          // Ambiguous joined URLs are safer to redact than partially preserve.
          if (/https?:/i.test(parsed.pathname)) return "[redacted-url]"
          const prefix = absolute
            ? parsed.protocol + "//" + parsed.host
            : normalized.startsWith("//")
              ? "//" + parsed.host
              : ""
          return prefix + parsed.pathname
        } catch {
          return "[redacted-url]"
        }
      })
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
