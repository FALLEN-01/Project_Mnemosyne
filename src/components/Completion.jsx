import { useState, useEffect } from 'react'
import { useGameState } from '../App'

const Completion = () => {
  const { gameState } = useGameState()
  const [timeCompleted, setTimeCompleted] = useState('')

  useEffect(() => {
    if (gameState.startTime && gameState.endTime) {
      const timeDiff = gameState.endTime - gameState.startTime
      const minutes = Math.floor(timeDiff / 60000)
      const seconds = Math.floor((timeDiff % 60000) / 1000)
      setTimeCompleted(`${minutes}:${seconds.toString().padStart(2, '0')}`)
    }
  }, [gameState])

  const restartGame = () => {
    window.location.href = '/'
  }

  return (
    <div className="room-container">
      <div className="room-header">
        <h1 className="room-title">🏆 Escape Complete</h1>
        <p style={{ fontSize: '1.3rem', color: '#44ff44', marginBottom: '1rem' }}>
          Congratulations, Team <strong>{gameState.teamName}</strong>!
        </p>
        <p style={{ fontSize: '1.1rem', color: '#00ffff' }}>
          You escaped the loop.
        </p>
      </div>

      <div className="room-description" style={{ maxWidth: '800px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(68, 255, 68, 0.1), rgba(0, 255, 255, 0.1))', 
          padding: '3rem', 
          borderRadius: '15px',
          border: '2px solid rgba(68, 255, 68, 0.3)',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#44ff44', marginBottom: '2rem', fontSize: '2rem' }}>
            🧠 PROJECT MNEMOSYNE COMPLETE
          </h2>
          
          <div className="terminal" style={{ margin: '2rem auto', background: '#000' }}>
            <div className="terminal-text" style={{ color: '#44ff44' }}>
              ESCAPE STATUS... SUCCESS<br />
              TEAM... {gameState.teamName.toUpperCase()}<br />
              MEMORY LOOPS... TERMINATED<br />
              IDENTITY... RESTORED<br />
              TIME ELAPSED... {timeCompleted}<br />
              ROOMS COMPLETED... {gameState.roomsCompleted.length}/5<br />
            </div>
          </div>

          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            You have successfully navigated through the depths of memory, solved the puzzles of the mind, 
            and confronted the truth about Project Mnemosyne. The cycle is broken.
          </p>

          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#888' }}>
            But some questions may never have answers…
          </p>
        </div>

        <div style={{ 
          background: 'rgba(0, 255, 255, 0.1)', 
          padding: '2rem', 
          borderRadius: '10px',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#00ffff', marginBottom: '1.5rem' }}>
            🎉 Mission Accomplished
          </h3>
          
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            Your team has successfully completed the Project Mnemosyne escape room experience. 
            Certificates and recognition will be provided separately.
          </p>
          
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.3)', 
            padding: '1.5rem', 
            borderRadius: '5px',
            marginBottom: '2rem'
          }}>
            <h4 style={{ color: '#44ff44', marginBottom: '1rem' }}>Final Statistics:</h4>
            <p><strong>Team:</strong> {gameState.teamName}</p>
            <p><strong>Completion Time:</strong> {timeCompleted}</p>
            <p><strong>Rooms Cleared:</strong> {gameState.roomsCompleted.length}/5</p>
            <p><strong>Status:</strong> <span style={{ color: '#44ff44' }}>ESCAPED</span></p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <h3 style={{ color: '#00ffff', marginBottom: '1.5rem' }}>
            The Story Continues...
          </h3>
          <p style={{ marginBottom: '2rem', color: '#b8b8b8' }}>
            Project Mnemosyne was just the beginning. The questions raised about memory, identity, 
            and the ethics of consciousness manipulation echo beyond this facility.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn" 
              onClick={restartGame}
              style={{ background: 'linear-gradient(45deg, #00ffff, #0080ff)' }}
            >
              🔄 Try Again with New Team
            </button>
            
            <button 
              className="btn" 
              onClick={() => alert('Share functionality coming soon!')}
              style={{ background: 'linear-gradient(45deg, #ff00ff, #8000ff)' }}
            >
              📤 Share Your Experience
            </button>
          </div>
        </div>
      </div>

      <div className="memory-fragment" style={{ marginTop: '3rem', maxWidth: '600px' }}>
        <h4 style={{ color: '#00ffff', marginBottom: '1rem' }}>Final Memory Fragment</h4>
        <p style={{ fontStyle: 'italic', fontSize: '1rem' }}>
          "The facility stands empty now. The monitors dark. But somewhere in the data streams, 
          in the quantum fluctuations of erased memories, the question remains: 
          Was forgetting the only way to remember who we truly are?"
        </p>
        <p style={{ 
          marginTop: '1.5rem', 
          textAlign: 'center', 
          color: '#44ff44',
          fontSize: '1.1rem'
        }}>
          Thank you for playing, <strong>{gameState.teamName}</strong>!
        </p>
      </div>

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '500px' }}>
        <div className="terminal-prompt">FINAL SYSTEM STATUS:</div>
        <div className="terminal-text">
          PROJECT MNEMOSYNE... TERMINATED<br />
          TEAM STATUS... ESCAPED<br />
          MEMORY LOOPS... 0 ACTIVE<br />
          FACILITY LOCKDOWN... DISABLED<br />
          <span style={{ color: '#44ff44' }}>FREEDOM PROTOCOL... COMPLETE</span><br />
          AWAITING NEW SUBJECTS...<br />
        </div>
      </div>
    </div>
  )
}

export default Completion
