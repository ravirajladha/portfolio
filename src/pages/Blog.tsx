import { useEffect } from 'react'
import { Link } from 'react-router'
import { posts, formatDate } from '../lib/posts'
import { Reveal, WordsIn } from '../components/Motion'

export default function Blog() {
  useEffect(() => { document.title = 'Writing | Ravi Raj Ladha' }, [])

  return (
    <main className="article">
      <Reveal><p className="preprint">Writing · giving back what I learn</p></Reveal>
      <WordsIn text="Notes from the production floor" />
      <Reveal><p>Practical posts on backend engineering and applied AI. Each one solves a real problem I've faced and includes code you can run. One new post a month.</p></Reveal>
      <div className="post-list">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <Link className="post-row" to={`/blog/${p.slug}`}>
              <span className="mono small">{formatDate(p.date)} · {p.tag} · {p.minutes} min</span>
              <strong>{p.title}</strong>
              <span className="muted">{p.summary}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </main>
  )
}
