import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import viteYaml from '@rollup/plugin-yaml'
import type { AstroIntegration } from 'astro'
import favicons from 'astro-favicons'
// @ts-ignore
import tailwindNesting from '@tailwindcss/nesting'
// @ts-ignore
import liveCode from 'astro-live-code'
import robotsTxt from 'astro-robots-txt'
import { envField } from 'astro/config'
import type { CollectionEntry } from 'astro:content'
import { loadEnv } from 'vite'
import virtual from 'vite-plugin-virtual'

interface Config {
  favicon?: string
  company?: string
  css?: string
  basePreset?: CollectionEntry<'presets'>['id']
  injectRoutes?: boolean
}

export default function fulldevIntegration(
  config?: Partial<Config> | undefined
): AstroIntegration {
  return {
    name: '/integration',
    hooks: {
      'astro:config:setup': async ({
        config: astroConfig,
        updateConfig,
        injectRoute,
      }) => {
        // ----------------------
        // Update config
        // ----------------------
        config?.favicon &&
          config?.company &&
          updateConfig({
            site: loadEnv(process.env.NODE_ENV as any, process.cwd(), '').URL,
            experimental: {
              contentLayer: true,
              env: {
                schema: {
                  URL: envField.string({
                    context: 'client',
                    access: 'public',
                  }),
                  STRIPE_RESTRICTED_KEY: envField.string({
                    context: 'client',
                    access: 'public',
                    optional: true,
                  }),
                  STRIPE_SECRET_KEY: envField.string({
                    context: 'server',
                    access: 'secret',
                    optional: true,
                  }),
                },
                validateSecrets: true,
              },
            },
            integrations: [
              mdx(),
              sitemap(),
              robotsTxt(),
              liveCode({
                layout: '/src/components/Code.astro',
              }),
              tailwind({
                applyBaseStyles: false,
              }),
              favicons({
                path: 'favicon',
                masterPicture: config.favicon,
                appName: config.company,
                appShortName: config.company,
                appDescription: config.company,
              }),
            ],
            vite: {
              plugins: [
                viteYaml(),
                virtual({
                  'virtual:astro/config': `export default ${JSON.stringify(astroConfig)}`,
                  'virtual:fulldev-ui/config': `export default ${JSON.stringify(
                    {
                      ...config,
                    }
                  )}`,
                }),
              ],
              css: {
                postcss: {
                  plugins: [tailwindNesting],
                },
              },
            },
          })

        // ----------------------
        // Inject routes
        // ----------------------
        if (config?.injectRoutes) {
          const pages = import.meta.glob('/src/pages/**/*.astro')
          !pages['/src/pages/[...page].astro'] &&
            injectRoute({
              pattern: '/[...page]',
              entrypoint: 'fulldev-ui/[...page].astro',
            })
        }

        // ----------------------
        // Generate image YAML files
        // ----------------------
        // if (config.generateImageEntries) {
        //   const srcDir = path.join(process.cwd(), 'src')
        //   const filesDir = path.join(srcDir, 'images')
        //   const entriesDir = path.join(srcDir, 'content', 'images')

        //   try {
        //     await fs.mkdir(filesDir, { recursive: true })
        //     await fs.mkdir(entriesDir, { recursive: true })

        //     const files = await fs.readdir(filesDir)
        //     files.forEach(async (file) => {
        //       const filename = path.parse(file).name
        //       const yamlPath = path.join(entriesDir, `${filename}.yml`)

        //       try {
        //         await fs.access(yamlPath)
        //       } catch {
        //         const yamlContent = yaml.dump({
        //           alt: '',
        //         })
        //         await fs.writeFile(yamlPath, yamlContent, 'utf8')
        //       }
        //     })
        //   } catch (error) {
        //     console.error('Error generating image YAML files:', error)
        //   }
        // }
      },
    },
  }
}
