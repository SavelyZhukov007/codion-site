import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import './App.css'

// ═══════════════════════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════════════════════

const TEAM = [
  {
    id: 1,
    name: 'Савелий Жуков',
    nameEn: 'Saveliy Zhukov',
    handle: '@SavelyZhukov',
    role: 'Team Lead · Full Stack',
    bio: 'Вместе с командой разрабатываем современные, удобные, быстрые и технологичные цифровые продукты, которые решают реальные задачи пользователей.',
    stack: ['C#', '.NET', 'ASP.NET', 'React', 'TypeScript', 'Python', 'Docker', 'ML', 'C++'],
    certs: ['Microsoft PL-300', 'Microsoft AI-900', 'Meta Front-End Developer', 'ASP.NET Expert'],
    color: '#00FFB2',
    photo: '/savely.jpg',
    links: [
      { label: 'GitHub', url: 'https://github.com/SavelyZhukov007', icon: 'gh' },
      { label: 'Telegram', url: 'https://t.me/SavelyZhukovCode', icon: 'tg' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/savely-zhukov-24a9ba31a/', icon: 'li' },
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
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/artem-altunbaev-a36803404/', icon: 'li' },
    ],
  },
  {
    id: 4,
    name: 'PHARAOH',
    nameEn: 'PHARAOH',
    handle: '@PHARAOHich',
    role: 'QA Automation · Junior Backend',
    bio: 'Фокусируюсь на стабильности и качестве продукта. Занимаюсь автоматизацией процессов и разработкой вспомогательных сервисов, обеспечивая надёжность кода.',
    stack: ['Python', 'Aiogram', 'Requests', 'AI API', 'SQL', 'HTML/CSS', 'C++', 'Git', 'Astra Linux'],
    certs: [],
    color: '#FFD700',
    photo: '/pharaon.jpg',
    links: [
      { label: 'Telegram', url: 'https://t.me/PHARAOHich', icon: 'tg' },
    ],
  },
]

const STATS = [
  { label: 'Участников', value: '4' },
  { label: 'Коммитов', value: '200+' },
  { label: 'Технологий', value: '20+' },
  { label: 'Сертификатов', value: '4' },
]

const SERVICES = [
  { iconId: 'icon-code', title: 'Web-разработка', desc: 'Полный цикл: от дизайна до деплоя. Frontend и backend на современных технологиях.' },
  { iconId: 'icon-shield', title: 'Информационная безопасность', desc: 'Аудит кода, поиск уязвимостей, пентест, проектирование безопасной архитектуры.' },
  { iconId: 'icon-chart', title: 'ML & Data Analysis', desc: 'Машинное обучение, анализ данных, визуализация, предсказательные модели.' },
  { iconId: 'icon-db', title: 'Backend & API', desc: 'Масштабируемые REST API, микросервисы, работа с базами данных и серверной логикой.' },
  { iconId: 'icon-server', title: 'DevOps & QA', desc: 'Контейнеризация Docker, CI/CD, автоматизированное тестирование и автоматизация.' },
  { iconId: 'icon-briefcase', title: 'Технологический консалтинг', desc: 'Помогаем бизнесу выбрать правильный стек и архитектуру под конкретные задачи.' },
]

const STATIC_POSTS: BlogPost[] = [
  {
    id: 1, date: '18 апр 2026', tag: 'Проект', authorId: 3, color: '#A78BFF', readTime: '4 мин',
    title: 'KipLet: анализ недоработок и план развития',
    excerpt: 'Провели глубокий аудит frontend-части проекта. Зафиксировали узкие места, составили роадмап на следующий спринт.',
    fullText: 'Провели глубокий аудит frontend-части проекта KipLet. Нашли несколько критичных мест в работе с состоянием компонентов и некорректную обработку edge-cases при авторизации. Составили детальный роадмап на следующий спринт: рефакторинг auth-флоу, оптимизация bundle size и добавление e2e тестов через Playwright.',
  },
  {
    id: 2, date: '10 апр 2026', tag: 'Безопасность', authorId: 2, color: '#FF6B35', readTime: '6 мин',
    title: 'CTF-практика: разбор задачи на обход аутентификации',
    excerpt: 'Кирилл разобрал классическую задачу на уязвимость JWT. Учимся на реальных примерах.',
    fullText: 'В этом разборе исследуем классическую уязвимость JWT: алгоритм "none". Многие реализации принимают токены без подписи, если явно указать alg: none. Для защиты: всегда явно указывайте допустимые алгоритмы на сервере и не доверяйте заголовку alg из токена. В KipLet мы используем строгую проверку через python-jose с фиксированным алгоритмом HS256.',
  },
  {
    id: 3, date: '2 апр 2026', tag: 'Разработка', authorId: 1, color: '#00FFB2', readTime: '5 мин',
    title: 'Как мы перешли с чистого JS на TypeScript',
    excerpt: 'Рефакторинг занял неделю, но оно того стоило. Рассказываем про процесс и подводные камни.',
    fullText: 'Переход с JS на TS занял ровно одну рабочую неделю. Основные проблемы: untyped API-ответы, implicit any в обработчиках событий и устаревшие зависимости без @types. Решение: зодовая валидация всех API-схем, strict: true с первого дня и постепенная миграция модуль за модулем. В итоге — 0 runtime-ошибок типизации за последний месяц.',
  },
  {
    id: 4, date: '25 мар 2026', tag: 'DevOps', authorId: 3, color: '#A78BFF', readTime: '3 мин',
    title: 'Docker Compose для локальной разработки: наш конфиг',
    excerpt: 'Публикуем наш docker-compose.yml. Весь стек поднимается одной командой за 30 секунд.',
    fullText: 'Делимся нашим docker-compose конфигом для KipLet. Включает: FastAPI-сервер с hot-reload, PostgreSQL с персистентным volume, Redis для кеша сессий и Nginx как reverse-proxy. Весь стек поднимается командой docker compose up -d за ~30 секунд на любой машине.',
  },
  {
    id: 5, date: '15 мар 2026', tag: 'QA', authorId: 4, color: '#FFD700', readTime: '5 мин',
    title: 'Автоматизация тестирования Telegram-бота на Aiogram',
    excerpt: 'PHARAOH рассказывает, как выстроил систему автотестов для внутреннего бота команды с нуля.',
    fullText: 'Написал систему автотестов для нашего внутреннего Telegram-бота на Aiogram. Использую pytest + pytest-asyncio для асинхронных тестов, mocker для мокирования API-вызовов и отдельный тестовый инстанс бота в Astra Linux. Каждый хэндлер покрыт тестами. Это выловило 3 реальных бага до релиза.',
  },
  {
    id: 6, date: '5 мар 2026', tag: 'Безопасность', authorId: 2, color: '#FF6B35', readTime: '5 мин',
    title: 'SQL-инъекции: почему ORM не всегда спасает',
    excerpt: 'Разбор случая, когда SQLAlchemy не защитил от инъекции из-за неправильного использования text().',
    fullText: 'SQLAlchemy защищает от SQL-инъекций при использовании ORM-запросов, но не при raw text(). Мы нашли паттерн в кодовой базе KipLet: text(f"SELECT * FROM users WHERE name = {name}"). Провели код-ревью всех мест с text() и исправили 3 потенциальных вектора атаки.',
  },
]

const STACK_GROUPS = [
  { label: 'Frontend', color: '#00FFB2', items: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Framer Motion', 'Vite'] },
  { label: 'Backend', color: '#A78BFF', items: ['Python', 'FastAPI', 'C#', '.NET', 'ASP.NET', 'Node.js', 'PHP', 'Java', 'Kotlin'] },
  { label: 'Data & AI', color: '#FF6B35', items: ['PostgreSQL', 'SQLAlchemy', 'SQLite', 'Redis', 'ML / AI API', 'Data Analysis'] },
  { label: 'DevOps & Tools', color: '#FFD700', items: ['Docker', 'Git', 'REST API', 'JWT', 'Aiogram', 'Astra Linux', 'CI/CD'] },
  { label: 'Security', color: '#ff4d6d', items: ['CTF / PenTest', 'Code Audit', 'AD CTF', 'Secure Architecture', 'OWASP'] },
]

const BLOG_TAGS = ['Разработка', 'Безопасность', 'Проект', 'DevOps', 'ML', 'QA', 'Дизайн', 'Инструменты', 'Команда']
const BLOG_PASSWD = 'codion2026'
const BLOG_KEY = 'codion_blog_v2'

interface BlogPost {
  id: number; date: string; tag: string; title: string; excerpt: string
  fullText: string; authorId: number; color: string; readTime: string
}

function loadCustomPosts(): BlogPost[] {
  try { const raw = localStorage.getItem(BLOG_KEY); return raw ? JSON.parse(raw) : [] } catch { return [] }
}
function saveCustomPosts(posts: BlogPost[]) {
  try { localStorage.setItem(BLOG_KEY, JSON.stringify(posts)) } catch { }
}

// ═══════════════════════════════════════════════════════════════════════════
//  SVG CURSOR COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function CustomCursor({ pos, isHover, theme }: { pos: { x: number; y: number }; isHover: boolean; theme: 'dark' | 'light' }) {
  const accentColor = theme === 'dark' ? '#00FFB2' : '#0a7a52'
  return (
    <>
      {/* Trailing ring — CSS-only, no JS lag */}
      <div className="cursor-trail" style={{ left: pos.x, top: pos.y }} />
      {/* Main SVG cursor */}
      <div
        className="cursor-svg-wrap"
        style={{ left: pos.x, top: pos.y }}
      >
        <AnimatePresence mode="wait">
          {!isHover ? (
            <motion.svg
              key="default"
              width="28" height="28" viewBox="0 0 28 28"
              initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0, rotate: 15 }}
              transition={{ duration: 0.2, ease: 'backOut' }}
              style={{ overflow: 'visible' }}
            >
              {/* Outer hex ring */}
              <motion.polygon
                points="14,2 24,8 24,20 14,26 4,20 4,8"
                fill="none"
                stroke={accentColor}
                strokeWidth="1.5"
                strokeLinejoin="round"
                animate={{ rotate: [0, 60] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '14px 14px' }}
              />
              {/* Inner dot */}
              <circle cx="14" cy="14" r="3" fill={accentColor} />
              {/* Corner ticks */}
              <line x1="14" y1="2" x2="14" y2="6" stroke={accentColor} strokeWidth="1.5" />
              <line x1="14" y1="22" x2="14" y2="26" stroke={accentColor} strokeWidth="1.5" />
            </motion.svg>
          ) : (
            <motion.svg
              key="hover"
              width="32" height="32" viewBox="0 0 32 32"
              initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0, rotate: -30 }}
              transition={{ duration: 0.2, ease: 'backOut' }}
              style={{ overflow: 'visible' }}
            >
              {/* Four-pointed star / crosshair */}
              <motion.g
                animate={{ rotate: [0, 45] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '16px 16px' }}
              >
                <line x1="16" y1="3" x2="16" y2="11" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
                <line x1="16" y1="21" x2="16" y2="29" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="11" y2="16" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
                <line x1="21" y1="16" x2="29" y2="16" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
              </motion.g>
              {/* Center ring */}
              <circle cx="16" cy="16" r="5" fill="none" stroke={accentColor} strokeWidth="1.5" />
              <circle cx="16" cy="16" r="2" fill={accentColor} />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  ICON
// ═══════════════════════════════════════════════════════════════════════════

function Icon({ id, size = 16 }: { id: string; size?: number }) {
  return <svg width={size} height={size} aria-hidden="true"><use href={`/icons.svg#${id}`} /></svg>
}
function LinkIcon({ type }: { type: string }) {
  const map: Record<string, string> = { gh: 'icon-github', tg: 'icon-telegram', li: 'icon-linkedin', web: 'icon-web', edu: 'icon-edu' }
  return <Icon id={map[type] ?? 'icon-external'} />
}

// ═══════════════════════════════════════════════════════════════════════════
//  SCROLL PROGRESS
// ═══════════════════════════════════════════════════════════════════════════

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div className="scroll-progress" style={{ scaleX, transformOrigin: '0%' }} />
}

// ═══════════════════════════════════════════════════════════════════════════
//  REVEAL
// ═══════════════════════════════════════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-60px' }} custom={delay} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  BLOG READ MODAL
// ═══════════════════════════════════════════════════════════════════════════

function BlogReadModal({ post, onClose }: { post: BlogPost | null; onClose: () => void }) {
  useEffect(() => {
    if (!post) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [post, onClose])
  const member = TEAM.find(m => m.id === post?.authorId)
  return (
    <AnimatePresence>
      {post && (
        <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="modal modal-read" onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.93, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}>
            <button className="modal-close" onClick={onClose}><Icon id="icon-close" size={18} /></button>
            <div className="modal-accent-bar" style={{ background: post.color }} />
            <div className="modal-tag" style={{ color: post.color }}>{post.tag}</div>
            <h2 className="modal-title">{post.title}</h2>
            <div className="modal-meta">
              <span className="modal-meta-item"><Icon id="icon-calendar" size={13} />{post.date}</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-item" style={{ color: post.color }}>
                {member && <img src={member.photo} alt="" className="modal-author-avatar" />}
                {member?.name.split(' ')[0] ?? 'Команда'}
              </span>
            </div>
            <p className="modal-body">{post.fullText}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  BLOG EDITOR
// ═══════════════════════════════════════════════════════════════════════════

function BlogEditor({ onClose, onPublish, editing, onDelete }: {
  onClose: () => void; onPublish: (p: BlogPost) => void; editing?: BlogPost | null; onDelete?: (id: number) => void
}) {
  const [step, setStep] = useState<'guide' | 'form'>(editing ? 'form' : 'guide')
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(!!editing)
  const [pwError, setPwError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
  const [form, setForm] = useState({
    title: editing?.title ?? '', excerpt: editing?.excerpt ?? '', fullText: editing?.fullText ?? '',
    tag: editing?.tag ?? BLOG_TAGS[0], authorId: editing?.authorId ?? TEAM[0].id, readTime: editing?.readTime ?? '5 мин',
  })
  const author = TEAM.find(m => m.id === Number(form.authorId))
  const field = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])

  function handleSubmit() {
    if (!form.title.trim() || !form.excerpt.trim() || !form.fullText.trim()) return
    onPublish({
      id: editing?.id ?? Date.now(), date: today, tag: form.tag, title: form.title.trim(),
      excerpt: form.excerpt.trim(), fullText: form.fullText.trim(), authorId: Number(form.authorId),
      color: TEAM.find(m => m.id === Number(form.authorId))?.color ?? '#00FFB2', readTime: form.readTime,
    })
    setSubmitted(true)
  }

  if (submitted) return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}>
      <motion.div className="modal editor-modal" onClick={e => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="editor-success">
          <div className="editor-success-icon">✦</div>
          <h2>Пост опубликован!</h2>
          <p>Пост сохранён в этом браузере.<br />Чтобы пост увидели <strong>все</strong> — добавь его в <code>STATIC_POSTS</code> в <code>src/App.tsx</code>.</p>
          <button className="btn-primary" onClick={onClose}>Готово</button>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal editor-modal" onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}>
        <button className="modal-close" onClick={onClose}><Icon id="icon-close" size={18} /></button>
        <div className="editor-tabs">
          <button className={`editor-tab ${step === 'guide' ? 'active' : ''}`} onClick={() => setStep('guide')}>
            <Icon id="icon-eye" size={14} /> Гайд
          </button>
          <button className={`editor-tab ${step === 'form' ? 'active' : ''}`} onClick={() => { if (authed) setStep('form') }}>
            <Icon id="icon-pen" size={14} /> {editing ? 'Редактировать' : 'Написать пост'}
          </button>
        </div>
        {step === 'guide' && (
          <div className="guide-content">
            <h2 className="guide-title">Как добавить пост в блог</h2>
            <div className="guide-method">
              <div className="guide-method-header">
                <span className="guide-badge guide-badge-fast">Способ 1 — Быстрый</span>
                <span className="guide-badge-label">Через UI · только в этом браузере</span>
              </div>
              <ol className="guide-steps">
                <li>Нажми вкладку <strong>«Написать пост»</strong></li>
                <li>Пароль команды: <code className="guide-code">codion2026</code></li>
                <li>Заполни форму и нажми «Опубликовать»</li>
              </ol>
            </div>
            <div className="guide-method">
              <div className="guide-method-header">
                <span className="guide-badge guide-badge-perm">Способ 2 — Постоянный</span>
                <span className="guide-badge-label">В коде · виден всем</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                Открой <code className="guide-code">src/App.tsx</code> → найди <code className="guide-code">STATIC_POSTS</code> → добавь объект в начало массива.
              </p>
              <div className="guide-codeblock">
                <pre>{`{\n  id: 10, date: '21 апр 2026',\n  tag: 'Разработка', authorId: 1,\n  color: '#00FFB2', readTime: '5 мин',\n  title: 'Заголовок',\n  excerpt: 'Краткое описание.',\n  fullText: 'Полный текст поста.',\n},`}</pre>
              </div>
            </div>
            <button className="btn-primary guide-cta" onClick={() => setStep('form')}>Написать пост →</button>
          </div>
        )}
        {step === 'form' && !authed && (
          <div className="editor-auth">
            <div className="editor-auth-icon"><Icon id="icon-lock" size={32} /></div>
            <h2>Доступ к редактору</h2>
            <p>Введи пароль команды Codion</p>
            <div className="editor-auth-row">
              <input className={`editor-input ${pwError ? 'input-error' : ''}`} type="password" placeholder="Пароль"
                value={password} onChange={e => { setPassword(e.target.value); setPwError(false) }}
                onKeyDown={e => { if (e.key === 'Enter') { if (password === BLOG_PASSWD) { setAuthed(true); setPwError(false) } else setPwError(true) } }}
                autoFocus />
              <button className="btn-primary" onClick={() => { if (password === BLOG_PASSWD) { setAuthed(true); setPwError(false) } else setPwError(true) }}>Войти</button>
            </div>
            {pwError && <p className="editor-auth-error">Неверный пароль</p>}
          </div>
        )}
        {step === 'form' && authed && (
          <div className="editor-form">
            <h2 className="editor-form-title">{editing ? 'Редактировать пост' : 'Новый пост'}</h2>
            <div className="editor-row">
              <label className="editor-label">Заголовок</label>
              <input className="editor-input" placeholder="Заголовок поста" value={form.title} onChange={field('title')} />
            </div>
            <div className="editor-row-2col">
              <div className="editor-row">
                <label className="editor-label">Тег</label>
                <select className="editor-input editor-select" value={form.tag} onChange={field('tag')}>
                  {BLOG_TAGS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="editor-row">
                <label className="editor-label">Автор</label>
                <select className="editor-input editor-select" value={form.authorId} onChange={field('authorId')}>
                  {TEAM.map(m => <option key={m.id} value={m.id}>{m.name.split(' ')[0]}</option>)}
                </select>
              </div>
              <div className="editor-row">
                <label className="editor-label">Время чтения</label>
                <input className="editor-input" placeholder="5 мин" value={form.readTime} onChange={field('readTime')} />
              </div>
            </div>
            <div className="editor-row">
              <label className="editor-label">Краткое описание</label>
              <textarea className="editor-input editor-textarea-sm" value={form.excerpt} onChange={field('excerpt')} />
            </div>
            <div className="editor-row">
              <label className="editor-label">Полный текст</label>
              <textarea className="editor-input editor-textarea-lg" value={form.fullText} onChange={field('fullText')} />
            </div>
            {author && (
              <div className="editor-preview-card">
                <div className="editor-preview-label">Предпросмотр</div>
                <div className="blog-card blog-card-preview" style={{ pointerEvents: 'none' }}>
                  <div className="blog-card-inner">
                    <div className="blog-card-top">
                      <span className="blog-tag" style={{ color: author.color }}>{form.tag}</span>
                      <span className="blog-date">{today}</span>
                    </div>
                    <h3 className="blog-title">{form.title || 'Заголовок'}</h3>
                    <p className="blog-excerpt">{form.excerpt || 'Описание...'}</p>
                    <div className="blog-footer">
                      <span className="blog-author" style={{ color: author.color }}>{author.name.split(' ')[0]}</span>
                      <span className="blog-read">Читать →</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="editor-actions">
              {editing && onDelete && (
                <button className="btn-danger" onClick={() => { onDelete(editing.id); onClose() }}>Удалить</button>
              )}
              <button className="btn-secondary" onClick={onClose}>Отмена</button>
              <button className="btn-primary" onClick={handleSubmit}
                disabled={!form.title.trim() || !form.excerpt.trim() || !form.fullText.trim()}>
                {editing ? 'Сохранить' : 'Опубликовать'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  APP
// ═══════════════════════════════════════════════════════════════════════════

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: -300, y: -300 })
  const [isCursorHover, setIsCursorHover] = useState(false)
  const [readPost, setReadPost] = useState<BlogPost | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [customPosts, setCustomPosts] = useState<BlogPost[]>(loadCustomPosts)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [isMobile, setIsMobile] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  const { scrollY } = useScroll()
  // hero parallax — fades after scrolling 600px so buttons stay visible longer
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0])
  const heroY = useTransform(scrollY, [0, 700], [0, 60])

  const allPosts: BlogPost[] = [...customPosts.slice().reverse(), ...STATIC_POSTS]

  const handleMouseMove = useCallback((e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY }), [])

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80)
    window.addEventListener('mousemove', handleMouseMove)
    setIsMobile(window.innerWidth <= 768)
    const ro = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', ro)
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('resize', ro) }
  }, [handleMouseMove])

  // global hover detection for cursor
  useEffect(() => {
    const on = () => setIsCursorHover(true), off = () => setIsCursorHover(false)
    const sel = 'a, button, .team-card, .blog-card, .service-card, .contact-card, .theme-toggle'
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off)
    })
    return () => {
      document.querySelectorAll(sel).forEach(el => {
        el.removeEventListener('mouseenter', on); el.removeEventListener('mouseleave', off)
      })
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function publishPost(post: BlogPost) {
    setCustomPosts(prev => {
      const next = prev.some(p => p.id === post.id) ? prev.map(p => p.id === post.id ? post : p) : [...prev, post]
      saveCustomPosts(next); return next
    })
  }
  function deletePost(id: number) {
    setCustomPosts(prev => { const next = prev.filter(p => p.id !== id); saveCustomPosts(next); return next })
  }

  return (
    <div className={`root ${loaded ? 'loaded' : ''} theme-${theme}`}>
      <ScrollProgress />

      {!isMobile && <CustomCursor pos={cursorPos} isHover={isCursorHover} theme={theme} />}

      {/* THEME TOGGLE */}
      <button className="theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label="Сменить тему">
        <motion.span animate={{ rotate: theme === 'dark' ? 0 : 180 }} transition={{ duration: 0.4 }}>
          {theme === 'dark' ? '☀' : '☾'}
        </motion.span>
      </button>

      {/* NAV */}
      <motion.nav className="nav"
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <div className="nav-logo">
          <span className="logo-bracket">[</span><span className="logo-text">CODION</span><span className="logo-bracket">]</span>
        </div>
        <div className={`nav-links ${mobileMenu ? 'open' : ''}`}>
          {[['#team', 'Команда'], ['#project', 'Проект'], ['#services', 'Услуги'], ['#stack', 'Стек'], ['#blog', 'Блог'], ['#contact', 'Связаться']].map(([href, label], i) => (
            <motion.a key={href} href={href} onClick={() => setMobileMenu(false)}
              className={href === '#contact' ? 'nav-cta' : ''}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.07 }}>
              {label}
            </motion.a>
          ))}
        </div>
        <button className="burger" onClick={() => setMobileMenu(v => !v)}><span /><span /><span /></button>
      </motion.nav>

      {/* HERO */}
      <motion.section className="hero" ref={heroRef} style={{ opacity: heroOpacity, y: heroY }}>
        <div className="hero-bg">
          <div className="grid-overlay" />
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%`,
              animationDelay: `${(i * 0.28) % 5}s`, animationDuration: `${3 + (i * 0.4) % 4}s`,
            }} />
          ))}
          <div className="hero-orb orb1" /><div className="hero-orb orb2" />
        </div>
        <div className="hero-content">
          <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <span className="dot" /><span>Команда разработчиков · Codion · 2026</span>
          </motion.div>
          <h1 className="hero-title">
            {['WE', 'BUILD', 'CODION'].map((word, i) => (
              <motion.span key={word} className={`title-line line-${i + 1}${i === 2 ? ' accent' : ''}`}
                initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.18, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}>
            Пишем код. Ломаем барьеры. Оставляем след в цифре.
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35 }}>
            <a href="#team" className="btn-primary">Познакомиться</a>
            <a href="#project" className="btn-secondary">Наш проект →</a>
          </motion.div>
        </div>
        <motion.div className="hero-stats" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55 }}>
          {STATS.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
        <motion.div className="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <span>scroll</span><div className="scroll-line" />
        </motion.div>
      </motion.section>

      {/* TEAM */}
      <section className="team-section" id="team">
        <div className="container">
          <Reveal className="section-header">
            <span className="section-tag">01 / КОМАНДА</span>
            <h2 className="section-title">Люди за кодом</h2>
            <p className="section-sub">Наведи на карточку участника, чтобы узнать больше</p>
          </Reveal>
          <div
            className="team-grid"
            onMouseLeave={() => setHoveredMember(null)}
          >
            {TEAM.map((member, i) => {
              const isActive = hoveredMember === member.id
              const isCollapsed = hoveredMember !== null && hoveredMember !== member.id
              return (
                <motion.div
                  key={member.id}
                  className={`team-card ${isActive ? 'active' : ''} ${isCollapsed ? 'collapsed' : ''}`}
                  onMouseEnter={() => setHoveredMember(member.id)}
                  style={{ '--accent': member.color } as React.CSSProperties}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                  custom={i} variants={fadeUp}
                  animate={{
                    flex: isActive ? 2.2 : isCollapsed ? 0.55 : 1,
                    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
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
                    <motion.div
                      className="card-expandable"
                      animate={{ opacity: isCollapsed ? 0 : 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="card-name-en">{member.nameEn}</div>
                      <div className="card-role">{member.role}</div>
                      <p className="card-bio">{member.bio}</p>
                      <div className="card-stack">
                        {member.stack.map(tech => <span key={tech} className="tag">{tech}</span>)}
                      </div>
                      {member.certs.length > 0 && (
                        <div className="card-certs">
                          {member.certs.map(c => <span key={c} className="cert-badge"><Icon id="icon-medal" size={12} /> {c}</span>)}
                        </div>
                      )}
                      <div className="card-links">
                        {member.links.map(l => (
                          <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="card-link" title={l.label}>
                            <LinkIcon type={l.icon} /><span>{l.label}</span>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  <div className="card-glow" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PROJECT */}
      <section className="project-section" id="project">
        <div className="project-inner container">
          <Reveal className="section-header light">
            <span className="section-tag">02 / ПРОЕКТ</span>
            <h2 className="section-title">KipLet</h2>
          </Reveal>
          <Reveal delay={0.1}><p className="project-tagline">Цифровой продукт, над которым работает команда прямо сейчас</p></Reveal>
          <div className="project-layout">
            <Reveal className="project-text" delay={0.1}>
              <p className="project-desc">KipLet — современная веб-платформа, разработанная командой Codion. Полный цикл: от архитектуры и базы данных до адаптивного интерфейса и деплоя.</p>
              <ul className="project-features">
                {['Современный React-фронтенд', 'FastAPI + PostgreSQL backend', 'JWT-аутентификация и безопасность', 'Docker-контейнеризация', 'Автотесты и QA-автоматизация', 'Аудит безопасности'].map((f, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.1 * i }}>
                    <span className="check"><Icon id="icon-check" size={14} /></span> {f}
                  </motion.li>
                ))}
              </ul>
              <div className="project-team-line">
                {TEAM.map(m => <span key={m.id} className="project-member" style={{ color: m.color }}>{m.name.split(' ')[0]}</span>)}
                <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>работают над проектом</span>
              </div>
            </Reveal>
            <Reveal className="project-visual" delay={0.2}>
              <div className="terminal">
                <div className="terminal-header">
                  <span className="t-dot red" /><span className="t-dot yellow" /><span className="t-dot green" />
                  <span className="t-title">kiplet ~ dev</span>
                </div>
                <div className="terminal-body">
                  <div className="t-line"><span className="t-prompt">$</span> git log --oneline -6</div>
                  <div className="t-line t-out">✦ feat: JWT auth implementation</div>
                  <div className="t-line t-out">✦ feat: QA automation suite</div>
                  <div className="t-line t-out">✦ fix: SQLAlchemy session leak</div>
                  <div className="t-line t-out">✦ feat: responsive UI overhaul</div>
                  <div className="t-line t-out">✦ docs: security audit report</div>
                  <div className="t-line t-out">✦ chore: Docker compose setup</div>
                  <div className="t-line" style={{ marginTop: '0.5rem' }}><span className="t-prompt">$</span> npm run build</div>
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
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                custom={i} variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                <div className="service-icon"><Icon id={s.iconId} size={28} /></div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-line" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="stack-section" id="stack">
        <div className="container">
          <Reveal className="section-header">
            <span className="section-tag">04 / СТЕК</span>
            <h2 className="section-title">Технологии</h2>
            <p className="section-sub">Инструменты, которыми мы строим продукты</p>
          </Reveal>
          <div className="stack-groups">
            {STACK_GROUPS.map((group, gi) => (
              <Reveal key={group.label} delay={gi * 0.08}>
                <div className="stack-group">
                  <div className="stack-group-label" style={{ color: group.color }}>
                    <span className="stack-group-dot" style={{ background: group.color }} />
                    {group.label}
                  </div>
                  <div className="stack-group-items">
                    {group.items.map((item, ii) => (
                      <motion.span
                        key={item}
                        className="stack-pill"
                        style={{ '--pill-color': group.color } as React.CSSProperties}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: gi * 0.05 + ii * 0.04, ease: 'backOut' }}
                        whileHover={{ scale: 1.07, transition: { duration: 0.15 } }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="blog-section" id="blog">
        <div className="container">
          <Reveal className="section-header">
            <span className="section-tag">05 / БЛОГ</span>
            <h2 className="section-title">Последние посты</h2>
            <p className="section-sub">Делимся опытом, разборами задач и новостями команды</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="blog-toolbar">
              <button className="blog-add-btn" onClick={() => { setEditingPost(null); setShowEditor(true) }}>
                <Icon id="icon-pen" size={15} /> Написать пост
              </button>
              <span className="blog-toolbar-hint">
                <Icon id="icon-eye" size={13} />
                {allPosts.length} {allPosts.length < 5 ? 'поста' : 'постов'}
              </span>
            </div>
          </Reveal>
          <div className="blog-grid">
            {allPosts.slice(0, visiblePosts).map((post, i) => (
              <motion.div key={post.id} className="blog-card"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                custom={i % 3} variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}>
                <div className="blog-card-inner" onClick={() => setReadPost(post)}>
                  <div className="blog-card-top">
                    <span className="blog-tag" style={{ color: post.color }}>{post.tag}</span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-footer">
                    <span className="blog-author" style={{ color: post.color }}>
                      {TEAM.find(m => m.id === post.authorId)?.name.split(' ')[0] ?? 'Команда'}
                    </span>
                    <span className="blog-read-time">{post.readTime}</span>
                    <span className="blog-read">Читать →</span>
                  </div>
                  <div className="blog-glow" style={{ background: `radial-gradient(circle at 0% 0%, ${post.color}18, transparent 70%)` }} />
                </div>
              </motion.div>
            ))}
          </div>
          {visiblePosts < allPosts.length && (
            <motion.div className="blog-load-more" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <button className="btn-secondary" onClick={() => setVisiblePosts(v => v + 3)}>
                Показать ещё ({allPosts.length - visiblePosts})
              </button>
            </motion.div>
          )}
        </div>
      </section>

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
                whileHover={{ x: 6, transition: { duration: 0.2 } }}>
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
        <div className="footer-inner container">
          <div className="footer-top">
            <div className="footer-logo">
              <span className="logo-bracket">[</span><span className="logo-text">CODION</span><span className="logo-bracket">]</span>
            </div>
            <p className="footer-tagline">Пишем код. Ломаем барьеры. Оставляем след в цифре.</p>
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

      <BlogReadModal post={readPost} onClose={() => setReadPost(null)} />
      <AnimatePresence>
        {showEditor && (
          <BlogEditor onClose={() => { setShowEditor(false); setEditingPost(null) }}
            onPublish={publishPost} editing={editingPost} onDelete={deletePost} />
        )}
      </AnimatePresence>
    </div>
  )
}
