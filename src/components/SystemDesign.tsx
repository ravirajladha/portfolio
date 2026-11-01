import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Design } from '../data/projects'

/** An animated, step-through architecture walkthrough with a quiz at the end. */
export default function SystemDesign({ design }: { design: Design }) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [reveal, setReveal] = useState(false)
  const last = design.steps.length - 1

  useEffect(() => {
    if (!playing) return
    if (step >= last) { setPlaying(false); return }
    const id = setTimeout(() => setStep(s => s + 1), 2200)
    return () => clearTimeout(id)
  }, [playing, step, last])

  return (
    <article className="design">
      <header>
        <h3>{design.title}</h3>
        <p className="muted">{design.tagline}</p>
      </header>

      <div className="flow" role="tablist" aria-label={`${design.title} components`}>
        {design.steps.map((s, i) => (
          <div key={s.node} className="flow-item">
            {i > 0 && <span className={'wire' + (i <= step ? ' live' : '')} aria-hidden="true" />}
            <button type="button" role="tab" aria-selected={i === step} className={i < step ? 'done' : ''}
              onClick={() => { setPlaying(false); setStep(i) }}>
              <span className="mono small">{i + 1}</span>{s.node}
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p key={step} className="flow-text" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}>
          <b>{design.steps[step].node}.</b> {design.steps[step].text}
        </motion.p>
      </AnimatePresence>

      <div className="flow-controls">
        <button type="button" className="button" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>← Prev</button>
        <button type="button" className="button primary" onClick={() => { if (step === last) setStep(0); setPlaying(p => !p) }}>
          {playing ? 'Pause' : step === last ? 'Replay' : 'Play'}
        </button>
        <button type="button" className="button" onClick={() => setStep(s => Math.min(last, s + 1))} disabled={step === last}>Next →</button>
      </div>

      <div className="quiz">
        <p><span className="mono small">train yourself</span><br />{design.question}</p>
        {reveal
          ? <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="answer">{design.answer}</motion.p>
          : <button type="button" className="button" onClick={() => setReveal(true)}>Reveal answer</button>}
      </div>
    </article>
  )
}
