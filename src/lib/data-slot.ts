import { getRoots, hasRootBinding } from "@data-slot/core"

type Controller = { destroy(): void }

/** Bind new roots once and release outgoing controllers before Astro swaps pages. */
export function initializeDataSlot(
  slot: string,
  create: (root: HTMLElement) => Controller | undefined
) {
  const controllers = new Map<HTMLElement, Controller>()

  const initialize = () => {
    for (const root of getRoots<HTMLElement>(document, slot)) {
      if (hasRootBinding(root, `@data-slot/${slot}`)) continue
      const controller = create(root)
      if (controller) controllers.set(root, controller)
    }
  }

  initialize()
  document.addEventListener("astro:page-load", initialize)
  document.addEventListener("astro:before-swap", (event) => {
    const nextDocument = (event as Event & { newDocument: Document })
      .newDocument
    const persisted = new Set(
      Array.from(
        nextDocument.querySelectorAll("[data-astro-transition-persist]")
      ).map((element) => element.getAttribute("data-astro-transition-persist"))
    )
    for (const [root, controller] of controllers) {
      const persist = root.closest("[data-astro-transition-persist]")
      if (
        persist &&
        persisted.has(persist.getAttribute("data-astro-transition-persist"))
      )
        continue
      controller.destroy()
      controllers.delete(root)
    }
  })
}
