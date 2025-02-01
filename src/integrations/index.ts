import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import type { AstroIntegration } from 'astro'
import liveCode from 'astro-live-code'
import robotsTxt from 'astro-robots-txt'
import { envField } from 'astro/config'
import { loadEnv } from 'vite'

interface Config {
  favicon?: string
  company?: string
  css?: string
  injectRoutes?: boolean
  cloudcannon?: boolean
  cart?: boolean
  overrides?: {
    [k: string]: string
  }
}

export default function fulldevIntegration(config: Partial<Config> | undefined): AstroIntegration {
  return {
    name: '/integration',
    hooks: {
      'astro:config:setup': async ({ updateConfig, injectRoute, injectScript }) => {
        // ----------------------
        // Update config
        // ----------------------
        updateConfig({
          site: loadEnv(process.env.NODE_ENV as any, process.cwd(), '').URL,
          env: {
            schema: {
              URL: envField.string({
                context: 'client',
                access: 'public',
                optional: true,
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
          integrations: [
            mdx(),
            sitemap(),
            robotsTxt(),
            liveCode({
              layout: '/src/components/Code.astro',
            }),
          ],
          vite: {
            resolve: {
              alias: {
                ...config?.overrides,
              },
            },
          },
        })

        // ----------------------
        // Inject Favicon
        // ----------------------
        // config?.favicon &&
        //   config?.company &&
        //   updateConfig({
        //     integrations: [
        //       favicons({
        //         path: 'favicon',
        //         masterPicture: config.favicon,
        //         appName: config.company,
        //         appShortName: config.company,
        //         appDescription: config.company,
        //       }),
        //     ],
        //   })

        // ----------------------
        // Inject routes
        // ----------------------
        if (config?.injectRoutes) {
          injectRoute({
            pattern: '/[...page]',
            entrypoint: 'fulldev-ui/pages/[...page].astro',
          })
          injectRoute({
            pattern: '/[...category]',
            entrypoint: 'fulldev-ui/pages/[...category].astro',
          })
          injectRoute({
            pattern: '/[...doc]',
            entrypoint: 'fulldev-ui/pages/[...doc].astro',
          })
          injectRoute({
            pattern: '/[...job]',
            entrypoint: 'fulldev-ui/pages/[...job].astro',
          })
          injectRoute({
            pattern: '/[...post]',
            entrypoint: 'fulldev-ui/pages/[...post].astro',
          })
          injectRoute({
            pattern: '/[...product]',
            entrypoint: 'fulldev-ui/pages/[...product].astro',
          })
        }

        // ----------------------
        // Inject css
        // ----------------------
        // config?.css && injectScript('page-ssr', `import "${config?.css}";`)

        // ----------------------
        // merge Cloudcannon configs
        // ----------------------

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
      'astro:build:done': async () => {
        // if (config?.cloudcannon) {
        //   const __dirname = path.dirname(new URL(import.meta.url).pathname)
        //   const libDir = path.join(__dirname, '../../cloudcannon.config.yml')
        //   const userDir = path.join(process.cwd(), 'cloudcannon.config.yml')
        //   const libConfig = yaml.load(
        //     fs.readFileSync(path.resolve(libDir), 'utf8')
        //   )
        //   const userConfig = yaml.load(
        //     fs.readFileSync(path.resolve(userDir), 'utf8')
        //   )
        //   const mergedConfig = assign(libConfig || {}, userConfig || {})
        //   const yamlContent = yaml.dump(mergedConfig)
        //   await fs.promises.writeFile(userDir, yamlContent, 'utf8')
        // }
      },
    },
  }
}
