import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSeasons } from '../hooks/useSeasons'
import { useWeekLogs } from '../hooks/useWeekLogs'
import ActiveSeasonBanner from '../components/home/ActiveSeasonBanner'
import WeekTile from '../components/shared/WeekTile'
import LogWeekForm from '../components/forms/LogWeekForm'

export default function HomePage() {
  const navigate = useNavigate()
  const { activeSeason } = useSeasons()
  const { weekLogs, createWeekLog } = useWeekLogs(activeSeason?.id ?? null)
  const [showLogWeek, setShowLogWeek] = useState(false)

  const recentWeeks = weekLogs.slice(0, 5)

  return (
    <div style={{ paddingTop: '16px' }}>
      {/* Season banner */}
      <ActiveSeasonBanner season={activeSeason} totalWeeks={weekLogs.length} />

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '12px', padding: '8px 16px 0' }}>
        <button
          onClick={() => activeSeason ? setShowLogWeek(true) : navigate('/seasons')}
          style={{
            flex: 1,
            padding: '16px 12px',
            backgroundColor: '#6366f1',
            border: 'none',
            borderRadius: '14px',
            color: '#fff',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: '22px', marginBottom: '4px' }}>📅</div>
          <div style={{ fontSize: '15px', fontWeight: 600 }}>Log Week</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '2px' }}>Weekly reflection</div>
        </button>

        <button
          onClick={() => {/* day logging — coming soon */}}
          style={{
            flex: 1,
            padding: '16px 12px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #252525',
            borderRadius: '14px',
            color: '#f5f5f5',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: '22px', marginBottom: '4px' }}>✨</div>
          <div style={{ fontSize: '15px', fontWeight: 600 }}>Log Today</div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>Quick capture</div>
        </button>
      </div>

      {/* Recent weeks */}
      <div style={{ padding: '24px 16px 0' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: '#9ca3af' }}>
          RECENT WEEKS
        </h3>

        {weekLogs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: '#9ca3af', fontSize: '14px' }}>
            {activeSeason
              ? 'No weeks logged yet. Tap "Log Week" to start.'
              : 'Create a season first, then start logging your weeks.'}
          </div>
        )}

        {recentWeeks.map((wl) => (
          <WeekTile
            key={wl.id}
            weekLog={wl}
            seasonNumber={activeSeason?.number ?? 1}
          />
        ))}

        {weekLogs.length > 5 && (
          <button
            onClick={() => navigate('/timeline')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'transparent',
              border: '1px solid #252525',
              borderRadius: '12px',
              color: '#9ca3af',
              fontSize: '14px',
              cursor: 'pointer',
              marginTop: '4px',
            }}
          >
            View all in Timeline →
          </button>
        )}
      </div>

      {showLogWeek && activeSeason && (
        <LogWeekForm
          seasonId={activeSeason.id}
          seasonNumber={activeSeason.number}
          nextWeekNumber={weekLogs.length + 1}
          onClose={() => setShowLogWeek(false)}
          onCreate={createWeekLog}
        />
      )}
    </div>
  )
}
