export const TEAM = [
  {
    id: 1,
    name: 'Савелий Жуков',
    nameEn: 'Saveliy Zhukov',
    handle: '@SavelyZhukov',
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
    id: 4, name: 'Данил Хожаев', nameEn: 'Danil Khozhaev', handle: '@PHARAOHich',
    role: 'QA Automation · Junior Backend',
    bio: 'Фокусируюсь на стабильности и качестве: автоматизирую процессы, разрабатываю вспомогательные сервисы.',
    stack: ['Python', 'Aiogram', 'Requests', 'AI API', 'SQL', 'HTML/CSS', 'C++', 'Git', 'Astra Linux'],
    certs: [],
    color: '#FFD700', photo: '/pharaon.jpg',
    links: [{ label: 'Telegram', url: 'https://t.me/PHARAOHich', icon: 'tg' }],
  },
]

export const STATS = [
  { label: 'Человека в команде', value: '4' },
  { label: 'Часов работы команды', value: '200+' },
  { label: 'Технологий', value: '20+' },
  { label: 'Специализаций', value: '6+' },
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

  // ══════════════════════════════════════════════════════
  // ФАЗА 0 — ОСНОВАНИЕ КОМАНДЫ И ПЛАНИРОВАНИЕ
  // ══════════════════════════════════════════════════════

  {
    id: 101, date: '15 янв 2026', tag: 'Команда', authorId: 1, color: '#00FFB2', readTime: '5 мин',
    title: 'Как мы собрали Codion: от идеи до первого коммита',
    excerpt: 'Четыре человека, разные специализации, один проект. Рассказываем, как договорились о ролях, стеке и том, что вообще будем строить.',
    fullText: 'Всё началось с простого вопроса: почему учебные проекты обычно умирают после сдачи? Мы решили сделать иначе — взять реальную задачу и довести до продакшена. Первая встреча прошла в Telegram: обозначили роли исходя из сильных сторон. Савелий — архитектура и фронт, Артём — бэкенд и API, Кирилл — безопасность, PHARAOH — QA и автоматизация. Составили первый Notion-документ: стек, правила ветвления, соглашение по коммитам. Главное правило — никакого "потом": если видишь проблему, фиксируешь задачу в тот же день.',
  },

  {
    id: 102, date: '17 янв 2026', tag: 'Проект', authorId: 3, color: '#A78BFF', readTime: '4 мин',
    title: 'Что такое KipLet и зачем он нужен: продуктовое видение',
    excerpt: 'Перед тем как писать код, мы потратили два дня на то, чтобы ответить на вопрос: а что именно мы строим и для кого?',
    fullText: 'KipLet — образовательная платформа с разделением ролей: студент, преподаватель, администратор. Каждая роль получает свой дашборд. Студент видит курсы, расписание, прогресс. Преподаватель — группы, задания, успеваемость. Администратор — полный контроль системы. Дополнительно: стримы, чаты, уведомления. Мы описали user stories для каждой роли, приоритизировали MVP и нарисовали первые wireframe в Figma. Главный критерий успеха — любой пользователь должен понять интерфейс без инструкции.',
  },

  {
    id: 103, date: '19 янв 2026', tag: 'DevOps', authorId: 1, color: '#00FFB2', readTime: '3 мин',
    title: 'Настройка репозитория: ветки, коммиты, защита main',
    excerpt: 'Договорились о структуре Git до первой строки кода. Это сэкономило нам минимум 10 часов будущих конфликтов.',
    fullText: 'Создали монорепо с двумя папками: /frontend и /backend. Ветки: main (только через PR), develop (интеграция), feat/*, fix/*, hotfix/*. Соглашение по коммитам — Conventional Commits: feat:, fix:, docs:, chore:, test:. На main поставили branch protection: минимум 1 ревью, все CI-проверки должны пройти. Настроили .editorconfig и .gitattributes для единых переносов строк на всех платформах. Мелочи, которые потом не дают болеть голове.',
  },

  {
    id: 104, date: '20 янв 2026', tag: 'DevOps', authorId: 3, color: '#A78BFF', readTime: '4 мин',
    title: 'Docker Compose с нуля: поднимаем весь стек одной командой',
    excerpt: 'Весь стек — FastAPI, PostgreSQL, Redis, Nginx — поднимается за 30 секунд на любой машине. Публикуем конфиг и объясняем каждое решение.',
    fullText: 'Наш docker-compose.yml: FastAPI с hot-reload через volume, PostgreSQL с persist-volume чтобы данные не терялись при перезапуске, Redis для кеша сессий, Nginx как reverse-proxy с единой точкой входа. Отдельные .env-файлы для dev и prod — никаких секретов в репозитории. Добавили healthcheck для базы: FastAPI не стартует пока Postgres не ответит. docker compose up -d — и через 30 секунд всё работает. Проверяем на трёх разных машинах команды: Windows, macOS, Linux.',
  },

  // ══════════════════════════════════════════════════════
  // ФАЗА 1 — БЭКЕНД: АРХИТЕКТУРА И CORE
  // ══════════════════════════════════════════════════════

  {
    id: 105, date: '22 янв 2026', tag: 'Разработка', authorId: 3, color: '#A78BFF', readTime: '6 мин',
    title: 'Проектируем схему базы данных KipLet: 12 таблиц, 0 костылей',
    excerpt: 'Правильная схема БД — это половина успеха проекта. Рассказываем как мы моделировали отношения между пользователями, курсами и группами.',
    fullText: 'Основные сущности: User, Role, Course, Module, Lesson, Group, Enrollment, Assignment, Submission, Stream, Notification, AuditLog. Ключевые решения: роли через отдельную таблицу с many-to-many (один пользователь может быть и студентом и преподавателем), soft delete через поле is_active вместо физического удаления, created_at/updated_at на всех таблицах. Для аудита всех действий — отдельная таблица AuditLog. Использовали dbdiagram.io для визуализации, согласовали схему всей командой до первой миграции Alembic. Переделывать схему в середине проекта — боль, которой мы избежали.',
  },

  {
    id: 106, date: '25 янв 2026', tag: 'Разработка', authorId: 3, color: '#A78BFF', readTime: '5 мин',
    title: 'FastAPI + SQLAlchemy 2.0: настраиваем async от и до',
    excerpt: 'Синхронный SQLAlchemy в 2026 году — моветон. Переходим на async сессии, dependency injection и правильный lifecycle соединений.',
    fullText: 'Перешли на полностью async стек: AsyncSession через async_sessionmaker, все запросы через await. Dependency injection для сессии через Depends(get_db) — сессия открывается на один запрос и гарантированно закрывается. Репозиторный паттерн: каждая сущность имеет свой репозиторий с базовыми CRUD и специфическими запросами. Это изолирует бизнес-логику от ORM и упрощает тесты. Pydantic v2 для схем — response_model автоматически сериализует ORM-объекты. Первые нагрузочные тесты показали 400+ RPS на простых эндпоинтах.',
  },

  {
    id: 107, date: '28 янв 2026', tag: 'Безопасность', authorId: 2, color: '#FF6B35', readTime: '6 мин',
    title: 'JWT-аутентификация: правильная реализация без дыр',
    excerpt: 'Кирилл разбирает, как мы реализовали auth в KipLet и почему стандартные туториалы по JWT содержат критические ошибки.',
    fullText: 'Классическая ошибка из туториалов — принимать любой алгоритм из заголовка токена. Атака "alg:none" позволяет подписать токен пустой подписью. Наше решение: python-jose с явным указанием HS256, проверка алгоритма до декодирования. Access token — 15 минут, refresh token — 7 дней в httpOnly cookie (недоступен из JS). Blacklist отозванных токенов в Redis с TTL равным оставшемуся времени жизни. Rate limiting на /auth/login — не более 5 попыток в минуту с одного IP. Отдельный эндпоинт /auth/me проверяет токен без лишних запросов к БД через кеш.',
  },

  {
    id: 108, date: '1 фев 2026', tag: 'Безопасность', authorId: 2, color: '#FF6B35', readTime: '5 мин',
    title: 'SQL-инъекции: почему ORM не всегда спасает',
    excerpt: 'Нашли в собственном коде прямую уязвимость при использовании text(). Разбираем, как это произошло и как мы от этого защитились.',
    fullText: 'Нашли паттерн в ранней версии кода: text(f"SELECT * FROM users WHERE name = {name}"). Прямая SQL-инъекция. SQLAlchemy защищает только при использовании ORM-запросов — raw text() уязвим, если вставлять переменные напрямую. Правило команды теперь: никакой интерполяции строк в SQL, только bindparams. Провели аудит всего кодa через bandit — нашли и закрыли 3 потенциальных вектора. Добавили bandit в pre-commit hook: теперь такой код физически нельзя закоммитить.',
  },

  {
    id: 109, date: '5 фев 2026', tag: 'Разработка', authorId: 3, color: '#A78BFF', readTime: '4 мин',
    title: 'Система ролей и прав доступа: RBAC в FastAPI',
    excerpt: 'Три роли, разные права на каждый эндпоинт. Реализуем Role-Based Access Control через dependency injection без дублирования кода.',
    fullText: 'Роли: STUDENT, TEACHER, ADMIN. Каждый эндпоинт декорируется через Depends(require_role([Role.TEACHER, Role.ADMIN])). Dependency проверяет токен, достаёт роль из БД (с кешем в Redis на 5 минут), и либо пропускает запрос, либо возвращает 403. Для resource-based доступа (студент видит только свои задания) — отдельный слой проверки внутри сервисов. Написали тесты для каждой комбинации роль/эндпоинт: 47 тест-кейсов, покрытие 100% эндпоинтов.',
  },

  // ══════════════════════════════════════════════════════
  // ФАЗА 2 — ФРОНТЕНД: АРХИТЕКТУРА И UI
  // ══════════════════════════════════════════════════════

  {
    id: 110, date: '10 фев 2026', tag: 'Разработка', authorId: 1, color: '#00FFB2', readTime: '5 мин',
    title: 'Как мы перешли с чистого JS на TypeScript: неделя рефакторинга',
    excerpt: 'Рефакторинг занял неделю, но оно того стоило. Рассказываем про процесс, подводные камни и результаты.',
    fullText: 'Переход занял ровно одну рабочую неделю. Основные проблемы: untyped API-ответы, implicit any и устаревшие зависимости без @types. Решение: Zod-валидация всех API-схем на границе клиент/сервер, strict: true с первого дня. Отдельная папка /types со всеми доменными типами — импортируются из одного места. Результат за первый месяц после перехода: 0 runtime-ошибок типизации, IDE подсказывает всё что нужно, рефакторинг стал в 3 раза быстрее.',
  },

  {
    id: 111, date: '14 фев 2026', tag: 'Разработка', authorId: 1, color: '#00FFB2', readTime: '7 мин',
    title: 'Архитектура React-приложения: Feature Sliced Design',
    excerpt: 'Flat structure ломается при росте проекта. Объясняем почему мы выбрали FSD и как организовали 40+ компонентов без хаоса.',
    fullText: 'Feature Sliced Design делит код на слои: app → pages → widgets → features → entities → shared. Каждый слой импортирует только из нижележащих. Например, feature/courses импортирует entity/user, но не наоборот. Это физически предотвращает циклические зависимости. Shared — общие UI-компоненты, хуки, утилиты. Entities — доменные модели с их API-запросами. Features — логика одной фичи. Страница — просто компоновка виджетов. После 3 месяцев разработки любой член команды находит нужный файл за 10 секунд.',
  },

  {
    id: 112, date: '18 фев 2026', tag: 'Разработка', authorId: 1, color: '#00FFB2', readTime: '8 мин',
    title: 'React 19 в продакшене: что мы реально используем и зачем',
    excerpt: 'Actions, use(), Server Components — разбираем новые фичи на реальном коде KipLet, без воды.',
    fullText: 'use() хук для работы с промисами прямо в рендере убрал половину useEffect-ов. Actions в формах: больше нет useState для loading/error состояний формы — всё в useFormStatus. useOptimistic для лайков и статусов заданий — UI реагирует мгновенно, откат при ошибке сервера происходит автоматически. Suspense с новым поведением: вложенные компоненты не прерывают transitions. Производительность на слабых устройствах выросла ~15% по Core Web Vitals. Главный вывод: новые фичи не ломают старый код — можно мигрировать постепенно.',
  },

  {
    id: 113, date: '22 фев 2026', tag: 'Разработка', authorId: 1, color: '#00FFB2', readTime: '5 мин',
    title: 'Дашборд студента: от Figma до рабочего интерфейса',
    excerpt: 'Как мы проектировали главный экран студента: три итерации дизайна, два раунда тестирования и финальная версия.',
    fullText: 'Первая версия дашборда содержала всё сразу: курсы, задания, расписание, уведомления. Пользователи терялись. Итерация 2: приоритизировали "ближайшее задание" и "текущий урок" — вынесли в hero-блок. Итерация 3: добавили прогресс-бар по курсу и счётчик непрочитанных уведомлений. Финальная версия прошла тест с 3 студентами-добровольцами: среднее время до нужного действия сократилось с 12 до 4 секунд. Все компоненты дашборда — независимые виджеты, каждый фетчит свои данные через TanStack Query.',
  },

  // ══════════════════════════════════════════════════════
  // ФАЗА 3 — QA, ТЕСТЫ, СТАБИЛИЗАЦИЯ
  // ══════════════════════════════════════════════════════

  {
    id: 114, date: '28 фев 2026', tag: 'QA', authorId: 4, color: '#FFD700', readTime: '6 мин',
    title: 'Как мы организуем задачи: Kanban без менеджера',
    excerpt: 'Четверо разработчиков, один проект, нет менеджера. Рассказываем, как выстроили процесс и не утонули в хаосе.',
    fullText: 'Доска в Notion: Backlog → In Progress → Review → Done. Правила: не более 2 задач на человека одновременно, каждая задача имеет acceptance criteria до старта работы, PR без описания не принимается. Спринты по 2 недели. В конце каждого спринта — 30-минутное ретро: что сделали, что затормозило, что изменить. Velocity отслеживаем через story points: первый спринт — 18 points, четвёртый — 34 points. Рост почти вдвое без увеличения команды — результат отладки процесса.',
  },

  {
    id: 115, date: '5 мар 2026', tag: 'QA', authorId: 4, color: '#FFD700', readTime: '5 мин',
    title: 'Пирамида тестирования в KipLet: unit, integration, e2e',
    excerpt: 'Не все тесты одинаково полезны. Объясняем нашу стратегию: что тестируем на каждом уровне и почему именно так.',
    fullText: 'Unit-тесты (pytest): бизнес-логика сервисов, утилиты, Pydantic-схемы. Быстро, изолированно, 80% покрытия. Integration-тесты: эндпоинты через TestClient с тестовой БД в Docker — проверяем полный цикл запроса. E2E (Playwright): критические user journeys — регистрация, вход, просмотр курса, сдача задания. E2E медленные, поэтому только для критических путей. Итого: 147 unit, 38 integration, 12 e2e тестов. CI запускает unit+integration на каждый push, e2e — только перед merge в main.',
  },

  {
    id: 116, date: '10 мар 2026', tag: 'QA', authorId: 4, color: '#FFD700', readTime: '5 мин',
    title: 'Автоматизация тестирования Telegram-бота на Aiogram',
    excerpt: 'Внутренний бот команды для уведомлений о новых задачах — тоже должен быть покрыт тестами. Как это сделать с async кодом.',
    fullText: 'pytest-asyncio для тестирования async хэндлеров Aiogram. Ключевой момент: мокируем объект Bot через unittest.mock.AsyncMock — реальные запросы к Telegram API не нужны. Тестируем состояния FSM: задаём начальное состояние, отправляем сообщение, проверяем переход и ответ бота. Добавили фикстуры для типовых объектов Message и CallbackQuery. Покрыли 100% хэндлеров, выловили 3 реальных бага до первого деплоя. Теперь любое изменение логики бота сразу выявляется в CI.',
  },

  {
    id: 117, date: '15 мар 2026', tag: 'Безопасность', authorId: 2, color: '#FF6B35', readTime: '7 мин',
    title: 'Аудит безопасности KipLet: что нашли и что исправили',
    excerpt: 'Перед первым публичным деплоем Кирилл провёл полный аудит. Результаты оказались интереснее, чем ожидали.',
    fullText: 'Инструменты: bandit (SAST для Python), semgrep с ruleset для FastAPI, ручной review всех auth-эндпоинтов. Что нашли: 1) Утечка stack trace в 500-ответах — закрыли через глобальный exception handler. 2) Отсутствие Content-Security-Policy заголовков — добавили через Nginx. 3) CORS был настроен с allow_origins=["*"] — ограничили конкретными доменами. 4) Пароли логировались в debug-режиме — убрали. 5) Missing rate limit на /api/users/search — добавили slowapi. Итого 5 находок, все закрыты до деплоя. Аудит теперь обязателен перед каждым релизом.',
  },

  // ══════════════════════════════════════════════════════
  // ФАЗА 4 — AI-ИНТЕГРАЦИЯ
  // ══════════════════════════════════════════════════════

  {
    id: 118, date: '20 мар 2026', tag: 'ML', authorId: 4, color: '#FFD700', readTime: '6 мин',
    title: 'AI API в автоматизации: подключаем GPT-4 к боту команды',
    excerpt: 'Как интегрировали AI API во внутренний инструмент для автоматической классификации баг-репортов.',
    fullText: 'Проблема: баг-репорты в общий чат теряются. Решение: бот принимает описание бага, отправляет в OpenAI API с системным промптом, получает: компонент (frontend/backend/devops/qa), severity (critical/major/minor), краткое summary. Few-shot prompting с 5 примерами каждого класса дал точность 87%. Стоимость классификации одного репорта — ~$0.002. Бот автоматически создаёт задачу в Notion с нужными тегами. За первые две недели обработал 34 репорта, сэкономил ~40 минут ручной работы.',
  },

  {
    id: 119, date: '25 мар 2026', tag: 'ML', authorId: 1, color: '#00FFB2', readTime: '7 мин',
    title: 'Power BI дашборд для аналитики KipLet: визуализируем прогресс студентов',
    excerpt: 'Данные есть — теперь нужно сделать так, чтобы преподаватель увидел картину одним взглядом.',
    fullText: 'Подключили Power BI к PostgreSQL через DirectQuery — данные всегда актуальны. Дашборд для преподавателя: средний балл по группе в динамике, тепловая карта активности студентов по дням недели, распределение времени выполнения заданий. Для администратора: воронка регистрации, retention по когортам, нагрузка на сервер. Ключевой инсайт от первых данных: 70% заданий сдаётся в последние 2 часа дедлайна — преподаватели скорректировали систему напоминаний.',
  },

  // ══════════════════════════════════════════════════════
  // ФАЗА 5 — ДЕПЛОЙ И ИНФРАСТРУКТУРА
  // ══════════════════════════════════════════════════════

  {
    id: 120, date: '1 апр 2026', tag: 'DevOps', authorId: 3, color: '#A78BFF', readTime: '5 мин',
    title: 'CI/CD на GitHub Actions: автоматизируем деплой полностью',
    excerpt: 'От пуша в main до обновлённого продакшена — 4 минуты без ручного вмешательства. Рассказываем как устроен наш pipeline.',
    fullText: 'Pipeline состоит из трёх jobs: lint-and-test (ruff, mypy, pytest), build (docker buildx, push в registry), deploy (SSH на сервер, docker compose pull, rolling restart). Секреты хранятся в GitHub Secrets, на сервер попадают через env-файл который генерируется в процессе деплоя и никогда не хранится на диске дольше 60 секунд. При падении любого job — автоматический rollback к предыдущему образу. Notifications в Telegram: успех или падение с ссылкой на логи. За месяц — 0 ручных деплоев.',
  },

  {
    id: 121, date: '5 апр 2026', tag: 'DevOps', authorId: 3, color: '#A78BFF', readTime: '4 мин',
    title: 'Мониторинг и алерты: Prometheus + Grafana для KipLet',
    excerpt: 'Если сервис упал и никто не знает — считай, он не работает. Настраиваем мониторинг который реально предупреждает.',
    fullText: 'Стек: Prometheus собирает метрики, Grafana визуализирует, Alertmanager шлёт уведомления в Telegram. Что мониторим: latency эндпоинтов (p50, p95, p99), error rate, активные соединения с БД, использование памяти и CPU. Алерты настроены на: error rate > 1% за 5 минут, latency p95 > 2 секунды, свободная память < 20%. Grafana-дашборд повесили на второй монитор во время разработки. Первый алерт поймал утечку соединений в SQLAlchemy — фикс занял 20 минут, до мониторинга это могло лежать незамеченным неделю.',
  },

  // ══════════════════════════════════════════════════════
  // ФАЗА 6 — САЙТ-ВИЗИТКА CODION
  // ══════════════════════════════════════════════════════

  {
    id: 122, date: '8 апр 2026', tag: 'Дизайн', authorId: 1, color: '#00FFB2', readTime: '5 мин',
    title: 'Как мы придумали визуальный язык Codion: от концепции до CSS-переменных',
    excerpt: 'Сайт команды — это не просто список участников. Это первое впечатление. Рассказываем как выбирали эстетику и почему именно такая.',
    fullText: 'Референсы: терминальная эстетика, HUD-интерфейсы из sci-fi, монохромные типографические плакаты. Ключевые решения: основной цвет — #00FFB2 (phosphor green), он читается как "живой экран". Space Mono для моноширины — технически, Syne для заголовков — энергично. Тёмная тема как основная: программисты работают в тёмных IDE, сайт должен быть родной средой. CSS-переменные для всего: можно поменять тему одним файлом. Кастомный курсор — не для понта, а чтобы сохранить ощущение интерактивности. Скрамбл-анимация заголовка — первые 2 секунды на сайте должны запоминаться.',
  },

  {
    id: 123, date: '10 апр 2026', tag: 'Разработка', authorId: 1, color: '#00FFB2', readTime: '6 мин',
    title: 'HUD-дошье команды: как мы сделали секцию "Команда" незабываемой',
    excerpt: 'Стандартная карточка с фото и именем — скучно. Реализуем интерфейс в стиле тактического досье с анимациями и skill-барами.',
    fullText: 'Концепция: каждый участник — "оперативник", его профиль открывается как досье. Список участников слева — roster с фото и scan-анимацией на активном. Панель справа — clipPath-анимация раскрытия при смене участника. Внутри: typewriter-эффект для имени и bio, animated skill bars с задержкой, stack pills с hover-эффектом. Все анимации через Framer Motion с правильными easing-кривыми. На мобильном — перестраивается в вертикальный layout без потери контента. Главный принцип: анимации должны работать на содержание, а не отвлекать от него.',
  },

  {
    id: 124, date: '12 апр 2026', tag: 'Разработка', authorId: 1, color: '#00FFB2', readTime: '4 мин',
    title: 'Дерево технологий: интерактивный стек команды вместо скучного списка',
    excerpt: 'Как показать 40+ технологий так, чтобы это было информативно, а не перегружало? Строим интерактивное дерево с раскрывающимися ветками.',
    fullText: 'Задача: показать весь стек команды структурированно. Решение: tree-view в стиле консольного ls --tree. Каждая ветка раскрывается кликом с AnimatePresence-анимацией высоты. Цветовое кодирование по домену: зелёный — фронт, фиолетовый — бэк, оранжевый — данные/AI, жёлтый — инфраструктура, красный — безопасность. Дерево по умолчанию раскрыто на 2 уровня — самое интересное видно сразу. На мобильном горизонтальный скролл внутри блока — дерево не ломается. Один взгляд — и понятно что умеет команда.',
  },

  {
    id: 125, date: '15 апр 2026', tag: 'Разработка', authorId: 1, color: '#00FFB2', readTime: '5 мин',
    title: 'Блог на localStorage: добавляем посты без бэкенда',
    excerpt: 'Сайт статичный, но блог должен быть живым. Реализуем систему постов с персистентностью через localStorage и CRUD-интерфейс прямо в браузере.',
    fullText: 'Статичные посты хранятся в data.ts и всегда присутствуют. Кастомные посты — в localStorage под ключом codion_blog_v2. При загрузке мержим: кастомные идут первыми, статичные — в конце. Шаблоны для новых постов в /template — достаточно заполнить поля. Фильтрация по тегам через Set тегов из всех постов — новые теги появляются автоматически. Пагинация "показать ещё" без перезагрузки. Модалка с fullText открывается через AnimatePresence. Всё это без единого API-запроса — сайт работает полностью офлайн.',
  },

  {
    id: 126, date: '17 апр 2026', tag: 'Разработка', authorId: 1, color: '#00FFB2', readTime: '4 мин',
    title: 'Адаптивность сайта: 6 брейкпоинтов для любого устройства',
    excerpt: 'Сайт должен одинаково хорошо выглядеть на 4K-мониторе и на iPhone SE. Рассказываем как мы подошли к адаптивной вёрстке.',
    fullText: 'Система брейкпоинтов: 1280px — сжимаем контейнер, 1100px — сетки на 2 колонки, 900px — планшет альбомный, 768px — мобильный основной, 480px — маленький телефон, 360px — минимальный экран. На каждом уровне: переопределяем padding, font-size через clamp(), grid-template-columns, flex-direction. Типографика — clamp() от min до max без медиазапросов для заголовков. Кастомный курсор скрывается на touch-устройствах. HUD-панель команды на мобильном перестраивается в вертикальный stack. Протестировали на 8 реальных устройствах — от Galaxy A05 до MacBook Pro.',
  },

  // ══════════════════════════════════════════════════════
  // ФАЗА 7 — ФИНАЛ И ИТОГИ
  // ══════════════════════════════════════════════════════

  {
    id: 127, date: '18 апр 2026', tag: 'Проект', authorId: 3, color: '#A78BFF', readTime: '4 мин', featured: true,
    title: 'KipLet: аудит frontend перед релизом и план следующего спринта',
    excerpt: 'Перед публичным релизом провели финальный аудит. Зафиксировали что сделано, что ещё предстоит, и куда движемся дальше.',
    fullText: 'Сделано: полный auth-цикл с JWT, дашборды всех трёх ролей, система курсов и модулей, загрузка заданий, базовые уведомления, Docker-деплой, CI/CD, мониторинг. В работе: система стримов (WebSocket), чаты между студентом и преподавателем, мобильное приложение на React Native. Технический долг: рефакторинг auth-флоу (слишком много состояния в одном контексте), оптимизация bundle size (сейчас 353kb gzip), добавление skeleton-лоадеров везде. Следующий спринт — стримы и мобильная версия. 200+ коммитов, 0 сорванных дедлайнов.',
  },

  {
    id: 128, date: '20 апр 2026', tag: 'Команда', authorId: 1, color: '#00FFB2', readTime: '6 мин',
    title: 'Три месяца в Codion: что мы узнали о командной разработке',
    excerpt: 'Итоговая рефлексия: что сработало, что нет, и какие принципы мы заберём в следующие проекты.',
    fullText: 'Что сработало: договорённости до кода (схема БД, структура проекта, соглашения), короткие синхронизации вместо длинных митингов, автоматизация всего что можно автоматизировать. Что не сработало сразу: недооценили время на тесты (пришлось догонять), слишком широкий скоуп MVP (резали на ходу). Главный вывод: технические решения дешевле менять в начале, процессные — дорого на любом этапе. Следующий проект начнём с двух вещей: написание ADR (Architecture Decision Records) для каждого ключевого решения и обязательный security review на этапе дизайна, а не после.',
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
            { id: 'antd', label: 'Ant Design', color: '#00FFB2' },
            { id: 'framer', label: 'Framer Motion', color: '#00FFB2' },
            { id: 'vite', label: 'Vite', color: '#00FFB2' },
            { id: 'tailwind', label: 'Tailwind CSS', color: '#00FFB2' },
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
            { id: 'sqlalchemy', label: 'SQLAlchemy 2.0', color: '#A78BFF' },
            { id: 'alembic', label: 'Alembic', color: '#A78BFF' },
            { id: 'celery', label: 'Celery', color: '#A78BFF' },
          ]
        },
        {
          id: 'dotnet', label: '.NET / C#', color: '#A78BFF',
          children: [
            { id: 'aspnet', label: 'ASP.NET Core', color: '#A78BFF' },
            { id: 'efcore', label: 'Entity Framework Core', color: '#A78BFF' },
            { id: 'console', label: 'Console Apps as Telegram Bots, etc.', color: '#A78BFF' }, // из проектов Савелия
          ]
        },
        { id: 'other-be', label: 'PHP / Java / Kotlin / Go / Node.js', color: '#A78BFF' },
      ]
    },

    {
      id: 'data', label: 'Data & AI', color: '#FF6B35',
      children: [
        { id: 'pg', label: 'PostgreSQL + pgvector', color: '#FF6B35' },
        { id: 'powerbi', label: 'Power BI (Data Analyst)', color: '#FF6B35' }, // из сертификата
        { id: 'keras', label: 'Keras / Deep Learning', color: '#FF6B35' },
        {
          id: 'ai',
          label: 'AI / LLM',
          color: '#FF6B35',
          children: [
            { id: 'langchain', label: 'Computer Vision', color: '#FF6B35' },
            { id: 'ollama', label: 'vLLM', color: '#FF6B35' },
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
            { id: 'nginx', label: 'Nginx', color: '#FFD700' },
          ]
        },
        { id: 'k8s', label: 'Kubernetes', color: '#FFD700' },
        { id: 'cicd', label: 'Git + CI/CD (GitHub Actions / GitLab CI)', color: '#FFD700' },
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
    }
  ]
}
