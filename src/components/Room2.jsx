import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Room2 = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [showMemory, setShowMemory] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const correctAnswer = 'WHO AM I'

  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }
  }, [gameState.teamName, navigate])

  const handleSubmit = () => {
    const cleanAnswer = answer.trim().toLowerCase()
    const correctAnswerLower = correctAnswer.toLowerCase()
    
    if (cleanAnswer === correctAnswerLower || cleanAnswer === 'whoami') {
      updateGameState({ room2Phrase: answer })
      completeRoom(2)
      setShowMemory(true)
      
      setTimeout(() => {
        navigate('/room3')
      }, 3000)
    } else {
      setError('Surveillance logs corrupted. Try again.')
      setAnswer('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (showMemory) {
    return (
      <div className="room-container">
        <div className="memory-fragment">
          <h2 style={{ color: '#00ffff', marginBottom: '1rem' }}>MEMORY RECOVERED</h2>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
            "The voices... they were arguing about me. About what I'd become. 
            'This isn't science anymore!' someone shouted. But I couldn't stop. 
            I was so close to the breakthrough..."
          </p>
          <div className="loading" style={{ margin: '2rem auto' }}></div>
          <p>Accessing neural interface...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="room-container">      <div className="room-header">
        <h1 className="room-title">Room 2 — Surveillance</h1>
        {gameState.teamName && (
          <p style={{ fontSize: '1rem', color: '#44ff44', marginBottom: '1rem' }}>
            Team: <strong>{gameState.teamName}</strong>
          </p>
        )}
      </div>

      <div className="room-description">
        <p style={{ marginBottom: '2rem' }}>
          The next chamber is lined with monitors — dozens of them, all showing static except one. 
          As you approach, it flickers to life, displaying security footage from various angles of... you. 
          You, walking through these same halls. You, entering codes. You, strapped to that chair.
        </p>
        
        <p style={{ marginBottom: '2rem', fontStyle: 'italic', color: '#ff4444' }}>
          How long have you been here?
        </p>

        <div className="terminal" style={{ margin: '2rem auto' }}>
          <div className="terminal-text">
            SURVEILLANCE LOG RECOVERY... IN PROGRESS<br />
            TIMESTAMP: [CORRUPTED]<br />
            SUBJECT IDENTITY: [UNKNOWN]<br />
            <span style={{ color: '#ff4444' }}>
              DECRYPTION REQUIRED
            </span>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'rgba(0, 0, 0, 0.7)', 
        padding: '2rem', 
        borderRadius: '10px',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        margin: '2rem auto',
        maxWidth: '700px'
      }}>
        <h3 style={{ color: '#00ffff', marginBottom: '1.5rem', textAlign: 'center' }}>
          Encrypted Surveillance Log
        </h3>
        
        <div className="terminal" style={{ background: '#111', marginBottom: '2rem' }}>
          <div className="terminal-text" style={{ color: '#00ff00' }}>
            ENCRYPTED MESSAGE FOUND:<br />
            <br />
            XIR DN V?<br />
            <br />
            CIPHER KEY: REVERSE ALPHABET<br />
            A=Z, B=Y, C=X, D=W, E=V, F=U, G=T, H=S, I=R, J=Q, K=P, L=O, M=N<br />
            N=M, O=L, P=K, Q=J, R=I, S=H, T=G, U=F, V=E, W=D, X=C, Y=B, Z=A
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h4 style={{ color: '#00ffff', marginBottom: '1rem' }}>Instructions:</h4>
          <p style={{ marginBottom: '1.5rem' }}>
            The surveillance system recorded a critical question about your identity. 
            Decode the encrypted message using the reverse alphabet cipher.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#888' }}>
            Hint: Each letter is replaced by its reverse position in the alphabet (A↔Z, B↔Y, etc.)
          </p>
        </div>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          padding: '1.5rem', 
          borderRadius: '5px',
          marginBottom: '2rem',
          fontFamily: 'monospace',
          fontSize: '1.5rem',
          textAlign: 'center',
          letterSpacing: '3px',
          color: '#00ffff'
        }}>
          XIR DN V?
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <input
          type="text"
          className="input-field"
          value={answer}
          onChange={(e) => setAnswer(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="ENTER DECODED MESSAGE"
          style={{ 
            width: '300px', 
            fontSize: '1.2rem',
            letterSpacing: '2px'
          }}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button 
        className="btn" 
        onClick={handleSubmit}
        disabled={!answer.trim()}
        style={{ marginTop: '1rem' }}
      >
        Submit Answer
      </button>

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '500px' }}>
        <div className="terminal-prompt">DECRYPTION STATUS:</div>
        <div className="terminal-text">
          CIPHER TYPE... REVERSE ALPHABET<br />
          PROGRESS... {answer.length > 0 ? 'ANALYZING' : 'WAITING FOR INPUT'}<br />
          MEMORY CORE... LOCKED<br />
          NEXT SECTOR... STANDBY<br />
        </div>
      </div>

      <div style={{ 
        marginTop: '3rem', 
        fontSize: '0.9rem', 
        color: '#666',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '3rem auto 0'
      }}>
        <p>
          💡 Need help? Remember: In a reverse alphabet cipher, A becomes Z, B becomes Y, 
          and so on. Work through each letter of "XIR DN V?" step by step.
        </p>
      </div>
    </div>
  )
}

export default Room2
