// Standalone Google Sheets Integration for Project Mnemosyne
// Usage: Include this file via <script> or call functions from browser console
// No import into main React app required

// Set your Google Apps Script Web App URL here:
const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

/**
 * Save team progress to Google Sheets
 * @param {string} teamName
 * @param {object} progressObj - { currentRoom, roomsCompleted, startTime, endTime, room1Code, room2Phrase, room3Word, room4Answer }
 * @returns {Promise<object>} - Result from Google Apps Script
 */
async function saveProgressToSheets(teamName, progressObj) {
  if (!GOOGLE_SHEETS_URL || !teamName) {
    throw new Error('Google Sheets URL or team name missing');
  }
  const payload = {
    action: 'update',
    team: teamName,
    progress: progressObj,
    timestamp: new Date().toISOString()
  };
  const response = await fetch(GOOGLE_SHEETS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await response.json();
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

// Example usage (uncomment to test in browser console):
// saveProgressToSheets('Test Team', { currentRoom: 1, roomsCompleted: [0], startTime: new Date().toISOString(), room1Code: 'TEST' })
//   .then(console.log).catch(console.error);
// loadProgressFromSheets('Test Team').then(console.log).catch(console.error);
