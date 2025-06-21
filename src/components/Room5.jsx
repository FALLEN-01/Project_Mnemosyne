import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Room5 = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  const [answers, setAnswers] = useState({
    room1: '',
    room2: '',
    room3: '',
    room4: ''
  })
  const [finalAnswer, setFinalAnswer] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState('')
  const [showFinalReveal, setShowFinalReveal] = useState(false)

  const correctAnswers = {
    room1: '3704',
    room2: 'WHO AM I',
    room3: 'FRAGMENT',
    room4: 'FOOTSTEPS'
  }

  const handleAnswersSubmit = () => {
    const isCorrect = Object.keys(correctAnswers).every(room => {
      const userAnswer = answers[room].trim().toUpperCase()
      const correctAnswer = correctAnswers[room].toUpperCase()
      return userAnswer === correctAnswer || 
             (room === 'room2' && userAnswer === 'WHOAMI') ||
             (room === 'room3' && userAnswer === 'FRAGMENTS')
    })

    if (isCorrect) {
      setCurrentStep(2)
      setError('')
    } else {
      setError('Memory sequence mismatch. One or more answers are incorrect. Review your journey.')
    }
  }

  const handleFinalSubmit = () => {
    const cleanAnswer = finalAnswer.trim().toLowerCase()
    const validAnswers = [
      'lead scientist',
      'myself',
      'i am the lead scientist',
      'i did this to myself',
      'dr',
      'scientist',
      'the scientist',
      'i am the scientist'
    ]

    const isValid = validAnswers.some(valid => 
      cleanAnswer === valid || cleanAnswer.includes('scientist') || cleanAnswer.includes('myself')
    )

    if (isValid) {
      updateGameState({ 
        endTime: new Date(),
        finalAnswer: finalAnswer
      })
      completeRoom(5)
      setShowFinalReveal(true)
        setTimeout(() => {
        navigate('/completion')
      }, 5000)
    } else {
      setError('Identity verification failed. Think about who initiated Project Mnemosyne.')
      setFinalAnswer('')
    }
  }

  const handleAnswerChange = (room, value) => {
    setAnswers(prev => ({ ...prev, [room]: value }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (currentStep === 1) {
        handleAnswersSubmit()
      } else {
        handleFinalSubmit()
      }
    }
  }

  if (showFinalReveal) {
    return (
      <div className="room-container">
        <div className="memory-fragment" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: '#00ffff', marginBottom: '1rem' }}>
              ✔ CORE UNLOCKED<br />
              ✔ IDENTITY RESTORED<br />
              ✔ LOOP CYCLE INTERRUPTED
            </h2>
          </div>
          
          <div className="terminal" style={{ margin: '2rem auto', background: '#000' }}>
            <div className="terminal-text" style={{ color: '#00ff00' }}>
              Subject: Dr. [CLASSIFIED]<br />
              Designation: Project Mnemosyne Creator<br />
              Status: Self-experiment complete<br />
              Loop cycles: [CORRUPTED]<br />
            </div>
          </div>

          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            You stare into the core, finally understanding. The faces you saw. The voices. The failures. The guilt.
          </p>
          
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem', color: '#ff4444' }}>
            You weren't trying to erase memory.
          </p>
          
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem', color: '#00ffff' }}>
            You were trying to erase accountability.
          </p>
          
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', fontStyle: 'italic' }}>
            You press the button — not to forget again, but to end the cycle.
          </p>
          
          <div className="loading" style={{ margin: '2rem auto' }}></div>
          <p>Generating escape certificate...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="room-container">      <div className="room-header">
        <h1 className="room-title">Room 5 — The Memory Core</h1>
        <p style={{ fontSize: '1.2rem', color: '#ff4444', fontStyle: 'italic' }}>
          "The truth you buried… is now awake."
        </p>
        {gameState.teamName && (
          <p style={{ fontSize: '1rem', color: '#44ff44', marginTop: '1rem' }}>
            Team: <strong>{gameState.teamName}</strong>
          </p>
        )}
      </div>

      <div className="room-description">
        <p style={{ marginBottom: '2rem' }}>
          You step into the Memory Core. The room pulses with deep violet light. A massive orb levitates 
          in the center, surrounded by flickering data screens showing fragments of all the memories 
          you've recovered — the chair, the voices, the experiment logs.
        </p>
        
        <div className="terminal" style={{ margin: '2rem auto' }}>
          <div className="terminal-text">
            <span style={{ color: '#ff4444' }}>WARNING: CYCLE UNSTABLE — IDENTITY COLLAPSE IMMINENT</span><br />
            <br />
            Final voice log detected... Playing...
          </div>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(75, 0, 130, 0.2))', 
          padding: '2rem', 
          borderRadius: '10px',
          border: '1px solid rgba(138, 43, 226, 0.5)',
          margin: '2rem auto',
          maxWidth: '600px',
          fontStyle: 'italic',
          textAlign: 'center'
        }}>
          <p style={{ color: '#00ffff' }}>
            "If you've made it here… then you've remembered. You know what I am. What you are. 
            There's no reset now — unless you choose it."
          </p>
        </div>
      </div>

      {currentStep === 1 && (
        <div>
          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>
              Step 1: Memory Integration Sequence
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              To activate the Core, enter the correct answers recovered from each stage.
            </p>
          </div>

          <div style={{ 
            background: 'rgba(0, 0, 0, 0.5)', 
            padding: '2rem', 
            borderRadius: '10px',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            margin: '2rem auto',
            maxWidth: '700px'
          }}>
            <div className="code-input" style={{ flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ minWidth: '300px', textAlign: 'left', color: '#00ffff' }}>
                  1. Room 1 - 4-digit access code:
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={answers.room1}
                  onChange={(e) => handleAnswerChange('room1', e.target.value)}
                  placeholder="####"
                  maxLength={4}
                  style={{ width: '100px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ minWidth: '300px', textAlign: 'left', color: '#00ffff' }}>
                  2. Room 2 - Decoded surveillance phrase:
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={answers.room2}
                  onChange={(e) => handleAnswerChange('room2', e.target.value.toUpperCase())}
                  placeholder="PHRASE"
                  style={{ width: '200px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ minWidth: '300px', textAlign: 'left', color: '#00ffff' }}>
                  3. Room 3 - Neural sync pattern word:
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={answers.room3}
                  onChange={(e) => handleAnswerChange('room3', e.target.value.toUpperCase())}
                  placeholder="WORD"
                  style={{ width: '200px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ minWidth: '300px', textAlign: 'left', color: '#00ffff' }}>
                  4. Room 4 - Security riddle answer:
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={answers.room4}
                  onChange={(e) => handleAnswerChange('room4', e.target.value.toUpperCase())}
                  placeholder="ANSWER"
                  style={{ width: '200px' }}
                />
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="btn" 
            onClick={handleAnswersSubmit}
            disabled={!Object.values(answers).every(answer => answer.trim())}
            style={{ marginTop: '2rem' }}
          >
            Integrate Memory Sequence
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <div className="success-message">
            ✅ Memory Integration Complete - Core Activated
          </div>

          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>
              Step 2: Final Identity Verification
            </h3>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
              Your identity has been pieced together. Now tell us:
            </p>
          </div>

          <div style={{ 
            background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.1), rgba(0, 255, 255, 0.1))', 
            padding: '3rem', 
            borderRadius: '15px',
            border: '2px solid rgba(255, 0, 255, 0.3)',
            margin: '2rem auto',
            maxWidth: '600px',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#ff00ff', marginBottom: '2rem', fontSize: '1.8rem' }}>
              WHO INITIATED PROJECT MNEMOSYNE?
            </h2>
            
            <input
              type="text"
              className="input-field"
              value={finalAnswer}
              onChange={(e) => setFinalAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your answer..."
              style={{ 
                width: '100%', 
                fontSize: '1.3rem',
                textAlign: 'center',
                background: 'rgba(0, 0, 0, 0.7)',
                border: '2px solid rgba(255, 0, 255, 0.5)'
              }}
            />
            
            <p style={{ 
              marginTop: '1.5rem', 
              fontSize: '0.9rem', 
              color: '#888',
              fontStyle: 'italic'
            }}>
              Write a short sentence or phrase that identifies who you are.
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="btn" 
            onClick={handleFinalSubmit}
            disabled={!finalAnswer.trim()}
            style={{ 
              marginTop: '2rem',
              background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
              fontSize: '1.2rem',
              padding: '1.5rem 3rem'
            }}
          >
            🧠 Complete Identity Restoration
          </button>
        </div>
      )}

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '600px' }}>
        <div className="terminal-prompt">MEMORY CORE STATUS:</div>
        <div className="terminal-text">
          INTEGRATION... {currentStep}/2<br />
          IDENTITY MATRIX... {currentStep === 2 ? 'RECONSTRUCTING' : 'FRAGMENTED'}<br />
          CORE ENERGY... CRITICAL<br />
          LOOP TERMINATION... {currentStep === 2 ? 'PENDING' : 'BLOCKED'}<br />
          {currentStep === 2 && 'FINAL VERIFICATION... REQUIRED'}
        </div>
      </div>
    </div>
  )
}

export default Room5
