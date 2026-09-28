const { mkdirSync, writeFileSync } = require("node:fs")
const { join } = require("node:path")

module.exports.onPostBuild = ({ constants }) => {
  if (constants.IS_LOCAL) return
  const env = process.env
  const repository = env.REPOSITORY_URL?.match(
    /github\.com[:/]([\w.-]+\/[\w.-]+?)(?:\.git)?\/?$/
  )?.[1]
  if (
    !repository ||
    !/^[a-f0-9]{40}$/.test(env.COMMIT_REF || "") ||
    !/^[a-f0-9]{24}$/.test(env.DEPLOY_ID || "")
  ) {
    throw new Error("Missing Netlify Git deployment identity")
  }
  const directory = join(constants.PUBLISH_DIR, ".well-known")
  mkdirSync(directory, { recursive: true })
  writeFileSync(
    join(directory, "ci-deploy.json"),
    JSON.stringify({
      version: 1,
      repository,
      commit: env.COMMIT_REF,
      deployId: env.DEPLOY_ID,
      site: env.SITE_NAME,
      context: env.CONTEXT,
      reviewId: env.CONTEXT === "deploy-preview" ? env.REVIEW_ID : "",
    }) + "\n"
  )
}
