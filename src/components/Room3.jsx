import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Room3 = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  const [selectedPattern, setSelectedPattern] = useState('')
  const [cipherAnswer, setCipherAnswer] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState('')
  const [showMemory, setShowMemory] = useState(false)

  const patterns = {
    A: { word: 'DAMAGE', description: 'Missing neural nodes in critical pathways' },
    B: { word: 'REGRESS', description: 'Reversed synaptic connections' },
    C: { word: 'FRAGMENT', description: 'Complete neural circuit pattern' }
  }

  const correctPattern = 'C'
  const correctCipher = 'FRAGMENTS ARE LETHAL'

  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }
  }, [gameState.teamName, navigate])

  const handlePatternSelect = (pattern) => {
    setSelectedPattern(pattern)
    setError('')
  }

  const handlePatternSubmit = () => {
    if (selectedPattern === correctPattern) {
      setCurrentStep(2)
    } else {
      setError('Neural pattern mismatch. Circuit overload detected. Try again.')
      setSelectedPattern('')
    }
  }

  const handleCipherSubmit = () => {
    const cleanAnswer = cipherAnswer.trim().toLowerCase()
    const correctAnswer = correctCipher.toLowerCase()
    
    if (cleanAnswer === correctAnswer) {
      updateGameState({ room3Word: patterns[correctPattern].word })
      completeRoom(3)
      setShowMemory(true)
      
      setTimeout(() => {
        navigate('/room4')
      }, 3000)
    } else {
      setError('Decryption failed. Memory fragments corrupted. Try again.')
      setCipherAnswer('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (currentStep === 1) {
        handlePatternSubmit()
      } else {
        handleCipherSubmit()
      }
    }
  }

  if (showMemory) {
    return (
      <div className="room-container">
        <div className="memory-fragment">
          <h2 style={{ color: '#00ffff', marginBottom: '1rem' }}>MEMORY SYNC RESTORED</h2>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
            "They said it was too dangerous. But I had to finish it.
            The mind isn't fragile — it's programmable. I proved it.
            And now... it's all breaking apart."
          </p>
          <div className="loading" style={{ margin: '2rem auto' }}></div>
          <p>Accessing containment protocols...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="room-container">      <div className="room-header">
        <h1 className="room-title">Room 3 — Neural Sync</h1>
      </div>

      <div className="room-description">
        <p style={{ marginBottom: '2rem' }}>
          The air buzzes with static. You enter a room lined with holographic brain scans — flickering 
          blue and red, pulsing like they're alive. You approach a neural interface console labeled:
        </p>
        
        <div className="terminal" style={{ margin: '2rem auto' }}>
          <div className="terminal-text">
            MNEMO-SYNC v3.4 — Synchronization Failed<br />
            <span style={{ color: '#ff4444' }}>
              WARNING: NEURAL PATTERN CORRUPTION DETECTED
            </span>
          </div>
        </div>

        <p style={{ marginBottom: '2rem', fontStyle: 'italic', color: '#888' }}>
          As you step closer, a wave of nausea hits you. For a split second, you're somewhere else — 
          standing in a white room, voices yelling...
        </p>

        <div style={{ 
          background: 'rgba(255, 68, 68, 0.1)', 
          padding: '1.5rem', 
          borderRadius: '10px',
          border: '1px solid rgba(255, 68, 68, 0.3)',
          marginBottom: '2rem',
          fontStyle: 'italic'
        }}>
          <p>"This violates every ethical code we've sworn to uphold!"</p>
          <p>"You can't do this!"</p>
          <p style={{ color: '#00ffff' }}>"I won't let them stop me... I have to finish it."</p>
        </div>

        <p style={{ color: '#ff4444' }}>
          Your head throbs. Were those your memories?
        </p>
      </div>

      {currentStep === 1 && (
        <div>
          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>
              Part 1: Neural Pattern Analysis
            </h3>
            <p style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              The interface shows three neural circuit patterns. Only one pattern leads to a full memory sync. 
              The others cause overload.
            </p>
          </div>

          <div className="puzzle-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '900px' }}>
            {Object.entries(patterns).map(([key, pattern]) => (
              <div 
                key={key}
                className={`puzzle-item ${selectedPattern === key ? 'selected' : ''}`}
                onClick={() => handlePatternSelect(key)}
                style={{ cursor: 'pointer' }}
              >
                <h3>Pattern {key}</h3>
                <div style={{ 
                  fontSize: '3rem', 
                  margin: '1rem 0',
                  color: key === 'A' ? '#ff4444' : key === 'B' ? '#ffaa44' : '#44ff44'
                }}>
                  {key === 'A' ? '🧠❌' : key === 'B' ? '🔄🧠' : '🧠✨'}
                </div>
                <p style={{ fontSize: '0.9rem' }}>{pattern.description}</p>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.5rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  color: '#00ffff'
                }}>
                  → {pattern.word}
                </div>
              </div>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="btn" 
            onClick={handlePatternSubmit}
            disabled={!selectedPattern}
            style={{ marginTop: '2rem' }}
          >
            Sync Neural Pattern
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <div className="success-message">
            ✅ Neural Pattern Synchronized: {patterns[correctPattern].word}
          </div>

          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>
              Part 2: Decode Corrupted Message
            </h3>            <p style={{ marginBottom: '2rem' }}>
              A corrupted memory fragment has been unlocked. Decode the message.
            </p>
          </div>

          <div style={{ 
            background: 'rgba(0, 0, 0, 0.7)', 
            padding: '2rem', 
            borderRadius: '10px',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            margin: '2rem auto',
            maxWidth: '600px'
          }}>
            <div className="terminal" style={{ marginBottom: '2rem' }}>
              <div className="terminal-text">
                MNEMO-SYNC OUTPUT: CORRUPTED MESSAGE DETECTED<br />                <br />
                <span style={{ fontSize: '1.5rem', color: '#ff4444', letterSpacing: '2px' }}>
                  Iudphqwv duh ohwkdov.
                </span><br />
                <br />
                CIPHER KEY: SHIFT +3
              </div>
            </div>            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '1rem', color: '#888' }}>
                Decode the encrypted neural sync message.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <input
              type="text"
              className="input-field"
              value={cipherAnswer}
              onChange={(e) => setCipherAnswer(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="ENTER DECODED MESSAGE"
              style={{ 
                width: '400px', 
                fontSize: '1.1rem'
              }}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="btn" 
            onClick={handleCipherSubmit}
            disabled={!cipherAnswer.trim()}
            style={{ marginTop: '1rem' }}
          >
            Submit Decoded Message
          </button>
        </div>
      )}

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '500px' }}>
        <div className="terminal-prompt">NEURAL INTERFACE STATUS:</div>
        <div className="terminal-text">
          SYNC STAGE... {currentStep}/2<br />
          PATTERN MATCH... {selectedPattern ? 'SELECTED' : 'PENDING'}<br />
          MEMORY CORE... {currentStep === 2 ? 'DECRYPTING' : 'LOCKED'}<br />
          FRAGMENTATION... CRITICAL<br />
        </div>
      </div>
    </div>
  )
}

export default Room3
