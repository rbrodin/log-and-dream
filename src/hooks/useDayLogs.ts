import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { DayLog } from '../types'

export function useDayLogs(seasonId: string | null) {
  const [dayLogs, setDayLogs] = useState<DayLog[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!seasonId) { setDayLogs([]); return }
    async function fetchDayLogs() {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('day_logs')
        .select('*')
        .eq('season_id', seasonId)
        .order('date', { ascending: false })
      if (!error) setDayLogs(data ?? [])
      setIsLoading(false)
    }
    fetchDayLogs()
  }, [seasonId])

  async function createDayLog(input: Omit<DayLog, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('day_logs')
      .insert(input)
      .select()
      .single()
    if (error) throw error
    setDayLogs((prev) => [data, ...prev])
    return data
  }

  return { dayLogs, isLoading, createDayLog }
}
