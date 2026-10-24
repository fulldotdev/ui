import { onMedia } from "./on-media"

const roots = new Map<Element, () => void>()

export function initializeDialogs() {
  for (const root of document.querySelectorAll<HTMLElement>(
    '[data-slot="dialog"]'
  )) {
    if (roots.has(root)) continue
    roots.set(
      root,
      onMedia(
        root.dataset.media ?? "all",
        () => import("@data-slot/dialog"),
        ({ createDialog }) => {
          const controller = createDialog(root)
          return () => controller.destroy()
        },
        { root, selector: '[data-slot="dialog-trigger"]', event: "dialog:set" }
      )
    )
  }
}

document.addEventListener("astro:page-load", initializeDialogs)
document.addEventListener("astro:before-swap", () => {
  for (const dispose of roots.values()) dispose()
  roots.clear()
})
