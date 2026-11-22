// Talks to the small API in server/ (same origin, under /api).

const sessionId = () => {
  try {
    let id = sessionStorage.getItem('sid')
    if (!id) { id = crypto.randomUUID().replace(/-/g, ''); sessionStorage.setItem('sid', id) }
    return id
  } catch { return undefined }
}

/** Records one page view. Never throws: analytics must not break the page. */
export function trackVisit(path: string) {
  if (path.startsWith('/admin')) return
  const body = JSON.stringify({ path, referrer: document.referrer || null, session: sessionId() })
  fetch('/api/visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
}

export type ContactForm = { name: string; email: string; topic: string; message: string; website: string }

export async function sendMessage(form: ContactForm): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const r = await fetch('/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, page: location.pathname }),
    })
    if (r.ok) return { ok: true }
    if (r.status === 422) return { ok: false, error: 'Please check your name, email and message (at least 10 characters).' }
    const j = await r.json().catch(() => null)
    return { ok: false, error: j?.detail ?? 'Something went wrong. Please email me directly.' }
  } catch {
    return { ok: false, error: 'Could not reach the server. Please email me directly.' }
  }
}

export type Row = { key: string; views: number; visitors: number }
export type Msg = { id: number; at: string; name: string; email: string; topic: string; message: string; page: string | null; status: string }
export type Summary = {
  days: number
  totals: { views: number; visitors: number; views_today: number; visitors_today: number; views_all_time: number; messages: number; messages_new: number }
  per_day: { day: string; views: number; visitors: number }[]
  pages: Row[]; referrers: Row[]; devices: Row[]; browsers: Row[]; messages: Msg[]
}

export async function getSummary(key: string, days: number): Promise<Summary | null> {
  const r = await fetch(`/api/admin/summary?days=${days}`, { headers: { 'X-Admin-Key': key } })
  return r.ok ? r.json() : null
}

export async function setMessageStatus(key: string, id: number, status: string) {
  await fetch(`/api/admin/messages/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'X-Admin-Key': key }, body: JSON.stringify({ status }) })
}
