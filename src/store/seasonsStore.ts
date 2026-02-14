import { create } from 'zustand'
import type { Season } from '../types'

interface SeasonsState {
  seasons: Season[]
  activeSeason: Season | null
  isLoading: boolean
  error: string | null
  setSeasons: (seasons: Season[]) => void
  addSeason: (season: Season) => void
  updateSeason: (id: string, updates: Partial<Season>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useSeasonsStore = create<SeasonsState>((set) => ({
  seasons: [],
  activeSeason: null,
  isLoading: false,
  error: null,

  setSeasons: (seasons) =>
    set({
      seasons,
      activeSeason: seasons.find((s) => s.is_active) ?? null,
    }),

  addSeason: (season) =>
    set((state) => ({
      seasons: [...state.seasons, season],
      activeSeason: season.is_active ? season : state.activeSeason,
    })),

  updateSeason: (id, updates) =>
    set((state) => {
      const updated = state.seasons.map((s) => (s.id === id ? { ...s, ...updates } : s))
      return {
        seasons: updated,
        activeSeason: updated.find((s) => s.is_active) ?? null,
      }
    }),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))
