#! /usr/bin/env node
import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const files =  [
  '.vscode',
  'netlify',
  'src/blocks',
  'src/components',
  'src/layouts',
  'src/lib',
  'src/pages',
  'src/schemas',
  'src/styles',
  'src/content.config.ts',
  'stackbit',
  '.gitignore',
  '.prettierignore',
  '.prettierrc.yaml',
  'astro.config.ts',
  'components.json',
  'netlify.toml',
  'renovate.json',
  'stackbit.config.ts',
  'tailwind.config.js',
  'tsconfig.json',
]

function pullFiles(files) {
  files.forEach((file) => {
    const sourcePath = path.join(__dirname, file)
    const targetPath = path.join(process.cwd(), file)
    const targetDir = fs.statSync(sourcePath).isDirectory() ? targetPath : path.dirname(targetPath)
    
    fs.ensureDirSync(targetDir)
    fs.copySync(sourcePath, targetPath)
    console.log(`Added: ${file}`)
  })
}

function resetFiles(files) {
  files.forEach((file) => {
    fs.removeSync(path.join(process.cwd(), file))
  })
}

function pushFiles(files) {
  files.forEach((file) => {
    fs.removeSync(path.join(process.cwd(), file))
  })
}

function addPackageJson() {
  const packageJson = fs.readJsonSync(path.join(__dirname, 'package.json'))
  const targetPackage = {
    name: packageJson.name,
    type: packageJson.type,
    scripts: packageJson.scripts,
    dependencies: packageJson.dependencies,
    devDependencies: packageJson.devDependencies,
  }
  fs.writeJsonSync(path.join(process.cwd(), 'package.json'), targetPackage, { spaces: 2 })
}


yargs(hideBin(process.argv))
  .command('pull', 'Add project files', () => {
    pullFiles(files)
    addPackageJson()
  })
  .command('push', 'Push project files', () => {
    pushFiles(files)
  })
  .command('reset', 'Remove project files', () => {
    resetFiles(files)
  })
  .demandCommand(1, 'You need to specify "pull" or "push" or "reset"')
  .parse()
