import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import type { AstroIntegration } from 'astro'
import favicons from 'astro-favicons'
import liveCode from 'astro-live-code'
import robotsTxt from 'astro-robots-txt'
import { envField } from 'astro/config'
import type { CollectionEntry } from 'astro:content'
import tailwindcss from 'tailwindcss'
import tailwindcssNesting from 'tailwindcss/nesting'
import { loadEnv } from 'vite'
import tailwindConfig from '../../tailwind.config.ts'

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
        updateConfig,
        injectRoute,
        injectScript,
      }) => {
        // ----------------------
        // Update config
        // ----------------------
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
            // tailwind({
            //   applyBaseStyles: false,
            //   configFile: '../../tailwind.config.mjs',
            // }),
            config?.favicon &&
              config?.company &&
              favicons({
                path: 'favicon',
                masterPicture: config.favicon,
                appName: config.company,
                appShortName: config.company,
                appDescription: config.company,
              }),
          ],
          vite: {
            css: {
              postcss: {
                plugins: [tailwindcss(tailwindConfig), tailwindcssNesting],
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
        // Inject css
        // ----------------------
        config?.css && injectScript('page-ssr', `import "${config?.css}";`)

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
