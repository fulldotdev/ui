// import type { AstroIntegration } from 'astro'
// import autoprefixer from 'autoprefixer'
// import postcssNesting from 'postcss-nesting'
// import postcssPresetEnv from 'postcss-preset-env'
// import { mergeDeep } from 'remeda'
// import virtual from 'vite-plugin-virtual'

// const defaultConfig = {
//   color: {
//     accent: 'indigo',
//     base: 'slate',
//   },
//   size: {
//     scale: 1,
//     space: 1,
//     radius: 1,
//     text: 1,
//   },
//   theme: {
//     border: '1px',
//   },
//   font: {
//     heading.text: 'IMB Plex Sans:700',
//     subheading.text: 'IMB Plex Sans:700',
//     text: 'IMB Plex Sans:400',
//     tagline: 'IMB Plex Sans:400',
//     button: 'IMB Plex Sans:500',
//   },
// }

// export default function fulluiIntegration(userConfig: any): AstroIntegration {
//   const config: any = mergeDeep(defaultConfig || {}, userConfig || {})

//   return {
//     name: '/integration',
//     hooks: {
//       'astro:config:setup': async ({
//         // config: astroConfig,
//         updateConfig,
//         injectScript,
//       }) => {
//         updateConfig({
//           vite: {
//             plugins: [
//               virtual({
//                 'virtual:/config': `export default ${JSON.stringify(config)}`,
//               }) as any,
//             ],
//             css: {
//               postcss: {
//                 plugins: [postcssNesting, postcssPresetEnv, autoprefixer],
//               },
//             },
//           },
//         })

//         // injectScript('page-ssr', 'import "fulldev-ui/css";')
//       },
//     },
//   }
// }
