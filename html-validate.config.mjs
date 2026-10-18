import {
  builtinRules,
  defineFlatConfig,
  esmResolver,
  FlatCompat,
} from "html-validate"

const compat = new FlatCompat([esmResolver()])

// text-content counts only a button's text, aria-label and aria-labelledby as
// its name. Browsers also name it with a <label for> or a wrapping <label>,
// the way shadcn/ui switches and radio items are named. This version reports
// the same, except a button with such a label. A label can follow its button,
// so buttons are checked once the document is complete.
class TextContent extends builtinRules["text-content"] {
  #buttons = []

  setup() {
    super.setup()
    this.on("dom:ready", ({ document }) => {
      for (const button of this.#buttons.splice(0)) {
        if (!hasLabel(document, button)) super.validateAccessible(button)
      }
    })
  }

  validateAccessible(node) {
    this.#buttons.push(node)
  }
}

const labelable = "button, input, meter, output, progress, select, textarea"

function hasLabel(document, node) {
  const id = node.getAttributeValue("id")
  const wrapping = node.closest("label")
  const labels = [
    ...(id ? document.querySelectorAll(`label[for="${id}"]`) : []),
    ...(wrapping &&
    !wrapping.hasAttribute("for") &&
    wrapping.querySelector(labelable) === node
      ? [wrapping]
      : []),
  ]
  return labels.some((label) => label.textContent.trim())
}

export default defineFlatConfig([
  {
    // The presets that Fulldev sites use in their .htmlvalidate.json.
    files: ["**/*.html"],
    ...(await compat.config({
      elements: ["html5"],
      extends: ["html-validate:standard", "html-validate:a11y"],
    })),
    plugins: [
      { name: "fulldev", rules: { "fulldev/text-content": TextContent } },
    ],
  },
  {
    files: ["**/*.html"],
    rules: { "text-content": "off", "fulldev/text-content": "error" },
  },
  {
    // These docs pages render a landmark component several times, and next to
    // the page's own breadcrumb or table of contents, so the landmark names
    // repeat. A site renders each of these landmarks once.
    files: [
      "dist/blocks/banner/index.html",
      "dist/blocks/footer/index.html",
      "dist/blocks/header/index.html",
      "dist/components/banner/index.html",
      "dist/components/breadcrumb/index.html",
      "dist/components/navigation-menu/index.html",
      "dist/components/pagination/index.html",
      "dist/components/sidebar/index.html",
      "dist/components/toc/index.html",
    ],
    rules: { "unique-landmark": "off" },
  },
  {
    // The official sidebar example is a full app layout: its SidebarInset is
    // the app's main element, rendered here inside the docs page's own main.
    files: ["dist/components/sidebar/index.html"],
    rules: { "no-multiple-main": "off", "element-permitted-content": "off" },
  },
  {
    // ItemGroup and Item follow shadcn/ui: ARIA list roles on div and a, so
    // an item can be a link.
    files: ["dist/components/item/index.html"],
    rules: {
      "prefer-native-element": ["error", { exclude: ["list", "listitem"] }],
    },
  },
])
