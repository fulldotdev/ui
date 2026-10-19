// Write Fulldev versions of shadcn/ui placeholders, for components whose markup
// exposes state through different attributes than Base UI, and for the few
// classes Fulldev UI deliberately changes. Each cn-fd-* class
// copies a shadcn/ui placeholder per style and rewrites its selectors, so it
// follows upstream style changes. Output: registry/styles/adapted/style-<name>.css
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createStyleMap } from "shadcn/utils"

import { STYLES } from "./styles.mjs"

// Menus highlight items with data-highlighted instead of focus.
const highlighted = [
  [/(^|[\s:])focus:/g, "$1data-highlighted:"],
  [/group-focus\//g, "group-data-highlighted/"],
]

// shadcn/ui's dark themes use the primary as a button fill, too dark for link
// text: most colors fall below 4.5:1, orange to 2.7:1. In dark mode links take
// a lighter step of it; neutral primaries stay as they are. --fd-link carries
// it, so a text color passed to the component still wins. Browsers without
// relative colors keep the primary.
const darkLink = [
  [
    /(^|\s)text-primary(?=\s|$)/g,
    "$1text-(--fd-link,var(--primary)) dark:supports-[color:oklch(from_red_l_c_h)]:[--fd-link:oklch(from_var(--primary)_max(l,0.7)_calc(c*1.2)_h)]",
  ],
]

// Toggle group items take variant and size from the group.
const fromGroup = (attribute) => [
  [/(^|\s)(?=\S)/g, `$1group-data-[${attribute}]/toggle-group:`],
]

const ADAPTED = {
  "cn-fd-checkbox": [
    "cn-checkbox",
    [
      [/data-checked:/g, "checked:"],
      [/aria-checked:/g, "checked:"],
    ],
  ],
  "cn-fd-tabs-trigger": [
    "cn-tabs-trigger",
    [[/data-active:/g, "data-[state=active]:"]],
  ],
  "cn-fd-dropdown-menu-item": ["cn-dropdown-menu-item", highlighted],
  "cn-fd-dropdown-menu-checkbox-item": [
    "cn-dropdown-menu-checkbox-item",
    highlighted,
  ],
  "cn-fd-dropdown-menu-radio-item": [
    "cn-dropdown-menu-radio-item",
    highlighted,
  ],
  "cn-fd-dropdown-menu-sub-trigger": [
    "cn-dropdown-menu-sub-trigger",
    highlighted,
  ],
  "cn-fd-dropdown-menu-shortcut": ["cn-dropdown-menu-shortcut", highlighted],
  "cn-fd-command-group": [
    "cn-command-group",
    [
      [
        /\*\*:\[\[cmdk-group-heading\]\]:/g,
        "[&_[data-slot=command-group-heading]]:",
      ],
    ],
  ],
  // Items read spacing from the group instead of their own attribute.
  "cn-fd-toggle-group-item": [
    "cn-toggle-group-item",
    [
      [
        /(?<!group-)data-\[spacing=0\]:/g,
        "group-data-[spacing=0]/toggle-group:",
      ],
    ],
  ],
  // The arrow is positioned by the component, only its shape follows the style.
  "cn-fd-tooltip-arrow": [
    "cn-tooltip-arrow",
    [[/\S*translate-[xy]-\[[^\]]*\]/g, ""]],
  ],
  "cn-fd-toggle-group-item-variant-outline": [
    "cn-toggle-variant-outline",
    fromGroup("variant=outline"),
  ],
  "cn-fd-toggle-group-item-size-default": [
    "cn-toggle-size-default",
    fromGroup("size=default"),
  ],
  "cn-fd-toggle-group-item-size-sm": [
    "cn-toggle-size-sm",
    fromGroup("size=sm"),
  ],
  "cn-fd-toggle-group-item-size-lg": [
    "cn-toggle-size-lg",
    fromGroup("size=lg"),
  ],
  // Addons pad the input group control, which is not always an <input>.
  "cn-fd-input-group": [
    "cn-input-group",
    [
      [
        /(has-\[>\[data-align=inline-(?:start|end)\]\]:)\[&>input\]/g,
        "$1[&>[data-slot=input-group-control]]",
      ],
    ],
  ],
  // The command input grows with flex-1 instead.
  "cn-fd-command-input": [
    "cn-command-input",
    [[/(^|\s)w-full(?=\s|$)/g, "$1"]],
  ],
  // Keeps the drawer shadow for styles that do not set one.
  "cn-fd-drawer-popup": [
    "cn-drawer-popup",
    [(value) => (/(^|\s)shadow-/.test(value) ? value : `${value} shadow-lg`)],
  ],
  // Choice cards also react to a native checked checkbox.
  "cn-fd-field-label": [
    "cn-field-label",
    [[/(^|[\s:])has-data-checked:/g, "$1has-[[data-checked],:checked]:"]],
  ],
  "cn-fd-select-item": [
    "cn-select-item",
    [...highlighted, [/\*:\[span\]:last:/g, "*:data-[slot=select-item-text]:"]],
  ],
  // The description keeps the full destructive color, like FieldError. At 90%
  // it falls below 4.5:1 on the card.
  "cn-fd-alert-variant-destructive": [
    "cn-alert-variant-destructive",
    [[/(^|[\s:])text-destructive\/\d+(?=\s|$)/g, "$1text-destructive"]],
  ],
  // Destructive text on its own tint is about 4:1. Mixing in a fifth of the
  // foreground keeps 4.5:1, also on hover, as the native Liquid button does.
  // Mixed in oklab, the text stays red; oklch turns it orange in dark mode.
  "cn-fd-button-variant-destructive": [
    "cn-button-variant-destructive",
    [
      [
        /(^|\s)text-destructive(?=\s|$)/g,
        "$1text-[color-mix(in_oklab,var(--destructive)_80%,var(--foreground))]",
      ],
    ],
  ],
  "cn-fd-button-variant-link": ["cn-button-variant-link", darkLink],
  "cn-fd-badge-variant-link": ["cn-badge-variant-link", darkLink],
}

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8")
mkdirSync(new URL("../registry/styles/adapted/", import.meta.url), {
  recursive: true,
})

// Adapted placeholders whose rewrites changed the upstream classes in a style.
const matched = new Set()

for (const style of STYLES) {
  const map = createStyleMap(
    read(`../registry/styles/shadcn/style-${style}.css`)
  )
  const rules = Object.entries(ADAPTED).flatMap(([name, [from, rewrites]]) => {
    if (!map[from]) return []
    const classes = rewrites
      .reduce(
        (value, rewrite) =>
          typeof rewrite === "function"
            ? rewrite(value)
            : value.replace(rewrite[0], rewrite[1]),
        map[from]
      )
      .replace(/\s+/g, " ")
      .trim()
    if (classes !== map[from].replace(/\s+/g, " ").trim()) matched.add(name)
    return [`  .${name} {\n    @apply ${classes};\n  }`]
  })
  writeFileSync(
    new URL(`../registry/styles/adapted/style-${style}.css`, import.meta.url),
    `/* Generated by scripts/registry-adapt.mjs. Do not edit. */\n.style-${style} {\n${rules.join("\n\n")}\n}\n`
  )
}

// A rewrite that matches in no style means upstream renamed the selector.
const unmatched = Object.keys(ADAPTED).filter((name) => !matched.has(name))
if (unmatched.length) {
  console.error(
    `Adapted placeholders with no matching upstream classes: ${unmatched.join(", ")}`
  )
  process.exit(1)
}
