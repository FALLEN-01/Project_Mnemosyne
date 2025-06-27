import { useState, useEffect } from 'react'

const CyberpunkTerminal = ({ 
  isOpen, 
  onComplete, 
  title = "SYSTEM ACCESS GRANTED",
  commands = [
    "Neural pathway active...",
    "Memory sync complete...",
    "Transfer initiated..."
  ]
}) => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setCurrentCommandIndex(0)
      setDisplayedText('')
      setShowCursor(true)
      setIsTyping(false)
      setCompleted(false)
      return
    }

    // Start the command sequence
    const startSequence = setTimeout(() => {
      setIsTyping(true)
      executeCommand(0)
    }, 300)

    return () => clearTimeout(startSequence)
  }, [isOpen])

  // Cursor blinking effect
  useEffect(() => {
    if (!isOpen) return

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [isOpen])

  const executeCommand = (commandIndex) => {
    if (commandIndex >= commands.length) {
      setCompleted(true)
      setTimeout(() => {
        onComplete()
      }, 500)
      return
    }

    const command = `${'>'}  ${commands[commandIndex]}`
    let charIndex = 0
    setDisplayedText('')

    const typeCommand = () => {
      if (charIndex <= command.length) {
        setDisplayedText(command.slice(0, charIndex))
        charIndex++
        setTimeout(typeCommand, Math.random() * 20 + 15) // Faster typing speed
      } else {
        // Command finished typing, wait then move to next
        setTimeout(() => {
          setCurrentCommandIndex(commandIndex + 1)
          executeCommand(commandIndex + 1)
        }, 400)
      }
    }

    typeCommand()
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
        border: '2px solid #00ccff',
        borderRadius: '15px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 0 30px rgba(0, 204, 255, 0.3), inset 0 0 20px rgba(0, 204, 255, 0.1)',
        fontFamily: "'Courier New', monospace",
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated scanlines */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 204, 255, 0.03) 2px,
            rgba(0, 204, 255, 0.03) 4px
          )`,
          pointerEvents: 'none',
          animation: 'scan 2s linear infinite'
        }} />

        {/* Header */}
        <div style={{
          color: '#00ccff',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          textAlign: 'center',
          textShadow: '0 0 10px #00ccff'
        }}>
          {title}
        </div>

        {/* Terminal window */}
        <div style={{
          background: '#000000',
          border: '1px solid #00ccff',
          borderRadius: '8px',
          padding: '1.5rem',
          minHeight: '120px',
          position: 'relative'
        }}>
          {/* Display previous commands */}
          {Array.from({ length: currentCommandIndex }, (_, i) => (
            <div key={i} style={{
              color: '#00ccff',
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              {'>'} {commands[i]}
            </div>
          ))}

          {/* Current typing command */}
          {isTyping && currentCommandIndex < commands.length && (
            <div style={{
              color: '#00ccff',
              fontSize: '0.9rem',
              marginBottom: '0.5rem'
            }}>
              {displayedText}
              <span style={{
                opacity: showCursor ? 1 : 0,
                color: '#ffffff'
              }}>_</span>
            </div>
          )}
        </div>
        {/* Bottom status bar */}
        <div style={{
          marginTop: '1rem',
          color: '#666666',
          fontSize: '0.8rem',
          textAlign: 'center'
        }}>
          [ NEURAL INTERFACE ACTIVE ]
        </div>
      </div>
    </div>
  )
}

export default CyberpunkTerminal
