// Browser-native view transition aborts on ui.full.dev. Navigation continues.
const VIEW_TRANSITION_NOISE = new Set([
  "InvalidStateError: Transition was aborted because of invalid state. Viewport size changed",
  "AbortError: Transition was skipped. Navigation aborted",
  "AbortError: Skipping view transition because skipTransition() was called.",
])

/** Drop exceptions that consist only of known view transition aborts. */
export function dropViewTransitionNoise(event) {
  if (event?.event !== "$exception") return event
  const { $host, $exception_list: list } = event.properties ?? {}
  if ($host !== "ui.full.dev" || !Array.isArray(list) || !list.length) {
    return event
  }
  const noise = list.every(
    (exception) =>
      exception?.type === "DOMException" &&
      VIEW_TRANSITION_NOISE.has(exception.value)
  )
  return noise ? null : event
}
