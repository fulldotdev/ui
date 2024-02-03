import type { AstroIntegration } from 'astro'
import { exec } from 'child_process'
import { writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'
import type { Config as FlowConfig } from './src/presetFlow'
import type { Config as ThemeConfig } from './src/presetTheme'

const __dirname = dirname(fileURLToPath(import.meta.url))
const execAsync = promisify(exec)

interface Config {
  flow?: FlowConfig
  theme?: ThemeConfig
  blocks?: {}
}

interface FulluiConfig {
  scale: number
  rounded: number
  border: 0 | 1 | 2 | 3
  palettes: {
    base: any
    accent: any
    [key: string]: any
  }
  impacts: {
    low: boolean | any
    medium: boolean | any
    high: boolean | any
    extreme: boolean | any
  }
}

export const fulluiIntegration = (config: Config): AstroIntegration => ({
  name: 'fullui-integration',
  hooks: {
    'astro:config:setup': async ({ injectScript }) => {
      const configPath = join(__dirname, './dist/integration-options.json') // Adjust the path as needed
      const jsonConfig = JSON.stringify(config)
      await writeFile(configPath, jsonConfig, 'utf8')

      await execAsync(
        'yarn unocss ./src/integration/src/uno.config.ts -c ./src/integration/src/uno.config.ts -o ./src/integration/dist/fullui.css'
      )
      injectScript('page-ssr', 'import "src/integration/dist/fullui.css";')
    },
  },
})
