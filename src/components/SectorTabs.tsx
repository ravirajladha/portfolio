import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Sector } from '../data/resume'
import { TiltCard } from './Cinematic'

const ALL = 'all'

export default function SectorTabs({ sectors }: { sectors: Sector[] }) {
  const [active, setActive] = useState(ALL)
  const shown = active === ALL ? sectors : sectors.filter(s => s.id === active)
  const total = sectors.reduce((n, s) => n + s.projects.length, 0)

  return (
    <>
      <div className="sector-tabs" role="tablist" aria-label="Sectors">
        <button type="button" role="tab" aria-selected={active === ALL} onClick={() => setActive(ALL)}>All <span>{total}</span></button>
        {sectors.map(s => (
          <button key={s.id} type="button" role="tab" aria-selected={s.id === active} onClick={() => setActive(s.id)}>
            {s.label} <span>{s.projects.length}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} role="tabpanel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {shown.map(sector => (
            <div key={sector.id} className="sector-group">
              {active === ALL && <h3 className="sector-title">{sector.label}</h3>}
              <p className="sector-intro">{sector.intro}</p>
              <div className="cards">
                {sector.projects.map((p, i) => (
                  <motion.article key={p.name} initial={{ opacity: 0, y: 12, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}>
                    <TiltCard className="card">
                      <p className="scale mono">{p.scale}</p>
                      <h3>{p.name}</h3>
                      <p>{p.text}</p>
                      <p className="tags">{p.stack}</p>
                    </TiltCard>
                  </motion.article>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
