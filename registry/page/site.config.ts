// Astro supplies SITE from astro.config; SITE_NAME is the project's real name.
const site = import.meta.env.SITE
const name = import.meta.env.SITE_NAME

if (!site || !name) {
  throw new Error(
    "Configure site in astro.config and SITE_NAME in your environment before building the page foundation."
  )
}

export const siteConfig = {
  site,
  name,
  i18n: { defaultLocale: "en", locales: ["en"], prefixDefaultLocale: false },
}
