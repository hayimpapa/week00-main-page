import { useState } from 'react'
import './App.css'

// ─── Week data ──────────────────────────────────────────────────────────────
// Update this array each week.
// Set live: true and add url + githubUrl when the app is deployed.
interface Week {
  week: number
  title: string
  description: string
  url: string        // deployed app URL
  githubUrl: string  // GitHub repo for this week
  live: boolean      // manually flip to true when app is deployed
  liveDate: string   // YYYY-MM-DD — card becomes flippable on this date
}

const START_DATE = '2026-03-08'

function getWeekLiveDate(weekNum: number): string {
  const [y, m, d] = START_DATE.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + (weekNum - 1) * 7)
  const yy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

const weeks: Week[] = [
  {
    week: 1,
    title: 'The Planner',
    description: 'Track and plan all 52 builds',
    url: 'https://52-app.com/week01',
    githubUrl: 'https://github.com/hayimpapa/week01-the-planner',
    live: true,
    liveDate: '2026-03-08',
  },
  {
    week: 2,
    title: 'Receipt Scanner & Analyser',
    description: 'Scan receipts and analyse grocery and shopping spending',
    url: 'https://52-app.com/week02',
    githubUrl: 'https://github.com/hayimpapa/week02-receipt-analyser',
    live: true,
    liveDate: '2026-03-15',
  },
  {
    week: 3,
    title: 'Flappy Tram',
    description: 'A flappy bird style game with Melbourne trams',
    url: 'https://week03-flappy-tram.vercel.app/',
    githubUrl: 'https://github.com/hayimpapa/week03-flappy-tram',
    live: true,
    liveDate: '2026-03-22',
  },
  {
    week: 4,
    title: 'Math Monsters',
    description: 'Math Monsters',
    url: 'https://week04-mathmonsters.vercel.app/',
    githubUrl: 'https://github.com/hayimpapa/week04-mathmonsters',
    live: true,
    liveDate: getWeekLiveDate(4),
  },
  {
    week: 5,
    title: 'Meno Mano',
    description: 'Meno Mano - an easy game, inspired by La Linea',
    url: 'https://week05-menomano.vercel.app/',
    githubUrl: 'https://github.com/hayimpapa/week05-menomano',
    live: true,
    liveDate: getWeekLiveDate(5),
  },
  {
    week: 6,
    title: 'Squad Health',
    description: 'A Spotify-inspired squad health check for agile teams',
    url: 'https://week06-agile-team-health-check.vercel.app/',
    githubUrl: 'https://github.com/hayimpapa/week06-agile-team-health-check',
    live: true,
    liveDate: getWeekLiveDate(6),
  },
  {
    week: 7,
    title: 'Meeting Prep Coach',
    description: 'Your AI sparring partner for sharper meetings',
    url: 'https://week07-meeting-prep.vercel.app/',
    githubUrl: '',
    live: true,
    liveDate: getWeekLiveDate(7),
  },
  // Weeks 8–52: fill in title/description/url/githubUrl each week
  ...Array.from({ length: 45 }, (_, i) => ({
    week: i + 8,
    title: '',
    description: '',
    url: '',
    githubUrl: '',
    live: false,
    liveDate: getWeekLiveDate(i + 8),
  })),
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Parse a YYYY-MM-DD string as a LOCAL date (avoids UTC off-by-one)
function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function localToday(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

// Card is flippable when its scheduled date has arrived (regardless of live flag)
function isDateUnlocked(w: Week): boolean {
  const today = localToday()
  const scheduled = parseLocalDate(w.liveDate)
  const unlocked = today >= scheduled
  console.log(
    `Week ${w.week} — today: ${today.toDateString()}, liveDate: ${scheduled.toDateString()}, dateUnlocked: ${unlocked}, live: ${w.live}`
  )
  return unlocked
}

// Card shows full Launch + GitHub buttons only when manually marked live AND date arrived
function isFullyLive(w: Week): boolean {
  return w.live && isDateUnlocked(w)
}

function formatWeekDate(dateStr: string): string {
  const d = parseLocalDate(dateStr)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

// ─── Card Icons ──────────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="card-icon" aria-hidden="true">
      <rect x="8" y="14" width="48" height="42" rx="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M8 26h48" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 8v12M44 8v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="16" y="32" width="8" height="6" rx="1.5" fill="currentColor" opacity="0.25" />
      <rect x="28" y="32" width="8" height="6" rx="1.5" fill="currentColor" opacity="0.25" />
      <rect x="40" y="32" width="8" height="6" rx="1.5" fill="currentColor" opacity="0.25" />
      <rect x="16" y="42" width="8" height="6" rx="1.5" fill="currentColor" opacity="0.25" />
      <rect x="28" y="42" width="8" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

function ReceiptScanIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="card-icon" aria-hidden="true">
      <path d="M16 8l4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4v48l-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4V8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 22h16M24 30h12M24 38h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="2" y="26" width="60" height="4" rx="2" fill="currentColor" opacity="0.18" />
      <path d="M6 28h52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" opacity="0.5" />
    </svg>
  )
}

function TramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="card-icon" aria-hidden="true">
      <rect x="14" y="16" width="36" height="36" rx="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 36h36" stroke="currentColor" strokeWidth="2.5" />
      <rect x="20" y="22" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <rect x="34" y="22" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="24" cy="44" r="3" fill="currentColor" opacity="0.35" />
      <circle cx="40" cy="44" r="3" fill="currentColor" opacity="0.35" />
      <path d="M32 6v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 6h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 52l-4 6M44 52l4 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function MathMonsterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="card-icon" aria-hidden="true">
      <ellipse cx="32" cy="36" rx="22" ry="20" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="32" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="40" cy="32" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="32" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="40" cy="32" r="2" fill="currentColor" opacity="0.5" />
      <path d="M26 44c2 2 8 2 12 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 16c-2-6 2-10 4-8M42 16c2-6-2-10-4-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <text x="14" y="12" fontSize="10" fontWeight="bold" fill="currentColor" opacity="0.3" fontFamily="Georgia, serif">+</text>
      <text x="44" y="12" fontSize="10" fontWeight="bold" fill="currentColor" opacity="0.3" fontFamily="Georgia, serif">=</text>
      <text x="4" y="42" fontSize="10" fontWeight="bold" fill="currentColor" opacity="0.2" fontFamily="Georgia, serif">÷</text>
      <text x="54" y="42" fontSize="10" fontWeight="bold" fill="currentColor" opacity="0.2" fontFamily="Georgia, serif">×</text>
    </svg>
  )
}

function MenoManoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="card-icon" aria-hidden="true">
      <path d="M8 52c8-2 14-4 20-4s12 2 20 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="29" cy="22" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="35" cy="22" r="2" fill="currentColor" opacity="0.5" />
      <path d="M28 28c1.5 1.5 4.5 1.5 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 34v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 42l-6 6M32 42l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 37l-8-3M32 37l8-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 14c2-4 6-4 8-2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

function SquadHealthIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="card-icon" aria-hidden="true">
      <rect x="10" y="8" width="44" height="48" rx="6" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.75" />
      <circle cx="20" cy="32" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="20" cy="44" r="4" fill="currentColor" opacity="0.3" />
      <path d="M28 20h18M28 32h14M28 44h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 54c-1-4 2-7 5-7s6 3 5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

function MeetingPrepIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="card-icon" aria-hidden="true">
      <path d="M10 16c0-4 2-6 6-6h32c4 0 6 2 6 6v24c0 4-2 6-6 6H28l-8 8v-8h-4c-4 0-6-2-6-6V16z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 22h24M18 28h18M18 34h22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      <text x="48" y="60" fontSize="16" fontWeight="bold" fill="currentColor" opacity="0.4" fontFamily="Georgia, serif">?</text>
      <text x="4" y="18" fontSize="12" fontWeight="bold" fill="currentColor" opacity="0.25" fontFamily="Georgia, serif">?</text>
      <text x="54" y="14" fontSize="10" fontWeight="bold" fill="currentColor" opacity="0.2" fontFamily="Georgia, serif">?</text>
    </svg>
  )
}

function getCardIcon(weekNum: number) {
  switch (weekNum) {
    case 1: return <CalendarIcon />
    case 2: return <ReceiptScanIcon />
    case 3: return <TramIcon />
    case 4: return <MathMonsterIcon />
    case 5: return <MenoManoIcon />
    case 6: return <SquadHealthIcon />
    case 7: return <MeetingPrepIcon />
    default: return null
  }
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

// ─── Flip Card ────────────────────────────────────────────────────────────────

function WeekCard({ w }: { w: Week }) {
  const [flipped, setFlipped] = useState(false)
  const dateOpen = isDateUnlocked(w)
  const fullyLive = isFullyLive(w)
  const weekLabel = `W${String(w.week).padStart(2, '0')}`

  function handleClick() {
    if (dateOpen) setFlipped(f => !f)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className={`card-wrapper${dateOpen ? ' card-unlocked' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={dateOpen ? 0 : -1}
      role={dateOpen ? 'button' : undefined}
      aria-label={
        dateOpen
          ? `Week ${w.week}${w.title ? ': ' + w.title : ''}. Click to flip.`
          : `Week ${w.week}: coming ${formatWeekDate(w.liveDate)}`
      }
      aria-pressed={dateOpen ? flipped : undefined}
    >
      <div className={`card-inner${flipped ? ' flipped' : ''}`}>
        {/* ── FRONT ── */}
        <div className={`card-face card-front${dateOpen ? ' card-front--live' : ''}`}>
          <span className="card-week-num">{weekLabel}</span>
          {!dateOpen && (
            <span className="card-lock">
              <LockIcon />
            </span>
          )}
          {dateOpen && w.title && (
            <span className="card-front-title">{w.title}</span>
          )}
          {dateOpen && getCardIcon(w.week)}
          {dateOpen && (
            <span className="card-flip-hint">tap to flip</span>
          )}
        </div>

        {/* ── BACK ── */}
        <div className="card-face card-back">
          {fullyLive ? (
            // Live: show app details + two action buttons
            <div className="card-back-live">
              <span className="card-back-week-label">Week {w.week}</span>
              <h3 className="card-back-title">{w.title}</h3>
              <p className="card-back-desc">{w.description}</p>
              <div className="card-back-actions">
                {w.url && (
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-launch-btn"
                    onClick={e => e.stopPropagation()}
                    tabIndex={flipped ? 0 : -1}
                  >
                    Launch App <ExternalLinkIcon />
                  </a>
                )}
                {w.githubUrl && (
                  <a
                    href={w.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-github-btn"
                    aria-label="View on GitHub"
                    onClick={e => e.stopPropagation()}
                    tabIndex={flipped ? 0 : -1}
                  >
                    <GitHubIcon size={16} />
                  </a>
                )}
              </div>
            </div>
          ) : dateOpen ? (
            // Date arrived but not yet manually marked live
            <div className="card-back-coming-soon">
              <span className="card-back-week-label card-back-week-label--muted">Week {w.week}</span>
              {w.title && <h3 className="card-back-title card-back-title--muted">{w.title}</h3>}
              <p className="card-coming">Coming soon</p>
              <p className="card-not-yet">Not live yet — check back soon</p>
            </div>
          ) : (
            // Date not yet reached
            <div className="card-back-locked">
              <span className="card-back-week-label card-back-week-label--muted">Week {w.week}</span>
              <p className="card-coming">Coming week of</p>
              <p className="card-coming-date">{formatWeekDate(w.liveDate)}</p>
              <p className="card-not-yet">Not built yet — check back soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ total, done }: { total: number; done: number }) {
  const pct = Math.round((done / total) * 100)
  return (
    <div className="progress-wrap">
      <div className="progress-labels">
        <span className="progress-count">
          <strong>{done}</strong> of {total} apps live
        </span>
        <span className="progress-pct">{pct}%</span>
      </div>
      <div className="progress-track" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={total}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const liveCount = weeks.filter(isFullyLive).length

  return (
    <div className="page">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-inner">
          <h1 className="header-title">
            52 apps.<br />52 weeks.<br />Before I turn 52.
          </h1>
          <p className="header-bio">
            I'm Gabor. I turned 51 and made myself a slightly ridiculous promise.
            Every week for a year I'll build one app from scratch using AI tools —
            no traditional coding background, just curiosity and a problem worth
            solving. This is what that looks like, honestly, week by week.
          </p>
          <a
            href="https://github.com/hayimpapa"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
          >
            <GitHubIcon />
            GitHub
          </a>
          <ProgressBar total={52} done={liveCount} />
        </div>
      </header>

      {/* ── Grid ── */}
      <main className="main">
        <div className="grid">
          {weeks.map(w => (
            <WeekCard key={w.week} w={w} />
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <p className="footer-name">Built by Gabor</p>
        <a
          href="https://github.com/hayimpapa"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <GitHubIcon />
          github.com/hayimpapa
        </a>
        <p className="footer-tagline">One build a week. No guarantees. All code public.</p>
      </footer>
    </div>
  )
}
