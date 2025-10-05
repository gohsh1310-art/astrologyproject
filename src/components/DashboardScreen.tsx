import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { generateDailyPrompts } from '../utils/prompts'
import { getMoonPhase, getCurrentTransits, getRetrogradePlanets } from '../utils/astrology'
import { format } from 'date-fns'
import './DashboardScreen.css'

const DashboardScreen: React.FC = () => {
  const { birthChart, addJournalEntry, setCurrentView } = useStore()
  const [prompts, setPrompts] = useState(generateDailyPrompts(birthChart))
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null)
  const [journalContent, setJournalContent] = useState('')
  const [moonPhase, setMoonPhase] = useState(getMoonPhase())
  const [transits, setTransits] = useState(getCurrentTransits())
  const [retrogrades, setRetrogrades] = useState(getRetrogradePlanets())

  useEffect(() => {
    setPrompts(generateDailyPrompts(birthChart))
    setMoonPhase(getMoonPhase())
    setTransits(getCurrentTransits())
    setRetrogrades(getRetrogradePlanets())
  }, [birthChart])

  const handleSaveJournal = () => {
    if (!journalContent.trim() || !selectedPrompt) return

    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      prompt: selectedPrompt.title,
      content: journalContent,
      tags: [selectedPrompt.type]
    }

    addJournalEntry(entry)
    setJournalContent('')
    setSelectedPrompt(null)
    
    alert('Journal entry saved! ✨')
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reflection': return '#00F0FF'
      case 'affirmation': return '#FF005C'
      case 'ritual': return '#FFD700'
      case 'action': return '#00FF00'
      default: return '#FFFFFF'
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">TODAY'S COSMIC GUIDANCE</h1>
        <p className="dashboard-date">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
      </div>

      <div className="cosmic-status">
        <div className="status-card">
          <div className="status-icon">🌙</div>
          <div className="status-content">
            <h3 className="status-title">MOON PHASE</h3>
            <p className="status-value">{moonPhase}</p>
          </div>
        </div>

        <div className="status-card">
          <div className="status-icon">☀️</div>
          <div className="status-content">
            <h3 className="status-title">SUN TRANSIT</h3>
            <p className="status-value">{transits.sun.sign}</p>
          </div>
        </div>

        <div className="status-card">
          <div className="status-icon">🌊</div>
          <div className="status-content">
            <h3 className="status-title">MOON TRANSIT</h3>
            <p className="status-value">{transits.moon.sign}</p>
          </div>
        </div>

        {retrogrades.length > 0 && (
          <div className="status-card retrograde">
            <div className="status-icon">⚠️</div>
            <div className="status-content">
              <h3 className="status-title">RETROGRADES</h3>
              <p className="status-value">{retrogrades.join(', ')}</p>
            </div>
          </div>
        )}
      </div>

      <div className="prompts-section">
        <h2 className="section-title">YOUR PERSONALIZED PROMPTS</h2>
        <div className="prompts-grid">
          {prompts.map((prompt, index) => (
            <div
              key={index}
              className="prompt-card"
              style={{ borderColor: getTypeColor(prompt.type) }}
              onClick={() => setSelectedPrompt(prompt)}
            >
              <div className="prompt-header">
                <span className="prompt-icon">{prompt.icon}</span>
                <span className="prompt-type" style={{ background: getTypeColor(prompt.type) }}>
                  {prompt.type.toUpperCase()}
                </span>
              </div>
              <h3 className="prompt-title">{prompt.title}</h3>
              <p className="prompt-content">{prompt.content}</p>
              <button className="prompt-btn">JOURNAL THIS →</button>
            </div>
          ))}
        </div>
      </div>

      {selectedPrompt && (
        <div className="journal-modal" onClick={() => setSelectedPrompt(null)}>
          <div className="journal-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPrompt(null)}>✕</button>
            
            <div className="modal-header">
              <span className="modal-icon">{selectedPrompt.icon}</span>
              <h2 className="modal-title">{selectedPrompt.title}</h2>
            </div>

            <p className="modal-prompt">{selectedPrompt.content}</p>

            <textarea
              className="journal-textarea"
              placeholder="Write your thoughts here..."
              value={journalContent}
              onChange={(e) => setJournalContent(e.target.value)}
              rows={10}
            />

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setSelectedPrompt(null)}>
                CANCEL
              </button>
              <button className="btn-primary" onClick={handleSaveJournal}>
                SAVE ENTRY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardScreen
