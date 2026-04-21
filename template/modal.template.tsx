/**
 * Шаблон модального окна
 * Скопируй и адаптируй для нового типа контента
 */
import { useEffect } from 'react'

interface ModalProps<T> {
  item: T | null
  onClose: () => void
}

/**
 * Пример: модальное окно для кастомного контента
 *
 * Использование в App.tsx:
 *   const [activeItem, setActiveItem] = useState<MyType | null>(null)
 *   <MyModal item={activeItem} onClose={() => setActiveItem(null)} />
 */
export function ExampleModal({ item, onClose }: ModalProps<{ title: string; body: string; color: string }>) {
  useEffect(() => {
    if (!item) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    // Блокируем скролл страницы
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          {/* SVG иконка из спрайта */}
          <svg width="20" height="20"><use href="/icons.svg#icon-close" /></svg>
        </button>

        {/* Цветная полоска сверху */}
        <div style={{ height: 3, background: item.color, marginBottom: '1.5rem', borderRadius: 2 }} />

        <h2 className="modal-title">{item.title}</h2>
        <p className="modal-body">{item.body}</p>

        {/* Кнопка действия */}
        <button
          className="btn-primary"
          style={{ marginTop: '1.5rem' }}
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}

/**
 * CSS классы доступные для модального окна:
 * .modal-overlay  — тёмный фон
 * .modal          — карточка
 * .modal-close    — кнопка закрытия
 * .modal-tag      — цветной тег
 * .modal-title    — заголовок
 * .modal-meta     — мета-информация (дата, автор)
 * .modal-body     — основной текст
 */
