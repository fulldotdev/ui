import viteYaml from '@rollup/plugin-yaml'
import type { AstroIntegration } from 'astro'
import favicons from 'astro-favicons'
import merge from 'deepmerge'
import fs from 'fs/promises'
import yaml from 'js-yaml'
import path from 'path'
import virtual from 'vite-plugin-virtual'
import { generateRadixColors } from './generate-colors'

type Color = {
  background: Parameters<typeof generateRadixColors>[0]['background']
  base: Parameters<typeof generateRadixColors>[0]['gray']
  brand: Parameters<typeof generateRadixColors>[0]['accent']
}

interface Config {
  favicon?: string
  company?: string
  css?: string
  injectRoutes?: boolean
  overrideComponents?: boolean
  generateImageEntries?: boolean
  colors: {
    theme: 'light' | 'dark'
    light?: Color | undefined
    dark?: Color | undefined
  }
}

const defaultConfig: Config = {
  colors: {
    theme: 'light',
    light: {
      background: '#fff',
      base: '#000',
      brand: '#000',
    },
  },
  generateImageEntries: false,
}

export default function fulldevIntegration(
  userConfig?: Partial<Config> | undefined
): AstroIntegration {
  const config = merge(defaultConfig, userConfig ?? {})

  return {
    name: '/integration',
    hooks: {
      'astro:config:setup': async ({
        config: astroConfig,
        updateConfig,
        injectScript,
        injectRoute,
      }) => {
        // ----------------------
        // Inject favicon integration
        // ----------------------
        config.favicon &&
          config.company &&
          updateConfig({
            integrations: [
              favicons({
                path: 'favicon',
                masterPicture: config.favicon,
                appName: config.company,
                appShortName: config.company,
              }),
            ],
          })
        // ----------------------
        // Inject css
        // ----------------------
        config?.css && injectScript('page-ssr', `import "${config?.css}";`)

        const generateCss = (
          defaultTheme: 'light' | 'dark',
          theme: 'light' | 'dark',
          color: Color
        ) => {
          const { background, base, brand } = color
          const generated = generateRadixColors({
            background,
            appearance: theme,
            gray: base,
            accent: brand,
          })

          const scaleToString = (
            scale: any,
            palette: 'base' | 'brand',
            alpha?: boolean | undefined
          ) =>
            scale
              .map(
                (color: any, i: any) =>
                  `--${palette}-${alpha ? 'a' : ''}${i + 1}: ${color};`
              )
              .join('\n')

          const baseString = scaleToString(generated.grayScale, 'base', false)
          const baseAlphaString = scaleToString(
            generated.grayScaleAlpha,
            'base',
            true
          )
          const brandString = scaleToString(
            generated.accentScale,
            'brand',
            false
          )
          const brandAlphaString = scaleToString(
            generated.accentScaleAlpha,
            'brand',
            true
          )
          const brandContrastString = `--brand-contrast: ${generated.accentContrast};`
          const baseContrastString = `--base-contrast: ${generated.accentContrast};`
          const baseBackgroundString = `--base-background: ${generated.background};`
          const brandBackgroundString = `--brand-background: ${generated.background};`
          const colorSchemeString = `--color-scheme: ${theme};`

          const css = `${defaultTheme == theme ? ':root, ' : ''} .theme-${theme}  {
  ${baseString}
  ${baseAlphaString}
  ${baseContrastString}
  ${baseBackgroundString}
  ${brandString}
  ${brandAlphaString}
  ${brandContrastString}
  ${brandBackgroundString}
  ${colorSchemeString}
  }`
          return css
        }

        const lightCss =
          (config.colors.light &&
            generateCss(config.colors.theme, 'light', config.colors.light)) ||
          ''
        const darkCss =
          (config.colors.dark &&
            generateCss(config.colors.theme, 'dark', config.colors.dark)) ||
          ''

        const css = lightCss + '\n' + darkCss

        updateConfig({
          vite: {
            plugins: [
              viteYaml(),
              virtual({
                'virtual:astro/config': `export default ${JSON.stringify(astroConfig)}`,
                'virtual:fulldev-ui/config': `export default ${JSON.stringify({
                  ...config,
                })}`,
                'virtual:colors.css': css,
              }) as any,
            ],
            css: {
              preprocessorOptions: {
                scss: {
                  api: 'modern',
                },
              },
            },
          },
        })

        injectScript('page-ssr', `import "virtual:colors.css";`)

        // ----------------------
        // Generate image YAML files
        // ----------------------
        if (config.generateImageEntries) {
          const srcDir = path.join(process.cwd(), 'src')
          const filesDir = path.join(srcDir, 'images')
          const entriesDir = path.join(srcDir, 'content', 'images')

          try {
            await fs.mkdir(filesDir, { recursive: true })
            await fs.mkdir(entriesDir, { recursive: true })

            const files = await fs.readdir(filesDir)
            files.forEach(async (file) => {
              const filename = path.parse(file).name
              const yamlPath = path.join(entriesDir, `${filename}.yml`)

              try {
                await fs.access(yamlPath)
              } catch {
                const yamlContent = yaml.dump({
                  alt: '',
                })
                await fs.writeFile(yamlPath, yamlContent, 'utf8')
              }
            })
          } catch (error) {
            console.error('Error generating image YAML files:', error)
          }
        }

        // ----------------------
        // Inject routes
        // ----------------------
        if (config.injectRoutes) {
          const pages = import.meta.glob('/src/pages/**/*.astro')
          !pages['/src/pages/[...page].astro'] &&
            injectRoute({
              pattern: '/[...page]',
              entrypoint: 'fulldev-ui/[...page].astro',
            })
        }
      },
    },
  }
}
