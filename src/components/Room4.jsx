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
  const correctRiddle = 'FOOTPRINTS'

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
    
    if (cleanAnswer === correctAnswer) {      updateGameState({ room4Answer: riddleAnswer })
      completeRoom(4)
      setShowMemory(true)
      setTimeout(() => {
        navigate('/exit-hall')
      }, 3000) // Navigate to exit hall after showing lockdown message
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
      <div className="room-container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem 1rem'
      }}>
        <div className="memory-fragment" style={{
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{ 
            color: '#44ff44', 
            marginBottom: '2rem', 
            fontSize: '2rem',
            textAlign: 'center'
          }}>
            🔓 FACILITY LOCKDOWN DISENGAGED
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '2rem', 
            color: '#44ff44',
            textAlign: 'center'
          }}>
            Security doors unlocking... Emergency systems disabled...
          </p>
          
          <div className="loading" style={{ margin: '2rem auto' }}></div>
          <p style={{ textAlign: 'center' }}>Accessing final exit...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="room-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textAlign: 'center',
      padding: '2rem 1rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    }}>
      <div className="room-header">
        <h1 className="room-title">Room 4 — The Containment Lab</h1>
      </div>      <div className="room-description" style={{
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <p style={{ 
          marginBottom: '2rem',
          fontSize: '1.1rem',
          lineHeight: '1.6'
        }}>
          The door slides open with a mechanical hiss. This room is colder. Darker.<br />
          You see shattered containment pods labeled "CONSCIOUS LOOP SIMULATION – FAILED."<br />
          Screens line the wall, most cracked or blacked out. One flickers to life.
        </p>
        
        {/* Containment Lab Images */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          width: '100%',
          maxWidth: '600px',
          alignItems: 'center',
          margin: '2rem auto'
        }}>
          {/* Lab Image 1 - Remove brain emoji, keep only containment pod */}
          <div style={{ 
            width: '100%',
            maxWidth: '500px',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            opacity: 1,
            transition: 'all 0.8s ease-in-out'
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
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ff4444' }}>🧪</div>
            </div>
          </div>

          {/* Lab Image 2 */}
          <div style={{ 
            width: '100%',
            maxWidth: '500px',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            opacity: 1,
            transition: 'all 0.8s ease-in-out'
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
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#00ffff' }}>💾</div>
            </div>
          </div>
        </div>
        
        <p style={{ 
          marginBottom: '2rem', 
          color: '#ff4444',
          fontSize: '1.1rem',
          lineHeight: '1.6'
        }}>
          Your voice begins to play — scrambled, broken, unrecognizable.<br />
          It's part of an audio log. You step closer, heart pounding.
        </p>

        <div className="terminal" style={{ 
          margin: '2rem auto',
          maxWidth: '600px'
        }}>
          <div className="terminal-text">
            RECOVERED FILE: Subject Log 47 – Transcript Incomplete<br />
            <span style={{ color: '#ff4444' }}>
              AUDIO RECONSTRUCTION REQUIRED
            </span>
          </div>
        </div>
      </div>      {currentStep === 1 && (
        <div style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>
              Part A: Broken Transcript Reconstruction
            </h3>
            <p style={{ marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.5' }}>
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
              fontSize: '1.2rem', 
              lineHeight: '2',
              fontFamily: 'monospace',
              color: '#00ffff'
            }}>
              I did this to <span style={{ color: '#ff4444', backgroundColor: 'rgba(255,68,68,0.2)' }}>___</span>.<br />
              The memory must be <span style={{ color: '#ff4444', backgroundColor: 'rgba(255,68,68,0.2)' }}>___</span>.<br />
              They can't be allowed to <span style={{ color: '#ff4444', backgroundColor: 'rgba(255,68,68,0.2)' }}>___</span> it.
            </div>
          </div>

          <div className="multiple-choice" style={{ maxWidth: '600px', margin: '0 auto' }}>
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
      )}      {currentStep === 2 && (
        <div style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
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
              fontSize: '1.1rem', 
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
            <p style={{ marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.5' }}>
              A glowing terminal flickers. The screen reads:
            </p>
          </div>

          <div className="terminal" style={{ 
            margin: '2rem auto', 
            maxWidth: '600px'
          }}>
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
                width: '100%',
                maxWidth: '300px',
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
        </div>
      )}      <div className="terminal" style={{ 
        marginTop: '3rem', 
        maxWidth: '500px',
        margin: '3rem auto 0 auto'
      }}>
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
