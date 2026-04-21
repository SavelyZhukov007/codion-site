/**
 * Шаблон проекта
 * Скопируй этот объект в массив PROJECTS в src/App.tsx
 */

export const PROJECT_TEMPLATE = {
  id: 2,
  name: 'Название проекта',
  status: 'active' as 'active' | 'completed' | 'paused',
  tagline: 'Одна строка — суть проекта',
  description: 'Подробное описание проекта. Что делает, зачем, для кого.',
  stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
  features: [
    'Ключевая фича 1',
    'Ключевая фича 2',
    'Ключевая фича 3',
  ],
  repo: 'https://github.com/...',
  live: undefined,                     // или 'https://...'
  team: [1, 2, 3],                     // id участников из TEAM
  color: '#00FFB2',
  commits: '50+',
  year: '2026',
  image: '/project-screenshot.png',   // Опционально, положи в /public/
}
