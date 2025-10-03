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

async function getEntryByFile(file: any) {
  if (!file.content) return
  const content = Buffer.from(file.content, "base64").toString("utf-8")

  const id = file.name.replace("/index.md", "").replace(".md", "") as string
  const data = parse(content.split("---")[1])
  const body = content.split("---")[2]
  const html = await remark()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkStringify)
    .process(body)

  const entry = {
    id,
    data,
    body,
    rendered: { html: html.value },
    filePath: file.path,
    sha: file.sha,
  }

  return githubPageSchema.parse(entry)
}

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
  // getPages: defineAction({
  //   input: z.never(),
  //   handler: async () => {
  //     const { data } = await octokit.repos.getContent({
  //       owner: GITHUB_OWNER,
  //       repo: GITHUB_REPO,
  //       ref: GITHUB_BRANCH,
  //       path: "src/content/pages",
  //     })

  //     const files = (Array.isArray(data) ? data : [data]).filter(
  //       (file) => file.type === "file"
  //     )

  //     const entries = await Promise.all(files.map(getEntryByFile))
  //     const filtered = entries.filter((entry) => entry !== undefined)
  //     return filtered
  //   },
  // }),
  getPage: defineAction({
    input: z.string(),
    handler: async (input) => {
      const { data } = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        ref: GITHUB_BRANCH,
        path: `src/content/pages/${input}.md`,
      })

      const entry = await getEntryByFile(data)
      return entry
    },
  }),
}
