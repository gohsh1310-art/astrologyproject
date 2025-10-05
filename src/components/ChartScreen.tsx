import React from 'react'
import { useStore } from '../store/useStore'
import './ChartScreen.css'

const ChartScreen: React.FC = () => {
  const { birthChart, birthData, resetData } = useStore()

  if (!birthChart || !birthData) {
    return (
      <div className="chart-screen">
        <div className="empty-state">
          <div className="empty-icon">🌟</div>
          <h2 className="empty-title">NO CHART DATA</h2>
          <p className="empty-text">Please complete onboarding to see your birth chart</p>
        </div>
      </div>
    )
  }

  const planets = [
    { name: 'Sun', data: birthChart.sun, icon: '☀️', color: '#FFD700' },
    { name: 'Moon', data: birthChart.moon, icon: '🌙', color: '#C0C0C0' },
    { name: 'Rising', data: birthChart.rising, icon: '⬆️', color: '#FF005C' },
    { name: 'Mercury', data: birthChart.mercury, icon: '☿', color: '#00F0FF' },
    { name: 'Venus', data: birthChart.venus, icon: '♀', color: '#FF69B4' },
    { name: 'Mars', data: birthChart.mars, icon: '♂', color: '#FF0000' },
    { name: 'Jupiter', data: birthChart.jupiter, icon: '♃', color: '#FFA500' },
    { name: 'Saturn', data: birthChart.saturn, icon: '♄', color: '#8B4513' },
    { name: 'Uranus', data: birthChart.uranus, icon: '♅', color: '#00CED1' },
    { name: 'Neptune', data: birthChart.neptune, icon: '♆', color: '#4169E1' },
    { name: 'Pluto', data: birthChart.pluto, icon: '♇', color: '#8B008B' }
  ]

  const handleReset = () => {
    if (confirm('Reset all data? This will delete your chart and journal entries.')) {
      resetData()
      window.location.reload()
    }
  }

  return (
    <div className="chart-screen">
      <div className="chart-header">
        <h1 className="chart-title">YOUR BIRTH CHART</h1>
        <div className="chart-info">
          <p><strong>Birth Date:</strong> {birthData.date}</p>
          <p><strong>Birth Time:</strong> {birthData.time}</p>
          <p><strong>Location:</strong> {birthData.location}</p>
        </div>
      </div>

      <div className="planets-grid">
        {planets.map((planet) => (
          <div key={planet.name} className="planet-card" style={{ borderColor: planet.color }}>
            <div className="planet-header">
              <span className="planet-icon">{planet.icon}</span>
              <h3 className="planet-name">{planet.name.toUpperCase()}</h3>
            </div>
            <div className="planet-details">
              <div className="planet-sign" style={{ background: planet.color }}>
                {planet.data.sign}
              </div>
              <div className="planet-degree">
                {planet.data.degree.toFixed(2)}°
              </div>
              {'house' in planet.data && (
                <div className="planet-house">
                  House {planet.data.house}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="chart-actions">
        <button className="btn-reset" onClick={handleReset}>
          RESET ALL DATA
        </button>
      </div>
    </div>
  )
}

export default ChartScreen
