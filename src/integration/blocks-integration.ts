import type { AstroIntegration } from 'astro'
import merge from 'deepmerge'
import virtual from 'vite-plugin-virtual'
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
import { generateRadixColors } from './generate-colors'

type Color = {
  background: Parameters<typeof generateRadixColors>[0]['background']
  base: Parameters<typeof generateRadixColors>[0]['gray']
  brand: Parameters<typeof generateRadixColors>[0]['accent']
}

interface Config {
  colors: {
    theme: 'light' | 'dark'
    light?: Color
    dark?: Color
  }
  css?: string
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
}

export default function fulldevBlocksIntegration(
  userConfig: Partial<Config> = {}
): AstroIntegration {
  const config = merge(defaultConfig, userConfig)
  return {
    name: '/integration',
    hooks: {
      'astro:config:setup': async ({
        injectRoute,
        injectScript,
        updateConfig,
      }) => {
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
            alpha?: boolean
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

          const css = `${defaultTheme == theme ? ':root, ' : ''} .theme-${theme}  {
  ${baseString}
  ${baseAlphaString}
  ${baseContrastString}
  ${baseBackgroundString}
  ${brandString}
  ${brandAlphaString}
  ${brandContrastString}
  ${brandBackgroundString}
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
              virtual({
                'virtual:colors.css': css,
              }) as any,
            ],
          },
        })

        injectScript('page-ssr', `import "virtual:colors.css";`)

        // ----------------------
        // Inject pages
        // ----------------------
        const pages = import.meta.glob('/src/pages/**/*.astro')
        !pages['/src/pages/[...page].astro'] &&
          injectRoute({
            pattern: '/[...page]',
            entrypoint: 'fulldev-blocks/[...page].astro',
          })
      },
      'astro:build:done': async () => {
        // // ----------------------
        // // Process cloudcannon config file
        // // ----------------------
        // const configs = import.meta.glob(
        //   ['../../cloudcannon.config.yml', '/cloudcannon.config.yml'],
        //   { as: 'raw', eager: true }
        // )
        // const libConfig = configs['../blocks/cloudcannon.config.yml']
        // const userConfig = configs['/cloudcannon.config.yml']
        // const libData = libConfig ? yaml.load(libConfig) : {}
        // const userData = userConfig ? yaml.load(userConfig) : {}
        // const mergedData = merge(libData, userData)
        // const mergedYaml = yaml.dump(mergedData)
        // fs.writeFileSync('./.cloudcannon/cloudcannon.config.yml', mergedYaml)
        // // ----------------------
        // // Process bookshop files
        // // ----------------------
        // const blocks = import.meta.glob(
        //   ['../blocks/**/*.yml', '/src/blocks/**/*.yml'],
        //   { as: 'raw', eager: true }
        // )
        // Object.entries(blocks).forEach(async ([key, value]) => {
        //   const filename = key.split('/').pop()
        //   fs.writeFileSync(`./.cloudcannon/blocks/${filename}`, value)
        // })
        // // ----------------------
        // // Process cloudcannon schema files
        // // ----------------------
        // const schemas = import.meta.glob(
        //   [
        //     '../schemas/**/*.md',
        //     '../schemas/**/*.yml',
        //     '/src/schemas/**/*.md',
        //     '/src/schemas/**/*.yml',
        //   ],
        //   { as: 'raw', eager: true }
        // )
        // Object.entries(schemas).forEach(async ([key, value]) => {
        //   const filename = key.split('/').pop()
        //   fs.writeFileSync(`./.cloudcannon/schemas/${filename}`, value)
        // })
        // // ----------------------
        // // Process bookshop previews
        // // ----------------------
        // const __filename = fileURLToPath(import.meta.url)
        // const __dirname = path.dirname(__filename)
        // const getAbsolutePath = (relativePath: any) =>
        //   path.resolve(__dirname, relativePath)
        // const libPreviews = import.meta.glob('../blocks/**/*.preview.png', {
        //   eager: true,
        // })
        // const userPreviews = import.meta.glob('/src/blocks/**/*.preview.png', {
        //   eager: true,
        // })
        // Object.entries(libPreviews).forEach(([key, value]) => {
        //   const filename = key.split('/').pop()
        //   const absolutePath = getAbsolutePath(key)
        //   const fileContent = fs.readFileSync(absolutePath)
        //   fs.writeFileSync(`./.cloudcannon/blocks/${filename}`, fileContent)
        // })
        // Object.entries(userPreviews).forEach(([key, value]) => {
        //   const filename = key.split('/').pop()
        //   const absolutePath = getAbsolutePath(key)
        //   const fileContent = fs.readFileSync(absolutePath)
        //   fs.writeFileSync(`./.cloudcannon/blocks/${filename}`, fileContent)
        // })
      },
    },
  }
}
