import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Intro = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, getProgressRoute } = useGameState()
  const [showContent, setShowContent] = useState(false)
  const [code, setCode] = useState(['', '', '', '', ''])
  const [showKeypad, setShowKeypad] = useState(false)
  const [error, setError] = useState('')

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
      }, 3000)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [gameState.teamName, navigate])

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
            introCompleted: true
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
