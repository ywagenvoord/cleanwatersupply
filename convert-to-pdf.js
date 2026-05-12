/**
 * Konverter Markdown til en udskrifts-klar HTML-fil.
 * Brug: node convert-to-pdf.js <input.md> [output.html]
 *
 * Åbn derefter HTML-filen i Chrome → Ctrl+P → "Gem som PDF".
 */

const fs   = require('fs')
const path = require('path')

// Tiny markdown parser — sufficient for our docs (H1-H4, lists, tables, blockquotes, code, bold/italic, links)
function md(text) {
  let html = text

  // Code blocks (fenced)
  html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    return `<pre><code>${escaped}</code></pre>`
  })

  // Tables
  html = html.replace(/(^\|.+\|\s*\n\|[-:\s|]+\|\s*\n(?:^\|.+\|\s*\n?)+)/gm, block => {
    const lines = block.trim().split('\n')
    const headers = lines[0].split('|').slice(1, -1).map(s => s.trim())
    const rows = lines.slice(2).map(row => row.split('|').slice(1, -1).map(s => s.trim()))
    const thead = `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>`
    const tbody = `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`
    return `<table>${thead}${tbody}</table>`
  })

  // Headings
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.+)$/gm,  '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm,   '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm,    '<h1>$1</h1>')

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '<br>')

  // Horizontal rule
  html = html.replace(/^---+$/gm, '<hr>')

  // Unordered lists
  html = html.replace(/((?:^- .+\n?)+)/gm, m => {
    const items = m.trim().split('\n').map(l => `<li>${l.replace(/^- /, '')}</li>`).join('')
    return `<ul>${items}</ul>`
  })

  // Ordered lists
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, m => {
    const items = m.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('')
    return `<ol>${items}</ol>`
  })

  // Inline: bold, italic, code, links
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g,     '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g,        '<code>$1</code>')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Paragraphs (plain lines that aren't already wrapped)
  html = html.split('\n\n').map(block => {
    const trimmed = block.trim()
    if (!trimmed) return ''
    if (/^<(h[1-6]|ul|ol|li|table|thead|tbody|tr|th|td|blockquote|hr|pre|code)/.test(trimmed)) return trimmed
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`
  }).join('\n\n')

  return html
}

const input  = process.argv[2]
const output = process.argv[3] || input.replace(/\.md$/, '.html')

if (!input) {
  console.error('Brug: node convert-to-pdf.js <input.md> [output.html]')
  process.exit(1)
}

const markdown = fs.readFileSync(input, 'utf8')
const body = md(markdown)
const title = path.basename(input, '.md')

const fullHtml = `<!DOCTYPE html>
<html lang="da">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  @page { size: A4; margin: 18mm 16mm; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    color: #1a2332;
    line-height: 1.65;
    max-width: 760px;
    margin: 0 auto;
    padding: 32px 28px;
    font-size: 11pt;
  }
  h1 {
    color: #0a2540;
    font-size: 28pt;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 0.6em 0;
    border-bottom: 3px solid #3aad4a;
    padding-bottom: 0.3em;
    page-break-after: avoid;
  }
  h2 {
    color: #0a2540;
    font-size: 18pt;
    font-weight: 700;
    margin: 1.6em 0 0.5em 0;
    page-break-after: avoid;
  }
  h3 {
    color: #1e4380;
    font-size: 14pt;
    font-weight: 700;
    margin: 1.2em 0 0.4em 0;
    page-break-after: avoid;
  }
  h4 {
    color: #3aad4a;
    font-size: 12pt;
    font-weight: 700;
    margin: 1em 0 0.3em 0;
  }
  p { margin: 0.5em 0; }
  ul, ol { margin: 0.5em 0; padding-left: 1.6em; }
  li { margin: 0.25em 0; }
  blockquote {
    border-left: 4px solid #3aad4a;
    background: #f6f9f7;
    padding: 12px 18px;
    margin: 0.8em 0;
    color: #2d3e52;
    font-style: italic;
    page-break-inside: avoid;
  }
  blockquote em { font-style: normal; }
  code {
    background: #f1f5f9;
    color: #0a2540;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
    font-size: 0.9em;
  }
  pre {
    background: #0a2540;
    color: #e2e8f0;
    padding: 14px 18px;
    border-radius: 8px;
    overflow-x: auto;
    page-break-inside: avoid;
  }
  pre code {
    background: transparent;
    color: inherit;
    padding: 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    page-break-inside: avoid;
  }
  th, td {
    text-align: left;
    padding: 9px 12px;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: top;
  }
  th {
    background: #f1f5f9;
    color: #0a2540;
    font-weight: 700;
    font-size: 10pt;
  }
  td { font-size: 10pt; }
  hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 1.5em 0;
  }
  a { color: #1e4380; text-decoration: none; border-bottom: 1px dotted #1e4380; }
  strong { color: #0a2540; }
  @media print {
    body { padding: 0; max-width: 100%; }
    a { color: #1a2332; }
  }
</style>
</head>
<body>
${body}

<hr>
<p style="text-align: center; color: #94a3b8; font-size: 9pt; margin-top: 2em;">
  Clean Water Supply ApS · CVR 44405563 · Strømøvej 3, 8700 Horsens
</p>
</body>
</html>`

fs.writeFileSync(output, fullHtml)
console.log(`✅ HTML genereret: ${output}`)
console.log(`   Åbn filen i Chrome → Ctrl+P → "Gem som PDF"`)
