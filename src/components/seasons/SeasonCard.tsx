import type { Season, SeasonStats } from '../../types'
import { formatSeasonRange } from '../../lib/utils'
import VibeScore from '../shared/VibeScore'

interface SeasonCardProps {
  season: Season
  stats: SeasonStats
  onSetActive: (id: string) => void
}

export default function SeasonCard({ season, stats, onSetActive }: SeasonCardProps) {
  return (
    <div
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
        marginBottom: '16px',
      }}
    >
      {/* Gradient banner */}
      <div
        style={{
          background: season.theme_color,
          height: '100px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '14px 16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', marginBottom: '2px' }}>
              SEASON {season.number}
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
              {season.name}
            </div>
          </div>
          {season.is_active && (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              color: '#fff',
              letterSpacing: '0.05em',
            }}>
              ACTIVE
            </div>
          )}
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginTop: '4px' }}>
          {formatSeasonRange(season.start_date, season.end_date)}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 500, letterSpacing: '0.05em', marginBottom: '2px' }}>WEEKS</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#f5f5f5' }}>{stats.weekCount}</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 500, letterSpacing: '0.05em', marginBottom: '2px' }}>AVG VIBE</div>
            <VibeScore score={stats.avgVibe} size="md" />
          </div>
        </div>
        {!season.is_active && (
          <button
            onClick={() => onSetActive(season.id)}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #252525',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              color: '#9ca3af',
              cursor: 'pointer',
            }}
          >
            Set active
          </button>
        )}
      </div>
    </div>
  )
}
