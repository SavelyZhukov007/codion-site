import { useEffect, useState, useCallback } from 'react'
import './App.css'

const TEAM = [
  {
    id: 1,
    name: 'Савелий Жуков',
    nameEn: 'Saveliy Zhukov',
    handle: '@SavelyZhukov',
    role: 'Team Lead · Full Stack',
    bio: 'Вместе с командой разрабатываем современные, удобные, быстрые и технологичные цифровые продукты, которые решают реальные задачи пользователей.',
    stack: ['C#', '.NET', 'ASP.NET', 'React', 'TypeScript', 'Python', 'Docker', 'ML', 'C++'],
    certs: ['Microsoft PL-300', 'Microsoft AI-900'],
    color: '#00FFB2',
    photo: '/savely.jpg',
    links: [
      { label: 'GitHub', url: 'https://github.com/SavelyZhukov007', icon: 'gh' },
      { label: 'Telegram', url: 'https://t.me/SavelyZhukovCode', icon: 'tg' },
      { label: 'Сайт', url: 'https://savelyzhukov.com', icon: 'web' },
      { label: 'Coursera', url: 'https://www.coursera.org/user/2773ef61fe070b46f5c4c6f96e4de025', icon: 'edu' },
    ],
  },
  {
    id: 2,
    name: 'Кирилл Спиридов',
    nameEn: 'Kirill Spiridov',
    handle: '@kir_ruha',
    role: 'Security Engineer',
    bio: 'Занимаюсь информационной безопасностью проектов: провожу аудиты кода, ищу уязвимости, проектирую безопасную архитектуру и помогаю команде писать надёжный и защищённый код.',
    stack: ['Python', 'Kotlin', 'PHP', 'Java', 'JavaScript', 'TypeScript', 'CTF'],
    certs: ['task-based CTF', 'AD CTF'],
    color: '#FF6B35',
    photo: '/kirill.jpg',
    links: [
      { label: 'GitHub', url: 'https://github.com/Kir-ruha', icon: 'gh' },
      { label: 'Telegram', url: 'https://t.me/kir_ruha', icon: 'tg' },
    ],
  },
  {
    id: 3,
    name: 'Артём Алтунбаев',
    nameEn: 'Artem Altunbaev',
    handle: '@tWisty98',
    role: 'Backend Developer · Sales',
    bio: 'Проектирую масштабируемую архитектуру API, работаю с базами данных и обеспечиваю надёжную, быструю и безопасную серверную логику. Помогаю команде найти заказчика и наладить контакт.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Docker', 'JWT', 'REST API'],
    certs: ['Backend Architecture', 'Database Design'],
    color: '#A78BFF',
    photo: '/artem.jpg',
    links: [
      { label: 'GitHub', url: 'https://github.com/tWistyik/', icon: 'gh' },
      { label: 'Telegram', url: 'https://t.me/tWisty98', icon: 'tg' },
    ],
  },
]

const STATS = [
  { label: 'Активный проект', value: '1' },
  { label: 'Коммитов', value: '200+' },
  { label: 'Технологий', value: '15+' },
  { label: 'Сертификатов', value: '4' },
]

const SERVICES = [
  { icon: '🌐', title: 'Web-разработка', desc: 'Полный цикл: от дизайна до деплоя. Frontend и backend на современных технологиях.' },
  { icon: '🔐', title: 'Информационная безопасность', desc: 'Аудит кода, поиск уязвимостей, пентест, проектирование безопасной архитектуры.' },
  { icon: '🤖', title: 'ML & Data Analysis', desc: 'Машинное обучение, анализ данных, визуализация, построение предсказательных моделей.' },
  { icon: '⚙️', title: 'Backend & API', desc: 'Масштабируемые REST API, микросервисы, работа с базами данных и серверной логикой.' },
  { icon: '🐳', title: 'DevOps', desc: 'Контейнеризация через Docker, настройка CI/CD, автоматизация развёртывания.' },
  { icon: '💼', title: 'Технологический консалтинг', desc: 'Помогаем бизнесу выбрать правильный стек и архитектуру под конкретные задачи.' },
]

const BLOG_POSTS = [
  {
    id: 1,
    date: '18 апр 2026',
    tag: 'Проект',
    title: 'KipLet: анализ недоработок и план развития',
    excerpt: 'Провели глубокий аудит frontend-части проекта. Зафиксировали узкие места, составили роадмап на следующий спринт.',
    author: 'tWisty',
    color: '#A78BFF',
  },
  {
    id: 2,
    date: '10 апр 2026',
    tag: 'Безопасность',
    title: 'CTF-практика: разбор задачи на обход аутентификации',
    excerpt: 'Кирилл разобрал классическую задачу на уязвимость JWT. Учимся на реальных примерах, чтобы не допускать ошибок в своих проектах.',
    author: 'Кирилл',
    color: '#FF6B35',
  },
  {
    id: 3,
    date: '2 апр 2026',
    tag: 'Разработка',
    title: 'Как мы перешли с чистого JS на TypeScript',
    excerpt: 'Рефакторинг занял неделю, но оно того стоило. Рассказываем про процесс, подводные камни и что дал нам строгий тайпинг в итоге.',
    author: 'Савелий',
    color: '#00FFB2',
  },
]

const STACK_ALL = [
  'React', 'TypeScript', 'C#', '.NET', 'ASP.NET', 'Python', 'FastAPI',
  'PostgreSQL', 'SQLAlchemy', 'Docker', 'JWT', 'REST API', 'ML',
  'Kotlin', 'PHP', 'Java', 'JavaScript', 'CTF / PenTest', 'Git',
]

// Icons
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)
const TgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)
const WebIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)
const EduIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
)

function LinkIcon({ type }: { type: string }) {
  if (type === 'gh') return <GithubIcon />
  if (type === 'tg') return <TgIcon />
  if (type === 'web') return <WebIcon />
  return <EduIcon />
}

// Blog Modal
function BlogModal({ post, onClose }: { post: typeof BLOG_POSTS[0] | null, onClose: () => void }) {
  useEffect(() => {
    if (!post) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [post, onClose])

  if (!post) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-tag" style={{ color: post.color }}>{post.tag}</div>
        <h2 className="modal-title">{post.title}</h2>
        <div className="modal-meta">
          <span>{post.date}</span>
          <span>·</span>
          <span style={{ color: post.color }}>{post.author}</span>
        </div>
        <p className="modal-body">{post.excerpt}</p>
        <p className="modal-body" style={{ color: 'var(--muted)', marginTop: '1rem' }}>
          Полный текст поста будет доступен после публикации командой Codion. Следите за обновлениями в Telegram-канале.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: -300, y: -300 })
  const [cursorScale, setCursorScale] = useState(1)
  const [activeModal, setActiveModal] = useState<typeof BLOG_POSTS[0] | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)


  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80)
    window.addEventListener('mousemove', handleMouseMove)

    const handleHover = () => setCursorScale(1.8)
    const handleLeave = () => setCursorScale(1)
    document.querySelectorAll('a,button,.team-card,.blog-card').forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <div className={`root ${loaded ? 'loaded' : ''}`}>
      {/* Custom Cursor */}
      <div
        className="cursor-dot"
        style={{ left: cursorPos.x, top: cursorPos.y, transform: `translate(-50%,-50%) scale(${cursorScale})` }}
      />
      <div
        className="cursor-ring"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="logo-bracket">[</span>
          <span className="logo-text">CODION</span>
          <span className="logo-bracket">]</span>
        </div>
        <div className={`nav-links ${mobileMenu ? 'open' : ''}`}>
          <a href="#team" onClick={() => setMobileMenu(false)}>Команда</a>
          <a href="#project" onClick={() => setMobileMenu(false)}>Проект</a>
          <a href="#services" onClick={() => setMobileMenu(false)}>Услуги</a>
          <a href="#stack" onClick={() => setMobileMenu(false)}>Стек</a>
          <a href="#blog" onClick={() => setMobileMenu(false)}>Блог</a>
          <a href="#contact" className="nav-cta" onClick={() => setMobileMenu(false)}>Связаться</a>
        </div>
        <button className="burger" onClick={() => setMobileMenu(v => !v)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="grid-overlay" />
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              animationDelay: `${(i * 0.28) % 5}s`,
              animationDuration: `${3 + (i * 0.4) % 4}s`,
            }} />
          ))}
          <div className="hero-orb orb1" />
          <div className="hero-orb orb2" />
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="dot" />
            <span>Команда разработчиков · Codion · 2026</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line line-1">WE</span>
            <span className="title-line line-2">BUILD</span>
            <span className="title-line line-3 accent">CODION</span>
          </h1>
          <p className="hero-sub">
            Три разработчика. Один вектор. Бесконечные возможности.
          </p>
          <div className="hero-cta">
            <a href="#team" className="btn-primary">Познакомиться</a>
            <a href="#project" className="btn-secondary">Наш проект →</a>
          </div>
        </div>

        <div className="hero-stats">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item" style={{ animationDelay: `${0.1 * i + 0.8}s` }}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="scroll-hint">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section" id="team">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">01 / КОМАНДА</span>
            <h2 className="section-title">Люди за кодом</h2>
          </div>
          <div className="team-grid">
            {TEAM.map((member) => (
              <div
                key={member.id}
                className={`team-card ${activeCard === member.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveCard(member.id)}
                onMouseLeave={() => setActiveCard(null)}
                style={{ '--accent': member.color } as React.CSSProperties}
              >
                <div className="card-top">
                  <div className="card-number">0{member.id}</div>
                  <div className="card-avatar">
                    <img src={member.photo} alt={member.name} />
                    <div className="avatar-ring" />
                  </div>
                </div>
                <div className="card-info">
                  <div className="card-name">{member.name}</div>
                  <div className="card-name-en">{member.nameEn}</div>
                  <div className="card-role">{member.role}</div>
                  <p className="card-bio">{member.bio}</p>
                  <div className="card-stack">
                    {member.stack.map((tech) => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>
                  {member.certs.length > 0 && (
                    <div className="card-certs">
                      {member.certs.map(c => (
                        <span key={c} className="cert-badge">🏅 {c}</span>
                      ))}
                    </div>
                  )}
                  <div className="card-links">
                    {member.links.map(l => (
                      <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="card-link" title={l.label}>
                        <LinkIcon type={l.icon} />
                        <span>{l.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="card-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT */}
      <section className="project-section" id="project">
        <div className="project-inner container">
          <div className="section-header light">
            <span className="section-tag">02 / ПРОЕКТ</span>
            <h2 className="section-title">KipLet</h2>
          </div>
          <p className="project-tagline">Цифровой продукт, над которым работает команда прямо сейчас</p>
          <div className="project-layout">
            <div className="project-text">
              <p className="project-desc">
                KipLet — современная веб-платформа, разработанная командой Codion. Полный цикл: от архитектуры и базы данных до адаптивного интерфейса и деплоя.
              </p>
              <ul className="project-features">
                <li><span className="check">✓</span> Современный React-фронтенд</li>
                <li><span className="check">✓</span> FastAPI + PostgreSQL backend</li>
                <li><span className="check">✓</span> JWT-аутентификация и безопасность</li>
                <li><span className="check">✓</span> Docker-контейнеризация</li>
                <li><span className="check">✓</span> Документация и анализ недоработок</li>
                <li><span className="check">✓</span> Аудит безопасности от Кирилла</li>
              </ul>
              <div className="project-team-line">
                {TEAM.map(m => (
                  <span key={m.id} className="project-member" style={{ color: m.color }}>
                    {m.name.split(' ')[0]}
                  </span>
                ))}
                <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>работают над проектом</span>
              </div>
            </div>
            <div className="project-visual">
              <div className="terminal">
                <div className="terminal-header">
                  <span className="t-dot red" /><span className="t-dot yellow" /><span className="t-dot green" />
                  <span className="t-title">kiplet ~ dev</span>
                </div>
                <div className="terminal-body">
                  <div className="t-line"><span className="t-prompt">$</span> git log --oneline -6</div>
                  <div className="t-line t-out">✦ feat: JWT auth implementation</div>
                  <div className="t-line t-out">✦ feat: FastAPI routes v2</div>
                  <div className="t-line t-out">✦ fix: SQLAlchemy session leak</div>
                  <div className="t-line t-out">✦ feat: responsive UI overhaul</div>
                  <div className="t-line t-out">✦ docs: security audit report</div>
                  <div className="t-line t-out">✦ chore: Docker compose setup</div>
                  <div className="t-line" style={{ marginTop: '0.5rem' }}><span className="t-prompt">$</span> npm run build</div>
                  <div className="t-line t-success">✓ Build successful · 200+ commits</div>
                  <div className="t-line t-cursor">█</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">03 / УСЛУГИ</span>
            <h2 className="section-title">Что мы умеем</h2>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="stack-section" id="stack">
        <div className="section-header container">
          <span className="section-tag">04 / СТЕК</span>
          <h2 className="section-title">Технологии</h2>
        </div>
        <div className="stack-marquee">
          <div className="marquee-track">
            {[...STACK_ALL, ...STACK_ALL].map((t, i) => (
              <span key={i} className="marquee-item">{t}</span>
            ))}
          </div>
        </div>
        <div className="stack-marquee reverse" style={{ marginTop: '1.5px' }}>
          <div className="marquee-track reverse-track">
            {[...STACK_ALL, ...STACK_ALL].map((t, i) => (
              <span key={i} className="marquee-item">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="blog-section" id="blog">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">05 / БЛОГ</span>
            <h2 className="section-title">Последние посты</h2>
            <p className="section-sub">Делимся опытом, разборами задач и новостями команды</p>
          </div>
          <div className="blog-grid">
            {BLOG_POSTS.map(post => (
              <div key={post.id} className="blog-card" onClick={() => setActiveModal(post)}>
                <div className="blog-card-top">
                  <span className="blog-tag" style={{ color: post.color }}>{post.tag}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-footer">
                  <span className="blog-author" style={{ color: post.color }}>{post.author}</span>
                  <span className="blog-read">Читать →</span>
                </div>
                <div className="blog-glow" style={{ background: `radial-gradient(circle at 0% 0%, ${post.color}15, transparent 70%)` }} />
              </div>
            ))}
          </div>
          <div className="blog-add-hint">
            <span>💡</span>
            <span>Хотите добавить пост? Напишите в <a href="https://t.me/SavelyZhukovCode" target="_blank" rel="noopener noreferrer">Telegram</a> команды.</span>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="section-header light">
            <span className="section-tag">06 / КОНТАКТ</span>
            <h2 className="section-title">Давайте работать</h2>
          </div>
          <p className="contact-desc">Есть идея или задача? Мы открыты к сотрудничеству. Напишите нам напрямую.</p>
          <div className="contact-cards">
            {TEAM.map(m => (
              <a
                key={m.id}
                href={m.links.find(l => l.icon === 'tg')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                style={{ '--accent': m.color } as React.CSSProperties}
              >
                <div className="contact-photo">
                  <img src={m.photo} alt={m.name} />
                </div>
                <div className="contact-info">
                  <div className="contact-name">{m.name}</div>
                  <div className="contact-role" style={{ color: m.color }}>{m.role}</div>
                  <div className="contact-handle">{m.links.find(l => l.icon === 'tg')?.url?.replace('https://', '')}</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner container">
          <div className="footer-top">
            <div className="footer-logo">
              <span className="logo-bracket">[</span>
              <span className="logo-text">CODION</span>
              <span className="logo-bracket">]</span>
            </div>
            <p className="footer-tagline">Code · Create · Conquer</p>
          </div>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <div className="footer-members">
              {TEAM.map((m) => (
                <span key={m.id} className="footer-member" style={{ color: m.color }}>
                  {m.name}
                </span>
              ))}
            </div>
            <p className="footer-copy">© 2026 Codion. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Blog Modal */}
      <BlogModal post={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  )
}
