// import { Octokit } from "@octokit/rest"
// import {
//   GITHUB_OWNER,
//   GITHUB_BRANCH,
//   GITHUB_REPO,
//   GITHUB_TOKEN,
// } from "astro:env/server"
// import { z } from "astro:schema"
// import type { LiveLoader } from "astro/loaders"
// import rehypeParse from "rehype-parse"
// import rehypeRemark from "rehype-remark"
// import { remark } from "remark"
// import remarkStringify from "remark-stringify"
// import { parse } from "yaml"

// import { pageSchema } from "@/schemas/page"

// const octokit = new Octokit({ auth: GITHUB_TOKEN })

// export const githubPageSchema = z.object({
//   id: z.string(),
//   filePath: z.string(),
//   data: pageSchema,
//   body: z.string().optional(),
//   rendered: z
//     .object({
//       html: z.any(),
//     })
//     .optional(),
//   sha: z.string().optional(),
// })

// export type GithubPageSchema = z.infer<typeof githubPageSchema>

// async function transformFile(file: any) {
//   if (!file.download_url) return

//   const response = await fetch(file.download_url)
//   const content = await response.text()

//   const id = file.name.replace("/index.md", "").replace(".md", "") as string
//   const data = parse(content.split("---")[1])
//   const body = content.split("---")[2]
//   const html = await remark()
//     .use(rehypeParse)
//     .use(rehypeRemark)
//     .use(remarkStringify)
//     .process(body)

//   return {
//     id,
//     data,
//     body,
//     rendered: {
//       html,
//     },
//   }
// }

// export function githubPagesLoader(): LiveLoader<GithubPageSchema> {
//   return {
//     name: "github-pages-loader",
//     loadCollection: async () => {
//       const response = await octokit.repos.getContent({
//         owner: GITHUB_OWNER,
//         repo: GITHUB_REPO,
//         ref: GITHUB_BRANCH,
//         path: "src/content/pages",
//       })

//       const files = Array.isArray(response.data)
//         ? response.data
//         : [response.data]

//       const entries = await Promise.all(files.map(transformFile))
//       const filtered = entries.filter((entry) => entry !== undefined)

//       return { entries: filtered }
//     },
//     loadEntry: async ({ filter }: any) => {
//       const filePath = `src/content/pages/${filter?.id}.md`
//       const response = await octokit.repos.getContent({
//         owner: GITHUB_OWNER,
//         repo: GITHUB_REPO,
//         ref: GITHUB_BRANCH,
//         path: filePath,
//       })

//       const file = response.data
//       const entry = await transformFile(file)

//       return entry
//     },
//   }
// }
