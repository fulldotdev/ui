// import { Octokit } from "@octokit/rest"
// import {
//   GITHUB_OWNER,
//   GITHUB_REF,
//   GITHUB_REPO,
//   GITHUB_TOKEN,
// } from "astro:env/server"
// import type { LiveLoader } from "astro/loaders"

// import { imageSchema, type ImageSchema } from "@/schemas/fields/image"

// const octokit = new Octokit({ auth: GITHUB_TOKEN })

// async function transformFile(file: any) {
//   if (!file.download_url) return

//   return {
//     id: file.name,
//     filePath: `src/assets/images/${file.name}`,
//     collection: "github-images",
//     data: imageSchema.parse({
//       src: file.download_url,
//       alt: file.name,
//     }),
//   }
// }

// interface ImageEntry {
//   id: string
//   collection: "github-images"
//   filePath: string
//   data: ImageSchema
// }

// interface ImageEntryFilter {
//   id?: string
// }

// export function githubImagesLoader(): LiveLoader<ImageEntry, ImageEntryFilter> {
//   return {
//     name: "github-images-loader",
//     loadCollection: async () => {
//       const response = await octokit.repos.getContent({
//         owner: GITHUB_OWNER,
//         repo: GITHUB_REPO,
//         ref: GITHUB_REF,
//         path: "src/assets/images",
//       })

//       const files = Array.isArray(response.data)
//         ? response.data
//         : [response.data]

//       const entries = await Promise.all(files.map(transformFile))
//       const filtered = entries.filter((entry) => entry !== undefined)

//       return {
//         entries: filtered,
//       }
//     },
//     loadEntry: async ({ filter }) => {
//       const filePath = `src/assets/images/${filter?.id}`
//       const response = await octokit.repos.getContent({
//         owner: GITHUB_OWNER,
//         repo: GITHUB_REPO,
//         ref: GITHUB_REF,
//         path: filePath,
//       })

//       const file = response.data
//       const entry = await transformFile(file)

//       if (!entry) return { error: new Error(`File not found: ${filePath}`) }

//       return entry
//     },
//   }
// }
