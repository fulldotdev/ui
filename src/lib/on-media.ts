type Trigger = { root: Element; selector: string; event?: string }

/** Import and mount only while the query matches; dispose on exit. */
export function onMedia<T>(
  query: string,
  load: () => Promise<T>,
  mount: (module: T) => () => void,
  trigger?: Trigger
) {
  const media = window.matchMedia(query)
  const matches = () => window.matchMedia(query).matches
  let disposed = false
  let epoch = 0
  let cleanup: (() => void) | undefined
  let pendingClick: HTMLElement | undefined
  let pendingEvent: CustomEvent | undefined

  const replayClick = () => {
    const target = pendingClick
    const event = pendingEvent
    pendingClick = undefined
    pendingEvent = undefined
    if (event && trigger?.root.isConnected)
      trigger.root.dispatchEvent(
        new CustomEvent(event.type, { detail: event.detail })
      )
    else if (target?.isConnected)
      target.dispatchEvent(new MouseEvent("click", { cancelable: true }))
  }

  const update = async () => {
    const current = ++epoch
    cleanup?.()
    cleanup = undefined
    if (!matches() || disposed) {
      pendingClick = undefined
      pendingEvent = undefined
      return
    }
    try {
      const module = await load()
      if (disposed || current !== epoch) return
      if (!matches()) {
        pendingClick = undefined
        pendingEvent = undefined
        return
      }
      cleanup = mount(module)
      replayClick()
    } catch (error) {
      if (!disposed && current === epoch) {
        pendingClick = undefined
        pendingEvent = undefined
        console.error(error)
      }
    }
  }
  const click = (event: Event) => {
    if (!trigger || cleanup || disposed || !matches() || event.defaultPrevented)
      return
    if (!(event.target instanceof Element)) return
    const target = event.target.closest<HTMLElement>(trigger.selector)
    if (!target || !trigger.root.contains(target)) return
    pendingClick ??= target
    pendingEvent = undefined
    event.preventDefault()
  }
  const request = (event: Event) => {
    if (cleanup || disposed || !matches() || event.target !== trigger?.root)
      return
    if (!(event instanceof CustomEvent)) return
    pendingEvent = event
    pendingClick = undefined
  }
  const change = () => void update()
  media.addEventListener("change", change)
  trigger?.root.addEventListener("click", click, true)
  if (trigger?.event) trigger.root.addEventListener(trigger.event, request)
  change()
  return () => {
    disposed = true
    epoch++
    pendingClick = undefined
    pendingEvent = undefined
    media.removeEventListener("change", change)
    trigger?.root.removeEventListener("click", click, true)
    if (trigger?.event) trigger.root.removeEventListener(trigger.event, request)
    cleanup?.()
    cleanup = undefined
  }
}
