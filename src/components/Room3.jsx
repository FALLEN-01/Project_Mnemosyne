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
        completeRoom('room3', { memorySequence: videoSegments })
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
    setTimeout(() => setPlayingLog(null), 3000)
  }

  const handleLogSubmit = () => {
    if (selectedLog === correctLog) {
      setCurrentStep(2)
    } else {
      setError('Archive access denied. Video log corrupted or incomplete. Try another.')
      setSelectedLog('')
    }
  }

  const handleSequenceClick = (tone) => {
    if (audioSequence.length < 4) {
      setAudioSequence([...audioSequence, tone])
    }
  }

  const clearSequence = () => {
    setAudioSequence([])
    setError('')
  }

  const handleSequenceSubmit = () => {
    if (JSON.stringify(audioSequence) === JSON.stringify(correctSequence)) {
      updateGameState({ room3Archive: 'UNLOCKED' })
      completeRoom(3)
      setShowMemory(true)
      
      setTimeout(() => {
        navigate('/room4')
      }, 4000)
    } else {
      setError('Audio sequence incorrect. Memory core remains locked.')
      setAudioSequence([])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (currentStep === 1) {
        handleLogSubmit()
      } else if (currentStep === 2 && audioSequence.length === 4) {
        handleSequenceSubmit()
      }
    }
  }

  if (showMemory) {
    return (
      <div className="room-container">
        <div className="memory-fragment">
          <h2 style={{ color: '#ff6b00', marginBottom: '1rem' }}>ARCHIVE UNLOCKED</h2>
          <div style={{ 
            background: 'rgba(255, 107, 0, 0.1)', 
            padding: '2rem', 
            borderRadius: '10px',
            border: '1px solid rgba(255, 107, 0, 0.3)',
            marginBottom: '2rem',
            fontStyle: 'italic'
          }}>
            <p style={{ fontSize: '1.2rem', color: '#ff6b00', marginBottom: '1rem' }}>
              "My name is Dr. Eon Vale, Chief Neural Engineer of Project M.I.N.D."
            </p>
            <p style={{ marginBottom: '1rem' }}>
              "If you're watching this, the experiments have gone too far. 
              The memory modification technology... it's not just editing memories anymore."
            </p>
            <p style={{ marginBottom: '1rem' }}>
              "It's creating entire false realities. Trapping consciousness in loops. 
              I tried to destroy the core, but they stopped me."
            </p>
            <p style={{ color: '#ff4444' }}>
              "You must reach the Neural Sync Core. End this before it spreads beyond the facility."
            </p>
          </div>
          <div className="loading" style={{ margin: '2rem auto' }}></div>
          <p>Accessing Neural Sync Core...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="room-container">
      {/* 
        DEVELOPER NOTES - Act 3: The Archive
        
        VISUAL STYLE:
        - Orange/amber theme (archival, data preservation)
        - Flickering holographic displays showing corrupted video logs
        - Rows of server towers with pulsing orange LEDs
        - Central viewing station with multiple screens
        - Scattered data drives and corrupted memory cores
        - Dr. Eon Vale's personal workspace with scattered notes
        
        SOUND DESIGN:
        - Constant low hum of server cooling systems
        - Intermittent electrical crackling from damaged equipment
        - Distorted audio fragments playing on loop
        - When video logs play: static, audio dropouts, digital artifacts
        - Audio sequence puzzle: distinct musical tones (Alpha=low, Omega=high, Delta=medium, Theta=harmonic)
        - Success sound: harmonious chord progression resolving
        
        ATMOSPHERE:
        - Repository of forbidden knowledge
        - Corporate cover-up evidence
        - Dr. Vale's desperate attempt to expose the truth
        - Archives partially destroyed but still containing crucial evidence
        - Feeling of uncovering a conspiracy
      */}
      
      <div className="room-header">
        <h1 className="room-title">Room 3 — The Archive</h1>
      </div>

      <div className="room-description">
        <p style={{ marginBottom: '2rem' }}>
          You enter a vast archive chamber lined with server towers. Orange LEDs pulse weakly 
          along damaged data banks. Holographic displays flicker with corrupted video logs. 
          A central viewing station hums with activity, surrounded by scattered notes and drives.
        </p>
        
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          width: '100%',
          maxWidth: '700px',
          alignItems: 'center',
          margin: '2rem auto'
        }}>
          <div style={{ 
            width: '100%',
            maxWidth: '500px',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            opacity: 1,
            transition: 'all 0.8s ease-in-out'
          }}>
            <div style={{ 
              width: '100%', 
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.1), rgba(0, 0, 0, 0.8))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              border: '1px solid rgba(255, 107, 0, 0.3)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ff6b00' }}>�</div>
              <p style={{ color: '#ff6b00', fontSize: '0.9rem' }}>Server Archive</p>
            </div>
          </div>

          <div style={{ 
            width: '100%',
            maxWidth: '500px',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            opacity: 1,
            transition: 'all 0.8s ease-in-out'
          }}>
            <div style={{ 
              width: '100%', 
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.1), rgba(0, 0, 0, 0.8))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              border: '1px solid rgba(255, 107, 0, 0.3)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ff6b00' }}>🎬</div>
              <p style={{ color: '#ff6b00', fontSize: '0.9rem' }}>Video Logs</p>
            </div>
          </div>
        </div>
        
        <div className="terminal" style={{ margin: '2rem auto' }}>
          <div className="terminal-text">
            ARCHIVE SYSTEM v2.1 — Data Recovery Mode<br />
            <span style={{ color: '#ff6b00' }}>
              WARNING: MULTIPLE LOG FILES CORRUPTED
            </span>
          </div>
        </div>

        <p style={{ marginBottom: '2rem', fontStyle: 'italic', color: '#888' }}>
          A nameplate catches your eye: "Dr. Eon Vale - Chief Neural Engineer". 
          Notes are scattered across the desk, many burned or deliberately destroyed.
        </p>

        <div style={{ 
          background: 'rgba(255, 107, 0, 0.1)', 
          padding: '1.5rem', 
          borderRadius: '10px',
          border: '1px solid rgba(255, 107, 0, 0.3)',
          marginBottom: '2rem',
          fontStyle: 'italic'
        }}>
          <p style={{ color: '#ff6b00' }}>Handwritten note (partially burned):</p>
          <p>"They won't listen... the board refuses to shut down M.I.N.D..."</p>
          <p>"Hidden the truth in the archive... someone has to know..."</p>
          <p style={{ color: '#ff4444' }}>"If something happens to me... look for LOG_101..."</p>
        </div>
      </div>

      {currentStep === 1 && (
        <div>
          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <h3 style={{ color: '#ff6b00', marginBottom: '1rem' }}>
              Part 1: Video Log Recovery
            </h3>
            <p style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Multiple video logs are corrupted. Find the intact log that Dr. Vale left behind.
            </p>
          </div>

          <div className="puzzle-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '900px' }}>
            {Object.entries(videoLogs).map(([logId, log]) => (
              <div 
                key={logId}
                className={`puzzle-item ${selectedLog === logId ? 'selected' : ''} ${playingLog === logId ? 'playing' : ''}`}
                onClick={() => handleLogSelect(logId)}
                style={{ 
                  cursor: 'pointer',
                  background: log.corruption === 'high' ? 'rgba(255, 68, 68, 0.1)' : 
                            log.corruption === 'medium' ? 'rgba(255, 170, 68, 0.1)' : 
                            'rgba(255, 107, 0, 0.1)',
                  border: `1px solid ${log.corruption === 'high' ? 'rgba(255, 68, 68, 0.3)' : 
                                      log.corruption === 'medium' ? 'rgba(255, 170, 68, 0.3)' : 
                                      'rgba(255, 107, 0, 0.3)'}`
                }}
              >
                <h3 style={{ color: '#ff6b00' }}>{logId}</h3>
                <div style={{ 
                  fontSize: '2rem', 
                  margin: '1rem 0',
                  color: log.corruption === 'high' ? '#ff4444' : 
                        log.corruption === 'medium' ? '#ffaa44' : '#ff6b00'
                }}>
                  {log.corruption === 'high' ? '⚠️' : 
                   log.corruption === 'medium' ? '�' : '✅'}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>{log.timestamp}</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Status: <span style={{ color: log.corruption === 'low' ? '#44ff44' : '#ffaa44' }}>
                    {log.status}
                  </span>
                </p>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.5rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '5px',
                  fontSize: '0.7rem',
                  color: '#ccc',
                  fontStyle: 'italic',
                  minHeight: '3rem'
                }}>
                  {playingLog === logId ? (
                    <span style={{ color: '#ff6b00' }}>▶️ PLAYING...</span>
                  ) : (
                    `"${log.snippet}"`
                  )}
                </div>
              </div>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="btn" 
            onClick={handleLogSubmit}
            disabled={!selectedLog}
            style={{ marginTop: '2rem' }}
          >
            Access Video Log
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <div className="success-message">
            ✅ Archive Access Granted: {videoLogs[correctLog].timestamp}
          </div>

          <div style={{ 
            background: 'rgba(255, 107, 0, 0.1)', 
            padding: '2rem', 
            borderRadius: '10px',
            border: '1px solid rgba(255, 107, 0, 0.3)',
            margin: '2rem auto',
            maxWidth: '700px'
          }}>
            <h4 style={{ color: '#ff6b00', marginBottom: '1rem' }}>
              📼 LOG_101 - Dr. Eon Vale - Final Message
            </h4>
            <div style={{ 
              fontSize: '1rem', 
              lineHeight: '1.6',
              fontStyle: 'italic',
              color: '#e8e8e8',
              marginBottom: '1rem'
            }}>
              "Project M.I.N.D. was meant to help trauma victims. Delete painful memories. 
              Give people a fresh start. But the corporation... they saw profit."
            </div>
            <div style={{ 
              fontSize: '1rem', 
              lineHeight: '1.6',
              fontStyle: 'italic',
              color: '#e8e8e8',
              marginBottom: '1rem'
            }}>
              "Now they're creating false memories. Implanting loyalty. Control. 
              The subjects don't even know they're trapped."
            </div>
            <div style={{ 
              fontSize: '1rem', 
              lineHeight: '1.6',
              fontStyle: 'italic',
              color: '#ff4444'
            }}>
              "I've hidden the shutdown sequence. Four tones. Find them. Stop this madness."
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <h3 style={{ color: '#ff6b00', marginBottom: '1rem' }}>
              Part 2: Audio Sequence Lock
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              Dr. Vale's shutdown sequence is locked behind an audio puzzle. 
              Find the correct four-tone sequence to unlock the neural core.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            maxWidth: '400px',
            margin: '2rem auto'
          }}>
            {['ALPHA', 'OMEGA', 'DELTA', 'THETA'].map((tone) => (
              <button
                key={tone}
                className="btn"
                onClick={() => handleSequenceClick(tone)}
                disabled={audioSequence.length >= 4}
                style={{
                  padding: '1rem',
                  fontSize: '1rem',
                  background: audioSequence.includes(tone) ? 
                    'rgba(255, 107, 0, 0.3)' : 'rgba(255, 107, 0, 0.1)',
                  border: '1px solid rgba(255, 107, 0, 0.5)',
                  color: '#ff6b00'
                }}
              >
                {tone}
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#888' }}>
                  {tone === 'ALPHA' ? '🎵 Low' : 
                   tone === 'OMEGA' ? '🎵 High' : 
                   tone === 'DELTA' ? '🎵 Medium' : '🎵 Harmonic'}
                </div>
              </button>
            ))}
          </div>

          <div style={{ 
            textAlign: 'center', 
            margin: '2rem auto',
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            maxWidth: '400px'
          }}>
            <h4 style={{ color: '#ff6b00', marginBottom: '1rem' }}>Current Sequence:</h4>
            <div style={{ fontSize: '1.2rem', letterSpacing: '0.5rem', color: '#00ffff' }}>
              {audioSequence.join(' → ') || 'NONE'}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button 
                className="btn" 
                onClick={clearSequence}
                style={{ 
                  background: 'rgba(255, 68, 68, 0.2)',
                  border: '1px solid rgba(255, 68, 68, 0.5)',
                  color: '#ff4444',
                  marginRight: '1rem',
                  padding: '0.5rem 1rem'
                }}
              >
                Clear
              </button>
              <button 
                className="btn" 
                onClick={handleSequenceSubmit}
                disabled={audioSequence.length !== 4}
                style={{ padding: '0.5rem 1rem' }}
              >
                Submit Sequence
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>
      )}

      <div className="terminal" style={{ marginTop: '3rem', maxWidth: '500px' }}>
        <div className="terminal-prompt">ARCHIVE STATUS:</div>
        <div className="terminal-text">
          LOG RECOVERY... {currentStep}/2<br />
          VIDEO ACCESS... {selectedLog ? 'GRANTED' : 'DENIED'}<br />
          AUDIO SEQUENCE... {audioSequence.length}/4 TONES<br />
          NEURAL CORE... {currentStep === 2 && audioSequence.length === 4 ? 'READY' : 'LOCKED'}<br />
        </div>
      </div>
    </div>
  )
}

export default Room3
