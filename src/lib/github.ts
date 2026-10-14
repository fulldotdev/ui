// Docs only: the star count of the repository. One request per build or dev
// server, shared by every page, so the GitHub API rate limit is not hit; a
// GITHUB_TOKEN in the environment raises that limit. When the request fails,
// the header fetches the count in the browser (docs-header.astro).
let request: Promise<number | undefined> | undefined

export const getGithubStars = (repo: string) =>
  (request ??= fetch(`https://api.github.com/repos/${repo}`, {
    headers: process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : undefined,
  })
    .then((response) => (response.ok ? response.json() : undefined))
    .then((data) =>
      typeof data?.stargazers_count === "number"
        ? (data.stargazers_count as number)
        : undefined
    )
    .catch(() => undefined))
