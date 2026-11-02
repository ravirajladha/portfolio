import { useEffect } from 'react'
import { designs, projects } from '../data/projects'
import { Reveal, WordsIn } from '../components/Motion'
import SystemDesign from '../components/SystemDesign'
import { TiltCard } from '../components/Cinematic'

export default function Projects() {
  useEffect(() => { document.title = 'Projects & System Design | Ravi Raj Ladha' }, [])
  const groups = [...new Set(projects.map(p => p.group))]

  return (
    <main className="article">
      <Reveal><p className="preprint">Appendix A · projects &amp; system design</p></Reveal>
      <WordsIn text="Things I've built, and how they work" />
      <Reveal><p>Beyond the work in my experience section: side builds, ML coursework and a few system designs you can step through. Press play, then test yourself with the question at the end.</p></Reveal>

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
                  <a className="repo" href={p.url} target="_blank" rel="noopener">
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
