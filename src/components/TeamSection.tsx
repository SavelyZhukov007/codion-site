import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TEAM } from '../data'

function Icon({ id, size = 14 }: { id: string; size?: number }) {
  return <svg width={size} height={size} aria-hidden="true"><use href={`/icons.svg#${id}`} /></svg>
}
function LinkIcon({ type }: { type: string }) {
  const m: Record<string, string> = { gh: 'icon-github', tg: 'icon-telegram', li: 'icon-linkedin', web: 'icon-web', edu: 'icon-edu' }
  return <Icon id={m[type] ?? 'icon-external'} />
}

// Typewriter line component
function TypeLine({ text, delay = 0, className = '', onDone }: { text: string; delay?: number; className?: string; onDone?: () => void }) {
  const [shown, setShown] = useState('')
  const [started, setStarted] = useState(false)
  useEffect(() => {
    setShown('')
    setStarted(false)
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [text, delay])
  useEffect(() => {
    if (!started) return
    if (shown.length >= text.length) { onDone?.(); return }
    const t = setTimeout(() => setShown(text.slice(0, shown.length + 1)), 18)
    return () => clearTimeout(t)
  }, [started, shown, text, onDone])
  return (
    <span className={className}>
      {shown}
      {shown.length < text.length && started && <span className="type-caret">_</span>}
    </span>
  )
}

// Scan bar animation
function ScanBar({ label, value, color, delay = 0 }: { label: string; value: number; color: string; delay?: number }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setW(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return (
    <div className="scan-bar-row">
      <span className="scan-label">{label}</span>
      <div className="scan-track">
        <motion.div
          className="scan-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${w}%` }}
          transition={{ duration: 0.8, delay: delay / 1000, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="scan-grid">
          {Array.from({ length: 20 }).map((_, i) => <div key={i} className="scan-tick" />)}
        </div>
      </div>
      <span className="scan-val" style={{ color }}>{value}%</span>
    </div>
  )
}

const SKILL_LEVELS: Record<string, Record<string, number>> = {
  '1': { 'Full Stack': 92, 'ML / AI': 78, 'DevOps': 85, 'Security': 65 },
  '2': { 'Security': 95, 'Python': 88, 'CTF': 90, 'Backend': 72 },
  '3': { 'Backend': 93, 'API Design': 90, 'Databases': 88, 'Sales': 75 },
  '4': { 'QA Automation': 85, 'Python': 80, 'AI API': 72, 'DevOps': 68 },
}

export function TeamSection() {
  const [active, setActive] = useState(TEAM[0].id)
  const [panelKey, setPanelKey] = useState(0)
  const member = TEAM.find(m => m.id === active)!

  function select(id: number) {
    if (id === active) return
    setActive(id)
    setPanelKey(k => k + 1)
  }

  return (
    <section className="team-section" id="team">
      <div className="container">
        {/* header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
        >
          <span className="section-tag">01 / КОМАНДА</span>
          <h2 className="section-title">Люди за кодом</h2>
          <p className="section-sub">Выбери участника — получи полное досье</p>
        </motion.div>

        {/* main layout */}
        <div className="ts-layout">

          {/* ── LEFT: roster ─────────────────────────────────── */}
          <motion.div
            className="ts-roster"
            initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="ts-roster-header">
              <span className="ts-mono ts-dim">$ ls ./team/</span>
            </div>
            {TEAM.map((m, i) => (
              <button
                key={m.id}
                className={`ts-roster-item ${active === m.id ? 'active' : ''}`}
                style={{ '--mc': m.color } as React.CSSProperties}
                onClick={() => select(m.id)}
              >
                <span className="ts-ri-idx ts-mono">{String(i).padStart(2, '0')}</span>
                <div className="ts-ri-photo">
                  <img src={m.photo} alt={m.name} />
                  {active === m.id && <div className="ts-ri-scan" />}
                </div>
                <div className="ts-ri-info">
                  <span className="ts-ri-name">{m.name}</span>
                  <span className="ts-ri-role ts-mono" style={{ color: m.color }}>{m.role.split('·')[0].trim()}</span>
                </div>
                <motion.div
                  className="ts-ri-arrow"
                  animate={{ x: active === m.id ? 0 : -4, opacity: active === m.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >›</motion.div>
              </button>
            ))}
            <div className="ts-roster-footer ts-mono ts-dim">
              <span>{TEAM.length} records found</span>
            </div>
          </motion.div>

          {/* ── RIGHT: dossier panel ──────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={panelKey}
              className="ts-panel"
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* scanlines overlay */}
              <div className="ts-scanlines" />

              {/* corner decorations */}
              <div className="ts-corner tl" />
              <div className="ts-corner tr" />
              <div className="ts-corner bl" />
              <div className="ts-corner br" />

              {/* top bar */}
              <div className="ts-panel-topbar ts-mono">
                <span className="ts-dim">CODION//DOSSIER</span>
                <span style={{ color: member.color }}>ID:{String(member.id).padStart(3,'0')}</span>
                <span className="ts-dim">STATUS:ACTIVE</span>
                <span className="ts-blink" style={{ color: member.color }}>●</span>
              </div>

              {/* body */}
              <div className="ts-panel-body">
                {/* photo block */}
                <div className="ts-photo-block">
                  <div className="ts-photo-frame" style={{ '--mc': member.color } as React.CSSProperties}>
                    <img src={member.photo} alt={member.name} className="ts-photo" />
                    <div className="ts-photo-overlay" />
                    {/* HUD lines on photo */}
                    <div className="ts-hud-h" />
                    <div className="ts-hud-v" />
                    <div className="ts-photo-badge ts-mono" style={{ color: member.color }}>
                      {member.handle}
                    </div>
                  </div>

                  {/* cert badges */}
                  {member.certs.length > 0 && (
                    <motion.div
                      className="ts-certs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    >
                      {member.certs.map(c => (
                        <span key={c} className="ts-cert-pill ts-mono" style={{ borderColor: `${member.color}55`, color: member.color }}>
                          <Icon id="icon-medal" size={11} /> {c}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* info block */}
                <div className="ts-info-block">
                  {/* name */}
                  <div className="ts-name-row">
                    <h3 className="ts-name">
                      <TypeLine text={member.name} delay={80} />
                    </h3>
                    <span className="ts-name-en ts-mono ts-dim">{member.nameEn}</span>
                  </div>

                  <div className="ts-role-row">
                    <span className="ts-role-tag ts-mono" style={{ color: member.color, borderColor: `${member.color}55` }}>
                      {member.role}
                    </span>
                  </div>

                  {/* bio — typewriter */}
                  <div className="ts-bio-wrap">
                    <span className="ts-prompt ts-mono ts-dim">// bio</span>
                    <p className="ts-bio">
                      <TypeLine text={member.bio} delay={220} />
                    </p>
                  </div>

                  {/* skill bars */}
                  <div className="ts-skills-wrap">
                    <span className="ts-prompt ts-mono ts-dim">// skill_scan</span>
                    <div className="ts-skills">
                      {Object.entries(SKILL_LEVELS[String(member.id)] || {}).map(([k, v], i) => (
                        <ScanBar key={k} label={k} value={v} color={member.color} delay={300 + i * 120} />
                      ))}
                    </div>
                  </div>

                  {/* stack */}
                  <div className="ts-stack-wrap">
                    <span className="ts-prompt ts-mono ts-dim">// stack</span>
                    <div className="ts-stack">
                      {member.stack.map((t, i) => (
                        <motion.span
                          key={t}
                          className="ts-stack-pill ts-mono"
                          style={{ '--mc': member.color } as React.CSSProperties}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                        >{t}</motion.span>
                      ))}
                    </div>
                  </div>

                  {/* links */}
                  <div className="ts-links-wrap">
                    <span className="ts-prompt ts-mono ts-dim">// connect</span>
                    <div className="ts-links">
                      {member.links.map((l, i) => (
                        <motion.a
                          key={l.label}
                          href={l.url}
                          target="_blank" rel="noopener noreferrer"
                          className="ts-link ts-mono"
                          style={{ '--mc': member.color } as React.CSSProperties}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.07 }}
                          whileHover={{ x: 4, transition: { duration: 0.15 } }}
                        >
                          <LinkIcon type={l.icon} />
                          <span>{l.label}</span>
                          <span className="ts-link-arr">→</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* bottom bar */}
              <div className="ts-panel-botbar ts-mono">
                <span className="ts-dim">CODION · 2026</span>
                <span style={{ color: member.color }}>
                  {member.stack.slice(0, 4).join(' · ')}
                </span>
                <span className="ts-dim">VERIFIED</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
