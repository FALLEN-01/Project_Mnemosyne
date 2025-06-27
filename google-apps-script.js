/**
 * Google Apps Script for Project Mnemosyne Progress Tracking
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet with columns: Team Name, Current Room, Rooms Completed, Start Time, Last Updated, Full State
 * 2. Open script.google.com and create a new project
 * 3. Paste this code and save
 * 4. Deploy as web app with execute permissions for "Anyone"
 * 5. Copy the web app URL to your .env file
 */

function doGet(e) {
  try {
    const action = e.parameter.action;
    const teamName = e.parameter.team;
    
    if (action === 'read' && teamName) {
      return readProgress(teamName);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Invalid request' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'update') {
      return updateProgress(data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function readProgress(teamName) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Find team row (assuming header in row 1)
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === teamName) {
      const progress = JSON.parse(data[i][5] || '{}'); // Column F contains full state
      return ContentService
        .createTextOutput(JSON.stringify({ 
          found: true, 
          progress: progress 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ found: false }))
    .setMimeType(ContentService.MimeType.JSON);
}

function updateProgress(data) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const teamName = data.team;
  const progress = data.progress;
  const timestamp = data.timestamp;
  
  const dataRange = sheet.getDataRange().getValues();
  let rowIndex = -1;
  
  // Check if headers exist, if not create them
  if (dataRange.length === 0 || dataRange[0][0] !== 'Team Name') {
    sheet.getRange(1, 1, 1, 6).setValues([
      ['Team Name', 'Current Room', 'Rooms Completed', 'Start Time', 'Last Updated', 'Full State']
    ]);
  }
  
  // Find existing team row
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === teamName) {
      rowIndex = i + 1; // Sheet rows are 1-indexed
      break;
    }
  }
  
  // If team not found, add new row
  if (rowIndex === -1) {
    rowIndex = sheet.getLastRow() + 1;
  }
  
  // Update the row
  const rowData = [
    teamName,
    progress.currentRoom || 0,
    (progress.roomsCompleted || []).join(','),
    progress.startTime || '',
    timestamp,
    JSON.stringify(progress)
  ];
  
  sheet.getRange(rowIndex, 1, 1, 6).setValues([rowData]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ 
      success: true, 
      message: 'Progress updated successfully' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Function to get all team progress (for admin dashboard)
function getAllProgress() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) return [];
  
  return data.slice(1).map(row => ({
    teamName: row[0],
    currentRoom: row[1],
    roomsCompleted: row[2].split(',').filter(r => r),
    startTime: row[3],
    lastUpdated: row[4],
    fullState: JSON.parse(row[5] || '{}')
  }));
}
