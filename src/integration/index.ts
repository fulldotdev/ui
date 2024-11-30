import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import type { AstroIntegration } from 'astro'
import favicons from 'astro-favicons'
import liveCode from 'astro-live-code'
import robotsTxt from 'astro-robots-txt'
import { envField } from 'astro/config'
import tailwindcss from 'tailwindcss'
import tailwindcssNesting from 'tailwindcss/nesting'
import { loadEnv } from 'vite'
import virtual from 'vite-plugin-virtual'
import tailwindConfig from '../../tailwind.config.ts'

interface Config {
  favicon?: string
  company?: string
  css?: string
  injectRoutes?: boolean
  components?: {
    Avatar?: string
    Avatars?: string
    Badge?: string
    Badges?: string
    Button?: string
    Buttons?: string
    Channel?: string
    Channels?: string
    Checkbox?: string
    Form?: string
    Gallery?: string
    Head?: string
    Heading?: string
    Icon?: string
    Image?: string
    Input?: string
    Label?: string
    Lead?: string
    Link?: string
    Links?: string
    List?: string
    Logo?: string
    Menu?: string
    Paragraph?: string
    Prose?: string
    Rating?: string
    Search?: string
    Select?: string
    Sidebar?: string
    Social?: string
    Socials?: string
    Subheader?: string
    Switch?: string
    Table?: string
    Tagline?: string
    Text?: string
    Textarea?: string
    Themer?: string
    Toc?: string
    Writeup?: string
  }
  blocks?: {
    Banner?: string
    Categories?: string
    Colleagues?: string
    Contact?: string
    Content?: string
    Cta?: string
    Excerpt?: string
    Features?: string
    Footer?: string
    Header?: string
    Hero?: string
    Intro?: string
    Jobs?: string
    Posts?: string
    Prices?: string
    Product?: string
    Products?: string
    Reviews?: string
  }
  layouts?: {
    Layout?: string
    CategoryLayout?: string
    DocLayout?: string
    PageLayout?: string
    PostLayout?: string
    ProductLayout?: string
  }
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

        const getVirtualModules = (
          object: object | undefined = {},
          prefix: 'components' | 'blocks' | 'layouts'
        ) =>
          Object.fromEntries(
            Object.entries(object).map(([name, path]) => [
              `fulldev-ui/${prefix}/${name}`,
              `export { default } from '${path}';`,
            ])
          )

        console.log(getVirtualModules(config?.components, 'components'))

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
          ],
          vite: {
            plugins: [
              virtual({
                ...getVirtualModules(config?.components, 'components'),
                ...getVirtualModules(config?.blocks, 'blocks'),
                ...getVirtualModules(config?.layouts, 'layouts'),
              }),
            ],
            css: {
              postcss: {
                plugins: [tailwindcss(tailwindConfig), tailwindcssNesting],
              },
            },
          },
        })

        // ----------------------
        // Inject Favicon
        // ----------------------
        config?.favicon &&
          config?.company &&
          updateConfig({
            integrations: [
              favicons({
                path: 'favicon',
                masterPicture: config.favicon,
                appName: config.company,
                appShortName: config.company,
                appDescription: config.company,
              }),
            ],
          })
        // ----------------------
        // Inject routes
        // ----------------------
        if (config?.injectRoutes) {
          injectRoute({
            pattern: '/[...page]',
            entrypoint: 'fulldev-ui/pages/[...page].astro',
          })
          injectRoute({
            pattern: '/[...doc]',
            entrypoint: 'fulldev-ui/pages/[...doc].astro',
          })
          injectRoute({
            pattern: '/[...category]',
            entrypoint: 'fulldev-ui/pages/[...category].astro',
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
