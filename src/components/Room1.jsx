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
          <h2 style={{ color: '#00ffff', marginBottom: '1rem' }}>🧠 MEMORY FRAGMENT RECOVERED</h2>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '2rem' }}>
            "The chair... I remember the chair. Leather straps. The taste of copper in my mouth.
            Someone screaming... was that me? The experiments... they were real."
          </p>
          <div className="loading" style={{ margin: '2rem auto' }}></div>
          <p>Accessing next memory sector...</p>
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
        </p>

        <div style={{ 
          background: 'rgba(68, 255, 68, 0.1)', 
          padding: '2rem', 
          borderRadius: '15px',
          border: '2px solid rgba(68, 255, 68, 0.3)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#44ff44', marginBottom: '1rem' }}>🔍 MEMORY FRAGMENTS DETECTED:</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '1.5rem',
            marginTop: '1.5rem'
          }}>
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(68, 255, 68, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👨‍👩‍👧</div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Family Photo</h4>
              <p style={{ fontSize: '0.9rem' }}>Three people standing together</p>
            </div>

            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(68, 255, 68, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ff4444' }}>07</div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Journal Entry</h4>
              <p style={{ fontSize: '0.9rem' }}>Page number circled in red</p>
            </div>

            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(68, 255, 68, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ff4444' }}>❌</div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Location Marker</h4>
              <p style={{ fontSize: '0.9rem' }}>Single X on the map</p>
            </div>

            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(68, 255, 68, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#00ffff' }}>04</div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Timer Display</h4>
              <p style={{ fontSize: '0.9rem' }}>Countdown frozen at final seconds</p>
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
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '1rem', 
        margin: '3rem 0',
        flexWrap: 'wrap'
      }}>
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            maxLength={1}
            style={{
              width: '80px',
              height: '80px',
              background: 'rgba(0, 0, 0, 0.7)',
              border: '2px solid rgba(68, 255, 68, 0.5)',
              color: '#44ff44',
              fontSize: '2rem',
              textAlign: 'center',
              borderRadius: '10px',
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
      )}

      <button 
        onClick={handleSubmit}
        disabled={code.join('').length !== 4}
        style={{
          background: code.join('').length === 4 
            ? 'linear-gradient(45deg, #44ff44, #22aa22)' 
            : '#333',
          color: code.join('').length === 4 ? '#000' : '#666',
          border: 'none',
          padding: '1.2rem 2.5rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          borderRadius: '8px',
          cursor: code.join('').length === 4 ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease',
          marginTop: '1rem'
        }}
      >
        🔓 UNLOCK MEMORY
      </button>

      <div style={{ 
        background: '#000',
        color: '#44ff44',
        fontFamily: 'Courier New, monospace',
        padding: '2rem',
        borderRadius: '10px',
        margin: '3rem auto 0',
        border: '1px solid #44ff44',
        maxWidth: '600px',
        fontSize: '1rem'
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
