import js from "@eslint/js"
import astro from "eslint-plugin-astro"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["dist", ".astro", ".netlify", "public/r"]),
  {
    files: ["**/*.{js,mjs,ts}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],
  {
    // A site installs whole components, so tools such as knip can only tell
    // which ones it uses when components import each other through index.ts.
    files: ["**/*.{js,mjs,ts,astro}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^@/components/ui/[^/]+/",
              message:
                "Import another component through its index, and a file of the same component with ./",
            },
            {
              regex: "^\\.\\./",
              message:
                "Import through @/ instead of ../, and another component through its index",
            },
          ],
        },
      ],
    },
  },
])
