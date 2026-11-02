import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

type Theme = 'light' | 'dark'

// index.html sets data-theme before first paint (saved choice, else the OS setting).
const current = (): Theme => (document.documentElement.dataset.theme as Theme) ?? 'light'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(current)

  const flip = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch { /* storage blocked */ }
    setTheme(next)
  }

  return (
    <button type="button" className="theme-toggle" onClick={flip} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={theme} initial={{ rotate: -90, scale: 0, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 90, scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
