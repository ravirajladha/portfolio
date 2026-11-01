import { Link } from 'react-router'

export default function NotFound() {
  return (
    <main className="article">
      <p className="preprint">Error 404</p>
      <h1>Page not found</h1>
      <p>This page wasn't in the training data. <Link to="/">Back to the homepage →</Link></p>
    </main>
  )
}
