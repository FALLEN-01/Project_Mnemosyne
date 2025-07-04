import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'
import CyberpunkTerminal from './CyberpunkTerminal'

// DEVELOPER NOTES - VISUAL & SOUND (Chemical Containment):
// - Cyan/Red color palette - cold chemical lab with danger warnings
// - Glass canisters lining walls, one dramatically shattered with glowing fluid trails
// - Ambient sound: liquid drips, gas hissing, occasional glass tinkling
// - QR vials should glow faintly with different colored chemical reactions
// - Molecular matching interface: holographic/AR-style floating symbols
// - Retinal scanner: blue scanning beam effect with iris recognition animation
// - Locked cabinet should have warning lights and biohazard symbols
// - Success: mechanical hiss of pressure release, cabinet opening sound

const Room2 = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [showMemory, setShowMemory] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [selectedVials, setSelectedVials] = useState([])
  const [showRetinalScan, setShowRetinalScan] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [statusModalType, setStatusModalType] = useState('') // 'success' or 'error'
  const [showTerminal, setShowTerminal] = useState(false)

  // Chemical containment puzzle: 7R4UM4
  const correctCode = '7R4UM4'

  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }

    // Fade in effect
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [gameState.teamName, navigate])

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value.toUpperCase()
      setCode(newCode)
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`chem-code-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
      
      // Check if complete and correct
      const fullCode = newCode.join('')
      if (fullCode.length === 6 && fullCode === correctCode) {
        setShowRetinalScan(true)
      }
    }
  }

  const handleRetinalScan = () => {
    setShowTerminal(true)
  }

  const handleTerminalComplete = () => {
    updateGameState({ room2Code: correctCode })
    completeRoom(2)
    setShowTerminal(false)
    setShowMemory(true)
    
    setTimeout(() => {
      navigate('/room3')
    }, 3000)
  }

  const handleSubmit = () => {
    const enteredCode = code.join('')
    
    if (enteredCode.length !== 6) {
      setError('Please enter the complete 6-character code')
      return
    }

    if (enteredCode === correctCode) {
      // Success - show modal first, then retinal scan
      setStatusModalType('success')
      setShowStatusModal(true)
      setError('')
      
      setTimeout(() => {
        setShowStatusModal(false)
        setTimeout(() => {
          setShowRetinalScan(true)
        }, 500)
      }, 3000)
    } else {
      // Error - show modal
      setStatusModalType('error')
      setShowStatusModal(true)
      setCode(['', '', '', '', '', ''])
      
      setTimeout(() => {
        setShowStatusModal(false)
        setError('')
      }, 2000)
    }
  }

  if (showMemory) {
    return (
      <div className="room-container">
        <div className="memory-fragment">
          <h2 style={{ color: '#00ffff', marginBottom: '1rem' }}>CHEMICAL CONTAINMENT BREACH DETECTED</h2>
          <div style={{ 
            background: 'rgba(0, 255, 255, 0.1)', 
            padding: '1.5rem', 
            borderRadius: '15px',
            border: '2px solid rgba(0, 255, 255, 0.3)',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ color: '#ff6666', marginBottom: '1rem', fontSize: '1rem' }}>🧪 EMERGENCY PROTOCOL ACTIVATED</h3>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              The cabinet hisses open, releasing a cloud of vapor. Inside, research notes scatter in the artificial wind. 
              "IN CASE OF IDENTITY COLLAPSE" - the words burn into your vision. What were you trying to forget?
            </p>

          </div>
          <div className="loading" style={{ margin: '1.5rem auto' }}></div>
          <p>Accessing Archive Systems...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`room-container ${showContent ? 'fade-in' : ''}`}
      style={{ 
        background: 'linear-gradient(135deg, #0a1a1a 0%, #1a2e2e 50%, #2e4a4a 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="room-header">
        <h1 className="room-title" style={{ color: '#00cccc' }}>
          ROOM 2 - CHEMICAL CONTAINMENT
        </h1>
        <p className="room-subtitle" style={{ color: '#ff6666', marginBottom: '1rem' }}>
          BIOHAZARD LEVEL 4 - IDENTITY COLLAPSE PROTOCOL ACTIVE
        </p>
      </div>

      <div className="room-description room-puzzle-container" style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{ 
          background: 'rgba(0, 204, 204, 0.1)', 
          padding: '1.5rem', 
          borderRadius: '15px',
          border: '2px solid rgba(0, 204, 204, 0.3)',
          marginBottom: '2rem',
          maxWidth: '100%',
          width: '100%'
        }}>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            You pass into a colder chamber. Glass canisters line the wall — one shattered. 
            The fluid trails across the floor, glowing faintly with an unnatural cyan light.
          </p>
          <div style={{ 
            background: 'rgba(255, 102, 102, 0.2)', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1rem',
            fontFamily: 'Courier New, monospace',
            border: '2px solid rgba(255, 102, 102, 0.4)'
          }}>
            <p style={{ color: '#ff6666', fontWeight: 'bold' }}>🚨 LOCKED CABINET DISPLAY:</p>
            <p style={{ color: '#ffcccc' }}>"IN CASE OF IDENTITY COLLAPSE – INJECT CODE: 7R4UM4"</p>
          </div>
        </div>
        
        <h2 style={{ color: '#00cccc', marginBottom: '1.5rem' }}>
          QR-CODED VIAL ANALYSIS
        </h2>
        <div style={{ 
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <p style={{ marginBottom: '2rem', textAlign: 'center', width: '100%' }}>
            You find 3 QR-coded vials. A digital panel asks for molecular matching. 
            By aligning molecular shapes and symbols, build the emergency access code.
          </p>
          
          {/* QR-Coded Vials - Side by Side Layout */}
          <div className="vial-grid" style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 2rem)',
            flexWrap: 'wrap',
            width: '100%',
            maxWidth: '900px',
            marginBottom: '2rem'
          }}>
            {/* Vial 1 */}
            <div style={{ 
              background: 'rgba(0, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: 'clamp(1rem, 2vw, 1.5rem)',
              border: '2px solid rgba(0, 255, 255, 0.4)',
              textAlign: 'center',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '0.3s',
              flex: '1',
              minWidth: '250px',
              maxWidth: '280px'
            }}>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>🧪</div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>VIAL ALPHA</h4>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                padding: 'clamp(0.3rem, 1vw, 0.5rem)',
                borderRadius: '5px',
                marginBottom: '0.5rem',
                fontFamily: 'Courier New, monospace',
                fontSize: 'clamp(0.5rem, 1.5vw, 0.7rem)',
                color: '#000',
                lineHeight: '1.2'
              }}>
                ████████<br/>
                █    █ █<br/>
                █ ██ █ █<br/>
                █    █ █<br/>
                ████████
              </div>
              <p style={{ fontSize: '1.2rem', color: '#00ffff', fontWeight: 'bold' }}>7</p>
            </div>

            {/* Vial 2 */}
            <div style={{ 
              background: 'rgba(255, 102, 102, 0.1)',
              borderRadius: '15px',
              padding: 'clamp(1rem, 2vw, 1.5rem)',
              border: '2px solid rgba(255, 102, 102, 0.4)',
              textAlign: 'center',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '0.6s',
              flex: '1',
              minWidth: '250px',
              maxWidth: '280px'
            }}>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>🧪</div>
              <h4 style={{ color: '#ff6666', marginBottom: '0.5rem' }}>VIAL BETA</h4>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                padding: 'clamp(0.3rem, 1vw, 0.5rem)',
                borderRadius: '5px',
                marginBottom: '0.5rem',
                fontFamily: 'Courier New, monospace',
                fontSize: 'clamp(0.5rem, 1.5vw, 0.7rem)',
                color: '#000',
                lineHeight: '1.2'
              }}>
                ████████<br/>
                █ ██   █<br/>
                █ █  █ █<br/>
                █   ██ █<br/>
                ████████
              </div>
              <p style={{ fontSize: '1.2rem', color: '#ff6666', fontWeight: 'bold' }}>R4UM4</p>
            </div>

            {/* Vial 3 */}
            <div style={{ 
              background: 'rgba(102, 255, 102, 0.1)',
              borderRadius: '15px',
              padding: 'clamp(1rem, 2vw, 1.5rem)',
              border: '2px solid rgba(102, 255, 102, 0.4)',
              textAlign: 'center',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '0.9s',
              flex: '1',
              minWidth: '250px',
              maxWidth: '280px'
            }}>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>🧪</div>
              <h4 style={{ color: '#66ff66', marginBottom: '0.5rem' }}>VIAL GAMMA</h4>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                padding: 'clamp(0.3rem, 1vw, 0.5rem)',
                borderRadius: '5px',
                marginBottom: '0.5rem',
                fontFamily: 'Courier New, monospace',
                fontSize: 'clamp(0.5rem, 1.5vw, 0.7rem)',
                color: '#000',
                lineHeight: '1.2'
              }}>
                ████████<br/>
                █  ██  █<br/>
                █ █  █ █<br/>
                █  ██  █<br/>
                ████████
              </div>
              <p style={{ fontSize: '1.2rem', color: '#66ff66', fontWeight: 'bold' }}>COMPLETE</p>
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '3rem',
          width: '100%'
        }}>
          <h3 style={{ color: '#00cccc', marginBottom: '1.5rem', textAlign: 'center' }}>MOLECULAR SEQUENCE INPUT</h3>
          <div style={{ 
            background: 'rgba(0, 204, 204, 0.1)', 
            padding: '1.5rem', 
            borderRadius: '10px',
            border: '1px solid rgba(0, 204, 204, 0.3)',
            maxWidth: '100%',
            width: '100%',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>
              Combine the molecular sequences from all three vials to build the emergency access code.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#ffcc88' }}>
              Enter the complete 6-character sequence: 7R4UM4
            </p>
          </div>

          {/* 6-character code input */}
          <div className="code-input-container" style={{ 
            marginBottom: '2rem'
          }}>
            {code.map((char, index) => (
              <input
                key={index}
                id={`chem-code-${index}`}
                type="text"
                value={char}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                maxLength={1}
                style={{
                  width: 'clamp(40px, 8vw, 60px)',
                  height: 'clamp(40px, 8vw, 60px)',
                  background: 'rgba(0, 204, 204, 0.2)',
                  border: '2px solid rgba(0, 204, 204, 0.5)',
                  color: '#00cccc',
                  textAlign: 'center',
                  borderRadius: '8px',
                  fontFamily: 'Courier New, monospace',
                  fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                  fontWeight: 'bold',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#00cccc'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0, 204, 204, 0.5)'}
              />
            ))}
          </div>

          {/* Retinal Scanner */}
          {showRetinalScan && (
            <div style={{
              background: 'rgba(0, 204, 204, 0.1)',
              border: '2px solid rgba(0, 204, 204, 0.4)',
              borderRadius: '15px',
              padding: '2rem',
              textAlign: 'center',
              animation: 'fadeIn 0.8s ease-in-out',
              marginBottom: '2rem'
            }}>
              <h4 style={{ color: '#00cccc', marginBottom: '1rem' }}>🔬 RETINAL SCAN REQUIRED</h4>
              <div style={{
                width: 'clamp(100px, 20vw, 150px)',
                height: 'clamp(100px, 20vw, 150px)',
                borderRadius: '50%',
                border: '3px solid #00cccc',
                margin: '1rem auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(0,204,204,0.1) 0%, transparent 70%)',
                animation: 'pulse 2s infinite'
              }}>
                <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>👁️</div>
              </div>
              <p style={{ marginBottom: '1.5rem', color: '#cccccc' }}>
                Access code verified. Initiating biometric confirmation...
              </p>
              <button 
                className="btn"
                onClick={handleRetinalScan}
                style={{
                  background: 'linear-gradient(45deg, #00cccc, #008888)',
                  color: '#fff',
                  fontSize: '1.1rem',
                  padding: '1rem 2rem'
                }}
              >
                🔓 Activate Retinal Scanner
              </button>
            </div>
          )}
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

      {!showRetinalScan && (
        <button 
          className="btn" 
          onClick={handleSubmit}
          disabled={code.join('').length !== 6}
          style={{
            background: code.join('').length === 6 
              ? 'linear-gradient(45deg, #00cccc, #008888)' 
              : '#333',
            color: code.join('').length === 6 ? '#fff' : '#666',
            cursor: code.join('').length === 6 ? 'pointer' : 'not-allowed',
            marginTop: '1rem'
          }}
        >
          VERIFY MOLECULAR SEQUENCE
        </button>
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
              ? 'rgba(0, 255, 255, 0.2)' 
              : 'rgba(255, 68, 68, 0.2)',
            border: statusModalType === 'success'
              ? '2px solid #00ffff'
              : '2px solid #ff4444',
            borderRadius: '15px',
            padding: '2rem',
            margin: '2rem',
            animation: 'fadeIn 1s ease-in'
          }}>
            <h3 style={{ 
              color: statusModalType === 'success' ? '#00ffff' : '#ff4444',
              marginBottom: '1rem', 
              textAlign: 'center',
              fontSize: '1.3rem'
            }}>
              {statusModalType === 'success' ? '✅ MOLECULAR SEQUENCE VERIFIED' : '❌ CONTAINMENT BREACH'}
            </h3>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: statusModalType === 'success'
                ? '1px solid rgba(0, 255, 255, 0.5)'
                : '1px solid rgba(255, 68, 68, 0.5)',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              <div className="terminal" style={{ 
                background: statusModalType === 'success' ? '#0a1a1a' : '#1a0a0a',
                border: statusModalType === 'success' ? '2px solid #00ffff' : '2px solid #ff4444',
                color: statusModalType === 'success' ? '#00ffff' : '#ff4444',
                padding: '1rem',
                borderRadius: '8px'
              }}>
                <div style={{ 
                  color: statusModalType === 'success' ? '#66ffff' : '#ffcccc', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem' 
                }}>
                  {statusModalType === 'success' ? 'FACILITY STATUS:' : 'CONTAINMENT ERROR:'}
                </div>
                <div style={{ lineHeight: '1.4' }}>
                  {statusModalType === 'success' ? (
                    <>
                      KEYPAD... ACTIVE<br />
                      ACCESS CODE... VERIFIED<br />
                      RETINAL SCAN... REQUIRED<br />
                      NEXT CHAMBER... UNLOCKING
                    </>
                  ) : (
                    <>
                      KEYPAD... ACTIVE<br />
                      ACCESS CODE... DENIED<br />
                      MOLECULAR SEQUENCE... MISALIGNED<br />
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
        title="CHEMICAL SEQUENCE ANALYZED"
        commands={[
          "Activating retinal scanner...",
          "Molecular structure verified...",
          "Accessing archive level...",
        ]}
      />
    </div>
  )
}

export default Room2
