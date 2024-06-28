import tailwindPlugin from '../package/src/integration/tailwind2.ts'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [tailwindPlugin],
}
