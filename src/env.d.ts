/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "fulldev:config" {
  interface Config {
    site: string
    name: string
    title: string
    description: string
    image: {
      src: string
      alt?: string
    }
    logo: string
    defaultLocale: string
    locales: string[]
    fonts: {
      base: string
      heading?: string
    }
  }

  const config: Config
  export default config
}
