import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { calculateBirthChart } from '../utils/astrology'
import './OnboardingScreen.css'

interface Props {
  onComplete: () => void
}

const OnboardingScreen: React.FC<Props> = ({ onComplete }) => {
  const { setBirthData, setBirthChart } = useStore()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    latitude: 0,
    longitude: 0,
    timezone: 'UTC'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      setStep(2)
      return
    }

    const birthDate = new Date(`${formData.date}T${formData.time}`)
    const chart = calculateBirthChart(birthDate, formData.latitude, formData.longitude)
    
    setBirthData(formData)
    setBirthChart(chart)
    onComplete()
  }

  const handleLocationSelect = (location: string, lat: number, lon: number) => {
    setFormData({
      ...formData,
      location,
      latitude: lat,
      longitude: lon
    })
  }

  return (
    <div className="onboarding">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <h1 className="onboarding-title">COSMIC JOURNAL</h1>
          <p className="onboarding-subtitle">HYPER-PERSONALIZED ASTROLOGY</p>
        </div>

        <div className="onboarding-card">
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
          </div>

          <form onSubmit={handleSubmit} className="onboarding-form">
            {step === 1 && (
              <div className="form-step">
                <h2 className="step-title">BIRTH DETAILS</h2>
                <p className="step-description">
                  Enter your birth information to calculate your natal chart
                </p>

                <div className="form-group">
                  <label className="form-label">BIRTH DATE</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">BIRTH TIME</label>
                  <input
                    type="time"
                    className="form-input"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                  <p className="form-hint">Exact time is important for accurate rising sign</p>
                </div>

                <button type="submit" className="btn-primary">
                  NEXT →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <h2 className="step-title">BIRTH LOCATION</h2>
                <p className="step-description">
                  Select your birth location for accurate chart calculation
                </p>

                <div className="form-group">
                  <label className="form-label">LOCATION</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Singapore"
                    required
                  />
                </div>

                <div className="location-presets">
                  <p className="form-label">QUICK SELECT:</p>
                  <div className="preset-grid">
                    <button
                      type="button"
                      className="preset-btn"
                      onClick={() => handleLocationSelect('Singapore', 1.3521, 103.8198)}
                    >
                      SINGAPORE
                    </button>
                    <button
                      type="button"
                      className="preset-btn"
                      onClick={() => handleLocationSelect('New York, USA', 40.7128, -74.0060)}
                    >
                      NEW YORK
                    </button>
                    <button
                      type="button"
                      className="preset-btn"
                      onClick={() => handleLocationSelect('London, UK', 51.5074, -0.1278)}
                    >
                      LONDON
                    </button>
                    <button
                      type="button"
                      className="preset-btn"
                      onClick={() => handleLocationSelect('Tokyo, Japan', 35.6762, 139.6503)}
                    >
                      TOKYO
                    </button>
                    <button
                      type="button"
                      className="preset-btn"
                      onClick={() => handleLocationSelect('Sydney, Australia', -33.8688, 151.2093)}
                    >
                      SYDNEY
                    </button>
                    <button
                      type="button"
                      className="preset-btn"
                      onClick={() => handleLocationSelect('Paris, France', 48.8566, 2.3522)}
                    >
                      PARIS
                    </button>
                    <button
                      type="button"
                      className="preset-btn"
                      onClick={() => handleLocationSelect('Los Angeles, USA', 34.0522, -118.2437)}
                    >
                      LOS ANGELES
                    </button>
                    <button
                      type="button"
                      className="preset-btn"
                      onClick={() => handleLocationSelect('Mumbai, India', 19.0760, 72.8777)}
                    >
                      MUMBAI
                    </button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">LATITUDE</label>
                    <input
                      type="number"
                      step="0.0001"
                      className="form-input"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LONGITUDE</label>
                    <input
                      type="number"
                      step="0.0001"
                      className="form-input"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setStep(1)}
                  >
                    ← BACK
                  </button>
                  <button type="submit" className="btn-primary">
                    CALCULATE CHART
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="onboarding-footer">
          <p>🔒 Your data is stored locally and never leaves your device</p>
        </div>
      </div>
    </div>
  )
}

export default OnboardingScreen
