import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

const Introduction = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState } = useGameState()
  const [currentPhase, setCurrentPhase] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [terminalText, setTerminalText] = useState('')

  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }
    
    // Initialize start time when component loads
    updateGameState({ startTime: new Date() })
    
    // Start the awakening sequence
    const timer = setTimeout(() => {
      setShowContent(true)
      startAwakeningSequence()
    }, 500)

    return () => clearTimeout(timer)
  }, [updateGameState, gameState.teamName, navigate])

  const startAwakeningSequence = () => {
    const phases = [
      { text: 'NEURAL ACTIVITY DETECTED...', delay: 1000 },
      { text: 'CONSCIOUSNESS RETURNING...', delay: 2000 },
      { text: 'MEMORY RECONSTRUCTION FAILED', delay: 3000 },
      { text: 'SUBJECT AWAKENING PROTOCOL COMPLETE', delay: 4000 }
    ]

    phases.forEach((phase, index) => {
      setTimeout(() => {
        setTerminalText(prev => prev + phase.text + '\n')
        if (index === phases.length - 1) {
          setTimeout(() => setCurrentPhase(1), 1000)
        }
      }, phase.delay)
    })
  }

  const advancePhase = () => {
    if (currentPhase < 3) {
      setCurrentPhase(currentPhase + 1)
    } else {
      navigate('/room1')
    }
  }

  const renderPhase = () => {
    switch (currentPhase) {
      case 0:
        return (
          <div style={{ textAlign: 'center', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🧠</div>
            <h2 style={{ color: '#00ffff', marginBottom: '2rem' }}>Initializing Neural Interface...</h2>
            <div className="terminal" style={{ maxWidth: '600px', margin: '0 auto' }}>              <div className="terminal-text" style={{ whiteSpace: 'pre-line', minHeight: '120px' }}>
                {terminalText}
                <span>_</span>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div style={{ textAlign: 'center' }}>            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', fontSize: '3rem' }}>
              <span>💡</span>
              <span>👁️</span>
              <span>⚡</span>
            </div>
            <h2 style={{ color: '#ff6b6b', marginBottom: '2rem' }}>🔴 AWAKENING COMPLETE</h2>
            <div style={{ 
              background: 'rgba(255, 107, 107, 0.1)', 
              padding: '2rem', 
              borderRadius: '15px',
              border: '2px solid rgba(255, 107, 107, 0.3)',
              maxWidth: '800px',
              margin: '0 auto 2rem'
            }}>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                <strong>🏥 LOCATION:</strong> Mnemosyne Research Facility - Sub-Level 7<br/>
                <strong>⏰ TIME:</strong> Unknown - Emergency lighting active<br/>
                <strong>🧬 STATUS:</strong> Memory banks corrupted, identity unknown
              </p>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#ffaa00' }}>
                You feel cold metal restraints fall away from your wrists. The laboratory around you hums with mysterious energy. 
                Your past is a void, but your survival instincts are sharp...
              </p>
            </div>
            <button className="btn" onClick={advancePhase} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
              🔍 Examine Surroundings
            </button>
          </div>
        )

      case 2:
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem', fontSize: '2.5rem' }}>
              <span title="Emergency Systems">🚨</span>
              <span title="Facility AI">🤖</span>
              <span title="Security Lockdown">🔒</span>
              <span title="Memory Fragments">🧩</span>
              <span title="Escape Route">🚪</span>
            </div>
            <h2 style={{ color: '#ff4444', marginBottom: '2rem' }}>⚠️ FACILITY STATUS CRITICAL</h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '1.5rem', 
              marginBottom: '2rem',
              maxWidth: '1000px',
              margin: '0 auto 2rem'
            }}>
              <div style={{ 
                background: 'rgba(0, 255, 255, 0.1)', 
                padding: '1.5rem', 
                borderRadius: '10px',
                border: '1px solid rgba(0, 255, 255, 0.3)'
              }}>
                <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>🔊 Audio Log Detected</h3>
                <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>
                  "Subject 2847... memory wipe successful. But the neural pathways are fighting back. 
                  They're trying to remember. We need to activate containment protocols before—"
                </p>
                <p style={{ color: '#ff4444', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  [TRANSMISSION INTERRUPTED]
                </p>
              </div>
              
              <div style={{ 
                background: 'rgba(255, 68, 68, 0.1)', 
                padding: '1.5rem', 
                borderRadius: '10px',
                border: '1px solid rgba(255, 68, 68, 0.3)'
              }}>
                <h3 style={{ color: '#ff4444', marginBottom: '1rem' }}>🚨 Security Alert</h3>
                <p style={{ fontSize: '0.95rem' }}>
                  <strong>LOCKDOWN ACTIVE</strong><br/>
                  All exits sealed<br/>
                  Emergency protocols engaged<br/>
                  Containment breach detected in Sector 7
                </p>
              </div>
            </div>

            <div style={{ 
              background: 'rgba(255, 170, 0, 0.1)', 
              padding: '2rem', 
              borderRadius: '15px',
              border: '2px solid rgba(255, 170, 0, 0.3)',
              maxWidth: '700px',
              margin: '0 auto 2rem'
            }}>
              <p style={{ fontSize: '1.1rem', color: '#ffaa00', marginBottom: '1rem' }}>
                <strong>💭 A distant voice echoes in your mind...</strong>
              </p>
              <p style={{ fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                "You chose this path. You wanted to forget the pain, the guilt, the truth. 
                But forgetting isn't freedom — it's a prison. Now you must solve what you created to escape what you became."
              </p>
            </div>

            <button className="btn" onClick={advancePhase} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
              🎯 Accept the Challenge
            </button>
          </div>
        )

      case 3:
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🎮</div>
            <h2 style={{ color: '#44ff44', marginBottom: '2rem' }}>🚀 MISSION BRIEFING</h2>
            
            <div style={{ 
              background: 'rgba(68, 255, 68, 0.1)', 
              padding: '2rem', 
              borderRadius: '15px',
              border: '2px solid rgba(68, 255, 68, 0.3)',
              maxWidth: '800px',
              margin: '0 auto 2rem'
            }}>
              <h3 style={{ color: '#44ff44', marginBottom: '1.5rem' }}>� OBJECTIVES</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem', 
                textAlign: 'left'
              }}>
                <div>
                  <strong>🔓 Room 1:</strong> Security Bypass<br/>
                  <small style={{ color: '#aaa' }}>Crack the access codes</small>
                </div>
                <div>
                  <strong>🧬 Room 2:</strong> Memory Analysis<br/>
                  <small style={{ color: '#aaa' }}>Decode neural patterns</small>
                </div>
                <div>
                  <strong>⚡ Room 3:</strong> Power Systems<br/>
                  <small style={{ color: '#aaa' }}>Reactivate emergency exits</small>
                </div>
                <div>
                  <strong>🔑 Room 4:</strong> Final Protocol<br/>
                  <small style={{ color: '#aaa' }}>Unlock the truth</small>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'rgba(255, 68, 68, 0.1)', 
              padding: '1.5rem', 
              borderRadius: '10px',
              border: '1px solid rgba(255, 68, 68, 0.3)',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              <p style={{ color: '#ff4444', fontSize: '1.1rem', fontWeight: 'bold' }}>
                ⚠️ WARNING: Each room will test different aspects of your problem-solving abilities. 
                Work together as <span style={{ color: '#44ff44' }}>{gameState.teamName}</span> to escape before time runs out.
              </p>
            </div>

            <button 
              className="btn" 
              onClick={advancePhase}
              style={{ 
                fontSize: '1.4rem', 
                padding: '1.5rem 3rem',
                background: 'linear-gradient(45deg, #44ff44, #66ff66)',
                boxShadow: '0 0 20px rgba(68, 255, 68, 0.3)',
                animation: 'pulse 2s infinite'
              }}
            >
              🚪 Enter Security Room 1
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`room-container ${showContent ? 'fade-in' : ''}`} style={{ 
      background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,40,0.9) 50%, rgba(40,0,40,0.9) 100%)',
      minHeight: '100vh'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: '#00ffff',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`
            }}
          />
        ))}
      </div>

      <div className="room-header">
        <h1 className="room-title glitch" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          🧠 Project Mnemosyne
        </h1>
        <p style={{ fontSize: '1.3rem', color: '#00ffff', marginBottom: '1rem' }}>
          Neural Interface Escape Protocol
        </p>
        {gameState.teamName && (
          <div style={{ 
            background: 'rgba(68, 255, 68, 0.1)', 
            padding: '0.5rem 1.5rem', 
            borderRadius: '20px',
            border: '1px solid rgba(68, 255, 68, 0.3)',
            display: 'inline-block',
            marginBottom: '2rem'
          }}>
            <span style={{ fontSize: '1.1rem', color: '#44ff44' }}>
              👥 Team: <strong>{gameState.teamName}</strong>
            </span>
          </div>
        )}
      </div>

      <div className="room-description">
        {renderPhase()}
      </div>
    </div>
  )
}

export default Introduction
