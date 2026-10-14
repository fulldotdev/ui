// Apply the preset picked in the docs, which src/lib/preset-store.ts keeps in
// this origin's localStorage: theme variables, fonts and menu color.
import { twMerge } from "cn"

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
  let preset = readPreset()
  applyTheme(preset)
  applyMenuColor(preset?.config?.menuColor)

  addEventListener("storage", (event) => {
    if (event.storageArea !== localStorage) return
    if (event.key !== PRESET_KEY && event.key !== null) return
    preset = readPreset()
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
