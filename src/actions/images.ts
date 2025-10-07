// import { writeFile } from "fs/promises"
// import { join } from "path"
// import { Octokit } from "@octokit/rest"
// import { defineAction } from "astro:actions"
// import {
//   GITHUB_BRANCH,
//   GITHUB_OWNER,
//   GITHUB_REPO,
//   GITHUB_TOKEN,
// } from "astro:env/server"
// import { z } from "astro:schema"

// const WRITE_FILE = true
// const WRITE_GITHUB = false

// const octokit = new Octokit({ auth: GITHUB_TOKEN })

// export const images = {
//   uploadImage: defineAction({
//     accept: "form",
//     input: z.object({
//       sha: z.string().optional(),
//       file: z.instanceof(File),
//     }),
//     handler: async (input) => {
//       const filePath = `src/assets/images/${input.file.name}`
//       const buffer = Buffer.from(await input.file.arrayBuffer())

//       await octokit.repos.createOrUpdateFileContents({
//         owner: GITHUB_OWNER,
//         repo: GITHUB_REPO,
//         path: filePath,
//         message: `Upload image: ${input.file.name}`,
//         content: buffer.toString("base64"),
//         branch: GITHUB_BRANCH,
//         sha,
//       })

//       // Upload to GitHub
//       if (WRITE_GITHUB && GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO) {
//         const githubPath = `public/images/${file.name}`

//         // Get existing file SHA if it exists
//         let sha: string | undefined
//         try {
//           const { data } = await octokit.repos.getContent({
//             owner: GITHUB_OWNER,
//             repo: GITHUB_REPO,
//             path: githubPath,
//             ref: GITHUB_BRANCH,
//           })
//           if ("sha" in data) {
//             sha = data.sha
//           }
//         } catch (error) {
//           // File doesn't exist yet, that's okay
//         }

//         await octokit.repos.createOrUpdateFileContents({
//           owner: GITHUB_OWNER,
//           repo: GITHUB_REPO,
//           path: githubPath,
//           message: `Upload image: ${file.name}`,
//           content: buffer.toString("base64"),
//           branch: GITHUB_BRANCH,
//           sha,
//         })
//       }

//       return `/images/${file.name}`
//     },
//   }),
//   getImage: defineAction({
//     input: z.string(),
//     handler: async (input) => {
//       const { data } = await octokit.repos.getContent({
//         owner: GITHUB_OWNER,
//         repo: GITHUB_REPO,
//         ref: GITHUB_BRANCH,
//         path: `src/assets/images/${input}.webp`,
//       })

//       return data
//     },
//   }),
// }
