import { useState } from 'react'
import Modal from '../shared/Modal'
import { SEASON_GRADIENTS } from '../../lib/utils'

interface CreateSeasonInput {
  name: string
  number: number
  start_date: string
  end_date: string | null
  theme_color: string
  is_active: boolean
}

interface CreateSeasonModalProps {
  nextNumber: number
  hasActiveSeason: boolean
  onClose: () => void
  onCreate: (input: CreateSeasonInput) => Promise<void>
}

export default function CreateSeasonModal({ nextNumber, hasActiveSeason, onClose, onCreate }: CreateSeasonModalProps) {
  const today = new Date().toISOString().slice(0, 10)
  const [name, setName] = useState('')
  const [number, setNumber] = useState(nextNumber)
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState('')
  const [themeColor, setThemeColor] = useState(SEASON_GRADIENTS[0].value)
  const [isActive, setIsActive] = useState(!hasActiveSeason)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError('Season name is required'); return }
    setSubmitting(true)
    setError('')
    try {
      await onCreate({
        name: name.trim(),
        number,
        start_date: startDate,
        end_date: endDate || null,
        theme_color: themeColor,
        is_active: isActive,
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
    color: '#9ca3af',
    letterSpacing: '0.05em',
    marginBottom: '6px',
  }

  return (
    <Modal title="New Season" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle}>SEASON NAME</label>
          <input
            style={inputStyle}
            placeholder="e.g. Horizon, Daybreak, Bloom..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle}>SEASON NUMBER</label>
          <input
            style={{ ...inputStyle, width: '80px' }}
            type="number"
            min={1}
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value) || 1)}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>START DATE</label>
            <input
              style={inputStyle}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>END DATE (optional)</label>
            <input
              style={inputStyle}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={labelStyle}>THEME</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {SEASON_GRADIENTS.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setThemeColor(g.value)}
                title={g.label}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: g.value,
                  border: themeColor === g.value ? '3px solid #111827' : '3px solid transparent',
                  cursor: 'pointer',
                  padding: 0,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
          {/* Preview */}
          <div style={{
            marginTop: '10px',
            height: '50px',
            borderRadius: '10px',
            background: themeColor,
          }} />
        </div>

        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            id="set-active"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: '#6366f1' }}
          />
          <label htmlFor="set-active" style={{ fontSize: '14px', color: '#111827', cursor: 'pointer' }}>
            Set as active season
          </label>
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
          {submitting ? 'Creating...' : 'Create Season'}
        </button>
      </form>
    </Modal>
  )
}
