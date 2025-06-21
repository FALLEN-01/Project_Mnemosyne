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
    >      <div className="room-header">        <h1 className="room-title" style={{ color: '#44ff44', fontSize: '3rem' }}>
          🔐 ROOM 1
MEMORY RECOVERY LAB
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#00ffff', marginBottom: '1rem' }}>
          SECURITY CLEARANCE: LEVEL 1 RESTRICTED
        </p>
      </div>      <div className="room-description" style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: '#44ff44', marginBottom: '1.5rem', fontSize: '1.6rem' }}>
          🧬 Neural Pattern Analysis Required
        </h2>
        
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '600px' }}>
          You step into the Memory Recovery Laboratory. The walls are lined with broken containment pods 
          and flickering neural interface equipment. A central console displays fragments of your past — 
          scattered images that don't quite make sense yet.
        </p><div style={{ 
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <p style={{ marginBottom: '2rem', fontSize: '1rem', textAlign: 'center', maxWidth: '600px' }}>
            These manga panels contain fragments of your lost identity. Study each image carefully to unlock your memories.
          </p>
          
          {/* Manga images with fade-in effect */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: '100%',
            maxWidth: '800px',
            alignItems: 'center'
          }} className="manga-sequence">            
            {/* Manga Image 1 */}
            <div style={{ 
              width: '100%',
              maxWidth: '600px',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '0.2s'
            }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍👩‍👧</div>
              </div>
            </div>

            {/* Manga Image 2 */}
            <div style={{ 
              width: '100%',
              maxWidth: '600px',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '0.6s'
            }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ff4444' }}>07</div>
              </div>
            </div>

            {/* Manga Image 3 */}
            <div style={{ 
              width: '100%',
              maxWidth: '600px',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '1.0s'
            }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ff4444' }}>❌</div>
              </div>
            </div>

            {/* Manga Image 4 */}
            <div style={{ 
              width: '100%',
              maxWidth: '600px',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '1.4s'
            }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#00ffff' }}>04</div>
              </div>
            </div>
          </div>
        </div>        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '3rem',
          width: '100%'
        }}>
          <h3 style={{ color: '#00ffff', marginBottom: '1.5rem', textAlign: 'center' }}>🧮 NEURAL SEQUENCE PUZZLE</h3>
          <p style={{ marginBottom: '2rem', textAlign: 'center', maxWidth: '600px' }}>
            The memory fragments contain numeric elements. Enter the 4-digit sequence to unlock the next memory layer.
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
      </button>      <div className="terminal" style={{ 
        color: '#44ff44',
        border: '1px solid #44ff44',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
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
