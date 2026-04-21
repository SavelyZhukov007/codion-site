# Codion — Шаблоны контента

Эта папка содержит шаблоны для быстрого добавления контента на сайт.

---

## Как добавить новый пост в блог

1. Открой `src/App.tsx`
2. Найди массив `BLOG_POSTS`
3. Скопируй шаблон из `blog-post.template.ts` и добавь новый объект

### Шаблон поста:
```ts
{
  id: <следующий_id>,
  date: '20 апр 2026',        // Дата публикации
  tag: 'Разработка',           // Тег: Разработка | Безопасность | Проект | DevOps | ML | Дизайн
  title: 'Заголовок поста',
  excerpt: 'Краткое описание — 1–2 предложения.',
  fullText: `Полный текст поста. Поддерживает **markdown**-разметку.`,
  author: 'Савелий',           // Автор: Савелий | Кирилл | tWisty
  color: '#00FFB2',            // Цвет: '#00FFB2' | '#FF6B35' | '#A78BFF'
  readTime: '3 мин',
}
```

---

## Как добавить новый проект

1. Найди массив `PROJECTS` в `src/App.tsx`
2. Скопируй шаблон из `project.template.ts`

### Шаблон проекта:
```ts
{
  id: <следующий_id>,
  name: 'Название проекта',
  status: 'active',            // 'active' | 'completed' | 'paused'
  description: 'Описание проекта.',
  stack: ['React', 'FastAPI'],
  repo: 'https://github.com/...',
  live: 'https://...',         // Опционально
  team: [1, 2, 3],             // id участников команды
  color: '#00FFB2',
  commits: '200+',
  year: '2026',
}
```

---

## Как добавить участника команды

Найди массив `TEAM` в `src/App.tsx`:

```ts
{
  id: <следующий_id>,
  name: 'Имя Фамилия',
  nameEn: 'Name Surname',
  handle: '@handle',
  role: 'Роль · Специализация',
  bio: 'Короткое описание.',
  stack: ['Tech1', 'Tech2'],
  certs: ['Сертификат 1'],
  color: '#ЦВЕТ',
  photo: '/photo.jpg',         // Положи фото в /public/
  links: [
    { label: 'GitHub',   url: 'https://github.com/...', icon: 'gh' },
    { label: 'Telegram', url: 'https://t.me/...',       icon: 'tg' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/...', icon: 'li' },
    { label: 'Сайт',     url: 'https://...',            icon: 'web' },
    { label: 'Coursera', url: 'https://...',            icon: 'edu' },
  ],
}
```

---

## Иконки (`icon` поле)

| icon  | Что отображается |
|-------|-----------------|
| `gh`  | GitHub          |
| `tg`  | Telegram        |
| `li`  | LinkedIn        |
| `web` | Сайт/Глобус     |
| `edu` | Образование     |

---

## Анимации (Framer Motion)

Компонент уже подключён. Используй обёртку `<Reveal>` для любого блока:

```tsx
import { Reveal } from './components/Reveal'

<Reveal>
  <div>Этот блок появится при прокрутке</div>
</Reveal>
```

Или напрямую через `motion`:

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Контент
</motion.div>
```
