import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Introduction = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState } = useGameState()
  const [showContent, setShowContent] = useState(false)
  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }
    
    // Initialize start time when component loads
    updateGameState({ startTime: new Date() })
    
    // Fade in effect
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [updateGameState, gameState.teamName, navigate])

  const enterFacility = () => {
    navigate('/room1')
  }
  return (
    <div className={`room-container ${showContent ? 'fade-in' : ''}`}>
      <div className="room-header">
        <h1 className="room-title glitch">🧠 Project Mnemosyne</h1>
        <p style={{ fontSize: '1.3rem', color: '#00ffff', marginBottom: '1rem' }}>
          An Online Escape Room Experience
        </p>
        {gameState.teamName && (
          <p style={{ fontSize: '1.1rem', color: '#44ff44', marginBottom: '2rem' }}>
            Team: <strong>{gameState.teamName}</strong>
          </p>
        )}
      </div>

      <div className="room-description">
        <h2 style={{ color: '#00ffff', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          🧬 Welcome, Subject.
        </h2>
        
        <p style={{ marginBottom: '1.5rem' }}>
          You awaken in a cold, dimly lit laboratory. Your wrists bear faint marks — like you were restrained. 
          Monitors blink with static. The air smells of disinfectant and burnt circuitry. You try to remember… 
          but your mind is blank.
        </p>

        <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#00ffff' }}>
          Suddenly, a voice echoes — familiar, yet distant.<br />
          "You chose this. You wanted to forget. But now… you must remember."
        </p>

        <p style={{ marginBottom: '1.5rem' }}>
          Your memories have been erased. You don't know who you are, why you're here, or what's happened. 
          But something feels wrong — deeply wrong. Screens flicker with fragments of data, and the facility 
          seems to respond to your presence. This place holds answers. Maybe even the truth.
        </p>

        <p style={{ marginBottom: '2rem', color: '#ff4444', fontWeight: 'bold' }}>
          But time is running out.
        </p>

        <div style={{ 
          background: 'rgba(0, 255, 255, 0.1)', 
          padding: '2rem', 
          borderRadius: '10px',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>Your Mission:</h3>
          <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
            <li>Explore each room in the Mnemosyne research facility</li>
            <li>Solve the puzzles</li>
            <li>Recover your memories</li>
            <li style={{ color: '#ff4444', fontWeight: 'bold' }}>
              And whatever you do… Don't trust everything you remember.
            </li>
          </ul>
        </div>
      </div>

      <button 
        className="btn" 
        onClick={enterFacility}
        style={{ 
          fontSize: '1.3rem', 
          padding: '1.5rem 3rem',
          marginTop: '2rem'
        }}
      >
        🚪 Enter Facility
      </button>

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '500px' }}>
        <div className="terminal-prompt">SYSTEM STATUS:</div>
        <div className="terminal-text">
          SUBJECT AWAKENING... COMPLETE<br />
          MEMORY BANKS... CORRUPTED<br />
          FACILITY LOCKDOWN... ACTIVE<br />
          ESCAPE PROTOCOL... INITIALIZING<br />
        </div>
      </div>
    </div>
  )
}

export default Introduction
