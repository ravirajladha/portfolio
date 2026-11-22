import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sendMessage } from '../lib/api'

export const topics = [
  { id: 'mentorship', icon: '🧭', label: 'Mentorship', hint: 'Guidance on your developer or AI/ML path' },
  { id: 'project', icon: '🛠️', label: 'Build a project', hint: 'A website, an app or an AI feature' },
  { id: 'aiml', icon: '🧠', label: 'Learn AI/ML together', hint: 'Study partner, or join the journey' },
  { id: 'job', icon: '💼', label: 'Job opportunity', hint: 'A role you think I would fit' },
  { id: 'feedback', icon: '💬', label: 'Feedback', hint: 'On this site, a post or Epoch' },
]

const empty = { name: '', email: '', topic: 'mentorship', message: '', website: '' }

export default function ContactForm() {
  const [form, setForm] = useState(empty)
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')
  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) => setForm(f => ({ ...f, [k]: e.target.value }))
  const topic = topics.find(t => t.id === form.topic)!

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setState('sending'); setError('')
    const r = await sendMessage(form)
    if (r.ok) { setState('sent'); setForm(empty) } else { setState('idle'); setError(r.error) }
  }

  return (
    <AnimatePresence mode="wait">
      {state === 'sent' ? (
        <motion.div key="done" className="cf cf-done" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} role="status">
          <span className="cf-tick" aria-hidden="true">✓</span>
          <h3>Message received</h3>
          <p>Thank you. I read every message and usually reply within two days.</p>
          <button type="button" className="button" onClick={() => setState('idle')}>Send another</button>
        </motion.div>
      ) : (
        <motion.form key="form" className="cf" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <fieldset className="cf-topics">
            <legend>What is this about?</legend>
            {topics.map(t => (
              <label key={t.id} className={form.topic === t.id ? 'on' : ''}>
                <input type="radio" name="topic" value={t.id} checked={form.topic === t.id} onChange={set('topic')} />
                <span aria-hidden="true">{t.icon}</span>{t.label}
              </label>
            ))}
          </fieldset>
          <p className="cf-hint">{topic.hint}</p>
          <div className="cf-row">
            <label>Your name<input required minLength={2} maxLength={120} autoComplete="name" value={form.name} onChange={set('name')} /></label>
            <label>Email<input required type="email" maxLength={190} autoComplete="email" value={form.email} onChange={set('email')} /></label>
          </div>
          <label>Message<textarea required minLength={10} maxLength={4000} rows={5} value={form.message} onChange={set('message')} placeholder="A few lines about what you have in mind" /></label>
          {/* Honeypot: hidden from people, tempting for bots */}
          <label className="cf-hp" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label>
          {error && <p className="cf-error" role="alert">{error}</p>}
          <div className="cf-foot">
            <button className="button primary" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message →'}</button>
            <span className="small">Your details are used only to reply to you.</span>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
