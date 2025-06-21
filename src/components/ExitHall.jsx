import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const ExitHall = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState } = useGameState()
  const [showContent, setShowContent] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(1)
  const [timeElapsed, setTimeElapsed] = useState('')

  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }

    // Calculate time elapsed
    if (gameState.startTime) {
      const start = new Date(gameState.startTime)
      const end = new Date()
      const elapsed = end - start
      const minutes = Math.floor(elapsed / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)
      setTimeElapsed(`${minutes}m ${seconds}s`)
      
      // Update end time in game state
      updateGameState({ endTime: end })
    }

    // Fade in effect
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    // Progress through phases
    const phaseTimer = setTimeout(() => {
      setCurrentPhase(2)
    }, 3000)

    const finalPhaseTimer = setTimeout(() => {
      setCurrentPhase(3)
    }, 6000)

    return () => {
      clearTimeout(timer)
      clearTimeout(phaseTimer)
      clearTimeout(finalPhaseTimer)
    }
  }, [gameState.teamName, gameState.startTime, navigate, updateGameState])

  const restartExperience = () => {
    updateGameState({
      teamName: '',
      room1Code: '',
      room2Phrase: '',
      room3Word: '',
      room4Answer: '',
      startTime: null,
      endTime: null,
      roomsCompleted: []
    })
    navigate('/')
  }

  if (currentPhase === 1) {
    return (
      <div className={`room-container ${showContent ? 'fade-in' : ''}`}>
        <div className="memory-fragment">
          <h2 style={{ color: '#00ffff', marginBottom: '1rem' }}>
            🔓 FACILITY LOCKDOWN DISENGAGED
          </h2>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
            The security doors unlock with a thunderous clang. Emergency lights switch from red to green.
            You've done it — you've escaped the facility.
          </p>
          <div className="loading" style={{ margin: '2rem auto' }}></div>
          <p>Processing escape sequence...</p>
        </div>
      </div>
    )
  }

  if (currentPhase === 2) {
    return (
      <div className="room-container fade-in">        <div className="room-header">
          <h1 className="room-title">🌅 The Exit Hall</h1>
        </div>

        <div className="room-description">
          <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
            You step through the final corridor. Natural light streams through windows for the first time 
            in what feels like an eternity. The facility's oppressive atmosphere gives way to fresh air 
            and the promise of freedom.
          </p>

          <div className="memory-fragment">
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>
              💭 Final Memory Fragment
            </h3>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>
              You remember now — you weren't just a subject. You were part of something bigger. 
              The memories they tried to erase weren't just yours... they were the key to everything. 
              And now, with your freedom, comes the responsibility to share the truth.
            </p>
          </div>
        </div>

        <div className="loading" style={{ margin: '2rem auto' }}></div>
        <p>Memories consolidating...</p>
      </div>
    )
  }

  return (
    <div className="room-container fade-in">      <div className="room-header">
        <h1 className="room-title glitch">🎉 ESCAPE SUCCESSFUL</h1>
      </div>

      <div className="room-description">
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(68, 255, 68, 0.2), rgba(0, 255, 255, 0.2))', 
          padding: '3rem', 
          borderRadius: '15px',
          border: '2px solid rgba(68, 255, 68, 0.5)',
          margin: '2rem auto',
          maxWidth: '800px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#44ff44', marginBottom: '2rem', fontSize: '2rem' }}>
            🧠 PROJECT MNEMOSYNE COMPLETE 🧠
          </h2>
          
          <p style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
            Congratulations! You have successfully escaped the Mnemosyne research facility 
            and recovered your lost memories.
          </p>

          <p style={{ fontSize: '1.1rem', color: '#00ffff', marginBottom: '2rem' }}>
            Your mind is free. Your memories are restored. The truth is yours to keep.
          </p>

          {timeElapsed && (
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              margin: '2rem 0',
              border: '1px solid rgba(0, 255, 255, 0.3)'
            }}>
              <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>📊 Escape Statistics</h3>
              <p><strong>Total Escape Time:</strong> {timeElapsed}</p>
              <p><strong>Rooms Completed:</strong> {gameState.roomsCompleted.length}/4</p>
              <p><strong>Memory Fragments Recovered:</strong> 4/4</p>
            </div>
          )}
        </div>

        <div style={{ 
          background: 'rgba(255, 215, 0, 0.1)', 
          padding: '2rem', 
          borderRadius: '10px',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          margin: '2rem auto',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>🏆 Mission Accomplished</h3>
          <p style={{ fontStyle: 'italic' }}>
            "Not all who wander in the mind are lost. Some are just finding their way back to themselves."
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button 
          className="btn" 
          onClick={restartExperience}
          style={{ 
            fontSize: '1.2rem', 
            padding: '1.5rem 3rem',
            background: 'linear-gradient(45deg, #00ffff, #0080ff)',
            marginRight: '1rem'
          }}
        >
          🔄 Start New Escape
        </button>
        
        <button 
          className="btn" 
          onClick={() => window.location.reload()}
          style={{ 
            fontSize: '1.2rem', 
            padding: '1.5rem 3rem',
            background: 'linear-gradient(45deg, #ff4444, #ff6666)'
          }}
        >
          🏠 Return to Main Menu
        </button>
      </div>

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '500px' }}>
        <div className="terminal-prompt">FINAL SYSTEM STATUS:</div>
        <div className="terminal-text">
          SUBJECT STATUS... <span style={{ color: '#44ff44' }}>LIBERATED</span><br />
          MEMORY BANKS... <span style={{ color: '#44ff44' }}>RESTORED</span><br />
          FACILITY LOCKDOWN... <span style={{ color: '#44ff44' }}>DISENGAGED</span><br />
          ESCAPE PROTOCOL... <span style={{ color: '#44ff44' }}>COMPLETE</span><br />
          PROJECT MNEMOSYNE... <span style={{ color: '#44ff44' }}>TERMINATED</span><br />
        </div>
      </div>
    </div>
  )
}

export default ExitHall
