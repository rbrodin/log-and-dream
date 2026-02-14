export interface Season {
  id: string
  name: string
  number: number
  start_date: string        // ISO date "YYYY-MM-DD"
  end_date: string | null   // null = ongoing
  theme_color: string       // hex "#6366f1" or CSS gradient string
  is_active: boolean
  created_at: string
}

export interface WeekLog {
  id: string
  season_id: string
  week_number: number       // within the season (1, 2, 3...)
  start_date: string        // ISO date
  end_date: string          // ISO date
  emoji: string | null
  vibe_score: number | null // 0–10
  notes: string | null
  created_at: string
}

export interface DayLog {
  id: string
  season_id: string
  week_log_id: string | null  // null = logged before a week exists
  date: string
  emoji: string | null
  vibe_score: number | null
  notes: string | null
  created_at: string
}

export interface SeasonStats {
  weekCount: number
  avgVibe: number | null
}
