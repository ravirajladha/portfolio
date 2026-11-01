import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { posts, formatDate } from '../lib/posts'
import { Reveal, WordsIn } from '../components/Motion'
import { profile } from '../data/resume'
import NotFound from './NotFound'

export default function Post() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  useEffect(() => { if (post) document.title = `${post.title} | Ravi Raj Ladha` }, [post])
  if (!post) return <NotFound />

  return (
    <main className="article">
      <p className="back"><Link to="/blog">← All writing</Link></p>
      <WordsIn text={post.title} />
      <p className="meta">{formatDate(post.date)} · {post.tag} · {post.minutes} min read · {profile.name}</p>
      <Reveal className="prose">
        <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
      </Reveal>
      <hr />
      <p className="muted">If this helped, pass it on to someone who's stuck on the same problem. Questions and corrections are welcome: <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p>
      <p className="back"><Link to="/blog">← All writing</Link></p>
    </main>
  )
}
