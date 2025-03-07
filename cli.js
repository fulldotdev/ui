#! /usr/bin/env node
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs-extra"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const initFiles = [
  "src/styles/theme.css",
  "astro.config.ts",
  "src/data",
  "src/content",
]

const files = [
  "netlify",
  "src/stores",
  "src/blocks",
  "src/components",
  "src/lib",
  "src/loaders",
  "src/pages",
  "src/schemas",
  "src/styles/globals.css",
  "src/content.config.ts",
  "stackbit",
  ".gitignore",
  ".prettierignore",
  "components.json",
  "netlify.toml",
  "prettier.config.cjs",
  "renovate.json",
  "stackbit.config.ts",
  "tsconfig.json",
]

function pullFiles(files) {
  files.forEach((file) => {
    const sourcePath = path.join(__dirname, file)
    const targetPath = path.join(process.cwd(), file)
    const targetDir = fs.statSync(sourcePath).isDirectory()
      ? targetPath
      : path.dirname(targetPath)

    fs.ensureDirSync(targetDir)
    fs.copySync(sourcePath, targetPath)
    console.log(`Pulled: ${file}`)
  })
}

function resetFiles(files) {
  files.forEach((file) => {
    fs.removeSync(path.join(process.cwd(), file))
  })
}

function pushFiles(files) {
  files.forEach((file) => {
    const sourcePath = path.join(process.cwd(), file)

    // Check if the file exists before trying to copy it
    if (!fs.existsSync(sourcePath)) {
      console.log(`Skipped: ${file} (does not exist)`)
      return
    }

    const targetPath = path.join(__dirname, file)
    const isDirectory =
      fs.existsSync(sourcePath) && fs.statSync(sourcePath).isDirectory()
    const targetDir = isDirectory ? targetPath : path.dirname(targetPath)

    fs.ensureDirSync(targetDir)
    fs.copySync(sourcePath, targetPath)
    console.log(`Pushed: ${file}`)
  })
}

function addPackageJson() {
  const packageJson = fs.readJsonSync(path.join(__dirname, "package.json"))
  const targetPackage = {
    name: packageJson.name,
    type: packageJson.type,
    scripts: packageJson.scripts,
    dependencies: packageJson.dependencies,
    devDependencies: packageJson.devDependencies,
  }
  fs.writeJsonSync(path.join(process.cwd(), "package.json"), targetPackage, {
    spaces: 2,
  })
}

yargs(hideBin(process.argv))
  .command("pull", "Add project files", () => {
    pullFiles(files)
    addPackageJson()
  })
  .command("push", "Push project files", () => {
    pushFiles(files)
  })
  .command("init", "Initialize project", () => {
    pullFiles([...initFiles, ...files])
    addPackageJson()
  })
  .command("reset", "Remove project files", () => {
    resetFiles(files)
  })
  .demandCommand(1, 'You need to specify "pull" or "push" or "reset"')
  .parse()
