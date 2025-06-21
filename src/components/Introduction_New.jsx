import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Introduction = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState } = useGameState()
  const [showContent, setShowContent] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(1)

  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }
    
    // Initialize start time when component loads
    updateGameState({ startTime: new Date() })
    
    // Fade in effect
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 300)

    // Progress through phases for dramatic effect
    const phaseTimer1 = setTimeout(() => setCurrentPhase(2), 2000)
    const phaseTimer2 = setTimeout(() => setCurrentPhase(3), 4000)

    return () => {
      clearTimeout(timer)
      clearTimeout(phaseTimer1)
      clearTimeout(phaseTimer2)
    }
  }, [updateGameState, gameState.teamName, navigate])

  const enterFacility = () => {
    navigate('/room1')
  }
  
  return (
    <div 
      className={`room-container ${showContent ? 'fade-in' : ''}`}
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #2e1a1a 100%)',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 68, 68, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)
        `,
        animation: currentPhase >= 2 ? 'pulse 3s infinite' : 'none'
      }}></div>

      <div className="room-header" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <div style={{ 
            fontSize: '4rem', 
            marginRight: '1rem',
            filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))'
          }}>🧠</div>
          <h1 className="room-title glitch" style={{ 
            fontSize: '3.5rem',
            background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
          }}>
            PROJECT MNEMOSYNE
          </h1>
        </div>
        
        <div style={{ 
          background: 'rgba(0, 0, 0, 0.8)', 
          padding: '1rem 2rem', 
          borderRadius: '25px',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          marginBottom: '1rem',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ 
            fontSize: '1.4rem', 
            color: '#00ffff', 
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            🔬 NEURAL INTERFACE ESCAPE PROTOCOL
          </p>
          <p style={{ 
            fontSize: '1rem', 
            color: '#888',
            fontStyle: 'italic'
          }}>
            Advanced Memory Recovery & Facility Escape Simulation
          </p>
        </div>

        {gameState.teamName && (
          <div style={{ 
            background: 'rgba(68, 255, 68, 0.2)', 
            padding: '1rem 2rem', 
            borderRadius: '15px',
            border: '2px solid rgba(68, 255, 68, 0.5)',
            marginBottom: '2rem'
          }}>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#44ff44',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>👥</span>
              <strong>ACTIVE TEAM: {gameState.teamName}</strong>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
            </p>
          </div>
        )}
      </div>

      <div className="room-description" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ 
          background: 'rgba(0, 0, 0, 0.7)', 
          padding: '3rem', 
          borderRadius: '20px',
          border: '2px solid rgba(255, 68, 68, 0.3)',
          backdropFilter: 'blur(15px)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            color: '#ff4444', 
            marginBottom: '2rem', 
            fontSize: '2rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '2.5rem' }}>🚨</span>
            SUBJECT AWAKENING SEQUENCE INITIATED
            <span style={{ fontSize: '2.5rem' }}>🚨</span>
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gap: '1.5rem',
            fontSize: '1.1rem',
            lineHeight: '1.7'
          }}>
            <div style={{ 
              background: 'rgba(0, 255, 255, 0.1)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(0, 255, 255, 0.3)'
            }}>
              <p style={{ 
                margin: 0,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <span style={{ fontSize: '2rem', minWidth: '3rem' }}>🏥</span>
                <span>
                  You awaken in a cold, sterile laboratory deep within the Mnemosyne research facility. 
                  Your wrists bear faint marks from restraints. Monitors blink with static around you. 
                  The air tastes metallic, filled with the scent of disinfectant and burnt circuitry.
                </span>
              </p>
            </div>

            {currentPhase >= 2 && (
              <div style={{ 
                background: 'rgba(138, 43, 226, 0.1)', 
                padding: '1.5rem', 
                borderRadius: '10px',
                border: '1px solid rgba(138, 43, 226, 0.3)',
                animation: 'fadeIn 0.8s ease-in-out'
              }}>
                <p style={{ 
                  margin: 0,
                  fontStyle: 'italic', 
                  color: '#bb66ff',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <span style={{ fontSize: '2rem', minWidth: '3rem' }}>🔊</span>
                  <span>
                    Suddenly, a voice echoes through the facility speakers — familiar, yet distant:<br />
                    <strong style={{ color: '#ff66ff' }}>
                      "You chose this. You wanted to forget. But now… you must remember to escape."
                    </strong>
                  </span>
                </p>
              </div>
            )}

            {currentPhase >= 3 && (
              <div style={{ 
                background: 'rgba(255, 68, 68, 0.1)', 
                padding: '1.5rem', 
                borderRadius: '10px',
                border: '1px solid rgba(255, 68, 68, 0.3)',
                animation: 'fadeIn 0.8s ease-in-out'
              }}>
                <p style={{ 
                  margin: 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <span style={{ fontSize: '2rem', minWidth: '3rem' }}>🧬</span>
                  <span>
                    Your memories have been systematically erased. You don't know who you are, 
                    why you're here, or how long you've been trapped. But something feels wrong — 
                    deeply wrong. The facility's security systems are active, and you're locked inside.
                  </span>
                </p>
              </div>
            )}
          </div>

          <div style={{ 
            background: 'rgba(255, 68, 68, 0.2)', 
            padding: '2rem', 
            borderRadius: '15px',
            border: '2px solid rgba(255, 68, 68, 0.5)',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: '1.3rem',
              color: '#ff4444', 
              fontWeight: 'bold',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '2rem' }}>⚠️</span>
              THE EXIT IS SEALED. ESCAPE BEFORE IT'S TOO LATE.
              <span style={{ fontSize: '2rem' }}>⚠️</span>
            </p>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255, 68, 68, 0.1)', 
          padding: '2.5rem', 
          borderRadius: '20px',
          border: '2px solid rgba(255, 68, 68, 0.4)',
          marginBottom: '3rem'
        }}>
          <h3 style={{ 
            color: '#ff4444', 
            marginBottom: '2rem',
            fontSize: '1.8rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '2rem' }}>🚨</span>
            EMERGENCY ESCAPE PROTOCOL ACTIVATED
            <span style={{ fontSize: '2rem' }}>🚨</span>
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(255, 68, 68, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚪</div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Navigate Rooms</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Progress through security chambers</p>
            </div>

            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(255, 68, 68, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧩</div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Solve Puzzles</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Unlock each security door</p>
            </div>

            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(255, 68, 68, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧠</div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Recover Memory</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Piece together your identity</p>
            </div>

            <div style={{ 
              background: 'rgba(0, 0, 0, 0.5)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(255, 68, 68, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏃‍♂️</div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Escape Facility</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Find the exit before lockdown</p>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255, 68, 68, 0.2)', 
            padding: '1.5rem', 
            borderRadius: '10px',
            border: '1px solid rgba(255, 68, 68, 0.4)',
            marginTop: '2rem'
          }}>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#ff4444', 
              fontWeight: 'bold',
              margin: 0,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              WARNING: Don't trust everything you remember...
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            </p>
          </div>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        position: 'relative', 
        zIndex: 2,
        marginBottom: '3rem'
      }}>
        <button 
          className="btn" 
          onClick={enterFacility}
          style={{ 
            fontSize: '1.4rem', 
            padding: '2rem 4rem',
            background: 'linear-gradient(45deg, #ff4444, #ff6666, #ff4444)',
            border: '3px solid #ff6666',
            borderRadius: '15px',
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(255, 68, 68, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px)'
            e.target.style.boxShadow = '0 15px 40px rgba(255, 68, 68, 0.6)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 10px 30px rgba(255, 68, 68, 0.4)'
          }}
        >
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '2rem' }}>🚪</span>
            INITIATE ESCAPE SEQUENCE
            <span style={{ fontSize: '2rem' }}>🚪</span>
          </span>
        </button>
      </div>

      <div style={{ 
        background: '#000',
        color: '#ff4444',
        fontFamily: 'Courier New, monospace',
        padding: '2.5rem',
        borderRadius: '15px',
        margin: '0 auto',
        border: '2px solid #ff4444',
        maxWidth: '700px',
        fontSize: '1.1rem',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ 
          color: '#00ffff', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          fontSize: '1.2rem',
          textAlign: 'center'
        }}>
          🖥️ FACILITY EMERGENCY SYSTEM STATUS 🖥️
        </div>
        <div style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
          SUBJECT AWAKENING... <span style={{ color: '#44ff44' }}>COMPLETE</span>{'\n'}
          MEMORY BANKS... <span style={{ color: '#ff4444' }}>CORRUPTED</span>{'\n'}
          FACILITY LOCKDOWN... <span style={{ color: '#ff4444' }}>ACTIVE</span>{'\n'}
          ESCAPE PROTOCOL... <span style={{ color: '#ffff44' }}>INITIALIZING</span>{'\n'}
          EXIT STATUS... <span style={{ color: '#ff4444' }}>SEALED</span>{'\n'}
          SECURITY LEVEL... <span style={{ color: '#ff4444' }}>MAXIMUM</span>{'\n'}
          TIME REMAINING... <span style={{ color: '#ff4444' }}>UNKNOWN</span>
        </div>
      </div>
    </div>
  )
}

export default Introduction
