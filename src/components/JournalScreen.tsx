import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { format } from 'date-fns'
import './JournalScreen.css'

const JournalScreen: React.FC = () => {
  const { journalEntries, deleteJournalEntry } = useStore()
  const [selectedEntry, setSelectedEntry] = useState<any>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredEntries = filter === 'all'
    ? journalEntries
    : journalEntries.filter(entry => entry.tags?.includes(filter))

  const handleDelete = (id: string) => {
    if (confirm('Delete this journal entry?')) {
      deleteJournalEntry(id)
      setSelectedEntry(null)
    }
  }

  return (
    <div className="journal-screen">
      <div className="journal-header">
        <h1 className="journal-title">YOUR COSMIC JOURNAL</h1>
        <p className="journal-subtitle">{journalEntries.length} ENTRIES</p>
      </div>

      <div className="journal-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          ALL
        </button>
        <button
          className={`filter-btn ${filter === 'reflection' ? 'active' : ''}`}
          onClick={() => setFilter('reflection')}
        >
          REFLECTIONS
        </button>
        <button
          className={`filter-btn ${filter === 'affirmation' ? 'active' : ''}`}
          onClick={() => setFilter('affirmation')}
        >
          AFFIRMATIONS
        </button>
        <button
          className={`filter-btn ${filter === 'ritual' ? 'active' : ''}`}
          onClick={() => setFilter('ritual')}
        >
          RITUALS
        </button>
        <button
          className={`filter-btn ${filter === 'action' ? 'active' : ''}`}
          onClick={() => setFilter('action')}
        >
          ACTIONS
        </button>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h2 className="empty-title">NO ENTRIES YET</h2>
          <p className="empty-text">Start journaling from your daily prompts!</p>
        </div>
      ) : (
        <div className="entries-grid">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="entry-card"
              onClick={() => setSelectedEntry(entry)}
            >
              <div className="entry-header">
                <span className="entry-date">
                  {format(new Date(entry.date), 'MMM d, yyyy')}
                </span>
                {entry.tags && entry.tags.length > 0 && (
                  <span className="entry-tag">{entry.tags[0].toUpperCase()}</span>
                )}
              </div>
              <h3 className="entry-prompt">{entry.prompt}</h3>
              <p className="entry-preview">
                {entry.content.substring(0, 150)}
                {entry.content.length > 150 ? '...' : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedEntry && (
        <div className="entry-modal" onClick={() => setSelectedEntry(null)}>
          <div className="entry-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedEntry(null)}>✕</button>
            
            <div className="modal-header">
              <div>
                <p className="modal-date">
                  {format(new Date(selectedEntry.date), 'EEEE, MMMM d, yyyy')}
                </p>
                <h2 className="modal-prompt">{selectedEntry.prompt}</h2>
              </div>
              {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                <span className="modal-tag">{selectedEntry.tags[0].toUpperCase()}</span>
              )}
            </div>

            <div className="modal-content">
              <p>{selectedEntry.content}</p>
            </div>

            <div className="modal-actions">
              <button
                className="btn-delete"
                onClick={() => handleDelete(selectedEntry.id)}
              >
                DELETE
              </button>
              <button className="btn-secondary" onClick={() => setSelectedEntry(null)}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JournalScreen
