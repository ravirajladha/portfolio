import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// A hand-tuned (not learned) self-attention map over one sentence.
const tokens = ['I', 'build', 'reliable', 'software', 'for', 'real-world', 'problems']
const heads = ([
  { name: 'syntax', rows: [{ 1: 6, 0: 1 }, { 0: 4, 3: 4, 1: 1 }, { 3: 6, 2: 1 }, { 1: 4, 2: 3, 3: 1 }, { 6: 4, 1: 2, 4: 1 }, { 6: 6, 5: 1 }, { 4: 3, 5: 4, 6: 1 }] },
  { name: 'meaning', rows: [{ 3: 4, 6: 3, 0: 1 }, { 3: 6, 6: 2 }, { 3: 5, 6: 3 }, { 2: 4, 6: 4, 3: 1 }, { 6: 6, 5: 1 }, { 6: 6, 3: 1 }, { 5: 5, 3: 3, 6: 1 }] },
  { name: 'engineer', rows: [{ 2: 6, 0: 1 }, { 2: 5, 1: 1, 3: 1 }, { 2: 8 }, { 2: 6, 3: 1 }, { 2: 4, 6: 2 }, { 2: 4, 5: 2 }, { 2: 5, 5: 2 }] },
] as { name: string; rows: Record<number, number>[] }[]).map(h => ({
  name: h.name,
  matrix: h.rows.map(r => {
    const w = tokens.map((_, j) => (r[j] ?? 0) + 0.15)
    const sum = w.reduce((a, b) => a + b, 0)
    return w.map(v => v / sum)
  }),
}))

const y = (i: number) => 30 + i * 40

export default function AttentionFigure() {
  const [head, setHead] = useState(0)
  const [row, setRow] = useState(1)
  const [auto, setAuto] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!auto || reduce) return
    const id = setInterval(() => setRow(r => (r + 1) % tokens.length), 1800)
    return () => clearInterval(id)
  }, [auto, reduce])

  const pick = (i: number) => { setAuto(false); setRow(i) }
  const m = heads[head].matrix
  const top = Math.max(...m[row])

  return (
    <figure className="attention">
      <div className="fig-controls" role="tablist" aria-label="Attention heads">
        <span className="mono small">head</span>
        {heads.map((h, i) => (
          <button key={h.name} type="button" role="tab" aria-selected={i === head} onClick={() => setHead(i)}>{i + 1} · {h.name}</button>
        ))}
      </div>
      <div className="fig-body">
        <svg className="arcs" viewBox="0 0 360 300" role="img" aria-label="Lines connecting each word to the words it attends to">
          {m[row].map((w, j) => (
            <line key={j} x1={118} y1={y(row) - 4} x2={242} y2={y(j) - 4} strokeOpacity={Math.min(1, w * 2.2)} strokeWidth={1 + w * 9} />
          ))}
          {tokens.map((t, i) => (
            <text key={'l' + i} x={110} y={y(i)} textAnchor="end" className={i === row ? 'on' : ''} onMouseEnter={() => pick(i)} onClick={() => pick(i)}>{t}</text>
          ))}
          {tokens.map((t, j) => (
            <text key={'r' + j} x={250} y={y(j)} className={m[row][j] === top ? 'target' : ''}>{t}</text>
          ))}
        </svg>
        <div className="heatmap" style={{ gridTemplateColumns: `auto repeat(${tokens.length}, 1fr)` }} aria-hidden="true">
          <span />
          {tokens.map(t => <span key={t} className="lbl col">{t}</span>)}
          {m.map((r, i) => [
            <span key={'h' + i} className="lbl">{tokens[i]}</span>,
            ...r.map((w, j) => (
              <span key={i + '-' + j} className={'cell' + (i === row ? ' row' : '')} style={{ ['--w' as string]: w.toFixed(3) }}
                title={`${tokens[i]} → ${tokens[j]}: ${w.toFixed(2)}`} onMouseEnter={() => pick(i)} onClick={() => pick(i)} />
            )),
          ])}
        </div>
      </div>
      <figcaption>
        <strong>Self-attention</strong>, the idea this domain is named after. Hover a word to see what it focuses on.
      </figcaption>
    </figure>
  )
}
