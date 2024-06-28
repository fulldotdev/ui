import tailwindPlugin from '../package/src/integration/tailwind.ts'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [tailwindPlugin],
}
