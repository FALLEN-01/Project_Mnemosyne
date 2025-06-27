import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

// === VISUAL & SOUND NOTES ===
// Itor Room: Pale Yellow | Circular, clean, ominous | Whispered dialogue

const ExitHall = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState } = useGameState()
  const [showRiddle, setShowRiddle] = useState(false)
  const [riddleAnswer, setRiddleAnswer] = useState('')
  const [showDecision, setShowDecision] = useState(false)
  const [voiceFragments, setVoiceFragments] = useState(0)
  const [finalChoice, setFinalChoice] = useState(null)
  const [endingScene, setEndingScene] = useState(null)

  const voiceEchoes = [
    "Erase it.",
    "No, not yet.",
    "What if I deserve to remember?",
    "The truth... or peace?",
    "Choose wisely, Dr. Vale."
  ]

  const correctAnswer = "forgetfulness"

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
    
    // Show appropriate ending
    setTimeout(() => {
      setEndingScene(choice)
    }, 1000)
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
          FINAL CHAMBER - THE ITOR
        </h1>
        <p style={{ color: '#cccc77', fontSize: '1.1rem' }}>
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
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
            A perfectly round chamber with walls that pulse like breathing. In the center floats a singular chair.
            You've reached the Itor — the choice chamber where all paths converge.
          </p>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 136, 0.5)',
            fontStyle: 'italic',
            color: '#ffffcc'
          }}>
            Whispered voices echo from every direction, fragments of your former self debating the choice ahead.
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
              👤 MEMORY ECHOES
            </h3>
            
            <div style={{ textAlign: 'center', fontSize: '1.2rem', minHeight: '60px' }}>
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
              🔮 THE FINAL RIDDLE
            </h3>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 136, 0.5)',
              marginBottom: '1.5rem'
            }}>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.6',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                "I am the gift that erases pain,<br />
                The mercy that breaks memory's chain.<br />
                When burdens grow too much to bear,<br />
                I offer peace beyond compare.<br />
                <br />
                What am I?"
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
        {showDecision && !endingScene && (
          <div style={{
            background: 'rgba(255, 255, 136, 0.2)',
            border: '2px solid #ffff88',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem',
            animation: 'fadeIn 1s ease-in'
          }}>
            <h3 style={{ color: '#ffff88', marginBottom: '2rem', textAlign: 'center' }}>
              ⚖️ THE FINAL CHOICE
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
                Dr. Eon Vale, you stand at the threshold of your own creation.
              </p>
              <p style={{ 
                fontSize: '1.1rem', 
                color: '#ffffcc'
              }}>
                Project Mnemosyne can grant you the peace you sought... or you can reclaim your memories, your pain, your truth.
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
                onClick={() => handleFinalChoice('forget')}
                style={{ 
                  background: 'linear-gradient(45deg, #666666, #999999)',
                  color: '#fff',
                  fontSize: '1.1rem',
                  padding: '1.5rem 2rem',
                  minWidth: '200px'
                }}
              >
                🌫️ FORGET EVERYTHING
                <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>
                  Embrace the peace of oblivion
                </div>
              </button>
              
              <button 
                className="btn" 
                onClick={() => handleFinalChoice('remember')}
                style={{ 
                  background: 'linear-gradient(45deg, #ffff88, #cccc77)',
                  color: '#000',
                  fontSize: '1.1rem',
                  padding: '1.5rem 2rem',
                  minWidth: '200px'
                }}
              >
                🧠 REMEMBER EVERYTHING
                <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>
                  Reclaim your painful truth
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Ending Scenes */}
        {endingScene && (
          <div style={{
            background: 'rgba(255, 255, 136, 0.2)',
            border: '2px solid #ffff88',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem',
            animation: 'fadeIn 1s ease-in'
          }}>
            <h3 style={{ color: '#ffff88', marginBottom: '1rem', textAlign: 'center' }}>
              {endingScene === 'forget' ? '🌫️ ENDING: FORGOTTEN' : '🧠 ENDING: REMEMBERED'}
            </h3>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 136, 0.5)',
              marginBottom: '2rem'
            }}>
              {endingScene === 'forget' ? (
                <div style={{ textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    The chair embraces you like an old friend. Warm light floods your mind, 
                    washing away decades of guilt, pain, and regret.
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    You feel yourself dissolving... becoming lighter... becoming nothing.
                  </p>
                  <p style={{ fontStyle: 'italic', color: '#ffffcc' }}>
                    In the end, there is only peace. Dr. Eon Vale sleeps forever, 
                    and someone new awakens in his place — unburdened, innocent, free.
                  </p>
                  <div style={{ 
                    marginTop: '2rem', 
                    padding: '1rem',
                    border: '1px solid rgba(255, 255, 136, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 136, 0.1)'
                  }}>
                    <strong>You chose the path of mercy.</strong><br />
                    Sometimes forgetting is the kindest act of all.
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    The memories flood back like a broken dam — every moment, every mistake, 
                    every life lost in your pursuit of "healing."
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    The car accident. The family you destroyed. The guilt that drove you to create 
                    Project Mnemosyne. The patients you experimented on.
                  </p>
                  <p style={{ fontStyle: 'italic', color: '#ffffcc' }}>
                    It hurts. God, it hurts so much. But it's yours. It's real. 
                    You are Dr. Eon Vale, flawed and broken and human.
                  </p>
                  <div style={{ 
                    marginTop: '2rem', 
                    padding: '1rem',
                    border: '1px solid rgba(255, 255, 136, 0.3)',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 136, 0.1)'
                  }}>
                    <strong>You chose the path of truth.</strong><br />
                    The hardest courage is facing who you really are.
                  </div>
                </div>
              )}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button 
                className="btn" 
                onClick={restartGame}
                style={{ 
                  background: 'linear-gradient(45deg, #ffff88, #cccc77)',
                  color: '#000',
                  fontSize: '1.1rem',
                  padding: '1rem 2rem'
                }}
              >
                🔄 Begin Again
              </button>
            </div>
          </div>
        )}

        {/* Status Terminal */}
        {!endingScene && (
          <div className="terminal" style={{ 
            background: '#2d2d1a',
            border: '2px solid #ffff88',
            color: '#ffff88'
          }}>
            <div style={{ color: '#ffffcc', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              ITOR CHAMBER STATUS:
            </div>
            <div style={{ lineHeight: '1.4' }}>
              VOICE ECHOES... {voiceFragments + 1}/{voiceEchoes.length}<br />
              ACCESS RIDDLE... {showRiddle ? 'ACTIVE' : 'PENDING'}<br />
              DECISION INTERFACE... {showDecision ? 'READY' : 'LOCKED'}<br />
              FINAL CHOICE... {finalChoice ? finalChoice.toUpperCase() : 'PENDING'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExitHall
