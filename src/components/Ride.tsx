import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { journey } from '../data/resume'

/** Scroll-driven story: a cyclist rides past career milestones as the page scrolls. */
export default function Ride() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  const n = journey.length
  const x = useTransform(p, [0, 1], ['0vw', `${-(n - 1) * (window.innerWidth <= 700 ? 70 : 42)}vw`])
  const spin = useTransform(p, [0, 1], [0, 360 * n * 1.5])
  const bob = useTransform(p, v => Math.sin(v * n * 12) * 2)
  const fill = useTransform(p, [0, 1], ['0%', '100%'])

  return (
    <section ref={ref} className="ride" style={{ height: `${n * 70}vh` }} aria-label="My journey">
      <div className="ride-stage">
        <p className="preprint ride-label">Scroll to ride · the journey so far</p>
        <motion.div className="ride-track" style={{ x }}>
          {journey.map((m, i) => (
            <Milestone key={m.year + m.title} m={m} i={i} n={n} progress={p} />
          ))}
        </motion.div>
        <div className="road"><motion.div className="road-fill" style={{ width: fill }} /></div>
        <motion.svg className="cyclist" viewBox="0 0 120 80" style={{ y: bob }} aria-hidden="true">
          <motion.g style={{ rotate: spin }} className="wheel"><Wheel cx={25} /></motion.g>
          <motion.g style={{ rotate: spin }} className="wheel"><Wheel cx={95} /></motion.g>
          <path d="M25 60 L50 35 L80 35 L95 60 M50 35 L60 60 L80 35 M60 60 L25 60 M80 35 L76 24 M70 24 L84 24" className="frame" />
          <path d="M52 30 L66 10 M66 10 L78 24 M66 10 L56 32 L60 60" className="rider" />
          <circle cx="68" cy="5" r="5" className="head" />
        </motion.svg>
      </div>
    </section>
  )
}

function Wheel({ cx }: { cx: number }) {
  return (
    <>
      <circle cx={cx} cy={60} r={16} className="tyre" />
      {[0, 45, 90, 135].map(a => (
        <line key={a} x1={cx + 16 * Math.cos(a * Math.PI / 180)} y1={60 + 16 * Math.sin(a * Math.PI / 180)}
          x2={cx - 16 * Math.cos(a * Math.PI / 180)} y2={60 - 16 * Math.sin(a * Math.PI / 180)} className="spoke" />
      ))}
    </>
  )
}

function Milestone({ m, i, n, progress }: { m: (typeof journey)[number]; i: number; n: number; progress: ReturnType<typeof useSpring> }) {
  const at = i / (n - 1)
  const opacity = useTransform(progress, [at - 0.18, at - 0.06, at + 0.12, at + 0.22], [0.25, 1, 1, 0.35])
  const scale = useTransform(progress, [at - 0.18, at - 0.04], [0.92, 1])
  return (
    <motion.div className="stop" style={{ opacity, scale }}>
      <span className="stop-year">{m.year}</span>
      <h3>{m.title}</h3>
      <p>{m.text}</p>
      <span className="stop-pin" aria-hidden="true" />
    </motion.div>
  )
}
