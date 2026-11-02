// One interactive, animated piece per home-page section.
import { useRef, useState, type ReactNode, type PointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { CountUp } from './Motion'
import type { Job } from '../data/resume'

/* E2 / E5: a card that tilts toward the pointer and shows a glow where it is. */
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const mx = useMotionValue(0.5), my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 18 })
  const glow = useTransform([mx, my], ([x, y]) => `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(var(--heat), .22), transparent 55%)`)
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height)
  }
  const leave = () => { mx.set(0.5); my.set(0.5) }
  return (
    <motion.div className={'tilt ' + className} style={{ rotateX: rx, rotateY: ry, backgroundImage: glow }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.div>
  )
}

/* E2: stat tiles. */
export function StatTiles({ items }: { items: { label: string; value: number; suffix?: string }[] }) {
  return (
    <div className="stats">
      {items.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}>
          <TiltCard className="stat">
            <span className="stat-num"><CountUp to={s.value} />{s.suffix}</span>
            <span className="stat-label">{s.label}</span>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  )
}

/* E3: sentences whose *marked* words get a highlighter sweep when they scroll in. */
export function Highlight({ text }: { text: string }) {
  return (
    <p className="big-line">
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith('*')
          ? <motion.mark key={i} initial={{ backgroundSize: '0% 100%' }} whileInView={{ backgroundSize: '100% 100%' }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}>{part.slice(1, -1)}</motion.mark>
          : <span key={i}>{part}</span>,
      )}
    </p>
  )
}

/* E4: company switcher with a sliding pill, staggered points and a shining award. */
export function ExperienceSwitcher({ jobs }: { jobs: Job[] }) {
  const [id, setId] = useState(jobs[0].id)
  const job = jobs.find(j => j.id === id)!
  return (
    <div className="xp">
      <div className="xp-tabs" role="tablist">
        {jobs.map(j => (
          <button key={j.id} type="button" role="tab" aria-selected={j.id === id} onClick={() => setId(j.id)}>
            {j.id === id && <motion.span layoutId="xp-pill" className="xp-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
            <span className="xp-company">{j.company}</span>
            <span className="xp-period">{j.period}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={job.id} className="xp-panel" initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
          <h3>{job.role}</h3>
          <ul className="xp-points">
            {job.points.map((p, i) => (
              <motion.li key={p} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>{p}</motion.li>
            ))}
          </ul>
          <div className="chips">
            {job.tags.map((t, i) => (
              <motion.span key={t} className="chip" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.05, type: 'spring' }}>{t}</motion.span>
            ))}
          </div>
          <p className="badge">★ {job.award}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* E6: a small neural network with signals flowing through it. Hover a node to light its edges. */
export function NeuralNet({ inputs, outputs }: { inputs: string[]; outputs: string[] }) {
  const layers = [inputs.length, 4, 4, outputs.length]
  const W = 520, H = 260
  const pos = layers.map((n, l) => Array.from({ length: n }, (_, i) => ({ x: 70 + l * ((W - 140) / (layers.length - 1)), y: H / 2 + (i - (n - 1) / 2) * 56 })))
  const [hover, setHover] = useState<string | null>(null)
  const edges = pos.slice(0, -1).flatMap((col, l) => col.flatMap((a, i) => pos[l + 1].map((b, j) => ({ id: `${l}-${i}-${j}`, a, b, from: `${l}-${i}`, to: `${l + 1}-${j}` }))))

  return (
    <svg className="nn" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A neural network turning data, text and code into scores and answers">
      {edges.map((e, k) => {
        const lit = hover !== null && (e.from === hover || e.to === hover)
        return <line key={e.id} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} className={'nn-edge' + (lit ? ' lit' : '')} style={{ animationDelay: `${(k % 7) * 0.25}s` }} />
      })}
      {pos.map((col, l) => col.map((p, i) => {
        const id = `${l}-${i}`
        const label = l === 0 ? inputs[i] : l === layers.length - 1 ? outputs[i] : ''
        return (
          <g key={id} onPointerEnter={() => setHover(id)} onPointerLeave={() => setHover(null)} className="nn-node-g">
            <circle cx={p.x} cy={p.y} r={hover === id ? 13 : 10} className="nn-node" style={{ animationDelay: `${(l + i) * 0.3}s` }} />
            {label && <text x={l === 0 ? p.x - 20 : p.x + 20} y={p.y + 4} textAnchor={l === 0 ? 'end' : 'start'} className="nn-label">{label}</text>}
          </g>
        )
      }))}
    </svg>
  )
}

/* E7: an exploded 3D stack. Hover spreads the layers; picking one shows its tools. */
export function StackExplode({ layers }: { layers: { layer: string; items: string[] }[] }) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  return (
    <div className="stack3d-wrap">
      <div className={'stack3d' + (open ? ' open' : '')} onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)}>
        {layers.map((l, i) => (
          <button key={l.layer} type="button" className={'plane' + (i === active ? ' on' : '')} style={{ ['--i' as string]: layers.length - 1 - i }}
            onClick={() => setActive(i)} onPointerEnter={() => setActive(i)} onFocus={() => { setActive(i); setOpen(true) }}>
            <span>{l.layer}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} className="stack-info" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
          <p className="mono small">layer {layers.length - active} / {layers.length}</p>
          <h3>{layers[active].layer}</h3>
          <div className="chips">{layers[active].items.map(t => <span key={t} className="chip">{t}</span>)}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* E8: a timeline whose line draws as you scroll. */
export function ScrollTimeline({ items }: { items: { period: string; title: string; org: string }[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 50%'] })
  const h = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return (
    <div ref={ref} className="tl">
      <motion.span className="tl-line" style={{ scaleY: h }} />
      {items.map((t, i) => (
        <motion.div key={t.title} className="tl-item" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: i * 0.1 }}>
          <span className="tl-dot" />
          <span className="mono small">{t.period}</span>
          <h3>{t.title}</h3>
          <p className="muted">{t.org}</p>
        </motion.div>
      ))}
    </div>
  )
}

/* E9: an endless ticker strip. */
export function Ticker({ items }: { items: string[] }) {
  const row = [...items, ...items]
  return (
    <div className="ticker" aria-label={items.join('. ')}>
      <div className="ticker-track" aria-hidden="true">
        {row.map((t, i) => <span key={i}>{t}<b>✦</b></span>)}
      </div>
    </div>
  )
}

/* E10: a magnetic button that leans toward the pointer, plus one-click email copy. */
export function MagneticContact({ email }: { email: string }) {
  const x = useSpring(0, { stiffness: 250, damping: 15 }), y = useSpring(0, { stiffness: 250, damping: 15 })
  const [copied, setCopied] = useState(false)
  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ }
  }
  return (
    <div className="contact-hero">
      <motion.a href={`mailto:${email}`} className="magnet" style={{ x, y }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }}>Say hi 👋</motion.a>
      <button type="button" className="copy" onClick={copy}>
        <span className="mono">{email}</span>
        <AnimatePresence mode="wait">
          <motion.span key={String(copied)} className="copy-state" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>{copied ? 'Copied ✓' : 'Copy'}</motion.span>
        </AnimatePresence>
      </button>
    </div>
  )
}
