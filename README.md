# Project Mnemosyne

A cyberpunk-themed digital escape room experience built with React and Vite. Navigate through multiple rooms, solve puzzles, and uncover memories in this immersive terminal-style adventure.

## 🎮 Game Overview

Project Mnemosyne is an interactive escape room game where players progress through different rooms by solving various puzzles. The game features:

- **Cyberpunk Terminal Interface**: Authentic terminal-style interactions with glitch effects
- **Multi-Room Experience**: Navigate through 4 different rooms plus intro and exit areas
- **Progress Tracking**: Game state persistence and team progress monitoring
- **Puzzle Variety**: Binary decoding, phrase reconstruction, word puzzles, and logic challenges
- **Google Sheets Integration**: Team progress and completion times are tracked

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/FALLEN-01/Project_Mnemosyne.git
cd Project_Mnemosyne
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
Project_Mnemosyne/
├── src/
│   ├── components/
│   │   ├── CyberpunkTerminal.jsx    # Terminal UI component
│   │   ├── TeamEntry.jsx            # Team name entry
│   │   ├── Intro.jsx                # Introduction and first puzzle
│   │   ├── Room1.jsx                # First escape room
│   │   ├── Room2.jsx                # Second escape room
│   │   ├── Room3.jsx                # Third escape room
│   │   ├── Room4.jsx                # Fourth escape room
│   │   └── ExitHall.jsx             # Final completion screen
│   ├── App.jsx                      # Main application with routing
│   ├── App.css                      # Game styling
│   └── main.jsx                     # Application entry point
├── public/
│   ├── googleSheetsStandalone.js    # Google Sheets API integration
│   └── favicon.svg                  # Game icon
├── google-apps-script.js            # Google Apps Script for data logging
└── index.html                       # Main HTML template
```

## 🎯 Game Flow

1. **Team Entry**: Players enter their team name
2. **Intro**: Introduction story with binary decoding puzzle (Code: 20217)
3. **Room 1**: First escape room challenge
4. **Room 2**: Second escape room challenge  
5. **Room 3**: Third escape room challenge
6. **Room 4**: Final escape room challenge
7. **Exit Hall**: Completion screen with team statistics

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🔧 Technologies Used

- **React 19.1.0** - UI framework
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and development server
- **Google Sheets API** - Progress tracking and data collection

## 📊 Data Integration

The game integrates with Google Sheets to track:
- Team names and completion times
- Progress through each room
- Puzzle solutions and attempts
- Overall game statistics

## 🎨 Features

- **Responsive Design**: Works on desktop and mobile devices
- **Terminal Aesthetics**: Authentic cyberpunk terminal styling with glitch effects
- **State Management**: Persistent game state across room transitions
- **Error Handling**: User-friendly error messages and validation
- **Progress Tracking**: Visual indicators of game progression

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of an educational escape room experience. Please respect the puzzle solutions and maintain the integrity of the game for future players.

## 🎮 Gameplay Tips

- Pay attention to terminal messages and error codes
- Some puzzles require binary decoding skills
- Take notes of codes and phrases found in each room
- The game tracks your progress automatically
- Work as a team to solve challenging puzzles

---

*"In the depths of digital memory, truth awaits those who dare to decode the past..."*


