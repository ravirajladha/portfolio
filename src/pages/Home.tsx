import { Link } from 'react-router'
import { ai, experience, now, profile, results, sectors, stack, training } from '../data/resume'
import { posts, formatDate } from '../lib/posts'
import { CountUp, Reveal, Typed, WordsIn } from '../components/Motion'
import AttentionFigure from '../components/AttentionFigure'
import SectorTabs from '../components/SectorTabs'

const H = ({ n, children }: { n?: number; children: string }) => (
  <Reveal><h2>{n !== undefined && <span>{n}</span>}{children}</h2></Reveal>
)

export default function Home() {
  const projectCount = sectors.reduce((sum, s) => sum + s.projects.length, 0)

  return (
    <main>
      <section className="title-block">
        <Reveal><p className="preprint">Preprint · {profile.location} · v2026.11</p></Reveal>
        <WordsIn text={profile.title} />
        <Reveal delay={0.4} className="authors">
          <div><strong>{profile.name}</strong><sup>*</sup></div>
          <div className="affil">{profile.affiliation[0]}<br />{profile.affiliation[1]}</div>
          <Typed words={profile.typed} />
        </Reveal>
        <Reveal delay={0.5} className="actions">
          <a className="button primary" href="#contact">Get in touch</a>
          <a className="button" href={profile.resume} target="_blank" rel="noopener">Résumé (PDF)</a>
          <Link className="button" to="/blog">Read my writing</Link>
          <a className="button" href={profile.github} target="_blank" rel="noopener">GitHub</a>
        </Reveal>
        <Reveal delay={0.6} className="abstract">
          <h2>Abstract</h2>
          <p>{profile.abstract}</p>
        </Reveal>
      </section>

      <Reveal><AttentionFigure /></Reveal>

      <Reveal className="results">
        <table>
          <caption><strong>Table 1:</strong> Results to date. Higher is better.</caption>
          <thead><tr><th>Metric</th><th className="num">Value</th></tr></thead>
          <tbody>
            {[...results, { label: 'Projects delivered across sectors', value: projectCount }].map(r => (
              <tr key={r.label}><td>{r.label}</td><td className="num"><CountUp to={r.value} />{'suffix' in r ? r.suffix : ''}</td></tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <section id="intro" className="paper-section">
        <H n={1}>Introduction</H>
        {profile.intro.map((p, i) => <Reveal key={i}><p>{p}</p></Reveal>)}
      </section>

      <section id="experience" className="paper-section">
        <H n={2}>Experience</H>
        {experience.map((job, i) => (
          <Reveal key={job.company} as="article" className="entry">
            <header><h3>2.{i + 1}&ensp;{job.role}</h3><span className="mono small">{job.period}</span></header>
            <p className="org">{job.company}</p>
            <p>{job.context}</p>
            <div className="facets">
              {job.facets.map((f, k) => (
                <Reveal key={f.title} delay={k * 0.06}><h4>{f.title}</h4><p>{f.text}</p></Reveal>
              ))}
            </div>
            <p className="award">★ {job.award}</p>
          </Reveal>
        ))}
      </section>

      <section id="sectors" className="paper-section">
        <H n={3}>Work by Sector</H>
        <Reveal><p>{projectCount} projects across {sectors.length} domains. Filter by sector, or browse them all.</p></Reveal>
        <Reveal><SectorTabs sectors={sectors} /></Reveal>
        <Reveal><p className="more"><Link className="button primary" to="/projects">More projects + interactive system designs →</Link></p></Reveal>
      </section>

      <section id="ai" className="paper-section">
        <H n={4}>AI / ML in Practice</H>
        <Reveal><p>{ai.intro}</p></Reveal>
        <div className="ai-grid">
          {ai.columns.map((c, i) => (
            <Reveal key={c.tag} delay={i * 0.1} className="ai-col">
              <p className="mono small">{c.tag}</p>
              <h3>{c.title}</h3>
              <ul>{c.items.map(it => <li key={it}>{it}</li>)}</ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="pipeline">
          {ai.pipeline.map((s, i) => <span key={s} className="stage">{i > 0 && <i />}<span>{s}</span></span>)}
        </Reveal>
        <Reveal><p className="caption"><strong>Figure 2:</strong> The pipeline. The last three steps are where I already have years of practice.</p></Reveal>
        <Reveal><p>{ai.footnote}</p></Reveal>
      </section>

      <section id="architecture" className="paper-section">
        <H n={5}>Model Architecture</H>
        <Reveal><p>The full stack, bottom to top. Every layer has been used in production.</p></Reveal>
        <div className="layers">
          {stack.map((l, i) => (
            <Reveal key={l.layer} delay={i * 0.08} className="layer"><span className="mono small">{l.layer}</span><p>{l.items}</p></Reveal>
          ))}
        </div>
        <p className="caption"><strong>Figure 3:</strong> Residual connections omitted for clarity.</p>
      </section>

      <section id="training" className="paper-section">
        <H n={6}>Training</H>
        <div className="timeline">
          {training.map(t => (
            <Reveal key={t.title} as="article">
              <span className="mono small">{t.period}</span>
              <h3>{t.title}</h3>
              <p className="org">{t.org}</p>
              <p>{t.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="writing" className="paper-section">
        <H n={7}>Recent Writing</H>
        <div className="post-list">
          {posts.map(p => (
            <Reveal key={p.slug}>
              <Link className="post-row" to={`/blog/${p.slug}`}>
                <span className="mono small">{formatDate(p.date)} · {p.tag}</span>
                <strong>{p.title}</strong>
                <span className="muted">{p.summary}</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p><Link to="/blog">All posts →</Link></p>
      </section>

      <section id="now" className="paper-section">
        <H n={8}>Now</H>
        <ul className="now">
          {now.map((n, i) => <Reveal key={i} as="li" delay={i * 0.06}><span className="mono small">{n.when}</span>{n.text}</Reveal>)}
        </ul>
        <Reveal><p className="muted">Giving back: every post here is written to be useful on its own, with free code you can run today.</p></Reveal>
      </section>

      <section id="contact" className="paper-section">
        <H n={9}>Correspondence</H>
        <Reveal><p>Happy to talk about backend, full-stack or applied AI engineering, or anything in the posts above. The fastest way to reach me:</p></Reveal>
        <Reveal className="contact-cards">
          <a className="card" href={`mailto:${profile.email}`}><span className="mono small">email</span><strong>{profile.email}</strong></a>
          <a className="card" href={`tel:${profile.phone.replace(/\s/g, '')}`}><span className="mono small">phone</span><strong>{profile.phone}</strong></a>
          <a className="card" href={profile.linkedin} target="_blank" rel="noopener"><span className="mono small">linkedin</span><strong>in/ravirajladha</strong></a>
        </Reveal>
      </section>

      <section className="paper-section references">
        <h2>References</h2>
        <ol>
          <li>Vaswani, A. et al. (2017). <em>Attention Is All You Need.</em> NeurIPS. The paper this domain is named after.</li>
          <li>Ladha, R. R. (2026). <em>Résumé.</em> <a href={profile.resume} target="_blank" rel="noopener">attentionisallyouneed.in{profile.resume}</a></li>
        </ol>
      </section>
    </main>
  )
}
