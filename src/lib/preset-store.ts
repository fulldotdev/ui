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

// The framework chosen last, in the switcher, on the homepage or on Create.
export const FRAMEWORK_KEY = "fulldev-ui-framework"
export const FRAMEWORK_EVENT = "framework:change"

export function writeFramework(framework: string) {
  localStorage.setItem(FRAMEWORK_KEY, framework)
  document.dispatchEvent(new Event(FRAMEWORK_EVENT))
}

const CUSTOM_KEY = "fulldev-ui-custom-preset"

export const sameConfig = (
  a: Record<string, string>,
  b: Record<string, string>
) =>
  [...new Set([...Object.keys(a), ...Object.keys(b)])].every(
    (key) => a[key] === b[key]
  )

export function readCustomPreset(): StoredPreset | undefined {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_KEY) ?? "null") ?? undefined
  } catch {
    return undefined
  }
}

// A preset that is none of the named ones, such as one made on Create, is
// kept as the visitor's own, so choosing a named preset does not lose it.
export function keepCustomPreset(named: Record<string, string>[]) {
  const preset = readPreset()
  if (preset && !named.some((config) => sameConfig(config, preset.config)))
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(preset))
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

// Switch menus to the preset's menu color, using the classes that installs in
// that menu color get, rendered by applyStyle in src/lib/styles.ts.
function applyMenuColor(menuColor = "default") {
  const inverted = menuColor.startsWith("inverted")
  const translucent = menuColor.endsWith("-translucent")
  document
    .querySelectorAll<HTMLElement>(
      "[data-menu-target], [data-menu-translucent]"
    )
    .forEach((element) => {
      const { menuTranslucent } = element.dataset
      if (menuTranslucent !== undefined) {
        element.dataset.menuSolid ??= element.className
        element.className = translucent
          ? menuTranslucent
          : element.dataset.menuSolid
      }
      if (element.hasAttribute("data-menu-target")) {
        element.classList.toggle("dark", inverted)
      }
    })
}

// Menus that mount when they open, such as Select, get the menu color then.
let observing = false
function observeMenus() {
  if (observing) return
  observing = true
  const selector = "[data-menu-target], [data-menu-translucent]"
  new MutationObserver((records) => {
    const added = records.some((record) =>
      [...record.addedNodes].some(
        (node) =>
          node instanceof Element &&
          (node.matches(selector) || node.querySelector(selector))
      )
    )
    if (added) applyMenuColor(document.documentElement.dataset.menuColor)
  }).observe(document.body, { childList: true, subtree: true })
}

declare global {
  interface Window {
    // Set by the script src/lib/styles.ts adds to every docs page.
    applySiteStyle?: (style: string) => void
  }
}

// The whole site follows the preset: theme, style and menu color. Without a
// stored preset, the docs default from preset-head.astro applies.
export function applyPreset(preset: StoredPreset | undefined) {
  applyTheme(preset)
  const root = document.documentElement
  const style = preset?.config.style ?? root.dataset.defaultStyle ?? "vega"
  const menuColor =
    preset?.config.menuColor ?? root.dataset.defaultMenuColor ?? "default"
  root.dataset.menuColor = menuColor
  applyStyle(style)
  window.applySiteStyle?.(style)
  applyMenuColor(menuColor)
  observeMenus()
}
