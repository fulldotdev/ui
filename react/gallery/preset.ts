// Apply the preset picked in the docs, which src/lib/preset-store.ts keeps in
// this origin's localStorage: theme variables, fonts and menu color.
import { twMerge } from "cn"

import fonts from "../../registry/styles/shadcn/fonts.json"

// The style's cn-menu-translucent classes, from vite.config.ts.
declare const __MENU_TRANSLUCENT__: string

type StoredPreset = {
  config?: Record<string, string>
  css?: string
  fonts?: string[]
}

const PRESET_KEY = "fulldev-ui-preset"

function readPreset(): StoredPreset | undefined {
  try {
    return JSON.parse(localStorage.getItem(PRESET_KEY) ?? "null") ?? undefined
  } catch {
    return undefined
  }
}

// Without a stored preset the docs default applies, which the docs page
// around the preview holds (src/components/preset-head.astro).
function defaultPreset(): StoredPreset | undefined {
  try {
    const style = parent.document.getElementById("fulldev-ui-default-preset")
    if (!style?.dataset.config) return undefined
    return {
      config: JSON.parse(style.dataset.config),
      css: style.textContent ?? "",
    }
  } catch {
    return undefined
  }
}

const currentPreset = () => readPreset() ?? defaultPreset()

// The docs keep their own Geist for a preset in Geist, which the preview does
// not have, so the preview loads Geist from its package.
const geist = fonts.find((font) => font.name === "geist")
const geistFont = (preset: StoredPreset | undefined) =>
  geist && preset?.config?.font === "geist"
    ? {
        css: `:root:root{--font-sans:${geist.family};}`,
        url: `https://cdn.jsdelivr.net/npm/${geist.dependency}/index.css`,
      }
    : undefined

function applyTheme(preset: StoredPreset | undefined) {
  let style = document.getElementById(PRESET_KEY)
  if (!style) {
    style = document.createElement("style")
    style.id = PRESET_KEY
    document.head.append(style)
  }
  const font = geistFont(preset)
  style.textContent = (preset?.css ?? "") + (font?.css ?? "")
  for (const href of [...(preset?.fonts ?? []), ...(font ? [font.url] : [])]) {
    if (document.querySelector(`link[href="${href}"]`)) continue
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = href
    document.head.append(link)
  }
}

// Menus get the classes the shadcn CLI installs for the menu color, the way
// ui.shadcn.com/create previews them.
function applyMenuColor(menuColor = "default") {
  const inverted = menuColor.startsWith("inverted")
  const translucent = menuColor.endsWith("-translucent")
  document
    .querySelectorAll<HTMLElement>(".cn-menu-target, .cn-menu-translucent")
    .forEach((element) => {
      if (element.classList.contains("cn-menu-translucent")) {
        element.dataset.menuSolid ??= element.className
        const solid = element.dataset.menuSolid
        const next = translucent ? twMerge(solid, __MENU_TRANSLUCENT__) : solid
        if (element.className !== next) element.className = next
      }
      if (element.classList.contains("cn-menu-target")) {
        element.classList.toggle("dark", inverted)
      }
    })
}

export function syncPreset() {
  let preset = currentPreset()
  applyTheme(preset)
  applyMenuColor(preset?.config?.menuColor)

  addEventListener("storage", (event) => {
    if (event.storageArea !== localStorage) return
    if (event.key !== PRESET_KEY && event.key !== null) return
    preset = currentPreset()
    applyTheme(preset)
    applyMenuColor(preset?.config?.menuColor)
  })

  // Menus mount when they open.
  let frame = 0
  new MutationObserver(() => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      applyMenuColor(preset?.config?.menuColor)
    })
  }).observe(document.body, { childList: true, subtree: true })
}
