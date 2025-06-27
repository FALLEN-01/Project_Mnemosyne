import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../App'

// === VISUAL & SOUND NOTES ===
// Archive: Orange/Shadow | VHS glitch, echo FX | Voice loops

const Room3 = () => {
  const navigate = useNavigate()
  const { gameState, updateGameState, completeRoom } = useGameState()
  const [videoSegments, setVideoSegments] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [showReveal, setShowReveal] = useState(false)
  const [playingSegment, setPlayingSegment] = useState(null)

  // Six memory video segments (A-F) that need to be sequenced correctly
  const memorySegments = {
    A: { 
      content: 'Subject exhibits... abnormal neural activity...',
      audioTone: 'high-pitch',
      glitchLevel: 'medium'
    },
    B: { 
      content: 'Identity fragmentation accelerating... memory gaps forming...',
      audioTone: 'low-rumble',
      glitchLevel: 'high'
    },
    C: { 
      content: 'Dr. Eon Vale, personal log... what have I done...',
      audioTone: 'clear',
      glitchLevel: 'low'
    },
    D: { 
      content: 'The board demands results... ethics be damned...',
      audioTone: 'distorted',
      glitchLevel: 'extreme'
    },
    E: { 
      content: 'If you find this... I failed... I am you...',
      audioTone: 'whisper',
      glitchLevel: 'low'
    },
    F: { 
      content: 'Memory reconstruction protocol... initiating wipe...',
      audioTone: 'static',
      glitchLevel: 'high'
    }
  }

  // Correct sequence based on story chronology: C-A-D-F-B-E
  const correctSequence = ['C', 'A', 'D', 'F', 'B', 'E']

  useEffect(() => {
    // Redirect to team name entry if no team name is set
    if (!gameState.teamName) {
      navigate('/')
      return
    }
  }, [gameState.teamName, navigate])

  const handleSegmentSelect = (position, segment) => {
    const newSegments = [...videoSegments]
    newSegments[position] = segment
    setVideoSegments(newSegments)
    setError('')
    
    // Play segment preview
    setPlayingSegment(segment)
    setTimeout(() => setPlayingSegment(null), 2000)
  }

  const checkSequence = () => {
    if (videoSegments.includes('')) {
      setError('Please arrange all video segments')
      return
    }

    if (JSON.stringify(videoSegments) === JSON.stringify(correctSequence)) {
      setShowReveal(true)
      setTimeout(() => {
        completeRoom('room3')
        updateGameState({ room3_memorySequence: videoSegments })
        navigate('/room4')
      }, 4000)
    } else {
      setError('Sequence incorrect - memory fragments not aligned')
      // Reset after failed attempt
      setTimeout(() => {
        setVideoSegments(['', '', '', '', '', ''])
      }, 1500)
    }
  }

  const clearSequence = () => {
    setVideoSegments(['', '', '', '', '', ''])
    setError('')
  }

  return (
    <div className="room-container" style={{
      background: 'linear-gradient(135deg, #2d1b14 0%, #4a3728 50%, #1a0f0a 100%)',
      color: '#ff9900'
    }}>
      <div className="room-header">
        <h1 className="room-title" style={{ 
          color: '#ff9900',
          textShadow: '0 0 20px rgba(255, 153, 0, 0.8)'
        }}>
          ROOM 3 - THE ARCHIVE
        </h1>
        <p style={{ color: '#cc7700', fontSize: '1.1rem' }}>
          🗄️ MEMORY RECONSTRUCTION CHAMBER
        </p>
      </div>

      <div className="room-description">
        <div style={{ 
          background: 'rgba(255, 153, 0, 0.1)', 
          padding: '2rem', 
          borderRadius: '15px',
          border: '2px solid rgba(255, 153, 0, 0.3)',
          marginBottom: '2rem'
        }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Screens flicker with looping video logs of yourself. You speak, but your past self ignores you.
            The air hums with digital echoes and fragmented memories.
          </p>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 153, 0, 0.5)',
            fontStyle: 'italic',
            color: '#ffcc66'
          }}>
            The screens show six video segments, each corrupted by time and trauma.
            Arrange them in chronological order to unlock the truth.
          </div>
        </div>

        {/* Video Segment Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#ff9900', marginBottom: '1rem', textAlign: 'center' }}>
            Available Memory Fragments
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {Object.entries(memorySegments).map(([id, segment]) => (
              <div
                key={id}
                style={{
                  background: videoSegments.includes(id) 
                    ? 'rgba(255, 153, 0, 0.3)' 
                    : 'rgba(255, 153, 0, 0.1)',
                  border: '2px solid rgba(255, 153, 0, 0.5)',
                  borderRadius: '10px',
                  padding: '1rem',
                  cursor: videoSegments.includes(id) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: videoSegments.includes(id) ? 0.5 : 1,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => {
                  if (!videoSegments.includes(id)) {
                    const emptyIndex = videoSegments.findIndex(s => s === '')
                    if (emptyIndex !== -1) {
                      handleSegmentSelect(emptyIndex, id)
                    }
                  }
                }}
              >
                <div style={{ 
                  fontWeight: 'bold', 
                  color: '#ff9900', 
                  marginBottom: '0.5rem',
                  fontSize: '1.2rem'
                }}>
                  SEGMENT {id}
                </div>
                
                <div style={{
                  fontSize: '0.9rem',
                  color: '#ffcc99',
                  marginBottom: '0.5rem',
                  fontStyle: 'italic'
                }}>
                  Audio: {segment.audioTone} | Glitch: {segment.glitchLevel}
                </div>

                {playingSegment === id && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 153, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontWeight: 'bold',
                    animation: 'pulse 0.5s infinite'
                  }}>
                    PLAYING...
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Memory Sequence Timeline */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#ff9900', marginBottom: '1rem', textAlign: 'center' }}>
            Memory Timeline Reconstruction
          </h3>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.5rem',
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            {videoSegments.map((segment, index) => (
              <div
                key={index}
                style={{
                  width: '80px',
                  height: '80px',
                  background: segment 
                    ? 'rgba(255, 153, 0, 0.3)' 
                    : 'rgba(255, 153, 0, 0.1)',
                  border: '2px solid rgba(255, 153, 0, 0.5)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff9900',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  cursor: segment ? 'pointer' : 'default'
                }}
                onClick={() => {
                  if (segment) {
                    handleSegmentSelect(index, '')
                  }
                }}
              >
                {segment || (index + 1)}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <button 
              className="btn" 
              onClick={checkSequence}
              disabled={videoSegments.includes('')}
              style={{ 
                marginRight: '1rem',
                background: videoSegments.includes('') 
                  ? '#666' 
                  : 'linear-gradient(45deg, #ff9900, #cc7700)'
              }}
            >
              Reconstruct Memory
            </button>
            
            <button 
              className="btn" 
              onClick={clearSequence}
              style={{ 
                background: 'linear-gradient(45deg, #cc0000, #990000)',
                color: '#fff'
              }}
            >
              Clear Timeline
            </button>
          </div>
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

        {/* Memory Reveal */}
        {showReveal && (
          <div style={{
            background: 'rgba(255, 153, 0, 0.2)',
            border: '2px solid #ff9900',
            borderRadius: '15px',
            padding: '2rem',
            marginTop: '2rem',
            animation: 'fadeIn 1s ease-in'
          }}>
            <h3 style={{ color: '#ff9900', marginBottom: '1rem', textAlign: 'center' }}>
              🔓 MEMORY RECONSTRUCTION COMPLETE
            </h3>
            
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '1.5rem',
              fontSize: '1.1rem',
              lineHeight: '1.6'
            }}>
              <p style={{ marginBottom: '1rem' }}>
                The timeline clarifies. You remember now...
              </p>
              
              <div style={{
                background: 'rgba(0, 0, 0, 0.6)',
                padding: '1.5rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 153, 0, 0.5)',
                marginBottom: '1rem'
              }}>
                <div style={{ marginBottom: '1rem', fontWeight: 'bold', color: '#ffcc00' }}>
                  📱 ARCHIVED ITEMS DISCOVERED:
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  🏷️ Scorched ID Badge: <span style={{ color: '#ff9900' }}>Dr. Eon Vale</span>
                </div>
                <div style={{ fontStyle: 'italic', color: '#ffcc99' }}>
                  📝 Hand-written note: "If you're reading this, I failed. I am you."
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#cc7700' }}>
              Proceeding to Neural Sync Core...
            </div>
          </div>
        )}

        <div className="terminal" style={{ 
          background: '#1a0f0a',
          border: '2px solid #ff9900',
          color: '#ff9900'
        }}>
          <div style={{ color: '#ffcc00', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            ARCHIVE STATUS:
          </div>
          <div style={{ lineHeight: '1.4' }}>
            MEMORY FRAGMENTS... {videoSegments.filter(s => s !== '').length}/6 LOADED<br />
            SEQUENCE INTEGRITY... {videoSegments.includes('') ? 'INCOMPLETE' : 'READY'}<br />
            IDENTITY RECONSTRUCTION... {showReveal ? 'ACTIVE' : 'PENDING'}<br />
            NEXT CHAMBER... {showReveal ? 'UNLOCKING' : 'LOCKED'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Room3
