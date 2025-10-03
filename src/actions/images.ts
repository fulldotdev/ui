// import { Octokit } from "@octokit/rest"
// import { defineAction } from "astro:actions"
// import {
//   GITHUB_OWNER,
//   GITHUB_BRANCH,
//   GITHUB_REPO,
//   GITHUB_TOKEN,
// } from "astro:env/server"
// import { z } from "astro:schema"

// const octokit = new Octokit({ auth: GITHUB_TOKEN })

// export const images = {
//   uploadImage: defineAction({
//     accept: "form",
//     input: z.object({
//       file: z.instanceof(File),
//     }),
//     handler: async (input) => {
//       const { file } = input
//       const filePath = `src/assets/images/${file.name}`

//       const buffer = Buffer.from(await file.arrayBuffer())

//       await octokit.repos.createOrUpdateFileContents({
//         owner: GITHUB_OWNER,
//         repo: GITHUB_REPO,
//         ref: GITHUB_BRANCH,
//         path: filePath,
//         message: `Upload image: ${file.name}`,
//         content: buffer.toString("base64"),
//       })

//       return { success: true }
//     },
//   }),
// }
