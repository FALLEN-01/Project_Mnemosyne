# Google Sheets Integration Setup Guide

## Overview
This integration allows Project Mnemosyne to track team progress in a Google Sheet and restore player sessions when they return.

## Features
- **Progress Tracking**: Automatically saves team progress to Google Sheets
- **Session Restoration**: Players can continue from where they left off
- **Real-time Sync**: Progress is saved both locally and to Google Sheets
- **Admin Dashboard**: View all team progress in one place

## Setup Instructions

### 1. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new sheet named "Project Mnemosyne Progress"
3. The script will automatically create headers, but you can manually add:
   - Column A: Team Name
   - Column B: Current Room
   - Column C: Rooms Completed
   - Column D: Start Time
   - Column E: Last Updated
   - Column F: Full State (JSON)

### 2. Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the contents of `google-apps-script.js`
4. Save the project (name it "Mnemosyne Progress Tracker")

### 3. Deploy as Web App
1. In Google Apps Script, click "Deploy" > "New deployment"
2. Choose type: "Web app"
3. Set execute as: "Me"
4. Set access: "Anyone" (for the game to access it)
5. Click "Deploy"
6. Copy the web app URL

### 4. Configure Environment
1. Copy `.env.example` to `.env`
2. Set `REACT_APP_GOOGLE_SHEETS_URL` to your web app URL
3. Restart your development server

### 5. Test Integration
1. Start a new game with a team name
2. Complete a room
3. Check your Google Sheet - you should see the progress
4. Refresh the game - it should offer to restore progress

## Data Structure

### Game State Tracked
```javascript
{
  teamName: "string",
  room1Code: "string", 
  room2Phrase: "string",
  room3Word: "string", 
  room4Answer: "string",
  startTime: "ISO string",
  endTime: "ISO string",
  roomsCompleted: [0, 1, 2, 3, 4],
  currentRoom: 4
}
```

### Google Sheets Columns
- **Team Name**: The team identifier
- **Current Room**: Latest room number (0-4)
- **Rooms Completed**: Comma-separated list of completed rooms
- **Start Time**: When the team started
- **Last Updated**: Last sync timestamp
- **Full State**: Complete JSON state for restoration

## Usage

### For Players
- Progress is automatically saved as they complete rooms
- If they return later, they'll see an option to continue or start fresh
- Progress is synced between devices if using the same team name

### For Administrators
- View real-time progress of all teams in the Google Sheet
- Export data for analysis
- Monitor completion rates and times

## Troubleshooting

### Common Issues
1. **"Cannot read property" errors**: Check that REACT_APP_GOOGLE_SHEETS_URL is set correctly
2. **CORS errors**: Ensure the Apps Script is deployed with "Anyone" access
3. **Data not saving**: Check the Google Apps Script logs for errors

### Debug Mode
Add `console.log` statements in the browser developer tools to see:
- API requests being made
- Responses from Google Sheets
- Local storage operations

## Security Notes
- The Google Sheet is accessible to anyone with the web app URL
- Consider implementing authentication if handling sensitive data
- Team names should not contain personal information
- Progress data is stored in browser localStorage as backup

## API Reference

### Read Progress
```
GET https://script.google.com/.../exec?action=read&team=TEAM_NAME
```

### Update Progress  
```
POST https://script.google.com/.../exec
Content-Type: application/json

{
  "action": "update",
  "team": "TEAM_NAME", 
  "progress": { ... },
  "timestamp": "2025-06-27T..."
}
```
