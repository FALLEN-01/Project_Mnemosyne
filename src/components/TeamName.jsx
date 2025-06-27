import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

// Manhwa-style Level Up Popup Component
const ManhwaPopup = ({ show, title, subtitle, onClose, type = 'info' }) => {
  if (!show) return null

  const getPopupStyle = () => {
    switch (type) {
      case 'levelup':
        return {
          background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
          color: '#000',
          borderColor: '#ffd700',
          boxShadow: '0 0 30px #ffd700'
        }
      case 'error':
        return {
          background: 'linear-gradient(135deg, #ff4444, #ff6666)',
          color: '#fff',
          borderColor: '#ff4444',
          boxShadow: '0 0 30px #ff4444'
        }
      case 'success':
        return {
          background: 'linear-gradient(135deg, #44ff44, #66ff66)',
          color: '#000',
          borderColor: '#44ff44',
          boxShadow: '0 0 30px #44ff44'
        }
      default:
        return {
          background: 'linear-gradient(135deg, #00ffff, #66ccff)',
          color: '#000',
          borderColor: '#00ffff',
          boxShadow: '0 0 30px #00ffff'
        }
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'manhwaPopupIn 0.5s ease-out'
    }}>
      <div style={{
        ...getPopupStyle(),
        padding: '3rem 4rem',
        borderRadius: '20px',
        border: '3px solid',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%',
        animation: 'manhwaGlow 2s infinite alternate',
        position: 'relative'
      }}>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            {subtitle}
          </div>
        )}
        <button
          onClick={onClose}
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
            border: '2px solid rgba(0, 0, 0, 0.3)',
            color: 'inherit',
            padding: '0.8rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

// Interactive Binary Keypad Component
const BinaryKeypad = ({ onSubmit, showSequence }) => {
  const [input, setInput] = useState('')
  const [sequenceIndex, setSequenceIndex] = useState(0)
  const correctSequence = '20217'
  
  // Binary animation sequence - convert each digit to binary
  const binarySequence = [
    '00010', // 2 in binary
    '00000', // 0 in binary
    '00010', // 2 in binary
    '00001', // 1 in binary  
    '00111'  // 7 in binary
  ]

  useEffect(() => {
    if (showSequence && sequenceIndex < binarySequence.length) {
      const timer = setTimeout(() => {
        setSequenceIndex(prev => prev + 1)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showSequence, sequenceIndex, binarySequence.length])

  const handleKeyPress = (value) => {
    if (input.length < 5) {
      setInput(input + value)
    }
  }

  const handleClear = () => {
    setInput('')
  }

  const handleSubmit = () => {
    onSubmit(input)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
      padding: '2rem',
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '15px',
      border: '2px solid rgba(0, 255, 255, 0.3)',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      {/* Binary Sequence Display */}
      {showSequence && (
        <div style={{
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>🔐 NEURAL PATTERN</h3>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {binarySequence.map((binary, index) => (
              <div
                key={index}
                style={{
                  padding: '0.8rem',
                  background: index < sequenceIndex ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  border: index < sequenceIndex ? '2px solid #00ffff' : '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                  color: index < sequenceIndex ? '#00ffff' : '#666',
                  minWidth: '60px',
                  textAlign: 'center',
                  animation: index === sequenceIndex - 1 ? 'binaryFlash 0.5s ease-in-out' : 'none'
                }}
              >
                {binary}
              </div>
            ))}
          </div>
          <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '1rem' }}>
            Decode the pattern...
          </p>
        </div>
      )}

      {/* Input Display */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '1rem 2rem',
        borderRadius: '10px',
        border: '2px solid rgba(0, 255, 255, 0.5)',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        fontFamily: 'monospace',
        color: '#00ffff',
        minWidth: '200px',
        letterSpacing: '0.5rem'
      }}>
        {input || '_____'}
      </div>

      {/* Keypad */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        width: '100%'
      }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
          <button
            key={digit}
            onClick={() => handleKeyPress(digit.toString())}
            style={{
              padding: '1.5rem',
              fontSize: '2rem',
              background: 'linear-gradient(135deg, #333, #555)',
              border: '2px solid #666',
              borderRadius: '10px',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #555, #777)'
              e.target.style.transform = 'scale(1.05)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #333, #555)'
              e.target.style.transform = 'scale(1)'
            }}
          >
            {digit}
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        width: '100%'
      }}>
        <button
          onClick={handleClear}
          style={{
            flex: 1,
            padding: '1rem',
            background: 'linear-gradient(135deg, #ff4444, #ff6666)',
            border: '2px solid #ff4444',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          disabled={input.length !== 5}
          style={{
            flex: 1,
            padding: '1rem',
            background: input.length === 5 ? 'linear-gradient(135deg, #44ff44, #66ff66)' : 'linear-gradient(135deg, #666, #888)',
            border: input.length === 5 ? '2px solid #44ff44' : '2px solid #666',
            borderRadius: '10px',
            color: '#fff',
            cursor: input.length === 5 ? 'pointer' : 'not-allowed',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

const TeamName = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState } = useGameState()
  const [currentPhase, setCurrentPhase] = useState(1)
  const [showPopup, setShowPopup] = useState({ show: false, title: '', subtitle: '', type: 'info' })
  const [showSequence, setShowSequence] = useState(false)

  useEffect(() => {
    // Redirect if team name already set
    if (gameState.teamName) {
      navigate('/room1')
      return
    }

    // Show initial awakening popup
    setTimeout(() => {
      setShowPopup({
        show: true,
        title: '⚡ SYSTEM ONLINE',
        subtitle: 'Neural patterns detected...',
        type: 'info'
      })
    }, 1000)
  }, [gameState.teamName, navigate])

  const handlePopupClose = () => {
    setShowPopup({ ...showPopup, show: false })
    if (currentPhase === 1) {
      setTimeout(() => {
        setCurrentPhase(2)
        setShowSequence(true)
      }, 500)
    }
  }

  const handleBinarySubmit = (input) => {
    if (input === '20217') {
      setShowPopup({
        show: true,
        title: '🎊 ACCESS GRANTED',
        subtitle: 'Subject 20217 - Identity Confirmed',
        type: 'success'
      })
      
      // Set team name and start time
      setTimeout(() => {
        updateGameState({ 
          teamName: 'Subject_20217',
          startTime: new Date()
        })
        navigate('/room1')
      }, 2000)
    } else {
      setShowPopup({
        show: true,
        title: '❌ ACCESS DENIED',
        subtitle: 'Invalid neural signature',
        type: 'error'
      })
    }
  }

  return (
    <div className="room-container">
      <ManhwaPopup
        show={showPopup.show}
        title={showPopup.title}
        subtitle={showPopup.subtitle}
        type={showPopup.type}
        onClose={handlePopupClose}
      />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem 1rem',
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8), #000000)',
        position: 'relative'
      }}>
        {currentPhase === 1 && (
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h1 style={{ 
              color: '#00ffff', 
              marginBottom: '2rem', 
              fontSize: '3rem',
              animation: 'fadeInSlow 2s ease-in'
            }}>
              PROJECT MNEMOSYNE
            </h1>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.7)',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              marginBottom: '2rem'
            }}>
              <p style={{ 
                fontSize: '1.3rem', 
                lineHeight: '1.8',
                color: '#e8e8e8',
                marginBottom: '1rem'
              }}>
                You wake in absolute darkness.
              </p>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8',
                color: '#ccc'
              }}>
                No memory of how you got here. No memory of who you are.<br />
                Only the cold metal beneath you and the faint hum of machinery.
              </p>
            </div>

            <div className="loading" style={{ margin: '2rem auto' }}></div>
            <p style={{ color: '#666' }}>Initializing neural interface...</p>
          </div>
        )}

        {currentPhase === 2 && (
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h2 style={{ 
              color: '#00ffff', 
              marginBottom: '2rem', 
              fontSize: '2rem'
            }}>
              🧠 NEURAL INTERFACE ACTIVE
            </h2>

            <div style={{
              background: 'rgba(0, 0, 0, 0.7)',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8',
                color: '#e8e8e8',
                marginBottom: '1rem'
              }}>
                A terminal flickers to life before you.
              </p>
              <p style={{ 
                fontSize: '1rem', 
                color: '#ff4444',
                fontFamily: 'monospace'
              }}>
                BIOMETRIC AUTHENTICATION REQUIRED
              </p>
            </div>

            <BinaryKeypad onSubmit={handleBinarySubmit} showSequence={showSequence} />
          </div>
        )}

        {/* Floating memory fragments */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '20px',
          height: '20px',
          background: 'rgba(0, 255, 255, 0.3)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          width: '15px',
          height: '15px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: '10px',
          height: '10px',
          background: 'rgba(0, 255, 255, 0.4)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite'
        }}></div>
      </div>

      <style jsx>{`
        @keyframes manhwaPopupIn {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes manhwaGlow {
          0% { box-shadow: 0 0 20px currentColor; }
          100% { box-shadow: 0 0 40px currentColor; }
        }
        
        @keyframes binaryFlash {
          0%, 100% { background: rgba(0, 255, 255, 0.2); }
          50% { background: rgba(0, 255, 255, 0.8); }
        }
        
        @keyframes fadeInSlow {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}

export default TeamName
