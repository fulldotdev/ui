import { defineFlatConfig, esmResolver, FlatCompat } from "html-validate"

const compat = new FlatCompat([esmResolver()])

export default defineFlatConfig([
  {
    // The presets that Fulldev sites use in their .htmlvalidate.json.
    files: ["**/*.html"],
    ...(await compat.config({
      elements: ["html5"],
      extends: ["html-validate:standard", "html-validate:a11y"],
    })),
  },
  {
    // These docs pages render a landmark component several times, and next to
    // the page's own breadcrumb or table of contents, so the landmark names
    // repeat. A site renders each of these landmarks once.
    files: [
      "dist/astro/blocks/banner/index.html",
      "dist/astro/blocks/footer/index.html",
      "dist/astro/blocks/header/index.html",
      "dist/astro/components/banner/index.html",
      "dist/astro/components/breadcrumb/index.html",
      "dist/astro/components/navigation-menu/index.html",
      "dist/astro/components/pagination/index.html",
      "dist/astro/components/sidebar/index.html",
      "dist/astro/components/toc/index.html",
    ],
    rules: { "unique-landmark": "off" },
  },
  {
    // The official sidebar example is a full app layout: its SidebarInset is
    // the app's main element, rendered here inside the docs page's own main.
    files: ["dist/astro/components/sidebar/index.html"],
    rules: { "no-multiple-main": "off", "element-permitted-content": "off" },
  },
  {
    // ItemGroup and Item follow shadcn/ui: ARIA list roles on div and a, so
    // an item can be a link.
    files: ["dist/astro/components/item/index.html"],
    rules: {
      "prefer-native-element": ["error", { exclude: ["list", "listitem"] }],
    },
  },
])
