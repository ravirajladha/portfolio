import type { ReactNode } from 'react'
import { motion } from 'motion/react'

// A page section with its own colour (tone) and background (band).
// - tone: recolours every accent inside the section (chips, cards, gradients)
// - band: 'light' or 'dark' paints a full-width background so sections alternate
// - look: three header styles so neighbouring sections don't look the same
export type Tone = 'rose' | 'amber' | 'teal' | 'violet' | 'sky' | 'emerald' | 'coral'
export type Look = 'chip' | 'num' | 'line'

export function Section({ id, tone, band, className = '', children }: {
  id?: string; tone: Tone; band?: 'light' | 'dark'; className?: string; children: ReactNode
}) {
  return (
    <section id={id} className={`paper-section band ${className}`} data-tone={tone} data-band={band}>
      {children}
    </section>
  )
}

export function Head({ n, title, eyebrow, look = 'chip', sub }: {
  n?: number | string; title: string; eyebrow: string; look?: Look; sub?: string
}) {
  const num = typeof n === 'number' ? String(n).padStart(2, '0') : n
  return (
    <motion.header
      className={`sh sh-${look}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {look === 'num' && num && <span className="sh-ghost" aria-hidden="true">{num}</span>}
      <p className="sh-eyebrow"><i aria-hidden="true" />{eyebrow}</p>
      <h2>{look !== 'num' && num && <span className="sh-n">{num}</span>}<span className="sh-t">{title}</span></h2>
      {look === 'line' && (
        <motion.span className="sh-bar" aria-hidden="true"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }} />
      )}
      {sub && <p className="sh-sub">{sub}</p>}
    </motion.header>
  )
}
