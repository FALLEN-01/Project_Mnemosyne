import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'
import CyberpunkTerminal from './CyberpunkTerminal'

const TeamEntry = () => {
  const navigate = useNavigate()
  const { updateGameState } = useGameState()
  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')
  const [showTerminal, setShowTerminal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!teamName.trim()) {
      setError('Please enter a your name')
      return
    }

    if (teamName.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }

    // Show terminal popup before navigation
    setShowTerminal(true)
  }

  const handleTerminalComplete = () => {
    // Update game state with team name and navigate to intro
    updateGameState({ 
      teamName: teamName.trim(),
      startTime: new Date()
    })
    
    setShowTerminal(false)
    navigate('/intro')
  }

  return (
    <div className="room-container" style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        width: '100%',
        maxWidth: '90%'
      }}>
        {/* Welcome Header */}
        <div style={{
          marginBottom: '3rem',
          animation: 'fadeIn 1s ease-in'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient 3s ease infinite',
            textShadow: 'none'
          }}>
            WELCOME
          </h1>
          
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: '#cccccc',
            marginBottom: '1.5rem',
            fontWeight: '300'
          }}>
            Online Escape Room Event
          </h2>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              color: '#ffdd44',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              🧠 PROJECT MNEMOSYNE
            </h3>
            <p style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              lineHeight: '1.6',
              color: '#cccccc',
              marginBottom: '1rem'
            }}>
              You wake up in a mysterious facility with fragments of memory. 
              Navigate through four challenging rooms, solve puzzles, and uncover the truth about your identity.
            </p>
            <p style={{
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
              color: '#aaaaaa',
              fontStyle: 'italic'
            }}>
              Work together as a team to escape... but will you remember who you really are?
            </p>
          </div>
        </div>

        {/* Team Name Entry Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          padding: '2.5rem',
          animation: 'fadeIn 1.5s ease-in'
        }}>
          <h3 style={{
            color: '#ffffff',
            fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
            marginBottom: '1.5rem',
            fontWeight: 'bold'
          }}>
            Enter Your Name
          </h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <input
              type="text"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value)
                setError('')
              }}
              placeholder="Name..."
              style={{
                width: '100%',
                padding: '1.2rem 1.5rem',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#ffffff',
                textAlign: 'center',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4ecdc4'
                e.target.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.3)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.target.style.boxShadow = 'none'
              }}
              maxLength={30}
              autoFocus
            />
          </div>

          {error && (
            <div style={{
              color: '#ff6b6b',
              background: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              fontSize: '1rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn"
            style={{
              background: teamName.trim().length >= 2 
                ? 'linear-gradient(45deg, #4ecdc4, #45b7d1)' 
                : 'rgba(255, 255, 255, 0.1)',
              color: teamName.trim().length >= 2 ? '#000' : '#666',
              fontSize: '1.3rem',
              padding: '1.2rem 3rem',
              border: '2px solid transparent',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: teamName.trim().length >= 2 ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: teamName.trim().length >= 2 
                ? '0 4px 20px rgba(78, 205, 196, 0.3)' 
                : 'none',
              transform: 'translateY(0)',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              if (teamName.trim().length >= 2) {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 25px rgba(78, 205, 196, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              if (teamName.trim().length >= 2) {
                e.target.style.boxShadow = '0 4px 20px rgba(78, 205, 196, 0.3)'
              }
            }}
            disabled={teamName.trim().length < 2}
          >
            🚀 BEGIN ESCAPE
          </button>

          <p style={{
            fontSize: '0.9rem',
            color: '#888888',
            marginTop: '1.5rem',
            fontStyle: 'italic'
          }}>
            Your team name will be used throughout the experience
          </p>
        </form>

        {/* Footer Info */}
        <div style={{
          marginTop: '3rem',
          fontSize: '0.9rem',
          color: '#666666',
          animation: 'fadeIn 2s ease-in'
        }}>
          <p>🎮 Estimated completion time: 30-45 minutes</p>
          <p>👥 Work together and communicate with your team</p>
          <p>🧩 Pay attention to details - every clue matters</p>
        </div>
      </div>

      {/* Cyberpunk Terminal Popup */}
      <CyberpunkTerminal
        isOpen={showTerminal}
        onComplete={handleTerminalComplete}
        title="NEURAL INTERFACE ACTIVATION"
        commands={[
          `Team registered: ${teamName.trim()}`,
          "Neural link established...",
          "Accessing memory core..."
        ]}
      />

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default TeamEntry
