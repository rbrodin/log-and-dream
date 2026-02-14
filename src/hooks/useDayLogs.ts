import { supabase } from '../lib/supabase'
import type { DayLog } from '../types'

export function useDayLogs() {
  async function createDayLog(input: Omit<DayLog, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('day_logs')
      .insert(input)
      .select()
      .single()
    if (error) throw error
    return data
  }

  return { createDayLog }
}
