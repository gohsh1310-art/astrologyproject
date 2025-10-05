import React, { useState, useEffect } from 'react'
import { useStore } from './store/useStore'
import OnboardingScreen from './components/OnboardingScreen'
import DashboardScreen from './components/DashboardScreen'
import JournalScreen from './components/JournalScreen'
import ChartScreen from './components/ChartScreen'
import './App.css'

function App() {
  const { birthData, currentView, setCurrentView } = useStore()
  const [showOnboarding, setShowOnboarding] = useState(!birthData)

  useEffect(() => {
    if (birthData) {
      setShowOnboarding(false)
    }
  }, [birthData])

  if (showOnboarding) {
    return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">COSMIC JOURNAL</h1>
          <nav className="app-nav">
            <button
              className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              TODAY
            </button>
            <button
              className={`nav-btn ${currentView === 'journal' ? 'active' : ''}`}
              onClick={() => setCurrentView('journal')}
            >
              JOURNAL
            </button>
            <button
              className={`nav-btn ${currentView === 'chart' ? 'active' : ''}`}
              onClick={() => setCurrentView('chart')}
            >
              CHART
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {currentView === 'dashboard' && <DashboardScreen />}
        {currentView === 'journal' && <JournalScreen />}
        {currentView === 'chart' && <ChartScreen />}
      </main>
    </div>
  )
}

export default App
