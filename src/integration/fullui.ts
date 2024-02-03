import type { AstroIntegration } from 'astro'
import { exec } from 'child_process'
import { promisify } from 'util'
const execAsync = promisify(exec)

export const themeIntegration = (): AstroIntegration => ({
  name: 'fullui-integration',
  hooks: {
    'astro:config:setup': async ({ injectScript }) => {
      await execAsync(
        'yarn unocss ./src/uno.config.ts -o ./src/integration/dist/fullui.css'
      )
      injectScript('page-ssr', 'import "./src/integration/dist/fullui.css";')
    },
  },
})
