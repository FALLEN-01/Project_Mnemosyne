import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

// DEVELOPER NOTES - VISUAL & SOUND (Prologue - Awakening):
// - White/Blue color palette - sterile, clinical lighting
// - Blue LED panels embedded in white walls, minimal UI design
// - Ambient sound: low electrical humming, faint memory-like echoes
// - Terminal screen should flicker occasionally with static
// - Blood message should appear etched/scratched into frosted glass effect
// - Keypad interface: clean, minimal, with subtle blue glow
// - Error sounds: soft digital beeps, not harsh
// - Success: ascending confirmation chime when name is entered

const TeamName = () => {
  const navigate = useNavigate()
  const { updateGameState } = useGameState()
  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')
  const [showContent, setShowContent] = useState(false)
  const [code, setCode] = useState(['', '', '', '', ''])
  const [showKeypad, setShowKeypad] = useState(false)

  // Prologue puzzle: binary 11001010 = 202, + room number 17 = 20217
  const correctCode = '20217'

  useEffect(() => {
    // Fade in effect for the awakening scene
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    // Show keypad after name is entered
    const keypadTimer = setTimeout(() => {
      if (teamName.trim()) {
        setShowKeypad(true)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearTimeout(keypadTimer)
    }
  }, [teamName])

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      
      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`prologue-code-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
      
      // Check if complete
      if (newCode.every(digit => digit !== '') && newCode.join('') === correctCode) {
        updateGameState({ teamName: teamName.trim(), prologueCode: correctCode })
        setTimeout(() => {
          navigate('/room1')
        }, 1500)
      }
    }
  }

  const handleSubmit = () => {
    const cleanTeamName = teamName.trim()
    
    if (!cleanTeamName) {
      setError('Please enter your subject identifier')
      return
    }
    
    if (cleanTeamName.length < 2) {
      setError('Identifier must be at least 2 characters long')
      return
    }

    setError('')
    setShowKeypad(true)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div 
      className={`room-container ${showContent ? 'fade-in' : ''}`}
      style={{ 
        background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 50%, #cce7ff 100%)',
        minHeight: '100vh',
        color: '#1a1a2e'
      }}
    >
      <div className="room-header">
        <h1 className="room-title" style={{ color: '#0066cc', fontSize: '3rem', textShadow: '0 0 20px rgba(0, 102, 204, 0.3)' }}>
          PROJECT MNEMOSYNE
        </h1>
        <p style={{ fontSize: '1.3rem', color: '#004499', marginBottom: '2rem' }}>
          🌜 PROLOGUE - AWAKENING
        </p>
      </div>

      <div className="room-description" style={{ maxWidth: '700px' }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.8)', 
          padding: '2rem', 
          borderRadius: '15px',
          border: '2px solid rgba(0, 102, 204, 0.3)',
          marginBottom: '2rem',
          boxShadow: '0 0 20px rgba(0, 102, 204, 0.1)'
        }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6', color: '#2c2c54' }}>
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

          <p style={{ marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.6', color: '#2c2c54' }}>
            You try to remember who you are. Nothing. No name. No time. Only instincts.
          </p>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.5)', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '2px solid rgba(255, 0, 0, 0.3)',
            fontStyle: 'italic',
            color: '#800000',
            textAlign: 'center',
            fontSize: '1.1rem',
            marginBottom: '1.5rem',
            backgroundImage: 'linear-gradient(45deg, rgba(255,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(255,0,0,0.1) 75%), linear-gradient(45deg, rgba(255,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(255,0,0,0.1) 75%)',
            backgroundSize: '10px 10px',
            backgroundPosition: '0 0, 5px 5px'
          }}>
            On the far wall, etched into frosted glass with what looks like blood:<br />
            <strong>"You chose this."</strong>
          </div>
        </div>

        {/* Subject Identifier Input */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.9)', 
          padding: '2rem', 
          borderRadius: '15px',
          border: '2px solid rgba(0, 102, 204, 0.4)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#0066cc', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
            Subject Identification Required
          </h3>
          
          <input
            type="text"
            className="input-field"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter Subject Identifier"
            style={{ 
              width: '100%', 
              maxWidth: '400px',
              fontSize: '1.2rem',
              textAlign: 'center',
              marginBottom: '1rem',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid rgba(0, 102, 204, 0.3)',
              color: '#1a1a2e'
            }}
            maxLength={50}
            autoFocus
          />
          
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
            Enter any identifier to proceed with memory recovery
          </p>

          {error && (
            <div style={{
              color: '#cc0000',
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              padding: '0.8rem',
              borderRadius: '8px',
              margin: '1rem 0',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          {!showKeypad && (
            <button 
              className="btn" 
              onClick={handleSubmit}
              disabled={!teamName.trim()}
              style={{ 
                fontSize: '1.1rem', 
                padding: '1rem 2rem',
                background: teamName.trim() 
                  ? 'linear-gradient(45deg, #0066cc, #004499)' 
                  : '#ccc',
                color: teamName.trim() ? '#fff' : '#666'
              }}
            >
              Initialize Recovery Sequence
            </button>
          )}
        </div>

        {/* Binary Keypad Puzzle */}
        {showKeypad && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            padding: '2rem', 
            borderRadius: '15px',
            border: '2px solid rgba(0, 102, 204, 0.4)',
            marginBottom: '2rem',
            textAlign: 'center',
            animation: 'fadeIn 0.8s ease-in-out'
          }}>
            <h3 style={{ color: '#0066cc', marginBottom: '1.5rem', fontSize: '1.4rem' }}>
              Access Keypad Activated
            </h3>
            
            <div style={{ 
              background: 'rgba(0, 102, 204, 0.1)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(0, 102, 204, 0.3)',
              marginBottom: '1.5rem'
            }}>
              <p style={{ color: '#1a1a2e', marginBottom: '1rem', fontSize: '1rem' }}>
                A keypad appears with no label. The flickering screen next to it plays faint static patterns.
              </p>
              <div style={{ 
                fontFamily: 'Courier New, monospace',
                fontSize: '1.1rem',
                color: '#004499',
                marginBottom: '1rem'
              }}>
                BINARY PATTERN DETECTED: 11001010 = 202<br />
                CLIPBOARD NOTATION: "Room 17"<br />
                <span style={{ color: '#cc6600' }}>COMBINE SEQUENCES TO PROCEED</span>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
              Enter the 5-digit access code: (Binary value + Room number)
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
                  id={`prologue-code-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  maxLength={1}
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '2px solid rgba(0, 102, 204, 0.5)',
                    color: '#1a1a2e',
                    textAlign: 'center',
                    borderRadius: '8px',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0066cc'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 102, 204, 0.5)'}
                />
              ))}
            </div>

            {code.every(digit => digit !== '') && code.join('') === correctCode && (
              <div style={{
                color: '#00cc00',
                background: 'rgba(0, 204, 0, 0.1)',
                border: '1px solid rgba(0, 204, 0, 0.3)',
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
        <div style={{ color: '#0099ff', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          SYSTEM STATUS:
        </div>
        <div style={{ lineHeight: '1.4' }}>
          FACILITY... DORMANT<br />
          SUBJECT ID... {teamName.trim() ? 'REGISTERED' : 'PENDING'}<br />
          KEYPAD... {showKeypad ? 'ACTIVE' : 'STANDBY'}<br />
          ACCESS CODE... {code.every(digit => digit !== '') && code.join('') === correctCode ? 'VERIFIED' : 'REQUIRED'}<br />
        </div>
      </div>
    </div>
  )
}

export default TeamName
