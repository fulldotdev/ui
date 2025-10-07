import { Octokit } from "@octokit/rest"
import { defineAction } from "astro:actions"
import {
  GITHUB_BRANCH,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_TOKEN,
} from "astro:env/server"
import { z } from "astro:schema"
import rehypeParse from "rehype-parse"
import rehypeRemark from "rehype-remark"
import { remark } from "remark"
import remarkStringify from "remark-stringify"
import { parse, stringify } from "yaml"

import { githubPageSchema } from "@/schemas/github-page"

const octokit = new Octokit({ auth: GITHUB_TOKEN })

export const pages = {
  createOrUpdatePage: defineAction({
    input: githubPageSchema,
    handler: async (input) => {
      const frontmatter = stringify(input.data)
      const markdown =
        input.rendered?.html &&
        (await remark()
          .use(rehypeParse)
          .use(rehypeRemark)
          .use(remarkStringify)
          .process(input.rendered?.html))
      const content = `---\n${frontmatter}\n---\n\n${markdown || ""}`

      const { data } = await octokit.repos.createOrUpdateFileContents({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        branch: GITHUB_BRANCH,
        path: input.filePath,
        message: `page: ${input.filePath}`,
        content: Buffer.from(content).toString("base64"),
        sha: input.sha,
      })

      return data
    },
  }),
  getPage: defineAction({
    input: z.string(),
    handler: async (input) => {
      const { data } = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        ref: GITHUB_BRANCH,
        path: `src/content/pages/${input}.md`,
      })

      if (Array.isArray(data) || data.type !== "file") return
      const content = Buffer.from(data.content, "base64").toString("utf-8")

      const id = data.name.replace("/index.md", "").replace(".md", "") as string
      const frontmatter = parse(content.split("---")[1])
      const body = content.split("---")[2]
      const html = await remark()
        .use(rehypeParse)
        .use(rehypeRemark)
        .use(remarkStringify)
        .process(body)

      const entry = {
        id,
        data: frontmatter,
        body,
        rendered: { html: html.value },
        filePath: data.path,
        sha: data.sha,
      }

      return githubPageSchema.parse(entry)
    },
  }),
}
