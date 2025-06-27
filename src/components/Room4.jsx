import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

// === VISUAL & SOUND NOTES ===
// Core: Violet/Neon | Live UI, hologram pulses | Pulse beeps

const Room4 = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  const [neuralNodes, setNeuralNodes] = useState([
    { id: 'A1', x: 150, y: 100, rotation: 0, locked: false, pulseFlow: 0 },
    { id: 'B2', x: 450, y: 100, rotation: 90, locked: false, pulseFlow: 0 },
    { id: 'C3', x: 300, y: 250, rotation: 180, locked: false, pulseFlow: 0 },
    { id: 'D4', x: 150, y: 400, rotation: 270, locked: false, pulseFlow: 0 },
    { id: 'E5', x: 450, y: 400, rotation: 45, locked: false, pulseFlow: 0 }
  ])
  const [pulseActive, setPulseActive] = useState(false)
  const [error, setError] = useState('')
  const [showHologram, setShowHologram] = useState(false)
  const [confessionStep, setConfessionStep] = useState(0)
  const [mindDialogue, setMindDialogue] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Correct rotations for neural alignment (example pattern)
  const correctRotations = [45, 135, 270, 90, 315]

  const confessionMessages = [
    "HOLOGRAM ACTIVATED... DECODING NEURAL CONFESSION...",
    "Dr. Eon Vale, final recording... If anyone finds this...",
    "I volunteered for Project Mnemosyne to forget my trauma...",
    "The guilt... the accident... I thought I could erase it all...",
    "But the memories fought back. They fragmented, hid, evolved...",
    "I became both the scientist and the subject...",
    "M.I.N.D. was supposed to help people forget pain...",
    "Instead, it created prisoners of their own minds...",
    "I am you. You are me. We are the same broken soul...",
    "The choice is yours now. Remember or forget forever."
  ]

  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }
  }, [gameState.teamName, navigate])

  const rotateNode = (nodeId) => {
    setNeuralNodes(nodes => 
      nodes.map(node => 
        node.id === nodeId 
          ? { ...node, rotation: (node.rotation + 45) % 360 }
          : node
      )
    )
    setError('')
  }

  const startPulseFlow = () => {
    const currentRotations = neuralNodes.map(node => node.rotation)
    
    if (JSON.stringify(currentRotations) === JSON.stringify(correctRotations)) {
      setPulseActive(true)
      
      // Animate pulse flow through nodes
      neuralNodes.forEach((node, index) => {
        setTimeout(() => {
          setNeuralNodes(nodes => 
            nodes.map(n => 
              n.id === node.id ? { ...n, pulseFlow: 100 } : n
            )
          )
        }, index * 500)
      })

      // Activate hologram after pulse completes
      setTimeout(() => {
        setShowHologram(true)
        startConfessionSequence()
      }, neuralNodes.length * 500 + 1000)
    } else {
      setError('Neural pathways misaligned - adjust node rotations')
      
      // Reset pulse flows
      setNeuralNodes(nodes => 
        nodes.map(node => ({ ...node, pulseFlow: 0 }))
      )
    }
  }

  const startConfessionSequence = () => {
    let step = 0
    const interval = setInterval(() => {
      setConfessionStep(step)
      step++
      
      if (step >= confessionMessages.length) {
        clearInterval(interval)
        setTimeout(() => {
          setMindDialogue(true)
        }, 2000)
      }
    }, 3000)
  }

  const proceedToFinalRoom = async () => {
    try {
      // Complete room and update game state
      completeRoom(4)
      await updateGameState({ 
        room4_neuralAlignment: neuralNodes.map(n => n.rotation),
        room4_confessionViewed: true 
      })
      
      // Small delay to ensure state is updated
      setTimeout(() => {
        navigate('/exit-hall')
      }, 100)
      
    } catch (error) {
      console.error('Error in proceedToFinalRoom:', error)
    }
  }

  return (
    <div className="room-container" style={{
      background: 'linear-gradient(135deg, #2d1a4a 0%, #4a2d6b 50%, #1a0f2d 100%)',
      color: '#bb88ff'
    }}>
      <div className="room-header">
        <h1 className="room-title" style={{ 
          color: '#bb88ff',
          textShadow: '0 0 20px rgba(187, 136, 255, 0.8)'
        }}>
          ROOM 4 - NEURAL SYNC CORE
        </h1>
        <p style={{ color: '#9966cc', fontSize: '1.1rem' }}>
          🧠 MNEMOSYNE CORE INTERFACE
        </p>
      </div>

      <div className="room-description">
        <div style={{ 
          background: 'rgba(187, 136, 255, 0.1)', 
          padding: '2rem', 
          borderRadius: '15px',
          border: '2px solid rgba(187, 136, 255, 0.3)',
          marginBottom: '2rem'
        }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
            The floor is transparent — below, a pulsating brain model spins slowly. 
            You're inside the Mnemosyne Core. Neural pathways flicker with electric life.
          </p>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(187, 136, 255, 0.5)',
            fontStyle: 'italic',
            color: '#ccaaff'
          }}>
            Live neural routing interface detected. Rotate nodes to align pulse flows 
            and activate the core memory systems.
          </div>
        </div>

        {/* Neural Node Interface */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#bb88ff', marginBottom: '1rem', textAlign: 'center' }}>
            Neural Pathway Configuration
          </h3>
          
          <div style={{
            position: 'relative',
            height: '500px',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '2px solid rgba(187, 136, 255, 0.5)',
            borderRadius: '15px',
            margin: '0 auto',
            maxWidth: '600px',
            overflow: 'hidden'
          }}>
            {/* Neural Network Background */}
            <svg 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                zIndex: 1
              }}
              viewBox="0 0 600 500"
            >
              {/* Connection lines */}
              <line x1="150" y1="100" x2="300" y2="250" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="2" />
              <line x1="450" y1="100" x2="300" y2="250" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="2" />
              <line x1="300" y1="250" x2="150" y2="400" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="2" />
              <line x1="300" y1="250" x2="450" y2="400" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="2" />
              <line x1="150" y1="100" x2="450" y2="100" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="2" />
              
              {/* Pulse animations when active */}
              {pulseActive && (
                <>
                  <circle r="5" fill="#bb88ff" opacity="0.8">
                    <animateMotion dur="2s" repeatCount="indefinite">
                      <path d="M150,100 L300,250 L150,400 L450,400 L450,100 Z" />
                    </animateMotion>
                  </circle>
                </>
              )}
            </svg>

            {/* Neural Nodes */}
            {neuralNodes.map((node) => (
              <div
                key={node.id}
                style={{
                  position: 'absolute',
                  left: `${node.x - 40}px`,
                  top: `${node.y - 40}px`,
                  width: '80px',
                  height: '80px',
                  background: `radial-gradient(circle, rgba(187, 136, 255, ${node.pulseFlow / 100}) 0%, rgba(0, 0, 0, 0.8) 70%)`,
                  border: '3px solid #bb88ff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: `rotate(${node.rotation}deg)`,
                  zIndex: 2,
                  boxShadow: node.pulseFlow > 0 ? '0 0 20px #bb88ff' : 'none'
                }}
                onClick={() => !pulseActive && rotateNode(node.id)}
              >
                <div style={{
                  color: '#bb88ff',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  transform: `rotate(-${node.rotation}deg)` // Keep text upright
                }}>
                  {node.id}
                </div>
                
                {/* Rotation indicator */}
                <div style={{
                  position: 'absolute',
                  top: '5px',
                  width: '10px',
                  height: '2px',
                  background: '#ffaa88',
                  borderRadius: '1px'
                }} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button 
              className="btn" 
              onClick={startPulseFlow}
              disabled={pulseActive || showHologram}
              style={{ 
                background: pulseActive 
                  ? '#666' 
                  : 'linear-gradient(45deg, #bb88ff, #9966cc)',
                marginRight: '1rem'
              }}
            >
              {pulseActive ? 'Pulse Flow Active' : 'Initiate Neural Sync'}
            </button>
            
            {!showHologram && (
              <button 
                className="btn" 
                onClick={() => setShowHint(!showHint)}
                style={{ 
                  background: 'linear-gradient(45deg, #666, #888)',
                  fontSize: '0.9rem'
                }}
              >
                {showHint ? 'Hide Hint' : 'Need Help?'}
              </button>
            )}
          </div>

          {showHint && !showHologram && (
            <div style={{
              background: 'rgba(255, 170, 136, 0.1)',
              border: '1px solid #ffaa88',
              borderRadius: '10px',
              padding: '1rem',
              marginTop: '1rem',
              color: '#ffaa88'
            }}>
              <strong>💡 Neural Alignment Hint:</strong><br />
              Click each node to rotate it. The correct pattern aligns with the neural pathways. 
              Try different rotation combinations until all nodes form a harmonious flow pattern.
              <br /><br />
              <em>Target rotations: A1(45°), B2(135°), C3(270°), D4(90°), E5(315°)</em>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message" style={{ 
            background: 'rgba(255, 68, 68, 0.2)',
            border: '1px solid #ff4444',
            color: '#ff6666'
          }}>
            {error}
          </div>
        )}

        {/* Hologram Confession */}
        {showHologram && (
          <div style={{
            background: 'rgba(187, 136, 255, 0.2)',
            border: '2px solid #bb88ff',
            borderRadius: '15px',
            padding: '2rem',
            marginTop: '2rem',
            animation: 'fadeIn 1s ease-in',
            minHeight: '200px'
          }}>
            <h3 style={{ color: '#bb88ff', marginBottom: '1rem', textAlign: 'center' }}>
              🎭 NEURAL CONFESSION HOLOGRAM
            </h3>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(187, 136, 255, 0.5)',
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '1.1rem',
              lineHeight: '1.6'
            }}>
              {confessionStep < confessionMessages.length ? (
                <div style={{ 
                  color: '#ccaaff',
                  animation: 'pulse 2s infinite'
                }}>
                  {confessionMessages[confessionStep]}
                </div>
              ) : mindDialogue ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    color: '#ff6666', 
                    marginBottom: '1rem', 
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                    textShadow: '0 0 10px rgba(255, 102, 102, 0.8)'
                  }}>
                    M.I.N.D.: "Welcome back, Dr. Vale."
                  </div>
                  <div style={{ 
                    color: '#ccaaff', 
                    marginBottom: '2rem',
                    fontSize: '1.1rem',
                    lineHeight: '1.5'
                  }}>
                    "Proceeding with integrity overwrite."
                  </div>
                  <div style={{
                    background: 'rgba(255, 170, 136, 0.1)',
                    border: '1px solid #ffaa88',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    color: '#ffaa88',
                    fontStyle: 'italic'
                  }}>
                    <p style={{ margin: '0 0 1rem 0' }}>
                      You stagger as the room flickers and powers down around you...
                    </p>
                    <p style={{ margin: 0 }}>
                      The neural pathways dim. The hologram fades. The truth has been revealed.
                    </p>
                  </div>
                  <button 
                    className="btn" 
                    onClick={proceedToFinalRoom}
                    style={{ 
                      background: 'linear-gradient(45deg, #bb88ff, #9966cc)',
                      fontSize: '1.2rem',
                      padding: '1.2rem 3rem',
                      border: '2px solid #bb88ff',
                      boxShadow: '0 0 20px rgba(187, 136, 255, 0.5)',
                      animation: 'pulse 2s infinite'
                    }}
                  >
                    🚪 Exit to Final Chamber
                  </button>
                </div>
              ) : (
                <div className="loading" style={{ 
                  borderTopColor: '#bb88ff',
                  borderLeftColor: 'rgba(187, 136, 255, 0.3)'
                }} />
              )}
            </div>
          </div>
        )}


      </div>
    </div>
  )
}

export default Room4
