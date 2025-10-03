import { writeFile } from "fs/promises"
import { join } from "path"
import { Octokit } from "@octokit/rest"
import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import rehypeParse from "rehype-parse"
import rehypeRemark from "rehype-remark"
import { remark } from "remark"
import remarkStringify from "remark-stringify"
import { stringify } from "yaml"

import { pageSchema } from "@/schemas/page"

const WRITE_FILE = true
const WRITE_GITHUB = false

export const server = {
  uploadImage: defineAction({
    accept: "form",
    input: z.object({
      file: z.instanceof(File),
    }),
    handler: async (input) => {
      const { file } = input
      const filePath = join(process.cwd(), "public", "images", file.name)

      const buffer = Buffer.from(await file.arrayBuffer())

      if (WRITE_FILE) {
        await writeFile(filePath, buffer)
      }

      // Upload to GitHub
      if (
        WRITE_GITHUB &&
        import.meta.env.GITHUB_TOKEN &&
        import.meta.env.GITHUB_USER &&
        import.meta.env.GITHUB_REPO
      ) {
        const octokit = new Octokit({ auth: import.meta.env.GITHUB_TOKEN })
        const githubPath = `public/images/${file.name}`

        // Get existing file SHA if it exists
        let sha: string | undefined
        try {
          const { data } = await octokit.repos.getContent({
            owner: import.meta.env.GITHUB_USER,
            repo: import.meta.env.GITHUB_REPO,
            path: githubPath,
            ref: import.meta.env.GITHUB_BRANCH,
          })
          if ("sha" in data) {
            sha = data.sha
          }
        } catch (error) {
          // File doesn't exist yet, that's okay
        }

        await octokit.repos.createOrUpdateFileContents({
          owner: import.meta.env.GITHUB_USER,
          repo: import.meta.env.GITHUB_REPO,
          path: githubPath,
          message: `Upload image: ${file.name}`,
          content: buffer.toString("base64"),
          branch: import.meta.env.GITHUB_BRANCH,
          sha,
        })
      }

      return `/images/${file.name}`

      // const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`
      // return {
      //   src: `/images/${file.name}`,
      //   dataUrl,
      // }
    },
  }),
  savePage: defineAction({
    input: z.object({
      filePath: z.string(),
      data: pageSchema,
      body: z.string().optional(),
    }),
    handler: async (input) => {
      const { filePath, data, body } = input

      // Generate frontmatter with proper YAML formatting
      const frontmatter = stringify(data)
      const markdown = await remark()
        .use(rehypeParse)
        .use(rehypeRemark)
        .use(remarkStringify)
        .process(body || "")
      const content = `---\n${frontmatter}\n---\n\n${markdown || ""}`
      if (WRITE_FILE) {
        await writeFile(filePath, content, "utf-8")
      }

      // Upload to GitHub
      if (
        WRITE_GITHUB &&
        import.meta.env.GITHUB_TOKEN &&
        import.meta.env.GITHUB_USER &&
        import.meta.env.GITHUB_REPO
      ) {
        const octokit = new Octokit({ auth: import.meta.env.GITHUB_TOKEN })
        const githubPath = filePath.replace(process.cwd() + "/", "")

        // Get existing file SHA if it exists
        let sha: string | undefined
        try {
          const { data } = await octokit.repos.getContent({
            owner: import.meta.env.GITHUB_USER,
            repo: import.meta.env.GITHUB_REPO,
            path: githubPath,
            ref: import.meta.env.GITHUB_BRANCH,
          })
          if ("sha" in data) {
            sha = data.sha
          }
        } catch (error) {
          // File doesn't exist yet, that's okay
        }

        await octokit.repos.createOrUpdateFileContents({
          owner: import.meta.env.GITHUB_USER,
          repo: import.meta.env.GITHUB_REPO,
          path: githubPath,
          message: `Update page: ${githubPath}`,
          content: Buffer.from(content).toString("base64"),
          branch: import.meta.env.GITHUB_BRANCH,
          sha,
        })
      }

      console.log(`Page saved to: ${filePath}`)
      return { success: true, filePath, data }
    },
  }),
}
