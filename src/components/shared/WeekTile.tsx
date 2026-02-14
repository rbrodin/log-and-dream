import type { WeekLog } from '../../types'
import { formatWeekLabel, formatDateRange, getVibeColor } from '../../lib/utils'

interface WeekTileProps {
  weekLog: WeekLog
  seasonNumber: number
  size?: 'compact' | 'full'
}

export default function WeekTile({ weekLog, seasonNumber, size = 'full' }: WeekTileProps) {
  const label = formatWeekLabel(seasonNumber, weekLog.week_number)
  const vibeColor = getVibeColor(weekLog.vibe_score)

  if (size === 'compact') {
    // Square tile used in Timeline grid
    return (
      <div style={{
        backgroundColor: '#f3f4f6',
        borderRadius: '12px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        minWidth: '70px',
      }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.05em' }}>{label}</div>
        <div style={{ fontSize: '22px', lineHeight: 1 }}>{weekLog.emoji ?? '·'}</div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: vibeColor }}>{weekLog.vibe_score ?? '—'}</div>
      </div>
    )
  }

  // Full row tile used in Home recent list
  return (
    <div style={{
      backgroundColor: '#f3f4f6',
      borderRadius: '14px',
      padding: '14px 16px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <div style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0 }}>{weekLog.emoji ?? '·'}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#9ca3af' }}>{label}</span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: vibeColor }}>{weekLog.vibe_score ?? '—'}</span>
        </div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>
          {formatDateRange(weekLog.start_date, weekLog.end_date)}
        </div>
        {weekLog.notes && (
          <div style={{ fontSize: '13px', color: '#374151', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {weekLog.notes}
          </div>
        )}
      </div>
    </div>
  )
}
