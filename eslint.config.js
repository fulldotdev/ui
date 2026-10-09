import js from "@eslint/js"
import astro from "eslint-plugin-astro"
import reactHooks from "eslint-plugin-react-hooks"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["dist", ".astro", ".netlify", ".dev", "public/r"]),
  {
    files: ["**/*.{js,mjs,ts}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    // The React port, with the same rules as the shadcn/ui React templates.
    files: ["react/**/*.tsx"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: { globals: globals.browser },
  },
  {
    // Official shadcn/ui source, kept as the CLI installs it.
    files: ["react/src/components/ui/carousel.tsx"],
    rules: { "react-hooks/set-state-in-effect": "off" },
  },
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],
  {
    // A site installs whole components, so tools such as knip can only tell
    // which ones it uses when components import each other through index.ts.
    files: ["**/*.{js,mjs,ts,tsx,astro}"],
    // The React gallery and its build read from the repository.
    ignores: ["react/gallery/**", "react/vite.config.ts"],
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
              regex: "(^|/)\\.\\./",
              message:
                "Import through @/ instead of ../, and another component through its index",
            },
          ],
        },
      ],
    },
  },
])
