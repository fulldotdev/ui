/** Keep the visible portion of a multi-slide carousel accessible. */
export function observeCarouselVisibility(root: HTMLElement) {
  const content = root.querySelector<HTMLElement>(
    '[data-slot="carousel-content"]'
  )
  if (!content) return () => {}

  let frame: number | undefined
  const update = () => {
    const viewport = content.getBoundingClientRect()
    const vertical = root.dataset.orientation === "vertical"
    for (const item of content.children) {
      if (!(item instanceof HTMLElement)) continue
      if (item.dataset.slot !== "carousel-item") continue
      resize.observe(item)
      const bounds = item.getBoundingClientRect()
      const visible = vertical
        ? bounds.bottom > viewport.top + 1 && bounds.top < viewport.bottom - 1
        : bounds.right > viewport.left + 1 && bounds.left < viewport.right - 1
      if (item.inert === visible) item.inert = !visible
      const hidden = String(!visible)
      if (item.getAttribute("aria-hidden") !== hidden)
        item.setAttribute("aria-hidden", hidden)
    }
  }
  const schedule = () => {
    frame ??= requestAnimationFrame(() => {
      frame = undefined
      update()
    })
  }

  // The single-slide primitive updates these attributes after scroll settles.
  // Observe that update as well as geometry so visible links stay operable.
  const mutation = new MutationObserver(update)
  mutation.observe(content, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["inert", "aria-hidden"],
  })
  const resize = new ResizeObserver(schedule)
  resize.observe(content)
  content.addEventListener("scroll", schedule, { passive: true })
  update()

  return () => {
    mutation.disconnect()
    resize.disconnect()
    content.removeEventListener("scroll", schedule)
    if (frame !== undefined) cancelAnimationFrame(frame)
  }
}
