// One-shot script: adds `import { SITE_URL } from '@/lib/site'`
// to every src/**/*.ts(x) file that references SITE_URL but doesn't import it.

const fs = require('fs')
const path = require('path')

function walk(dir, results = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) walk(full, results)
    else if (/\.tsx?$/.test(name)) results.push(full)
  }
  return results
}

const root = path.join(__dirname, 'src')
const files = walk(root)

let updated = 0
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  const usesSiteUrl = /\bSITE_URL\b/.test(text)
  const alreadyImports = /from ['"]@\/lib\/site['"]/.test(text)
  const definesSelf = /export\s+const\s+SITE_URL/.test(text)
  if (!usesSiteUrl || alreadyImports || definesSelf) continue

  // Find the last import statement and insert after it
  const importRe = /^(?:import [^\n]+;?\s*\n)+/m
  const match = text.match(importRe)
  let newText
  if (match) {
    const block = match[0]
    newText = text.replace(block, block + `import { SITE_URL } from '@/lib/site'\n`)
  } else {
    newText = `import { SITE_URL } from '@/lib/site'\n\n` + text
  }
  fs.writeFileSync(file, newText)
  console.log('  ✓', path.relative(__dirname, file))
  updated++
}

console.log(`\n${updated} files updated.`)
