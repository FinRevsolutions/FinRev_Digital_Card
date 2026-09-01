/**
 * Builds the project and deploys the output to the repository root so that
 * GitHub Pages (which serves the root of the branch) keeps working.
 *
 * Steps:
 *   1. Restore the source index.html (references /src/main.jsx) so Vite can build.
 *   2. Run `vite build` into dist/.
 *   3. Copy dist/index.html + dist/assets/* to the repository root.
 *   4. Remove stale hashed assets from the repo root so only the current build remains.
 *
 * Usage: node scripts/deploy.mjs   (or: npm run deploy)
 */
import { execSync } from 'node:child_process'
import { copyFileSync, cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceHtml = join(root, 'scripts', 'index.source.html')

copyFileSync(sourceHtml, join(root, 'index.html'))

execSync('npm run build', { stdio: 'inherit', cwd: root })

const distAssets = join(root, 'dist', 'assets')
const rootAssets = join(root, 'assets')
mkdirSync(rootAssets, { recursive: true })
copyFileSync(join(root, 'dist', 'index.html'), join(root, 'index.html'))
cpSync(distAssets, rootAssets, { recursive: true })

const freshAssets = new Set(readdirSync(distAssets))
for (const file of readdirSync(rootAssets)) {
  if (!freshAssets.has(file)) rmSync(join(rootAssets, file), { force: true })
}

console.log('Deployed build output to repository root.')
