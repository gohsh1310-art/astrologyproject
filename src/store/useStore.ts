import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BirthData {
  date: string
  time: string
  location: string
  latitude: number
  longitude: number
  timezone: string
}

export interface JournalEntry {
  id: string
  date: string
  prompt: string
  content: string
  mood?: string
  tags?: string[]
}

export interface BirthChart {
  sun: { sign: string; degree: number; house: number }
  moon: { sign: string; degree: number; house: number }
  rising: { sign: string; degree: number }
  mercury: { sign: string; degree: number; house: number }
  venus: { sign: string; degree: number; house: number }
  mars: { sign: string; degree: number; house: number }
  jupiter: { sign: string; degree: number; house: number }
  saturn: { sign: string; degree: number; house: number }
  uranus: { sign: string; degree: number; house: number }
  neptune: { sign: string; degree: number; house: number }
  pluto: { sign: string; degree: number; house: number }
}

interface Store {
  birthData: BirthData | null
  birthChart: BirthChart | null
  journalEntries: JournalEntry[]
  currentView: 'dashboard' | 'journal' | 'chart'
  lastPromptDate: string | null
  setBirthData: (data: BirthData) => void
  setBirthChart: (chart: BirthChart) => void
  addJournalEntry: (entry: JournalEntry) => void
  updateJournalEntry: (id: string, content: string) => void
  deleteJournalEntry: (id: string) => void
  setCurrentView: (view: 'dashboard' | 'journal' | 'chart') => void
  setLastPromptDate: (date: string) => void
  resetData: () => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      birthData: null,
      birthChart: null,
      journalEntries: [],
      currentView: 'dashboard',
      lastPromptDate: null,
      setBirthData: (data) => set({ birthData: data }),
      setBirthChart: (chart) => set({ birthChart: chart }),
      addJournalEntry: (entry) =>
        set((state) => ({
          journalEntries: [entry, ...state.journalEntries],
        })),
      updateJournalEntry: (id, content) =>
        set((state) => ({
          journalEntries: state.journalEntries.map((entry) =>
            entry.id === id ? { ...entry, content } : entry
          ),
        })),
      deleteJournalEntry: (id) =>
        set((state) => ({
          journalEntries: state.journalEntries.filter((entry) => entry.id !== id),
        })),
      setCurrentView: (view) => set({ currentView: view }),
      setLastPromptDate: (date) => set({ lastPromptDate: date }),
      resetData: () =>
        set({
          birthData: null,
          birthChart: null,
          journalEntries: [],
          currentView: 'dashboard',
          lastPromptDate: null,
        }),
    }),
    {
      name: 'cosmic-journal-storage',
    }
  )
)
