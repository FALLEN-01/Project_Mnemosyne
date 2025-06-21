import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import './App.css'

// Import components
import TeamName from './components/TeamName'
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
      <Route path="/" element={<TeamName />} />
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
    roomsCompleted: []
  })

  const updateGameState = (updates) => {
    setGameState(prev => ({ ...prev, ...updates }))
  }

  const completeRoom = (roomNumber) => {
    setGameState(prev => ({
      ...prev,
      roomsCompleted: [...prev.roomsCompleted, roomNumber]
    }))
  }

  return (
    <GameContext.Provider value={{ gameState, updateGameState, completeRoom }}>
      <Router>
        <div className="app">
          <AppRoutes />
        </div>
      </Router>
    </GameContext.Provider>
  )
}

export default App
