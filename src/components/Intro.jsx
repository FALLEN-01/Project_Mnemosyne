import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Intro = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, getProgressRoute } = useGameState()
  const [showContent, setShowContent] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [showNameInput, setShowNameInput] = useState(false)
  const [code, setCode] = useState(['', '', '', '', ''])
  const [showKeypad, setShowKeypad] = useState(false)
  const [error, setError] = useState('')
  const [showRestoreOption, setShowRestoreOption] = useState(false)

  // Prologue puzzle: binary 11001010 = 202, + room number 17 = 20217
  const correctCode = '20217'

  useEffect(() => {
    // Check if player has existing progress
    if (gameState.teamName && gameState.roomsCompleted.length > 0) {
      setShowRestoreOption(true)
      setTeamName(gameState.teamName)
    } else {
      // Show normal intro sequence
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 1000)

      const nameTimer = setTimeout(() => {
        setShowNameInput(true)
      }, 2500)

      return () => {
        clearTimeout(timer)
        clearTimeout(nameTimer)
      }
    }
  }, [gameState])

  const handleRestoreProgress = () => {
    const route = getProgressRoute()
    navigate(route)
  }

  const handleStartNew = () => {
    // Clear existing progress
    localStorage.removeItem('mnemosyne-progress')
    updateGameState({
      teamName: '',
      room1Code: '',
      room2Phrase: '',
      room3Word: '',
      room4Answer: '',
      startTime: null,
      endTime: null,
      roomsCompleted: [],
      currentRoom: 0
    })
    
    // Start fresh intro sequence
    setShowRestoreOption(false)
    setTeamName('')
    setTimeout(() => {
      setShowContent(true)
      setTimeout(() => setShowNameInput(true), 1500)
    }, 500)
  }

  const handleNameSubmit = () => {
    const cleanTeamName = teamName.trim()
    
    if (!cleanTeamName) {
      setError('Please enter your team name')
      return
    }
    
    if (cleanTeamName.length < 2) {
      setError('Team name must be at least 2 characters long')
      return
    }

    setError('')
    setShowNameInput(false)
    
    // Show keypad after name is entered
    setTimeout(() => {
      setShowKeypad(true)
    }, 1000)
  }

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      
      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
      
      // Check if complete and correct
      if (newCode.every(digit => digit !== '')) {
        const enteredCode = newCode.join('')
        if (enteredCode === correctCode) {
          updateGameState({ 
            teamName: teamName.trim(), // Use the collected team name
            startTime: new Date()
          })
          setTimeout(() => {
            navigate('/room1')
          }, 1500)
        } else {
          setError('Invalid access code. Memory fragments flicker...')
          setTimeout(() => {
            setError('')
            setCode(['', '', '', '', ''])
            const firstInput = document.getElementById('code-0')
            if (firstInput) firstInput.focus()
          }, 2000)
        }
      }
    }
  }

  return (
    <div 
      className={`room-container ${showContent ? 'fade-in' : ''}`}
      style={{ 
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0a0a1a 100%)',
        minHeight: '100vh',
        color: '#e8e8e8'
      }}
    >
      {/* Progress Restoration Option */}
      {showRestoreOption && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'rgba(0, 20, 40, 0.95)',
            padding: '3rem',
            borderRadius: '20px',
            border: '2px solid #00ccff',
            textAlign: 'center',
            maxWidth: '500px',
            boxShadow: '0 0 30px rgba(0, 204, 255, 0.3)'
          }}>
            <h2 style={{ color: '#00ccff', marginBottom: '1.5rem' }}>
              Welcome Back, {teamName}
            </h2>
            <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
              We found your previous progress. You were on Room {gameState.currentRoom + 1}.
              Would you like to continue where you left off or start a new session?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={handleRestoreProgress}
                style={{
                  background: 'linear-gradient(45deg, #00ccff, #0088ff)',
                  color: '#000',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Continue Progress
              </button>
              <button
                onClick={handleStartNew}
                style={{
                  background: 'linear-gradient(45deg, #666, #888)',
                  color: '#fff',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Start New Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rest of existing content... */}
      <div className="room-header">
        <h1 className="room-title" style={{ 
          color: '#00ccff', 
          fontSize: '3rem', 
          textShadow: '0 0 20px rgba(0, 204, 255, 0.3)',
          marginBottom: '1rem'
        }}>
          PROJECT MNEMOSYNE
        </h1>
        <p style={{ fontSize: '1.3rem', color: '#66aaff', marginBottom: '2rem' }}>
          🌜 PROLOGUE - AWAKENING
        </p>
      </div>

      <div className="room-description" style={{ maxWidth: '700px' }}>
        <div style={{ 
          background: 'rgba(0, 20, 40, 0.8)', 
          padding: '2rem', 
          borderRadius: '15px',
          border: '2px solid rgba(0, 204, 255, 0.3)',
          marginBottom: '2rem',
          boxShadow: '0 0 20px rgba(0, 204, 255, 0.1)'
        }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
            You awaken in a sterile room, dimly lit with blue LED panels embedded into white walls. 
            A faint humming surrounds you — the kind that feels more like a memory than a sound. You are alone.
          </p>
          
          <div className="terminal" style={{ 
            background: '#000033',
            color: '#00ccff',
            border: '2px solid #0066cc',
            margin: '1.5rem 0',
            padding: '1.5rem',
            fontFamily: 'Courier New, monospace'
          }}>
            <div style={{ color: '#ff4444', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              TERMINAL DISPLAY:
            </div>
            <div style={{ lineHeight: '1.4' }}>
              Memory Sync: ERROR<br />
              Subject ID: NULL<br />
              Recovery Sequence: Incomplete
            </div>
          </div>

          <p style={{ marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.6' }}>
            You try to remember who you are. Nothing. No name. No time. Only instincts.
          </p>

          <div style={{ 
            background: 'rgba(255, 0, 0, 0.1)', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '2px solid rgba(255, 0, 0, 0.3)',
            fontStyle: 'italic',
            color: '#ff6666',
            textAlign: 'center',
            fontSize: '1.1rem',
            marginBottom: '1.5rem'
          }}>
            On the far wall, etched into frosted glass with what looks like blood:<br />
            <strong>"You chose this."</strong>
          </div>
        </div>

        {/* Hidden Team Name Input */}
        {showNameInput && !showKeypad && (
          <div style={{ 
            background: 'rgba(0, 20, 40, 0.8)', 
            padding: '2rem', 
            borderRadius: '15px',
            border: '2px solid rgba(0, 204, 255, 0.3)',
            marginBottom: '2rem',
            textAlign: 'center',
            animation: 'fadeIn 0.8s ease-in-out'
          }}>
            <h3 style={{ color: '#00ccff', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
              Identity Recovery Required
            </h3>
            
            <p style={{ color: '#aaa', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Enter your team identifier for system tracking:
            </p>
            
            <input
              type="text"
              className="input-field"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              placeholder="Team Name"
              style={{ 
                width: '100%', 
                maxWidth: '400px',
                fontSize: '1.2rem',
                textAlign: 'center',
                marginBottom: '1rem',
                background: 'rgba(0, 20, 40, 0.9)',
                border: '2px solid rgba(0, 204, 255, 0.5)',
                color: '#00ccff',
                padding: '1rem',
                borderRadius: '8px'
              }}
              maxLength={50}
              autoFocus
            />

            {error && (
              <div style={{
                color: '#ff4444',
                background: 'rgba(255, 68, 68, 0.1)',
                border: '1px solid rgba(255, 68, 68, 0.3)',
                padding: '0.8rem',
                borderRadius: '8px',
                margin: '1rem 0',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            <button 
              className="btn" 
              onClick={handleNameSubmit}
              disabled={!teamName.trim()}
              style={{ 
                fontSize: '1.1rem', 
                padding: '1rem 2rem',
                marginTop: '1rem',
                background: teamName.trim() 
                  ? 'linear-gradient(45deg, #00ccff, #0088ff)' 
                  : '#333',
                color: teamName.trim() ? '#000' : '#666'
              }}
            >
              Continue Recovery
            </button>
          </div>
        )}

        {/* Binary Keypad Puzzle */}
        {showKeypad && (
          <div style={{ 
            background: 'rgba(0, 20, 40, 0.8)', 
            padding: '2rem', 
            borderRadius: '15px',
            border: '2px solid rgba(0, 204, 255, 0.4)',
            marginBottom: '2rem',
            textAlign: 'center',
            animation: 'fadeIn 0.8s ease-in-out'
          }}>
            <h3 style={{ color: '#00ccff', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
              Access Keypad Activated
            </h3>
            
            <div style={{ 
              background: 'rgba(0, 204, 255, 0.1)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(0, 204, 255, 0.3)',
              marginBottom: '1.5rem'
            }}>
              <p style={{ color: '#e8e8e8', marginBottom: '1rem', fontSize: '1rem' }}>
                A keypad appears with no label. The flickering screen next to it plays faint static patterns.
              </p>
              <div style={{ 
                fontFamily: 'Courier New, monospace',
                fontSize: '1.1rem',
                color: '#66aaff',
                marginBottom: '1rem'
              }}>
                BINARY PATTERN DETECTED: 11001010 = 202<br />
                CLIPBOARD NOTATION: "Room 17"<br />
                <span style={{ color: '#ffaa00' }}>COMBINE SEQUENCES TO PROCEED</span>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '1.5rem' }}>
              Enter the 5-digit access code:
            </p>

            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '1.5rem'
            }}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  maxLength={1}
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(0, 20, 40, 0.9)',
                    border: '2px solid rgba(0, 204, 255, 0.5)',
                    color: '#00ccff',
                    textAlign: 'center',
                    borderRadius: '8px',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#00ccff'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 204, 255, 0.5)'}
                />
              ))}
            </div>

            {error && (
              <div style={{
                color: '#ff4444',
                background: 'rgba(255, 68, 68, 0.1)',
                border: '1px solid rgba(255, 68, 68, 0.3)',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            {code.every(digit => digit !== '') && code.join('') === correctCode && (
              <div style={{
                color: '#00ff88',
                background: 'rgba(0, 255, 136, 0.1)',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}>
                ✓ ACCESS GRANTED - Initializing memory recovery...
              </div>
            )}
          </div>
        )}
      </div>

      <div className="terminal" style={{ 
        marginTop: '2rem', 
        maxWidth: '500px',
        background: '#000033',
        color: '#00ccff',
        border: '2px solid #0066cc'
      }}>
        <div style={{ color: '#66aaff', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          SYSTEM STATUS:
        </div>
        <div style={{ lineHeight: '1.4' }}>
          FACILITY... DORMANT<br />
          SUBJECT ID... {code.join('') === correctCode ? 'VERIFIED' : 'PENDING'}<br />
          KEYPAD... {showKeypad ? 'ACTIVE' : 'STANDBY'}<br />
          ACCESS CODE... {code.every(digit => digit !== '') && code.join('') === correctCode ? 'ACCEPTED' : 'REQUIRED'}<br />
        </div>
      </div>
    </div>
  )
}

export default Intro
