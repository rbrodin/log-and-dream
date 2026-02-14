import { create } from 'zustand'
import type { WeekLog } from '../types'

interface WeekLogsState {
  weekLogs: WeekLog[]
  isLoading: boolean
  setWeekLogs: (logs: WeekLog[]) => void
  addWeekLog: (log: WeekLog) => void
  updateWeekLog: (id: string, updates: Partial<WeekLog>) => void
  setLoading: (loading: boolean) => void
}

export const useWeekLogsStore = create<WeekLogsState>((set) => ({
  weekLogs: [],
  isLoading: false,

  setWeekLogs: (weekLogs) => set({ weekLogs }),

  addWeekLog: (log) =>
    set((state) => ({
      weekLogs: [log, ...state.weekLogs].sort(
        (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      ),
    })),

  updateWeekLog: (id, updates) =>
    set((state) => ({
      weekLogs: state.weekLogs.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    })),

  setLoading: (isLoading) => set({ isLoading }),
}))
