import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useSeasonsStore } from '../store/seasonsStore'
import WeekTile from '../components/shared/WeekTile'
import type { WeekLog, Season } from '../types'

interface MonthGroup {
  label: string       // "February 2026"
  seasonLabel: string // "Season 2: Horizon"
  weekLogs: WeekLog[]
  season: Season
}

export default function TimelinePage() {
  const { seasons } = useSeasonsStore()
  const [allWeekLogs, setAllWeekLogs] = useState<WeekLog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAll() {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('week_logs')
        .select('*')
        .order('start_date', { ascending: false })
      if (!error) setAllWeekLogs(data ?? [])
      setIsLoading(false)
    }
    fetchAll()
  }, [])

  // Group week logs by month, attaching season info
  const groups: MonthGroup[] = []
  const seen = new Map<string, MonthGroup>()

  for (const wl of allWeekLogs) {
    const d = new Date(wl.start_date + 'T00:00:00')
    const monthKey = `${d.getFullYear()}-${d.getMonth()}`
    const monthLabel = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    const season = seasons.find((s) => s.id === wl.season_id)
    if (!season) continue

    if (!seen.has(monthKey)) {
      const group: MonthGroup = {
        label: monthLabel,
        seasonLabel: `Season ${season.number}: ${season.name}`,
        weekLogs: [],
        season,
      }
      seen.set(monthKey, group)
      groups.push(group)
    }
    seen.get(monthKey)!.weekLogs.push(wl)
  }

  return (
    <div style={{ padding: '24px 16px 8px' }}>
      <h1 style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: 700, color: '#111827' }}>Timeline</h1>
      <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#6b7280' }}>Your journey through the weeks</p>

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>Loading...</div>
      )}

      {!isLoading && groups.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📅</div>
          <div style={{ fontSize: '16px', fontWeight: 500, color: '#111827', marginBottom: '6px' }}>No weeks logged yet</div>
          <div style={{ fontSize: '14px' }}>Go to Home and tap "Log Week" to get started</div>
        </div>
      )}

      {groups.map((group) => (
        <div key={group.label} style={{ marginBottom: '28px' }}>
          {/* Month header */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>{group.label}</div>
            <div style={{ fontSize: '12px', color: '#6366f1', fontWeight: 500, marginTop: '1px' }}>{group.seasonLabel}</div>
          </div>

          {/* Week tiles grid */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {group.weekLogs.map((wl) => (
              <WeekTile
                key={wl.id}
                weekLog={wl}
                seasonNumber={group.season.number}
                size="compact"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
