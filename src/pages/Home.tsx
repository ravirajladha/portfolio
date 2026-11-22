import { lazy, Suspense, useCallback, useRef } from 'react'
import { Link } from 'react-router'
import { ai, experience, now, profile, results, sectors, stack, training } from '../data/resume'
import { posts, formatDate } from '../lib/posts'
import { Reveal, Typed, WordsIn } from '../components/Motion'
import { ExperienceSwitcher, Highlight, MagneticContact, NeuralNet, ScrollTimeline, StackExplode, StatTiles, Ticker, TiltCard } from '../components/Cinematic'
import AttentionFigure from '../components/AttentionFigure'
import SectorTabs from '../components/SectorTabs'
import Ride from '../components/Ride'
import { Head, Section } from '../components/Section'
import type { KeyStore } from '../components/KeyboardHero'

const KeyboardHero = lazy(() => import('../components/KeyboardHero'))

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
          <Link className="button" to="/epoch">📱 Epoch app</Link>
        </Reveal>
      </section>

      {/* The Ride: scroll story */}
      <Ride />

      {/* E2 Results + E3 Intro */}
      <Section id="intro" tone="rose" band="light">
        <StatTiles items={results} />
        <div className="intro-gap" />
        <Head n={1} eyebrow="Who I am" title="About" look="chip" />
        {profile.intro.map(t => <Highlight key={t} text={t} />)}
      </Section>

      {/* E4 Experience */}
      <Section id="experience" tone="amber" band="dark">
        <Head n={2} eyebrow="Where I've worked" title="Experience" look="num" />
        <Reveal><ExperienceSwitcher jobs={experience} /></Reveal>
      </Section>

      {/* E5 Sectors */}
      <Section id="sectors" tone="teal" band="light">
        <Head n={3} eyebrow="17 products, 6 industries" title="Work by sector" look="line" />
        <Reveal><SectorTabs sectors={sectors} /></Reveal>
        <Reveal><p className="more"><Link className="button primary" to="/projects#sde-journey">My SDE journey: every project, with live links →</Link></p></Reveal>
      </Section>

      {/* E6 AI / ML */}
      <Section id="ai" tone="violet" band="dark">
        <Head n={4} eyebrow="Models in production" title="AI / ML" look="chip" />
        <Reveal className="nn-card"><NeuralNet inputs={ai.inputs} outputs={ai.outputs} /></Reveal>
        <div className="pillars">
          {ai.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}><TiltCard className="pillar"><h3>{p.title}</h3><p>{p.text}</p></TiltCard></Reveal>
          ))}
        </div>
        <Reveal><AttentionFigure /></Reveal>
      </Section>

      {/* E7 Stack */}
      <Section id="architecture" tone="sky" band="light">
        <Head n={5} eyebrow="Tools I reach for" title="Stack" look="num" />
        <Reveal><StackExplode layers={stack} /></Reveal>
      </Section>

      {/* E8 Training */}
      <Section id="training" tone="emerald" band="dark">
        <Head n={6} eyebrow="Degrees and courses" title="Learning" look="line" />
        <ScrollTimeline items={training} />
      </Section>

      {/* Writing */}
      <Section id="writing" tone="coral" band="light">
        <Head n={7} eyebrow="One practical post a month" title="Writing" look="chip" />
        <div className="post-cards">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link to={`/blog/${p.slug}`} className="post-link">
                <TiltCard className="post-card">
                  <span className="mono small">{formatDate(p.date)} · {p.tag}</span>
                  <strong>{p.title}</strong>
                  <span className="post-more">Read →</span>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* E9 Now + E10 Contact */}
      <Section id="now" tone="rose" band="dark" className="band-join-next">
        <Head n={8} eyebrow="This month" title="Now" look="num" />
        <Ticker items={now} />
      </Section>
      <Section id="contact" tone="rose" band="dark" className="band-last">
        <Head n={9} eyebrow="Say hello" title="Contact" look="line" />
        <Reveal><MagneticContact email={profile.email} /></Reveal>
        <Reveal className="contact-links">
          <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener">GitHub</a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
        </Reveal>
      </Section>
    </main>
  )
}
