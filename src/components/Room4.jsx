import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

// === VISUAL & SOUND NOTES ===
// Core: Violet/Neon | Live UI, hologram pulses | Pulse beeps

const Room4 = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  
  // Check if we're on mobile (screen width < 768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Adjust node positions based on screen size
  const getNodePositions = () => {
    if (isMobile) {
      return [
        { id: 'A1', x: 25, y: 18, rotation: 0, locked: false, pulseFlow: 0 },  // A slightly higher (left-top)
        { id: 'B2', x: 75, y: 18, rotation: 90, locked: false, pulseFlow: 0 }, // B slightly higher (right-top)
        { id: 'C3', x: 50, y: 50, rotation: 180, locked: false, pulseFlow: 0 }, // C center
        { id: 'D4', x: 25, y: 82, rotation: 270, locked: false, pulseFlow: 0 }, // D slightly lower (left-bottom)
        { id: 'E5', x: 75, y: 82, rotation: 45, locked: false, pulseFlow: 0 }   // E slightly lower (right-bottom)
      ]
    } else {
      return [
        { id: 'A1', x: 25, y: 20, rotation: 0, locked: false, pulseFlow: 0 },
        { id: 'B2', x: 75, y: 20, rotation: 90, locked: false, pulseFlow: 0 },
        { id: 'C3', x: 50, y: 50, rotation: 180, locked: false, pulseFlow: 0 },
        { id: 'D4', x: 25, y: 80, rotation: 270, locked: false, pulseFlow: 0 },
        { id: 'E5', x: 75, y: 80, rotation: 45, locked: false, pulseFlow: 0 }
      ]
    }
  }
  
  const [neuralNodes, setNeuralNodes] = useState(getNodePositions())
  
  // Update node positions when screen size changes
  useEffect(() => {
    setNeuralNodes(getNodePositions())
  }, [isMobile])
  const [pulseActive, setPulseActive] = useState(false)
  const [error, setError] = useState('')
  const [showHologram, setShowHologram] = useState(false)
  const [confessionStep, setConfessionStep] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [statusModalType, setStatusModalType] = useState('') // 'success' or 'error'
  const [showMemory, setShowMemory] = useState(false)

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
      // Success - immediately start pulse animation (this hides the button)
      setPulseActive(true)
      
      // Show success modal
      setStatusModalType('success')
      setShowStatusModal(true)
      
      setTimeout(() => {
        setShowStatusModal(false)
        
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
      }, 3000)
    } else {
      // Error - show modal
      setStatusModalType('error')
      setShowStatusModal(true)
      
      setTimeout(() => {
        setShowStatusModal(false)
        // Reset pulse flows
        setNeuralNodes(nodes => 
          nodes.map(node => ({ ...node, pulseFlow: 0 }))
        )
        setError('')
      }, 2000)
    }
  }

  const startConfessionSequence = () => {
    let step = 0
    const interval = setInterval(() => {
      setConfessionStep(step)
      step++
      
      if (step >= confessionMessages.length) {
        clearInterval(interval)
        // Set confession step to final value and auto-redirect after confession
        setConfessionStep(confessionMessages.length)
        
        // Auto-redirect to Exit Hall after confession completes
        setTimeout(() => {
          completeRoom(4)
          updateGameState({ 
            room4_neuralAlignment: neuralNodes.map(n => n.rotation),
            room4_confessionViewed: true 
          })
          setShowMemory(true)
          
          setTimeout(() => {
            navigate('/exit-hall')
          }, 3000)
        }, 2000) // Wait 2 seconds after confession ends before starting memory transition
      }
    }, 3000)
  }

  if (showMemory) {
    return (
      <div className="room-container">
        <div className="memory-fragment">
          <h2 style={{ color: '#bb88ff', marginBottom: '1rem' }}>NEURAL SYNC COMPLETE</h2>
          <div style={{ 
            background: 'rgba(187, 136, 255, 0.1)', 
            padding: '1.5rem', 
            borderRadius: '15px',
            border: '2px solid rgba(187, 136, 255, 0.3)',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ color: '#9966cc', marginBottom: '1rem', fontSize: '1rem' }}>🧠 FINAL CONFESSION DECODED</h3>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Here is the message - The neural pathways align. Dr. Eon Vale's final confession echoes through your consciousness.
            </p>
          </div>
          <div className="loading" style={{ margin: '1.5rem auto' }}></div>
          <p>Approaching Final Chamber...</p>
        </div>
      </div>
    )
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
        <p className="room-subtitle" style={{ color: '#9966cc' }}>
          🧠 MNEMOSYNE CORE INTERFACE
        </p>
      </div>

      <div className="room-description room-puzzle-container" style={{
        margin: '0 auto',
        padding: '0 1rem',
        width: '100%'
      }}>
        <div style={{ 
          background: 'rgba(187, 136, 255, 0.1)', 
          padding: '2rem', 
          borderRadius: '15px',
          border: '2px solid rgba(187, 136, 255, 0.3)',
          marginBottom: '2rem',
          width: '100%'
        }}>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
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

        {/* Neural Pathway Clues */}
        <div style={{ 
          background: 'rgba(187, 136, 255, 0.1)', 
          padding: '1.5rem', 
          borderRadius: '15px',
          border: '2px solid rgba(187, 136, 255, 0.3)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#bb88ff', marginBottom: '1rem', textAlign: 'center' }}>
            🧠 Neural Pathway Clues
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(187, 136, 255, 0.3)'
            }}>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#ccaaff' }}>
                "The first voice to leave the lips — known as Alif in the tongue of the dunes. Spoken only once before silence returns."
              </p>
            </div>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(187, 136, 255, 0.3)'
            }}>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#ccaaff' }}>
                "Born of frost, shaped like two pillars — Beh of the north speaks only once before echo fades."
              </p>
            </div>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(187, 136, 255, 0.3)'
            }}>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#ccaaff' }}>
                "From Athens it curves — some call it Gamma, but it hums twice before settling into clarity."
              </p>
            </div>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(187, 136, 255, 0.3)'
            }}>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#ccaaff' }}>
                "In mantras, I am da — fourth in the chant, but unstable unless chanted four times. Turn with rhythm."
              </p>
            </div>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(187, 136, 255, 0.3)'
            }}>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#ccaaff' }}>
                "I sit silent in scrolls, whispered as eh in sacred breath. It takes six calls before I answer."
              </p>
            </div>
          </div>
        </div>

        {/* Neural Node Interface */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#bb88ff', marginBottom: '1rem', textAlign: 'center' }}>
            Neural Pathway Configuration
          </h3>
          
          <div className="neural-network-container" style={{
            position: 'relative',
            height: 'clamp(300px, 50vh, 500px)',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '2px solid rgba(187, 136, 255, 0.5)',
            borderRadius: '15px',
            margin: '0 auto',
            width: '100%',
            maxWidth: 'min(600px, 90vw)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connection lines - adjust for mobile */}
              {isMobile ? (
                <>
                  <line x1="25" y1="18" x2="50" y2="50" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="0.5" />
                  <line x1="75" y1="18" x2="50" y2="50" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="25" y2="82" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="75" y2="82" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="0.5" />
                  <line x1="25" y1="18" x2="75" y2="18" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="0.5" />
                </>
              ) : (
                <>
                  <line x1="25" y1="20" x2="50" y2="50" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="0.5" />
                  <line x1="75" y1="20" x2="50" y2="50" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="25" y2="80" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="75" y2="80" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="0.5" />
                  <line x1="25" y1="20" x2="75" y2="20" stroke="rgba(187, 136, 255, 0.3)" strokeWidth="0.5" />
                </>
              )}
              
              {/* Pulse animations when active */}
              {pulseActive && (
                <>
                  <circle r="1" fill="#bb88ff" opacity="0.8">
                    <animateMotion dur="2s" repeatCount="indefinite">
                      <path d={isMobile ? "M25,18 L50,50 L25,82 L75,82 L75,18 Z" : "M25,20 L50,50 L25,80 L75,80 L75,20 Z"} />
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
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: 'clamp(50px, 10vw, 70px)',
                  height: 'clamp(50px, 10vw, 70px)',
                  transform: `translate(-50%, -50%) rotate(${node.rotation}deg)`,
                  background: `radial-gradient(circle, rgba(187, 136, 255, ${node.pulseFlow / 100}) 0%, rgba(0, 0, 0, 0.8) 70%)`,
                  border: '3px solid #bb88ff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 2,
                  boxShadow: node.pulseFlow > 0 ? '0 0 20px #bb88ff' : 'none'
                }}
                onClick={() => !pulseActive && rotateNode(node.id)}
              >
                <div style={{
                  color: '#bb88ff',
                  fontWeight: 'bold',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  transform: `rotate(-${node.rotation}deg)` // Keep text upright
                }}>
                  {node.id}
                </div>
                
                {/* Rotation indicator */}
                <div style={{
                  position: 'absolute',
                  top: '5px',
                  width: 'clamp(8px, 2vw, 10px)',
                  height: '2px',
                  background: '#ffaa88',
                  borderRadius: '1px'
                }} />
              </div>
            ))}
          </div>

          {/* Show button only when not in pulse animation and not showing hologram */}
          {!pulseActive && !showHologram && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button 
                className="btn" 
                onClick={startPulseFlow}
                style={{ 
                  background: 'linear-gradient(45deg, #bb88ff, #9966cc)',
                  marginRight: '1rem'
                }}
              >
                Initiate Neural Sync
              </button>
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
              ) : (
                <div style={{ 
                  color: '#ccaaff',
                  animation: 'pulse 2s infinite',
                  textAlign: 'center'
                }}>
                  Transferring to Exit Hall...
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Modal */}
        {showStatusModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-in'
          }}>
            <div style={{
              background: statusModalType === 'success' 
                ? 'rgba(187, 136, 255, 0.2)' 
                : 'rgba(255, 68, 68, 0.2)',
              border: statusModalType === 'success'
                ? '2px solid #bb88ff'
                : '2px solid #ff4444',
              borderRadius: '15px',
              padding: '2rem',
              margin: '2rem',
              animation: 'fadeIn 1s ease-in'
            }}>
              <h3 style={{ 
                color: statusModalType === 'success' ? '#bb88ff' : '#ff4444',
                marginBottom: '1rem', 
                textAlign: 'center',
                fontSize: '1.3rem'
              }}>
                {statusModalType === 'success' ? '✅ NEURAL PATHWAYS ALIGNED' : '❌ SYNCHRONIZATION ERROR'}
              </h3>
              
              <div style={{
                background: 'rgba(0, 0, 0, 0.6)',
                padding: '1.5rem',
                borderRadius: '10px',
                border: statusModalType === 'success'
                  ? '1px solid rgba(187, 136, 255, 0.5)'
                  : '1px solid rgba(255, 68, 68, 0.5)',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>              <div className="terminal" style={{ 
                background: statusModalType === 'success' ? '#1a0f2d' : '#1a0a0a',
                border: statusModalType === 'success' ? '2px solid #bb88ff' : '2px solid #ff4444',
                color: statusModalType === 'success' ? '#bb88ff' : '#ff4444',
                padding: '1rem',
                borderRadius: '8px'
              }}>
                <div style={{ 
                  color: statusModalType === 'success' ? '#ccaaff' : '#ffcccc', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem' 
                }}>
                  {statusModalType === 'success' ? 'NEURAL CORE STATUS:' : 'SYNC ERROR:'}
                </div>
                <div style={{ lineHeight: '1.4' }}>
                  {statusModalType === 'success' ? (
                    <>
                      NODES ALIGNED... {neuralNodes.filter((n, index) => correctRotations[index] === n.rotation).length}/5<br />
                      PULSE FLOW... ACTIVE<br />
                      HOLOGRAM... BROADCASTING<br />
                      INTEGRITY OVERWRITE... INITIATED
                    </>
                  ) : (
                    <>
                      NODES ALIGNED... {neuralNodes.filter((n, index) => correctRotations[index] === n.rotation).length}/5<br />
                      PULSE FLOW... STANDBY<br />
                      HOLOGRAM... OFFLINE<br />
                      INTEGRITY OVERWRITE... PENDING
                    </>
                  )}
                </div>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Room4
