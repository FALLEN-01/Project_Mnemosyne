import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

// DEVELOPER NOTES - VISUAL & SOUND (Observation Hall):
// - Blue/Grey color palette - cold surveillance room aesthetic
// - CCTV monitors with static, glass panels reflecting dim light
// - Ambient sound: electrical buzzing, static bursts from speakers
// - Surveillance pods should appear damaged, screens flickering or shattered
// - Bloodied clipboards scattered, overturned chair suggesting panic
// - Movement path animation: glowing trail overlay on surveillance footage
// - 3x3 keypad should have tactile button press sounds
// - Audio log playback with distorted voice effects
// - Success: mechanical door unlock sound with satisfying click

const Room1 = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  const [code, setCode] = useState(['', '', '', '', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [showMemory, setShowMemory] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // Movement path puzzle: 3x3 grid sequence
  const correctSequence = [4, 1, 2, 5, 8, 7, 6, 3, 0] // Center -> Top-left -> Top-middle -> Middle-right -> Bottom-right -> Bottom-middle -> Bottom-left -> Top-right -> Middle-left
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
      if (value && index < 8) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleGridClick = (index) => {
    if (currentStep < correctSequence.length) {
      if (index === correctSequence[currentStep]) {
        setCurrentStep(currentStep + 1)
        if (currentStep + 1 === correctSequence.length) {
          // Puzzle completed
          updateGameState({ room1Sequence: correctSequence })
          completeRoom(1)
          setShowMemory(true)
          
          setTimeout(() => {
            navigate('/room2')
          }, 3000)
        }
      } else {
        setError('Incorrect path. The surveillance system is resetting...')
        setCurrentStep(0)
        setTimeout(() => setError(''), 2000)
      }
    }
  }

  const handleSubmit = () => {
    // This is now handled by handleGridClick
    return
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
          <h2 style={{ color: '#44ff44', marginBottom: '1rem' }}>SURVEILLANCE PATTERN RECOGNIZED</h2>
          <div style={{ 
            background: 'rgba(68, 255, 68, 0.1)', 
            padding: '1.5rem', 
            borderRadius: '15px',
            border: '2px solid rgba(68, 255, 68, 0.3)',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem', fontSize: '1rem' }}>🎧 LOG ENTRY 017 RECOVERED</h3>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              "Subject is beginning re-integration. Neural reconstruction unstable. Memory echoes predicted."
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              The movement pattern triggers something familiar. You've walked this path before... but when? 
              The surveillance footage shows your own figure, but the memories feel distant, fragmented.
            </p>
            <div className="terminal" style={{ marginBottom: '1rem' }}>
              <p>MEMORY RECONSTRUCTION: 25% COMPLETE</p>
              <p>ACCESSING DEEPER FACILITY LEVELS...</p>
              <p style={{ color: '#ff4444' }}>WARNING: Neural echoes detected</p>
            </div>
          </div>
          <div className="loading" style={{ margin: '1.5rem auto' }}></div>
          <p>Proceeding to Chemical Containment...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`room-container ${showContent ? 'fade-in' : ''}`}
      style={{ 
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #2e2e4a 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="room-header">
        <h1 className="room-title" style={{ color: '#6666ff', fontSize: '3rem' }}>
          ROOM 1 - OBSERVATION HALL
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#00ffff', marginBottom: '1rem' }}>
          SURVEILLANCE SYSTEM ACTIVE - NEURAL RECONSTRUCTION UNSTABLE
        </p>
      </div>

      <div className="room-description" style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{ 
          background: 'rgba(102, 102, 255, 0.1)', 
          padding: '1.5rem', 
          borderRadius: '15px',
          border: '2px solid rgba(102, 102, 255, 0.3)',
          marginBottom: '2rem',
          maxWidth: '700px'
        }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
            You enter a corridor of half-lit surveillance pods — shattered screens, bloodied clipboards, 
            a chair knocked over as if someone left in a panic. Each room in the facility holds a piece of you — 
            not just clues or codes, but memories you've locked away.
          </p>
          <div style={{ 
            background: 'rgba(0, 255, 255, 0.2)', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1rem',
            fontFamily: 'Courier New, monospace'
          }}>
            <p style={{ color: '#00ffff', fontWeight: 'bold' }}>🎧 LOG ENTRY 017:</p>
            <p>"Subject is beginning re-integration. Neural reconstruction unstable. Memory echoes predicted."</p>
          </div>
        </div>
        
        <h2 style={{ color: '#6666ff', marginBottom: '1.5rem', fontSize: '1.6rem' }}>
          SURVEILLANCE FOOTAGE ANALYSIS
        </h2>        <div style={{ 
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <p style={{ marginBottom: '2rem', fontSize: '1rem', textAlign: 'center', maxWidth: '600px' }}>
            The surveillance footage shows a movement path. Study the sequence carefully and retrace the path on the floor panel below.
          </p>
          
          {/* Surveillance Footage Display */}
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '15px',
            padding: '2rem',
            border: '2px solid rgba(102, 102, 255, 0.4)',
            marginBottom: '2rem',
            maxWidth: '500px',
            width: '100%'
          }}>
            <h4 style={{ color: '#6666ff', marginBottom: '1rem', textAlign: 'center' }}>
              📹 SURVEILLANCE FOOTAGE - TIMESTAMP: 03:47:21
            </h4>
            <div style={{ 
              background: 'rgba(102, 102, 255, 0.1)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(102, 102, 255, 0.3)',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.9rem',
              lineHeight: '1.6'
            }}>
              <p style={{ color: '#cccccc', marginBottom: '1rem' }}>
                MOVEMENT SEQUENCE DETECTED:
              </p>
              <p style={{ color: '#ffff88', marginBottom: '0.5rem' }}>
                1. Subject enters from CENTER position
              </p>
              <p style={{ color: '#ffff88', marginBottom: '0.5rem' }}>
                2. Moves to TOP-LEFT corner
              </p>
              <p style={{ color: '#ffff88', marginBottom: '0.5rem' }}>
                3. Proceeds to TOP-CENTER
              </p>
              <p style={{ color: '#ffff88', marginBottom: '0.5rem' }}>
                4. Shifts to MIDDLE-RIGHT
              </p>
              <p style={{ color: '#ffff88', marginBottom: '0.5rem' }}>
                5. Continues to BOTTOM-RIGHT
              </p>
              <p style={{ color: '#ffff88', marginBottom: '0.5rem' }}>
                6. Moves to BOTTOM-CENTER
              </p>
              <p style={{ color: '#ffff88', marginBottom: '0.5rem' }}>
                7. Goes to BOTTOM-LEFT
              </p>
              <p style={{ color: '#ffff88', marginBottom: '0.5rem' }}>
                8. Shifts to TOP-RIGHT
              </p>
              <p style={{ color: '#ffff88' }}>
                9. Ends at MIDDLE-LEFT
              </p>
            </div>
          </div>
        </div>        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '3rem',
          width: '100%'
        }}>
          <h3 style={{ color: '#6666ff', marginBottom: '1.5rem', textAlign: 'center' }}>MOVEMENT PATH RECONSTRUCTION</h3>
          <div style={{ 
            background: 'rgba(102, 102, 255, 0.1)', 
            padding: '1.5rem', 
            borderRadius: '10px',
            border: '1px solid rgba(102, 102, 255, 0.3)',
            maxWidth: '600px',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>
              A floor panel shows a 3x3 grid keypad. You must retrace the movement path via keypad taps.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#ffff88' }}>
              Follow the exact sequence shown in the surveillance footage. Click the grid positions in order.
            </p>
            <p style={{ fontSize: '0.8rem', color: '#ff4444', marginTop: '1rem' }}>
              Progress: {currentStep}/9 steps completed
            </p>
          </div>

          {/* 3x3 Keypad Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            maxWidth: '300px',
            width: '100%',
            margin: '0 auto'
          }}>
            {Array.from({ length: 9 }, (_, index) => (
              <button
                key={index}
                onClick={() => handleGridClick(index)}
                disabled={currentStep >= correctSequence.length}
                style={{
                  width: '80px',
                  height: '80px',
                  background: currentStep > 0 && correctSequence.slice(0, currentStep).includes(index)
                    ? 'linear-gradient(45deg, #6666ff, #4444cc)'
                    : 'rgba(102, 102, 255, 0.2)',
                  border: currentStep < correctSequence.length && index === correctSequence[currentStep]
                    ? '3px solid #ffff00'
                    : '2px solid rgba(102, 102, 255, 0.5)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: currentStep < correctSequence.length ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Courier New, monospace'
                }}
                onMouseEnter={(e) => {
                  if (currentStep < correctSequence.length) {
                    e.target.style.background = 'rgba(102, 102, 255, 0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentStep < correctSequence.length && !correctSequence.slice(0, currentStep).includes(index)) {
                    e.target.style.background = 'rgba(102, 102, 255, 0.2)'
                  }
                }}
              >
                {index === 4 ? 'C' : 
                 index === 0 ? 'TL' : 
                 index === 1 ? 'TM' : 
                 index === 2 ? 'TR' :
                 index === 3 ? 'ML' :
                 index === 5 ? 'MR' :
                 index === 6 ? 'BL' :
                 index === 7 ? 'BM' : 'BR'}
              </button>
            ))}
          </div>
        </div>
      </div>      {error && (
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
      )}

      <div className="terminal" style={{ 
        color: '#6666ff',
        border: '1px solid #6666ff',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{ color: '#00ffff', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          SURVEILLANCE TRACKING SYSTEM:
        </div>
        <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          PATH SEQUENCE... {currentStep}/9 STEPS{'\n'}
          NEURAL PATTERN... {currentStep === correctSequence.length ? 'RECOGNIZED' : 'ANALYZING'}{'\n'}
          MEMORY ACCESS... {currentStep === correctSequence.length ? 'GRANTED' : 'RESTRICTED'}{'\n'}
          NEXT CHAMBER... {currentStep === correctSequence.length ? 'UNLOCKED' : 'LOCKED'}
        </div>
      </div>
    </div>
  )
}

export default Room1
