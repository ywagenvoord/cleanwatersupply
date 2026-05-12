/**
 * Convert HTML files to PDF using local Chrome installation (no download).
 * Usage: node html-to-pdf.js <input.html> [output.pdf]
 */

const fs   = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')

// Common Chrome locations on Windows + macOS
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
]

function findChrome() {
  for (const p of CHROME_PATHS) {
    if (p && fs.existsSync(p)) return p
  }
  throw new Error('Kunne ikke finde Chrome. Installer Chrome eller angiv stien manuelt.')
}

async function main() {
  const input  = process.argv[2]
  const output = process.argv[3] || input.replace(/\.html$/, '.pdf')
  if (!input) {
    console.error('Brug: node html-to-pdf.js <input.html> [output.pdf]')
    process.exit(1)
  }

  const absPath = path.resolve(input)
  const fileUrl = 'file:///' + absPath.replace(/\\/g, '/')

  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: 'new',
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto(fileUrl, { waitUntil: 'networkidle0' })
  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
  })
  await browser.close()

  console.log(`✅ PDF genereret: ${output}`)
}

main().catch(err => {
  console.error('❌ Fejl:', err.message)
  process.exit(1)
})
