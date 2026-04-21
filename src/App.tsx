import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import './App.css'
import { TeamSection } from './components/TeamSection'
import { TEAM, STATS, SERVICES, STATIC_POSTS, TECH_TREE, loadCustomPosts } from './data'
import type { BlogPost, TechNode } from './data'

// ─── SCRAMBLE TEXT HOOK ─────────────────────────────────────────────────────
const CHARS = 'アイウエオカキクケコサシスセソタチツテト∆∑∏∫√∞≈≠ΩΨΦΓΛΘΞℵ⊕⊗∇∂∈∉⊂⊃∪∩01'
function useScramble(target: string, delay = 0) {
  const [display, setDisplay] = useState(() => Array.from({ length: target.length }, () => ' ').join(''))
  const [done, setDone] = useState(false)
  useEffect(() => {
    let frame: number
    let start: number | null = null
    const duration = 900
    function tick(ts: number) {
      if (!start) start = ts
      const elapsed = ts - start - delay * 1000
      if (elapsed < 0) { frame = requestAnimationFrame(tick); return }
      const progress = Math.min(elapsed / duration, 1)
      const revealed = Math.floor(progress * target.length)
      const out = target.split('').map((ch, i) => {
        if (i < revealed) return ch
        if (ch === ' ') return ' '
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')
      setDisplay(out)
      if (progress < 1) { frame = requestAnimationFrame(tick) } else { setDisplay(target); setDone(true) }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, delay])
  return { display, done }
}

// ─── ICONS ──────────────────────────────────────────────────────────────────
function Icon({ id, size = 16 }: { id: string; size?: number }) {
  return <svg width={size} height={size} aria-hidden="true"><use href={`/icons.svg#${id}`} /></svg>
}

// ─── CURSOR ─────────────────────────────────────────────────────────────────
function Cursor({ pos, hover, theme }: { pos: { x: number; y: number }; hover: boolean; theme: 'dark' | 'light' }) {
  const c = theme === 'dark' ? '#00FFB2' : '#007a50'
  return (
    <div className="cursor-wrap" style={{ left: pos.x, top: pos.y }}>
      <AnimatePresence mode="wait">
        {!hover ? (
          <motion.svg key="d" width="24" height="24" viewBox="0 0 24 24"
            initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.3, rotate: 90 }}
            transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}>
            <circle cx="12" cy="12" r="2.5" fill={c} />
            <line x1="12" y1="2" x2="12" y2="7" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="17" x2="12" y2="22" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="12" x2="7" y2="12" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="17" y1="12" x2="22" y2="12" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
          </motion.svg>
        ) : (
          <motion.svg key="h" width="28" height="28" viewBox="0 0 28 28"
            initial={{ opacity: 0, scale: 0.3, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.3, rotate: -45 }}
            transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}>
            <rect x="11" y="11" width="6" height="6" fill="none" stroke={c} strokeWidth="1.5" />
            <line x1="14" y1="2" x2="14" y2="9" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="19" x2="14" y2="26" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="14" x2="9" y2="14" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="19" y1="14" x2="26" y2="14" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── SCROLL PROGRESS ────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const sx = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div className="scroll-bar" style={{ scaleX: sx, transformOrigin: '0%' }} />
}

// ─── REVEAL ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
}
function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-50px' }} custom={delay} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

// ─── TECH TREE ───────────────────────────────────────────────────────────────
function TechTreeNode({ node, depth = 0, isLast = false }: { node: TechNode; depth?: number; isLast?: boolean }) {
  const [open, setOpen] = useState(depth < 2)
  const hasChildren = (node.children?.length ?? 0) > 0

  return (
    <motion.div
      className={`tt-node depth-${depth}`}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: depth * 0.06, duration: 0.4 }}
    >
      <div className="tt-row" onClick={() => hasChildren && setOpen(o => !o)}>
        <span className="tt-connector">{isLast ? '└─' : '├─'}</span>
        <motion.span
          className="tt-pill"
          style={{ '--nc': node.color } as React.CSSProperties}
          whileHover={{ scale: 1.05 }}
        >
          {hasChildren && (
            <motion.span className="tt-toggle" animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>▶</motion.span>
          )}
          {node.label}
        </motion.span>
      </div>
      <AnimatePresence>
        {open && node.children && (
          <motion.div
            className="tt-children"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {node.children.map((child, i) => (
              <TechTreeNode key={child.id} node={child} depth={depth + 1} isLast={i === (node.children!.length - 1)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function TechTree() {
  return (
    <section className="stack-section" id="stack">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">04 / СТЕК</span>
          <h2 className="section-title">Дерево технологий</h2>
          <p className="section-sub">Кликни на ветку, чтобы раскрыть</p>
        </Reveal>
        <div className="tt-root">
          <div className="tt-root-label">
            <span className="tt-root-dot" />
            <span className="tt-root-text">Codion Stack</span>
          </div>
          <div className="tt-branches">
            {TECH_TREE.children!.map((branch, i) => (
              <TechTreeNode key={branch.id} node={branch} depth={1} isLast={i === TECH_TREE.children!.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── BLOG ────────────────────────────────────────────────────────────────────
function BlogSection({ posts, onRead }: { posts: BlogPost[]; onRead: (p: BlogPost) => void }) {
  const [filter, setFilter] = useState<string | null>(null)
  const [visible, setVisible] = useState(6)
  const tags = [...new Set(posts.map(p => p.tag))]
  const filtered = filter ? posts.filter(p => p.tag === filter) : posts
  const featured = posts.find(p => p.featured)

  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">05 / БЛОГ</span>
          <h2 className="section-title">Последние посты</h2>
          <p className="section-sub">Делимся опытом, разборами задач и новостями команды</p>
        </Reveal>

        {/* Featured post */}
        {featured && !filter && (
          <Reveal delay={0.05}>
            <div className="blog-featured" onClick={() => onRead(featured)}>
              <div className="bf-label">
                <span className="bf-star">✦</span> Главное
              </div>
              <div className="bf-body">
                <div className="bf-meta">
                  <span className="blog-tag" style={{ color: featured.color }}>{featured.tag}</span>
                  <span className="blog-date">{featured.date}</span>
                  <span className="blog-read-time">{featured.readTime}</span>
                </div>
                <h2 className="bf-title">{featured.title}</h2>
                <p className="bf-excerpt">{featured.excerpt}</p>
                <div className="bf-author">
                  <img src={TEAM.find(m => m.id === featured.authorId)?.photo} alt="" className="bf-avatar" />
                  <span style={{ color: featured.color }}>{TEAM.find(m => m.id === featured.authorId)?.name.split(' ')[0]}</span>
                  <span className="bf-read">Читать →</span>
                </div>
              </div>
              <div className="bf-accent" style={{ background: `linear-gradient(135deg, ${featured.color}22, transparent)` }} />
            </div>
          </Reveal>
        )}

        {/* Tag filter */}
        <Reveal delay={0.1}>
          <div className="blog-filters">
            <button className={`bf-tag-btn ${!filter ? 'active' : ''}`} onClick={() => { setFilter(null); setVisible(6) }}>Все</button>
            {tags.map(t => (
              <button key={t} className={`bf-tag-btn ${filter === t ? 'active' : ''}`} onClick={() => { setFilter(t); setVisible(6) }}>{t}</button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="blog-grid">
          {filtered.slice(0, visible).map((post, i) => {
            const author = TEAM.find(m => m.id === post.authorId)
            return (
              <motion.div key={post.id} className="blog-card"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                custom={i % 3} variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                onClick={() => onRead(post)}
              >
                <div className="bc-accent-line" style={{ background: post.color }} />
                <div className="blog-card-top">
                  <span className="blog-tag" style={{ color: post.color }}>{post.tag}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-footer">
                  <div className="bf-author-row">
                    <img src={author?.photo} alt="" className="bc-avatar" />
                    <span className="blog-author" style={{ color: post.color }}>{author?.name.split(' ')[0]}</span>
                  </div>
                  <span className="blog-read-time">{post.readTime}</span>
                  <span className="blog-read">→</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {visible < filtered.length && (
          <div className="blog-load-more">
            <button className="btn-secondary" onClick={() => setVisible(v => v + 3)}>
              Показать ещё ({filtered.length - visible})
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── BLOG MODAL ──────────────────────────────────────────────────────────────
function BlogModal({ post, onClose }: { post: BlogPost | null; onClose: () => void }) {
  useEffect(() => {
    if (!post) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [post, onClose])
  const author = TEAM.find(m => m.id === post?.authorId)
  return (
    <AnimatePresence>
      {post && (
        <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="modal" onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <div className="modal-bar" style={{ background: post.color }} />
            <button className="modal-close" onClick={onClose}><Icon id="icon-close" size={18} /></button>
            <div className="modal-tag-row">
              <span className="modal-tag" style={{ color: post.color }}>{post.tag}</span>
              <span className="modal-read-time">{post.readTime}</span>
            </div>
            <h2 className="modal-title">{post.title}</h2>
            <div className="modal-meta">
              <img src={author?.photo} alt="" className="modal-avatar" />
              <span style={{ color: post.color }}>{author?.name.split(' ')[0]}</span>
              <span className="modal-sep">·</span>
              <span>{post.date}</span>
            </div>
            <p className="modal-body">{post.fullText}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [cursor, setCursor] = useState({ x: -300, y: -300 })
  const [hover, setHover] = useState(false)
  const [readPost, setReadPost] = useState<BlogPost | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [customPosts] = useState<BlogPost[]>(loadCustomPosts)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [isMobile, setIsMobile] = useState(false)

  const allPosts = [...customPosts.slice().reverse(), ...STATIC_POSTS]

  const we = useScramble('WE', 0.65)
  const build = useScramble('BUILD', 0.9)
  const codion = useScramble('CODION', 1.1)

  const onMove = useCallback((e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY }), [])

  useEffect(() => {
    setTimeout(() => setLoaded(true), 60)
    window.addEventListener('mousemove', onMove)
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', checkMobile) }
  }, [onMove])

  useEffect(() => {
    const on = () => setHover(true), off = () => setHover(false)
    const sel = 'a, button, .team-card, .blog-card, .blog-featured, .service-card, .contact-card'
    const attach = () => {
      document.querySelectorAll(sel).forEach(el => { el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off) })
    }
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })
    return () => obs.disconnect()
  }, [])

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])

  return (
    <div className={`root ${loaded ? 'loaded' : ''} theme-${theme}`}>
      <ScrollProgress />
      {!isMobile && <Cursor pos={cursor} hover={hover} theme={theme} />}

      {/* NAV */}
      <motion.nav className="nav" initial={{ y: -72, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, delay: 0.15 }}>
        {/* Theme toggle on the LEFT */}
        <div className="nav-left">
          <button className="theme-slider" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label="Тема">
            <motion.div className="ts-knob" animate={{ x: theme === 'dark' ? 2 : 22 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
            <span className="ts-icon ts-dark">☾</span>
            <span className="ts-icon ts-light">☀</span>
          </button>
        </div>

        <div className="nav-logo">
          <span className="logo-bracket">[</span><span className="logo-text">CODION</span><span className="logo-bracket">]</span>
        </div>

        <div className={`nav-links ${mobileMenu ? 'open' : ''}`}>
          {[['#team', 'Команда'], ['#project', 'Проект'], ['#services', 'Услуги'], ['#stack', 'Стек'], ['#blog', 'Блог'], ['#contact', 'Связаться']].map(([href, label], i) => (
            <motion.a key={href} href={href} onClick={() => setMobileMenu(false)}
              className={href === '#contact' ? 'nav-cta' : ''}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06 }}>
              {label}
            </motion.a>
          ))}
        </div>
        <button className="burger" onClick={() => setMobileMenu(v => !v)}><span /><span /><span /></button>
      </motion.nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="grid-overlay" />
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${(i * 41 + 7) % 100}%`, top: `${(i * 57 + 11) % 100}%`,
              animationDelay: `${(i * 0.3) % 5}s`, animationDuration: `${3 + (i * 0.4) % 4}s`,
            }} />
          ))}
          <div className="hero-orb orb1" /><div className="hero-orb orb2" />
        </div>

        <div className="hero-content">
          <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <span className="dot" /><span>Команда разработчиков · Codion · 2026</span>
          </motion.div>
          <h1 className="hero-title">
            <motion.span className="title-line line-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              {we.display}
            </motion.span>
            <motion.span className="title-line line-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
              {build.display}
            </motion.span>
            <motion.span className="title-line line-3 accent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}>
              {codion.display}
            </motion.span>
          </h1>
          <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            Превращаем идеи в рабочие продукты — быстро, безопасно, технологично.
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.65 }}>
            <a href="#team" className="btn-primary">Познакомиться</a>
            <a href="#project" className="btn-secondary">Наш проект →</a>
          </motion.div>
        </div>

        <motion.div className="hero-stats" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}>
          {STATS.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div className="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          <span>scroll</span><div className="scroll-line" />
        </motion.div>
      </section>

      {/* TEAM */}
      <TeamSection />

      {/* PROJECT */}
      <section className="project-section" id="project">
        <div className="project-inner container">
          <Reveal className="section-header">
            <span className="section-tag">02 / ПРОЕКТ</span>
            <h2 className="section-title">KipLet</h2>
            <p className="section-sub project-tagline">Цифровой продукт, над которым работает команда прямо сейчас</p>
          </Reveal>
          <div className="project-layout">
            <Reveal className="project-text" delay={0.1}>
              <p className="project-desc">KipLet — современная веб-платформа командной разработки Codion. Полный цикл: от архитектуры и базы данных до адаптивного интерфейса и деплоя.</p>
              <ul className="project-features">
                {['Современный React-фронтенд', 'FastAPI + PostgreSQL backend', 'JWT-аутентификация и безопасность', 'Docker-контейнеризация', 'Автотесты и QA-автоматизация', 'Аудит безопасности'].map((f, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <span className="check"><Icon id="icon-check" size={14} /></span> {f}
                  </motion.li>
                ))}
              </ul>
              <div className="project-team-line">
                {TEAM.map(m => <span key={m.id} className="project-member" style={{ color: m.color }}>{m.name.split(' ')[0]}</span>)}
              </div>
            </Reveal>
            <Reveal className="project-visual" delay={0.18}>
              <div className="terminal">
                <div className="terminal-header">
                  <span className="t-dot red" /><span className="t-dot yellow" /><span className="t-dot green" />
                  <span className="t-title">kiplet ~ dev</span>
                </div>
                <div className="terminal-body">
                  <div className="t-line"><span className="t-prompt">$</span> git log --oneline -6</div>
                  {['feat: JWT auth implementation', 'feat: QA automation suite', 'fix: SQLAlchemy session leak', 'feat: responsive UI overhaul', 'docs: security audit report', 'chore: Docker compose setup'].map((l, i) => (
                    <div key={i} className="t-line t-out">✦ {l}</div>
                  ))}
                  <div className="t-line" style={{ marginTop: '0.4rem' }}><span className="t-prompt">$</span> npm run build</div>
                  <div className="t-line t-success">✓ Build successful · 200+ commits</div>
                  <div className="t-line t-cursor">█</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="container">
          <Reveal className="section-header">
            <span className="section-tag">03 / УСЛУГИ</span>
            <h2 className="section-title">Что мы умеем</h2>
          </Reveal>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <motion.div key={i} className="service-card"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                custom={i} variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                <div className="service-icon"><Icon id={s.iconId} size={26} /></div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-line" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH TREE */}
      <TechTree />

      {/* BLOG */}
      <BlogSection posts={allPosts} onRead={setReadPost} />

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="container">
          <Reveal className="section-header">
            <span className="section-tag">06 / КОНТАКТ</span>
            <h2 className="section-title">Давайте работать</h2>
          </Reveal>
          <Reveal delay={0.1}><p className="contact-desc">Есть идея или задача? Мы открыты к сотрудничеству. Напишите напрямую.</p></Reveal>
          <div className="contact-cards">
            {TEAM.map((m, i) => (
              <motion.a key={m.id} href={m.links.find(l => l.icon === 'tg')?.url || '#'}
                target="_blank" rel="noopener noreferrer" className="contact-card"
                style={{ '--accent': m.color } as React.CSSProperties}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                custom={i} variants={fadeUp}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                <div className="contact-photo"><img src={m.photo} alt={m.name} /></div>
                <div className="contact-info">
                  <div className="contact-name">{m.name}</div>
                  <div className="contact-role" style={{ color: m.color }}>{m.role}</div>
                  <div className="contact-handle">{m.links.find(l => l.icon === 'tg')?.url?.replace('https://', '')}</div>
                </div>
                <div className="contact-arrow"><Icon id="icon-arrow-right" size={18} /></div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-top">
            <div className="footer-logo">
              <span className="logo-bracket">[</span><span className="logo-text">CODION</span><span className="logo-bracket">]</span>
            </div>
            <p className="footer-tagline">Превращаем идеи в рабочие продукты</p>
          </div>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <div className="footer-members">
              {TEAM.map(m => <span key={m.id} className="footer-member" style={{ color: m.color }}>{m.name}</span>)}
            </div>
            <p className="footer-copy">© 2026 Codion. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <BlogModal post={readPost} onClose={() => setReadPost(null)} />
    </div>
  )
}
