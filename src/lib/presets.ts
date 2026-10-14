// Docs only: shadcn/ui presets for the create page and the docs previews.
// Theme and font data are copied from shadcn/ui, see registry/styles/README.md.
import {
  decodePreset,
  DEFAULT_PRESET_CONFIG,
  encodePreset,
  PRESET_STYLES,
  type PresetConfig,
} from "shadcn/preset"

const data = import.meta.glob<unknown>("/registry/styles/shadcn/*.json", {
  import: "default",
  eager: true,
})
const fonts = data["/registry/styles/shadcn/fonts.json"] as {
  name: string
  title: string
  type: string
  family: string
  dependency: string
}[]
const themes = data["/registry/styles/shadcn/themes.json"]

export type { PresetConfig }
export { decodePreset, encodePreset }

type Vars = Record<string, string>
type Theme = {
  name: string
  title: string
  cssVars: { light: Vars; dark: Vars }
}

const themeList = themes as Theme[]

const BASE_COLORS = [
  "neutral",
  "stone",
  "zinc",
  "mauve",
  "olive",
  "mist",
  "taupe",
]

export const RADII = [
  { name: "default", label: "Default", value: "" },
  { name: "none", label: "None", value: "0" },
  { name: "small", label: "Small", value: "0.45rem" },
  { name: "medium", label: "Medium", value: "0.625rem" },
  { name: "large", label: "Large", value: "0.875rem" },
]

export const MENU_ACCENTS = [
  { name: "subtle", label: "Subtle" },
  { name: "bold", label: "Bold" },
]

export const MENU_COLORS = [
  { name: "default", label: "Default" },
  { name: "inverted", label: "Inverted" },
  { name: "default-translucent", label: "Default Translucent" },
  { name: "inverted-translucent", label: "Inverted Translucent" },
]

const isTranslucent = (menuColor: string) => menuColor.endsWith("-translucent")

export const STYLE_OPTIONS = PRESET_STYLES.map((name) => ({
  name,
  label: name[0].toUpperCase() + name.slice(1),
}))

export const FONTS = fonts

// Fulldev UI serves the Base UI library and uses Lucide icons.
// The docs default: the preset closest to the full.dev websites (bJfEY5IW in
// fulldotdev/fulldev packages/web/DESIGN.md) with translucent menus. Installs
// keep the theme of the registry's init item.
export const DEFAULT_CONFIG: PresetConfig = {
  ...DEFAULT_PRESET_CONFIG,
  style: "vega",
  baseColor: "stone",
  theme: "blue",
  chartColor: "stone",
  font: "geist",
  fontHeading: "inherit",
  radius: "large",
  menuAccent: "subtle",
  menuColor: "default-translucent",
  iconLibrary: "lucide",
} as PresetConfig

// ui.shadcn.com: Nova, neutral and the default radius, in Geist.
const SHADCN_CONFIG: PresetConfig = {
  ...DEFAULT_PRESET_CONFIG,
  style: "nova",
  font: "geist",
  iconLibrary: "lucide",
} as PresetConfig

// The presets the docs switcher offers, besides the visitor's own.
export const NAMED_PRESETS = [
  { id: "fulldev", label: "Fulldev", config: DEFAULT_CONFIG },
  { id: "shadcn", label: "shadcn/ui", config: SHADCN_CONFIG },
]

export const themeOptions = (baseColor: string) =>
  themeList
    .filter(
      (theme) => theme.name === baseColor || !BASE_COLORS.includes(theme.name)
    )
    .map(({ name, title }) => ({ name, label: title }))

export const baseColorOptions = BASE_COLORS.map((name) => ({
  name,
  label: themeList.find((theme) => theme.name === name)?.title ?? name,
}))

// Keep the options valid together, with the same rules as ui.shadcn.com/create.
export function normalizeConfig(input: PresetConfig): PresetConfig {
  // Older preset codes can name a base color the current options lack (gray).
  const config = BASE_COLORS.includes(input.baseColor)
    ? input
    : ({ ...input, baseColor: "neutral" } as PresetConfig)
  // Theme and chart color depend on the base color.
  const valid = themeOptions(config.baseColor).map((option) => option.name)
  const pick = (name: string | undefined) =>
    (name && valid.includes(name)
      ? name
      : config.baseColor) as PresetConfig["theme"]
  // Lyra and Sera have no radius, Rhea has no large radius.
  const radius = ["lyra", "sera"].includes(config.style)
    ? "none"
    : config.style === "rhea" && config.radius === "large"
      ? "default"
      : config.radius
  return {
    ...config,
    theme: pick(config.theme),
    chartColor: pick(config.chartColor),
    fontHeading:
      config.fontHeading === config.font ? "inherit" : config.fontHeading,
    radius,
    // Translucent menus keep the subtle accent.
    menuAccent: isTranslucent(config.menuColor) ? "subtle" : config.menuAccent,
  } as PresetConfig
}

const sample = <T>(items: T[]) =>
  items[Math.floor(Math.random() * items.length)]

// A random preset from the options Fulldev UI supports.
export function randomConfig(): PresetConfig {
  const baseColor = sample(BASE_COLORS)
  const themes = themeOptions(baseColor).map((option) => option.name)
  const font = sample(fonts).name
  return {
    ...DEFAULT_CONFIG,
    style: sample(STYLE_OPTIONS).name,
    baseColor,
    theme: sample(themes),
    chartColor: sample(themes),
    font,
    fontHeading: Math.random() < 0.5 ? "inherit" : sample(fonts).name,
    radius: sample(RADII).name,
    menuAccent: sample(MENU_ACCENTS).name,
    menuColor: sample(MENU_COLORS).name,
  } as PresetConfig
}

const findTheme = (name: string) =>
  themeList.find((theme) => theme.name === name)

// Same rules as shadcn/ui's buildRegistryTheme.
function themeVars(config: PresetConfig) {
  const base = findTheme(config.baseColor)
  const theme = findTheme(config.theme) ?? base
  const light: Vars = { ...base?.cssVars.light, ...theme?.cssVars.light }
  const dark: Vars = { ...base?.cssVars.dark, ...theme?.cssVars.dark }

  const chart = findTheme(config.chartColor ?? config.theme)
  for (let i = 1; i <= 5; i++) {
    const key = `chart-${i}`
    if (chart?.cssVars.light[key]) light[key] = chart.cssVars.light[key]
    if (chart?.cssVars.dark[key]) dark[key] = chart.cssVars.dark[key]
  }

  if (config.menuAccent === "bold") {
    light.accent = light.primary
    light["accent-foreground"] = light["primary-foreground"]
    dark.accent = dark.primary
    dark["accent-foreground"] = dark["primary-foreground"]
  }

  const radius = RADII.find((item) => item.name === config.radius)?.value
  if (radius) light.radius = radius

  return { light, dark }
}

// The colors a preset card shows: primary, foreground and muted, in light mode.
export const presetSwatches = (config: PresetConfig) => {
  const { light } = themeVars(config)
  return [light.primary, light.foreground, light.muted]
}

const findFont = (name: string) => fonts.find((font) => font.name === name)

const fontUrl = (dependency: string) =>
  `https://cdn.jsdelivr.net/npm/${dependency}/index.css`

// CSS for the whole docs page. :root:root wins over the site theme. The dark
// variables also go to .dark elements inside the page, such as inverted menus.
// Geist is the site's own font (Geist 1.7.2 with the full.dev stylistic sets,
// astro.config.ts), so a preset in Geist keeps it instead of loading another.
const siteFont = (name: string) =>
  name === "geist" ? undefined : findFont(name)

export function presetCss(config: PresetConfig) {
  const { light, dark } = themeVars(config)
  const body = siteFont(config.font)
  const heading =
    config.fontHeading === "inherit" ? body : siteFont(config.fontHeading)
  const fontVars: Vars = {}
  if (body) fontVars["font-sans"] = body.family
  if (heading) fontVars["font-heading"] = heading.family
  const declarations = (vars: Vars) =>
    Object.entries(vars)
      .map(([key, value]) => `--${key}:${value};`)
      .join("")
  return `:root:root{${declarations({ ...light, ...fontVars })}}:root:root.dark,:root:root .dark{${declarations(dark)}}`
}

export function presetFontUrls(config: PresetConfig) {
  const names = new Set([config.font, config.fontHeading])
  return [...names]
    .map((name) => siteFont(name)?.dependency)
    .filter((dependency): dependency is string => Boolean(dependency))
    .map(fontUrl)
}

export const presetCode = (config: PresetConfig) => encodePreset(config)
