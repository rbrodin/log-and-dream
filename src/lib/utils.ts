/** Formats a week label like "S2W5" from season number and week number */
export function formatWeekLabel(seasonNumber: number, weekNumber: number): string {
  return `S${seasonNumber}W${weekNumber}`
}

/** Returns a hex color for a vibe score 0–10 */
export function getVibeColor(score: number | null): string {
  if (score === null) return '#6b7280'  // gray
  if (score <= 3) return '#ef4444'      // red
  if (score <= 6) return '#f59e0b'      // amber
  return '#22c55e'                       // green
}

/** Formats a date range like "Jan 6 – 12" or "Jan 27 – Feb 2" */
export function formatDateRange(start: string, end: string): string {
  const s = new Date(start + 'T00:00:00')
  const e = new Date(end + 'T00:00:00')
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  const startStr = s.toLocaleDateString('en-US', opts)
  const endStr =
    s.getMonth() === e.getMonth()
      ? e.toLocaleDateString('en-US', { day: 'numeric' })
      : e.toLocaleDateString('en-US', opts)
  return `${startStr} – ${endStr}`
}

/** Returns the ISO date string for a given Date */
export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** Returns Mon–Sun bounds for the current week */
export function getCurrentWeekBounds(): { start: string; end: string } {
  const today = new Date()
  const day = today.getDay()              // 0 = Sun
  const diffToMon = day === 0 ? -6 : 1 - day
  const mon = new Date(today)
  mon.setDate(today.getDate() + diffToMon)
  const sun = new Date(mon)
  sun.setDate(mon.getDate() + 6)
  return { start: toISODate(mon), end: toISODate(sun) }
}

/** Formats a season date range like "Jan 14 – Mar 31" or "Jan 14 – ongoing" */
export function formatSeasonRange(startDate: string, endDate: string | null): string {
  const start = new Date(startDate + 'T00:00:00')
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  if (!endDate) return `${startStr} – ongoing`
  const end = new Date(endDate + 'T00:00:00')
  const endStr = end.toLocaleDateString('en-US', opts)
  return `${startStr} – ${endStr}`
}

export const SEASON_GRADIENTS = [
  { label: 'Ocean', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { label: 'Dusk', value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { label: 'Sunset', value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { label: 'Forest', value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { label: 'Nebula', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { label: 'Ember', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
]
