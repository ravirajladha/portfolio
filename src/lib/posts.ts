// Blog posts are Markdown files in src/content/blog with a small front-matter header:
// ---
// title: ...
// date: YYYY-MM-DD
// tag: Software | AI / ML
// minutes: 7
// summary: ...
// ---

export type Post = { slug: string; title: string; date: string; tag: string; minutes: number; summary: string; body: string }

const files = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

function parse(path: string, raw: string): Post {
  const [, head = '', body = raw] = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/) ?? []
  const meta = Object.fromEntries(head.split(/\r?\n/).map(l => {
    const i = l.indexOf(':')
    return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
  }))
  return {
    slug: path.split('/').pop()!.replace(/\.md$/, ''),
    title: meta.title, date: meta.date, tag: meta.tag, minutes: Number(meta.minutes), summary: meta.summary, body,
  }
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date))

export const formatDate = (ymd: string) =>
  new Date(ymd + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
