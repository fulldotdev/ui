// Browser notices on ui.full.dev that are not failures: view transition aborts
// (navigation continues), Firefox's ResizeObserver loop notice (the observers
// run in the next frame) and cross-origin "Script error." without details.
const BROWSER_NOISE = [
  /^(AbortError|InvalidStateError): (Skipping view transition|Transition was (aborted|skipped))\b/,
  /^ResizeObserver loop (completed with undelivered notifications|limit exceeded)/,
  /^Script error\.?$/,
]

/** Drop exceptions that consist only of known browser noise. */
export function dropBrowserNoise(event) {
  if (event?.event !== "$exception") return event
  const { $host, $exception_list: list } = event.properties ?? {}
  if ($host !== "ui.full.dev" || !Array.isArray(list) || !list.length) {
    return event
  }
  const noise = list.every((exception) =>
    BROWSER_NOISE.some((pattern) => pattern.test(exception?.value ?? ""))
  )
  return noise ? null : event
}
