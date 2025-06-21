# Project_Mnemosyne
Project_Mnemosyne


/* 
 * MANGA IMAGE REPLACEMENT GUIDE
 * Project Mnemosyne - Room1 Layout
 * 
 * When you have your manga images ready, replace the placeholder divs with actual images.
 * 
 * BEFORE (Current Placeholder):
 * <div style={{ 
 *   width: '100%', 
 *   aspectRatio: '16/9',
 *   background: 'rgba(255, 255, 255, 0.1)',
 *   border: '2px dashed rgba(68, 255, 68, 0.5)',
 *   ...
 * }}>
 *   [placeholder content]
 * </div>
 * 
 * AFTER (With Actual Manga Image):
 * <img 
 *   src="/images/manga-page-1.jpg" 
 *   alt="Family photo scene showing three people"
 *   style={{ 
 *     width: '100%', 
 *     aspectRatio: '16/9',
 *     objectFit: 'cover',
 *     display: 'block'
 *   }}
 * />
 * 
 * RESPONSIVE BEHAVIOR:
 * - Mobile (Portrait): Single column, images stack vertically
 * - Tablet: 2x2 grid, aspect ratio 4:3
 * - Desktop: 2x2 grid, aspect ratio 3:2
 * - Large Desktop: 2x2 grid, aspect ratio 16:10
 * 
 * IMAGE REQUIREMENTS:
 * - Format: JPG, PNG, or WebP
 * - Minimum resolution: 800x600 pixels
 * - Recommended: 1920x1080 for best quality
 * - File size: Keep under 500KB each for fast mobile loading
 * 
 * FOLDER STRUCTURE:
 * public/
 *   images/
 *     manga-page-1.jpg (Family photo scene)
 *     manga-page-2.jpg (Journal entry scene)
 *     manga-page-3.jpg (Desert map scene)
 *     manga-page-4.jpg (Timer scene)
 * 
 * REPLACEMENT LOCATIONS IN Room1.jsx:
 * 1. Line ~180: Replace first placeholder div with manga-page-1.jpg
 * 2. Line ~220: Replace second placeholder div with manga-page-2.jpg  
 * 3. Line ~260: Replace third placeholder div with manga-page-3.jpg
 * 4. Line ~300: Replace fourth placeholder div with manga-page-4.jpg
 * 
 * KEEP THE LABELS:
 * The "MANGA PAGE 1", "MANGA PAGE 2" etc. labels should remain as overlays
 * The description sections at the bottom should also remain for hints
 */

// Example of complete replacement for Manga Page 1:

/*
<div style={{ 
  background: 'rgba(0, 0, 0, 0.7)', 
  borderRadius: '10px',
  border: '2px solid rgba(68, 255, 68, 0.3)',
  overflow: 'hidden',
  position: 'relative'
}}>
  <div style={{ position: 'relative' }}>
    <img 
      src="/images/manga-page-1.jpg" 
      alt="Family photo scene showing three people"
      style={{ 
        width: '100%', 
        aspectRatio: '16/9',
        objectFit: 'cover',
        display: 'block'
      }}
    />
    <div style={{ 
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#44ff44',
      padding: '0.3rem 0.6rem',
      borderRadius: '5px',
      fontSize: '0.7rem',
      fontFamily: 'Courier New, monospace'
    }}>
      MANGA PAGE 1
    </div>
  </div>
  <div style={{ 
    padding: '0.8rem',
    background: 'rgba(0, 0, 0, 0.8)',
    borderTop: '1px solid rgba(68, 255, 68, 0.3)'
  }}>
    <h4 style={{ color: '#00ffff', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Fragment A: Family Memory</h4>
    <p style={{ fontSize: '0.8rem', color: '#ccc' }}>Count: Three people standing together</p>
  </div>
</div>
*/


