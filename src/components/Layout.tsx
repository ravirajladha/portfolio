import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import { motion, useScroll, useSpring } from 'motion/react'
import GameNav from './GameNav'
import { profile } from '../data/resume'

export default function Layout() {
  const { pathname, hash } = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  // Scroll to the #section on navigation, or to the top for a new page.
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    const id = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 50)
    return () => clearTimeout(id)
  }, [pathname, hash])

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <GameNav />
      <Outlet />
      <footer>
        <span>
          © {new Date().getFullYear()} {profile.name} · <a href={profile.resume} target="_blank" rel="noopener">Résumé</a> ·{' '}
          <a href={profile.github} target="_blank" rel="noopener">GitHub</a> · <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        </span>
        <span className="mono small"><sup>*</sup>Equal contribution: me, coffee.</span>
      </footer>
    </>
  )
}
