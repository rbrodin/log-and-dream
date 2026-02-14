import { useEffect } from 'react'
import type { ReactNode } from 'react'

interface ModalProps {
  title: string
  onClose: () => void
  children: ReactNode
}

export default function Modal({ title, onClose, children }: ModalProps) {
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#1a1a1a',
          borderRadius: '20px 20px 0 0',
          padding: '24px 20px calc(24px + env(safe-area-inset-bottom))',
          maxHeight: '90dvh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#f5f5f5' }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0 4px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
