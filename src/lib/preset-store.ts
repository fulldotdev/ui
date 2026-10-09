// Docs only, browser: the chosen preset, applied to every docs page.
// The create page computes `css` and `fonts`; other pages only apply them.
export type StoredPreset = {
  config: Record<string, string>
  css?: string
  fonts?: string[]
}

const PRESET_KEY = "fulldev-ui-preset"
export const PRESET_EVENT = "preset:change"

export function readPreset(): StoredPreset | undefined {
  try {
    return JSON.parse(localStorage.getItem(PRESET_KEY) ?? "null") ?? undefined
  } catch {
    return undefined
  }
}

export function writePreset(preset: StoredPreset | undefined) {
  if (preset) localStorage.setItem(PRESET_KEY, JSON.stringify(preset))
  else localStorage.removeItem(PRESET_KEY)
  applyPreset(preset)
  document.dispatchEvent(new CustomEvent(PRESET_EVENT, { detail: preset }))
}

// Theme variables and fonts. The head script in preset-head.astro does the
// same before the first paint.
function applyTheme(preset: StoredPreset | undefined) {
  let style = document.getElementById(PRESET_KEY)
  if (!style) {
    style = document.createElement("style")
    style.id = PRESET_KEY
    document.head.append(style)
  }
  style.textContent = preset?.css ?? ""
  for (const href of preset?.fonts ?? []) {
    if (document.querySelector(`link[href="${href}"]`)) continue
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = href
    document.head.append(link)
  }
}

// Rendered previews per style, kept so switching back keeps their state.
const cache = new Map<HTMLElement, Map<string, DocumentFragment>>()

// Other styles are stored as JSON next to the preview.
const render = (preview: HTMLElement, style: string) => {
  const data = preview.parentElement?.querySelector(
    `script[data-style-template="${style}"]`
  )
  if (!data?.textContent) return
  const template = document.createElement("template")
  template.innerHTML = JSON.parse(data.textContent)
  return template.content
}

function applyStyle(style: string) {
  let changed = false
  document
    .querySelectorAll<HTMLElement>("[data-style-preview]")
    .forEach((preview) => {
      const current = preview.dataset.stylePreview ?? ""
      if (current === style) return
      const stored = cache.get(preview) ?? new Map<string, DocumentFragment>()
      const next = stored.get(style) ?? render(preview, style)
      if (!next) return
      cache.set(preview, stored)
      const fragment = document.createDocumentFragment()
      fragment.append(...preview.childNodes)
      stored.set(current, fragment)
      preview.replaceChildren(next)
      preview.dataset.stylePreview = style
      changed = true
    })
  // Component scripts initialize new elements on page-load and skip elements
  // they already control, so the rest of the page and cached previews keep state.
  if (changed) document.dispatchEvent(new Event("astro:page-load"))
}

export function applyPreset(preset: StoredPreset | undefined) {
  applyTheme(preset)
  applyStyle(preset?.config.style ?? "vega")
}
