import { lazy, Suspense, useCallback, useRef } from 'react'
import { Link } from 'react-router'
import { ai, experience, now, profile, results, sectors, stack, training } from '../data/resume'
import { posts, formatDate } from '../lib/posts'
import { Reveal, Typed, WordsIn } from '../components/Motion'
import { ExperienceSwitcher, Highlight, MagneticContact, NeuralNet, ScrollTimeline, StackExplode, StatTiles, Ticker, TiltCard } from '../components/Cinematic'
import AttentionFigure from '../components/AttentionFigure'
import SectorTabs from '../components/SectorTabs'
import type { KeyStore } from '../components/KeyboardHero'

const KeyboardHero = lazy(() => import('../components/KeyboardHero'))

const H = ({ n, children }: { n: number; children: string }) => (
  <Reveal><h2><span>{String(n).padStart(2, '0')}</span>{children}</h2></Reveal>
)

export default function Home() {
  const keys = useRef<KeyStore>({ key: '', t: 0 })
  const onKey = useCallback((k: string) => { keys.current.key = k; keys.current.t = performance.now() }, [])

  return (
    <main>
      {/* E1 Hero */}
      <section className="title-block">
        <Reveal><p className="preprint">{profile.location} · v2026.11</p></Reveal>
        <WordsIn text={profile.title} />
        <Reveal delay={0.4} className="name-card">
          <div className="authors">
            <div><strong>{profile.name}</strong></div>
            <div className="affil">{profile.affiliation[0]}<br />{profile.affiliation[1]}</div>
            <Typed words={profile.typed} onKey={onKey} />
          </div>
          <Suspense fallback={<div className="keyboard-3d" />}>
            <KeyboardHero store={keys.current} />
          </Suspense>
        </Reveal>
        <Reveal delay={0.5}><p className="tagline">{profile.tagline}</p></Reveal>
        <Reveal delay={0.6} className="actions">
          <a className="button primary" href="#contact">Get in touch</a>
          <a className="button" href={profile.resume} target="_blank" rel="noopener">Résumé</a>
          <Link className="button" to="/projects">Projects</Link>
        </Reveal>
      </section>

      {/* E2 Results */}
      <section className="paper-section"><StatTiles items={results} /></section>

      {/* E3 Intro */}
      <section id="intro" className="paper-section">
        <H n={1}>About</H>
        {profile.intro.map(t => <Highlight key={t} text={t} />)}
      </section>

      {/* E4 Experience */}
      <section id="experience" className="paper-section">
        <H n={2}>Experience</H>
        <Reveal><ExperienceSwitcher jobs={experience} /></Reveal>
      </section>

      {/* E5 Sectors */}
      <section id="sectors" className="paper-section">
        <H n={3}>Work by sector</H>
        <Reveal><SectorTabs sectors={sectors} /></Reveal>
        <Reveal><p className="more"><Link className="button primary" to="/projects">More projects + system designs →</Link></p></Reveal>
      </section>

      {/* E6 AI / ML */}
      <section id="ai" className="paper-section">
        <H n={4}>AI / ML</H>
        <Reveal className="nn-card"><NeuralNet inputs={ai.inputs} outputs={ai.outputs} /></Reveal>
        <div className="pillars">
          {ai.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}><TiltCard className="pillar"><h3>{p.title}</h3><p>{p.text}</p></TiltCard></Reveal>
          ))}
        </div>
        <Reveal><AttentionFigure /></Reveal>
      </section>

      {/* E7 Stack */}
      <section id="architecture" className="paper-section">
        <H n={5}>Stack</H>
        <Reveal><StackExplode layers={stack} /></Reveal>
      </section>

      {/* E8 Training */}
      <section id="training" className="paper-section">
        <H n={6}>Learning</H>
        <ScrollTimeline items={training} />
      </section>

      {/* Writing */}
      <section id="writing" className="paper-section">
        <H n={7}>Writing</H>
        <div className="post-cards">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link to={`/blog/${p.slug}`} className="post-link">
                <TiltCard className="post-card">
                  <span className="mono small">{formatDate(p.date)} · {p.tag}</span>
                  <strong>{p.title}</strong>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* E9 Now */}
      <section id="now" className="paper-section">
        <H n={8}>Now</H>
      </section>
      <Ticker items={now} />

      {/* E10 Contact */}
      <section id="contact" className="paper-section">
        <H n={9}>Contact</H>
        <Reveal><MagneticContact email={profile.email} /></Reveal>
        <Reveal className="contact-links">
          <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener">GitHub</a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
        </Reveal>
      </section>
    </main>
  )
}
