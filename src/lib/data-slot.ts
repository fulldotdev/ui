import { containsWithPortals, getRoots, hasRootBinding } from "@data-slot/core"

type Controller = { destroy(): void; close?(): void; hide?(): void }
const controllers = new Map<HTMLElement, Controller>()

document.addEventListener("astro:before-swap", (event) => {
  const transition = event as Event & {
    newDocument: Document
    swap(): void
  }
  const selector = "[data-astro-transition-persist]"
  const nextNames = new Set(
    Array.from(transition.newDocument.querySelectorAll(selector)).map(
      (element) => element.getAttribute("data-astro-transition-persist")
    )
  )
  const boundaries = Array.from(document.querySelectorAll(selector)).filter(
    (element) =>
      nextNames.has(element.getAttribute("data-astro-transition-persist"))
  )
  // Astro carries authored boundaries, but body portals live outside them.
  const portals = Array.from(document.body.children).filter((element) =>
    boundaries.some(
      (boundary) =>
        !boundary.contains(element) && containsWithPortals(boundary, element)
    )
  )
  const retained = new Set<Element>()
  const slots = new Set(
    Array.from(controllers.keys()).map((root) =>
      root.getAttribute("data-slot")!
    )
  )
  for (const scope of [...boundaries, ...portals]) {
    retained.add(scope)
    for (const slot of slots) {
      for (const root of getRoots(scope, slot)) retained.add(root)
    }
  }
  for (const [root, controller] of controllers) {
    if (retained.has(root)) {
      // Reopening creates modal isolation and scroll locks for the new body.
      controller.close?.()
      controller.hide?.()
      continue
    }
    controller.destroy()
    controllers.delete(root)
  }
  if (portals.length) {
    const swap = transition.swap
    transition.swap = () => {
      swap()
      document.body.append(...portals)
    }
  }
})

/** Bind new roots once and release outgoing controllers before Astro swaps pages. */
export function initializeDataSlot(
  slot: string,
  create: (root: HTMLElement) => Controller
) {
  const initialize = () => {
    for (const root of getRoots<HTMLElement>(document, slot)) {
      if (hasRootBinding(root, `@data-slot/${slot}`)) continue
      controllers.set(root, create(root))
    }
  }

  initialize()
  document.addEventListener("astro:page-load", initialize)
}
