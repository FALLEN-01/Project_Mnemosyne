# Project Mnemosyne - Online Escape Room

**A dark sci-fi escape room experience optimized for mobile competition play.**

## 🎮 Overview

Project Mnemosyne is an immersive online escape room where players recover lost memories while solving puzzles in a mysterious research facility. Built with React + Vite for fast, responsive gameplay.

## 🌟 Features

- **📱 Mobile-First Design**: Optimized for smartphones and tablets
- **🎨 Dark Sci-Fi Theme**: Atmospheric visuals with manga/manhwa image placeholders
- **🧩 4 Challenging Rooms**: Progressive difficulty with unique puzzle mechanics
- **🏆 Competition-Ready**: No hints or clues - pure puzzle challenge
- **⚡ Fast Performance**: Built with Vite for instant loading
- **🔒 Team-Based Flow**: Team registration → sequential rooms → finale
- **📊 Google Sheets Integration**: Automatic progress tracking and data collection

## 📊 Google Sheets Integration

**Automatic team progress tracking with comprehensive data collection.**

### Features:

- **🔄 Real-time Sync**: Progress automatically saved to Google Sheets
- **⏱️ Timestamp Tracking**: Records entry time for each room and completion
- **📈 Competition Analytics**: Perfect for event organizers and competitions
- **🛡️ Data Reliability**: No overwriting or data loss - timestamps preserved permanently
- **🔌 Standalone Integration**: Works independently of React components
- **🔄 Offline Resilience**: Game continues even if Google Sheets is temporarily unavailable

### Data Structure:

| Column | Data | Description |
|--------|------|-------------|
| A | Team Name | Unique team identifier |
| B | Entry Time | When team started the game |
| C | Room 1 Entry | Timestamp when team entered Room 1 |
| D | Room 2 Entry | Timestamp when team entered Room 2 |
| E | Room 3 Entry | Timestamp when team entered Room 3 |
| F | Room 4 Entry | Timestamp when team entered Room 4 |
| G | Exit Hall Entry | Timestamp when team reached finale |
| H | Completion Time | When team completed the entire game |

### Setup Instructions:

1. **Create Google Apps Script** using the provided `google-apps-script.js`
2. **Deploy as Web App** with "Anyone" access for CORS
3. **Update URL** in `public/googleSheetsStandalone.js`
4. **Test Integration** using the included test page

### Files:

- `google-apps-script.js` - Backend server script
- `public/googleSheetsStandalone.js` - Frontend integration
- `test-integration.html` - Integration testing page

## 🏠 Room Structure

1. **🔐 Room 1 - Memory Recovery Lab**: Visual pattern recognition
2. **📹 Room 2 - Surveillance**: Cipher decryption challenge  
3. **Room 3 - Neural Sync**: Multi-stage logic puzzle
4. **🧪 Room 4 - Containment Lab**: Audio reconstruction + riddle
5. **🌅 Exit Hall**: Victory celebration with escape story

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Access at: `http://localhost:5000`

## 🖼️ Image Replacement

The escape room uses placeholder images that can be easily replaced with manga/artwork:

- **12 image locations** across all rooms
- **16:9 aspect ratio** maintained
- **Smooth fade-in animations**
- See `IMAGE_REPLACEMENT_GUIDE.md` for detailed instructions

## 🎯 Game Flow

1. **Team Registration**: Enter team name
2. **Sequential Progression**: Complete rooms 1→2→3→4
3. **No Backtracking**: Forward-only navigation
4. **Timed Experience**: Automatic timing with completion stats
5. **Epic Finale**: Dramatic escape sequence

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **React Router** - Navigation
- **CSS3** - Responsive styling with animations
- **Context API** - Global state management
- **Google Apps Script** - Backend data collection
- **Google Sheets API** - Progress tracking and analytics

## 📁 Project Structure

```
src/
├── components/
│   ├── TeamName.jsx      # Entry point
│   ├── Room1.jsx         # Memory Recovery
│   ├── Room2.jsx         # Surveillance
│   ├── Room3.jsx         # Neural Sync
│   ├── Room4.jsx         # Containment Lab
│   └── ExitHall.jsx      # Victory screen
├── App.jsx               # Main app + routing
└── App.css               # Global styles
public/
├── googleSheetsStandalone.js  # Google Sheets integration
└── index.html            # Main HTML with integrations
google-apps-script.js     # Backend server script
test-integration.html     # Integration testing page
```

## 🎨 Customization

- **Colors**: Edit CSS variables in `App.css`
- **Images**: Replace placeholders per guide
- **Puzzles**: Modify logic in individual room components
- **Timing**: Adjust delays in component state

## 📝 License

Open source - customize and deploy for your events!

## 🏆 Perfect For

- Programming competitions
- Corporate team building
- Educational events
- Gaming tournaments
- Mobile-focused events
- **Competition Analytics**: Track team performance and completion times
- **Event Management**: Real-time progress monitoring via Google Sheets

## 🔧 Additional Setup

### Google Sheets Integration (Optional)
1. Copy `google-apps-script.js` to Google Apps Script
2. Deploy as web app with public access
3. Update `GOOGLE_SHEETS_URL` in `public/googleSheetsStandalone.js`
4. Test with `test-integration.html`

### For Competition Use
- Enable Google Sheets for automatic team tracking
- Monitor progress in real-time during events
- Export completion data for analysis
- All timestamps preserved with no data loss

---

**Ready to escape the facility?** 🚪✨


