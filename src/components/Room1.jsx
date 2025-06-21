import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Room1 = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  const [code, setCode] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [showMemory, setShowMemory] = useState(false)

  const correctCode = '3704'

  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }
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
          <h2 style={{ color: '#00ffff', marginBottom: '1rem' }}>MEMORY RECOVERED</h2>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
            "The chair... I remember the chair. Leather straps. The taste of copper in my mouth.
            Someone screaming... was that me?"
          </p>
          <div className="loading" style={{ margin: '2rem auto' }}></div>
          <p>Accessing next sector...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="room-container">      <div className="room-header">
        <h1 className="room-title">Room 1 — The Awakening</h1>
        {gameState.teamName && (
          <p style={{ fontSize: '1rem', color: '#44ff44', marginBottom: '1rem' }}>
            Team: <strong>{gameState.teamName}</strong>
          </p>
        )}
      </div>

      <div className="room-description">
        <p>
          You stumble into the next chamber — cold metal walls, surgical lights overhead, and a flickering 
          monitor in the corner. A tablet lies on a desk. Next to it: a cracked mirror, a bloodstained 
          journal page, a childhood photo, and a map of somewhere you don't recognize.
        </p>
        
        <div className="terminal" style={{ margin: '2rem auto' }}>
          <div className="terminal-text">
            VERIFICATION REQUIRED. IDENTITY COMPROMISED.<br />
            <span style={{ color: '#ff4444' }}>
              Put the memories in the right order. Only truth will unlock the path ahead.
            </span>
          </div>
        </div>
      </div>

      <div className="puzzle-grid">
        <div className="puzzle-item">
          <h3>📸 Family Photo</h3>
          <p>A faded photograph showing three people standing together. Their faces are partially obscured, but you can make out the silhouettes clearly.</p>
          <div style={{ fontSize: '2rem', margin: '1rem 0', color: '#00ffff' }}>👨‍👩‍👧</div>
        </div>

        <div className="puzzle-item">
          <h3>📄 Journal Page</h3>
          <p>A torn page from a research journal. Most of the text is illegible, but page number "07" is circled in red ink.</p>
          <div style={{ fontSize: '2rem', margin: '1rem 0', color: '#ff4444' }}>07</div>
        </div>

        <div className="puzzle-item">
          <h3>🗺️ Desert Map</h3>
          <p>An old topographical map of a desert region. There's a single red "X" marked in the center, with coordinates that seem familiar somehow.</p>
          <div style={{ fontSize: '2rem', margin: '1rem 0', color: '#ff4444' }}>❌</div>
        </div>

        <div className="puzzle-item">
          <h3>⏱️ Timer Screen</h3>
          <p>A digital display showing a countdown timer, frozen at a specific moment. The numbers glow ominously in the dim light.</p>
          <div style={{ fontSize: '2rem', margin: '1rem 0', color: '#00ffff' }}>00:04</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '3rem 0' }}>
        <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>Puzzle Instructions</h3>
        <p style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          You must reassemble your identity through fragments of memory.
          Count the clues hidden in the images. Enter the 4-digit code in the form below.
        </p>
        
        <div style={{ background: 'rgba(0, 255, 255, 0.1)', padding: '1.5rem', borderRadius: '10px', marginBottom: '2rem' }}>
          <h4 style={{ color: '#00ffff', marginBottom: '1rem' }}>Hints:</h4>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>Number of people in the photo</li>
            <li>Number on the journal page</li>
            <li>How many "X" marks on the map</li>
            <li>What number appears on the timer?</li>
          </ul>
        </div>
      </div>

      <div className="code-input">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            className="code-digit"
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            maxLength={1}
          />
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      <button 
        className="btn" 
        onClick={handleSubmit}
        disabled={code.join('').length !== 4}
        style={{ marginTop: '2rem' }}
      >
        Enter Code
      </button>

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '400px' }}>
        <div className="terminal-prompt">SYSTEM LOG:</div>
        <div className="terminal-text">
          NEURAL PATTERN... ANALYZING<br />
          MEMORY FRAGMENTS... {code.join('').length}/4<br />
          ACCESS LEVEL... RESTRICTED<br />
        </div>
      </div>
    </div>
  )
}

export default Room1
