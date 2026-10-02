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
])
