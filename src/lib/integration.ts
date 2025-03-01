import type { AstroIntegration } from 'astro'

interface Config {
  colors: {
    primary: string
    base: string
    lightBackground: string
    darkBackground: string
  }
  slugs: {
    collections: string
    persons: string
    articles: string
    products: string
    projects: string
  }
}

export default function fulldevIntegration(config?: Config): AstroIntegration {
  return {
    name: '/integration',
    hooks: {
      'astro:config:setup': async ({ updateConfig, injectScript }) => {
        injectScript('page-ssr', `import "@/styles/theme.css";`)
      },
    },
  }
}
