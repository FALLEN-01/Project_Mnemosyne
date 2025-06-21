import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const TeamName = () => {
  const navigate = useNavigate()
  const { updateGameState } = useGameState()
  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    const cleanTeamName = teamName.trim()
    
    if (!cleanTeamName) {
      setError('Please enter your team name')
      return
    }
    
    if (cleanTeamName.length < 2) {
      setError('Team name must be at least 2 characters long')
      return
    }    updateGameState({ teamName: cleanTeamName })
    navigate('/room1')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="room-container">
      <div className="room-header">
        <h1 className="room-title glitch">🧠 Project Mnemosyne</h1>
        <p style={{ fontSize: '1.3rem', color: '#00ffff', marginBottom: '2rem' }}>
          An Online Escape Room Experience
        </p>
      </div>      <div className="room-description" style={{ maxWidth: '700px' }}>
        <h2 style={{ color: '#00ffff', marginBottom: '2rem', fontSize: '1.8rem', textAlign: 'center' }}>
          Welcome to the Facility
        </h2>
        
        <p style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Before you enter the Mnemosyne research facility, we need to register your team 
          in the system for tracking and security purposes.
        </p>

        <div className="terminal" style={{ margin: '2rem auto', maxWidth: '600px' }}>
          <div className="terminal-text">
            FACILITY ACCESS CONTROL<br />
            SECURITY CLEARANCE... PENDING<br />
            TEAM REGISTRATION... REQUIRED<br />
            <span style={{ color: '#ff4444' }}>
              PLEASE IDENTIFY YOUR TEAM
            </span>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(0, 255, 255, 0.1)', 
          padding: '3rem', 
          borderRadius: '15px',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#00ffff', marginBottom: '2rem', fontSize: '1.4rem' }}>Enter Team Name</h3>
          
          <input
            type="text"
            className="input-field"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Your Team Name"
            style={{ 
              width: '100%', 
              maxWidth: '400px',
              fontSize: '1.3rem',
              textAlign: 'center',
              marginBottom: '1rem'
            }}
            maxLength={50}
            autoFocus
          />
          
          <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2rem' }}>
            Choose a memorable name for your team (2-50 characters)
          </p>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="btn" 
            onClick={handleSubmit}
            disabled={!teamName.trim()}
            style={{ 
              fontSize: '1.2rem', 
              padding: '1.2rem 2.5rem',
              marginTop: '1rem'
            }}
          >
            🚪 Register & Enter Facility
          </button>
        </div>
      </div>

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '400px' }}>
        <div className="terminal-prompt">SYSTEM STATUS:</div>
        <div className="terminal-text">
          FACILITY... ONLINE<br />
          SECURITY... ACTIVE<br />
          TEAM SLOTS... AVAILABLE<br />
          REGISTRATION... {teamName.trim() ? 'READY' : 'WAITING'}<br />
        </div>
      </div>
    </div>
  )
}

export default TeamName
