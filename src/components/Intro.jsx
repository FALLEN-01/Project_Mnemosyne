import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Intro = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, getProgressRoute } = useGameState()
  const [showContent, setShowContent] = useState(false)
  const [code, setCode] = useState('')
  const [showKeypad, setShowKeypad] = useState(false)
  const [error, setError] = useState('')
  const [flickers, setFlickers] = useState({})
  const [showCorrupted, setShowCorrupted] = useState(true)

  // Prologue puzzle: binary 11001010 = 202, + room number 17 = 20217
  const correctCode = '20217'

  useEffect(() => {
    // Redirect to team entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }

    // Show intro content and keypad after delay
    const timer = setTimeout(() => {
      setShowContent(true)
      setTimeout(() => {
        setShowKeypad(true)
      }, 2000)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [gameState.teamName, navigate])

  // Flickering effect for terminal displays
  useEffect(() => {
    if (showKeypad) {
      // Cycle between normal and corrupted every 3 seconds
      const cycleInterval = setInterval(() => {
        setShowCorrupted(prev => !prev)
      }, 3000)

      const flickerInterval = setInterval(() => {
        setFlickers(prev => ({
          ...prev,
          terminal: Math.random() > 0.95,
          status: Math.random() > 0.85,
          hint: Math.random() > 0.8
        }))
      }, 400) // Slowed down from 150ms to 400ms

      return () => {
        clearInterval(cycleInterval)
        clearInterval(flickerInterval)
      }
    }
  }, [showKeypad])

  const handleKeypadPress = (digit) => {
    if (code.length < 5) {
      const newCode = code + digit
      setCode(newCode)
      
      if (newCode.length === 5) {
        setTimeout(() => {
          if (newCode === correctCode) {
            updateGameState({ 
              introCompleted: true
            })
            setTimeout(() => {
              navigate('/room1')
            }, 1500)
          } else {
            setError('Invalid access code. Memory fragments flicker...')
            setTimeout(() => {
              setError('')
              setCode('')
            }, 2000)
          }
        }, 500)
      }
    }
  }

  const handleClear = () => {
    setCode('')
    setError('')
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
      {/* Main Content */}
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
            A small plaque near the door catches your eye: "ROOM 17 - SUBJECT RECOVERY BAY".
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

        {/* Interactive Keypad Puzzle */}
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
            
            {/* Flickering Terminal Display */}
            <div style={{
              background: 'rgba(0, 20, 40, 0.9)',
              border: '2px solid #0066cc',
              borderRadius: '10px',
              padding: '1.5rem',
              marginBottom: '2rem',
              fontFamily: 'Courier New, monospace',
              opacity: flickers.terminal ? 0.3 : 1,
              transition: 'opacity 0.3s ease' // Slowed down transition
            }}>
              <div style={{ 
                color: '#00ccff', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                opacity: flickers.status ? 0.5 : 1
              }}>
                BINARY STREAM ACTIVE:
              </div>
              <div style={{ 
                lineHeight: '1.2', 
                color: '#66aaff',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.9rem'
              }}>
                {showCorrupted ? (
                  <div style={{ color: '#ff4444' }}>
                    01001000 11100011 10110100 01010111<br />
                    ERROR... ERROR... ERROR... ERROR...<br />
                    CORRUPTED... CORRUPTED... CORRUPTED<br />
                    MEMORY FRAGMENTS LOST
                  </div>
                ) : (
                  <div>
                    00110010 00110000 00110010 00110001<br />
                    00110111 01001000 01100101 01101100<br />
                    01110000 01001101 01100101 01101101<br />
                    BINARY STREAM ANALYSIS COMPLETE
                  </div>
                )}
              </div>
              
              {/* Status Indicator */}
              <div style={{
                marginTop: '1rem',
                padding: '0.5rem',
                background: 'rgba(0, 204, 255, 0.1)',
                border: '1px solid rgba(0, 204, 255, 0.3)',
                borderRadius: '5px',
                opacity: flickers.hint ? 0.2 : 1,
                transition: 'opacity 0.2s'
              }}>
                <div style={{ fontSize: '0.9rem', color: '#66aaff' }}>
                  ACCESS STATUS: {code.length === 5 && code === correctCode ? 'GRANTED' : 'PENDING'}<br />
                  MEMORY CORE: {flickers.hint ? 'UNSTABLE' : 'SYNCING'}<br />
                  <span style={{ color: code.length === 5 && code === correctCode ? '#00ff88' : '#ffaa00' }}>
                    {code.length === 5 && code === correctCode ? 'ACCESS GRANTED' : 'AWAITING INPUT'}
                  </span>
                </div>
              </div>
            </div>

            {/* Code Display */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '2rem'
            }}>
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(0, 20, 40, 0.9)',
                    border: `2px solid ${code[index] ? '#00ccff' : 'rgba(0, 204, 255, 0.5)'}`,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: '#00ccff',
                    fontFamily: 'Courier New, monospace',
                    boxShadow: code[index] ? '0 0 10px rgba(0, 204, 255, 0.3)' : 'none',
                    transition: 'all 0.3s ease',
                    opacity: flickers.code && code[index] ? 0.6 : 1
                  }}
                >
                  {code[index] || ''}
                </div>
              ))}
            </div>

            {/* Interactive Keypad */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '15px',
              maxWidth: '300px',
              margin: '0 auto',
              marginBottom: '2rem'
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleKeypadPress(num.toString())}
                  disabled={code.length >= 5}
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(145deg, rgba(0, 204, 255, 0.2), rgba(0, 204, 255, 0.1))',
                    border: '2px solid rgba(0, 204, 255, 0.6)',
                    borderRadius: '12px',
                    color: '#00ccff',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    fontFamily: 'Courier New, monospace',
                    cursor: code.length < 5 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    opacity: code.length >= 5 ? 0.5 : 1,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (code.length < 5) {
                      e.target.style.background = 'linear-gradient(145deg, rgba(0, 204, 255, 0.4), rgba(0, 204, 255, 0.2))'
                      e.target.style.boxShadow = '0 0 15px rgba(0, 204, 255, 0.4)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (code.length < 5) {
                      e.target.style.background = 'linear-gradient(145deg, rgba(0, 204, 255, 0.2), rgba(0, 204, 255, 0.1))'
                      e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'
                    }
                  }}
                >
                  {num}
                </button>
              ))}
              
              {/* Clear and Zero buttons */}
              <button
                onClick={handleClear}
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(145deg, rgba(255, 68, 68, 0.3), rgba(255, 68, 68, 0.2))',
                  border: '2px solid rgba(255, 68, 68, 0.6)',
                  borderRadius: '12px',
                  color: '#ff4444',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(145deg, rgba(255, 68, 68, 0.5), rgba(255, 68, 68, 0.3))'
                  e.target.style.boxShadow = '0 0 15px rgba(255, 68, 68, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(145deg, rgba(255, 68, 68, 0.3), rgba(255, 68, 68, 0.2))'
                  e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                CLR
              </button>
              
              <button
                onClick={() => handleKeypadPress('0')}
                disabled={code.length >= 5}
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(145deg, rgba(0, 204, 255, 0.2), rgba(0, 204, 255, 0.1))',
                  border: '2px solid rgba(0, 204, 255, 0.6)',
                  borderRadius: '12px',
                  color: '#00ccff',
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  fontFamily: 'Courier New, monospace',
                  cursor: code.length < 5 ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  opacity: code.length >= 5 ? 0.5 : 1,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (code.length < 5) {
                    e.target.style.background = 'linear-gradient(145deg, rgba(0, 204, 255, 0.4), rgba(0, 204, 255, 0.2))'
                    e.target.style.boxShadow = '0 0 15px rgba(0, 204, 255, 0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (code.length < 5) {
                    e.target.style.background = 'linear-gradient(145deg, rgba(0, 204, 255, 0.2), rgba(0, 204, 255, 0.1))'
                    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'
                  }
                }}
              >
                0
              </button>
              
              <div></div> {/* Empty space for grid alignment */}
            </div>

            {/* Error Display */}
            {error && (
              <div style={{
                color: '#ff4444',
                background: 'rgba(255, 68, 68, 0.1)',
                border: '1px solid rgba(255, 68, 68, 0.3)',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem',
                fontSize: '0.9rem',
                animation: 'pulse 1s infinite'
              }}>
                {error}
              </div>
            )}

            {/* Success Indicator */}
            {code.length === 5 && code === correctCode && (
              <div style={{
                color: '#00ff88',
                background: 'rgba(0, 255, 136, 0.1)',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                animation: 'fadeIn 0.5s ease-in'
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
          SUBJECT ID... {code === correctCode ? 'VERIFIED' : 'PENDING'}<br />
          KEYPAD... {showKeypad ? 'ACTIVE' : 'STANDBY'}<br />
          ACCESS CODE... {code.length === 5 && code === correctCode ? 'ACCEPTED' : 'REQUIRED'}<br />
        </div>
      </div>
    </div>
  )
}

export default Intro
