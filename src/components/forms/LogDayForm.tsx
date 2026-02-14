import { useState } from 'react'
import Modal from '../shared/Modal'
import { getVibeColor, toISODate } from '../../lib/utils'
import type { DayLog } from '../../types'

const EMOJI_OPTIONS = ['😊','🔥','💪','🌊','✨','😴','🤔','😤','🙏','🎯','🌱','☀️','🌧️','⚡','🎉','🧠','❤️','😔','🚀','🌙']

interface LogDayFormProps {
  weekLogId: string
  onClose: () => void
  onCreate: (input: Omit<DayLog, 'id' | 'created_at'>) => Promise<void>
}

export default function LogDayForm({ weekLogId, onClose, onCreate }: LogDayFormProps) {
  const [date, setDate] = useState(toISODate(new Date()))
  const [emoji, setEmoji] = useState<string | null>(null)
  const [vibeScore, setVibeScore] = useState<number>(7)
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await onCreate({
        week_log_id: weekLogId,
        date,
        emoji,
        vibe_score: vibeScore,
        notes: notes.trim() || null,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '15px',
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    color: '#6b7280',
    letterSpacing: '0.05em',
    marginBottom: '6px',
  }

  return (
    <Modal title="Log Today" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {/* Date */}
        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle}>DATE</label>
          <input style={inputStyle} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        {/* Emoji picker */}
        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle}>HOW DID TODAY FEEL?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {EMOJI_OPTIONS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmoji(emoji === e ? null : e)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  border: emoji === e ? '2px solid #6366f1' : '2px solid transparent',
                  backgroundColor: emoji === e ? '#ede9fe' : '#f3f4f6',
                  fontSize: '22px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Vibe slider */}
        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle}>
            VIBE SCORE —{' '}
            <span style={{ color: getVibeColor(vibeScore), fontWeight: 700 }}>{vibeScore}</span>
          </label>
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={vibeScore}
            onChange={(e) => setVibeScore(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: getVibeColor(vibeScore) }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
            <span>0</span><span>5</span><span>10</span>
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>NOTES (optional)</label>
          <textarea
            style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
            placeholder="Anything notable today?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {error && (
          <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{error}</div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? 'Saving...' : 'Save Day'}
        </button>
      </form>
    </Modal>
  )
}
