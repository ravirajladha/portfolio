import { useEffect, useRef, useState, type ReactNode } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'section' | 'article' | 'li' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Tag>
  )
}

/** Splits a heading into words that blur in one after another. */
export function WordsIn({ text }: { text: string }) {
  return (
    <h1>
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.09, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {w}
        </motion.span>
      ))}
    </h1>
  )
}

/** Counts from 0 to `to` when visible. */
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) { setValue(to); return }
    const controls = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: v => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to, reduce])

  return <span ref={ref}>{value.toLocaleString('en-IN')}</span>
}

/** Types and deletes each phrase in turn. */
export function Typed({ words, onKey }: { words: string[]; onKey?: (key: string) => void }) {
  const reduce = useReducedMotion()
  const [text, setText] = useState('')

  useEffect(() => {
    if (reduce) { setText(words[0]); return }
    let w = 0, n = 0, deleting = false, timer: ReturnType<typeof setTimeout>
    const step = () => {
      n += deleting ? -1 : 1
      setText(words[w].slice(0, n))
      if (!deleting && n > 0) onKey?.(words[w][n - 1].toUpperCase())
      let wait = deleting ? 35 : 70
      if (!deleting && n === words[w].length) { deleting = true; wait = 1600 }
      else if (deleting && n === 0) { deleting = false; w = (w + 1) % words.length; wait = 300 }
      timer = setTimeout(step, wait)
    }
    timer = setTimeout(step, 1200)
    return () => clearTimeout(timer)
  }, [words, reduce, onKey])

  return <div className="typed mono"><span className="muted">currently: </span>{text}<span className="caret">▍</span></div>
}
