import { useEffect } from 'react'
import { Link } from 'react-router'
import { Reveal, WordsIn } from '../components/Motion'

// Shareable install page for Epoch: attentionisallyouneed.in/epoch
// The APK lives on the API host; Epoch-latest.apk always points at the newest build.
const API = 'https://epoch-api.attentionisallyouneed.in'
const DOWNLOAD = API + '/download/'
const APK = DOWNLOAD + 'Epoch-latest.apk'
const VERSION = '0.3.2'

const features = [
  { title: '6,393 questions', text: 'A ladder from Python basics to shipping LLM apps: ML, deep learning, NLP, RL, MLOps, cloud-native and edge ML.' },
  { title: 'Spaced repetition', text: 'Epoch tracks what you forget and brings it back right before you would lose it.' },
  { title: 'Two minutes a day', text: 'Short quizzes built for a tea break, a metro ride or the gap between meetings.' },
  { title: 'Works offline', text: 'Questions ship inside the app. Progress syncs when you are back online.' },
]

const AndroidLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">
    <path d="M17.6 9.48l1.84-3.18a.38.38 0 0 0-.14-.52.38.38 0 0 0-.52.14l-1.87 3.23a11.5 11.5 0 0 0-9.82 0L5.22 5.92a.38.38 0 0 0-.52-.14.38.38 0 0 0-.14.52L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
  </svg>
)

export default function Epoch() {
  useEffect(() => { document.title = 'Epoch: learn AI/ML one epoch a day | Download for Android' }, [])

  return (
    <main className="article epoch-page">
      <Reveal><p className="preprint">Appendix E · an app I built</p></Reveal>
      <Reveal><img className="epoch-icon" src="/epoch-icon.png" alt="Epoch app icon" width="112" height="112" /></Reveal>
      <WordsIn text="Epoch: learn AI/ML one epoch a day" />
      <Reveal><p className="tagline">A revision app for people learning AI and ML alongside a job. Short quizzes, every day, that remember what you got wrong.</p></Reveal>

      <Reveal className="epoch-cta">
        <a className="button primary android-btn" href={APK} download>
          <AndroidLogo /> Download for Android
        </a>
        <p className="mono small">Version {VERSION} · Android 8.0 or newer · free</p>
      </Reveal>

      <section className="paper-section">
        <Reveal><h2><span>E.1</span>What you get</h2></Reveal>
        <div className="cards">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="card"><h3>{f.title}</h3><p>{f.text}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="paper-section">
        <Reveal><h2><span>E.2</span>How to install</h2></Reveal>
        <Reveal>
          <ol className="epoch-steps">
            <li>Tap <strong>Download for Android</strong>, then open the downloaded file.</li>
            <li>If Android asks, allow installs from your browser, then tap <strong>Install</strong>.</li>
            <li>If Play Protect warns about an unknown app, tap <strong>More details → Install anyway</strong>. Epoch is not on the Play Store yet.</li>
          </ol>
        </Reveal>
        <Reveal><p className="small">iPhone version coming later. <a href={API + '/privacy'}>Privacy policy</a> · <a href={API + '/delete-account'}>Delete account</a></p></Reveal>
      </section>

      <section className="paper-section">
        <Reveal><h2><span>E.3</span>Under the hood</h2></Reveal>
        <Reveal><p>Kotlin Multiplatform and Compose on the phone, a FastAPI + PostgreSQL backend, and consented learning events that train models of how people forget. Built by <Link to="/">Ravi Raj Ladha</Link>.</p></Reveal>
      </section>
    </main>
  )
}
