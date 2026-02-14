import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useSeasonsStore } from '../store/seasonsStore'
import type { Season } from '../types'

export function useSeasons() {
  const store = useSeasonsStore()

  useEffect(() => {
    async function fetchSeasons() {
      store.setLoading(true)
      const { data, error } = await supabase
        .from('seasons')
        .select('*')
        .order('number', { ascending: true })
      if (error) {
        store.setError(error.message)
        store.setLoading(false)
        return
      }
      store.setSeasons(data ?? [])
      store.setLoading(false)
    }
    fetchSeasons()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function createSeason(input: Omit<Season, 'id' | 'created_at'>) {
    // If setting this season active, deactivate all others first
    if (input.is_active) {
      await supabase.from('seasons').update({ is_active: false }).neq('id', '')
    }
    const { data, error } = await supabase
      .from('seasons')
      .insert(input)
      .select()
      .single()
    if (error) throw error
    store.addSeason(data)
    if (input.is_active) {
      // Update all others in local store
      store.seasons.forEach((s) => {
        if (s.is_active) store.updateSeason(s.id, { is_active: false })
      })
    }
    return data
  }

  async function setActiveSeason(id: string) {
    // Deactivate all, then activate the chosen one
    await supabase.from('seasons').update({ is_active: false }).neq('id', id)
    const { data, error } = await supabase
      .from('seasons')
      .update({ is_active: true })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    // Update store — mark all inactive except this one
    store.setSeasons(
      store.seasons.map((s) => ({ ...s, is_active: s.id === id }))
    )
    return data
  }

  return { ...store, createSeason, setActiveSeason }
}
