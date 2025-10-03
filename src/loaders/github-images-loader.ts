import { Octokit } from "@octokit/rest"
import {
  GITHUB_OWNER,
  GITHUB_REF,
  GITHUB_REPO,
  GITHUB_TOKEN,
} from "astro:env/server"
import type { LiveLoader } from "astro/loaders"
import rehypeParse from "rehype-parse"
import rehypeRemark from "rehype-remark"
import { remark } from "remark"
import remarkStringify from "remark-stringify"
import { parse } from "yaml"

import type { PageSchema } from "@/schemas/page"

const octokit = new Octokit({ auth: GITHUB_TOKEN })

async function transformFile(file: any) {
  if (!file.download_url) return

  const response = await fetch(file.download_url)
  const content = await response.text()
  const frontmatter = content.split("---")[1]
  const body = content.split("---")[2]
  const html = await remark()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkStringify)
    .process(body)

  return {
    id: file.name.replace("/index.md", "").replace(".md", ""),
    filePath: file.path,
    collection: "github-images",
    data: parse(frontmatter),
    body: body,
    rendered: {
      html: html,
    },
  }
}

interface Entry {
  id: string
  collection: "github-images"
  filePath: string
  data: PageSchema
  body: string
  rendered: {
    html: string
  }
}

interface EntryFilter {
  id?: string
}

export function githubImagesLoader(): LiveLoader<Entry, EntryFilter> {
  return {
    name: "github-images-loader",
    loadCollection: async () => {
      const response = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        ref: GITHUB_REF,
        path: "src/content/images",
      })

      const files = Array.isArray(response.data)
        ? response.data
        : [response.data]

      const entries = await Promise.all(files.map(transformFile))
      const filtered = entries.filter((entry) => entry !== undefined)

      return {
        entries: filtered,
      }
    },
    loadEntry: async ({ filter }) => {
      const filePath = `src/content/images/${filter?.id}.md`
      const response = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        ref: GITHUB_REF,
        path: filePath,
      })

      const file = response.data
      const entry = await transformFile(file)

      if (!entry) return { error: new Error(`File not found: ${filePath}`) }

      return entry
    },
  }
}
