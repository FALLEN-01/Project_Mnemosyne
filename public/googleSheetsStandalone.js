// Standalone Google Sheets Integration for Project Mnemosyne
// Usage: Include this file via <script> in index.html or call functions from browser console
// No import into main React app required

// Set your Google Apps Script Web App URL here:
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzMaXVIngKK2F7MFpkdwNb5M2yxvX_sNoB1_oQZtwKL9pdYcYpE_TN-PHyPEaqCkGLoww/exec';

/**
 * Save team progress to Google Sheets
 * @param {object} progressObj - { teamName, entryTime, room1Entry, room2Entry, room3Entry, room4Entry, exitHallEntry, completionTime, passwords }
 * @returns {Promise<object>} - Result from Google Apps Script
 */
async function saveProgressToSheets(progressObj) {
  if (!GOOGLE_SHEETS_URL || !progressObj.teamName) {
    throw new Error('Google Sheets URL or team name missing');
  }
  
  console.log('Saving progress to sheets:', progressObj);
  
  // Use form data approach to avoid CORS preflight for POST
  const formData = new FormData();
  formData.append('action', 'update');
  formData.append('team', progressObj.teamName);
  formData.append('progress', JSON.stringify(progressObj));
  formData.append('timestamp', new Date().toISOString());
  
  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Save result:', result);
    return result;
  } catch (error) {
    console.error('Save to sheets failed:', error);
    throw error;
  }
}

/**
 * Load team progress from Google Sheets
 * @param {string} teamName
 * @returns {Promise<object|null>} - Progress object or null if not found
 */
async function loadProgressFromSheets(teamName) {
  if (!GOOGLE_SHEETS_URL || !teamName) {
    throw new Error('Google Sheets URL or team name missing');
  }
  const response = await fetch(`${GOOGLE_SHEETS_URL}?action=read&team=${encodeURIComponent(teamName)}`);
  const data = await response.json();
  if (data.found && data.progress) return data.progress;
  return null;
}

// Expose globally for use from anywhere
window.saveProgressToSheets = saveProgressToSheets;
window.loadProgressFromSheets = loadProgressFromSheets;

// Example usage (uncomment to test in browser console):
// saveProgressToSheets({
//   teamName: 'Test Team',
//   entryTime: new Date().toISOString(),
//   room1Entry: '',
//   room2Entry: '',
//   room3Entry: '',
//   room4Entry: '',
//   exitHallEntry: '',
//   completionTime: '',
//   passwords: ['alpha', 'beta', 'gamma']
// }).then(console.log).catch(console.error);
// loadProgressFromSheets('Test Team').then(console.log).catch(console.error);
