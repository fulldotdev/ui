type Trigger = { root: Element; selector: string }

/** Import and mount only while the query matches; dispose on exit. */
export function onMedia<T>(
  query: string,
  load: () => Promise<T>,
  mount: (module: T) => () => void,
  trigger?: Trigger
) {
  const media = window.matchMedia(query)
  let disposed = false
  let epoch = 0
  let cleanup: (() => void) | undefined
  let pendingClick: HTMLElement | undefined

  const update = async () => {
    const current = ++epoch
    pendingClick = undefined
    cleanup?.()
    cleanup = undefined
    if (!media.matches || disposed) return
    try {
      const module = await load()
      if (disposed || !media.matches || current !== epoch) return
      cleanup = mount(module)
      const target = pendingClick
      pendingClick = undefined
      if (target?.isConnected) target.click()
    } catch (error) {
      if (!disposed && current === epoch) {
        pendingClick = undefined
        console.error(error)
      }
    }
  }
  const click = (event: Event) => {
    if (
      !trigger ||
      cleanup ||
      disposed ||
      !media.matches ||
      event.defaultPrevented
    )
      return
    if (!(event.target instanceof Element)) return
    const target = event.target.closest<HTMLElement>(trigger.selector)
    if (!target || !trigger.root.contains(target)) return
    pendingClick ??= target
    event.preventDefault()
    event.stopImmediatePropagation()
  }
  const change = () => void update()
  media.addEventListener("change", change)
  trigger?.root.addEventListener("click", click, true)
  change()
  return () => {
    disposed = true
    epoch++
    pendingClick = undefined
    media.removeEventListener("change", change)
    trigger?.root.removeEventListener("click", click, true)
    cleanup?.()
    cleanup = undefined
  }
}
