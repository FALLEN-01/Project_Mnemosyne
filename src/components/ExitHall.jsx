import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

// === VISUAL & SOUND NOTES ===
// Itor Room: Pale Yellow | Circular, clean, ominous | Whispered dialogue

const ExitHall = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  const [showDecision, setShowDecision] = useState(false)
  const [voiceFragments, setVoiceFragments] = useState(0)
  const [showRiddle, setShowRiddle] = useState(false)
  const [riddleAnswer, setRiddleAnswer] = useState('')
  const [showEnding, setShowEnding] = useState(false)
  const [finalChoice, setFinalChoice] = useState(null)

  const voiceEchoes = [
    "Erase it.",
    "No, not yet.", 
    "What if I deserve to remember?",
    "The truth... or peace?"
  ]

  const correctAnswer = "forgetting" // Answer to the riddle

  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }

    // Start voice echo sequence
    const echoInterval = setInterval(() => {
      setVoiceFragments(prev => {
        if (prev < voiceEchoes.length - 1) {
          return prev + 1
        } else {
          clearInterval(echoInterval)
          setTimeout(() => setShowRiddle(true), 2000)
          return prev
        }
      })
    }, 3000)

    return () => clearInterval(echoInterval)
  }, [gameState.teamName, navigate])

  const handleRiddleSubmit = () => {
    if (riddleAnswer.toLowerCase().trim() === correctAnswer) {
      setShowDecision(true)
      setShowRiddle(false)
    } else {
      setRiddleAnswer('')
      // Could add error feedback here
    }
  }

  const handleFinalChoice = (choice) => {
    setFinalChoice(choice)
    updateGameState({ 
      finalChoice: choice,
      endTime: new Date()
    })
    
    // Mark exit hall as completed
    completeRoom(5)
    
    // Show the ending instead of navigating
    setShowEnding(true)
  }

  const restartGame = () => {
    updateGameState({
      teamName: '',
      room1Code: '',
      room2Phrase: '',
      room3Word: '',
      room4Answer: '',
      startTime: null,
      endTime: null,
      roomsCompleted: [],
      finalChoice: null
    })
    navigate('/')
  }

  return (
    <div className="room-container" style={{
      background: 'linear-gradient(135deg, #4a4a2d 0%, #6b6b4a 50%, #2d2d1a 100%)',
      color: '#ffff88'
    }}>
      <div className="room-header">
        <h1 className="room-title" style={{ 
          color: '#ffff88',
          textShadow: '0 0 20px rgba(255, 255, 136, 0.8)'
        }}>
          FINAL ROOM - ITOR CHAMBER
        </h1>
        <p className="room-subtitle" style={{ color: '#cccc66' }}>
          🔘 A clean, round room. In the center: a console. One glowing button.
        </p>
        <p className="room-subtitle" style={{ color: '#cccc77' }}>
          ⚖️ DECISION NEXUS
        </p>
      </div>

      <div className="room-description">
        <div style={{ 
          background: 'rgba(255, 255, 136, 0.1)', 
          padding: '2rem', 
          borderRadius: '15px',
          border: '2px solid rgba(255, 255, 136, 0.3)',
          marginBottom: '2rem'
        }}>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            A clean, round room. In the center: a console. One glowing button.
            You've reached the Itor Chamber — where the final choice awaits.
          </p>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 136, 0.5)',
            fontStyle: 'italic',
            color: '#ffffcc'
          }}>
            The room echoes with fragments of your voice, trapped memories seeking resolution.
          </div>
        </div>

        {/* Voice Echoes */}
        {voiceFragments < voiceEchoes.length && (
          <div style={{
            background: 'rgba(255, 255, 136, 0.2)',
            border: '2px solid #ffff88',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem',
            animation: 'fadeIn 1s ease-in'
          }}>
            <h3 style={{ color: '#ffff88', marginBottom: '1rem', textAlign: 'center' }}>
              �️ VOICE FRAGMENTS
            </h3>
            
            <div style={{ textAlign: 'center', minHeight: '60px' }}>
              {voiceEchoes.slice(0, voiceFragments + 1).map((echo, index) => (
                <div 
                  key={index}
                  style={{ 
                    marginBottom: '0.5rem',
                    opacity: index === voiceFragments ? 1 : 0.5,
                    animation: index === voiceFragments ? 'pulse 2s infinite' : 'none'
                  }}
                >
                  "{echo}"
                </div>
              ))}
            </div>
          </div>
        )}



        {/* Riddle Section */}
        {showRiddle && !showDecision && (
          <div style={{
            background: 'rgba(255, 255, 136, 0.2)',
            border: '2px solid #ffff88',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem',
            animation: 'fadeIn 1s ease-in'
          }}>
            <h3 style={{ color: '#ffff88', marginBottom: '1rem', textAlign: 'center' }}>
              � FINAL TERMINAL
            </h3>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 136, 0.5)',
              marginBottom: '1.5rem'
            }}>
              <p style={{ 
                lineHeight: '1.6',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                "The more you remember me, the less I exist. What am I?"
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <input
                type="text"
                value={riddleAnswer}
                onChange={(e) => setRiddleAnswer(e.target.value)}
                placeholder="Enter your answer..."
                style={{
                  padding: '1rem',
                  fontSize: '1.1rem',
                  border: '2px solid rgba(255, 255, 136, 0.5)',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: '#ffff88',
                  minWidth: '250px'
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleRiddleSubmit()}
              />
              <button 
                className="btn" 
                onClick={handleRiddleSubmit}
                style={{ 
                  background: 'linear-gradient(45deg, #ffff88, #cccc77)',
                  color: '#000'
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
        )}

        {/* Decision Interface */}
        {showDecision && !showEnding && (
          <div style={{
            background: 'rgba(255, 255, 136, 0.2)',
            border: '2px solid #ffff88',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem',
            animation: 'fadeIn 1s ease-in'
          }}>
            <h3 style={{ color: '#ffff88', marginBottom: '2rem', textAlign: 'center' }}>
              ⚖️ RESTORE ORIGINAL IDENTITY?
            </h3>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 136, 0.5)',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                The decision interface appears before you.
              </p>
              <p style={{ 
                color: '#ffffcc'
              }}>
                Will you restore your original identity, or let the purge complete?
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '2rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button 
                className="btn" 
                onClick={() => handleFinalChoice('remember')}
                style={{ 
                  background: 'linear-gradient(45deg, #ffff88, #cccc77)',
                  color: '#000',
                  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                  padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2rem)',
                  minWidth: 'clamp(120px, 25vw, 150px)',
                  fontWeight: 'bold'
                }}
              >
                YES
              </button>
              
              <button 
                className="btn" 
                onClick={() => handleFinalChoice('forget')}
                style={{ 
                  background: 'linear-gradient(45deg, #666666, #999999)',
                  color: '#fff',
                  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                  padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2rem)',
                  minWidth: 'clamp(120px, 25vw, 150px)',
                  fontWeight: 'bold'
                }}
              >
                NO
              </button>
            </div>
          </div>
        )}

        {/* Ending Story */}
        {showEnding && (
          <div style={{
            background: 'rgba(255, 255, 136, 0.2)',
            border: '2px solid #ffff88',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem',
            animation: 'fadeIn 1s ease-in'
          }}>
            <h3 style={{ color: '#ffff88', marginBottom: '2rem', textAlign: 'center' }}>
              {finalChoice === 'remember' ? '📚 CHOICE: REMEMBER' : '🌫️ CHOICE: FORGET'}
            </h3>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '2rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 136, 0.5)',
              marginBottom: '2rem',
              textAlign: 'center',
              lineHeight: '1.8'
            }}>
              {finalChoice === 'remember' ? (
                <div>
                  <p style={{ marginBottom: '1.5rem', color: '#ffff88' }}>
                    💡 <strong>You chose to remember.</strong>
                  </p>
                  
                  <p style={{ marginBottom: '1.5rem' }}>
                    The memories flood back—Dr. Eon Vale, the ethics breach, the deaths. 
                    Your mistake. You feel the weight of every moment you tried to erase.
                  </p>
                  
                  <p style={{ marginBottom: '1.5rem' }}>
                    The lab doors open with a mechanical hiss.
                  </p>
                  
                  <p style={{ marginBottom: '1.5rem' }}>
                    You walk out carrying everything—the guilt, the knowledge, the truth.
                  </p>
                  
                  <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#ffffcc' }}>
                    But you are no longer whole.
                  </p>
                  
                  <div style={{ 
                    marginTop: '2rem', 
                    padding: '1.5rem',
                    border: '2px solid rgba(255, 255, 136, 0.5)',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 136, 0.1)',
                    fontWeight: 'bold',
                    color: '#ffff88'
                  }}>
                    🚪 You have escaped—but you carry the burden of truth.
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ marginBottom: '1.5rem', color: '#ffff88' }}>
                    🌊 <strong>You chose to forget.</strong>
                  </p>
                  
                  <p style={{ marginBottom: '1.5rem' }}>
                    The purge restarts. Neural pathways dissolve.
                  </p>
                  
                  <p style={{ marginBottom: '1.5rem' }}>
                    You collapse as the memories drain away.
                  </p>
                  
                  <p style={{ marginBottom: '1.5rem' }}>
                    Fade to white...
                  </p>
                  
                  <p style={{ marginBottom: '1.5rem' }}>
                    You awaken again, unsure of what was lost. The lab doors open.
                  </p>
                  
                  <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#ffffcc' }}>
                    You step out into the unknown with no memory, but a strange calm.
                  </p>
                  
                  <div style={{ 
                    marginTop: '2rem', 
                    padding: '1.5rem',
                    border: '2px solid rgba(255, 255, 136, 0.5)',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 136, 0.1)',
                    fontWeight: 'bold',
                    color: '#ffff88'
                  }}>
                    🚪 You have escaped—but you are not the same person.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExitHall
