import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { getSummary, setMessageStatus, type Row, type Summary } from '../lib/api'
import { topics } from '../components/ContactForm'

// Private stats page at /admin. Not linked from the site. The key is checked by the server
// on every request; it is kept only in this browser tab (sessionStorage).

const Bars = ({ title, rows, empty }: { title: string; rows: Row[]; empty: string }) => {
  const max = Math.max(1, ...rows.map(r => r.views))
  return (
    <div className="ad-card">
      <h3>{title}</h3>
      {rows.length === 0 && <p className="small">{empty}</p>}
      {rows.map(r => (
        <div key={r.key} className="ad-bar">
          <i style={{ width: `${(r.views / max) * 100}%` }} />
          <span className="ad-key">{r.key}</span>
          <span className="ad-val">{r.views}<small> · {r.visitors} people</small></span>
        </div>
      ))}
    </div>
  )
}

export default function Admin() {
  const [key, setKey] = useState(() => sessionStorage.getItem('adminKey') ?? '')
  const [input, setInput] = useState('')
  const [days, setDays] = useState(30)
  const [data, setData] = useState<Summary | null>(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!key) return
    const s = await getSummary(key, days).catch(() => null)
    if (s) { setData(s); setError('') } else { setData(null); setError('Wrong key, or the server is not reachable.'); sessionStorage.removeItem('adminKey'); setKey('') }
  }, [key, days])

  useEffect(() => { document.title = 'Stats | Portfolio'; load() }, [load])

  const login = (e: FormEvent) => { e.preventDefault(); sessionStorage.setItem('adminKey', input); setKey(input); setInput('') }
  const mark = async (id: number, status: string) => { await setMessageStatus(key, id, status); load() }

  if (!key || !data) return (
    <main className="article">
      <p className="preprint">Private</p>
      <h1>Portfolio stats</h1>
      <form className="cf ad-login" onSubmit={login}>
        <label>Admin key<input type="password" required autoFocus value={input} onChange={e => setInput(e.target.value)} /></label>
        {error && <p className="cf-error" role="alert">{error}</p>}
        <div className="cf-foot"><button className="button primary">Open</button></div>
      </form>
    </main>
  )

  const t = data.totals
  const maxDay = Math.max(1, ...data.per_day.map(d => d.views))
  const tiles = [
    ['Visitors today', t.visitors_today], ['Views today', t.views_today],
    [`Visitors, ${data.days} days`, t.visitors], [`Views, ${data.days} days`, t.views],
    ['Views, all time', t.views_all_time], ['New messages', t.messages_new],
  ] as const

  return (
    <main className="article ad">
      <p className="preprint">Private · only you can see this</p>
      <h1>Portfolio stats</h1>
      <div className="ad-tools">
        {[7, 30, 90, 365].map(d => <button key={d} className={`button ${d === days ? 'primary' : ''}`} onClick={() => setDays(d)}>{d === 365 ? '1 year' : `${d} days`}</button>)}
        <button className="button" onClick={load}>Refresh</button>
        <button className="button" onClick={() => { sessionStorage.removeItem('adminKey'); setKey(''); setData(null) }}>Lock</button>
      </div>

      <div className="stats ad-tiles">
        {tiles.map(([label, n]) => <div key={label} className="stat"><span className="stat-num">{n.toLocaleString()}</span><span className="stat-label">{label}</span></div>)}
      </div>

      <div className="ad-card">
        <h3>Views per day</h3>
        {data.per_day.length === 0 ? <p className="small">No visits recorded yet.</p> : (
          <div className="ad-days">
            {data.per_day.map(d => (
              <div key={d.day} title={`${d.day}: ${d.views} views, ${d.visitors} people`}>
                <i style={{ height: `${(d.views / maxDay) * 100}%` }} />
                <small>{d.day.slice(8)}</small>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ad-grid">
        <Bars title="Pages people open" rows={data.pages} empty="Nothing yet." />
        <Bars title="Where they come from" rows={data.referrers} empty="No outside links yet. Direct visits are not listed." />
        <Bars title="Devices" rows={data.devices} empty="Nothing yet." />
        <Bars title="Browsers" rows={data.browsers} empty="Nothing yet." />
      </div>

      <div className="ad-card">
        <h3>Messages ({t.messages})</h3>
        {data.messages.length === 0 && <p className="small">No messages yet.</p>}
        {data.messages.map(m => (
          <article key={m.id} className={`ad-msg ${m.status}`}>
            <header>
              <strong>{m.name}</strong> <a href={`mailto:${m.email}`}>{m.email}</a>
              <span className="chip">{topics.find(x => x.id === m.topic)?.label ?? m.topic}</span>
              <span className="small">{new Date(m.at).toLocaleString()} {m.page && `· from ${m.page}`}</span>
            </header>
            <p>{m.message}</p>
            <div className="ad-tools">
              {['new', 'read', 'replied'].map(s => <button key={s} className={`button ${m.status === s ? 'primary' : ''}`} onClick={() => mark(m.id, s)}>{s}</button>)}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
