import type { AstroIntegration } from 'astro'
import fs from 'fs'
import path from 'path'
import { generateColors } from '../lib/generateColors'

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

export default function fulldevIntegration(config: Config): AstroIntegration {
  return {
    name: '/integration',
    hooks: {
      'astro:config:setup': async ({ updateConfig, injectScript }) => {
        // Generate the CSS for the theme
        const css = generateColors(config.colors)
        const colorCssPath = path.resolve(process.cwd(), 'src/styles/theme.css')
        fs.writeFileSync(colorCssPath, css, 'utf-8')
        injectScript('page-ssr', `import "@/styles/theme.css";`)
      },
    },
  }
}
