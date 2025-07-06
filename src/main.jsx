import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Inject environment variables into window for standalone scripts
window.VITE_GOOGLE_SHEETS_STANDALONE_URL = import.meta.env.VITE_GOOGLE_SHEETS_STANDALONE_URL
window.VITE_GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL
window.VITE_GOOGLE_SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID
window.VITE_GOOGLE_SHEET_NAME = import.meta.env.VITE_GOOGLE_SHEET_NAME

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
