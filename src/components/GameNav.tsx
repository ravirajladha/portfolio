import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'

// Each home section is a "level". Visiting one for the first time unlocks it.
const levels = [
  { id: 'top', label: 'Start', icon: '🎮', to: '/' },
  { id: 'experience', label: 'Experience', icon: '💼', to: '/#experience' },
  { id: 'sectors', label: 'Quests', icon: '🗺️', to: '/#sectors' },
  { id: 'ai', label: 'AI/ML', icon: '🧠', to: '/#ai' },
  { id: 'architecture', label: 'Stack', icon: '🛠️', to: '/#architecture' },
  { id: 'contact', label: 'Contact', icon: '📮', to: '/#contact' },
]
const pages = [
  { id: '/projects', label: 'Projects', icon: '🧩', to: '/projects' },
  { id: '/blog', label: 'Blog', icon: '✍️', to: '/blog' },
]

export default function GameNav() {
  const { pathname } = useLocation()
  const home = pathname === '/'
  const [active, setActive] = useState('top')
  const [visited, setVisited] = useState<Set<string>>(() => new Set(['top']))
  const [toast, setToast] = useState<string | null>(null)
  const [xp, setXp] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, 'change', v => setXp(Math.round(v * 100)))

  // Track which level is on screen, and unlock it the first time.
  useEffect(() => {
    if (!home) return
    const els = levels.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const id = e.target.id
        setActive(id)
        setVisited(prev => {
          if (prev.has(id)) return prev
          const label = levels.find(l => l.id === id)?.label
          clearTimeout(timer.current)
          setToast(`Unlocked: ${label}`)
          timer.current = setTimeout(() => setToast(null), 2200)
          return new Set(prev).add(id)
        })
      })
    }, { rootMargin: '-45% 0px -50% 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [home])

  const current = home ? active : pathname.startsWith('/blog') ? '/blog' : pathname
  const level = visited.size

  return (
    <>
      <header className="hud">
        <Link to="/" className="hud-logo" aria-label="Home">
          <span className="hud-avatar">R</span>
          <span className="hud-lvl">LVL {level}</span>
        </Link>
        <nav className="hud-nav" aria-label="Main">
          {[...levels.slice(1), ...pages].map(item => {
            const on = current === item.id
            return (
              <Link key={item.id} to={item.to} className={'hud-item' + (on ? ' on' : '')} aria-current={on ? 'page' : undefined}>
                {on && <motion.span layoutId="hud-pill" className="hud-pill" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
                <span className="hud-icon" aria-hidden="true">{item.icon}</span>
                <span className="hud-label">{item.label}</span>
                {home && visited.has(item.id) && !on && <span className="hud-check" aria-label="visited">✓</span>}
              </Link>
            )
          })}
        </nav>
        <div className="hud-xp" title={`${xp}% explored`}>
          <span className="mono">XP</span>
          <div className="hud-bar"><motion.div className="hud-fill" animate={{ width: `${xp}%` }} transition={{ type: 'spring', stiffness: 200, damping: 30 }} /></div>
        </div>
      </header>
      <AnimatePresence>
        {toast && (
          <motion.div className="achievement" role="status" initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
            🏆 <b>Achievement</b> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
