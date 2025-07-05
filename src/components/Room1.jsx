import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'
import CyberpunkTerminal from './CyberpunkTerminal'

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
  const [error, setError] = useState('')
  const [showMemory, setShowMemory] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [statusModalType, setStatusModalType] = useState('') // 'success' or 'error'
  const [showTerminal, setShowTerminal] = useState(false)
  const [clickedBlocks, setClickedBlocks] = useState([]) // Track which blocks have been clicked

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

  const handleGridClick = (index) => {
    // Add this block to clicked blocks if not already clicked
    if (!clickedBlocks.includes(index)) {
      setClickedBlocks([...clickedBlocks, index])
    }

    if (index === correctSequence[currentStep]) {
      setCurrentStep(currentStep + 1)
      if (currentStep + 1 === correctSequence.length) {
        // Puzzle completed - show terminal
        updateGameState({ room1Sequence: correctSequence })
        completeRoom(1)
        setShowTerminal(true)
      }
    } else {
      // Wrong path - only show error if all 9 blocks have been clicked
      if (clickedBlocks.length >= 8) { // 8 because we're adding current one
        setStatusModalType('error')
        setShowStatusModal(true)
        setCurrentStep(0)
        setClickedBlocks([]) // Reset clicked blocks
        
        setTimeout(() => {
          setShowStatusModal(false)
          setError('')
        }, 2000)
      }
    }
  }

  const handleTerminalComplete = () => {
    setShowTerminal(false)
    setShowMemory(true)
    setTimeout(() => {
      navigate('/room2')
    }, 13000)
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
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>🎧 LOG ENTRY 017 RECOVERED</h3>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              "Subject is beginning re-integration. Neural reconstruction unstable. Memory echoes predicted."
            </p>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
              The movement pattern triggers something familiar. You've walked this path before... but when? 
              The surveillance footage shows your own figure, but the memories feel distant, fragmented.
            </p>

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
        <h1 className="room-title" style={{ color: '#6666ff' }}>
          ROOM 1 - OBSERVATION HALL
        </h1>
        <p className="room-subtitle" style={{ color: '#00ffff', marginBottom: '1rem' }}>
          SURVEILLANCE SYSTEM ACTIVE - NEURAL RECONSTRUCTION UNSTABLE
        </p>
      </div>

      <div className="room-description" style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        margin: '0 auto'
      }}>
        <div style={{ 
          background: 'rgba(102, 102, 255, 0.1)', 
          padding: '1.5rem', 
          borderRadius: '15px',
          border: '2px solid rgba(102, 102, 255, 0.3)',
          marginBottom: '2rem',
          width: '100%',
          maxWidth: '90%'
        }}>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Long rows of shattered surveillance pods. Blood on clipboards. Empty chairs still spinning.
            Whoever was here — they ran. Or tried.
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
            <p style={{ fontStyle: 'italic', marginTop: '0.5rem', color: '#ffff88' }}>
              But it's your voice.
            </p>
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
          <p style={{ marginBottom: '2rem', fontSize: '1rem', textAlign: 'center', width: '100%' }}>
            CCTV footage shows your movement — jerky, panicked.
            Below, a 3x3 keypad on the floor.
            You must follow your ghost through the steps again. Retrace your panic.
          </p>
          
          {/* Surveillance Footage Display */}
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '15px',
            padding: '2rem',
            border: '2px solid rgba(102, 102, 255, 0.4)',
            marginBottom: '2rem',
            margin: '0 auto',
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
              <p style={{ color: '#ffff88', fontStyle: 'italic', lineHeight: '1.6' }}>
                At the stroke of 3:47, a shadow stirs at the very heart of the grid — the center square. Drawn by some silent beckoning, it drifts to the upper-left, brushing against the edge of forgotten memories. From there, it slides to the peak's center, like a whisper carried on wind. A sudden twitch, and it darts to the middle-right, as if avoiding something unseen. Its descent begins — spiraling down to the bottom-right, then sweeping to the bottom-center like a pendulum in motion. But it does not rest — it veers left to the bottom corner, a ghost retracing a lost step. Without warning, it leaps to the top-right, the opposite pole. And finally, with purpose fulfilled, it sinks to rest at the middle-left — the final square in a cryptic waltz of nine.
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
            width: '100%',
            maxWidth: '90%',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>
              A 3x3 keypad on the floor. You must follow your ghost through the steps again.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#ffff88' }}>
              Retrace your panic. The door clicks open as you finish the sequence.
            </p>
            <p style={{ fontSize: '0.8rem', color: '#cccccc', marginTop: '1rem', fontStyle: 'italic' }}>
              You don't remember walking it. But your feet do.
            </p>
            <p style={{ fontSize: '0.8rem', color: '#ff4444', marginTop: '1rem' }}>
              Progress: {currentStep}/9 steps completed
            </p>
          </div>

          {/* Movement Path Grid - Floor Blocks */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              gap: '2px',
              width: '300px',
              height: '300px',
              background: 'linear-gradient(145deg, #1a1a3e, #0f0f2e)',
              padding: '12px',
              borderRadius: '20px',
              border: '3px solid rgba(102, 102, 255, 0.4)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.6), 0 8px 20px rgba(102, 102, 255, 0.2)'
            }}>
              {Array.from({ length: 9 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handleGridClick(index)}
                  style={{
                    background: clickedBlocks.includes(index)
                      ? 'linear-gradient(145deg, rgba(102, 102, 255, 0.8), rgba(68, 68, 204, 0.6))'
                      : 'linear-gradient(145deg, rgba(20, 30, 60, 0.9), rgba(10, 20, 40, 0.9))',
                    border: '1px solid rgba(102, 102, 255, 0.3)',
                    borderRadius: '10px',
                    color: clickedBlocks.includes(index) ? '#ffffff' : '#6666ff',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    fontFamily: 'Courier New, monospace',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: clickedBlocks.includes(index)
                      ? 'inset 0 2px 6px rgba(0, 0, 0, 0.7), 0 0 15px rgba(102, 102, 255, 0.4)'
                      : 'inset 0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
                    textShadow: clickedBlocks.includes(index)
                      ? '0 0 8px rgba(255, 255, 255, 0.8)'
                      : '0 0 8px rgba(102, 102, 255, 0.6)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (!clickedBlocks.includes(index)) {
                      e.target.style.background = 'linear-gradient(145deg, rgba(102, 102, 255, 0.3), rgba(68, 68, 204, 0.2))'
                      e.target.style.boxShadow = 'inset 0 1px 3px rgba(102, 102, 255, 0.3), 0 0 12px rgba(102, 102, 255, 0.4)'
                      e.target.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!clickedBlocks.includes(index)) {
                      e.target.style.background = 'linear-gradient(145deg, rgba(20, 30, 60, 0.9), rgba(10, 20, 40, 0.9))'
                      e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)'
                      e.target.style.transform = 'translateY(0)'
                    }
                  }}
                  onMouseDown={(e) => {
                    if (!clickedBlocks.includes(index)) {
                      e.target.style.transform = 'translateY(2px)'
                      e.target.style.boxShadow = 'inset 0 3px 6px rgba(0, 0, 0, 0.7)'
                    }
                  }}
                  onMouseUp={(e) => {
                    if (!clickedBlocks.includes(index)) {
                      e.target.style.transform = 'translateY(-2px)'
                    }
                  }}
                >
                  {index === 0 ? 'TL' : 
                   index === 1 ? 'TM' : 
                   index === 2 ? 'TR' :
                   index === 3 ? 'ML' :
                   index === 4 ? 'C' :
                   index === 5 ? 'MR' :
                   index === 6 ? 'BL' :
                   index === 7 ? 'BM' : 'BR'}
                </button>
              ))}
            </div>
          </div>
        </div>
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
      )}

      {/* Status Modal */}
      {showStatusModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease-in'
        }}>
          <div style={{
            background: statusModalType === 'success' 
              ? 'rgba(68, 255, 68, 0.2)' 
              : 'rgba(255, 68, 68, 0.2)',
            border: statusModalType === 'success'
              ? '2px solid #44ff44'
              : '2px solid #ff4444',
            borderRadius: '15px',
            padding: '2rem',
            maxWidth: '500px',
            margin: '2rem',
            animation: 'fadeIn 1s ease-in'
          }}>
            <h3 style={{ 
              color: statusModalType === 'success' ? '#44ff44' : '#ff4444',
              marginBottom: '1rem', 
              textAlign: 'center',
              fontSize: '1.3rem'
            }}>
              {statusModalType === 'success' ? '✅ SURVEILLANCE PATTERN RECOGNIZED' : '❌ PATH SEQUENCE ERROR'}
            </h3>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: statusModalType === 'success'
                ? '1px solid rgba(68, 255, 68, 0.5)'
                : '1px solid rgba(255, 68, 68, 0.5)',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              <div className="terminal" style={{ 
                background: statusModalType === 'success' ? '#0a0a1a' : '#1a0a0a',
                border: statusModalType === 'success' ? '2px solid #6666ff' : '2px solid #ff4444',
                color: statusModalType === 'success' ? '#6666ff' : '#ff4444',
                padding: '1rem',
                borderRadius: '8px'
              }}>
                <div style={{ 
                  color: statusModalType === 'success' ? '#88aaff' : '#ffcccc', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem' 
                }}>
                  {statusModalType === 'success' ? 'SURVEILLANCE STATUS:' : 'SYSTEM ERROR:'}
                </div>
                <div style={{ lineHeight: '1.4' }}>
                  {statusModalType === 'success' ? (
                    <>
                      PATH SEQUENCE... {currentStep}/{correctSequence.length} STEPS<br />
                      NEURAL PATTERN... RECOGNIZED<br />
                      MEMORY ACCESS... GRANTED<br />
                      NEXT CHAMBER... UNLOCKING
                    </>
                  ) : (
                    <>
                      PATH SEQUENCE... {currentStep}/9 STEPS<br />
                      NEURAL PATTERN... ANALYZING<br />
                      MEMORY ACCESS... RESTRICTED<br />
                      NEXT CHAMBER... LOCKED
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cyberpunk Terminal Popup */}
      <CyberpunkTerminal
        isOpen={showTerminal}
        onComplete={handleTerminalComplete}
        title="SURVEILLANCE PATTERN DECODED"
        commands={[
          "Movement sequence verified...",
          "Neural pathways unlocked...",
          "Entering Chemical Lab..."
        ]}
      />
    </div>
  )
}

export default Room1
