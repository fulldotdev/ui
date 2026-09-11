type Controller = { destroy(): void }

// Astro scripts run once; ClientRouter replaces their component roots on each page.
// Keep every controller until the swap so open portals and scroll locks are cleaned up.
const initializers = new Set<() => Controller[]>()

export function initDataSlot(create: () => Controller[]) {
  if (initializers.has(create)) return
  initializers.add(create)
  const controllers = new Set<Controller>()
  const init = () => {
    for (const controller of create()) controllers.add(controller)
  }

  document.addEventListener("astro:page-load", init)
  document.addEventListener("astro:before-swap", () => {
    for (const controller of [...controllers].reverse()) controller.destroy()
    controllers.clear()
  })
  init()
}
