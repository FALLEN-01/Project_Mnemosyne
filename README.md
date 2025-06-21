# 🧠 Project Mnemosyne - Online Escape Room

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

## 🏠 Room Structure

1. **🔐 Room 1 - Memory Recovery Lab**: Visual pattern recognition
2. **📹 Room 2 - Surveillance**: Cipher decryption challenge  
3. **🧠 Room 3 - Neural Sync**: Multi-stage logic puzzle
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

---

**Ready to escape the facility?** 🚪✨


