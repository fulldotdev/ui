// @ts-nocheck
import js from "@eslint/js"
import astro from "eslint-plugin-astro"
import tsParser from "@typescript-eslint/parser"
import tsPlugin from "@typescript-eslint/eslint-plugin"

export default [
  {
    ignores: [
      ".astro/**",
      "dist/**",
      "node_modules/**",
      "public/r/**",
      "*.min.js",
    ],
  },
  js.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["**/*.test.ts"],
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
      },
    },
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      "astro/no-set-html-directive": "off",
      "astro/no-conflict-set-directives": "off",
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-redeclare": "off",
      "no-case-declarations": "warn",
    },
  },
]
