import { useState } from 'react'
import Modal from '../shared/Modal'
import { getCurrentWeekBounds, getVibeColor } from '../../lib/utils'
import type { WeekLog } from '../../types'

const EMOJI_OPTIONS = ['😊','🔥','💪','🌊','✨','😴','🤔','😤','🙏','🎯','🌱','☀️','🌧️','⚡','🎉','🧠','❤️','😔','🚀','🌙']

interface LogWeekFormProps {
  seasonId: string
  seasonNumber: number
  nextWeekNumber: number
  onClose: () => void
  onCreate: (input: Omit<WeekLog, 'id' | 'created_at'>) => Promise<void>
}

export default function LogWeekForm({ seasonId, seasonNumber, nextWeekNumber, onClose, onCreate }: LogWeekFormProps) {
  const { start, end } = getCurrentWeekBounds()
  const [startDate, setStartDate] = useState(start)
  const [endDate, setEndDate] = useState(end)
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
        season_id: seasonId,
        week_number: nextWeekNumber,
        start_date: startDate,
        end_date: endDate,
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
    backgroundColor: '#252525',
    border: '1px solid #333',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '15px',
    color: '#f5f5f5',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    color: '#9ca3af',
    letterSpacing: '0.05em',
    marginBottom: '6px',
  }

  return (
    <Modal title={`Log Week · S${seasonNumber}W${nextWeekNumber}`} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {/* Date range */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>WEEK START</label>
            <input style={inputStyle} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>WEEK END</label>
            <input style={inputStyle} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} />
          </div>
        </div>

        {/* Emoji picker */}
        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle}>PICK AN EMOJI</label>
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
                  backgroundColor: emoji === e ? '#1e1e3a' : '#252525',
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
            placeholder="How did this week feel? Any highlights?"
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
          {submitting ? 'Saving...' : 'Save Week'}
        </button>
      </form>
    </Modal>
  )
}
