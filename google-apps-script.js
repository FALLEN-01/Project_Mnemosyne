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
    
    console.log('doPost called with parameters:', JSON.stringify(e.parameter));
    console.log('doPost called with postData:', e.postData ? JSON.stringify(e.postData) : 'null');
    
    // Handle form data (from FormData submission)
    if (e.parameter && e.parameter.action) {
      console.log('Processing as form data');
      data = {
        action: e.parameter.action,
        team: e.parameter.team,
        progress: e.parameter.progress ? JSON.parse(e.parameter.progress) : {},
        timestamp: e.parameter.timestamp
      };
      console.log('Form data processed:', JSON.stringify(data));
    }
    // Handle JSON POST (from fetch with JSON)
    else if (e.postData && e.postData.contents) {
      console.log('Processing as JSON data');
      try {
        data = JSON.parse(e.postData.contents);
        console.log('JSON data processed:', JSON.stringify(data));
      } catch (jsonError) {
        console.error('JSON parsing failed:', jsonError.toString());
        return createCORSResponse({ error: 'Invalid JSON format' });
      }
    }
    
    // Additional validation
    if (!data) {
      console.error('No data received');
      return createCORSResponse({ error: 'No data received', parameters: e.parameter, postData: e.postData });
    }
    
    if (!data.action) {
      console.error('No action specified');
      return createCORSResponse({ error: 'No action specified', data: data });
    }
    
    // Log the received data for debugging
    console.log('Final processed data:', JSON.stringify(data));
    
    if (data.action === 'update') {
      return updateProgress(data);
    }
    
    return createCORSResponse({ error: 'Invalid action: ' + data.action, receivedData: data });
      
  } catch (error) {
    console.error('doPost error:', error.toString());
    return createCORSResponse({ error: error.toString(), stack: error.stack });
  }
}

// Helper function to create CORS-enabled responses
function createCORSResponse(data) {
  const response = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
    
  // Note: Google Apps Script automatically handles CORS for web apps deployed with "Anyone" access
  // No manual CORS headers needed when properly deployed
  
  return response;
}

function readProgress(teamName) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  // Columns: 0-teamName, 1-entryTime, 2-room1Entry, 3-room2Entry, 4-room3Entry, 5-room4Entry, 6-exitHallEntry, 7-completionTime, 8-passwords
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
  try {
    const sheet = getSheet();
    
    // Add detailed logging for debugging
    console.log('updateProgress received data type:', typeof data);
    console.log('updateProgress received data keys:', Object.keys(data || {}));
    console.log('updateProgress full data:', JSON.stringify(data));
    
    // Extract team name - handle multiple possible structures
    let teamName = null;
    let progress = {};
    
    if (data.team) {
      teamName = data.team;
      progress = data.progress || {};
    } else if (data.progress && data.progress.teamName) {
      teamName = data.progress.teamName;
      progress = data.progress;
    } else if (data.teamName) {
      teamName = data.teamName;
      progress = data;
    }
    
    const timestamp = data.timestamp;
    
    console.log('Extracted values:', { teamName, progress, timestamp });
    
    if (!teamName) {
      console.error('Team name extraction failed. Available data:', JSON.stringify(data));
      throw new Error('Team name is required. Available keys: ' + Object.keys(data || {}).join(', '));
    }
    
    const dataRange = sheet.getDataRange().getValues();
    let rowIndex = -1;
    
    // Check if headers exist, if not create them
    if (dataRange.length === 0 || dataRange[0][0] !== 'teamName') {
      sheet.getRange(1, 1, 1, 9).setValues([
        ['teamName', 'entryTime', 'room1Entry', 'room2Entry', 'room3Entry', 'room4Entry', 'exitHallEntry', 'completionTime', 'passwords']
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
    console.log('Successfully updated row', rowIndex, 'with data:', rowData);
    
    return createCORSResponse({ success: true, message: 'Progress updated successfully', rowIndex });
    
  } catch (error) {
    console.error('updateProgress error:', error.toString());
    console.error('updateProgress error stack:', error.stack);
    return createCORSResponse({ success: false, error: error.toString() });
  }
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

// Test endpoint for basic connectivity and CORS preflight
function doOptions(e) {
  // Handle CORS preflight requests
  return createCORSResponse({ 
    message: 'CORS preflight successful',
    allowedMethods: ['GET', 'POST', 'OPTIONS'],
    timestamp: new Date().toISOString()
  });
}
