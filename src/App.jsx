import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, createContext, useContext, useEffect } from 'react'
import './App.css'

// Import components
import Intro from './components/Intro'
import Room1 from './components/Room1'
import Room2 from './components/Room2'
import Room3 from './components/Room3'
import Room4 from './components/Room4'
import ExitHall from './components/ExitHall'

// Game state context
const GameContext = createContext()

export const useGameState = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameState must be used within GameProvider')
  }
  return context
}

function AppRoutes() {
  const location = useLocation()
  
  return (
    <Routes key={location.pathname}>
      <Route path="/" element={<Intro />} />
      <Route path="/room1" element={<Room1 />} />
      <Route path="/room2" element={<Room2 />} />
      <Route path="/room3" element={<Room3 />} />
      <Route path="/room4" element={<Room4 />} />
      <Route path="/exit-hall" element={<ExitHall />} />
      {/* Catch-all route for debugging */}
      <Route path="*" element={<div>Route not found: {location.pathname}</div>} />
    </Routes>
  )
}

function App() {
  const [gameState, setGameState] = useState({
    teamName: '',
    room1Code: '',
    room2Phrase: '',
    room3Word: '',
    room4Answer: '',
    startTime: null,
    endTime: null,
    roomsCompleted: [],
    currentRoom: 0, // Track current room for restoration
    isLoading: false // For Google Sheets operations
  })

  // Google Sheets integration - temporarily disabled for debugging
  const GOOGLE_SHEETS_URL = '' // process.env.REACT_APP_GOOGLE_SHEETS_URL || ''
  
  // Load progress from localStorage only (Google Sheets temporarily disabled)
  useEffect(() => {
    // Skip loading for now to debug
    console.log('App loaded, gameState:', gameState)
  }, [])

  const loadProgress = async () => {
    try {
      // First check localStorage for quick restoration
      const savedState = localStorage.getItem('mnemosyne-progress')
      if (savedState) {
        const parsed = JSON.parse(savedState)
        setGameState(prev => ({ ...prev, ...parsed }))
        
        // Only sync with Google Sheets if URL is configured and we have a team name
        if (parsed.teamName && GOOGLE_SHEETS_URL) {
          syncWithGoogleSheets(parsed.teamName)
        }
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  }

  const syncWithGoogleSheets = async (teamName) => {
    if (!GOOGLE_SHEETS_URL || !teamName) {
      console.log('Google Sheets URL not configured or no team name')
      return
    }

    try {
      setGameState(prev => ({ ...prev, isLoading: true }))
      
      // Read current progress from Google Sheets
      const response = await fetch(`${GOOGLE_SHEETS_URL}?action=read&team=${encodeURIComponent(teamName)}`)
      
      if (response.ok) {
        const data = await response.json()
        if (data.found) {
          // Restore progress from Google Sheets
          setGameState(prev => ({
            ...prev,
            ...data.progress,
            isLoading: false
          }))
          
          // Save to localStorage as backup
          localStorage.setItem('mnemosyne-progress', JSON.stringify(data.progress))
        } else {
          setGameState(prev => ({ ...prev, isLoading: false }))
        }
      } else {
        setGameState(prev => ({ ...prev, isLoading: false }))
      }
    } catch (error) {
      console.error('Error syncing with Google Sheets:', error)
      setGameState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const updateProgress = async (updates) => {
    const newState = { ...gameState, ...updates }
    
    // Update local state
    setGameState(newState)
    
    // Save to localStorage immediately
    localStorage.setItem('mnemosyne-progress', JSON.stringify(newState))
    
    // Update Google Sheets if we have a team name and URL is configured
    if (newState.teamName && GOOGLE_SHEETS_URL) {
      try {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'update',
            team: newState.teamName,
            progress: newState,
            timestamp: new Date().toISOString()
          })
        })
      } catch (error) {
        console.error('Error updating Google Sheets:', error)
        // Don't block the game if Google Sheets fails
      }
    }
  }

  const updateGameState = (updates) => {
    updateProgress(updates)
  }

  const completeRoom = (roomNumber) => {
    const newState = {
      roomsCompleted: [...gameState.roomsCompleted, roomNumber],
      currentRoom: roomNumber
    }
    updateProgress(newState)
  }

  // Function to get the appropriate route based on progress
  const getProgressRoute = () => {
    if (!gameState.teamName) return '/'
    if (gameState.roomsCompleted.includes(4)) return '/exit-hall'
    if (gameState.roomsCompleted.includes(3)) return '/room4'
    if (gameState.roomsCompleted.includes(2)) return '/room3'
    if (gameState.roomsCompleted.includes(1)) return '/room2'
    if (gameState.roomsCompleted.includes(0)) return '/room1'
    return '/'
  }

  return (
    <GameContext.Provider value={{ 
      gameState, 
      updateGameState, 
      completeRoom, 
      syncWithGoogleSheets,
      getProgressRoute
    }}>
      <Router>
        <div className="app">
          {gameState.isLoading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              background: '#0a0a1a',
              color: '#00ccff',
              fontSize: '1.5rem'
            }}>
              Synchronizing progress...
            </div>
          ) : (
            <AppRoutes />
          )}
        </div>
      </Router>
    </GameContext.Provider>
  )
}

export default App
