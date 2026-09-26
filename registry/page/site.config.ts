// The production URL comes from `site` in astro.config and locales from its
// `i18n` option. Only the website name lives here.
export const siteConfig = {
  name: "",
}

if (!siteConfig.name) {
  throw new Error("Set your website name in src/site.config.ts.")
}
