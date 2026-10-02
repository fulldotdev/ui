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
      "dist/blocks/banner/index.html",
      "dist/blocks/footer/index.html",
      "dist/blocks/header/index.html",
      "dist/components/banner/index.html",
      "dist/components/breadcrumb/index.html",
      "dist/components/pagination/index.html",
      "dist/components/toc/index.html",
    ],
    rules: { "unique-landmark": "off" },
  },
])
