# Room4 Progression Troubleshooting Guide

## How Room4 Should Work

### Step 1: Neural Node Puzzle
1. Rotate each neural node (A1, B2, C3, D4, E5) by clicking on them
2. Target rotations are: A1(45°), B2(135°), C3(270°), D4(90°), E5(315°)
3. Watch the progress bar at the bottom - it shows how many nodes are correctly aligned
4. Use the "Need Help?" button if you get stuck

### Step 2: Initiate Neural Sync
1. Once all 5 nodes are correctly aligned, click "Initiate Neural Sync"
2. You should see pulse animations flowing through the neural network
3. The hologram will activate automatically after the pulse sequence

### Step 3: Confession Sequence
1. The hologram will display Dr. Eon Vale's confession messages
2. 10 messages will play automatically, each lasting 3 seconds
3. After all messages, there will be a 2-second pause

### Step 4: Final Choice
1. The M.I.N.D. dialogue appears with a prominent "Enter Final Chamber" button
2. The button has a pulsing animation and clear styling
3. Clicking it completes Room4 and navigates to the Exit Hall

## Troubleshooting

### If the puzzle won't solve:
- Check the debug panel (top-right in development mode)
- Use "Quick Solve Puzzle" button for testing
- Check browser console for rotation values

### If hologram doesn't activate:
- Ensure all 5 nodes show 100% alignment
- Check that "Initiate Neural Sync" was clicked
- Look for error messages

### If "Enter Final Chamber" button doesn't appear:
- Wait for all 10 confession messages to complete
- Check that mindDialogue state is true
- Verify confession sequence finished

### If navigation doesn't work:
- Check that completeRoom(4) is called
- Verify /exit-hall route exists
- Check browser console for errors

## Testing Commands

### To quickly reach Room4:
```javascript
// Run in browser console
const testProgress = {
  teamName: 'Test Team',
  roomsCompleted: [0, 1, 2, 3],
  currentRoom: 3
};
localStorage.setItem('mnemosyne-progress', JSON.stringify(testProgress));
window.location.href = '/room4';
```

### To reset progress:
```javascript
localStorage.removeItem('mnemosyne-progress');
window.location.href = '/';
```

## Key Technical Details

- `completeRoom(4)` adds 4 to roomsCompleted array
- Navigation uses React Router: `navigate('/exit-hall')`
- Progress is saved to localStorage automatically
- Debug panel only appears in development mode (`import.meta.env.DEV`)

## Expected User Experience

The Room4 progression should be clear and intuitive:
1. Visual feedback shows puzzle progress
2. Clear "Enter Final Chamber" button appears after confession
3. Button has attention-grabbing styling (pulsing, glow)
4. Success transitions smoothly to Exit Hall

If any step is unclear or broken, check the console for errors and verify the component logic.
