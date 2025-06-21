import { useState, useEffect } from 'react'
import { useGameState } from '../App'

const Certificate = () => {
  const { gameState } = useGameState()
  const [playerName, setPlayerName] = useState('')
  const [timeCompleted, setTimeCompleted] = useState('')
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  useEffect(() => {
    if (gameState.startTime && gameState.endTime) {
      const timeDiff = gameState.endTime - gameState.startTime
      const minutes = Math.floor(timeDiff / 60000)
      const seconds = Math.floor((timeDiff % 60000) / 1000)
      setTimeCompleted(`${minutes}:${seconds.toString().padStart(2, '0')}`)
    }
  }, [gameState])

  const handleDownloadCertificate = () => {
    // In a real implementation, this would generate a PDF
    alert(`Certificate for ${playerName} would be downloaded here!\n\nCompletion Time: ${timeCompleted}\nRooms Completed: ${gameState.roomsCompleted.length}/5`)
  }

  const handleSubmitToLeaderboard = () => {
    // In a real implementation, this would submit to a database
    alert(`${playerName} added to leaderboard with time ${timeCompleted}!`)
    setShowLeaderboard(true)
  }

  const restartGame = () => {
    window.location.href = '/'
  }

  return (
    <div className="room-container">
      <div className="room-header">
        <h1 className="room-title">🏆 Escape Complete</h1>
        <p style={{ fontSize: '1.3rem', color: '#44ff44', marginBottom: '2rem' }}>
          Congratulations. You escaped the loop.
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

        {!showLeaderboard && (
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.5)', 
            padding: '2rem', 
            borderRadius: '10px',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1.5rem', textAlign: 'center' }}>
              Claim Your Escape Certificate
            </h3>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <input
                type="text"
                className="input-field"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                style={{ width: '300px', fontSize: '1.1rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                className="btn" 
                onClick={handleDownloadCertificate}
                disabled={!playerName.trim()}
                style={{ background: 'linear-gradient(45deg, #44ff44, #00ff88)' }}
              >
                📄 Download Certificate
              </button>
              
              <button 
                className="btn" 
                onClick={handleSubmitToLeaderboard}
                disabled={!playerName.trim()}
                style={{ background: 'linear-gradient(45deg, #ffaa44, #ff6644)' }}
              >
                🏆 Add to Leaderboard
              </button>
            </div>
          </div>
        )}

        {showLeaderboard && (
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.5)', 
            padding: '2rem', 
            borderRadius: '10px',
            border: '1px solid rgba(255, 170, 68, 0.3)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#ffaa44', marginBottom: '1.5rem', textAlign: 'center' }}>
              🏆 Leaderboard
            </h3>
            <div className="terminal" style={{ background: '#111' }}>
              <div className="terminal-text" style={{ color: '#ffaa44' }}>
                RECENT ESCAPES:<br />
                <br />
                1. {playerName}............{timeCompleted}<br />
                2. Dr. Chen..............12:45<br />
                3. Subject_X.............15:23<br />
                4. Anonymous.............18:07<br />
                5. TestSubject12.........21:44<br />
              </div>
            </div>
          </div>
        )}

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
              🔄 Play Again
            </button>
            
            <button 
              className="btn" 
              onClick={() => alert('Share functionality would be implemented here!')}
              style={{ background: 'linear-gradient(45deg, #ff00ff, #8000ff)' }}
            >
              📤 Share Your Escape
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
      </div>

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '500px' }}>
        <div className="terminal-prompt">FINAL SYSTEM STATUS:</div>
        <div className="terminal-text">
          PROJECT MNEMOSYNE... TERMINATED<br />
          SUBJECT STATUS... ESCAPED<br />
          MEMORY LOOPS... 0 ACTIVE<br />
          FACILITY LOCKDOWN... DISABLED<br />
          <span style={{ color: '#44ff44' }}>FREEDOM PROTOCOL... COMPLETE</span><br />
        </div>
      </div>
    </div>
  )
}

export default Certificate
