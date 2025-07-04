import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, createContext, useContext, useEffect } from 'react'
import './App.css'

// Import components
import TeamEntry from './components/TeamEntry'
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
      <Route path="/" element={<TeamEntry />} />
      <Route path="/intro" element={<Intro />} />
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
    isLoading: false, // For Google Sheets operations
    // Room completion timestamps
    room1EntryTime: null,
    room2EntryTime: null,
    room3EntryTime: null,
    room4EntryTime: null,
    exitHallEntryTime: null
  })

  // Load progress from localStorage and sync with Google Sheets
  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = async () => {
    try {
      // First check localStorage for quick restoration
      const savedState = localStorage.getItem('mnemosyne-progress')
      if (savedState) {
        const parsed = JSON.parse(savedState)
        setGameState(prev => ({ ...prev, ...parsed }))
        
        // Sync with Google Sheets if we have a team name
        if (parsed.teamName) {
          syncWithGoogleSheets(parsed.teamName)
        }
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  }

  const syncWithGoogleSheets = async (teamName) => {
    if (!teamName || !window.loadProgressFromSheets) {
      console.log('Google Sheets not available or no team name')
      return
    }

    try {
      setGameState(prev => ({ ...prev, isLoading: true }))
      
      // Read current progress from Google Sheets using standalone script
      const progressData = await window.loadProgressFromSheets(teamName)
      
      if (progressData) {
        // Restore progress from Google Sheets, but preserve existing timestamps
        setGameState(prev => {
          const restored = {
            ...prev,
            ...progressData,
            isLoading: false
          }
          
          // Preserve existing timestamps if they exist and aren't being overwritten
          if (prev.room1EntryTime && !progressData.room1EntryTime) {
            restored.room1EntryTime = prev.room1EntryTime
          }
          if (prev.room2EntryTime && !progressData.room2EntryTime) {
            restored.room2EntryTime = prev.room2EntryTime
          }
          if (prev.room3EntryTime && !progressData.room3EntryTime) {
            restored.room3EntryTime = prev.room3EntryTime
          }
          if (prev.room4EntryTime && !progressData.room4EntryTime) {
            restored.room4EntryTime = prev.room4EntryTime
          }
          if (prev.exitHallEntryTime && !progressData.exitHallEntryTime) {
            restored.exitHallEntryTime = prev.exitHallEntryTime
          }
          
          return restored
        })
        
        // Save to localStorage as backup - but use the merged state
        setTimeout(() => {
          localStorage.setItem('mnemosyne-progress', JSON.stringify(progressData))
        }, 100)
      } else {
        setGameState(prev => ({ ...prev, isLoading: false }))
      }
    } catch (error) {
      console.error('Error syncing with Google Sheets:', error)
      setGameState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const updateProgress = async (updates) => {
    let newState
    
    // Use functional state update to ensure we get the latest state
    setGameState(prevState => {
      newState = { ...prevState, ...updates }
      
      // Debug: Check if we're losing room completion data
      if (prevState.roomsCompleted.length > 0 && (!newState.roomsCompleted || newState.roomsCompleted.length < prevState.roomsCompleted.length)) {
        console.error('🚨 CRITICAL: Room completion data being lost!');
        console.error('Previous roomsCompleted:', prevState.roomsCompleted);
        console.error('New roomsCompleted:', newState.roomsCompleted);
        console.error('Stack trace:', new Error().stack);
      }
      
      // Ensure timestamp fields are never overwritten with null/undefined
      if (prevState.room1EntryTime && !newState.room1EntryTime) {
        console.warn('⚠️ Preserving room1EntryTime:', prevState.room1EntryTime);
        newState.room1EntryTime = prevState.room1EntryTime;
      }
      if (prevState.room2EntryTime && !newState.room2EntryTime) {
        console.warn('⚠️ Preserving room2EntryTime:', prevState.room2EntryTime);
        newState.room2EntryTime = prevState.room2EntryTime;
      }
      if (prevState.room3EntryTime && !newState.room3EntryTime) {
        console.warn('⚠️ Preserving room3EntryTime:', prevState.room3EntryTime);
        newState.room3EntryTime = prevState.room3EntryTime;
      }
      if (prevState.room4EntryTime && !newState.room4EntryTime) {
        console.warn('⚠️ Preserving room4EntryTime:', prevState.room4EntryTime);
        newState.room4EntryTime = prevState.room4EntryTime;
      }
      if (prevState.exitHallEntryTime && !newState.exitHallEntryTime) {
        console.warn('⚠️ Preserving exitHallEntryTime:', prevState.exitHallEntryTime);
        newState.exitHallEntryTime = prevState.exitHallEntryTime;
      }
      
      return newState
    })
    
    // Save to localStorage immediately after state is set
    setTimeout(() => {
      localStorage.setItem('mnemosyne-progress', JSON.stringify(newState))
    }, 0)
    
    // Update Google Sheets using standalone script
    if (newState?.teamName && window.saveProgressToSheets) {
      setTimeout(async () => {
        try {
          // Collect all passwords entered by the team (ignoring for now)
          const passwords = []

          // Debug room entry logic
          console.log('🔍 ROOM ENTRY DEBUG:');
          console.log('newState.roomsCompleted:', newState.roomsCompleted);
          console.log('newState.room1EntryTime:', newState.room1EntryTime);
          console.log('newState.room2EntryTime:', newState.room2EntryTime);
          console.log('newState.room3EntryTime:', newState.room3EntryTime);
          console.log('newState.room4EntryTime:', newState.room4EntryTime);
          console.log('newState.exitHallEntryTime:', newState.exitHallEntryTime);

          const progressData = {
            teamName: newState.teamName,
            entryTime: newState.startTime,
            room1Entry: newState.room1EntryTime || (newState.roomsCompleted.includes(1) ? new Date().toISOString() : ''),
            room2Entry: newState.room2EntryTime || (newState.roomsCompleted.includes(2) ? new Date().toISOString() : ''),
            room3Entry: newState.room3EntryTime || (newState.roomsCompleted.includes(3) ? new Date().toISOString() : ''),
            room4Entry: newState.room4EntryTime || (newState.roomsCompleted.includes(4) ? new Date().toISOString() : ''),
            exitHallEntry: newState.exitHallEntryTime || (newState.roomsCompleted.includes(5) ? new Date().toISOString() : ''),
            completionTime: newState.endTime || '',
            passwords: passwords
          }

          console.log('📤 SENDING TO SHEETS:', progressData);

          await window.saveProgressToSheets(progressData)
        } catch (error) {
          console.error('Error updating Google Sheets:', error)
          // Don't block the game if Google Sheets fails
        }
      }, 0)
    }
  }

  const updateGameState = (updates) => {
    updateProgress(updates)
  }

  const completeRoom = (roomNumber) => {
    const now = new Date().toISOString()
    
    // Use functional update to get current state and create updates
    setGameState(prevState => {
      const updates = {
        ...prevState,
        roomsCompleted: [...prevState.roomsCompleted, roomNumber],
        currentRoom: roomNumber
      }
      
      // Set the appropriate room entry timestamp only if not already set
      switch(roomNumber) {
        case 1:
          if (!prevState.room1EntryTime) {
            updates.room1EntryTime = now
          }
          break
        case 2:
          if (!prevState.room2EntryTime) {
            updates.room2EntryTime = now
          }
          break
        case 3:
          if (!prevState.room3EntryTime) {
            updates.room3EntryTime = now
          }
          break
        case 4:
          if (!prevState.room4EntryTime) {
            updates.room4EntryTime = now
          }
          break
        case 5:
          if (!prevState.exitHallEntryTime) {
            updates.exitHallEntryTime = now
          }
          break
      }
      
      // Save to localStorage and Google Sheets
      setTimeout(() => {
        localStorage.setItem('mnemosyne-progress', JSON.stringify(updates))
        
        if (updates.teamName && window.saveProgressToSheets) {
          const progressData = {
            teamName: updates.teamName,
            entryTime: updates.startTime,
            room1Entry: updates.room1EntryTime || '',
            room2Entry: updates.room2EntryTime || '',
            room3Entry: updates.room3EntryTime || '',
            room4Entry: updates.room4EntryTime || '',
            exitHallEntry: updates.exitHallEntryTime || '',
            completionTime: updates.endTime || '',
            passwords: []
          }
          
          console.log(`📤 ROOM ${roomNumber} COMPLETED - SENDING TO SHEETS:`, progressData);
          window.saveProgressToSheets(progressData).catch(console.error)
        }
      }, 0)
      
      return updates
    })
  }

  // Function to get the appropriate route based on progress
  const getProgressRoute = () => {
    if (!gameState.teamName) return '/'
    if (gameState.roomsCompleted.includes(5)) return '/exit-hall'
    if (gameState.roomsCompleted.includes(4)) return '/room4'
    if (gameState.roomsCompleted.includes(3)) return '/room3'
    if (gameState.roomsCompleted.includes(2)) return '/room2'
    if (gameState.roomsCompleted.includes(1)) return '/room1'
    return '/intro'
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
