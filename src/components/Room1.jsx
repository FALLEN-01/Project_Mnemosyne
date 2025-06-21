import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Room1 = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  const [code, setCode] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [showMemory, setShowMemory] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const correctCode = '3704'
  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }

    // Initialize start time when first room loads (since we removed intro)
    if (!gameState.startTime) {
      updateGameState({ startTime: new Date() })
    }

    // Fade in effect
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [gameState.teamName, navigate])

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleSubmit = () => {
    const enteredCode = code.join('')
    
    if (enteredCode.length !== 4) {
      setError('Please enter a 4-digit code')
      return
    }

    if (enteredCode === correctCode) {
      updateGameState({ room1Code: enteredCode })
      completeRoom(1)
      setShowMemory(true)
      
      setTimeout(() => {
        navigate('/room2')
      }, 3000)
    } else {
      setError('Memory sequence corrupted. Reassemble and try again.')
      setCode(['', '', '', ''])
    }
  }

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }
  if (showMemory) {
    return (
      <div className="room-container">
        <div className="memory-fragment">
          <h2 style={{ color: '#44ff44', marginBottom: '1rem' }}>🧠 MEMORY FRAGMENT RECOVERED</h2>
          <div style={{ 
            background: 'rgba(68, 255, 68, 0.1)', 
            padding: '1.5rem', 
            borderRadius: '15px',
            border: '2px solid rgba(68, 255, 68, 0.3)',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem', fontSize: '1rem' }}>IDENTITY VERIFICATION: COMPLETE</h3>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              The fragments align... You see flashes of a laboratory, restraints, the taste of copper in your mouth. 
              Someone screaming in the distance. The memories are fragmented but real.
            </p>
            <div className="terminal" style={{ marginBottom: '1rem' }}>
              <p>MEMORY SYNC: 25% COMPLETE</p>
              <p>ACCESSING NEXT CHAMBER...</p>
              <p style={{ color: '#ff4444' }}>WARNING: Identity reconstruction in progress</p>
            </div>
          </div>
          <div className="loading" style={{ margin: '1.5rem auto' }}></div>
          <p>Proceeding to Memory Analysis Lab...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`room-container ${showContent ? 'fade-in' : ''}`}
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a2e1a 50%, #163e16 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="room-header">
        <h1 className="room-title" style={{ color: '#44ff44', fontSize: '3rem' }}>
          🔐 ROOM 1 — MEMORY RECOVERY LAB
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#00ffff', marginBottom: '1rem' }}>
          SECURITY CLEARANCE: LEVEL 1 RESTRICTED
        </p>
        {gameState.teamName && (
          <p style={{ fontSize: '1.1rem', color: '#44ff44', marginBottom: '2rem' }}>
            Active Team: <strong>{gameState.teamName}</strong>
          </p>
        )}
      </div>

      <div className="room-description">
        <h2 style={{ color: '#44ff44', marginBottom: '1.5rem', fontSize: '1.6rem' }}>
          🧬 Neural Pattern Analysis Required
        </h2>
        
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          You step into the Memory Recovery Laboratory. The walls are lined with broken containment pods 
          and flickering neural interface equipment. A central console displays fragments of your past — 
          scattered images that don't quite make sense yet.
        </p>        <div style={{ 
          background: 'rgba(68, 255, 68, 0.1)', 
          padding: '1rem', 
          borderRadius: '15px',
          border: '2px solid rgba(68, 255, 68, 0.3)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#44ff44', marginBottom: '1rem' }}>🧩 MEMORY FRAGMENTS — VISUAL PUZZLE:</h3>
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
            These manga panels contain fragments of your lost identity. Study each image carefully and count the clues to unlock your memories.
          </p>
          
          {/* Mobile: Single column stack, Desktop: 2x2 grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)', // Mobile: single column
            gap: '1rem',
            marginTop: '1rem'
          }} className="manga-grid">
            
            {/* Manga Image 1 - Family Photo */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.7)', 
              borderRadius: '10px',
              border: '2px solid rgba(68, 255, 68, 0.3)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* This entire div will be replaced by manga image */}
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9', // Maintain aspect ratio
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px dashed rgba(68, 255, 68, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                position: 'relative'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👨‍👩‍👧</div>
                <div style={{ 
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#44ff44',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '5px',
                  fontSize: '0.7rem',
                  fontFamily: 'Courier New, monospace'
                }}>
                  MANGA PAGE 1
                </div>
                <p style={{ fontSize: '0.8rem', color: '#aaa', textAlign: 'center' }}>
                  [FAMILY PHOTO SCENE]<br/>
                  Replace this placeholder with manga image
                </p>
              </div>
              <div style={{ 
                padding: '0.8rem',
                background: 'rgba(0, 0, 0, 0.8)',
                borderTop: '1px solid rgba(68, 255, 68, 0.3)'
              }}>
                <h4 style={{ color: '#00ffff', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Fragment A: Family Memory</h4>
                <p style={{ fontSize: '0.8rem', color: '#ccc' }}>Count: Three people standing together</p>
              </div>
            </div>

            {/* Manga Image 2 - Journal Entry */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.7)', 
              borderRadius: '10px',
              border: '2px solid rgba(68, 255, 68, 0.3)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px dashed rgba(68, 255, 68, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                position: 'relative'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#ff4444' }}>07</div>
                <div style={{ 
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#44ff44',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '5px',
                  fontSize: '0.7rem',
                  fontFamily: 'Courier New, monospace'
                }}>
                  MANGA PAGE 2
                </div>
                <p style={{ fontSize: '0.8rem', color: '#aaa', textAlign: 'center' }}>
                  [JOURNAL ENTRY SCENE]<br/>
                  Replace this placeholder with manga image
                </p>
              </div>
              <div style={{ 
                padding: '0.8rem',
                background: 'rgba(0, 0, 0, 0.8)',
                borderTop: '1px solid rgba(68, 255, 68, 0.3)'
              }}>
                <h4 style={{ color: '#00ffff', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Fragment B: Research Log</h4>
                <p style={{ fontSize: '0.8rem', color: '#ccc' }}>Count: Page number "07" circled in red</p>
              </div>
            </div>

            {/* Manga Image 3 - Desert Map */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.7)', 
              borderRadius: '10px',
              border: '2px solid rgba(68, 255, 68, 0.3)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px dashed rgba(68, 255, 68, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                position: 'relative'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#ff4444' }}>❌</div>
                <div style={{ 
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#44ff44',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '5px',
                  fontSize: '0.7rem',
                  fontFamily: 'Courier New, monospace'
                }}>
                  MANGA PAGE 3
                </div>
                <p style={{ fontSize: '0.8rem', color: '#aaa', textAlign: 'center' }}>
                  [DESERT MAP SCENE]<br/>
                  Replace this placeholder with manga image
                </p>
              </div>
              <div style={{ 
                padding: '0.8rem',
                background: 'rgba(0, 0, 0, 0.8)',
                borderTop: '1px solid rgba(68, 255, 68, 0.3)'
              }}>
                <h4 style={{ color: '#00ffff', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Fragment C: Location Data</h4>
                <p style={{ fontSize: '0.8rem', color: '#ccc' }}>Count: Look for the hidden "0" in the image</p>
              </div>
            </div>

            {/* Manga Image 4 - Timer Display */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.7)', 
              borderRadius: '10px',
              border: '2px solid rgba(68, 255, 68, 0.3)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px dashed rgba(68, 255, 68, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                position: 'relative'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#00ffff' }}>04</div>
                <div style={{ 
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#44ff44',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '5px',
                  fontSize: '0.7rem',
                  fontFamily: 'Courier New, monospace'
                }}>
                  MANGA PAGE 4
                </div>
                <p style={{ fontSize: '0.8rem', color: '#aaa', textAlign: 'center' }}>
                  [TIMER SCENE]<br/>
                  Replace this placeholder with manga image
                </p>
              </div>
              <div style={{ 
                padding: '0.8rem',
                background: 'rgba(0, 0, 0, 0.8)',
                borderTop: '1px solid rgba(68, 255, 68, 0.3)'
              }}>
                <h4 style={{ color: '#00ffff', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Fragment D: Final Countdown</h4>
                <p style={{ fontSize: '0.8rem', color: '#ccc' }}>Count: Timer shows "04" seconds</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(0, 255, 255, 0.1)', 
          padding: '2rem', 
          borderRadius: '10px',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>🧮 NEURAL SEQUENCE PUZZLE:</h3>
          <p style={{ marginBottom: '1rem' }}>
            The memory fragments contain numeric clues. Count the elements in each fragment 
            and enter the 4-digit sequence to unlock the next memory layer.
          </p>
          <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#888' }}>
            Hint: Family members → Journal page → Map markers → Timer seconds
          </p>
        </div>
      </div>      <div className="code-input">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            maxLength={1}
            className="code-digit"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '2px solid rgba(68, 255, 68, 0.5)',
              color: '#44ff44',
              textAlign: 'center',
              borderRadius: '8px',
              fontFamily: 'Courier New, monospace',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#44ff44'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(68, 255, 68, 0.5)'}
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
          margin: '1rem 0',
          textAlign: 'center',
          fontSize: '1.1rem'
        }}>
          {error}
        </div>
      )}      <button 
        onClick={handleSubmit}
        disabled={code.join('').length !== 4}
        className="btn"
        style={{
          background: code.join('').length === 4 
            ? 'linear-gradient(45deg, #44ff44, #22aa22)' 
            : '#333',
          color: code.join('').length === 4 ? '#000' : '#666',
          cursor: code.join('').length === 4 ? 'pointer' : 'not-allowed',
          marginTop: '1rem'
        }}
      >
        🔓 UNLOCK MEMORY
      </button>

      <div className="terminal" style={{ 
        color: '#44ff44',
        border: '1px solid #44ff44'
      }}>
        <div style={{ color: '#00ffff', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          NEURAL ANALYZER STATUS:
        </div>
        <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          MEMORY FRAGMENTS... {code.filter(c => c).length}/4 DETECTED{'\n'}
          PATTERN ANALYSIS... {code.join('').length === 4 ? 'READY' : 'INCOMPLETE'}{'\n'}
          SECURITY LEVEL... RESTRICTED{'\n'}
          NEXT SECTOR... {code.join('') === correctCode ? 'UNLOCKED' : 'LOCKED'}
        </div>
      </div>
    </div>
  )
}

export default Room1
