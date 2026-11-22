import { useEffect } from 'react'
import { designs, projects } from '../data/projects'
import { Reveal, WordsIn } from '../components/Motion'
import SystemDesign from '../components/SystemDesign'
import { TiltCard } from '../components/Cinematic'
import { sdeJourney } from '../data/resume'

const ext = (url: string) => url.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {}

export default function Projects() {
  useEffect(() => { document.title = 'Projects & System Design | Ravi Raj Ladha' }, [])
  const groups = [...new Set(projects.map(p => p.group))]

  return (
    <main className="article">
      <Reveal><p className="preprint">Appendix A · projects &amp; system design</p></Reveal>
      <WordsIn text="Things I've built, and how they work" />
      <Reveal><p>Beyond the work in my experience section: my whole SDE journey with live links, side builds, ML coursework and a few system designs you can step through. Press play, then test yourself with the question at the end.</p></Reveal>

      <section className="paper-section" id="sde-journey">
        <Reveal><h2><span>A.0</span>SDE journey</h2></Reveal>
        <Reveal><p>Every chapter of my software career and what I shipped in it. <strong>Live</strong> opens the running product, <strong>Client</strong> the organisation it was built for, <strong>Code</strong> the repository.</p></Reveal>
        <ol className="sde-journey">
          {sdeJourney.map(c => (
            <li key={c.org + c.period} className="sde-chapter">
              <Reveal>
                <p className="mono small sde-period">{c.period} · {c.role}</p>
                <h3>{c.orgUrl ? <a href={c.orgUrl} {...ext(c.orgUrl)}>{c.org} ↗</a> : c.org}</h3>
                <p>{c.text}</p>
              </Reveal>
              <ul className="sde-builds">
                {c.builds.map(b => (
                  <li key={b.name}>
                    <strong>{b.name}</strong> <span className="sde-what">{b.what}</span>
                    <span className="journey-links">
                      {b.live && <a className="button primary" href={b.live} {...ext(b.live)}>Live ↗</a>}
                      {b.client && <a className="button" href={b.client} {...ext(b.client)}>Client ↗</a>}
                      {b.code && <a className="button" href={b.code} {...ext(b.code)}>Code ↗</a>}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="paper-section" id="system-design">
        <Reveal><h2><span>A.1</span>System design, interactive</h2></Reveal>
        {designs.map(d => <Reveal key={d.id}><SystemDesign design={d} /></Reveal>)}
      </section>

      <section className="paper-section" id="repos">
        <Reveal><h2><span>A.2</span>Open-source projects</h2></Reveal>
        {groups.map(g => (
          <div key={g} className="sector-group">
            <Reveal><h3 className="sector-title">{g}</h3></Reveal>
            <div className="cards">
              {projects.filter(p => p.group === g).map((p, i) => (
                <Reveal key={p.name} delay={i * 0.05}>
                  <a className="repo" href={p.url} {...(p.url.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
                    <TiltCard className="card">
                      <h3>{p.name} <span aria-hidden="true">↗</span></h3>
                      <p>{p.text}</p>
                      <p className="tags">{p.stack}</p>
                    </TiltCard>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
