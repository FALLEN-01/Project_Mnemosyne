/**
 * Google Apps Script for Project Mnemosyne Progress Tracking
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet with columns: Team Name, Current Room, Rooms Completed, Start Time, Last Updated, Full State
 * 2. Open script.google.com and create a new project
 * 3. Paste this code and save
 * 4. REPLACE THE SPREADSHEET_ID below with your actual Google Sheet ID
 * 5. Deploy as web app with execute permissions for "Anyone"
 * 6. Copy the web app URL to your .env file
 * 
 * column name as follows 
 * Team Name, Entry Time, Room 1 Entry Time, Room 2 Entry Time, Room 3 Entry Time, Room 4 Entry Time, Exit Hall Entry Time, Passwords 
 */

// REPLACE THIS WITH YOUR ACTUAL GOOGLE SHEET ID
// You can find this in the URL of your Google Sheet: https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
const SPREADSHEET_ID = '1rXXQJR1bhIASh5pQ4nnCCY52GPzgCzunOHW_Vx-JQA0'; // Updated with your actual ID
const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name

function getSheet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`Sheet "${SHEET_NAME}" not found in spreadsheet`);
    }
    return sheet;
  } catch (error) {
    throw new Error(`Cannot access spreadsheet: ${error.toString()}`);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    const teamName = e.parameter.team;
    
    if (action === 'read' && teamName) {
      return readProgress(teamName);
    }
    
    if (action === 'getAll') {
      return getAllProgress();
    }
    
    return createCORSResponse({ error: 'Invalid request' });
      
  } catch (error) {
    return createCORSResponse({ error: error.toString() });
  }
}

function doPost(e) {
  try {
    let data;
    
    // Handle JSON POST (from fetch)
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If JSON parsing fails, treat as form data
        data = null;
      }
    }
    
    // Handle form submission (CORS bypass)
    if (!data && e.parameter) {
      data = {
        action: e.parameter.action,
        team: e.parameter.team,
        progress: {
          teamName: e.parameter.teamName,
          currentRoom: parseInt(e.parameter.currentRoom) || 0,
          roomsCompleted: JSON.parse(e.parameter.roomsCompleted || '[]'),
          startTime: e.parameter.startTime,
          endTime: e.parameter.endTime,
          fullState: JSON.parse(e.parameter.fullState || '{}')
        },
        timestamp: e.parameter.timestamp
      };
    }
    
    if (data && data.action === 'update') {
      return updateProgress(data);
    }
    
    return createCORSResponse({ error: 'Invalid action or data format' });
      
  } catch (error) {
    return createCORSResponse({ error: error.toString() });
  }
}

// Helper function to create CORS-enabled responses
function createCORSResponse(data) {
  const response = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
    
  // Add CORS headers - this is the key fix!
  response.setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  });
  
  return response;
}

function readProgress(teamName) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  // Columns: 0-Team Name, 1-Entry Time, 2-R1, 3-R2, 4-R3, 5-R4, 6-Exit Hall, 7-Completion, 8-Passwords
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === teamName) {
      const progress = {
        teamName: data[i][0],
        entryTime: data[i][1],
        room1Entry: data[i][2],
        room2Entry: data[i][3],
        room3Entry: data[i][4],
        room4Entry: data[i][5],
        exitHallEntry: data[i][6],
        completionTime: data[i][7],
        passwords: (data[i][8] || '').split(',').map(s => s.trim()).filter(Boolean)
      };
      return createCORSResponse({ found: true, progress });
    }
  }
  return createCORSResponse({ found: false });
}

function updateProgress(data) {
  const sheet = getSheet();
  const teamName = data.team;
  const progress = data.progress;
  const timestamp = data.timestamp;
  const dataRange = sheet.getDataRange().getValues();
  let rowIndex = -1;
  // Check if headers exist, if not create them
  if (dataRange.length === 0 || dataRange[0][0] !== 'Team Name') {
    sheet.getRange(1, 1, 1, 9).setValues([
      ['Team Name', 'Entry Time', 'Room 1 Entry Time', 'Room 2 Entry Time', 'Room 3 Entry Time', 'Room 4 Entry Time', 'Exit Hall Entry Time', 'Completion Time', 'Passwords']
    ]);
  }
  // Find existing team row
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === teamName) {
      rowIndex = i + 1;
      break;
    }
  }
  if (rowIndex === -1) {
    rowIndex = sheet.getLastRow() + 1;
  }
  // Prepare passwords as comma-separated string
  let passwords = '';
  if (progress.passwords && Array.isArray(progress.passwords)) {
    passwords = progress.passwords.join(',');
  } else if (typeof progress.passwords === 'string') {
    passwords = progress.passwords;
  }
  // Prepare row data
  const rowData = [
    teamName,
    progress.entryTime || '',
    progress.room1Entry || '',
    progress.room2Entry || '',
    progress.room3Entry || '',
    progress.room4Entry || '',
    progress.exitHallEntry || '',
    progress.completionTime || '',
    passwords
  ];
  sheet.getRange(rowIndex, 1, 1, 9).setValues([rowData]);
  return createCORSResponse({ success: true, message: 'Progress updated successfully' });
}

// Optional: Function to get all team progress (for admin dashboard)
function getAllProgress() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return createCORSResponse({ teams: [] });
  }
  const teams = data.slice(1).map(row => ({
    teamName: row[0],
    entryTime: row[1],
    room1Entry: row[2],
    room2Entry: row[3],
    room3Entry: row[4],
    room4Entry: row[5],
    exitHallEntry: row[6],
    completionTime: row[7],
    passwords: (row[8] || '').split(',').map(s => s.trim()).filter(Boolean)
  }));
  return createCORSResponse({ teams });
}

// Test function to verify sheet access (call this from the Apps Script editor)
function testSheetAccess() {
  try {
    const sheet = getSheet();
    console.log('Sheet accessed successfully:', sheet.getName());
    console.log('Spreadsheet ID:', SPREADSHEET_ID);
    console.log('Current data rows:', sheet.getLastRow());
    return { success: true, sheetName: sheet.getName(), rows: sheet.getLastRow() };
  } catch (error) {
    console.error('Sheet access failed:', error.toString());
    return { success: false, error: error.toString() };
  }
}

// Test endpoint for basic connectivity
function doOptions(e) {
  return createCORSResponse({ message: 'CORS preflight successful' });
}
