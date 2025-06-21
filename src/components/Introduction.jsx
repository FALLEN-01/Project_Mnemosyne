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
    }, 100) // Reduced from 500ms to 100ms

    return () => clearTimeout(timer)  }, [updateGameState, gameState.teamName, navigate])

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
      </div>      <div className="room-description">
        <h2 style={{ color: '#00ffff', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          🧬 Subject Awakening Protocol Complete
        </h2>
        
        <p style={{ marginBottom: '1.5rem' }}>
          You awaken in a cold, dimly lit laboratory deep within the Mnemosyne research facility. 
          Your wrists bear faint marks — like you were restrained. Monitors blink with static. 
          The air smells of disinfectant and burnt circuitry. You try to remember how you got here… 
          but your mind is blank.
        </p>

        <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#00ffff' }}>
          Suddenly, a voice echoes through the facility speakers — familiar, yet distant.<br />
          "You chose this. You wanted to forget. But now… you must remember to escape."
        </p>

        <p style={{ marginBottom: '1.5rem' }}>
          Your memories have been erased. You don't know who you are, why you're here, or how long you've been trapped. 
          But something feels wrong — deeply wrong. The facility's security systems are active, and you're locked inside. 
          Emergency lights flicker with fragments of data, and the facility seems to respond to your presence. 
        </p>

        <p style={{ marginBottom: '2rem', color: '#ff4444', fontWeight: 'bold' }}>
          The exit is locked. You must find a way out before it's too late.
        </p>        <div style={{ 
          background: 'rgba(255, 68, 68, 0.1)', 
          padding: '2rem', 
          borderRadius: '10px',
          border: '1px solid rgba(255, 68, 68, 0.3)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#ff4444', marginBottom: '1rem' }}>🚨 ESCAPE PROTOCOL ACTIVATED:</h3>
          <ul style={{ textAlign: 'left', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
            <li>Navigate through the facility's security rooms</li>
            <li>Solve the puzzles to unlock each door</li>
            <li>Recover your memories to understand what happened</li>
            <li>Find the exit before the facility's lockdown becomes permanent</li>
            <li style={{ color: '#ff4444', fontWeight: 'bold' }}>
              Warning: Don't trust everything you remember...
            </li>
          </ul>
        </div>
      </div>      <button 
        className="btn" 
        onClick={enterFacility}
        style={{ 
          fontSize: '1.3rem', 
          padding: '1.5rem 3rem',
          marginTop: '2rem',
          background: 'linear-gradient(45deg, #ff4444, #ff6666)',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        🚪 Begin Escape Sequence
      </button>

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '500px' }}>
        <div className="terminal-prompt">FACILITY STATUS:</div>
        <div className="terminal-text">
          SUBJECT AWAKENING... COMPLETE<br />
          MEMORY BANKS... CORRUPTED<br />
          FACILITY LOCKDOWN... <span style={{ color: '#ff4444' }}>ACTIVE</span><br />
          ESCAPE PROTOCOL... INITIALIZING<br />
          EXIT STATUS... <span style={{ color: '#ff4444' }}>SEALED</span><br />
        </div>
      </div>
    </div>
  )
}

export default Introduction
