// Docs-only bridge, the same as the React previews: the theme and preset come
// from the docs' localStorage, and the frame sizes itself. The component
// controllers come from the native library.
const theme = document.querySelector("#preview-theme")
const defaultCss = theme.textContent
const media = matchMedia("(prefers-color-scheme: dark)")

const read = (key) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

// A stored "dark" or "light" is the visitor's choice; otherwise the system.
const apply = () => {
  const stored = read("theme")
  const dark = stored === "dark" || (stored !== "light" && media.matches)
  document.documentElement.classList.toggle("dark", dark)
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
  let preset
  try {
    preset = JSON.parse(read("fulldev-ui-preset") ?? "null")
  } catch {
    preset = null
  }
  theme.textContent = preset?.css ?? defaultCss
  for (const href of preset?.fonts ?? []) {
    if (document.querySelector(`link[href="${href}"]`)) continue
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = href
    document.head.append(link)
  }
}
apply()
addEventListener("storage", (event) => {
  if (event.storageArea !== localStorage) return
  if ([null, "theme", "fulldev-ui-preset"].includes(event.key)) apply()
})
media.addEventListener("change", apply)

// The docs share the origin, so the frame sets its own height, bounded so a
// runaway layout cannot grow the page without end.
const frame = window.frameElement
if (frame) {
  const min = Number(frame.dataset.minHeight ?? 120)
  new ResizeObserver(() => {
    const height = Math.ceil(document.body.scrollHeight)
    frame.style.height = `${Math.min(Math.max(height, min), 4000)}px`
  }).observe(document.querySelector("#example"))
}
