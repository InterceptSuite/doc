import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import hljs from 'highlight.js'

function getDocsDir(product = 'interceptsuite') {
  return path.join(process.cwd(), 'content/docs', product)
}

function highlightCodeBlocks(html) {
  return html.replace(
    /<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g,
    (match, lang, encodedCode) => {
      const code = encodedCode
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
      try {
        const highlighted =
          lang && hljs.getLanguage(lang)
            ? hljs.highlight(code, { language: lang }).value
            : hljs.highlightAuto(code).value
        const langClass = lang ? ` language-${lang}` : ''
        return `<pre><code class="hljs${langClass}">${highlighted}</code></pre>`
      } catch {
        return match
      }
    }
  )
}

export function getAllDocs(product = 'interceptsuite') {
  const DOCS_DIR = getDocsDir(product)
  if (!fs.existsSync(DOCS_DIR)) return []
  const files = fs.readdirSync(DOCS_DIR)
  return files
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '')
      const raw = fs.readFileSync(path.join(DOCS_DIR, filename), 'utf8')
      const { data } = matter(raw)
      return { slug, ...data }
    })
    .sort((a, b) => (a.order || 99) - (b.order || 99))
}

export function getDocBySlug(slug, product = 'interceptsuite') {
  const filePath = path.join(getDocsDir(product), `${slug}.md`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const html = highlightCodeBlocks(marked.parse(content))
  return { slug, ...data, content: html }
}

export function getAllDocSlugs(product = 'interceptsuite') {
  const DOCS_DIR = getDocsDir(product)
  if (!fs.existsSync(DOCS_DIR)) return []
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace('.md', ''))
}

export function extractHeadings(html) {
  const headings = []
  const regex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]+>/g, '')
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    headings.push({ level, text, id })
  }
  return headings
}

export function addHeadingIds(html) {
  return html.replace(/<h([2-3])>(.*?)<\/h[2-3]>/gi, (_, level, text) => {
    const cleanText = text.replace(/<[^>]+>/g, '')
    const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return `<h${level} id="${id}">${text}</h${level}>`
  })
}
