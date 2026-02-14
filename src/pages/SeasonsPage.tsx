import { useState } from 'react'
import { useSeasons } from '../hooks/useSeasons'
import SeasonCard from '../components/seasons/SeasonCard'
import CreateSeasonModal from '../components/seasons/CreateSeasonModal'
import type { SeasonStats } from '../types'

export default function SeasonsPage() {
  const { seasons, isLoading, error, createSeason, setActiveSeason } = useSeasons()
  const [showCreate, setShowCreate] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function computeStats(_seasonId: string): SeasonStats {
    // Stats will be enriched with week data in a later iteration
    return { weekCount: 0, avgVibe: null }
  }

  const hasActiveSeason = seasons.some((s) => s.is_active)

  return (
    <div style={{ padding: '24px 16px 8px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#f5f5f5' }}>Seasons</h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#9ca3af' }}>Chapters of your story</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: '#6366f1',
            border: 'none',
            color: '#fff',
            fontSize: '22px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          +
        </button>
      </div>

      {/* Content */}
      <div style={{ marginTop: '20px' }}>
        {isLoading && (
          <div style={{ color: '#9ca3af', textAlign: 'center', padding: '40px 0' }}>Loading...</div>
        )}

        {error && (
          <div style={{ color: '#ef4444', fontSize: '14px', padding: '12px', backgroundColor: '#1a1a1a', borderRadius: '10px' }}>
            {error}
          </div>
        )}

        {!isLoading && seasons.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌱</div>
            <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '6px', color: '#f5f5f5' }}>No seasons yet</div>
            <div style={{ fontSize: '14px' }}>Tap + to create your first season</div>
          </div>
        )}

        {/* Reverse so newest (highest number) shows first */}
        {[...seasons].reverse().map((season) => (
          <SeasonCard
            key={season.id}
            season={season}
            stats={computeStats(season.id)}
            onSetActive={setActiveSeason}
          />
        ))}
      </div>

      {showCreate && (
        <CreateSeasonModal
          nextNumber={seasons.length + 1}
          hasActiveSeason={hasActiveSeason}
          onClose={() => setShowCreate(false)}
          onCreate={createSeason}
        />
      )}
    </div>
  )
}
