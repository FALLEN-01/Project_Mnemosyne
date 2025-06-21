import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Room4 = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  const [selectedTranscript, setSelectedTranscript] = useState('')
  const [riddleAnswer, setRiddleAnswer] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState('')
  const [showMemory, setShowMemory] = useState(false)

  const transcriptOptions = [
    { id: 'A', text: 'me / preserved / decode' },
    { id: 'B', text: 'myself / erased / remember' },
    { id: 'C', text: 'them / blocked / forget' },
    { id: 'D', text: 'her / saved / control' }
  ]

  const correctTranscript = 'B'
  const correctRiddle = 'FOOTSTEPS'

  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }
  }, [gameState.teamName, navigate])

  const handleTranscriptSelect = (optionId) => {
    setSelectedTranscript(optionId)
    setError('')
  }

  const handleTranscriptSubmit = () => {
    if (selectedTranscript === correctTranscript) {
      setCurrentStep(2)
    } else {
      setError('Transcript reconstruction failed. Audio pattern mismatch. Try again.')
      setSelectedTranscript('')
    }
  }

  const handleRiddleSubmit = () => {
    const cleanAnswer = riddleAnswer.trim().toLowerCase()
    const correctAnswer = correctRiddle.toLowerCase()
    
    if (cleanAnswer === correctAnswer) {
      updateGameState({ room4Answer: riddleAnswer })
      completeRoom(4)
      setShowMemory(true)
        setTimeout(() => {
        navigate('/exit-hall')
      }, 3000)
    } else {
      setError('Security override failed. Incorrect response. Try again.')
      setRiddleAnswer('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentStep === 2) {
      handleRiddleSubmit()
    }
  }

  if (showMemory) {
    return (
      <div className="room-container">
        <div className="memory-fragment">
          <h2 style={{ color: '#00ffff', marginBottom: '1rem' }}>VOICE RECOGNIZED. MEMORY FRAGMENT RESTORED.</h2>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
            You hear your own voice — this time, clear:<br />
            "I wasn't supposed to become the subject. But no one else would do it. I had to forget to protect it.
            I had to protect them from the truth... from me."
          </p>
          <div className="loading" style={{ margin: '2rem auto' }}></div>
          <p>Accessing memory core...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="room-container">      <div className="room-header">
        <h1 className="room-title">Room 4 — The Containment Lab</h1>
      </div>

      <div className="room-description">
        <p style={{ marginBottom: '2rem' }}>
          The door slides open with a mechanical hiss. This room is colder. Darker. You see shattered 
          containment pods labeled "CONSCIOUS LOOP SIMULATION – FAILED." Screens line the wall, most 
          cracked or blacked out. One flickers to life.
        </p>
        
        <p style={{ marginBottom: '2rem', color: '#ff4444' }}>
          Your voice begins to play — scrambled, broken, unrecognizable. It's part of an audio log. 
          You step closer, heart pounding.
        </p>

        <div className="terminal" style={{ margin: '2rem auto' }}>
          <div className="terminal-text">
            RECOVERED FILE: Subject Log 47 – Transcript Incomplete<br />
            <span style={{ color: '#ff4444' }}>
              AUDIO RECONSTRUCTION REQUIRED
            </span>
          </div>
        </div>
      </div>

      {currentStep === 1 && (
        <div>
          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>
              Part A: Broken Transcript Reconstruction
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              Reconstruct the corrupted audio log by filling in the missing words.
            </p>
          </div>

          <div style={{ 
            background: 'rgba(0, 0, 0, 0.7)', 
            padding: '2rem', 
            borderRadius: '10px',
            border: '1px solid rgba(255, 68, 68, 0.3)',
            margin: '2rem auto',
            maxWidth: '600px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#ff4444', marginBottom: '2rem' }}>Distorted Transcript</h4>
            <div style={{ 
              fontSize: '1.3rem', 
              lineHeight: '2',
              fontFamily: 'monospace',
              color: '#00ffff'
            }}>
              I did this to <span style={{ color: '#ff4444', backgroundColor: 'rgba(255,68,68,0.2)' }}>___</span>.<br />
              The memory must be <span style={{ color: '#ff4444', backgroundColor: 'rgba(255,68,68,0.2)' }}>___</span>.<br />
              They can't be allowed to <span style={{ color: '#ff4444', backgroundColor: 'rgba(255,68,68,0.2)' }}>___</span> it.
            </div>
          </div>

          <div className="multiple-choice">
            <h4 style={{ color: '#00ffff', marginBottom: '1rem', textAlign: 'center' }}>
              Choose the correct set of missing words:
            </h4>
            {transcriptOptions.map((option) => (
              <div
                key={option.id}
                className={`choice-option ${selectedTranscript === option.id ? 'selected' : ''}`}
                onClick={() => handleTranscriptSelect(option.id)}
              >
                <strong>{option.id}.</strong> {option.text}
              </div>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="btn" 
            onClick={handleTranscriptSubmit}
            disabled={!selectedTranscript}
            style={{ marginTop: '2rem' }}
          >
            Reconstruct Transcript
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <div className="success-message">
            ✅ Transcript Reconstructed Successfully
          </div>

          <div style={{ 
            background: 'rgba(0, 255, 0, 0.1)', 
            padding: '2rem', 
            borderRadius: '10px',
            border: '1px solid rgba(0, 255, 0, 0.3)',
            margin: '2rem auto',
            maxWidth: '600px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#44ff44', marginBottom: '1rem' }}>Complete Transcript:</h4>
            <div style={{ 
              fontSize: '1.2rem', 
              lineHeight: '1.8',
              fontStyle: 'italic',
              color: '#e8e8e8'
            }}>
              "I did this to <strong style={{ color: '#00ffff' }}>myself</strong>.<br />
              The memory must be <strong style={{ color: '#00ffff' }}>erased</strong>.<br />
              They can't be allowed to <strong style={{ color: '#00ffff' }}>remember</strong> it."
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>
              Part B: Security Override
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              A glowing terminal flickers. The screen reads:
            </p>
          </div>

          <div className="terminal" style={{ margin: '2rem auto', maxWidth: '600px' }}>
            <div className="terminal-text">
              SECURITY OVERRIDE REQUIRED<br />
              Solve the riddle to initiate unlock protocol.<br />
              <br />
              <span style={{ color: '#00ffff', fontSize: '1.2rem' }}>
                🔐 RIDDLE:<br />
                "The more you take, the more you leave behind. What am I?"
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <input
              type="text"
              className="input-field"
              value={riddleAnswer}
              onChange={(e) => setRiddleAnswer(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="ENTER YOUR ANSWER"
              style={{ 
                width: '300px', 
                fontSize: '1.2rem'
              }}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="btn" 
            onClick={handleRiddleSubmit}
            disabled={!riddleAnswer.trim()}
            style={{ marginTop: '1rem' }}
          >
            Submit Answer
          </button>

          <div style={{ 
            marginTop: '3rem', 
            fontSize: '0.9rem', 
            color: '#666',
            textAlign: 'center',
            maxWidth: '500px',
            margin: '3rem auto 0'
          }}>
            <p>
              💡 Think about something physical that increases as you move, 
              but what you create stays behind you...
            </p>
          </div>
        </div>
      )}

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '500px' }}>
        <div className="terminal-prompt">CONTAINMENT STATUS:</div>
        <div className="terminal-text">
          RECONSTRUCTION... {currentStep}/2<br />
          TRANSCRIPT... {selectedTranscript ? 'ANALYZED' : 'CORRUPTED'}<br />
          SECURITY LEVEL... {currentStep === 2 ? 'OVERRIDE PENDING' : 'LOCKED'}<br />
          PODS STATUS... FAILED<br />
        </div>
      </div>
    </div>
  )
}

export default Room4
