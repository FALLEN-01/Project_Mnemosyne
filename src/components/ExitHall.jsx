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
    "The screen flickers. Static reshapes into your face. But older. Worn. Scarred.",
    "> \"I couldn't do it. I couldn't carry it anymore. I built this place to forget… to forgive myself.\"",
    "You watch as the version of you — Dr. Vale — confesses.\nEach word is heavier than the last.",
    "> \"If you're seeing this, you're stronger than I was.\nIf you're here… it means something inside you refused to stay asleep.\""
  ]

  const correctAnswer = "Silence" // Answer to the riddle

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
    }, 4000) // Changed from 3000ms to 1300ms (1.3 seconds)

    return () => clearInterval(echoInterval)
  }, [gameState.teamName, navigate])

  const handleRiddleSubmit = () => {
    if (riddleAnswer.toLowerCase().trim() === correctAnswer.toLowerCase()) {
      // Skip decision and go directly to ending
      updateGameState({ 
        finalChoice: 'remember', // Default choice
        endTime: new Date()
      })
      
      // Mark exit hall as completed
      completeRoom(5)
      
      // Show the ending directly
      setShowEnding(true)
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
      finalChoice: null,
      // Reset timestamp fields
      room1EntryTime: null,
      room2EntryTime: null,
      room3EntryTime: null,
      room4EntryTime: null,
      exitHallEntryTime: null
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
            You step into silence.
            The air feels… still. Artificial. Like it's waiting.
          </p>
          
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            The chamber is a perfect circle. Seamless. Clean.
            A console rises slowly from the center. No buttons this time. Just a screen, and a voice:
          </p>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 136, 0.5)',
            fontStyle: 'italic',
            color: '#ffffcc',
            textAlign: 'center',
            fontSize: '1.1rem'
          }}>
            "You have reached the event horizon of self."
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
            
            <div style={{ textAlign: 'left', minHeight: '60px' }}>
              {voiceEchoes.slice(0, voiceFragments + 1).map((echo, index) => {
                const isVoiceBubble = echo.startsWith('>')
                const displayText = isVoiceBubble ? echo.substring(1).trim() : echo
                return (
                  <div 
                    key={index}
                    style={{ 
                      marginBottom: '1rem',
                      opacity: index === voiceFragments ? 1 : 0.7,
                      animation: index === voiceFragments ? 'pulse 2s infinite' : 'none',
                      padding: isVoiceBubble ? '1rem' : '0.5rem',
                      background: isVoiceBubble ? 'rgba(255, 255, 136, 0.2)' : 'transparent',
                      border: isVoiceBubble ? '1px solid rgba(255, 255, 136, 0.4)' : 'none',
                      borderRadius: isVoiceBubble ? '8px' : '0',
                      fontStyle: isVoiceBubble ? 'italic' : 'normal',
                      color: isVoiceBubble ? '#ffffcc' : '#ffff88',
                      fontSize: isVoiceBubble ? '1.1rem' : '1rem',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {displayText}
                  </div>
                )
              })}
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
                I vanish when you speak my name. What am I?
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

        {/* Decision Interface - REMOVED: Now goes directly to ending */}

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
              📚 THE TRUTH REVEALED
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
              <div>
                <p style={{ marginBottom: '1.5rem', color: '#ffff88' }}>
                  🎬 <strong>ENDING – Echo</strong>
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  As you exit the facility, you don't speak.
                  You don't need to.
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  Whether your mind holds truth or peace, the burden is yours now.
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  You step into light.
                  Not knowing whether you've truly escaped… or just begun again.
                </p>
                
                <div style={{ 
                  marginTop: '2rem', 
                  padding: '1.5rem',
                  border: '2px solid rgba(255, 255, 136, 0.5)',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 136, 0.1)',
                  fontWeight: 'bold',
                  color: '#ffff88',
                  fontStyle: 'italic'
                }}>
                  Project Mnemosyne ends — but the memory lives on… somewhere.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExitHall
