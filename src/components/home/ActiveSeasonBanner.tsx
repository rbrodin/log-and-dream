import { useNavigate } from 'react-router-dom'
import type { Season } from '../../types'
import { formatSeasonRange } from '../../lib/utils'

interface ActiveSeasonBannerProps {
  season: Season | null
  totalWeeks?: number
}

export default function ActiveSeasonBanner({ season, totalWeeks = 0 }: ActiveSeasonBannerProps) {
  const navigate = useNavigate()

  if (!season) {
    return (
      <div
        style={{
          margin: '16px',
          padding: '20px',
          backgroundColor: '#f3f4f6',
          borderRadius: '16px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/seasons')}
      >
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌱</div>
        <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827', marginBottom: '4px' }}>No active season</div>
        <div style={{ fontSize: '13px', color: '#6b7280' }}>Tap to create one in Seasons</div>
      </div>
    )
  }

  return (
    <div
      style={{
        margin: '16px',
        borderRadius: '16px',
        overflow: 'hidden',
        background: season.theme_color,
        cursor: 'pointer',
      }}
      onClick={() => navigate('/seasons')}
    >
      <div style={{ padding: '20px 20px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)', marginBottom: '4px' }}>
              SEASON {season.number}
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '6px' }}>
              {season.name}
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
              {totalWeeks > 0 ? `Week ${totalWeeks} · ` : ''}{formatSeasonRange(season.start_date, season.end_date)}
            </div>
          </div>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
            borderRadius: '20px',
            padding: '4px 12px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '0.05em',
            flexShrink: 0,
          }}>
            ACTIVE
          </div>
        </div>
      </div>
    </div>
  )
}
