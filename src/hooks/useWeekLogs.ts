import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useWeekLogsStore } from '../store/weekLogsStore'
import type { WeekLog } from '../types'

export function useWeekLogs(seasonId: string | null) {
  const store = useWeekLogsStore()

  useEffect(() => {
    if (!seasonId) {
      store.setWeekLogs([])
      return
    }
    async function fetchWeekLogs() {
      store.setLoading(true)
      const { data, error } = await supabase
        .from('week_logs')
        .select('*')
        .eq('season_id', seasonId)
        .order('start_date', { ascending: false })
      if (error) {
        store.setLoading(false)
        return
      }
      store.setWeekLogs(data ?? [])
      store.setLoading(false)
    }
    fetchWeekLogs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasonId])

  async function createWeekLog(input: Omit<WeekLog, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('week_logs')
      .insert(input)
      .select()
      .single()
    if (error) throw error
    store.addWeekLog(data)
    return data
  }

  return { ...store, createWeekLog }
}
