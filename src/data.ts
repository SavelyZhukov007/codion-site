export const TEAM = [
  {
    id: 1, name: 'Савелий Жуков', nameEn: 'Saveliy Zhukov', handle: '@SavelyZhukov',
    role: 'Team Lead · Full Stack',
    bio: 'Вместе с командой разрабатываем современные, удобные и технологичные цифровые продукты, которые решают реальные задачи пользователей.',
    stack: ['C#', '.NET', 'ASP.NET', 'React', 'TypeScript', 'Python', 'Docker', 'ML', 'C++'],
    certs: ['Microsoft PL-300', 'Microsoft AI-900', 'Meta Front-End Developer', 'ASP.NET Expert'],
    color: '#00FFB2', photo: '/savely.jpg',
    links: [
      { label: 'GitHub', url: 'https://github.com/SavelyZhukov007', icon: 'gh' },
      { label: 'Telegram', url: 'https://t.me/SavelyZhukovCode', icon: 'tg' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/savely-zhukov-24a9ba31a/', icon: 'li' },
      { label: 'Сайт', url: 'https://savelyzhukov.com', icon: 'web' },
      { label: 'Coursera', url: 'https://www.coursera.org/user/2773ef61fe070b46f5c4c6f96e4de025', icon: 'edu' },
    ],
  },
  {
    id: 2, name: 'Кирилл Спиридов', nameEn: 'Kirill Spiridov', handle: '@kir_ruha',
    role: 'Security Engineer',
    bio: 'Занимаюсь информационной безопасностью: провожу аудиты кода, ищу уязвимости, проектирую безопасную архитектуру.',
    stack: ['Python', 'Kotlin', 'PHP', 'Java', 'JavaScript', 'TypeScript', 'CTF'],
    certs: ['task-based CTF', 'AD CTF'],
    color: '#FF6B35', photo: '/kirill.jpg',
    links: [
      { label: 'GitHub', url: 'https://github.com/Kir-ruha', icon: 'gh' },
      { label: 'Telegram', url: 'https://t.me/kir_ruha', icon: 'tg' },
    ],
  },
  {
    id: 3, name: 'Артём Алтунбаев', nameEn: 'Artem Altunbaev', handle: '@tWisty98',
    role: 'Backend Developer · Sales',
    bio: 'Проектирую масштабируемую архитектуру API, работаю с базами данных. Помогаю команде найти заказчика и наладить контакт.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Docker', 'JWT', 'REST API'],
    certs: ['Backend Architecture', 'Database Design'],
    color: '#A78BFF', photo: '/artem.jpg',
    links: [
      { label: 'GitHub', url: 'https://github.com/tWistyik/', icon: 'gh' },
      { label: 'Telegram', url: 'https://t.me/tWisty98', icon: 'tg' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/artem-altunbaev-a36803404/', icon: 'li' },
    ],
  },
  {
    id: 4, name: 'PHARAOH', nameEn: 'PHARAOH', handle: '@PHARAOHich',
    role: 'QA Automation · Junior Backend',
    bio: 'Фокусируюсь на стабильности и качестве: автоматизирую процессы, разрабатываю вспомогательные сервисы.',
    stack: ['Python', 'Aiogram', 'Requests', 'AI API', 'SQL', 'HTML/CSS', 'C++', 'Git', 'Astra Linux'],
    certs: [],
    color: '#FFD700', photo: '/pharaon.jpg',
    links: [{ label: 'Telegram', url: 'https://t.me/PHARAOHich', icon: 'tg' }],
  },
]

export const STATS = [
  { label: 'Участников', value: '4' },
  { label: 'Коммитов', value: '200+' },
  { label: 'Технологий', value: '20+' },
  { label: 'Сертификатов', value: '4' },
]

export const SERVICES = [
  { iconId: 'icon-code', title: 'Web-разработка', desc: 'Полный цикл: от дизайна до деплоя. Frontend и backend на современных технологиях.' },
  { iconId: 'icon-shield', title: 'Информационная безопасность', desc: 'Аудит кода, поиск уязвимостей, пентест, проектирование безопасной архитектуры.' },
  { iconId: 'icon-chart', title: 'ML & Data Analysis', desc: 'Машинное обучение, анализ данных, визуализация, предсказательные модели.' },
  { iconId: 'icon-db', title: 'Backend & API', desc: 'Масштабируемые REST API, микросервисы, работа с базами данных.' },
  { iconId: 'icon-server', title: 'DevOps & QA', desc: 'Docker, CI/CD, автоматизированное тестирование и автоматизация процессов.' },
  { iconId: 'icon-briefcase', title: 'Технологический консалтинг', desc: 'Помогаем выбрать правильный стек и архитектуру под конкретные задачи.' },
]

export interface BlogPost {
  id: number; date: string; tag: string; title: string; excerpt: string
  fullText: string; authorId: number; color: string; readTime: string
  image?: string; featured?: boolean
}

export const BLOG_TAGS = ['Разработка', 'Безопасность', 'Проект', 'DevOps', 'ML', 'QA', 'Дизайн', 'Инструменты', 'Команда']
export const BLOG_KEY = 'codion_blog_v2'

export const STATIC_POSTS: BlogPost[] = [
  {
    id: 1, date: '18 апр 2026', tag: 'Проект', authorId: 3, color: '#A78BFF', readTime: '4 мин', featured: true,
    title: 'KipLet: анализ недоработок и план развития',
    excerpt: 'Провели глубокий аудит frontend-части проекта. Зафиксировали узкие места и составили роадмап на следующий спринт.',
    fullText: 'Провели глубокий аудит frontend-части проекта KipLet. Нашли критичные места в работе с состоянием компонентов и некорректную обработку edge-cases при авторизации. Составили детальный роадмап: рефакторинг auth-флоу, оптимизация bundle size и добавление e2e тестов через Playwright.',
  },
  {
    id: 2, date: '10 апр 2026', tag: 'Безопасность', authorId: 2, color: '#FF6B35', readTime: '6 мин',
    title: 'CTF-практика: разбор задачи на обход аутентификации',
    excerpt: 'Кирилл разобрал классическую уязвимость JWT. Учимся на реальных примерах, чтобы не допускать ошибок в своих проектах.',
    fullText: 'Исследуем классическую уязвимость JWT: алгоритм "none". Многие реализации принимают токены без подписи. Для защиты: всегда явно указывайте допустимые алгоритмы на сервере. В KipLet используем python-jose с фиксированным алгоритмом HS256.',
  },
  {
    id: 3, date: '2 апр 2026', tag: 'Разработка', authorId: 1, color: '#00FFB2', readTime: '5 мин', featured: true,
    title: 'Как мы перешли с чистого JS на TypeScript',
    excerpt: 'Рефакторинг занял неделю, но оно того стоило. Рассказываем про процесс, подводные камни и результаты.',
    fullText: 'Переход занял ровно одну рабочую неделю. Основные проблемы: untyped API-ответы, implicit any и устаревшие зависимости без @types. Решение: зодовая валидация всех API-схем, strict: true с первого дня. Результат — 0 runtime-ошибок типизации за последний месяц.',
  },
  {
    id: 4, date: '25 мар 2026', tag: 'DevOps', authorId: 3, color: '#A78BFF', readTime: '3 мин',
    title: 'Docker Compose для локальной разработки: наш конфиг',
    excerpt: 'Весь стек поднимается одной командой за 30 секунд. Публикуем наш docker-compose.yml с объяснениями.',
    fullText: 'Наш docker-compose включает: FastAPI с hot-reload, PostgreSQL с volume, Redis для кеша сессий и Nginx как reverse-proxy. docker compose up -d — и готово за ~30 секунд на любой машине.',
  },
  {
    id: 5, date: '15 мар 2026', tag: 'QA', authorId: 4, color: '#FFD700', readTime: '5 мин',
    title: 'Автоматизация тестирования Telegram-бота на Aiogram',
    excerpt: 'Как выстроил систему автотестов для внутреннего бота команды с нуля и что из этого вышло.',
    fullText: 'Написал систему автотестов с pytest + pytest-asyncio, mocker для мокирования API-вызовов. Каждый хэндлер покрыт тестами. Выловил 3 реальных бага до релиза.',
  },
  {
    id: 6, date: '5 мар 2026', tag: 'Безопасность', authorId: 2, color: '#FF6B35', readTime: '5 мин',
    title: 'SQL-инъекции: почему ORM не всегда спасает',
    excerpt: 'SQLAlchemy защищает от SQL-инъекций при ORM-запросах, но не при неправильном использовании text().',
    fullText: 'Нашли паттерн в кодовой базе KipLet: text(f"SELECT * FROM users WHERE name = {name}"). Прямая уязвимость. Правило: никогда не интерполируй строки в SQL — используй bindparams. Исправили 3 вектора атаки.',
  },
  {
    id: 7, date: '20 фев 2026', tag: 'Разработка', authorId: 1, color: '#00FFB2', readTime: '8 мин',
    title: 'React 19: что мы уже используем в продакшене',
    excerpt: 'Actions, use(), Server Components — разбираем новые фичи React 19 на реальном коде KipLet.',
    fullText: 'В KipLet уже используем: новый use() хук для работы с промисами в рендере, Actions для form submissions без лишнего состояния, улучшенный Suspense. useOptimistic — UI реагирует мгновенно. Производительность выросла ~15% на слабых устройствах.',
  },
  {
    id: 8, date: '10 фев 2026', tag: 'Команда', authorId: 3, color: '#A78BFF', readTime: '4 мин',
    title: 'Как мы организуем задачи: наш подход к Agile',
    excerpt: 'Четверо разработчиков, один проект, нет менеджера. Рассказываем, как не утонуть в хаосе.',
    fullText: 'Используем облегчённый Kanban: доска в Notion с колонками Backlog → In Progress → Review → Done. Спринты по 2 недели, ретро каждый понедельник на 30 минут. Не более 2 задач на человека. За 3 месяца ни одного сорванного дедлайна.',
  },
  {
    id: 9, date: '1 фев 2026', tag: 'QA', authorId: 4, color: '#FFD700', readTime: '6 мин',
    title: 'AI API в автоматизации: подключаем GPT-4 к нашему боту',
    excerpt: 'Как интегрировали AI API во внутренний инструмент и что из этого вышло.',
    fullText: 'Интегрировал OpenAI API в нашего бота для автоматической классификации баг-репортов. Теперь разработчик получает саммари и компонент прямо в сообщении. Простые промпты с few-shot примерами дают точность 87%.',
  },
]

export function loadCustomPosts(): BlogPost[] {
  try { const r = localStorage.getItem(BLOG_KEY); return r ? JSON.parse(r) : [] } catch { return [] }
}
export function saveCustomPosts(posts: BlogPost[]) {
  try { localStorage.setItem(BLOG_KEY, JSON.stringify(posts)) } catch { }
}

// Technology tree (обновлённая и сильно расширенная версия)
export interface TechNode {
  id: string; label: string; color: string
  children?: TechNode[]
}

export const TECH_TREE: TechNode = {
  id: 'root', label: 'Codion Stack', color: '#ffffff',
  children: [
    {
      id: 'frontend', label: 'Frontend', color: '#00FFB2',
      children: [
        // ── Fundamentals (из Meta Front-End Developer Certificate + базовые навыки Савелия)
        {
          id: 'fundamentals',
          label: 'Web Fundamentals',
          color: '#00FFB2',
          children: [
            { id: 'html', label: 'HTML5 + Semantic + Accessibility', color: '#00FFB2' },
            { id: 'css', label: 'Modern CSS (Flexbox, Grid, Container Queries, Animations)', color: '#00FFB2' },
            { id: 'js', label: 'JavaScript (ES2025+, DOM, Async/Await, Modules)', color: '#00FFB2' },
            { id: 'bootstrap', label: 'Bootstrap 5', color: '#00FFB2' },
            { id: 'figma', label: 'Figma / UI/UX Basics', color: '#00FFB2' },
            { id: 'responsive', label: 'Responsive + Mobile-First Design', color: '#00FFB2' },
            { id: 'git-fe', label: 'Git + GitHub (Version Control)', color: '#00FFB2' },
          ]
        },
        // ── React 19 + современная экосистема (сильно расширено)
        {
          id: 'react',
          label: 'React 19 + Ecosystem',
          color: '#00FFB2',
          children: [
            { id: 'nextjs', label: 'Next.js 15 (App Router, Server Components, RSC)', color: '#00FFB2' },
            { id: 'ts', label: 'TypeScript', color: '#00FFB2' },
            { id: 'framer', label: 'Framer Motion', color: '#00FFB2' },
            { id: 'vite', label: 'Vite', color: '#00FFB2' },
            { id: 'tailwind', label: 'Tailwind CSS', color: '#00FFB2' },
            { id: 'shadcn', label: 'shadcn/ui + Radix UI', color: '#00FFB2' },
            { id: 'tanstack', label: 'TanStack Query + TanStack Router', color: '#00FFB2' },
            { id: 'zustand', label: 'Zustand / Jotai', color: '#00FFB2' },
            { id: 'rhf', label: 'React Hook Form + Zod', color: '#00FFB2' },
            { id: 'dataviz', label: 'Recharts / Chart.js / D3.js', color: '#00FFB2' },
            { id: 'testing-fe', label: 'Vitest + React Testing Library + Playwright', color: '#00FFB2' },
          ]
        },
      ]
    },

    {
      id: 'backend', label: 'Backend', color: '#A78BFF',
      children: [
        {
          id: 'python', label: 'Python', color: '#A78BFF',
          children: [
            { id: 'fastapi', label: 'FastAPI', color: '#A78BFF' },
            { id: 'aiogram', label: 'Aiogram 3', color: '#A78BFF' },
            { id: 'sqlalchemy', label: 'SQLAlchemy 2.0', color: '#A78BFF' },
            { id: 'pydantic', label: 'Pydantic v2', color: '#A78BFF' },
            { id: 'alembic', label: 'Alembic', color: '#A78BFF' },
            { id: 'celery', label: 'Celery', color: '#A78BFF' },
          ]
        },
        {
          id: 'dotnet', label: '.NET / C#', color: '#A78BFF',
          children: [
            { id: 'aspnet', label: 'ASP.NET Core', color: '#A78BFF' },
            { id: 'efcore', label: 'Entity Framework Core', color: '#A78BFF' },
            { id: 'console', label: 'Console Apps + Telegram Bots', color: '#A78BFF' }, // из проектов Савелия
          ]
        },
        { id: 'other-be', label: 'PHP / Java / Kotlin / Go / Node.js', color: '#A78BFF' },
      ]
    },

    {
      id: 'data', label: 'Data & AI', color: '#FF6B35',
      children: [
        { id: 'pg', label: 'PostgreSQL + pgvector', color: '#FF6B35' },
        { id: 'redis', label: 'Redis', color: '#FF6B35' },
        { id: 'qdrant', label: 'Qdrant (Vector DB)', color: '#FF6B35' },
        { id: 'powerbi', label: 'Power BI (Data Analyst)', color: '#FF6B35' }, // из сертификата
        { id: 'keras', label: 'Keras / Deep Learning', color: '#FF6B35' },
        {
          id: 'ai',
          label: 'AI / LLM',
          color: '#FF6B35',
          children: [
            { id: 'langchain', label: 'LangChain / LlamaIndex', color: '#FF6B35' },
            { id: 'ollama', label: 'Ollama / vLLM', color: '#FF6B35' },
            { id: 'mlapi', label: 'OpenAI / Groq / YandexGPT', color: '#FF6B35' },
          ]
        },
      ]
    },

    {
      id: 'infra', label: 'Infrastructure', color: '#FFD700',
      children: [
        {
          id: 'docker', label: 'Docker', color: '#FFD700',
          children: [
            { id: 'compose', label: 'Docker Compose', color: '#FFD700' },
            { id: 'nginx', label: 'Nginx / Traefik', color: '#FFD700' },
          ]
        },
        { id: 'k8s', label: 'Kubernetes', color: '#FFD700' },
        { id: 'cicd', label: 'Git + CI/CD (GitHub Actions / GitLab CI)', color: '#FFD700' },
        { id: 'iac', label: 'Terraform / Ansible', color: '#FFD700' },
        { id: 'monitoring', label: 'Prometheus + Grafana', color: '#FFD700' },
        { id: 'astra', label: 'Astra Linux', color: '#FFD700' },
      ]
    },

    {
      id: 'security', label: 'Security', color: '#ff4d6d',
      children: [
        { id: 'ctf', label: 'CTF / PenTest', color: '#ff4d6d' },
        { id: 'jwt', label: 'JWT / OAuth2 / OIDC / Keycloak', color: '#ff4d6d' },
        { id: 'owasp', label: 'OWASP Top 10', color: '#ff4d6d' },
        { id: 'audit', label: 'Code Audit + SAST', color: '#ff4d6d' },
        { id: 'vault', label: 'Secrets Management (Vault)', color: '#ff4d6d' },
      ]
    },

    // ── Новый блок: Quantum Technologies (учитывая репозитории quantum-mechanics и QuantumLab на GitHub Савелия)
    {
      id: 'quantum',
      label: 'Quantum Technologies',
      color: '#00CCFF',
      children: [
        { id: 'quantumlab', label: 'QuantumLab / Quantum Mechanics', color: '#00CCFF' },
        { id: 'postquantum', label: 'Post-Quantum Cryptography', color: '#00CCFF' },
        { id: 'qsharp', label: 'AtomSkills2026, 4th place', color: '#00CCFF' },
      ]
    },
  ]
}
